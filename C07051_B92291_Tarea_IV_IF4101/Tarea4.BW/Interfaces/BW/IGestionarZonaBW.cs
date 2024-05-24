using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tarea4.BC.Modelos;

namespace Tarea4.BW.Interfaces.BW
{
    public interface IGestionarZonaBW
    {
        public Task<IEnumerable<Zona>> buscarZonasPorConcierto(int idConcierto);
        public Task<Zona> buscarZonaPorConciertoYAsiento(int idConcierto, int idAsiento);
        public Task<decimal> buscarPrecioZona(int idConcierto, int idZona);
    }
}
