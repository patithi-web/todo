const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");

     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
     let currentFilter = "all";

           function saveTasks() {
               localStorage.setItem("tasks", JSON.stringify(tasks));
}

           function renderTasks() {
                taskList.innerHTML = "";

         let filteredTasks = tasks.filter(task => {
             if (currentFilter === "pending") return !task.completed;
            if (currentFilter === "completed") return task.completed;
                return true;
  });

          filteredTasks.forEach(task => {
              const li = document.createElement("li");
              li.className = task.completed ? "completed" : "";

          const span = document.createElement("span");
          span.textContent = task.text;

       const toggleBtn = document.createElement("button");
       toggleBtn.textContent = task.completed ? "Undo" : "Done";
       toggleBtn.onclick = () => toggleTask(task.id);

       const deleteBtn = document.createElement("button");
       deleteBtn.textContent = "Delete";
       deleteBtn.classList.add("delete-btn");
       deleteBtn.onclick = () => deleteTask(task.id);

    const actions = document.createElement("div");
    actions.classList.add("task-actions");
    actions.append(toggleBtn, deleteBtn);

       li.append(span, actions);
       taskList.appendChild(li);
  });
}

     addBtn.addEventListener("click", () => {
     const text = taskInput.value.trim();
     if (!text) return;

        const newTask = {
        id: Date.now(),
        text,
        completed: false
  };

      tasks.push(newTask);
       saveTasks();
       renderTasks();

  taskInput.value = "";
});

        function toggleTask(id) {
           tasks = tasks.map(task =>
           task.id === id ? {task, completed: !task.completed } : task
  );
      saveTasks();
     renderTasks();
}

       function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
}

      filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
      document.querySelector(".filters .active").classList.remove("active");
      btn.classList.add("active");

        currentFilter = btn.dataset.filter;
        renderTasks();

  });
});

renderTasks();