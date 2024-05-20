using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tarea4.DA.Entidades
{
    [Table("Concierto_Zona")]
    public class ConciertoZonaDA
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int idConciertoZona { get; set; }

        [Required]
        public int idConcierto { get; set; }

        [Required]
        public int idZona { get; set; }

        [Required]
        public decimal precio { get; set; }

        [ForeignKey("idConcierto")]
        public virtual ConciertoDA Concierto { get; set; } = null!;

        [ForeignKey("idZona")]
        public virtual ZonaDA Zona { get; set; } = null!;

        public virtual ICollection<ConciertoAsientoDA> ConciertoAsientoDA { get; set; } = new List<ConciertoAsientoDA>();
    }
}
