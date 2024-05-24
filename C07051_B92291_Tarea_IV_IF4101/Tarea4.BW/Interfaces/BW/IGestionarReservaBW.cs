using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tarea4.BC.Modelos;

namespace Tarea4.BW.Interfaces.BW
{
    public interface IGestionarReservaBW
    {
        Task<IEnumerable<Reserva>> listarReservasPorUsuario(int idUsuario);
        Task<int> buscarIdDisponible();
        Task<decimal> calcularTotal(int idReserva);
        Task<bool> registrarReseva(Reserva reserva);
    }
}
