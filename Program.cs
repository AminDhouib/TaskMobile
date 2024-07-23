// Program.cs
using Microsoft.EntityFrameworkCore;
using TaskApi.Data;
using Microsoft.Azure.Cosmos;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure Cosmos DB
builder.Services.AddDbContext<TaskContext>(options =>
{
    var cosmosSettings = builder.Configuration.GetSection("CosmosDb");
    options.UseCosmos(
        cosmosSettings["Account"],
        cosmosSettings["Key"],
        cosmosSettings["DatabaseName"]
    );
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Ensure the database and container are created
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<TaskContext>();
    var cosmosSettings = app.Configuration.GetSection("CosmosDb");
    var client = new CosmosClient(cosmosSettings["Account"], cosmosSettings["Key"]);
    var database = await client.CreateDatabaseIfNotExistsAsync(cosmosSettings["DatabaseName"]);
    await database.Database.CreateContainerIfNotExistsAsync(new ContainerProperties
    {
        Id = "Tasks",
        PartitionKeyPath = "/id"
    });
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
