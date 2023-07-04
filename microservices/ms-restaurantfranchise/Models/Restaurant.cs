using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Restaurant")]
    public class Restaurant
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("id_franchise")]
        public int IdFranchise { get; set; }

        [ForeignKey("IdFranchise")]
        public Franchise? Franchise { get; set; }

        [Required]
        [StringLength(255)]
        [Column("name")]
        public string Name { get; set; }

        [Required]
        [StringLength(255)]
        [Column("address1")]
        public string Address1 { get; set; }

        [StringLength(255)]
        [Column("address2")]
        public string Address2 { get; set; }

        [StringLength(255)]
        [Column("address3")]
        public string Address3 { get; set; }

        [Required]
        [StringLength(255)]
        [Column("city")]
        public string City { get; set; }

        [Required]
        [StringLength(5)]
        [Column("postal_code")]
        public string PostalCode { get; set; }

        [Required]
        [StringLength(255)]
        [Column("country")]
        public string Country { get; set; }

        [StringLength(255)]
        [Column("additional_details")]
        public string AdditionalDetails { get; set; }

        [Required]
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }
    }
}
