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
    public class GestionarUsuarioBW : IGestionarUsuarioBW
    {
        private readonly IGestionarUsuarioDA gestionarUsuarioDA;

        public GestionarUsuarioBW(IGestionarUsuarioDA gestionarUsuarioDA) 
        {
            this.gestionarUsuarioDA = gestionarUsuarioDA;
        }
        public async Task<Usuario> buscarUsuario(string correo, string contrasenna)
        {
            return await gestionarUsuarioDA.buscarUsuario(correo, contrasenna);
        }

        public async Task<bool> registrarUsuario(Usuario usuario)
        {
            return await gestionarUsuarioDA.registrarUsuario(usuario);
        }
    }
}
