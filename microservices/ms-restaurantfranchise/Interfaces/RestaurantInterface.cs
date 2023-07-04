using Models;

namespace Interfaces
{
    public interface IRestaurantService
    {
        IEnumerable<Restaurant> GetAllRestaurants();
        Restaurant? GetRestaurantById(int id);
        void AddRestaurant(Restaurant restaurant);
        void UpdateRestaurant(Restaurant restaurant);
        void DeleteRestaurant(int id);
    }
}
