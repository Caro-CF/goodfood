using Data;
using Interfaces;
using Models;

namespace Services
{
    public class FranchiseProductService : IFranchiseProductService
    {
        private readonly RestaurantFranchiseContext _dbContext;
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public FranchiseProductService(RestaurantFranchiseContext dbContext, HttpClient httpClient, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _httpClient = httpClient;
            _configuration = configuration;
        }
        public IEnumerable<FranchiseProduct> GetAllProducts()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<FranchiseProduct> GetProductsByFranchise(int idFranchise)
        {
            return _dbContext.FranchiseProducts.ToList().Where(f => f.IdFranchise == idFranchise);
        }

        public void AddFranchiseProduct(FranchiseProduct franchiseProduct)
        {
            _dbContext.FranchiseProducts.Add(franchiseProduct);
            _dbContext.SaveChanges();
        }
    }
}
