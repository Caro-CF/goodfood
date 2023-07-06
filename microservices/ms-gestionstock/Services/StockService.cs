using Models;
using ms_gestionstock.Data;
using ms_gestionstock.Interfaces;

namespace ms_gestionstock.Services
{
    public class StockService : IStockService
    {
        private readonly StockContext _dbContext;

        public StockService(StockContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IEnumerable<Stock> GetAllStock()
        {
            return _dbContext.Stocks.ToList();
        }
        public Stock? GetStock(int idRestaurant, int idIngredient)
        {
            return _dbContext.Stocks.Find(idRestaurant, idIngredient);
        }

        public IEnumerable<Stock> GetStockByRestaurant(int idRestaurant)
        {
            return _dbContext.Stocks.Where(s => s.IdRestaurant == idRestaurant);
        }

        public void UpdateStock(Stock stock)
        {
            _dbContext.Stocks.Update(stock);
            _dbContext.SaveChanges();
        }
        public void AddStock(Stock stock)
        {
            _dbContext.Stocks.Add(stock);
            _dbContext.SaveChanges();
        }

        public void DeleteStock(Stock stock)
        {
            _dbContext.Stocks.Remove(stock);
            _dbContext.SaveChanges();
        }
    }
}
