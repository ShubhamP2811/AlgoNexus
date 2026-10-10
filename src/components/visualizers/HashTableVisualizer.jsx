import React, { useState } from 'react';
import { 
  createDefaultHashTable, 
  generateHashTablePutSteps, 
  generateHashTableGetSteps, 
  generateHashTableDeleteSteps,
  HASH_TABLE_SIZE
} from '../../algorithms/dataStructures/hashTableOps';
import { KeyRound, Search, Trash2, ArrowRight } from 'lucide-react';

export function HashTableVisualizer({
  step = {},
  onTriggerSteps
}) {
  const [table, setTable] = useState(createDefaultHashTable());
  const [keyInput, setKeyInput] = useState('orange');
  const [valInput, setValInput] = useState('190');
  const [searchKey, setSearchKey] = useState('banana');

  const displayTable = step.table !== undefined ? step.table : table;
  const activeBucket = step.activeBucket;
  const hashInfo = step.hashInfo;

  const handlePut = (e) => {
    e.preventDefault();
    const { steps, updatedTable } = generateHashTablePutSteps(displayTable, keyInput, valInput);
    setTable(updatedTable);
    onTriggerSteps(steps);
    setKeyInput('');
    setValInput('');
  };

  const handleGet = (e) => {
    e.preventDefault();
    const steps = generateHashTableGetSteps(displayTable, searchKey);
    onTriggerSteps(steps);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const { steps, updatedTable } = generateHashTableDeleteSteps(displayTable, searchKey);
    setTable(updatedTable);
    onTriggerSteps(steps);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        {/* Put Form */}
        <form onSubmit={handlePut} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Key (e.g. apple)"
            value={keyInput}
            onChange={e => setKeyInput(e.target.value)}
            className="w-24 sm:w-28 px-2.5 py-1.5 text-xs rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-slate-700"
          />
          <input
            type="text"
            placeholder="Value"
            value={valInput}
            onChange={e => setValInput(e.target.value)}
            className="w-16 sm:w-20 px-2.5 py-1.5 text-xs rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-slate-700"
          />
          <button
            type="submit"
            className="px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-1 shadow-xs"
          >
            <KeyRound className="w-3.5 h-3.5" /> Put(k, v)
          </button>
        </form>

        {/* Search / Delete Form */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search / Delete Key"
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
            className="w-28 sm:w-36 px-2.5 py-1.5 text-xs rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-slate-700"
          />
          <button
            onClick={handleGet}
            className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors flex items-center gap-1 shadow-xs"
          >
            <Search className="w-3.5 h-3.5" /> Get(k)
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors flex items-center gap-1 shadow-xs"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </div>

      {/* Hash Arithmetic Breakdown Callout */}
      {hashInfo && (
        <div className="p-3 bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200">
            <span className="font-bold">Hash Function:</span>
            <span>rawHash = {hashInfo.rawHash}</span>
          </div>
          <div className="text-blue-700 dark:text-blue-300 font-bold">
            Bucket Index = {hashInfo.rawHash} % {HASH_TABLE_SIZE} = [{hashInfo.index}]
          </div>
        </div>
      )}

      {/* Bucket Array + Chained Lists */}
      <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-6 min-h-[340px] sm:min-h-[360px] flex flex-col justify-center space-y-2.5 overflow-x-auto relative shadow-xs">
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 space-y-2.5">
          {displayTable.map((bucket, bIdx) => {
            const isActive = activeBucket === bIdx;

            return (
              <div
                key={bIdx}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/50 border-2 border-blue-500 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60'
                }`}
              >
                {/* Bucket Index Header */}
                <div
                  className={`w-20 py-1.5 rounded-lg font-mono text-xs font-bold text-center border shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 shadow-xs'
                  }`}
                >
                  Slot [{bIdx}]
                </div>

                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

                {/* Chained Linked Entries */}
                <div className="flex items-center gap-2 overflow-x-auto flex-1 py-1">
                  {bucket.length === 0 ? (
                    <span className="text-xs text-slate-400 italic">Empty bucket</span>
                  ) : (
                    bucket.map((entry, eIdx) => (
                      <React.Fragment key={entry.key}>
                        <div className="flex items-center px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono shadow-xs shrink-0">
                          <span className="font-bold text-blue-600 dark:text-blue-400">{entry.key}</span>
                          <span className="text-slate-400 mx-1.5">:</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{entry.value}</span>
                        </div>
                        {eIdx < bucket.length - 1 && (
                          <span className="text-slate-400 font-bold shrink-0">→</span>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
