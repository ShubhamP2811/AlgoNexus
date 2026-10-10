import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, ALGORITHM_LIST } from '../data/algorithmsData';
import { Play, ArrowDownUp, Layers, GitBranch, Share2, Search } from 'lucide-react';

const CATEGORY_ICONS = {
  sorting: ArrowDownUp,
  searching: Search,
  'data-structures': Layers,
  trees: GitBranch,
  graphs: Share2
};

export function CategoryPage() {
  const { categoryId } = useParams();
  const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  const items = ALGORITHM_LIST.filter(a => a.category === category.id);
  const Icon = CATEGORY_ICONS[category.id] || Layers;

  return (
    <div className="space-y-10 pb-4">
      
      {/* Category Header Banner */}
      <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Category</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {category.name}
              </h1>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <span className="font-mono text-sm font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
            {items.length} Algorithms
          </span>
        </div>
      </div>

      {/* Grid of Algorithms in Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(algo => (
          <div
            key={algo.id}
            className="group bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                  {algo.name}
                </h3>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {algo.shortDescription}
              </p>

              {/* Complexity Badges */}
              <div className="grid grid-cols-3 gap-1.5 pt-2 font-mono text-[11px]">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
                  <div className="text-[9px] uppercase text-slate-400">Best</div>
                  <div className="font-bold text-emerald-600 mt-0.5 truncate">{algo.timeComplexity.best}</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
                  <div className="text-[9px] uppercase text-slate-400">Average</div>
                  <div className="font-bold text-amber-600 mt-0.5 truncate">{algo.timeComplexity.average}</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
                  <div className="text-[9px] uppercase text-slate-400">Worst</div>
                  <div className="font-bold text-rose-600 mt-0.5 truncate">{algo.timeComplexity.worst}</div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Space: {algo.spaceComplexity}</span>
              <Link
                to={`/${algo.category}/${algo.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Visualize</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
