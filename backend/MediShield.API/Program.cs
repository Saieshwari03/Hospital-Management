using MediShield.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MediShieldDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Add MVC Controllers
builder.Services.AddControllers();

// Add OpenAPI
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure OpenAPI in Development
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Map API Controllers
app.MapControllers();

app.Run();