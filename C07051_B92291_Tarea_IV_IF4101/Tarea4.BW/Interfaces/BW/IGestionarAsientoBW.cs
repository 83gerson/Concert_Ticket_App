using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tarea4.BC.Modelos;

namespace Tarea4.BW.Interfaces.BW
{
    public interface IGestionarAsientoBW
    {
        Task<IEnumerable<Asiento>> buscarAsientosDisponibles(int idConcierto, int idZona);

        public Task<Asiento> buscarAsientoPorId(int idAsiento);
    }
}
