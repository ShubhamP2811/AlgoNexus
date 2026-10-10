import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Zap, CheckCircle2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 mt-auto text-slate-600 select-none">
      
      {/* Main Footer Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <Logo size="md" />
            </Link>
            
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              An interactive algorithm visualization platform designed to make data structures, time complexity, and step-by-step algorithms intuitive, engaging, and clear.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                <Zap className="w-3 h-3 text-blue-600" />
                <span>Zero Latency Engine</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>29 Implementations</span>
              </span>
            </div>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
              Curriculum
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/sorting" className="hover:text-blue-600 transition-colors inline-block py-0.5">
                  Sorting Algorithms
                </Link>
              </li>
              <li>
                <Link to="/searching" className="hover:text-blue-600 transition-colors inline-block py-0.5">
                  Searching Algorithms
                </Link>
              </li>
              <li>
                <Link to="/data-structures" className="hover:text-blue-600 transition-colors inline-block py-0.5">
                  Data Structures
                </Link>
              </li>
              <li>
                <Link to="/trees" className="hover:text-blue-600 transition-colors inline-block py-0.5">
                  Trees & Traversals
                </Link>
              </li>
              <li>
                <Link to="/graphs" className="hover:text-blue-600 transition-colors inline-block py-0.5">
                  Graph Algorithms
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Popular Algorithms */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
              Popular Algorithms
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/sorting/quick-sort" className="hover:text-blue-600 transition-colors inline-block py-0.5">
                  Quick Sort
                </Link>
              </li>
              <li>
                <Link to="/sorting/merge-sort" className="hover:text-blue-600 transition-colors inline-block py-0.5">
                  Merge Sort
                </Link>
              </li>
              <li>
                <Link to="/searching/binary-search" className="hover:text-blue-600 transition-colors inline-block py-0.5">
                  Binary Search
                </Link>
              </li>
              <li>
                <Link to="/trees/binary-search-tree" className="hover:text-blue-600 transition-colors inline-block py-0.5">
                  Binary Search Tree
                </Link>
              </li>
              <li>
                <Link to="/graphs/dijkstra" className="hover:text-blue-600 transition-colors inline-block py-0.5">
                  Dijkstra's Algorithm
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Interactive Tools */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
              Interactive Tools
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/compare" className="hover:text-blue-600 transition-colors inline-block py-0.5 font-semibold text-blue-600">
                  Race Arena Mode
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Footer Bar - Copyright Centered */}
      <div className="border-t border-slate-100 py-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center text-xs text-slate-500">
          <span>© 2026 AlgoNexus. Built for computer science students and educators.</span>
        </div>
      </div>

    </footer>
  );
}
