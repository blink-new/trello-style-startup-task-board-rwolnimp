import { useEffect, useState } from 'react';
import { Board } from './components/Board';
import { initialBoard } from './lib/data';
import { useMobile } from './hooks/use-mobile';
import { Header } from './components/Header';

function App() {
  const { isMobile } = useMobile();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        title={initialBoard.title}
        isMobile={isMobile}
        onToggleDark={() => setDarkMode((d) => !d)}
        darkMode={darkMode}
      />
      <section className="w-full max-w-5xl mx-auto px-4 pt-10 pb-6 text-center">
        <h1 className="magazine-masthead mb-2">Startup Task Board</h1>
        <div className="magazine-subtitle max-w-2xl mx-auto">
          A dynamic productivity cockpit for startup teams to visualize, organize, and accelerate your workflow with clarity and speed.
        </div>
      </section>
      <div className="flex-1 flex flex-col">
        <Board board={initialBoard} isMobile={isMobile} />
      </div>
    </div>
  );
}

export default App;