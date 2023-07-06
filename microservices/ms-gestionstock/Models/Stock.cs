using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Stock")]
    [PrimaryKey(nameof(IdRestaurant), nameof(IdIngredient))]
    public class Stock
    {
        [Required]
        [Column("id_restaurant")]
        public int IdRestaurant { get; set; }

        [Required]
        [Column("id_ingredient")]
        public int IdIngredient { get; set; }

        [Required]
        [Column("value")]
        public int Value { get; set; }
    }
}
