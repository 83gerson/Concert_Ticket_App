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
        public string tipo { get; set; }

        [Required]
        public decimal precio { get; set; }

        [Required]
        public int idConcierto { get; set; }

        [Required]
        public int idAsiento { get; set; }

        [ForeignKey("idConcierto")]
        public virtual ConciertoDA ConciertoAsociado { get; set; } = null!;

        [ForeignKey("idAsiento")]
        public virtual AsientoDA AsientoAsociado { get; set; } = null!;

        public virtual ICollection<ReservaDA> ReservaDA { get; set; } = new List<ReservaDA>();
    }

}
