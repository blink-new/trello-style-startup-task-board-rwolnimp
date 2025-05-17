import { useState } from 'react';
import { Search, Plus, ChevronDown, Menu, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { users } from '../lib/data';

interface HeaderProps {
  onAddTask?: () => void;
  onToggleSidebar?: () => void;
  isMobile: boolean;
  onToggleDark?: () => void;
  darkMode?: boolean;
}

export function Header({ onAddTask, onToggleSidebar, isMobile, onToggleDark, darkMode }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="sticky top-0 z-20 bg-background/80 header-shadow backdrop-blur-md py-6 px-4 md:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4 w-full md:w-auto">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <span className="magazine-masthead animated-gradient text-3xl md:text-4xl leading-none select-none">Product Launch Q3</span>
      </div>
      <div className="flex-1 flex items-center gap-2 md:gap-4 justify-end">
        <div className="relative hidden md:block w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-10 h-10 rounded-xl bg-white/80"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1 rounded-full px-4">
          <span>Filter</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
        <div className="hidden md:block w-[140px]">
          <Select
            placeholder="Assignee"
            options={users.map(user => ({ value: user.id, label: user.name }))}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle dark mode"
          onClick={onToggleDark}
          className="transition-colors"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-blue-700" />
          )}
        </Button>
        <Button onClick={onAddTask} className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 py-2 font-bold shadow-md">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden md:inline">Add Task</span>
        </Button>
        <Avatar className="h-10 w-10 border-2 border-white avatar-glow ml-2">
          <AvatarImage src={users[0].avatar} alt={users[0].name} />
          <AvatarFallback>{users[0].name.substring(0, 2)}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}