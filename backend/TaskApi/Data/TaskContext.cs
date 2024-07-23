using Microsoft.EntityFrameworkCore;
using TaskApi.Models;

namespace TaskApi.Data
{
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options) : base(options) { }

        public DbSet<TaskItem> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Specifying that TaskItem entities will be stored in a container named "Tasks" in DB.
            modelBuilder.Entity<TaskItem>().ToContainer("Tasks");

            modelBuilder.Entity<TaskItem>().HasKey(t => t.Id);
            modelBuilder.Entity<TaskItem>().Property(t => t.Id).ToJsonProperty("id");
            modelBuilder.Entity<TaskItem>().Property(t => t.Title).ToJsonProperty("title");
            modelBuilder.Entity<TaskItem>().Property(t => t.Description).ToJsonProperty("description");
            modelBuilder.Entity<TaskItem>().Property(t => t.Completed).ToJsonProperty("completed");
            modelBuilder.Entity<TaskItem>().HasPartitionKey(t => t.Id);
        }
    }
}
