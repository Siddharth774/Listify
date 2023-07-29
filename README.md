# Listify Web Application

This repository contains a Listify web application built using the following technologies:

- Express.js: A minimal and flexible Node.js web application framework.
- EJS: A simple and effective JavaScript templating engine.
- Node.js: A powerful server-side JavaScript runtime environment.
- MongoDB Atlas: A cloud-based, fully managed database service for MongoDB.

### Features

- User-friendly interface to add, update, and delete tasks.
- Tasks are stored in the MongoDB Atlas database for persistence.
- Real-time synchronization of tasks for multiple users.

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (Download and install from https://nodejs.org/)
- MongoDB Atlas account (Sign up at https://www.mongodb.com/cloud/atlas)

### Getting Started

1. Clone this repository to your local machine.
2. Install the required dependencies using the following command:
   ```
   npm install
   ```
3. Set up your MongoDB Atlas account and obtain the connection string.
4. Create a `.env` file in the root directory of the project and add the following:
   ```
   MONGODB_URI=<Your MongoDB Atlas Connection String>
   ```
5. Run the application using the following command:
   ```
   npm start
   ```
6. Open your web browser and go to `http://localhost:6969` to access the application.

### Usage

- To add a new task, enter the task description and click the "Add Task" button.
- To update a task, click the "Edit" button next to the task, make the necessary changes, and click "Save".
- To mark a task as completed, click the checkbox next to the task.
- To delete a task, click the "Delete" button next to the task.

### Contributing

Contributions to this project are welcome. If you find any issues or have any feature suggestions, please open an issue or submit a pull request.


### Acknowledgments

This project was inspired by the need for a simple and customizable To-Do List application using modern web development technologies.

### Author

Siddharth Sharma
