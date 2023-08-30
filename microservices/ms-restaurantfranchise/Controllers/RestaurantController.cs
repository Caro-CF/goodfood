using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : BaseController
    {
        private readonly IRestaurantService _restaurantService;
        private readonly IStockService _stockService;

        public RestaurantController(IRestaurantService restaurantService, IStockService stockService)
        {
            _restaurantService = restaurantService;
            _stockService = stockService;
        }

        [HttpGet]
        public IActionResult GetAllRestaurants()
        {
            var restaurants = _restaurantService.GetAllRestaurants();
            return JsonContent(restaurants);
        }

        [HttpGet("{id}")]
        public IActionResult GetRestaurantById(int id)
        {
            var restaurant = _restaurantService.GetRestaurantById(id);
            if (restaurant == null)
            {
                return NotFound();
            }
            return JsonContent(restaurant);
        }

        [HttpPost]
        public IActionResult AddRestaurant([FromBody] Restaurant restaurant)
        {
            _restaurantService.AddRestaurant(restaurant);
            return CreatedAtAction(nameof(GetRestaurantById), new { id = restaurant.Id }, restaurant);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateRestaurant(int id, [FromBody] Restaurant restaurant)
        {
            if (id != restaurant.Id)
            {
                return BadRequest();
            }
            _restaurantService.UpdateRestaurant(restaurant);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteRestaurant(int id)
        {
            _restaurantService.DeleteRestaurant(id);
            return NoContent();
        }

        [HttpGet("stock/{restaurantId}")]
        public async Task<IActionResult> GetStockInfo(int restaurantId)
        {
            var stockInfo = await _stockService.GetStockAsync(restaurantId);
            return JsonContent(stockInfo);
        }
    }
}
