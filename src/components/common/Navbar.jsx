import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { ALGORITHM_LIST } from '../../data/algorithmsData';
import { Logo } from './Logo';

export function Navbar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
    setQuery('');
  }, [location.pathname]);

  // Close dropdown when clicking/tapping outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Keep selected item visible when navigating with Arrow Up/Down
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const selectedElement = listRef.current.children[selectedIndex];
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex, isOpen]);

  // Filter algorithms or show all algorithms
  const filtered = query.trim()
    ? ALGORITHM_LIST.filter(item => {
        const q = query.toLowerCase().trim();
        return (
          item.name.toLowerCase().includes(q) ||
          item.categoryName.toLowerCase().includes(q) ||
          item.shortDescription.toLowerCase().includes(q)
        );
      })
    : ALGORITHM_LIST;

  const handleSelect = (item) => {
    navigate(`/${item.category}/${item.id}`);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputKeyDown = (e) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1 < filtered.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 >= 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const targetItem = filtered[selectedIndex] || filtered[0];
      if (targetItem) {
        handleSelect(targetItem);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Brand Logo with Website Name (AlgoNexus) */}
        <div className="flex items-center shrink-0">
          <Link to="/" className="flex items-center group select-none hover:opacity-95 transition-opacity">
            <div className="hidden sm:block">
              <Logo size="md" showText={true} />
            </div>
            <div className="sm:hidden">
              <Logo size="sm" showText={true} />
            </div>
          </Link>
        </div>

        {/* Center/Full: Search Bar Box */}
        <div ref={containerRef} className="flex-1 max-w-lg mx-auto relative min-w-0">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
                setSelectedIndex(0);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleInputKeyDown}
              placeholder="Search algorithms..."
              className="w-full h-10 pl-10 pr-9 rounded-xl bg-slate-100/90 border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-none truncate"
            />
            {query && (
              <div className="absolute right-2.5 sm:right-3 flex items-center">
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Clean Dropdown Attached to Search Box */}
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50 overscroll-contain animate-in fade-in duration-100"
            >
              <div
                ref={listRef}
                className="p-1.5 max-h-72 sm:max-h-80 overflow-y-auto overscroll-contain divide-y divide-slate-100"
              >
                {filtered.length === 0 ? (
                  <div className="py-6 text-center text-slate-400">
                    <Sparkles className="w-5 h-5 mx-auto mb-1.5 opacity-40 text-blue-500" />
                    <p className="text-xs font-medium">No algorithms found matching "{query}"</p>
                  </div>
                ) : (
                  filtered.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors text-sm ${
                          isSelected
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="truncate">{item.name}</span>
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 uppercase tracking-wider shrink-0 hidden sm:inline">
                            {item.category}
                          </span>
                        </div>
                        <ArrowRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isSelected ? 'text-blue-600 translate-x-0.5' : 'text-slate-300'
                          }`}
                        />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
