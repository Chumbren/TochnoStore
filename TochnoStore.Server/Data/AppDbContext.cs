using Microsoft.EntityFrameworkCore;
using TochnoStore.Api.Entities;
using TochnoStore.Server.Entities;

namespace TochnoStore.Server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Настройка JSONB для атрибутов в PostgreSQL
        modelBuilder.Entity<Product>()
            .Property(p => p.Attributes)
            .HasColumnType("jsonb");

        // Индекс для ускорения фильтрации по атрибутам (GIN индекс в Postgres)
        modelBuilder.Entity<Product>()
            .HasIndex(p => p.Attributes)
            .HasMethod("gin");

        // Тестовые данные
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Ноутбуки" },
            new Category { Id = 2, Name = "Смартфоны" }
        );

        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                Name = "MacBook Pro 16\"",
                CategoryId = 1,
                Price = 249990,
                Rating = 4.8,
                ReviewsCount = 120,
                Attributes = new Dictionary<string, string> { { "ram", "16" }, { "cpu", "M2 Pro" }, { "brand", "Apple" } }
            },
            new Product
            {
                Id = 2,
                Name = "iPhone 15 Pro",
                CategoryId = 2,
                Price = 129990,
                OldPrice = 139990,
                Rating = 4.9,
                ReviewsCount = 340,
                Attributes = new Dictionary<string, string> { { "storage", "256" }, { "brand", "Apple" } }
            }
        );
    }
}