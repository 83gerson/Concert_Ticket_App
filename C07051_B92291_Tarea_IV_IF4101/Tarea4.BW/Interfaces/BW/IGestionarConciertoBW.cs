using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tarea4.BC.Modelos;

namespace Tarea4.BW.Interfaces.BW
{
    public interface IGestionarConciertoBW
    {
        public Task<IEnumerable<Concierto>> listarConciertos();
        public Task<Concierto> buscarConciertoPorId(int idConcierto);
    }
}
