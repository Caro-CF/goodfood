using Data;
using Interfaces;
using Models;

namespace Services
{
    public class TagService : ITagService
    {
        private readonly RestaurantFranchiseContext _dbContext;

        public TagService(RestaurantFranchiseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Tag> GetAllTags()
        {
            return _dbContext.Tags.ToList();
        }

        public Tag? GetTagById(int id)
        {
            return _dbContext.Tags.FirstOrDefault(t => t.Id == id);
        }

        public void AddTag(Tag tag)
        {
            _dbContext.Tags.Add(tag);
            _dbContext.SaveChanges();
        }
    }
}
