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

        public FranchiseController(IFranchiseService franchiseService)
        {
            _franchiseService = franchiseService;
        }

        [HttpGet]
        public IActionResult GetAllFranchises()
        {
            var franchises = _franchiseService.GetAllFranchises();
            return Ok(JsonContent(franchises));
        }

        [HttpGet("{id}")]
        public IActionResult GetFranchiseById(int id)
        {
            var franchise = _franchiseService.GetFranchiseById(id);
            if (franchise == null)
            {
                return NotFound();
            }
            return Ok(JsonContent(franchise));
        }

        [HttpPost]
        public IActionResult AddFranchise([FromBody] Franchise franchise)
        {
            _franchiseService.AddFranchise(franchise);
            return CreatedAtAction(nameof(GetFranchiseById), new { id = franchise.Id }, franchise);
        }
    }
}
