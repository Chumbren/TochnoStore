using System.ComponentModel.DataAnnotations;

namespace TochnoStore.Server.Entities
{
    public class Category
    {
        public int Id { get; set; }
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;
        public int? ParentId { get; set; }
        public Category? Parent { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
