using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tarea4.DA.Entidades
{
    [Table("Reserva")]
    public class ReservaDA
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int idReserva { get; set; }

        [Required]
        public int idUsuario { get; set; }

        [Required]
        public int idConcierto { get; set; }

        [Required]
        public int idAsiento { get; set; }

        [ForeignKey("idUsuario")]
        public virtual UsuarioDA Usuario { get; set; } = null!;

        [ForeignKey("idConcierto")]
        public virtual ConciertoDA Concierto { get; set; } = null!;

        [ForeignKey("idAsiento")]
        public virtual ConciertoAsientoDA ConciertoAsiento { get; set; } = null!;
    }

}
