using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Interfaces;
using Data;
using Services;

var builder = WebApplication.CreateBuilder(args);
var conStrBuilder = new SqlConnectionStringBuilder(
        builder.Configuration.GetConnectionString("RestaurantFranchiseDB"));

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<RestaurantFranchiseContext>(options =>
        options.UseSqlServer(conStrBuilder.ConnectionString));

builder.Services.AddScoped<IFranchiseService, FranchiseService>();
builder.Services.AddScoped<IRestaurantService, RestaurantService>();
builder.Services.AddScoped<IRestaurantTagService, RestaurantTagService>();
builder.Services.AddScoped<ITagService, TagService>();

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