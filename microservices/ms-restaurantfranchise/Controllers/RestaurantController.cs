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

        public RestaurantController(IRestaurantService restaurantService)
        {
            _restaurantService = restaurantService;
        }

        [HttpGet]
        public IActionResult GetAllRestaurants()
        {
            var restaurants = _restaurantService.GetAllRestaurants();
            return Ok(JsonContent(restaurants));
        }

        [HttpGet("{id}")]
        public IActionResult GetRestaurantById(int id)
        {
            var restaurant = _restaurantService.GetRestaurantById(id);
            if (restaurant == null)
            {
                return NotFound();
            }
            return Ok(JsonContent(restaurant));
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
    }
}
