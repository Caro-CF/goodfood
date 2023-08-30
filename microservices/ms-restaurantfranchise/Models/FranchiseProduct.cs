using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("FranchiseProduct")]
    [PrimaryKey(nameof(IdFranchise), nameof(IdProduct))]
    public class FranchiseProduct
    {
        [Required]
        [Column("id_franchise")]
        public int IdFranchise { get; set; }

        [Required]
        [Column("id_product")]
        public int IdProduct { get; set; }

        [Required]
        [Column("prix")]
        public double Prix { get; set; }
    }
}
