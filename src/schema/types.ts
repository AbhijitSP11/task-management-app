export type User = {
    userId: number;
    username: string;
    authoredTasks: Task[];
    assignedTasks: Task[];
    comments: Comment[];
  };
  
  export type Team = {
    id: number;
    teamName: string;
    projectTeams: ProjectTeam[];
    user: User[];
  };
  
  export type Project = {
    id: number;
    name: string;
    description?: string;
    startDate?: string; 
    endDate?: string;
    tasks: Task[];
  };
  
  export type ProjectTeam = {
    id: number;
    teamId: number;
    projectId: number;
    team: Team;
    project: Project;
  };
  
  export type Task = {
    id: number;
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    startDate?: string;
    dueDate?: string;
    projectId: number;
    authorUserId: number;
    assignedUserId?: number;
    project: Project;
    author: string;
    assignee?: string;
  };
  
  export type Comment = {
    id: number;
    text: string;
    taskId: number;
    userId: number;
    task: Task;
    user: User;
  };
  