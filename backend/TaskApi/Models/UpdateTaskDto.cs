namespace TaskApi.Models
{
    public class UpdateTaskDto
    {
        public required string Title { get; set; }
        public required string Description { get; set; }

        public bool Completed { get; set; } = false;
    }
}
