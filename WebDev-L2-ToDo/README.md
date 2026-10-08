# 📝 TaskFlow – To-Do Web App

> **Live Demo:** https://shiva-prajapati-777.github.io/OIBSIP/ToDo/

A modern, responsive, and interactive To-Do Web App developed as part of the **OASIS INFOBYTE Web Development & Designing Internship – Level 2, Task 3**.

TaskFlow helps users organize their daily activities by allowing them to add, complete, edit, delete, and manage tasks through a clean and professional interface.

---

## 🚀 Live Demo

🔗 **Project:**  
https://shiva-prajapati-777.github.io/OIBSIP/ToDo/

---

## 📌 Internship Details

**Organization:** OASIS INFOBYTE  
**Internship:** Web Development & Designing Internship  
**Level:** Level 2  
**Task:** Task 3 – To-Do Web App  
**Developer:** Shiva Prajapati  
**GitHub:** https://github.com/shiva-prajapati-777  
**Repository:** https://github.com/shiva-prajapati-777/OIBSIP

---

## 🎯 Objective

The objective of this project is to develop an interactive To-Do Web App that allows users to efficiently manage their daily tasks.

The application provides separate sections for pending and completed tasks and includes task management features such as:

- Add new tasks
- Mark tasks as completed
- Edit existing tasks
- Delete tasks
- Track pending and completed tasks
- Display task completion progress
- Store tasks using browser Local Storage
- Display task timestamps

---

## ✨ Features

### ➕ Add Tasks

Users can enter a task using the input field and click the **Add Task** button to immediately add it to the Pending Tasks section.

### ✅ Mark Tasks Complete

Users can mark a pending task as completed.

When a task is completed:

- It moves from **Pending Tasks** to **Completed Tasks**
- The task receives a strikethrough effect
- The completion timestamp is recorded
- Statistics are automatically updated

### ✏️ Inline Task Editing

Tasks can be edited directly inside the task card.

The inline editing system supports:

- Edit button
- Save changes
- Cancel editing
- Enter key to save
- Escape key to cancel

### 🗑️ Delete Tasks

Users can permanently delete individual tasks.

A confirmation message is displayed before deleting a task.

### 📊 Task Statistics

The application automatically displays:

- **Total Tasks**
- **Pending Tasks**
- **Completed Tasks**

The statistics update automatically whenever tasks are added, completed, edited, or deleted.

### 📈 Daily Progress

TaskFlow includes a dynamic progress bar that calculates the percentage of completed tasks.

Example:

```text
Total Tasks: 4
Completed: 3
Progress: 75%
💾 Local Storage

Tasks are stored using the browser's localStorage.

This allows tasks to remain available after:

Refreshing the browser
Closing and reopening the page
🕒 Task Timestamps

Each task records:

Added date and time
Completed date and time

Example:

Added Oct 09, 12:06 AM
Completed Oct 09, 12:07 AM
🧹 Clear Completed

Users can remove completed tasks using the Clear Completed option.

🔔 Toast Notifications

TaskFlow provides visual feedback when users:

Add a task
Complete a task
Edit a task
Delete a task
Clear completed tasks
📱 Responsive Design

The application is designed to work across:

Desktop
Laptop
Tablet
Mobile devices
🎨 User Interface

TaskFlow uses a modern dark-themed interface with:

Glassmorphism cards
Gradient accents
Purple and cyan highlights
Smooth hover effects
Rounded components
Responsive layouts
Animated visual elements
Clear typography

The interface is designed to remain simple while providing a professional and premium appearance.

🛠️ Technologies Used
Frontend
HTML5
CSS3
JavaScript
Browser Features
Local Storage API
DOM Manipulation
Event Handling
Responsive CSS
Fonts
Inter
Space Grotesk
📂 Project Structure
WebDev-L2-Task3-ToDo/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── screenshots/
    ├── desktop.png
    └── mobile.png
📄 File Description
index.html

Contains the complete structure of the To-Do Web App, including:

Header
Date display
Task input
Add Task button
Statistics
Progress bar
Pending Tasks section
Completed Tasks section
Footer
style.css

Contains the complete visual design and responsive layout, including:

Dark theme
Glassmorphism
Gradients
Cards
Buttons
Task states
Progress bar
Responsive layouts
Inline editing styles
Hover effects
Mobile styling
script.js

Contains the application's functionality, including:

Adding tasks
Rendering tasks
Completing tasks
Reopening completed tasks
Inline editing
Saving edits
Cancelling edits
Deleting tasks
Clearing completed tasks
Local Storage
Statistics
Progress calculation
Timestamps
Toast notifications
Keyboard shortcuts
🔄 Application Workflow
User enters task
       ↓
   Click Add Task
       ↓
Task appears in Pending Tasks
       ↓
   ┌───────────────┐
   │               │
   ↓               ↓
Complete          Edit
   ↓               ↓
Completed       Save / Cancel
   │
   ↓
Completed timestamp
   │
   ↓
Progress updated
📊 Task Management

TaskFlow maintains the following task states:

Pending

Newly created tasks are placed in the Pending Tasks section.

Completed

When a user marks a task as complete, it is automatically moved to the Completed Tasks section.

Reopened

A completed task can be marked incomplete again and returned to the Pending Tasks section.

💾 Local Storage Implementation

The application uses the browser's Local Storage API with the following storage key:

taskflowTasks

Task information is stored as structured data containing:

id
text
completed
createdAt
completedAt

This allows the application to restore the user's task list after refreshing the browser.

⌨️ Keyboard Support

TaskFlow supports keyboard interaction while editing tasks:

Key	Action
Enter	Save edited task
Escape	Cancel editing
/	Focus task input
📸 Screenshots
🖥️ Desktop View

📱 Mobile View

🌐 Deployment

The project is deployed using GitHub Pages.

Live Website

🔗 https://shiva-prajapati-777.github.io/OIBSIP/ToDo/

GitHub Repository

🔗 https://github.com/shiva-prajapati-777/OIBSIP

🧪 Tested Features

The following functionality has been implemented and tested:

 Add Task
 Display Pending Tasks
 Mark Task Complete
 Move Completed Task
 Edit Task Inline
 Save Edited Task
 Cancel Editing
 Delete Task
 Clear Completed Tasks
 Task Counters
 Progress Percentage
 Added Timestamp
 Completed Timestamp
 Local Storage Persistence
 Responsive Design
 Empty State Messages
 Toast Notifications
 Keyboard Support
📚 Learning Outcomes

Through this project, I strengthened my understanding of:

Semantic HTML5
Modern CSS3
Responsive Web Design
JavaScript DOM manipulation
Event handling
Array and object manipulation
Local Storage
Dynamic UI rendering
State management
Interactive web interfaces
Git and GitHub
GitHub Pages deployment
🎓 Internship Task

This project was developed as part of:

OASIS INFOBYTE Web Development & Designing Internship

Level 2 – Task 3: To-Do Web App

The project follows the internship requirements for creating an interactive task management application using HTML5, CSS3, and JavaScript.

👨‍💻 About the Developer
Shiva Prajapati

Computer Science Engineering Student | Software Developer | Problem Solver

📍 Kanpur, Uttar Pradesh, India

🎓 B.Tech – Computer Science Engineering
Maharana Institute of Professional Studies

🔗 GitHub:
https://github.com/shiva-prajapati-777

🔗 LinkedIn:
https://www.linkedin.com/in/shivaprajapati7/

🔗 LeetCode:
https://leetcode.com/u/ShivaPrajapati-777777/

📧 Email:
sp412457@gmail.com

🔗 Other OIBSIP Projects
Level 1
Landing Page
https://shiva-prajapati-777.github.io/OIBSIP/LandingPage/
Personal Portfolio
https://shiva-prajapati-777.github.io/OIBSIP/PersonalPortfolio/
Temperature Converter
https://shiva-prajapati-777.github.io/OIBSIP/TemperatureConverter/
Level 2
Calculator – NovaCalc
https://shiva-prajapati-777.github.io/OIBSIP/Calculator/
Tribute Page – Dr. A.P.J. Abdul Kalam
https://shiva-prajapati-777.github.io/OIBSIP/TributePage/
To-Do Web App – TaskFlow
https://shiva-prajapati-777.github.io/OIBSIP/ToDo/
📜 License

This project was created for educational and internship purposes as part of the OASIS INFOBYTE Web Development & Designing Internship.

© 2026 Shiva Prajapati. All Rights Reserved.

⭐ If you find this project useful, consider visiting the repository and exploring the other projects.
```
