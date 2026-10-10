import React, { useState } from 'react';
import { 
  createDefaultTrie, 
  generateTrieInsertSteps, 
  generateTrieSearchSteps 
} from '../../algorithms/dataStructures/trieOps';
import { Plus, Search, Tag } from 'lucide-react';

export function TrieVisualizer({
  step = {},
  onTriggerSteps
}) {
  const [trieRoot, setTrieRoot] = useState(createDefaultTrie());
  const [insertWord, setInsertWord] = useState('card');
  const [searchWord, setSearchWord] = useState('cat');

  const currentTrie = step.trie !== undefined ? step.trie : trieRoot;
  const activeNodeId = step.activeNodeId;

  const handleInsert = (e) => {
    e.preventDefault();
    const { steps, updatedTrie } = generateTrieInsertSteps(currentTrie, insertWord);
    setTrieRoot(updatedTrie);
    onTriggerSteps(steps);
    setInsertWord('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const steps = generateTrieSearchSteps(currentTrie, searchWord);
    onTriggerSteps(steps);
  };

  // Render Trie recursively as collapsible tree nodes
  const renderTrieNode = (node) => {
    const isRoot = node.id === 'root';
    const isActive = activeNodeId === node.id;
    const childrenKeys = Object.keys(node.children || {}).sort();

    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* Node Circle */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all shadow-xs ${
            isActive
              ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-md scale-105'
              : node.isEndOfWord
              ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-400 dark:border-emerald-600'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
          }`}
        >
          <span>{isRoot ? 'ROOT' : `'${node.char}'`}</span>
          {node.isEndOfWord && (
            <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-emerald-600 text-white">
              END
            </span>
          )}
        </div>

        {/* Children Row */}
        {childrenKeys.length > 0 && (
          <div className="flex items-start gap-4 pt-3 relative">
            {childrenKeys.map(ch => (
              <div key={ch} className="flex flex-col items-center relative">
                {/* Connecting branch line */}
                <div className="w-0.5 h-3 bg-slate-300 dark:bg-slate-700 mb-1" />
                {renderTrieNode(node.children[ch])}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        {/* Insert form */}
        <form onSubmit={handleInsert} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Word to insert"
            value={insertWord}
            onChange={e => setInsertWord(e.target.value)}
            className="w-28 sm:w-32 px-2.5 sm:px-3 py-1.5 text-xs rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-slate-700 font-mono"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Insert Word
          </button>
        </form>

        {/* Search form */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search word"
            value={searchWord}
            onChange={e => setSearchWord(e.target.value)}
            className="w-28 sm:w-32 px-2.5 sm:px-3 py-1.5 text-xs rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-slate-700 font-mono"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors flex items-center gap-1 shadow-xs"
          >
            <Search className="w-3.5 h-3.5" /> Search Word
          </button>
        </form>

        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
          <Tag className="w-3.5 h-3.5 text-emerald-500" />
          <span>Default: ['cat', 'car', 'cart', 'dog']</span>
        </div>
      </div>

      {/* Trie Tree Visualizer */}
      <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-6 min-h-[320px] sm:min-h-[380px] flex items-center justify-center overflow-x-auto relative shadow-xs">
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="min-w-max p-4 relative z-10">
          {renderTrieNode(currentTrie)}
        </div>
      </div>
    </div>
  );
}
