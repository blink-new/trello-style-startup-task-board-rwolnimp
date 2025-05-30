import { Board, Priority, Tag, User } from "../types";

export const users: User[] = [
  {
    id: "user-1",
    name: "Alex Morgan",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    role: "Product Manager",
  },
  {
    id: "user-2",
    name: "Taylor Chen",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    role: "Frontend Developer",
  },
  {
    id: "user-3",
    name: "Jordan Lee",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    role: "UX Designer",
  },
  {
    id: "user-4",
    name: "Sam Kim",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    role: "Backend Developer",
  },
];

export const tags: Tag[] = [
  { id: "tag-1", name: "Feature", color: "#5A67D8" },
  { id: "tag-2", name: "Bug", color: "#E53E3E" },
  { id: "tag-3", name: "Enhancement", color: "#38B2AC" },
  { id: "tag-4", name: "Design", color: "#ED8936" },
  { id: "tag-5", name: "Documentation", color: "#805AD5" },
];

export const initialBoard: Board = {
  id: "board-1",
  title: "Product Launch Q3",
  description: "Tasks for our Q3 product launch",
  users,
  tags,
  columns: [
    {
      id: "column-1",
      title: "Backlog",
      tasks: [
        {
          id: "task-1",
          title: "Redesign landing page hero section",
          description: "Update the hero section to match the new brand guidelines",
          status: "Backlog",
          priority: "medium" as Priority,
          dueDate: new Date(2023, 6, 30),
          createdAt: new Date(2023, 6, 15),
          assignees: ["user-3"],
          tags: ["tag-4"],
          comments: [
            {
              id: "comment-1",
              userId: "user-1",
              content: "Make sure to include the new tagline",
              createdAt: new Date(2023, 6, 16),
            },
          ],
          attachments: [],
        },
        {
          id: "task-2",
          title: "Fix mobile navigation menu",
          description: "Menu doesn't close properly on iOS devices",
          status: "Backlog",
          priority: "high" as Priority,
          dueDate: new Date(2023, 6, 25),
          createdAt: new Date(2023, 6, 18),
          assignees: ["user-2"],
          tags: ["tag-2"],
          comments: [],
          attachments: [],
        },
        {
          id: "task-3",
          title: "Update privacy policy",
          description: "Ensure compliance with latest regulations",
          status: "Backlog",
          priority: "low" as Priority,
          dueDate: new Date(2023, 7, 10),
          createdAt: new Date(2023, 6, 20),
          assignees: ["user-1", "user-4"],
          tags: ["tag-5"],
          comments: [],
          attachments: [],
        },
      ],
    },
    {
      id: "column-2",
      title: "In Progress",
      tasks: [
        {
          id: "task-4",
          title: "Implement user authentication",
          description: "Add JWT authentication and user session management",
          status: "In Progress",
          priority: "high" as Priority,
          dueDate: new Date(2023, 6, 28),
          createdAt: new Date(2023, 6, 14),
          assignees: ["user-4"],
          tags: ["tag-1"],
          comments: [
            {
              id: "comment-2",
              userId: "user-1",
              content: "Let's use Auth0 for this",
              createdAt: new Date(2023, 6, 15),
            },
            {
              id: "comment-3",
              userId: "user-4",
              content: "I've started integrating Auth0, should be done by Friday",
              createdAt: new Date(2023, 6, 17),
            },
          ],
          attachments: [],
        },
        {
          id: "task-5",
          title: "Create onboarding flow wireframes",
          description: "Design user onboarding experience for new users",
          status: "In Progress",
          priority: "medium" as Priority,
          dueDate: new Date(2023, 6, 27),
          createdAt: new Date(2023, 6, 16),
          assignees: ["user-3"],
          tags: ["tag-4"],
          comments: [],
          attachments: [],
        },
      ],
    },
    {
      id: "column-3",
      title: "Review",
      tasks: [
        {
          id: "task-6",
          title: "Optimize image loading performance",
          description: "Implement lazy loading and optimize image formats",
          status: "Review",
          priority: "medium" as Priority,
          dueDate: new Date(2023, 6, 25),
          createdAt: new Date(2023, 6, 10),
          assignees: ["user-2"],
          tags: ["tag-3"],
          comments: [
            {
              id: "comment-4",
              userId: "user-2",
              content: "Ready for review, improved load time by 40%",
              createdAt: new Date(2023, 6, 22),
            },
          ],
          attachments: [],
        },
      ],
    },
    {
      id: "column-4",
      title: "Done",
      tasks: [
        {
          id: "task-7",
          title: "Setup CI/CD pipeline",
          description: "Configure GitHub Actions for automated testing and deployment",
          status: "Done",
          priority: "high" as Priority,
          dueDate: new Date(2023, 6, 20),
          createdAt: new Date(2023, 6, 5),
          assignees: ["user-4"],
          tags: ["tag-1"],
          comments: [
            {
              id: "comment-5",
              userId: "user-1",
              content: "This is working great!",
              createdAt: new Date(2023, 6, 21),
            },
          ],
          attachments: [],
        },
        {
          id: "task-8",
          title: "Create component library documentation",
          description: "Document all UI components with usage examples",
          status: "Done",
          priority: "medium" as Priority,
          dueDate: new Date(2023, 6, 15),
          createdAt: new Date(2023, 6, 1),
          assignees: ["user-2", "user-3"],
          tags: ["tag-5"],
          comments: [],
          attachments: [],
        },
      ],
    },
  ],
};