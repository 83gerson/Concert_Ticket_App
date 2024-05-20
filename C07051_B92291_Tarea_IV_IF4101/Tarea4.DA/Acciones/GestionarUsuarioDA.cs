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
using Tarea4.DA.Entidades;

namespace Tarea4.DA.Acciones
{
    public class GestionarUsuarioDA : IGestionarUsuarioDA
    {
        private readonly Tarea4Context tarea4Context;

        public GestionarUsuarioDA(Tarea4Context tarea4Context)
        {
            this.tarea4Context = tarea4Context;
        }

        public async Task<Usuario> buscarUsuario(string correo, string contrasenna)
        {
            var usuarioDA = await tarea4Context.UsuarioDA.FirstOrDefaultAsync(u => u.correo == correo && u.contrasenna == contrasenna);

            if (usuarioDA != null)
            {
                //Se puede usar new() sin llamar directamente al constructor
                Usuario usuario = new()
                {
                    idUsuario = usuarioDA.idUsuario,
                    nombre = usuarioDA.nombre,
                    apellidos = usuarioDA.apellidos,
                    fechaNacimiento = usuarioDA.fechaNacimiento,
                    correo = correo,
                    contrasenna = contrasenna
                };

                return usuario;
            }

            return null;
        }

        public async Task<bool> registrarUsuario(Usuario usuario)
        {
            Entidades.UsuarioDA usuarioBD = new()
            {
                idUsuario = usuario.idUsuario,
                nombre = usuario.nombre,
                apellidos = usuario.apellidos,
                fechaNacimiento = usuario.fechaNacimiento,
                correo = usuario.correo,
                contrasenna = usuario.contrasenna
            };

            await tarea4Context.UsuarioDA.AddAsync(usuarioBD);

            var resultado = await tarea4Context.SaveChangesAsync();

            if (resultado < 0)
                return false;

            return true;
        }
    }
}
