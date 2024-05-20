using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Tarea4.BC.Modelos;
using Tarea4.BW.Interfaces.DA;
using Tarea4.DA.Contexto;

namespace Tarea4.DA.Acciones
{
    public class GestionarConciertoDA : IGestionarConciertoDA
    {
        private readonly Tarea4Context tarea4Context;

        public GestionarConciertoDA(Tarea4Context tarea4Context)
        {
            this.tarea4Context = tarea4Context;
        }

        public async Task<IEnumerable<Concierto>> listarConciertos()
        {
            return await tarea4Context.ConciertoDA.
                Select(conciertoDA => new Concierto
                {
                    idConcierto = conciertoDA.idConcierto,
                    artista = conciertoDA.artista,
                    imagen = conciertoDA.imagen,
                    fechaEvento = conciertoDA.fechaEvento,
                    lugar = conciertoDA.lugar
                }).ToListAsync();
        }
    }
}
