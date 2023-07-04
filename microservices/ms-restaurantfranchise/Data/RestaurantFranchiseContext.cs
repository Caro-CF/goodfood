using Microsoft.EntityFrameworkCore;
using Models;

namespace Data
{
    public class RestaurantFranchiseContext : DbContext
    {
        public RestaurantFranchiseContext(DbContextOptions<RestaurantFranchiseContext> options) : base(options) { }

        public DbSet<Franchise> Franchises { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<RestaurantTag> RestaurantTags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configurez les entités ici si nécessaire.
        }
    }
}
