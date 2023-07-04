using Models;

namespace Interfaces
{
    public interface IRestaurantTagService
    {
        RestaurantTag? GetRestaurantTagByIds(int tagId, int restaurantId);
        void AddRestaurantTag(RestaurantTag restaurantTag);
        void RemoveRestaurantTag(int tagId, int restaurantId);
    }

}
