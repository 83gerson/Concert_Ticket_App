using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tarea4.BC.Modelos;
using Tarea4.BW.Interfaces.BW;

namespace Tarea4.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IGestionarUsuarioBW gestionarUsuarioBW;

        public UsuarioController(IGestionarUsuarioBW gestionarUsuarioBW)
        {
            this.gestionarUsuarioBW = gestionarUsuarioBW;
        }

        [HttpGet("BuscarUsuario")]
        public async Task<Usuario> buscarUsuario(string correo, string contrasenna)
        {
            return await gestionarUsuarioBW.buscarUsuario(correo, contrasenna);
        }

        [HttpPost("RegistrarUsuario")]
        public async Task<bool> registrarUsuario(Usuario usuario)
        {
            return await gestionarUsuarioBW.registrarUsuario(usuario);
        }
    }
}
