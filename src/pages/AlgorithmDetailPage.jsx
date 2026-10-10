import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ALGORITHMS, ALGORITHM_LIST } from '../data/algorithmsData';
import { SORTING_ALGORITHMS } from '../algorithms/sorting';
import { SEARCHING_ALGORITHMS } from '../algorithms/searching';
import { 
  generateInorderSteps, 
  generatePreorderSteps, 
  generatePostorderSteps, 
  generateLevelOrderSteps 
} from '../algorithms/trees/treeTraversals';
import { GRAPH_ALGORITHMS } from '../algorithms/graphs';
import { GRAPH_PRESETS } from '../data/graphPresets';
import { generateRandomArray } from '../utils/arrayUtils';
import { useVisualizer } from '../hooks/useVisualizer';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

// Visualizer Components
import { SortingVisualizer } from '../components/visualizers/SortingVisualizer';
import { SearchingVisualizer } from '../components/visualizers/SearchingVisualizer';
import { ArrayVisualizer } from '../components/visualizers/ArrayVisualizer';
import { StackVisualizer } from '../components/visualizers/StackVisualizer';
import { QueueVisualizer } from '../components/visualizers/QueueVisualizer';
import { LinkedListVisualizer } from '../components/visualizers/LinkedListVisualizer';
import { DoublyLinkedListVisualizer } from '../components/visualizers/DoublyLinkedListVisualizer';
import { HashTableVisualizer } from '../components/visualizers/HashTableVisualizer';
import { HeapVisualizer } from '../components/visualizers/HeapVisualizer';
import { BSTVisualizer } from '../components/visualizers/BSTVisualizer';
import { TreeTraversalVisualizer } from '../components/visualizers/TreeTraversalVisualizer';
import { GraphVisualizer } from '../components/visualizers/GraphVisualizer';

import { ControlsBar } from '../components/common/ControlsBar';
import { PseudocodeViewer } from '../components/common/PseudocodeViewer';
import { StepExplanationCard } from '../components/common/StepExplanationCard';
import { Legend } from '../components/common/Legend';
import { CodeBlock } from '../components/common/CodeBlock';
import { TrieVisualizer } from '../components/visualizers/TrieVisualizer';

export function AlgorithmDetailPage() {
  const { algorithmId } = useParams();
  const algo = ALGORITHMS[algorithmId];

  // Base state for sorting and searching arrays
  const [arrayData, setArrayData] = useState(() => generateRandomArray(12, 10, 95));
  const [searchTarget, setSearchTarget] = useState(42);

  // Dynamic step list (either computed upfront or fed interactively by DS widgets)
  const [interactiveSteps, setInteractiveSteps] = useState(null);

  // Graph state for graph algorithms
  const [graphData, setGraphData] = useState(() => {
    if (algorithmId === 'bellman-ford') return GRAPH_PRESETS.bellmanFordPreset;
    if (algorithmId === 'floyd-warshall') return GRAPH_PRESETS.floydWarshallPreset;
    return GRAPH_PRESETS.default;
  });
  const [graphStartNode, setGraphStartNode] = useState('A');

  // Generate steps based on algorithm type
  const generatedSteps = useMemo(() => {
    if (!algo) return [];

    // Sorting
    if (algo.category === 'sorting' && SORTING_ALGORITHMS[algo.id]) {
      return SORTING_ALGORITHMS[algo.id](arrayData);
    }

    // Searching
    if (algo.category === 'searching' && SEARCHING_ALGORITHMS[algo.id]) {
      return SEARCHING_ALGORITHMS[algo.id](arrayData, searchTarget);
    }

    // Tree Traversals
    if (algo.category === 'trees') {
      if (algo.id === 'inorder-traversal') return generateInorderSteps();
      if (algo.id === 'preorder-traversal') return generatePreorderSteps();
      if (algo.id === 'postorder-traversal') return generatePostorderSteps();
      if (algo.id === 'level-order-traversal') return generateLevelOrderSteps();
    }

    // Graph Algorithms
    if (algo.category === 'graphs' && GRAPH_ALGORITHMS[algo.id]) {
      return GRAPH_ALGORITHMS[algo.id](graphData, graphStartNode);
    }

    return [];
  }, [algo, arrayData, searchTarget, graphData, graphStartNode]);

  // Use interactive steps if set by component; otherwise generated steps
  const activeSteps = interactiveSteps !== null ? interactiveSteps : generatedSteps;

  // Visualizer controller hook
  const visualizer = useVisualizer({
    steps: activeSteps,
    initialSpeed: 500,
    autoPlay: false
  });

  // Enable space/arrow/R shortcuts
  useKeyboardShortcuts({
    onTogglePlay: visualizer.togglePlay,
    onNext: visualizer.nextStep,
    onPrev: visualizer.prevStep,
    onReset: visualizer.reset,
    enabled: true
  });

  // Reset interactive steps whenever algorithmId changes
  useEffect(() => {
    setInteractiveSteps(null);
    if (algo?.category === 'searching') {
      // Pick a random element from arrayData as default target
      const randomElem = arrayData[Math.floor(Math.random() * arrayData.length)];
      setSearchTarget(randomElem);
    }
  }, [algorithmId]);

  const handleGenerateRandomArray = useCallback(() => {
    const newArr = generateRandomArray(12, 10, 95);
    setArrayData(newArr);
    setInteractiveSteps(null);
    if (algo?.category === 'searching') {
      setSearchTarget(newArr[Math.floor(Math.random() * newArr.length)]);
    }
  }, [algo?.category]);

  const handleApplyCustomArray = useCallback((customArr) => {
    setArrayData(customArr);
    setInteractiveSteps(null);
    if (algo?.category === 'searching') {
      setSearchTarget(customArr[0]);
    }
  }, [algo?.category]);

  const handleTriggerInteractiveSteps = useCallback((newSteps) => {
    setInteractiveSteps(newSteps);
  }, []);

  const handleGraphStart = useCallback((graph, startNode) => {
    setGraphData(graph);
    setGraphStartNode(startNode);
    if (GRAPH_ALGORITHMS[algo.id]) {
      const newSteps = GRAPH_ALGORITHMS[algo.id](graph, startNode);
      setInteractiveSteps(newSteps);
    }
  }, [algo?.id]);

  if (!algo) {
    return <Navigate to="/" replace />;
  }

  // Render appropriate Visualizer component
  const renderVisualizer = () => {
    if (algo.category === 'sorting') {
      return <SortingVisualizer step={visualizer.currentStep} array={arrayData} />;
    }

    if (algo.category === 'searching') {
      return (
        <div className="space-y-4">
          {/* Target value input bar */}
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Set Search Target:</span>
            <input
              type="number"
              value={searchTarget}
              onChange={e => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val)) setSearchTarget(val);
              }}
              className="w-20 px-2.5 py-1 rounded-lg border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-slate-700 font-mono"
            />
            <button
              onClick={() => {
                setInteractiveSteps(null);
              }}
              className="px-3 py-1 font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Update Search Target
            </button>
          </div>
          <SearchingVisualizer step={visualizer.currentStep} target={searchTarget} />
        </div>
      );
    }

    if (algo.id === 'array') {
      return (
        <ArrayVisualizer step={visualizer.currentStep} onTriggerSteps={handleTriggerInteractiveSteps} />
      );
    }

    if (algo.id === 'stack') {
      return <StackVisualizer step={visualizer.currentStep} onTriggerSteps={handleTriggerInteractiveSteps} />;
    }

    if (algo.id === 'queue') {
      return <QueueVisualizer step={visualizer.currentStep} onTriggerSteps={handleTriggerInteractiveSteps} />;
    }

    if (algo.id === 'linked-list') {
      return <LinkedListVisualizer step={visualizer.currentStep} onTriggerSteps={handleTriggerInteractiveSteps} />;
    }

    if (algo.id === 'doubly-linked-list') {
      return <DoublyLinkedListVisualizer step={visualizer.currentStep} onTriggerSteps={handleTriggerInteractiveSteps} />;
    }

    if (algo.id === 'hash-table') {
      return <HashTableVisualizer step={visualizer.currentStep} onTriggerSteps={handleTriggerInteractiveSteps} />;
    }

    if (algo.id === 'heap') {
      return <HeapVisualizer step={visualizer.currentStep} onTriggerSteps={handleTriggerInteractiveSteps} />;
    }

    if (algo.id === 'binary-search-tree' || algo.id === 'bst-operations') {
      return <BSTVisualizer step={visualizer.currentStep} onTriggerSteps={handleTriggerInteractiveSteps} />;
    }

    if (algo.id === 'trie') {
      return <TrieVisualizer step={visualizer.currentStep} onTriggerSteps={handleTriggerInteractiveSteps} />;
    }

    if (algo.category === 'trees') {
      return <TreeTraversalVisualizer step={visualizer.currentStep} />;
    }

    if (algo.category === 'graphs') {
      return (
        <GraphVisualizer
          algorithmId={algo.id}
          step={visualizer.currentStep}
          onSelectGraph={(g, s) => {
            setGraphData(g);
            setGraphStartNode(s);
          }}
          onStartAlgorithm={handleGraphStart}
        />
      );
    }

    return null;
  };

  const isArrayInteractive = algo.category === 'sorting' || algo.category === 'searching';

  return (
    <div className="space-y-6 pb-4">
      
      {/* Category Sibling Navigation Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
          {algo.categoryName}:
        </span>
        {ALGORITHM_LIST.filter(a => a.category === algo.category).map(sibling => (
          <Link
            key={sibling.id}
            to={`/${sibling.category}/${sibling.id}`}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
              sibling.id === algo.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            {sibling.name}
          </Link>
        ))}
      </div>

      {/* Title & Overview Banner */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {algo.categoryName}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          {algo.name}
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          {algo.description}
        </p>
      </div>

      {/* Main Controls Bar */}
      <ControlsBar
        isPlaying={visualizer.isPlaying}
        onTogglePlay={visualizer.togglePlay}
        onNext={visualizer.nextStep}
        onPrev={visualizer.prevStep}
        onReset={visualizer.reset}
        currentStepIndex={visualizer.currentStepIndex}
        totalSteps={visualizer.totalSteps}
        onJumpToStep={visualizer.jumpToStep}
        speed={visualizer.speed}
        onSpeedChange={visualizer.setSpeed}
        onGenerateRandom={isArrayInteractive ? handleGenerateRandomArray : null}
        onApplyCustomInput={isArrayInteractive ? handleApplyCustomArray : null}
        showInputControls={isArrayInteractive}
      />

      {/* Primary Visualizer Canvas */}
      <div className="space-y-3">
        {renderVisualizer()}
        <Legend />
      </div>

      {/* Step Explanation & Live Counters */}
      <StepExplanationCard step={visualizer.currentStep} />

      {/* Pseudocode Execution */}
      <PseudocodeViewer
        pseudocode={algo.pseudocode}
        activeLine={visualizer.currentStep.pseudocodeLine}
      />

      {/* Key Takeaways & Real-World Applications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
            Key Insights & Invariants
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            {(algo.keyPoints || []).map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
            Real-World Industry Applications
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            {(algo.applications || []).map((app, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{app}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Complete JavaScript Implementation with Copy Button */}
      <CodeBlock code={algo.code} title={`${algo.name} Implementation (JavaScript)`} />

    </div>
  );
}
