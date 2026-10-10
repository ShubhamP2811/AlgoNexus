import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowDownUp, 
  Search, 
  Layers, 
  GitBranch, 
  Share2, 
  Sparkles, 
  GitCompare, 
  ArrowRight
} from 'lucide-react';
import { CATEGORIES, ALGORITHM_LIST } from '../data/algorithmsData';
import { HeroAlgorithmAnimation } from '../components/home/HeroAlgorithmAnimation';

const CATEGORY_ICONS = {
  sorting: ArrowDownUp,
  searching: Search,
  'data-structures': Layers,
  trees: GitBranch,
  graphs: Share2
};

export function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      
      {/* Hero Section Container - centered vertically so Core Curriculum is below the fold on initial load */}
      <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center">
        <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-sky-100/90 via-blue-50/70 to-indigo-100/80 border border-blue-200/80 p-6 sm:p-8 lg:p-10 shadow-lg shadow-blue-500/5">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[420px] h-[420px] bg-gradient-to-br from-blue-300/30 via-indigo-300/25 to-purple-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[380px] h-[380px] bg-gradient-to-tr from-sky-300/35 via-blue-200/25 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Value Proposition & Launch Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-xs border border-blue-200 text-blue-700 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>AlgoNexus</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Master DSA with{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                Visual Clarity
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Step through real algorithms line-by-line. Inspect pointers, array shifts, tree rotations, 
              shortest paths, and memory states in real-time with granular execution control.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/compare"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-102"
              >
                <GitCompare className="w-4 h-4" />
                <span>Algorithm Race Mode</span>
              </Link>

              <a
                href="#categories"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 font-semibold text-sm border border-slate-200/90 shadow-2xs transition-all hover:scale-102"
              >
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Explore Curriculum</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live Interactive Algorithm Simulation with Visible Bars */}
          <div className="lg:col-span-5 w-full">
            <HeroAlgorithmAnimation />
          </div>

        </div>
      </section>
      </div>

      {/* Categories Grid with Filter Tabs */}
      <section id="categories" className="space-y-6 scroll-mt-20">
        {/* Styled Algorithm Categories Section Header */}
        <div className="relative pb-5 border-b border-slate-200/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs font-semibold shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Core Curriculum</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Algorithm{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Categories
                </span>
              </h2>

              <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                Explore 29 production-grade implementations spanning sorting, searching, data structures, trees, and graphs.
              </p>
            </div>

            {/* Clean summary indicator pill badge on the right instead of wrapping buttons */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200/90 text-slate-700 text-xs font-semibold shadow-2xs shrink-0 self-start md:self-end">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>5 Core Categories</span>
              <span className="text-slate-300">|</span>
              <span className="text-blue-600 font-bold">29 Algorithms</span>
            </div>

          </div>
        </div>

        {/* Categories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map(category => {
            const Icon = CATEGORY_ICONS[category.id] || Layers;
            const items = ALGORITHM_LIST.filter(a => a.category === category.id);

            return (
              <div
                key={category.id}
                className="group relative bg-white border border-slate-200/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-400/80 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Accent Gradient Bar that illuminates on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50/60 group-hover:text-blue-700 transition-colors">
                      {category.count} algorithms
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* All algorithms in category listed cleanly with direct links */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {items.map(item => (
                      <Link
                        key={item.id}
                        to={`/${item.category}/${item.id}`}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 hover:scale-102 hover:shadow-2xs transition-all"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                  <Link
                    to={`/${category.id}`}
                    className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all"
                  >
                    <span>Explore {category.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
