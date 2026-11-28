namespace TochnoStore.Server.DTOs.Info
{
    public readonly record struct PriceRangeInfoDto(in decimal? Min, in decimal? Max);
}
