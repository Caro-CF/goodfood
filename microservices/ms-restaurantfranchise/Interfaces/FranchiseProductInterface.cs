using Models;

namespace Interfaces
{
    public interface IFranchiseProductService
    {
        IEnumerable<FranchiseProduct> GetAllProducts();
        IEnumerable<FranchiseProduct> GetProductsByFranchise(int idFranchise);
        void AddFranchiseProduct(FranchiseProduct franchiseProduct);
    }
}
