namespace TochnoStore.Server.DTOs
{
    public record AttributeFilterDto(string Key, string Name, string Type, List<FilterOptionDto> Options);
}
