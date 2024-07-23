using Newtonsoft.Json;

namespace TaskApi.Models
{
    public class TaskItem
    {
        [JsonIgnore]
        public required string Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public bool Completed { get; set; } = false;
    }
}
