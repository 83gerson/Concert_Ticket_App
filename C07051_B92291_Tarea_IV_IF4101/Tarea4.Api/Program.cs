using Microsoft.EntityFrameworkCore;
using Tarea4.BW.CU;
using Tarea4.BW.Interfaces.BW;
using Tarea4.BW.Interfaces.DA;
using Tarea4.DA.Acciones;
using Tarea4.DA.Contexto;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Inyecci�n de Dependencias
builder.Services.AddTransient<IGestionarUsuarioBW, GestionarUsuarioBW>();
builder.Services.AddTransient<IGestionarUsuarioDA, GestionarUsuarioDA>();
builder.Services.AddTransient<IGestionarConciertoBW, GestionarConciertoBW>();
builder.Services.AddTransient<IGestionarConciertoDA, GestionarConciertoDA>();
builder.Services.AddTransient<IGestionarAsientoBW, GestionarAsientoBW>();
builder.Services.AddTransient<IGestionarAsientoDA, GestionarAsientoDA>();
builder.Services.AddTransient<IGestionarReservaBW, GestionarReservaBW>();
builder.Services.AddTransient<IGestionarReservaDA, GestionarReservaDA>();
builder.Services.AddTransient<IGestionarZonaBW, GestionarZonaBW>();
builder.Services.AddTransient<IGestionarZonaDA, GestionarZonaDA>();

//Conexi�n a BD
builder.Services.AddDbContext<Tarea4Context>(options =>
{
    // Usar la cadena de conexi�n desde la configuraci�n
    //var connectionString = "Data Source=DESKTOP-FEUS1TM;User Id=sa;Password=sa123456;Initial Catalog=Tarea4_Lenguajes;TrustServerCertificate=true;";
     var connectionString = "Data Source=(local);User Id=sa;Password=12345;Initial Catalog=Tarea4_Lenguajes;TrustServerCertificate=true;";
    options.UseSqlServer(connectionString);
    // Otros ajustes del contexto de base de datos pueden ser configurados aqu�, si es necesario
});


var app = builder.Build();

app.UseCors("AllowOrigin");
app.UseCors(options =>
{
    options.AllowAnyOrigin();
    options.AllowAnyMethod();
    options.AllowAnyHeader();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
