using Data;
using Interfaces;
using Models;

namespace Services
{
    public class FranchiseService : IFranchiseService
    {
        private readonly RestaurantFranchiseContext _dbContext;

        public FranchiseService(RestaurantFranchiseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Franchise> GetAllFranchises()
        {
            return _dbContext.Franchises.ToList();
        }

        public Franchise? GetFranchiseById(int id)
        {
            return _dbContext.Franchises.FirstOrDefault(f => f.Id == id);
        }

        public void AddFranchise(Franchise franchise)
        {
            _dbContext.Franchises.Add(franchise);
            _dbContext.SaveChanges();
        }
    }
}
