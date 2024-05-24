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
    public class GestionarReservaDA : IGestionarReservaDA
    {
        private readonly Tarea4Context tarea4Context;

        public GestionarReservaDA(Tarea4Context tarea4Context)
        {
            this.tarea4Context = tarea4Context;
        }
        public async Task<int> buscarIdDisponible()
        {
            int maxIdReserva = await tarea4Context.ReservaDA
            .MaxAsync(r => (int?)r.idReserva) ?? 0; // Devuelve 0 si no hay registros

            int nuevoIdReserva = maxIdReserva + 1;
            return nuevoIdReserva;
        }

        public async Task<decimal> calcularTotal(int idReserva)
        {
            var precioTotal = await tarea4Context.ReservaDA
            .Where(r => r.idReserva == idReserva)
            .SelectMany(r => tarea4Context.conciertoAsientoDA
                .Where(ca => ca.idConciertoAsiento == r.idAsiento)
                .SelectMany(ca => tarea4Context.conciertoZonaDA
                    .Where(cz => cz.idConcierto == ca.idConcierto && cz.idZona == ca.idZona)
                    .Select(cz => cz.precio)))
            .SumAsync();

            return precioTotal;
        }

        public async Task<IEnumerable<Reserva>> listarReservasPorUsuario(int idUsuario)
        {
            var reservas = await tarea4Context.ReservaDA
                .Where(r => r.idUsuario == idUsuario)
                .Select(reservaDA => new Reserva
                {
                    idReserva = reservaDA.idReserva,
                    idUsuario = reservaDA.idUsuario,
                    idConcierto = reservaDA.idConcierto,
                    idAsiento = reservaDA.idAsiento
                })
                .ToListAsync();

            return reservas;
        }

        public async Task<bool> registrarReseva(Reserva reserva)
        {
            Entidades.ReservaDA reservaBD = new()
            {
                idReserva = reserva.idReserva,
                idUsuario = reserva.idUsuario,
                idConcierto = reserva.idConcierto,
                idAsiento = reserva.idAsiento
            };

            await tarea4Context.ReservaDA.AddAsync(reservaBD);

            var resultado = await tarea4Context.SaveChangesAsync();

            if (resultado < 0)
                return false;

            return true;
        }
    }
}
