# Goal & Habit Tracker "Milestone"

Welcome to the Goal & Habit Tracker "Milestone" project! This application is designed to help users track their goals and habits effectively. Whether you're aiming for personal development, fitness goals, or professional milestones, this tracker provides the tools you need to stay organized and motivated.

- [Figma sketch](https://www.figma.com/file/m6YOhJuu564yqtd0crKgBd/Frontend-sketch?type=design&node-id=0%3A1&mode=design&t=RKIWgdJBskrh7fWj-1)
- [Figjam flow](https://www.figma.com/file/y4S1hGA0y2e7yhuTgbPV23/figjam-flow?type=whiteboard&node-id=0%3A1&t=2DGPNJmBOT6P3GkC-1)
  
## Features

- **User Authentication**: Users can sign up and log in to access their personalized goal tracking dashboard.
- **Goal Management**:
  - CRUD Operations: Users can create, view, update, and delete their goals.
  - Customizable Repeat Options: Goals can be set to repeat daily, on weekdays, on weekends, or weekly (once a week).
- **Progress Tracking**:
  - View Progress: Users can track their progress for the week and view detailed goal statistics for the current week and the previous week.
- **Today View**:
  - Daily Goals Overview: Users can see all goals due for the current day and mark them as completed.

## Endpoints

- **User Routes**:
  - `POST /api/user/signup`: Register a new user.
  - `POST /api/user/login`: Log in an existing user.

- **Goal Routes**:
  - `GET /api/goals`: Retrieve all goals for the authenticated user.
  - `POST /api/goals`: Create a new goal.
  - `PUT /api/goals/{goalId}`: Update an existing goal.
  - `DELETE /api/goals/{goalId}`: Delete a goal.

- **Progress Routes**:
  - `GET /api/progress`: Retrieve progress statistics for all goals of the authenticated user.
  - `GET /api/progress/{goalId}`: Retrieve progress statistics for a specific goal.

- **Today Routes**:
  - `GET /api/today`: Retrieve all goals due for the current day.
  - `GET /api/today/{goalId}`: Retrieve details of a specific goal due for the current day.
  - `POST /api/today/{goalId}`: Mark a goal as completed for the current day.

## Getting Started

To get started with the Goal & Habit Tracker "Milestone" project, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Set up the database and configure the environment variables.
4. Start the server using `npm start`.
5. Access the API endpoints to interact with the application.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **AWS Serverless**: Deployed using AWS Lambda and API Gateway.
- **Node.js**: Backend runtime environment.
- **JSON Web Tokens (JWT)**: Used for user authentication and authorization.
- **bcrypt**: Library for hashing passwords securely.
  
