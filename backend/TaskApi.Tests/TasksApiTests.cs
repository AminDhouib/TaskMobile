using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskApi.Controllers;
using TaskApi.Data;
using TaskApi.Models;

namespace TaskApi.Tests.Controllers
{
    public class TasksControllerTests
    {
        private readonly TaskContext _context;
        private readonly TasksController _controller;

        public TasksControllerTests()
        {
            // Initialize temporary database
            var options = new DbContextOptionsBuilder<TaskContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _context = new TaskContext(options);

            _context.Tasks.AddRange(
                new TaskItem { Id = Guid.NewGuid().ToString(), Title = "Task 1", Description = "Description 1", Completed = false },
                new TaskItem { Id = Guid.NewGuid().ToString(), Title = "Task 2", Description = "Description 2", Completed = false }
            );
            _context.SaveChanges();

            _controller = new TasksController(_context);
        }

        [Fact]
        public async Task CreateTask_ShouldCreateTask()
        {
            // Arrange the input data for creating a new task
            var createTaskDto = new CreateTaskDto { Title = "New Task", Description = "New Description" };

            var result = await _controller.PostTask(createTaskDto);

            var actionResult = Assert.IsType<ActionResult<TaskItem>>(result);
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
            var returnValue = Assert.IsType<TaskItem>(createdAtActionResult.Value);
            Assert.Equal("New Task", returnValue.Title);
            Assert.Equal("New Description", returnValue.Description);
            Assert.False(returnValue.Completed);
        }

        [Fact]
        public async Task GetTaskById_ShouldReturnTask_WhenTaskExists()
        {
            var taskItem = _context.Tasks.First(t => t.Title == "Task 1");

            var result = await _controller.GetTask(taskItem.Id);

            var actionResult = Assert.IsType<ActionResult<TaskItem>>(result);
            var returnValue = Assert.IsType<TaskItem>(actionResult.Value);
            Assert.Equal(taskItem.Id, returnValue.Id);
        }

        [Fact]
        public async Task GetTaskById_ShouldReturnNotFound_WhenTaskDoesNotExist()
        {
            var nonExistentId = Guid.NewGuid().ToString();

            var result = await _controller.GetTask(nonExistentId);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task UpdateTask_ShouldUpdateTask_WhenTaskExists()
        {
            var updateTaskDto = new UpdateTaskDto { Title = "Updated Task", Description = "Updated Description", Completed = true };
            var taskItem = _context.Tasks.First(t => t.Title == "Task 1");

            var result = await _controller.PutTask(taskItem.Id, updateTaskDto);

            Assert.IsType<NoContentResult>(result);
            Assert.Equal("Updated Task", taskItem.Title);
            Assert.Equal("Updated Description", taskItem.Description);
            Assert.True(taskItem.Completed);
        }

        [Fact]
        public async Task UpdateTask_ShouldReturnNotFound_WhenTaskDoesNotExist()
        {
            var updateTaskDto = new UpdateTaskDto { Title = "Updated Task", Description = "Updated Description", Completed = true };
            var nonExistentId = Guid.NewGuid().ToString();

            var result = await _controller.PutTask(nonExistentId, updateTaskDto);

            Assert.IsType<NotFoundResult>(result);
        }


        [Fact]
        public async Task GetTasks_ShouldReturnAllTasks()
        {
            var result = await _controller.GetTasks();

            var actionResult = Assert.IsType<ActionResult<IEnumerable<TaskItem>>>(result);
            var returnValue = Assert.IsType<List<TaskItem>>(actionResult.Value);
            Assert.Equal(2, returnValue.Count);
            Assert.Equal("Task 1", returnValue[0].Title);
            Assert.Equal("Task 2", returnValue[1].Title);
        }

        [Fact]
        public async Task CreateTask_ShouldCheckForExistingTask()
        {
            // Arrange the input data for creating a new task
            var createTaskDto = new CreateTaskDto { Title = "Existing Task", Description = "New Description" };

            await _controller.PostTask(createTaskDto);

            var result = await _controller.GetTasks();

            var actionResult = Assert.IsType<ActionResult<IEnumerable<TaskItem>>>(result);
            var returnValue = Assert.IsType<List<TaskItem>>(actionResult.Value);
            Assert.Equal(3, returnValue.Count);
            Assert.Contains(returnValue, t => t.Title == "Existing Task");
        }

        [Fact]
        public async Task DeleteTask_ShouldDeleteTask_WhenTaskExists()
        {
            var taskItem = _context.Tasks.First(t => t.Title == "Task 1");

            var result = await _controller.DeleteTask(taskItem.Id);

            Assert.IsType<NoContentResult>(result);
            Assert.Null(_context.Tasks.Find(taskItem.Id));
        }

        [Fact]
        public async Task DeleteTask_ShouldReturnNotFound_WhenTaskDoesNotExist()
        {
            var nonExistentId = Guid.NewGuid().ToString();

            var result = await _controller.DeleteTask(nonExistentId);

            Assert.IsType<NotFoundResult>(result);
        }
    }
}
