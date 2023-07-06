using Microsoft.AspNetCore.Mvc;
using Models;
using ms_gestionstock.Interfaces;

namespace ms_gestionstock.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : BaseController
    {
        private readonly IStockService _stockService;

        public StockController(IStockService stockService)
        {
            _stockService = stockService;
        }

        [HttpGet]
        public IActionResult GetAllStock()
        {
            var stock = _stockService.GetAllStock();
            return Ok(JsonContent(stock));
        }

        [HttpGet("{idRestaurant}/{idIngredient}")]
        public IActionResult GetStock(int idRestaurant, int idIngredient)
        {
            var stock = _stockService.GetStock(idRestaurant, idIngredient);
            if (stock == null)
            {
                return NotFound();
            }
            return Ok(JsonContent(stock));
        }

        [HttpGet("restaurant/{idRestaurant}")]
        public IActionResult GetStockByRestaurant(int idRestaurant)
        {
            var stock = _stockService.GetStockByRestaurant(idRestaurant);
            return Ok(JsonContent(stock));
        }

        [HttpPost]
        public IActionResult AddStock(Stock stock)
        {
            _stockService.AddStock(stock);
            return CreatedAtAction(nameof(GetStock), new { idRestaurant = stock.IdRestaurant, idIngredient = stock.IdIngredient }, stock);
        }

        [HttpPut]
        public IActionResult UpdateStock(Stock stock)
        {
            _stockService.UpdateStock(stock);
            return Ok(JsonContent(stock));
        }

        [HttpDelete("{idRestaurant}/{idIngredient}")]
        public IActionResult DeleteStock(int idRestaurant, int idIngredient)
        {
            var stock = _stockService.GetStock(idRestaurant, idIngredient);
            if (stock == null)
            {
                return NotFound();
            }
            _stockService.DeleteStock(stock);
            return NoContent();
        }
    }
}
