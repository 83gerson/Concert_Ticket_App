using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tarea4.BC.Modelos;
using Tarea4.BW.Interfaces.BW;

namespace Tarea4.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConciertoController : ControllerBase
    {
        private IGestionarConciertoBW gestionarConciertoBW;

        public ConciertoController(IGestionarConciertoBW gestionarConciertoBW)
        {
            this.gestionarConciertoBW = gestionarConciertoBW;
        }

        [HttpGet("ListarConciertos")]
        public async Task<IEnumerable<Concierto>> listarConciertos()
        {
            return await gestionarConciertoBW.listarConciertos();
        }
    }
}
