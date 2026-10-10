# AlgoNexus | Simple DSA Visualizer

**AlgoNexus** is a clean, interactive website for learning **Data Structures and Algorithms (DSA)** through step-by-step visual animations.

---

## 🚀 How to Run the Project

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local server:**
   ```bash
   npm run dev
   ```

3. Open your browser at the local URL shown in your terminal (usually `http://localhost:5173`).

---

## 🛠️ Technologies Used

| Technology | What It Does |
| :--- | :--- |
| **React 18** | Builds the user interface and manages interactive state (play, pause, step index). |
| **Vite 6** | Super-fast local development server and production build tool. |
| **Tailwind CSS 3** | Styles all pages, responsive layouts, colors, and animations. |
| **React Router 6** | Handles navigation between pages without refreshing the browser. |
| **Lucide React** | Clean icons for buttons, arrows, search, and data structures. |
| **Canvas Confetti** | Confetti animation when an algorithm finishes sorting. |
| **Dynamic SVG** | Draws mathematical trees, binary heaps, and network graph lines. |

---

## ✨ Main Features (In Simple Words)

- **Step-by-Step Playback**: Start, pause, resume, step forward, or step backward through any algorithm.
- **Adjust Speed**: Slow down (`0.25x`) to understand logic, or speed up (`4x`) to finish fast.
- **Custom Input**: Type your own numbers or click **Random** to generate a new array.
- **Live Pseudocode**: Lights up the exact line of code currently running.
- **Live Counters**: Counts real comparisons, swaps, and total operations in real-time.
- **Race Arena (`/compare`)**: Run two sorting algorithms (e.g. Quick Sort vs. Bubble Sort) side-by-side on the same array.
- **Instant Search (`Ctrl+K`)**: Search any algorithm instantly by typing its name.
- **Mobile Friendly**: Designed to fit nicely on phones, tablets, laptops, and desktop screens.

---

## 📁 File Structure & What Each File Does

```
Algonexus/
├── index.html                           # Main HTML page
├── package.json                         # Project libraries and run scripts
├── vite.config.js                       # Vite tool configuration
├── tailwind.config.js                   # Tailwind styling settings
├── postcss.config.js                    # CSS processor configuration
│
└── src/
    ├── main.jsx                         # App entry point that mounts React to index.html
    ├── App.jsx                          # Main routing setup and layout
    ├── index.css                        # Global styles and custom slider bar
    │
    ├── pages/                           # Main website pages
    │   ├── HomePage.jsx                 # Home dashboard with category cards & hero animation
    │   ├── CategoryPage.jsx             # Category overview page (Sorting, Searching, etc.)
    │   ├── AlgorithmDetailPage.jsx      # Algorithm lab page with visualizer & pseudocode
    │   ├── ComparePage.jsx              # Head-to-head algorithm race arena
    │   └── NotFoundPage.jsx             # 404 page if a link is not found
    │
    ├── components/
    │   ├── common/                      # Reusable UI pieces
    │   │   ├── Navbar.jsx               # Top navigation bar with algorithm search
    │   │   ├── Footer.jsx               # Bottom footer links
    │   │   ├── Logo.jsx                 # Brand logo icon
    │   │   ├── ControlsBar.jsx          # Play, pause, step, speed slider, and input buttons
    │   │   ├── StepExplanationCard.jsx  # Card explaining the current step and live counters
    │   │   ├── PseudocodeViewer.jsx     # Line-by-line pseudocode highlighter
    │   │   ├── CodeBlock.jsx            # JavaScript code block with copy button
    │   │   ├── Legend.jsx               # Color badges explaining compare, swap, and sorted
    │   │   ├── ScrollToTop.jsx          # Automatically scrolls to top when changing pages
    │   │   └── ErrorBoundary.jsx        # Catches unexpected React errors safely
    │   │
    │   ├── home/
    │   │   └── HeroAlgorithmAnimation.jsx # Interactive algorithm preview on the homepage
    │   │
    │   └── visualizers/                 # Visual animation canvas for each topic
    │       ├── SortingVisualizer.jsx    # Animated vertical bars for sorting algorithms
    │       ├── SearchingVisualizer.jsx  # Array memory cells for linear & binary search
    │       ├── ArrayVisualizer.jsx      # Contiguous memory with read, insert, delete, traverse
    │       ├── StackVisualizer.jsx      # LIFO beaker tube with push, pop, and peek
    │       ├── QueueVisualizer.jsx      # FIFO horizontal pipe with enqueue and dequeue
    │       ├── LinkedListVisualizer.jsx # Singly linked list with node pointers
    │       ├── DoublyLinkedListVisualizer.jsx # Doubly linked list with prev and next pointers
    │       ├── HashTableVisualizer.jsx  # Hash table with polynomial hash calculation
    │       ├── HeapVisualizer.jsx       # Min/Max binary heap tree and array mapping
    │       ├── BSTVisualizer.jsx        # Binary Search Tree SVG with insert, search, delete
    │       ├── TreeTraversalVisualizer.jsx # Inorder, Preorder, Postorder & Level Order
    │       ├── GraphVisualizer.jsx      # Network graph SVG (BFS, DFS, Dijkstra, MST, etc.)
    │       └── TrieVisualizer.jsx       # Prefix tree with character branching
    │
    ├── algorithms/                      # Step-by-step snapshot generators
    │   ├── sorting/                     # Bubble, Selection, Insertion, Merge, Quick, Heap sort
    │   ├── searching/                   # Linear and Binary search
    │   ├── trees/                       # Tree traversals and BST logic
    │   ├── graphs/                      # BFS, DFS, Dijkstra, Bellman-Ford, Floyd, Prim, Kruskal
    │   └── dataStructures/              # Array, Stack, Queue, Linked Lists, Hash Table, Heap, Trie
    │
    ├── hooks/                           # Custom React helper logic
    │   ├── useVisualizer.js             # Controls playback loop, timers, and step scrubbing
    │   └── useKeyboardShortcuts.js      # Space, arrow keys, and 'R' shortcut keys
    │
    ├── data/                            # Application data
    │   ├── algorithmsData.js            # Algorithm info, Big-O complexity, code, and pseudocode
    │   └── graphPresets.js              # Node coordinates and edge presets for graph visualizers
    │
    └── utils/
        └── arrayUtils.js                # Helper to create random arrays and parse user input
```

---

## ⌨️ Keyboard Shortcuts

- **`Space`**: Play or Pause the animation
- **`Right Arrow`**: Go to the Next Step
- **`Left Arrow`**: Go back to the Previous Step
- **`R`**: Reset to Step 0
- **`Ctrl + K` / `Cmd + K`**: Open Search box

---

## 📄 License
This project is open-source under the MIT License.
