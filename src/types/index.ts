export type User = {
  id: string;
  name: string;
  avatar: string;
  role: string;
};

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type Tag = {
  id: string;
  name: string;
  color: string;
};

export type Comment = {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: Priority;
  dueDate: Date | null;
  createdAt: Date;
  assignees: string[];
  tags: string[];
  comments: Comment[];
  attachments: string[];
};

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

export type Board = {
  id: string;
  title: string;
  description: string;
  columns: Column[];
  users: User[];
  tags: Tag[];
};