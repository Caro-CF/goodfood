using Models;

namespace Interfaces
{
    public interface IStockService
    {
        Task<List<Stock>> GetStockAsync(int restaurantId);
    }
}
