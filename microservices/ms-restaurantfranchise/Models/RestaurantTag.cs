using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("RestaurantTag")]
    [PrimaryKey(nameof(IdTag), nameof(IdRestaurant))]
    public class RestaurantTag
    {
        [Required]
        [Column("id_tag")]
        public int IdTag { get; set; }

        [Required]
        [Column("id_restaurant")]
        public int IdRestaurant { get; set; }

        [ForeignKey("IdTag")]
        public Tag? Tag { get; set; }

        [ForeignKey("IdRestaurant")]
        public Restaurant? Restaurant { get; set; }
    }
}
