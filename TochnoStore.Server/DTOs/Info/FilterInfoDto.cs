namespace TochnoStore.Server.DTOs.Info
{
    public readonly record struct FilterInfoDto(Dictionary<string, string>? Filters, string SortBy = "popular");
}
