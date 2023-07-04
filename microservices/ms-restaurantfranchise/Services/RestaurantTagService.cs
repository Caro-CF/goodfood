using Data;
using Interfaces;
using Models;

namespace Services
{
    public class RestaurantTagService : IRestaurantTagService
    {
        private readonly RestaurantFranchiseContext _dbContext;

        public RestaurantTagService(RestaurantFranchiseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public RestaurantTag? GetRestaurantTagByIds(int tagId, int restaurantId)
        {
            return _dbContext.RestaurantTags
                .SingleOrDefault(rt => rt.IdTag == tagId && rt.IdRestaurant == restaurantId);
        }

        public void AddRestaurantTag(RestaurantTag restaurantTag)
        {
            _dbContext.RestaurantTags.Add(restaurantTag);
            _dbContext.SaveChanges();
        }

        public void RemoveRestaurantTag(int tagId, int restaurantId)
        {
            var restaurantTag = GetRestaurantTagByIds(tagId, restaurantId);
            if (restaurantTag != null)
            {
                _dbContext.RestaurantTags.Remove(restaurantTag);
                _dbContext.SaveChanges();
            }
        }
    }

}
