namespace TaskApi.Models
{
    public class CreateTaskDto
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
    }
}