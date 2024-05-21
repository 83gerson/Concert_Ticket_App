using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tarea4.BC.Modelos
{
    public class Reserva
    {
        public int idReserva { get; set; }

        public int idUsuario { get; set; }

        public int idConcierto { get; set; }

        public int idAsiento { get; set; }
    }
}
