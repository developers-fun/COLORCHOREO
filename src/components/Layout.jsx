import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Layout({ children }) {
  const location = useLocation();
  
  const navigation = [
    { 
      name: 'Home',
      path: '/',
      icon: '🎨'
    },
    { 
      name: 'Palette Builder',
      path: '/tools/palette',
      icon: '🎯'
    },
    { 
      name: 'Shape Playground',
      path: '/tools/shapes',
      icon: '⭐'
    },
    { 
      name: 'Articles',
      path: '/articles',
      icon: '📚'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="border-b border-gray-800">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <span className="text-3xl">🎨</span>
              <span>Color Choreographer</span>
            </Link>
            <div className="flex gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors flex items-center gap-2 ${
                    location.pathname === item.path
                      ? 'text-accent'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="hidden md:inline">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>

      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">About</h3>
              <p className="text-gray-400">
                Create beautiful animated gradients and shapes for your web projects.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/articles" className="text-gray-400 hover:text-gray-200">
                    Articles
                  </Link>
                </li>
                <li>
                  <Link to="/tools/shapes" className="text-gray-400 hover:text-gray-200">
                    Shape Library
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-200"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-200"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;