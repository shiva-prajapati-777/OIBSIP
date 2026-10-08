"use strict";

/* =========================
   ELEMENTS
========================= */

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");

const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

const emptyPending = document.getElementById("emptyPending");
const emptyCompleted = document.getElementById("emptyCompleted");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const pendingBadge = document.getElementById("pendingBadge");
const completedBadge = document.getElementById("completedBadge");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const clearCompleted = document.getElementById("clearCompleted");

const toast = document.getElementById("toast");

const dayName = document.getElementById("dayName");
const currentDate = document.getElementById("currentDate");


/* =========================
   LOAD TASKS
========================= */

let tasks = JSON.parse(
    localStorage.getItem("taskflowTasks")
) || [];


/* =========================
   DATE
========================= */

function updateDate() {

    const now = new Date();

    dayName.textContent = now.toLocaleDateString(
        "en-US", {
            weekday: "long"
        }
    );

    currentDate.textContent = now.toLocaleDateString(
        "en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}

updateDate();


/* =========================
   SAVE TASKS
========================= */

function saveTasks() {

    localStorage.setItem(
        "taskflowTasks",
        JSON.stringify(tasks)
    );
}


/* =========================
   ADD TASK
========================= */

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const text = taskInput.value.trim();

    if (!text) {

        showToast("Please enter a task.");

        taskInput.focus();

        return;
    }

    const newTask = {

        id: Date.now(),

        text: text,

        completed: false,

        createdAt: new Date().toISOString(),

        completedAt: null
    };

    tasks.unshift(newTask);

    saveTasks();

    taskInput.value = "";

    renderTasks();

    showToast("Task added successfully.");
});


/* =========================
   RENDER TASKS
========================= */

function renderTasks() {

    pendingList.innerHTML = "";

    completedList.innerHTML = "";

    const pending = tasks.filter(
        task => !task.completed
    );

    const completed = tasks.filter(
        task => task.completed
    );


    pending.forEach(task => {

        pendingList.appendChild(
            createTaskElement(task)
        );

    });


    completed.forEach(task => {

        completedList.appendChild(
            createTaskElement(task)
        );

    });


    updateStats(
        pending.length,
        completed.length
    );
}


/* =========================
   CREATE TASK ELEMENT
========================= */

function createTaskElement(task) {

    const item = document.createElement("div");

    item.className = "task-item";

    if (task.completed) {
        item.classList.add("completed");
    }


    /* CHECK BUTTON */

    const checkButton = document.createElement("button");

    checkButton.className = "check-btn";

    checkButton.title = task.completed ?
        "Mark as pending" :
        "Mark as complete";

    checkButton.textContent = task.completed ?
        "✓" :
        "";

    checkButton.addEventListener(
        "click",
        function() {

            toggleTask(task.id);

        }
    );


    /* CONTENT */

    const content = document.createElement("div");

    content.className = "task-content";


    /* TASK TEXT */

    const text = document.createElement("span");

    text.className = "task-text";

    text.textContent = task.text;


    /* TIMESTAMP */

    const time = document.createElement("span");

    time.className = "task-time";

    let timeText = `Added ${formatDate(task.createdAt)}`;

    if (task.completedAt) {

        timeText +=
            ` • Completed ${formatDate(task.completedAt)}`;

    }

    time.textContent = timeText;


    content.appendChild(text);

    content.appendChild(time);


    /* ACTIONS */

    const actions = document.createElement("div");

    actions.className = "task-actions";


    /* EDIT */

    const editButton = document.createElement("button");

    editButton.className = "action-btn";

    editButton.title = "Edit task";

    editButton.textContent = "✎";

    editButton.addEventListener(
        "click",
        function() {

            startInlineEdit(
                task,
                content,
                actions
            );

        }
    );


    /* DELETE */

    const deleteButton = document.createElement("button");

    deleteButton.className =
        "action-btn delete-btn";

    deleteButton.title = "Delete task";

    deleteButton.textContent = "×";

    deleteButton.addEventListener(
        "click",
        function() {

            deleteTask(task.id);

        }
    );


    actions.appendChild(editButton);

    actions.appendChild(deleteButton);


    item.appendChild(checkButton);

    item.appendChild(content);

    item.appendChild(actions);


    return item;
}


/* =========================
   INLINE EDIT
========================= */

function startInlineEdit(
    task,
    content,
    actions
) {

    const oldText = task.text;


    /* INPUT */

    const editInput = document.createElement("input");

    editInput.type = "text";

    editInput.value = oldText;

    editInput.maxLength = 100;

    editInput.className = "edit-input";


    /* SAVE */

    const saveButton = document.createElement("button");

    saveButton.className = "action-btn";

    saveButton.title = "Save";

    saveButton.textContent = "✓";


    /* CANCEL */

    const cancelButton = document.createElement("button");

    cancelButton.className = "action-btn";

    cancelButton.title = "Cancel";

    cancelButton.textContent = "×";


    content.innerHTML = "";

    content.appendChild(editInput);


    actions.innerHTML = "";

    actions.appendChild(saveButton);

    actions.appendChild(cancelButton);


    editInput.focus();

    editInput.select();


    /* SAVE FUNCTION */

    function saveEdit() {

        const newText =
            editInput.value.trim();


        if (!newText) {

            showToast(
                "Task cannot be empty."
            );

            editInput.focus();

            return;
        }


        task.text = newText;

        saveTasks();

        renderTasks();

        showToast(
            "Task updated successfully."
        );
    }


    /* CANCEL FUNCTION */

    function cancelEdit() {

        renderTasks();

    }


    saveButton.addEventListener(
        "click",
        saveEdit
    );


    cancelButton.addEventListener(
        "click",
        cancelEdit
    );


    /* ENTER = SAVE */

    editInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                saveEdit();

            }

            if (event.key === "Escape") {

                cancelEdit();

            }

        }
    );
}


/* =========================
   COMPLETE / UNCOMPLETE
========================= */

function toggleTask(id) {

    const task = tasks.find(
        task => task.id === id
    );

    if (!task) {
        return;
    }


    task.completed = !task.completed;


    if (task.completed) {

        task.completedAt =
            new Date().toISOString();

    } else {

        task.completedAt = null;

    }


    saveTasks();

    renderTasks();


    if (task.completed) {

        showToast(
            "Task completed! 🎉"
        );

    } else {

        showToast(
            "Task moved to pending."
        );

    }
}


/* =========================
   DELETE TASK
========================= */

function deleteTask(id) {

    const task = tasks.find(
        task => task.id === id
    );

    if (!task) {
        return;
    }


    const confirmed = confirm(
        `Delete "${task.text}"?`
    );


    if (!confirmed) {
        return;
    }


    tasks = tasks.filter(
        task => task.id !== id
    );


    saveTasks();

    renderTasks();

    showToast(
        "Task deleted."
    );
}


/* =========================
   CLEAR COMPLETED
========================= */

clearCompleted.addEventListener(
    "click",
    function() {

        const completedCount =
            tasks.filter(
                task => task.completed
            ).length;


        if (completedCount === 0) {

            showToast(
                "No completed tasks to clear."
            );

            return;
        }


        tasks = tasks.filter(
            task => !task.completed
        );


        saveTasks();

        renderTasks();

        showToast(
            "Completed tasks cleared."
        );
    }
);


/* =========================
   STATISTICS
========================= */

function updateStats(
    pending,
    completed
) {

    const total =
        pending + completed;


    totalTasks.textContent =
        total;

    pendingTasks.textContent =
        pending;

    completedTasks.textContent =
        completed;


    pendingBadge.textContent =
        pending;

    completedBadge.textContent =
        completed;


    /* EMPTY STATES */

    emptyPending.style.display =
        pending === 0 ?
        "block" :
        "none";


    emptyCompleted.style.display =
        completed === 0 ?
        "block" :
        "none";


    /* PROGRESS */

    const progress =
        total === 0 ?
        0 :
        Math.round(
            (completed / total) * 100
        );


    progressFill.style.width =
        `${progress}%`;

    progressText.textContent =
        `${progress}%`;
}


/* =========================
   FORMAT DATE
========================= */

function formatDate(dateString) {

    const date =
        new Date(dateString);


    return date.toLocaleString(
        "en-US", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


/* =========================
   TOAST
========================= */

let toastTimer;


function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer = setTimeout(
        function() {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );
}


/* =========================
   KEYBOARD SHORTCUT
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "/" &&
            document.activeElement !== taskInput
        ) {

            event.preventDefault();

            taskInput.focus();

        }

    }
);


/* =========================
   INITIAL LOAD
========================= */

renderTasks();