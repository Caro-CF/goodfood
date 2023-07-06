using Microsoft.EntityFrameworkCore;
using Models;

namespace ms_gestionstock.Data
{
    public class StockContext : DbContext
    {
        public StockContext(DbContextOptions<StockContext> options) : base(options)
        {
        }

        public DbSet<Stock> Stocks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Stock>().HasKey(s => new { s.IdRestaurant, s.IdIngredient });
        }
    }
}
