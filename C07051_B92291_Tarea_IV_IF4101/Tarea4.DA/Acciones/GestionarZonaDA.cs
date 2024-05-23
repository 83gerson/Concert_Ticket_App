using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tarea4.BC.Modelos;
using Tarea4.BW.Interfaces.DA;
using Tarea4.DA.Contexto;

namespace Tarea4.DA.Acciones
{
    public class GestionarZonaDA : IGestionarZonaDA
    {
        private readonly Tarea4Context tarea4Context;

        public GestionarZonaDA(Tarea4Context tarea4Context) 
        { 
            this.tarea4Context = tarea4Context;
        }

        public async Task<IEnumerable<Zona>> buscarZonasPorConcierto(int idConcierto)
        {
            var zonas = await tarea4Context.conciertoZonaDA
                .Where(cz => cz.idConcierto == idConcierto)
                .Select(cz => new Zona
                {
                    idZona = cz.Zona.idZona,
                    nombre = cz.Zona.nombre
                })
                .ToListAsync();

            return zonas;
        }
    }
}
