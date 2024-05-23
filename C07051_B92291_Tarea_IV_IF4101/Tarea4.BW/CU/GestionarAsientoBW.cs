using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tarea4.BC.Modelos;
using Tarea4.BW.Interfaces.BW;
using Tarea4.BW.Interfaces.DA;

namespace Tarea4.BW.CU
{
    public class GestionarAsientoBW : IGestionarAsientoBW
    {
        private readonly IGestionarAsientoDA gestionarAsientoDA;

        public GestionarAsientoBW(IGestionarAsientoDA gestionarAsientoDA)
        {
            this.gestionarAsientoDA = gestionarAsientoDA;
        }

        public async Task<IEnumerable<Asiento>> buscarAsientosDisponibles(int idConcierto, int idZona)
        {
            return await gestionarAsientoDA.buscarAsientosDisponibles(idConcierto, idZona);
        }

        public async Task<Asiento> buscarAsientoPorId(int idAsiento)
        {
            return await gestionarAsientoDA.buscarAsientoPorId(idAsiento);
        }
    }
}
