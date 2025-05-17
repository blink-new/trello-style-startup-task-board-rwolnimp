import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { Column as ColumnType, Task, User, Tag } from '../types';
import { motion } from 'framer-motion';

interface ColumnProps {
  column: ColumnType;
  users: User[];
  tags: Tag[];
  onAddTask?: (columnId: string) => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  onCompleteTask?: (taskId: string) => void;
}

export function Column({
  column,
  users,
  tags,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onCompleteTask
}: ColumnProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  // Column header colors based on status
  const getColumnColor = (title: string) => {
    switch (title) {
      case 'Backlog':
        return 'text-blue-700';
      case 'In Progress':
        return 'text-warning';
      case 'Review':
        return 'text-purple-700';
      case 'Done':
        return 'text-success';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div
      className="w-full md:w-80 flex-shrink-0 overflow-hidden flex flex-col rounded-2xl border bg-white/80 shadow-lg mx-2 my-2"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b bg-white/90 rounded-t-2xl">
        <div className={`uppercase text-xs font-bold tracking-widest accent-underline ${getColumnColor(column.title)}`}>
          {column.title} <span className="text-xs ml-1 opacity-80 font-normal">{column.tasks.length}</span>
        </div>
        <button
          className={`p-1 rounded-md hover:bg-accent/50 transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => onAddTask?.(column.id)}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-transparent min-h-[200px]">
        <motion.div layout className="space-y-4">
          {column.tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              users={users}
              tags={tags}
              isDragging={task.id === activeDragId}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onComplete={onCompleteTask}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}