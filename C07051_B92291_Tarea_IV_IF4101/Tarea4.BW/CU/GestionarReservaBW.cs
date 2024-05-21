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
    public class GestionarReservaBW : IGestionarReservaBW
    {
        private readonly IGestionarReservaDA gestionarReservaDA;

        public GestionarReservaBW(IGestionarReservaDA gestionarReservaDA)
        {
            this.gestionarReservaDA = gestionarReservaDA;
        }

        public async Task<int> buscarIdDisponible()
        {
            return await gestionarReservaDA.buscarIdDisponible();
        }

        public async Task<decimal> calcularTotal(int idReserva)
        {
            return await gestionarReservaDA.calcularTotal(idReserva);
        }

        public async Task<IEnumerable<Reserva>> listarReservasPorUsuario(int idUsuario)
        {
            return await gestionarReservaDA.listarReservasPorUsuario(idUsuario);
        }
    }
}
