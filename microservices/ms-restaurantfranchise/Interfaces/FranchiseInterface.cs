using Models;

namespace Interfaces
{
    public interface IFranchiseService
    {
        IEnumerable<Franchise> GetAllFranchises();
        Franchise? GetFranchiseById(int id);
        void AddFranchise(Franchise franchise);
    }
}
