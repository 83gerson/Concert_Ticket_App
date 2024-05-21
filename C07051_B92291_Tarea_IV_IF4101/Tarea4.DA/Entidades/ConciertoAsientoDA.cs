using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tarea4.DA.Entidades
{
    [Table("Concierto_Asiento")]
    public class ConciertoAsientoDA
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int idConciertoAsiento { get; set; }

        [Required]
        public int idZona { get; set; }

        [Required]
        public int idConcierto { get; set; }

        [Required]
        public int idAsiento { get; set; }

        [ForeignKey("idZona")]
        public virtual ZonaDA ZonaAsociado { get; set; } = null!;

        [ForeignKey("idConcierto")]
        public virtual ConciertoDA ConciertoAsociado { get; set; } = null!;

        [ForeignKey("idAsiento")]
        public virtual AsientoDA AsientoAsociado { get; set; } = null!;
    }

}
