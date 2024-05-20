using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tarea4.DA.Entidades
{
    [Table("Concierto")]
    public class ConciertoDA
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int idConcierto { get; set; }

        [Required]
        public string artista { get; set; }

        [Required]
        public string imagen { get; set; }

        [Required]
        public DateTime fechaEvento { get; set; }

        [Required]
        public string lugar { get; set; }

        public virtual ICollection<ConciertoAsientoDA> ConciertoAsientoDA { get; set; } = new List<ConciertoAsientoDA>();

        public virtual ICollection<ReservaDA> ReservaDA { get; set; } = new List<ReservaDA>();
    }
}
