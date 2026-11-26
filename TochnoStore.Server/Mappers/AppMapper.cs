using Riok.Mapperly.Abstractions;
using TochnoStore.Api.DTOs;
using TochnoStore.Api.Entities;

namespace TochnoStore.Api.Mappers;

[Mapper]
public partial class AppMapper
{
    // Маппинг сущности в DTO
    public partial ProductDto ToDto(Product product);

    // Кастомный маппинг для категории внутри продукта
    [MapProperty(nameof(Product.Category.Name), nameof(ProductDto.CategoryName))]
    private partial ProductDto MapProductWithCategory(Product product);

    public ProductDto ToDtoWithCategory(Product product) => MapProductWithCategory(product);
}