namespace TochnoStore.Server.DTOs;

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