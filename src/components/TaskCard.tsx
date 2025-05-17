import { MessageSquare, Clock, MoreHorizontal, Edit, Trash2, CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { Task, User, Tag } from '../types';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: Task;
  users: User[];
  tags: Tag[];
  isDragging?: boolean;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onComplete?: (taskId: string) => void;
}

export function TaskCard({
  task,
  users,
  tags,
  isDragging = false,
  onEdit,
  onDelete,
  onComplete
}: TaskCardProps) {
  const priorityColors = {
    low: 'bg-blue-100 text-blue-700',
    medium: 'bg-warning/20 text-warning',
    high: 'bg-amber-200 text-amber-700',
    urgent: 'bg-destructive text-white',
  };

  const assignedUsers = users.filter(user => task.assignees.includes(user.id));
  const taskTags = tags.filter(tag => task.tags.includes(tag.id));

  const formatDueDate = (date: Date | null) => {
    if (!date) return null;
    return format(date, 'MMM d');
  };

  const cardVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    drag: { scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)", zIndex: 10 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="idle"
      animate={isDragging ? "drag" : "idle"}
      whileHover="hover"
      className="mb-3"
    >
      <Card className={`card-magazine p-5 ${isDragging ? 'border-primary/50' : ''}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-foreground line-clamp-2 leading-tight">
            {task.title}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-8 w-8 p-1 rounded-md hover:bg-accent flex items-center justify-center">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(task)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onComplete?.(task.id)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark Complete
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => onDelete?.(task.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {taskTags.map(tag => (
            <span key={tag.id} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${tag.color}22`, color: tag.color }}>
              {tag.name}
            </span>
          ))}
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${priorityColors[task.priority]}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="flex -space-x-2">
            {assignedUsers.slice(0, 3).map(user => (
              <Avatar key={user.id} className="h-8 w-8 border-2 border-background avatar-ring">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xs">{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
            ))}
            {assignedUsers.length > 3 && (
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                +{assignedUsers.length - 3}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {task.comments.length > 0 && (
              <div className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                {task.comments.length}
              </div>
            )}
            {task.dueDate && (
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {formatDueDate(task.dueDate)}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}