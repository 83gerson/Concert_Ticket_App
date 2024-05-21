using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tarea4.BC.Modelos;
using Tarea4.BW.Interfaces.BW;

namespace Tarea4.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservaController : ControllerBase
    {
        private readonly IGestionarReservaBW gestionarReservaBW;

        public ReservaController(IGestionarReservaBW gestionarReservaBW)
        {
            this.gestionarReservaBW = gestionarReservaBW;
        }

        [HttpGet("listarReservasPorUsuario/{idUsuario}")]
        public async Task<IEnumerable<Reserva>> listarReservasPorUsuario(int idUsuario)
        {
            return await gestionarReservaBW.listarReservasPorUsuario(idUsuario);
        }

        [HttpGet("calcularTota/{idReserva}")]
        public async Task<decimal> calcularTotal(int idReserva)
        {
            return await gestionarReservaBW.calcularTotal(idReserva);
        }

        [HttpGet("buscarIdDisponible")]
        public async Task<int> buscarIdDisponible()
        {
            return await gestionarReservaBW.buscarIdDisponible();
        }
    }
}
