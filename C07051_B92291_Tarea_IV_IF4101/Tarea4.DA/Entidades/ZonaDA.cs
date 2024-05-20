using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tarea4.DA.Entidades
{
    [Table("Zona")]
    public class ZonaDA
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int idZona { get; set; }

        [Required]
        public string nombre { get; set; }

        public virtual ICollection<ConciertoZonaDA> ConciertoZonaDA { get; set; } = new List<ConciertoZonaDA>();

    }
}
