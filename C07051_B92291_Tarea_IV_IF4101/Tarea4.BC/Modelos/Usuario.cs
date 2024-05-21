using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tarea4.BC.Modelos
{
    public class Usuario
    {
        public int idUsuario { get; set; }

        public string nombre { get; set; }

        public string apellidos { get; set; }

        public DateTime fechaNacimiento { get; set; }

        public string correo { get; set; }

        public string contrasenna { get; set; }
    }
}
