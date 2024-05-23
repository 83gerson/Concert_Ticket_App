using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tarea4.BC.Modelos;

namespace Tarea4.BW.Interfaces.DA
{
    public interface IGestionarZonaDA
    {
        public Task<IEnumerable<Zona>> buscarZonasPorConcierto(int idConcierto);
        public Task<Zona> buscarZonaPorConciertoYAsiento(int idConcierto, int idAsiento);
    }
}
