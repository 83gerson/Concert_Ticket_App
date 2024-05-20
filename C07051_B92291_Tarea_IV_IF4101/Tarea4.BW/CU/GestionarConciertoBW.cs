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
    public class GestionarConciertoBW : IGestionarConciertoBW
    {
        private IGestionarConciertoDA gestionarConciertoDA;

        public GestionarConciertoBW(IGestionarConciertoDA gestionarConciertoDA)
        {
            this.gestionarConciertoDA = gestionarConciertoDA;
        }

        public async Task<IEnumerable<Concierto>> listarConciertos()
        {
            return await gestionarConciertoDA.listarConciertos();
        }
    }
}
