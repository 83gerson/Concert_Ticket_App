using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tarea4.BC.Modelos
{
    public class Concierto
    {
        public int idConcierto { get; set; }

        public string artista { get; set; }

        public string imagen { get; set; }

        public DateTime fechaEvento { get; set; }

        public string lugar { get; set; }
    }
}
