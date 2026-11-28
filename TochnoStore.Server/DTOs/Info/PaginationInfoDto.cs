namespace TochnoStore.Server.DTOs.Info
{
    public readonly record struct PaginationInfoDto(int Page = 1, in int PageSize = 12);
}
