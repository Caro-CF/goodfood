using Models;

namespace ms_gestionstock.Interfaces
{
    public interface IStockService
    {
        IEnumerable<Stock> GetAllStock();
        Stock? GetStock(int idRestaurant, int idIngredient);
        IEnumerable<Stock> GetStockByRestaurant(int idRestaurant);
        void UpdateStock(Stock stock);
        void AddStock(Stock stock);
        void DeleteStock(Stock stock);
    }
}
