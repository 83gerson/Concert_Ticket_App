using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tarea4.BC.Modelos;
using Tarea4.BW.Interfaces.BW;

namespace Tarea4.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZonaController : ControllerBase
    {
        private readonly IGestionarZonaBW gestionarZonaBW;

        public ZonaController(IGestionarZonaBW gestionarZonaBW)
        {
            this.gestionarZonaBW = gestionarZonaBW;
        }

        [HttpGet("BuscarZonasPorConcierto/{idConcierto}")]
        public async Task<IEnumerable<Zona>> buscarZonasPorConcierto(int idConcierto)
        {
            return await gestionarZonaBW.buscarZonasPorConcierto(idConcierto);
        }
    }
}
