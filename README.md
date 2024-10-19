# Task Management Application

![Task Management App](https://github.com/AbhijitSP11/task-management-app/blob/master/public/images/thumbnail.png)

Welcome to the **Task Management Application**! This application allows users to manage tasks efficiently with basic CRUD (Create, Read, Update, Delete) functionalities. Users can also perform global searches for tasks, users, teams, and more.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete tasks with ease.
- **Global Search**: Search for tasks, users, and teams quickly and efficiently.
- **Responsive Design**: The application is designed to be responsive and user-friendly.
- **Task Sorting**: Tasks are sorted dynamically by priority (High, Medium, Low) to ensure that the most critical tasks are displayed at the top.

## Task Sorting Logic

The task sorting mechanism uses a `Map` to assign numeric values to the task priorities and then sorts them based on this order. The sorting logic ensures that higher priority tasks are displayed first, and additional sorting is done if tasks have the same priority.

### Priority Sorting Mechanism

- We define the `priorityOrder` as a JavaScript `Map` which assigns numerical values to priorities:

  ```typescript
  const priorityOrder = useMemo(() => new Map([
    ['High', 0],
    ['Medium', 1],
    ['Low', 2],
  ]), []);
  ```

This ensures that tasks with "High" priority are displayed first, followed by "Medium" and then "Low."

The sorting function compares tasks based on their priorities:

```typescript
const sortedTasks = useMemo(() => {
  return [...tasks].sort((a, b) => {
    const priorityA = priorityOrder.get(a.priority!) ?? 3;
    const priorityB = priorityOrder.get(b.priority!) ?? 3;
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB; // Sort by priority
    }
    // If priorities are the same, sort by selected column (e.g., due date)
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];
    if (valueA === undefined || valueB === undefined) return 0;
    return valueA < valueB ? (sortDirection === 'asc' ? -1 : 1) : (sortDirection === 'asc' ? 1 : -1);
  });
}, [tasks, sortColumn, sortDirection, priorityOrder]);
```

If two tasks share the same priority, the sorting logic falls back to comparing other task properties (like due date) based on the selected column (`sortColumn`) and direction (`sortDirection`).

This approach ensures that the most important tasks are always displayed at the top, giving users a clear view of their priorities.

## Live Demo

Check out the live demo of the application at [twelloapp.netlify.app](https://twelloapp.netlify.app/).

## Tech Stack

- **Framework**: Next.js
- **Styling**: CSS Modules
- **Deployment**: Netlify

## Getting Started

To run the application locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AbhijitSP11/task-management-app.git
   cd task-management-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
