using Microsoft.EntityFrameworkCore;
using Serilog;

try
{
    var builder = WebApplication.CreateBuilder(args);
    Log.Logger = new LoggerConfiguration()
        .ReadFrom.Configuration(builder.Configuration)
        .CreateLogger();

    // Add services to the container.
    builder.Host.UseSerilog();

    builder.Services.AddControllers();
    // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
    builder.Services.AddOpenApi();

    builder.Services.AddDbContext<AppDbContext>(options =>
       options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"),
           npgsqlOptions => npgsqlOptions.EnableRetryOnFailure()));

    var app = builder.Build();

    app.UseDefaultFiles();
    app.MapStaticAssets();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.Migrate();
        }
        app.MapOpenApi();
    }
    app.UseSerilogRequestLogging(); // Логирование всех HTTP-запросов через Serilog
    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

    app.MapFallbackToFile("/index.html");

    Log.Information("Приложение успешно запущено");

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Приложение завершилось с критической ошибкой");
}
finally
{
    Log.CloseAndFlush();
}