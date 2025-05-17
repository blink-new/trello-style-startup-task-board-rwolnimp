import { X, LayoutDashboard, Users, Calendar, BarChart2, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User } from '../types';
import { Separator } from './ui/separator';

interface SidebarProps {
  users: User[];
  isMobile: boolean;
  onClose?: () => void;
}

export function Sidebar({ users, isMobile, onClose }: SidebarProps) {
  const sidebarWidth = isMobile ? 'w-[280px]' : 'w-[260px]';
  const baseStyle = `${sidebarWidth} h-full glass border-r flex flex-col`;
  const mobilePosition = isMobile ? 'fixed left-0 top-0 z-20' : '';

  const navItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: "Boards", active: true },
    { icon: <Users className="h-5 w-5" />, label: "Team" },
    { icon: <Calendar className="h-5 w-5" />, label: "Calendar" },
    { icon: <BarChart2 className="h-5 w-5" />, label: "Reports" },
    { icon: <Settings className="h-5 w-5" />, label: "Settings" }
  ];

  return (
    <aside className={`${baseStyle} ${mobilePosition} animate-fade-in p-0 md:py-6 md:px-3`}> 
      {isMobile && (
        <div className="flex justify-end p-2">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
      <div className="px-6 pt-4 pb-2">
        <h2 className="text-lg font-semibold text-sidebar-foreground mb-6 tracking-wide">Startup Hub</h2>
        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-4 py-2 text-sm rounded-full transition-all font-medium gap-3 ${
                item.active 
                  ? 'bg-primary/90 text-white shadow-md' 
                  : 'text-sidebar-foreground hover:bg-primary/10'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
      <Separator className="my-6" />
      <div className="px-6">
        <h3 className="mb-3 text-xs uppercase tracking-wider text-sidebar-foreground/70">Team Members</h3>
        <div className="space-y-3">
          {users.map(user => (
            <div key={user.id} className="flex items-center gap-3 py-2 group">
              <Avatar className="h-9 w-9 border-2 border-white avatar-glow group-hover:avatar-glow">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-sidebar-foreground">{user.name}</span>
                <span className="text-xs text-sidebar-foreground/70">{user.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto p-6">
        <div className="bg-sidebar-accent/30 rounded-xl p-4">
          <h4 className="text-sm font-medium mb-1">Team Activity</h4>
          <p className="text-xs text-sidebar-foreground/70">8 tasks completed this week</p>
          <div className="w-full bg-sidebar-accent/30 h-1.5 rounded-full mt-2">
            <div className="bg-sidebar-primary h-1.5 rounded-full w-2/3" />
          </div>
        </div>
      </div>
    </aside>
  );
}