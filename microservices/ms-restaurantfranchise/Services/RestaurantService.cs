using Data;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Services
{
    public class RestaurantService : IRestaurantService
    {
        private readonly RestaurantFranchiseContext _dbContext;

        public RestaurantService(RestaurantFranchiseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Restaurant> GetAllRestaurants()
        {
            return _dbContext.Restaurants.Include(r => r.Franchise).ToList();
        }

        public Restaurant? GetRestaurantById(int id)
        {
            return _dbContext.Restaurants.Include(r => r.Franchise).FirstOrDefault(r => r.Id == id);
        }

        public void AddRestaurant(Restaurant restaurant)
        {
            restaurant.CreatedAt = DateTime.Now;
            _dbContext.Restaurants.Add(restaurant);
            _dbContext.SaveChanges();
        }

        public void UpdateRestaurant(Restaurant restaurant)
        {
            restaurant.UpdatedAt = DateTime.Now;
            _dbContext.Restaurants.Update(restaurant);
            _dbContext.SaveChanges();
        }

        public void DeleteRestaurant(int id)
        {
            var restaurant = _dbContext.Restaurants.FirstOrDefault(r => r.Id == id);
            if (restaurant != null)
            {
                _dbContext.Restaurants.Remove(restaurant);
                _dbContext.SaveChanges();
            }
        }
    }
}
