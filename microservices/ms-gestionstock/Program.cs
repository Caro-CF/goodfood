using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ms_gestionstock.Data;
using ms_gestionstock.Interfaces;
using ms_gestionstock.Services;

var builder = WebApplication.CreateBuilder(args);
var conStrBuilder = new SqlConnectionStringBuilder(
        builder.Configuration.GetConnectionString("GestionStockDB"));

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<StockContext>(options =>
        options.UseSqlServer(conStrBuilder.ConnectionString));

builder.Services.AddScoped<IStockService, StockService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseAuthorization();

app.MapControllers();

app.Run();
