// Models/TaskItem.cs
using Newtonsoft.Json;

namespace TaskApi.Models
{
    public class TaskItem
    {
        [JsonIgnore]
        public string Id { get; set; }  // Nullable string for Id
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Completed { get; set; } = false;  // Default value for Completed
    }
}
