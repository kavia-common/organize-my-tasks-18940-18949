import React, { useEffect, useState } from 'react';
import './App.css';
import { TodosProvider } from './state/todosContext';
import TodosPage from './features/TodosPage';

// PUBLIC_INTERFACE
function App() {
  /** Root application component that sets theme and renders the todos page. */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <div className="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <TodosProvider>
        <TodosPage />
      </TodosProvider>
    </div>
  );
}

export default App;
