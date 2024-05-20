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
        [Required]
        public int idReserva { get; set; }

        [Required]
        public int idUsuario { get; set; }

        [Required]
        public int idConcierto { get; set; }

        [Required]
        public int idAsiento { get; set; }

        [ForeignKey("idUsuario")]
        public virtual UsuarioDA UsuarioAsociado { get; set; } = null!;

        [ForeignKey("idConcierto")]
        public virtual ConciertoDA ConciertoAsociado { get; set; } = null!;

        [ForeignKey("idAsiento")]
        public virtual ConciertoAsientoDA ConciertoAsientoAsociado { get; set; } = null!;
    }

}
