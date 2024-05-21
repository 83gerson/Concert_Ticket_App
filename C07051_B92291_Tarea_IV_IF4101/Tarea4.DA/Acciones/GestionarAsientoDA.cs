using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tarea4.BC.Modelos;
using Tarea4.BW.Interfaces.DA;
using Tarea4.DA.Contexto;
using Tarea4.DA.Entidades;

namespace Tarea4.DA.Acciones
{
    public class GestionarAsientoDA : IGestionarAsientoDA
    {
        private readonly Tarea4Context tarea4Context;

        public GestionarAsientoDA(Tarea4Context tarea4Context)
        {
            this.tarea4Context = tarea4Context;
        }
        public async Task<IEnumerable<Asiento>> buscarAsientosDisponibles(int idConcierto, int idZona)
        {
            var asientosDisponibles = await tarea4Context.conciertoAsientoDA
            .Where(ca => ca.idConcierto == idConcierto && ca.idZona == idZona)
            .Select(ca => new { ca, ca.AsientoAsociado })
            .Where(ca => !tarea4Context.ReservaDA
                                .Any(r => r.idConcierto == idConcierto && r.idAsiento == ca.ca.idAsiento))
            .Select(ca => new AsientoDA
            {
                idAsiento = ca.AsientoAsociado.idAsiento,
                numero = ca.AsientoAsociado.numero
            })
            .ToListAsync();

            List<Asiento> asientos = new List<Asiento>();
            for (int i = 0; i < asientosDisponibles.LongCount(); i++)
            {
                Asiento asiento = new Asiento();
                asiento.idAsiento = asientosDisponibles[i].idAsiento;
                asiento.numero = asientosDisponibles[i].numero;
                asientos.Add(asiento);
            }

            return asientos;
        }
    }
}
