import { Task } from "./types";

export const Tasks: Task[] = [
  {
    id: 1,
    title: "Design Homepage",
    description: "Create a design for the main homepage",
    status: "In Progress",
    priority: "High",
    startDate: "2024-10-01",
    dueDate: "2024-10-05",
    projectId: 1,
    authorUserId: 1,
    assignedUserId: 2,
    author: "John Doe",
    project: {
      id: 1,
      name: "Website Redesign",
      description: "Redesign the company website",
      startDate: "2024-09-01",
      endDate: "2024-12-01",
      tasks: []
    }
  },
  {
    id: 2,
    title: "Fix login bug",
    description: "Resolve issue with user login",
    status: "To Do",
    priority: "Medium",
    startDate: "2024-10-03",
    dueDate: "2024-10-07",
    projectId: 1,
    authorUserId: 2,
    assignedUserId: 3,
    author: "Jane Smith",
    project: {
      id: 1,
      name: "Website Redesign",
      description: "Redesign the company website",
      startDate: "2024-09-01",
      endDate: "2024-12-01",
      tasks: []
    }
  },
  {
    id: 3,
    title: "Database Migration",
    description: "Migrate the database to the new server",
    status: "Completed",
    priority: "High",
    startDate: "2024-09-20",
    dueDate: "2024-09-25",
    projectId: 2,
    authorUserId: 3,
    assignedUserId: 4,
    author: "Mike Johnson",
    project: {
      id: 2,
      name: "Backend Overhaul",
      description: "Upgrade the backend infrastructure",
      startDate: "2024-09-10",
      endDate: "2024-12-31",
      tasks: []
    }
  },
  {
    id: 4,
    title: "Set up CI/CD pipeline",
    description: "Implement CI/CD for automated testing",
    status: "Blocked",
    priority: "High",
    startDate: "2024-10-10",
    dueDate: "2024-10-20",
    projectId: 2,
    authorUserId: 4,
    assignedUserId: 5,
    author: "Alice Green",
    project: {
      id: 2,
      name: "Backend Overhaul",
      description: "Upgrade the backend infrastructure",
      startDate: "2024-09-10",
      endDate: "2024-12-31",
      tasks: []
    }
  },
  {
    id: 5,
    title: "Write unit tests",
    description: "Add unit tests for critical components",
    status: "In Progress",
    priority: "Low",
    startDate: "2024-10-05",
    dueDate: "2024-10-15",
    projectId: 1,
    authorUserId: 5,
    assignedUserId: 6,
    author: "Tom Brown",
    project: {
      id: 1,
      name: "Website Redesign",
      description: "Redesign the company website",
      startDate: "2024-09-01",
      endDate: "2024-12-01",
      tasks: []
    }
  },
  {
    id: 6,
    title: "Update API documentation",
    description: "Write detailed API documentation",
    status: "To Do",
    priority: "Low",
    startDate: "2024-10-07",
    dueDate: "2024-10-14",
    projectId: 3,
    authorUserId: 6,
    assignedUserId: 1,
    author: "Laura White",
    project: {
      id: 3,
      name: "API Upgrade",
      description: "Enhance API performance and scalability",
      startDate: "2024-09-20",
      endDate: "2024-12-15",
      tasks: []
    },
  },
  {
    id: 7,
    title: "Fix CSS issues on mobile",
    description: "Resolve layout issues on mobile devices",
    status: "To Do",
    priority: "Medium",
    startDate: "2024-10-09",
    dueDate: "2024-10-12",
    projectId: 1,
    authorUserId: 7,
    assignedUserId: 2,
    author: "Eve Martin",
    project: {
      id: 1,
      name: "Website Redesign",
      description: "Redesign the company website",
      startDate: "2024-09-01",
      endDate: "2024-12-01",
      tasks: []
    },
  },
  {
    id: 8,
    title: "User feedback analysis",
    description: "Analyze user feedback to improve UX",
    status: "In Progress",
    priority: "Medium",
    startDate: "2024-10-01",
    dueDate: "2024-10-08",
    projectId: 4,
    authorUserId: 8,
    assignedUserId: 3,
    author: "Mark Lee",
    project: {
      id: 4,
      name: "UX Research",
      description: "Improve user experience through feedback analysis",
      startDate: "2024-09-15",
      endDate: "2024-12-05",
      tasks: []
    },
  },
  {
    id: 9,
    title: "Set up test environment",
    description: "Create a testing environment for QA",
    status: "Completed",
    priority: "High",
    startDate: "2024-09-28",
    dueDate: "2024-09-30",
    projectId: 3,
    authorUserId: 9,
    assignedUserId: 4,
    author: "David Clark",
    project: {
      id: 3,
      name: "API Upgrade",
      description: "Enhance API performance and scalability",
      startDate: "2024-09-20",
      endDate: "2024-12-15",
      tasks: []
    },
  },
  {
    id: 10,
    title: "Optimize server performance",
    description: "Enhance server performance for high traffic",
    status: "In Progress",
    priority: "High",
    startDate: "2024-10-05",
    dueDate: "2024-10-10",
    projectId: 2,
    authorUserId: 10,
    assignedUserId: 5,
    author: "Robert King",
    project: {
      id: 2,
      name: "Backend Overhaul",
      description: "Upgrade the backend infrastructure",
      startDate: "2024-09-10",
      endDate: "2024-12-31",
      tasks: []
    },
  },
  {
    id: 11,
    title: "Update landing page content",
    description: "Revise content for the new product launch",
    status: "To Do",
    priority: "Medium",
    startDate: "2024-10-12",
    dueDate: "2024-10-18",
    projectId: 1,
    authorUserId: 11,
    assignedUserId: 6,
    author: "Sophia Davis",
    project: {
      id: 1,
      name: "Website Redesign",
      description: "Redesign the company website",
      startDate: "2024-09-01",
      endDate: "2024-12-01",
      tasks: []
    },
  },
  {
    id: 12,
    title: "Implement search functionality",
    description: "Add search functionality to the dashboard",
    status: "In Progress",
    priority: "High",
    startDate: "2024-10-07",
    dueDate: "2024-10-14",
    projectId: 5,
    authorUserId: 12,
    assignedUserId: 7,
    author: "Paul Lewis",
    project: {
      id: 5,
      name: "Dashboard Upgrade",
      description: "Enhance the dashboard with new features",
      startDate: "2024-09-30",
      endDate: "2024-12-10",
      tasks: []
    },
  },
  {
    id: 13,
    title: "Design user settings page",
    description: "Create design for user settings page",
    status: "To Do",
    priority: "Low",
    startDate: "2024-10-13",
    dueDate: "2024-10-20",
    projectId: 1,
    authorUserId: 13,
    assignedUserId: 8,
    author: "Lisa Walker",
    project: {
      id: 1,
      name: "Website Redesign",
      description: "Redesign the company website",
      startDate: "2024-09-01",
      endDate: "2024-12-01",
      tasks: []
    },
  },
  {
    id: 14,
    title: "Deploy staging environment",
    description: "Set up a staging environment for the new release",
    status: "To Do",
    priority: "High",
    startDate: "2024-10-09",
    dueDate: "2024-10-11",
    projectId: 2,
    authorUserId: 14,
    assignedUserId: 9,
    author: "Jack Wilson",
    project: {
      id: 2,
      name: "Backend Overhaul",
      description: "Upgrade the backend infrastructure",
      startDate: "2024-09-10",
      endDate: "2024-12-31",
      tasks: []
    },
  },
  {
    id: 15,
    title: "Security audit",
    description: "Perform a security audit on the application",
    status: "In Progress",
    priority: "High",
    startDate: "2024-10-08",
    dueDate: "2024-10-15",
    projectId: 5,
    authorUserId: 15,
    assignedUserId: 10,
    author: "Emma Roberts",
    project: {
      id: 5,
      name: "Dashboard Upgrade",
      description: "Enhance the dashboard with new features",
      startDate: "2024-09-30",
      endDate: "2024-12-10",
      tasks: []
    },
  }
];
