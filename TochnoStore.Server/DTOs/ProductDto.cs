namespace TochnoStore.Api.DTOs;

public record ProductDto(
    int Id,
    string Name,
    int CategoryId,
    string CategoryName,
    decimal Price,
    decimal? OldPrice,
    string? ImageUrl,
    double Rating,
    int ReviewsCount,
    Dictionary<string, string> Attributes
);

public record FilterOptionDto(string Id, string Value, int Count);
public record FilterResponseDto(
    PriceRangeDto PriceRange,
    List<FilterOptionDto> Brands,
    List<AttributeFilterDto> Attributes
);
public record PriceRangeDto(decimal Min, decimal Max);
public record AttributeFilterDto(string Key, string Name, string Type, List<FilterOptionDto> Options);