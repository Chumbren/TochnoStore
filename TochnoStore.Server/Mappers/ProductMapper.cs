using Riok.Mapperly.Abstractions;
using TochnoStore.Server.DTOs;
using TochnoStore.Server.Entities;

namespace TochnoStore.Server.Mappers;

[Mapper]
public partial class ProductMapper
{
    // Маппинг сущности в DTO
    public partial ProductDto ToDto(Product product);

    // Кастомный маппинг для категории внутри продукта
    [MapProperty(nameof(Product.Category.Name), nameof(ProductDto.CategoryName))]
    private partial ProductDto MapProductWithCategory(Product product);

    public ProductDto ToDtoWithCategory(Product product) => MapProductWithCategory(product);
}