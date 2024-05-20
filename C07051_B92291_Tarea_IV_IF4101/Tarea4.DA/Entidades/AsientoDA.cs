using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tarea4.DA.Entidades
{
    [Table("Asiento")]
    public class AsientoDA
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int idAsiento { get; set; }

        [Required]
        public string numero { get; set; }

        public virtual ICollection<ConciertoAsientoDA> ConciertoAsientoDA { get; set; } = new List<ConciertoAsientoDA>();
    }

}
