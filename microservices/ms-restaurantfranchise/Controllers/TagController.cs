using Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : BaseController
    {
        private readonly RestaurantFranchiseContext dbContext;
        public TagController(RestaurantFranchiseContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<Tag>> GetTags()
        {
            var tags = await dbContext.Tags.ToListAsync();
            return JsonContent(tags);
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<Tag>> GetTagById(int id)
        {
            var tag = await dbContext.Tags.FirstOrDefaultAsync(t => t.Id == id);
            if (tag == null)
            {
                return NotFound();
            }
            return JsonContent(tag);
        }

        [HttpPost]
        public async Task<ActionResult<Tag>> PostTag([FromBody] Tag tag)
        {
            //Vérification de l'objet
            if (tag == null)
            {
                return BadRequest("Le tag ne peut pas être nul.");
            }

            //Ajout du restaurant en bdd
            dbContext.Tags.Add(tag);
            await dbContext.SaveChangesAsync();

            return JsonContent(tag);
        }
    }
}
