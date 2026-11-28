using Microsoft.EntityFrameworkCore;
using System.Text;
using TochnoStore.Server.Data;
using TochnoStore.Server.DTOs;
using TochnoStore.Server.DTOs.Info;
using TochnoStore.Server.Entities;
using TochnoStore.Server.Mappers;

namespace TochnoStore.Server.Services
{
    public partial class CatalogService(AppDbContext db, ProductMapper mapper, ILogger<CatalogService> logger)
    {
        private readonly AppDbContext _db = db;
        private readonly ProductMapper _mapper = mapper;
        private readonly ILogger<CatalogService> _logger = logger;

        [LoggerMessage(
            Level = LogLevel.Information, 
            Message = "Запрос товаров: CategoryId={CategoryId}, Filters={Filters}"
        )]
        static partial void LogProductData(ILogger logger, int? categoryId, string? filters);

        static string GetAllFiltersWithFormatString(Dictionary<string, string> filters)
        {
            StringBuilder @string = new("Фильтры:\r\n");
            foreach (var key in filters)
                @string.AppendLine($"\t{key.Key}:{key.Value}");

            return @string.ToString();
        }

        public async Task<List<ProductDto>> GetProductsAsync(int? categoryId, FilterInfoDto filterInfo,
            PriceRangeInfoDto priceRange, PaginationInfoDto pagination)
        {
            Dictionary<string, string>? filters = filterInfo.Filters;
            string sortBy = filterInfo.SortBy;

            if (_logger.IsEnabled(LogLevel.Information))
                LogInGetProductsAsyncMethod(categoryId, filters);

            var query = _db.Products.Where(p => !p.IsDeleted).AsNoTracking();
            query = FilterForCategoryIdAndPrice(query, categoryId, priceRange);
            query = filters != null ? FilterForJSONBAttributes(query, filters) : query;
            query = SortBy(query, sortBy);

            var products = await GetProductsAsync(query, pagination.Page, pagination.PageSize);

            return [.. products.Select(_mapper.ToDtoWithCategory)];
        }

        private void LogInGetProductsAsyncMethod(in int? categoryId, Dictionary<string, string>? filters)
        {
            var logFiltersMessage = filters != null ? GetAllFiltersWithFormatString(filters) : "Фильтры отсутствуют";
            LogProductData(_logger, categoryId, logFiltersMessage);
        }

        static IQueryable<Product> FilterForCategoryIdAndPrice(
            IQueryable<Product> query, in int? categoryId, in PriceRangeInfoDto priceRange)
        {

            if (categoryId is { } _categoryId)
                query = query.Where(p => p.CategoryId == _categoryId);

            if (priceRange.Min is { } _priceMin)
                query = query.Where(p => p.Price >= _priceMin);

            if (priceRange.Max is { } _priceMax)
                query = query.Where(p => p.Price <= _priceMax);

            return query;
        }

        // Динамическая фильтрация по JSONB атрибутам
        static IQueryable<Product> FilterForJSONBAttributes(IQueryable<Product> query, Dictionary<string, string> filters)
        {
            foreach (var (key, value) in filters)
                query = query.Where(p => p.Attributes.ContainsKey(key) && p.Attributes[key] == value);

            return query;
        }

        //Сортировка по типу сортировки
        static IQueryable<Product> SortBy(IQueryable<Product> query, string sortBy) => sortBy switch
        {
            "price_asc" => query.OrderBy(p => p.Price),
            "price_desc" => query.OrderByDescending(p => p.Price),
            "rating" => query.OrderByDescending(p => p.Rating),
            "new" => query.OrderByDescending(p => p.CreatedAt),
            _ => query.OrderByDescending(p => p.ReviewsCount) // Популярные
        };

        static async Task<List<Product>> GetProductsAsync(IQueryable<Product> query, int page, int pageSize) 
            => await query
                 .Skip((page - 1) * pageSize)
                 .Take(pageSize)
                 .Include(p => p.Category)
                 .ToListAsync();

        [LoggerMessage(
            Level = LogLevel.Information, 
            Message = "Генерация фильтров для категории: CategoryId={CategoryId}"
        )]
        static partial void LogCategoryForId(ILogger logger, int categoryId);

        public async Task<FilterResponseDto> GetFiltersAsync(int categoryId)
        {
            if (_logger.IsEnabled(LogLevel.Information))
                LogCategoryForId(_logger, categoryId);

            var products = await _db.Products
                .Where(p => p.CategoryId == categoryId && !p.IsDeleted)
                .AsNoTracking()
                .ToListAsync();

            if (products == null || products.Count == 0)
                return FilterResponseDto.Entity;

            List<FilterOptionDto> brands = GroupingBrands(products);
            List<string> attributeKeys = GetAttributeKeys(products);
            List<AttributeFilterDto> attributes = GetAttributesFilter(products, attributeKeys);

            return new FilterResponseDto(
                PriceRange: GetPriceRange(products),
                Brands: brands,
                Attributes: attributes
            );
        }

        static PriceRangeDto GetPriceRange(List<Product> products)
        {
            var minPrice = products.Min(p => p.Price);
            var maxPrice = products.Max(p => p.Price);

            return new(minPrice, maxPrice);
        }

        // Динамическое извлечение всех ключей атрибутов и их значений
        static List<string> GetAttributeKeys(List<Product> products) => 
        [..
            products.SelectMany(p => p.Attributes.Keys)
                .Where(k => k != "brand")
                .Distinct()
        ];

        //Получение всех атриубутов фильтров
        static List<AttributeFilterDto> GetAttributesFilter(List<Product> products, List<string> attributeKeys)
        {
            var attributes = new List<AttributeFilterDto>();
            foreach (var key in attributeKeys)
            {
                var options = GetFilterOptions(products, key);

                attributes.Add(new AttributeFilterDto(
                    Key: key,
                    Name: GetHumanReadableName(key),
                    Type: "checkbox",
                    Options: options
                ));
            }

            return attributes;
        }

        // Получение настроек фильтрации
        static List<FilterOptionDto> GetFilterOptions(List<Product> products, string key) =>
        [..
            products.Where(p => p.Attributes.ContainsKey(key))
                  .GroupBy(p => p.Attributes[key])
                  .Select(g => new FilterOptionDto(g.Key, g.Key, g.Count()))
                  .OrderByDescending(o => o.Count)
        ];

        // Группировка брендов
        static List<FilterOptionDto> GroupingBrands(List<Product> products) =>
        [..
             products.Where(p => p.Attributes.ContainsKey("brand"))
                 .GroupBy(p => p.Attributes["brand"])
                 .Select(g => new FilterOptionDto(g.Key, g.Key, g.Count()))
                 .OrderByDescending(b => b.Count)
        ];
        
        static string GetHumanReadableName(string key) => key.ToUpper();
    }
}
