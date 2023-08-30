using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FranchiseController : BaseController
    {
        private readonly IFranchiseService _franchiseService;
        private readonly IFranchiseProductService _franchiseProductService;

        public FranchiseController(IFranchiseService franchiseService, IFranchiseProductService franchiseProductService)
        {
            _franchiseService = franchiseService;
            _franchiseProductService = franchiseProductService;
        }

        [HttpGet]
        public IActionResult GetAllFranchises()
        {
            var franchises = _franchiseService.GetAllFranchises();
            return JsonContent(franchises);
        }

        [HttpGet("{id}")]
        public IActionResult GetFranchiseById(int id)
        {
            var franchise = _franchiseService.GetFranchiseById(id);
            if (franchise == null)
            {
                return NotFound();
            }
            return JsonContent(franchise);
        }

        [HttpGet("products/{idFranchise}")]
        public IActionResult GetProductsByFranchise(int idFranchise)
        {
            var franchise = _franchiseProductService.GetProductsByFranchise(idFranchise);
            if (franchise == null)
            {
                return NotFound();
            }
            return JsonContent(franchise);
        }

        [HttpPost]
        public IActionResult AddFranchise([FromBody] Franchise franchise)
        {
            _franchiseService.AddFranchise(franchise);
            return CreatedAtAction(nameof(GetFranchiseById), new { id = franchise.Id }, franchise);
        }

        [HttpPost("products")]
        public IActionResult AddFranchiseProduct([FromBody] FranchiseProduct franchiseProduct)
        {
            _franchiseProductService.AddFranchiseProduct(franchiseProduct);
            return JsonContent(franchiseProduct);
        }
    }
}
