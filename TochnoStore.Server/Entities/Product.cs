using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TochnoStore.Server.Entities;

namespace TochnoStore.Api.Entities;

public class Product
{
    public int Id { get; set; }

    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    public decimal Price { get; set; }
    public decimal? OldPrice { get; set; }

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    public double Rating { get; set; }
    public int ReviewsCount { get; set; }

    // Динамические атрибуты (хранятся как JSONB в PostgreSQL)
    [Column(TypeName = "jsonb")]
    public Dictionary<string, string> Attributes { get; set; } = new();

    public bool IsDeleted { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
