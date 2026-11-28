namespace TochnoStore.Server.DTOs
{
    public record FilterResponseDto(
        PriceRangeDto PriceRange,
        List<FilterOptionDto> Brands,
        List<AttributeFilterDto> Attributes
    )
    {
        public static FilterResponseDto Entity => new(new PriceRangeDto(0,0), [], []);
    }
}
