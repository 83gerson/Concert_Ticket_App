﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tarea4.BC.Modelos;
using Tarea4.BW.Interfaces.BW;
using Tarea4.BW.Interfaces.DA;

namespace Tarea4.BW.CU
{
    public class GestionarZonaBW : IGestionarZonaBW
    {
        private readonly IGestionarZonaDA gestionarZonaDA;

        public GestionarZonaBW(IGestionarZonaDA gestionarZonaDA)
        {
            this.gestionarZonaDA = gestionarZonaDA;
        }

        public async Task<decimal> buscarPrecioZona(int idConcierto, int idZona)
        {
            return await gestionarZonaDA.buscarPrecioZona(idConcierto, idZona);
        }

        public async Task<Zona> buscarZonaPorConciertoYAsiento(int idConcierto, int idAsiento)
        {
            return await gestionarZonaDA.buscarZonaPorConciertoYAsiento(idConcierto, idAsiento);
        }

        public async Task<IEnumerable<Zona>> buscarZonasPorConcierto(int idConcierto)
        {
            return await gestionarZonaDA.buscarZonasPorConcierto(idConcierto);
        }
    }
}
