using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tarea4.BC.Modelos;
using Tarea4.BW.Interfaces.BW;

namespace Tarea4.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsientoController : ControllerBase
    {
        private readonly IGestionarAsientoBW gestionarAsientoBW;

        public AsientoController(IGestionarAsientoBW gestionarAsientoBW)
        {
            this.gestionarAsientoBW = gestionarAsientoBW;
        }

        [HttpGet("buscarAsientosDisponibles")]
        public async Task<IEnumerable<Asiento>> buscarAsientosDisponibles(int idConcierto, int idZona)
        { 
            return await gestionarAsientoBW.buscarAsientosDisponibles(idConcierto, idZona);
        }
    }
}
