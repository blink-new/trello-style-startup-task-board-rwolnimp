import { useState } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Column } from './Column';
import { Sidebar } from './Sidebar';
import { Board as BoardType, Task, Column as ColumnType } from '../types';
import { toast } from 'react-hot-toast';
import { TaskModal } from './TaskModal'; // Import the TaskModal

interface BoardProps {
  board: BoardType;
  isMobile: boolean;
}

export function Board({ board, isMobile }: BoardProps) {
  const [boardData, setBoardData] = useState<BoardType>(board);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  
  // State for the task modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [addTaskColumnId, setAddTaskColumnId] = useState<string | undefined>(undefined);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragId(null);
    
    if (!over) return;
    
    // Find the task and its source column
    let task: Task | undefined;
    let sourceColumnId: string | undefined;
    
    for (const column of boardData.columns) {
      const foundTask = column.tasks.find(t => t.id === active.id);
      if (foundTask) {
        task = foundTask;
        sourceColumnId = column.id;
        break;
      }
    }
    
    if (!task || !sourceColumnId) return;
    
    // If the task was dropped on a different column, move it
    if (over.id !== sourceColumnId) {
      const newColumns = boardData.columns.map(column => {
        // Remove from source column
        if (column.id === sourceColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter(t => t.id !== task!.id)
          };
        }
        
        // Add to target column
        if (column.id === over.id) {
          const updatedTask = { ...task!, status: column.title };
          return {
            ...column,
            tasks: [...column.tasks, updatedTask]
          };
        }
        
        return column;
      });
      
      setBoardData({
        ...boardData,
        columns: newColumns
      });
      
      toast.success(`Moved "${task.title}" to ${boardData.columns.find(c => c.id === over.id)?.title}`);
    }
  };

  const handleAddTask = (columnId: string) => {
    setEditingTask(null); // Clear any task being edited
    setAddTaskColumnId(columnId); // Set the column for the new task
    setIsModalOpen(true); // Open the modal
  };
  
  const handleDeleteTask = (taskId: string) => {
    const newColumns = boardData.columns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => task.id !== taskId)
    }));
    
    setBoardData({
      ...boardData,
      columns: newColumns
    });
    
    toast.success("Task deleted");
  };
  
  const handleEditTask = (task: Task) => {
    setEditingTask(task); // Set the task to be edited
    setAddTaskColumnId(undefined); // Clear add task column
    setIsModalOpen(true); // Open the modal
  };
  
  const handleSaveTask = (savedTask: Task) => {
    let newColumns = [...boardData.columns];

    if (savedTask.id === `task-${Date.now()}` && addTaskColumnId) { // Adding a new task
      newColumns = newColumns.map(column => {
        if (column.id === addTaskColumnId) {
          return {
            ...column,
            tasks: [...column.tasks, { ...savedTask, status: column.title }],
          };
        }
        return column;
      });
      toast.success("Task added!");
    } else { // Editing an existing task
      newColumns = newColumns.map(column => ({
        ...column,
        tasks: column.tasks.map(task =>
          task.id === savedTask.id ? { ...savedTask, status: column.title } : task
        ),
      }));
      toast.success("Task saved!");
    }

    setBoardData({
      ...boardData,
      columns: newColumns,
    });

    setIsModalOpen(false);
    setEditingTask(null);
    setAddTaskColumnId(undefined);
  };

  const handleCompleteTask = (taskId: string) => {
    // Find the task
    let task: Task | undefined;
    let sourceColumnId: string | undefined;
    
    for (const column of boardData.columns) {
      const foundTask = column.tasks.find(t => t.id === taskId);
      if (foundTask) {
        task = foundTask;
        sourceColumnId = column.id;
        break;
      }
    }
    
    if (!task || !sourceColumnId) return;
    
    // Move the task to the Done column
    const doneColumn = boardData.columns.find(c => c.title === "Done");
    if (!doneColumn) return;
    
    const newColumns = boardData.columns.map(column => {
      // Remove from source column
      if (column.id === sourceColumnId) {
        return {
          ...column,
          tasks: column.tasks.filter(t => t.id !== taskId)
        };
      }
      
      // Add to Done column
      if (column.id === doneColumn.id) {
        const updatedTask = { ...task!, status: "Done" };
        return {
          ...column,
          tasks: [...column.tasks, updatedTask]
        };
      }
      
      return column;
    });
    
    setBoardData({
      ...boardData,
      columns: newColumns
    });
    
    toast.success("Task completed!");
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <Sidebar
            users={boardData.users}
            isMobile={isMobile}
            onClose={() => isMobile && setShowSidebar(false)}
          />
        )}
        
        <main className="flex-1 overflow-x-auto bg-background">
          <DndContext 
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex p-4 gap-4 h-full">
              {boardData.columns.map(column => (
                <Column
                  key={column.id}
                  column={column}
                  users={boardData.users}
                  tags={boardData.tags}
                  onAddTask={handleAddTask}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  onCompleteTask={handleCompleteTask}
                />
              ))}
            </div>
          </DndContext>
        </main>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
        users={boardData.users}
        tags={boardData.tags}
        onSave={handleSaveTask}
        columnId={addTaskColumnId}
      />
    </div>
  );
}
