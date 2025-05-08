# Task timer
_A resilient timer application built with React for productivity tracking. Made following Ignite Rocketseat course_

![image](https://github.com/user-attachments/assets/29ebda06-e966-4a52-8a43-113a5f8ed9cd)

![image](https://github.com/user-attachments/assets/8f405148-8924-4325-b91c-7e26c0ec5b46)

> [Link to the task timer page](https://gustacamara.github.io/task-timer/)

## Key Features
- **Hibernation-resistant timer** (works in background tabs)
- **Context-managed state** with Zod validation
- **Three-phase tracking**:
  - 🟢 `FINISHED` (completed duration)
  - 🟠 `IN_PROGRESS` (active session)
  - 🔴 `INTERRUPTED` (manual stop)
- **Detailed history**:
  - Task name
  - Start timestamp (formatted with date-fns)
  - Duration in minutes
  - Completion status

## Technical Implementation
  - React
  - TypeScript
  - Styled Components
  - date-fns
  - Zod
  - Contexts
