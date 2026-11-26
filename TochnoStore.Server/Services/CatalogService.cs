using TochnoStore.Server.Data;

namespace TochnoStore.Server.Services
{
    public class CatalogService
    {
        private readonly AppDbContext _db;
        private readonly AppMapper _mapper;
        private readonly ILogger<CatalogService> _logger;

        public CatalogService(AppDbContext db, AppMapper mapper, ILogger<CatalogService> logger)
        {
            _db = db;
            _mapper = mapper;
            _logger = logger;
        }
    }
}
