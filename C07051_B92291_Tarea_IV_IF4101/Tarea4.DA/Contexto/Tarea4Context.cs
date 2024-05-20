using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Tarea4.DA.Entidades;

namespace Tarea4.DA.Contexto
{
    public class Tarea4Context : DbContext
    {
        public Tarea4Context(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<UsuarioDA> UsuarioDA { get; set; }
        public DbSet <ConciertoDA> ConciertoDA { get;set; }
        public DbSet<AsientoDA> AsientoDA { get; set;}
        public DbSet<ConciertoAsientoDA> conciertoAsientoDA { get; set; }
        public DbSet<ReservaDA> ReservaDA { get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ReservaDA>()
            .HasKey(r => new { r.idReserva, r.idUsuario, r.idConcierto, r.idAsiento });
        }
    }
}
