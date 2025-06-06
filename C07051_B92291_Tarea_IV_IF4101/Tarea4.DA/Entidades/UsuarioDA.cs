﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tarea4.DA.Entidades
{
    [Table("Usuario")]
    public class UsuarioDA
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int idUsuario { get; set; }

        [Required]
        public string nombre { get; set;}

        [Required]
        public string apellidos { get; set;}

        [Required]
        public DateTime fechaNacimiento { get; set;}

        [Required]
        public string correo { get; set;}

        [Required]
        public string contrasenna { get; set; }

        public virtual ICollection<ReservaDA> ReservaDA { get; set; } = new List<ReservaDA>();

    }
}
