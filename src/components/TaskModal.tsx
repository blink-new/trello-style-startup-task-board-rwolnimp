import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Task, User, Tag, Priority } from '../types';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from './ui/calendar';

interface TaskModalProps {
  isOpen: boolean; onClose: () => void;
  task?: Task | null; // Task data for editing, null for adding
  users: User[];
  tags: Tag[];
  onSave: (task: Task) => void;
  columnId?: string; // Column to add the task to if adding
}

export function TaskModal({
  isOpen,
  onClose,
  task,
  users,
  tags,
  onSave,
  columnId,
}: TaskModalProps) {
  const [formData, setFormData] = useState<Partial<Task>>({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (task) {
      setFormData(task);
      setSelectedDate(task.dueDate || undefined);
    } else {
      setFormData({});
      setSelectedDate(undefined);
    }
  }, [task, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string | string[]) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setFormData({ ...formData, dueDate: date || null });
  };

  const handleSave = () => {
    if (!formData.title) {
      // Basic validation
      alert('Task title is required');
      return;
    }

    const taskToSave: Task = {
      id: formData.id || `task-${Date.now()}`,
      title: formData.title,
      description: formData.description || '',
      status: formData.status || (columnId ? 'Backlog' : 'Backlog'), // Default status or use columnId
      priority: (formData.priority as Priority) || 'medium',
      dueDate: formData.dueDate || null,
      createdAt: formData.createdAt || new Date(),
      assignees: formData.assignees || [],
      tags: formData.tags || [],
      comments: formData.comments || [],
      attachments: formData.attachments || [],
    };

    onSave(taskToSave);
    onClose();
  };

  const availablePriorities: Priority[] = ['low', 'medium', 'high', 'urgent'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''.toString()}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select
              value={formData.priority || 'medium'}
              onValueChange={(value) => handleSelectChange('priority', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {availablePriorities.map(p => (
                  <SelectItem key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Add Assignees and Tags Selects here later */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right">
              Due Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={
                    `w-[240px] justify-start text-left font-normal ${
                      !selectedDate && 'text-muted-foreground'
                    }`
                  }
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
