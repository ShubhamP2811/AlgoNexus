// Comprehensive metadata, complexity info, pseudocode, and references for all DSA topics

export const CATEGORIES = [
  {
    id: 'sorting',
    name: 'Sorting',
    description: 'Algorithms that rearrange elements of an array or list into a specific order (ascending or descending).',
    icon: 'ArrowDownUp',
    color: 'from-blue-500 to-indigo-600',
    count: 6
  },
  {
    id: 'searching',
    name: 'Searching',
    description: 'Algorithms designed to locate specific target elements within structured collections.',
    icon: 'Search',
    color: 'from-emerald-500 to-teal-600',
    count: 2
  },
  {
    id: 'data-structures',
    name: 'Data Structures',
    description: 'Fundamental ways of organizing and storing data in computer memory for efficient operations.',
    icon: 'Layers',
    color: 'from-purple-500 to-violet-600',
    count: 9
  },
  {
    id: 'trees',
    name: 'Trees',
    description: 'Hierarchical non-linear data structures consisting of nodes connected by edges, with a root node.',
    icon: 'GitBranch',
    color: 'from-amber-500 to-orange-600',
    count: 5
  },
  {
    id: 'graphs',
    name: 'Graphs',
    description: 'Networks of vertices connected by edges, modeling relationships, pathways, and networks.',
    icon: 'Share2',
    color: 'from-rose-500 to-pink-600',
    count: 7
  }
];

export const ALGORITHMS = {
  // ==========================================
  // SORTING ALGORITHMS
  // ==========================================
  'bubble-sort': {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sorting',
    categoryName: 'Sorting',
    shortDescription: 'Repeatedly steps through the list, compares adjacent elements and swaps them if in wrong order.',
    description: 'Bubble Sort is the simplest comparison-based sorting algorithm. It works by repeatedly traversing through the list, swapping adjacent elements that are out of order. After each complete pass, the next largest unsorted element "bubbles up" to its correct final position at the end of the array.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stability: 'Stable',
    pseudocode: [
      'procedure bubbleSort(A : list of sortable items)',
      '  n := length(A)',
      '  for i := 0 to n - 1 do',
      '    swapped := false',
      '    for j := 0 to n - i - 2 do',
      '      if A[j] > A[j + 1] then',
      '        swap(A[j], A[j + 1])',
      '        swapped := true',
      '    if not swapped then break',
      'end procedure'
    ],
    code: `function bubbleSort(arr) {
  const n = arr.length;
  let swapped;
  for (let i = 0; i < n; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
    keyPoints: [
      'Simplicity: Easiest sorting algorithm to understand and implement.',
      'Adaptive: With an early-exit swapped flag, achieves O(n) on nearly sorted data.',
      'In-place & Stable: Uses O(1) auxiliary memory and maintains relative order of equal keys.'
    ],
    applications: ['Educational purposes', 'Small collections', 'Detecting already sorted arrays']
  },

  'selection-sort': {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'sorting',
    categoryName: 'Sorting',
    shortDescription: 'Divides the list into sorted and unsorted regions, repeatedly finding the minimum element.',
    description: 'Selection Sort divides the input list into two parts: a sorted sublist built up from left to right, and a remaining unsorted sublist. In each pass, it finds the smallest element in the unsorted sublist and swaps it with the first unsorted element.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stability: 'Unstable',
    pseudocode: [
      'procedure selectionSort(A : list of sortable items)',
      '  n := length(A)',
      '  for i := 0 to n - 2 do',
      '    minIndex := i',
      '    for j := i + 1 to n - 1 do',
      '      if A[j] < A[minIndex] then',
      '        minIndex := j',
      '    if minIndex != i then',
      '      swap(A[i], A[minIndex])',
      'end procedure'
    ],
    code: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}`,
    keyPoints: [
      'Minimizes Swaps: Makes at most O(n) swaps, advantageous when write operations are expensive (e.g. Flash memory).',
      'Non-adaptive: Always performs O(n²) comparisons regardless of initial ordering.',
      'In-place: Requires O(1) additional space.'
    ],
    applications: ['Memory with costly write operations (EEPROM/Flash)', 'Simple hardware microcontrollers']
  },

  'insertion-sort': {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'sorting',
    categoryName: 'Sorting',
    shortDescription: 'Builds the final sorted array one item at a time by inserting each element into its proper position.',
    description: 'Insertion Sort iterates through the array and consumes one input element per repetition, growing a sorted output list. At each iteration, it removes an element from the input data, finds the location it belongs within the sorted list, and inserts it there.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stability: 'Stable',
    pseudocode: [
      'procedure insertionSort(A : list of sortable items)',
      '  n := length(A)',
      '  for i := 1 to n - 1 do',
      '    key := A[i]',
      '    j := i - 1',
      '    while j >= 0 and A[j] > key do',
      '      A[j + 1] := A[j]',
      '      j := j - 1',
      '    A[j + 1] := key',
      'end procedure'
    ],
    code: `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    keyPoints: [
      'Highly Efficient for Small Arrays: Lower overhead than Quick Sort or Merge Sort for N <= 16.',
      'Online: Can sort a list as it receives items dynamically.',
      'Adaptive: Runs in O(n + d) where d is the number of inversions.'
    ],
    applications: ['Hybrid sorting algorithms (Timsort, Introsort fallback for small arrays)', 'Real-time streaming inputs']
  },

  'merge-sort': {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'sorting',
    categoryName: 'Sorting',
    shortDescription: 'Divide-and-conquer algorithm that recursively splits arrays in half and merges the sorted halves.',
    description: 'Merge Sort is an efficient, comparison-based, divide-and-conquer algorithm. It divides the unsorted list into n sublists, each containing one element, and repeatedly merges sublists to produce new sorted sublists until there is only one remaining.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    stability: 'Stable',
    pseudocode: [
      'procedure mergeSort(A, left, right)',
      '  if left < right then',
      '    mid := floor((left + right) / 2)',
      '    mergeSort(A, left, mid)',
      '    mergeSort(A, mid + 1, right)',
      '    merge(A, left, mid, right)',
      '',
      'procedure merge(A, left, mid, right)',
      '  copy left and right halves to temp arrays',
      '  compare and merge back in ascending order'
    ],
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    keyPoints: [
      'Guaranteed O(n log n): Never degrades into O(n²) worst-case behavior.',
      'External Sorting: Ideal for sorting large datasets that do not fit into RAM.',
      'Stable: Preserves input order of equivalent elements.'
    ],
    applications: ['Sorting linked lists', 'External tape/disk sorting', 'Timsort base engine']
  },

  'quick-sort': {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'sorting',
    categoryName: 'Sorting',
    shortDescription: 'Picks a pivot element and partitions the array around it such that smaller items are left and larger right.',
    description: 'Quick Sort is a divide-and-conquer algorithm. It works by selecting a "pivot" element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    stability: 'Unstable',
    pseudocode: [
      'procedure quickSort(A, low, high)',
      '  if low < high then',
      '    p := partition(A, low, high)',
      '    quickSort(A, low, p - 1)',
      '    quickSort(A, p + 1, high)',
      '',
      'procedure partition(A, low, high)',
      '  pivot := A[high]',
      '  i := low - 1',
      '  for j := low to high - 1 do',
      '    if A[j] <= pivot then',
      '      i := i + 1; swap(A[i], A[j])',
      '  swap(A[i + 1], A[high])',
      '  return i + 1'
    ],
    code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    keyPoints: [
      'In-Place and Cache Friendly: High locality of reference makes it standard in C/C++ qsort & standard libraries.',
      'Pivot Selection Critical: Median-of-three or randomized pivot avoids O(n²) degraded performance.',
      'Small constant factor compared to Merge Sort and Heap Sort.'
    ],
    applications: ['Standard language library sort routines', 'Numerical analysis', 'Geometric algorithms']
  },

  'heap-sort': {
    id: 'heap-sort',
    name: 'Heap Sort',
    category: 'sorting',
    categoryName: 'Sorting',
    shortDescription: 'Builds a max-heap from the input and repeatedly extracts the maximum root to sort in-place.',
    description: 'Heap Sort is a comparison-based sorting technique based on Binary Heap data structure. It builds a Max-Heap from the array, repeatedly swaps the root (maximum) with the last element, shrinks the heap size by 1, and heapifies the root.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(1)',
    stability: 'Unstable',
    pseudocode: [
      'procedure heapSort(A : list of sortable items)',
      '  n := length(A)',
      '  for i := floor(n / 2) - 1 down to 0 do',
      '    heapify(A, n, i)',
      '  for i := n - 1 down to 1 do',
      '    swap(A[0], A[i])',
      '    heapify(A, i, 0)',
      '',
      'procedure heapify(A, n, i)',
      '  largest := i, left := 2*i + 1, right := 2*i + 2',
      '  if left < n and A[left] > A[largest] then largest := left',
      '  if right < n and A[right] > A[largest] then largest := right',
      '  if largest != i then swap(A[i], A[largest]); heapify(A, n, largest)'
    ],
    code: `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
    keyPoints: [
      'Guaranteed O(n log n) with O(1) Space: Combines speed of Merge Sort with memory economy of Selection Sort.',
      'Non-recursive: Heapify can be done iteratively.',
      'Forms the fallback of Introsort to prevent Quick Sort quadratic degradation.'
    ],
    applications: ['Embedded systems with hard memory constraints', 'Priority queues', 'Order statistics']
  },

  // ==========================================
  // SEARCHING ALGORITHMS
  // ==========================================
  'linear-search': {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'searching',
    categoryName: 'Searching',
    shortDescription: 'Sequentially checks each element of the list until a match is found or all elements have been examined.',
    description: 'Linear Search (also known as sequential search) is a method for finding an element within a list. It sequentially checks each element of the list until a match is found or until all the elements have been searched. It requires no prior sorting of the list.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(1)',
    pseudocode: [
      'procedure linearSearch(A, target)',
      '  for i := 0 to length(A) - 1 do',
      '    if A[i] = target then',
      '      return i',
      '  return -1',
      'end procedure'
    ],
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    keyPoints: [
      'Works on Unordered Lists: Does not require elements to be sorted.',
      'Universal: Works on linked lists, files, and streamed inputs.',
      'Cache-friendly sequential memory traversal.'
    ],
    applications: ['Small unsorted collections', 'Searching unsorted linked lists', 'Hardware scanning']
  },

  'binary-search': {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'searching',
    categoryName: 'Searching',
    shortDescription: 'Repeatedly divides a sorted search interval in half to locate a target in logarithmic time.',
    description: 'Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you have narrowed down the possible locations to just one.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)'
    },
    spaceComplexity: 'O(1)',
    pseudocode: [
      'procedure binarySearch(A, target)',
      '  low := 0, high := length(A) - 1',
      '  while low <= high do',
      '    mid := floor((low + high) / 2)',
      '    if A[mid] = target then',
      '      return mid',
      '    else if A[mid] < target then',
      '      low := mid + 1',
      '    else',
      '      high := mid - 1',
      '  return -1',
      'end procedure'
    ],
    code: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}`,
    keyPoints: [
      'Prerequisite: The underlying data collection MUST be sorted.',
      'Logarithmic Efficiency: In 1,000,000 elements, requires at most 20 comparisons!',
      'Underpins database indexing (B-Trees) and bisect modules.'
    ],
    applications: ['Database index lookups', 'Standard dictionary lookups', 'Finding boundaries in monotonically increasing functions']
  },

  // ==========================================
  // DATA STRUCTURES
  // ==========================================
  'array': {
    id: 'array',
    name: 'Array',
    category: 'data-structures',
    categoryName: 'Data Structures',
    shortDescription: 'Contiguous memory layout providing instant O(1) random indexing access.',
    description: 'An Array is a collection of elements identified by index or key, stored in contiguous memory locations. It provides O(1) constant time random access, but element insertion and deletion within the middle requires shifting elements in O(n) time.',
    timeComplexity: {
      best: 'Access: O(1)',
      average: 'Search: O(n)',
      worst: 'Insert/Delete: O(n)'
    },
    spaceComplexity: 'O(n)',
    pseudocode: [
      'Access(index) -> return A[index]',
      'Insert(index, value) -> shift A[index..end] right, set A[index] = value',
      'Delete(index) -> shift A[index+1..end] left',
      'Update(index, value) -> A[index] = value'
    ],
    code: `class DynamicArray {
  constructor() {
    this.data = [];
  }
  get(index) { return this.data[index]; }
  set(index, val) { this.data[index] = val; }
  insert(index, val) { this.data.splice(index, 0, val); }
  delete(index) { return this.data.splice(index, 1)[0]; }
}`,
    keyPoints: [
      'Contiguous Memory: Cache line prefetching provides exceptional speed.',
      'Random Access: Direct mathematical index calculation `address + i * size`.',
      'Fixed capacity in primitive arrays, dynamic doubling in ArrayList / Vector.'
    ],
    applications: ['Base structure for matrices, buffers, heaps, lookup tables']
  },

  'stack': {
    id: 'stack',
    name: 'Stack',
    category: 'data-structures',
    categoryName: 'Data Structures',
    shortDescription: 'LIFO (Last-In, First-Out) linear structure with push, pop, and peek operations.',
    description: 'A Stack is an abstract data type that serves as a collection of elements with two principal operations: Push (adds an element to the top) and Pop (removes the most recently added element). The order in which elements come off a stack gives rise to its alternative name, LIFO.',
    timeComplexity: {
      best: 'Push: O(1)',
      average: 'Pop: O(1)',
      worst: 'Peek: O(1)'
    },
    spaceComplexity: 'O(n)',
    pseudocode: [
      'Push(val):',
      '  top := top + 1; S[top] := val',
      'Pop():',
      '  if isEmpty() error Underflow',
      '  val := S[top]; top := top - 1; return val',
      'Peek():',
      '  return S[top]'
    ],
    code: `class Stack {
  constructor() { this.items = []; }
  push(val) { this.items.push(val); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}`,
    keyPoints: [
      'LIFO Principle: The last element pushed is the first one popped.',
      'O(1) Operations: Push, pop, and top are strictly constant time.',
      'Crucial for backtracking, syntax parsing, and call frames.'
    ],
    applications: ['Browser history (Back button)', 'Undo/Redo operations in editors', 'Call stack in runtime environments', 'Parenthesis validation']
  },

  'queue': {
    id: 'queue',
    name: 'Queue',
    category: 'data-structures',
    categoryName: 'Data Structures',
    shortDescription: 'FIFO (First-In, First-Out) linear structure with enqueue and dequeue operations.',
    description: 'A Queue is an ordered collection of elements where entities are kept in order and the principal operations are the addition of entities to the rear terminal position (enqueue) and removal of entities from the front terminal position (dequeue).',
    timeComplexity: {
      best: 'Enqueue: O(1)',
      average: 'Dequeue: O(1)',
      worst: 'Peek: O(1)'
    },
    spaceComplexity: 'O(n)',
    pseudocode: [
      'Enqueue(val):',
      '  rear := (rear + 1) mod capacity; Q[rear] := val',
      'Dequeue():',
      '  if isEmpty() error Underflow',
      '  val := Q[front]; front := (front + 1) mod capacity; return val',
      'Peek():',
      '  return Q[front]'
    ],
    code: `class Queue {
  constructor() { this.items = []; }
  enqueue(val) { this.items.push(val); }
  dequeue() { return this.items.shift(); }
  peek() { return this.items[0]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}`,
    keyPoints: [
      'FIFO Principle: The oldest element is processed first.',
      'Fair Scheduling: Ensures items are processed in exact arrival sequence.',
      'Can be implemented as Circular Buffer or Linked Nodes to guarantee O(1) dequeue.'
    ],
    applications: ['Breadth-First Search (BFS)', 'Printer spoolers', 'Task scheduling & Message brokers (RabbitMQ, Kafka)']
  },

  'linked-list': {
    id: 'linked-list',
    name: 'Linked List',
    category: 'data-structures',
    categoryName: 'Data Structures',
    shortDescription: 'Linear sequence of data nodes where each node points to the subsequent node in memory.',
    description: 'A Singly Linked List is a linear data structure where elements are not stored at contiguous memory locations. The elements in a linked list are linked using pointers. Each node contains a data field and a reference (pointer) to the next node in the list.',
    timeComplexity: {
      best: 'Insert Head: O(1)',
      average: 'Search: O(n)',
      worst: 'Delete Value: O(n)'
    },
    spaceComplexity: 'O(n)',
    pseudocode: [
      'Node: { data, next }',
      'InsertHead(val): newNode.next = head; head = newNode',
      'InsertTail(val): curr = head; while curr.next: curr = curr.next; curr.next = newNode',
      'DeleteValue(val): prev.next = curr.next'
    ],
    code: `class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() { this.head = null; }
  insertHead(val) { this.head = new ListNode(val, this.head); }
  insertTail(val) {
    const node = new ListNode(val);
    if (!this.head) { this.head = node; return; }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
  }
}`,
    keyPoints: [
      'Dynamic Size: Memory is allocated node-by-node on demand.',
      'Efficient Head Insertion: O(1) constant time prepending without reallocation.',
      'No Random Access: Requires O(n) sequential pointer traversal.'
    ],
    applications: ['Music playlists', 'Image viewers', 'Implementing stacks and queues']
  },

  'doubly-linked-list': {
    id: 'doubly-linked-list',
    name: 'Doubly Linked List',
    category: 'data-structures',
    categoryName: 'Data Structures',
    shortDescription: 'Bidirectional chain of nodes containing pointers to both the next and previous nodes.',
    description: 'A Doubly Linked List (DLL) is a variation of linked lists in which navigation is possible in both forward and backward directions. Every node contains a data element, a pointer to the next node, and a pointer to the previous node.',
    timeComplexity: {
      best: 'Insert Head/Tail: O(1)',
      average: 'Delete given Node: O(1)',
      worst: 'Search: O(n)'
    },
    spaceComplexity: 'O(n)',
    pseudocode: [
      'Node: { data, prev, next }',
      'InsertTail(val):',
      '  newNode.prev = tail; tail.next = newNode; tail = newNode',
      'Delete(node):',
      '  node.prev.next = node.next; node.next.prev = node.prev'
    ],
    code: `class DoublyNode {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
}`,
    keyPoints: [
      'Bidirectional Traversal: Can be traversed forward or backward.',
      'O(1) Node Deletion: Any given node reference can be deleted in O(1) without knowing its predecessor.',
      'Extra Pointer Overhead: Requires additional memory per node for the previous pointer.'
    ],
    applications: ['LRU Cache implementation', 'Browser Forward/Back navigation', 'Undo/Redo managers']
  },

  'hash-table': {
    id: 'hash-table',
    name: 'Hash Table',
    category: 'data-structures',
    categoryName: 'Data Structures',
    shortDescription: 'Associative key-value store mapping keys to indices via a hash function with collision handling.',
    description: 'A Hash Table (Hash Map) is a data structure that implements an associative array abstract data type, a structure that can map keys to values. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found. Collisions are handled via Separate Chaining or Open Addressing.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(n)',
    pseudocode: [
      'HashFunction(key, capacity):',
      '  return (sum of charCodes * prime) mod capacity',
      'Put(key, value):',
      '  index = HashFunction(key)',
      '  bucket = table[index]',
      '  if key exists, update value; else append (key, value)',
      'Get(key):',
      '  index = HashFunction(key)',
      '  search bucket for key'
    ],
    code: `class HashTable {
  constructor(size = 8) {
    this.buckets = Array(size).fill(null).map(() => []);
    this.size = size;
  }
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % this.size;
    }
    return hash;
  }
  set(key, val) {
    const idx = this.hash(key);
    const bucket = this.buckets[idx];
    const item = bucket.find(entry => entry.key === key);
    if (item) item.val = val;
    else bucket.push({ key, val });
  }
}`,
    keyPoints: [
      'Average O(1) Lookup: Unbeatable speed for key-value pair access.',
      'Hash Distribution: Good hash functions distribute keys evenly to avoid bucket clustering.',
      'Collision Strategies: Separate chaining uses linked buckets; Linear probing steps to next available slot.'
    ],
    applications: ['Database indexing', 'Caches (Redis/Memcached)', 'Compiler symbol tables', 'Set implementations']
  },

  'heap': {
    id: 'heap',
    name: 'Binary Heap',
    category: 'data-structures',
    categoryName: 'Data Structures',
    shortDescription: 'Complete binary tree satisfying the heap property (Min-Heap or Max-Heap).',
    description: 'A Binary Heap is a complete binary tree which satisfies the heap property: in a Max-Heap, for any given node C, if P is a parent node of C, then the key of P is greater than or equal to the key of C. Binary heaps can be efficiently mapped to a flat array: left child at 2i + 1, right child at 2i + 2, and parent at floor((i - 1) / 2).',
    timeComplexity: {
      best: 'Find Min/Max: O(1)',
      average: 'Insert: O(log n)',
      worst: 'Extract: O(log n)'
    },
    spaceComplexity: 'O(n)',
    pseudocode: [
      'Insert(val):',
      '  append val to end of array',
      '  bubbleUp(lastIndex)',
      'ExtractRoot():',
      '  root = array[0]',
      '  array[0] = array.pop()',
      '  bubbleDown(0)',
      '  return root'
    ],
    code: `class MinHeap {
  constructor() { this.heap = []; }
  parent(i) { return Math.floor((i - 1) / 2); }
  left(i) { return 2 * i + 1; }
  right(i) { return 2 * i + 2; }
  insert(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }
  bubbleUp(i) {
    while (i > 0 && this.heap[i] < this.heap[this.parent(i)]) {
      [this.heap[i], this.heap[this.parent(i)]] = [this.heap[this.parent(i)], this.heap[i]];
      i = this.parent(i);
    }
  }
}`,
    keyPoints: [
      'Compact Array Representation: No pointers required; index arithmetic defines parent and children.',
      'Priority Queue Engine: Underpins Dijkstra, Prim, and Huffman Coding.',
      'Heapify in O(n) Time: Can build a full heap in linear time.'
    ],
    applications: ['Priority Queues', 'Dijkstra and Prim algorithms', 'Median tracking in data streams', 'Heap Sort']
  },

  'binary-search-tree': {
    id: 'binary-search-tree',
    name: 'Binary Search Tree',
    category: 'data-structures',
    categoryName: 'Data Structures',
    shortDescription: 'Node-based tree where left subtree contains lesser keys and right subtree contains greater keys.',
    description: 'A Binary Search Tree (BST) is a rooted binary tree data structure with the key property: the key in each node must be greater than or equal to any key stored in the left sub-tree, and less than or equal to any key stored in the right sub-tree. This allows binary search-like operations on dynamic sets.',
    timeComplexity: {
      best: 'O(log n)',
      average: 'O(log n)',
      worst: 'O(n) (skewed)'
    },
    spaceComplexity: 'O(n)',
    pseudocode: [
      'Insert(node, val):',
      '  if node is null return new Node(val)',
      '  if val < node.val: node.left = Insert(node.left, val)',
      '  else: node.right = Insert(node.right, val)',
      '  return node',
      'Search(node, val):',
      '  if node is null or node.val = val return node',
      '  return val < node.val ? Search(node.left, val) : Search(node.right, val)'
    ],
    code: `class BSTNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() { this.root = null; }
  insert(val) {
    const insertNode = (node, v) => {
      if (!node) return new BSTNode(v);
      if (v < node.val) node.left = insertNode(node.left, v);
      else if (v > node.val) node.right = insertNode(node.right, v);
      return node;
    };
    this.root = insertNode(this.root, val);
  }
}`,
    keyPoints: [
      'Ordered Structure: Inorder traversal produces strictly sorted output.',
      'Dynamic Queries: Supports min, max, predecessor, successor, and range queries.',
      'Balance Dependent: Can degenerate to O(n) linked list if sorted data is inserted without balancing.'
    ],
    applications: ['Self-balancing variants (AVL, Red-Black Trees in C++ std::map, Java TreeMap)', 'File system directories']
  },

  'trie': {
    id: 'trie',
    name: 'Trie (Prefix Tree)',
    category: 'data-structures',
    categoryName: 'Data Structures',
    shortDescription: 'Tree-like search structure used to store and locate keys in a dataset of strings by prefix.',
    description: 'A Trie (pronounced "try" or "tree"), also called digital tree or prefix tree, is an ordered tree data structure used to store a dynamic set or associative array where the keys are usually strings. Unlike a binary search tree, no node in the tree stores the key associated with that node; instead, its position in the tree defines the key with which it is associated.',
    timeComplexity: {
      best: 'Insert: O(L)',
      average: 'Search: O(L)',
      worst: 'Prefix: O(L) (L = length of word)'
    },
    spaceComplexity: 'O(ALPHABET_SIZE * N * L)',
    pseudocode: [
      'Node: { children: Map(), isEndOfWord: boolean }',
      'Insert(word):',
      '  curr := root',
      '  for char in word:',
      '    if char not in curr.children:',
      '      curr.children[char] = new Node()',
      '    curr := curr.children[char]',
      '  curr.isEndOfWord := true',
      'Search(word):',
      '  curr := root',
      '  for char in word:',
      '    if char not in curr.children: return false',
      '    curr := curr.children[char]',
      '  return curr.isEndOfWord'
    ],
    code: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word) {
    let curr = this.root;
    for (const char of word) {
      if (!curr.children[char]) curr.children[char] = new TrieNode();
      curr = curr.children[char];
    }
    curr.isEndOfWord = true;
  }
  search(word) {
    let curr = this.root;
    for (const char of word) {
      if (!curr.children[char]) return false;
      curr = curr.children[char];
    }
    return curr.isEndOfWord;
  }
}`,
    keyPoints: [
      'Prefix Sharing: Common prefixes share nodes, reducing memory for large vocabularies.',
      'O(L) Query Time: Lookup depends strictly on word length L, independent of total dictionary size N!',
      'Fast Prefix Matching: Finding words with a given prefix runs in O(prefix_length + k).'
    ],
    applications: ['Autocomplete & Predictive text search', 'Spell checkers', 'IP routing table longest prefix matching']
  },

  // ==========================================
  // TREES
  // ==========================================
  'inorder-traversal': {
    id: 'inorder-traversal',
    name: 'Inorder Traversal',
    category: 'trees',
    categoryName: 'Trees',
    shortDescription: 'Traverse left subtree, visit current root node, then traverse right subtree (Left-Root-Right).',
    description: 'Inorder Traversal is a depth-first traversal strategy for binary trees. It processes all nodes in the left subtree, then visits the root node, and finally processes all nodes in the right subtree. In a Binary Search Tree, Inorder traversal visits the keys in strictly ascending numerical order.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(h) where h is height',
    pseudocode: [
      'procedure inorder(node)',
      '  if node is null then return',
      '  inorder(node.left)',
      '  visit(node)',
      '  inorder(node.right)',
      'end procedure'
    ],
    code: `function inorderTraversal(root) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }
  traverse(root);
  return result;
}`,
    keyPoints: [
      'BST Sorted Output: Always produces sorted order in BST.',
      'Recursive or Stack-based: Can be implemented iteratively using an explicit call stack.',
      'Depth-First Strategy: Explores as deep as possible before backtracking.'
    ],
    applications: ['Sorting BST elements', 'Evaluating arithmetic expression trees', 'Tree validation']
  },

  'preorder-traversal': {
    id: 'preorder-traversal',
    name: 'Preorder Traversal',
    category: 'trees',
    categoryName: 'Trees',
    shortDescription: 'Visit current root node, traverse left subtree, then traverse right subtree (Root-Left-Right).',
    description: 'Preorder Traversal visits the root node first before traversing its left and right subtrees. It is often used to create a duplicate copy of the tree, serialize a tree structure for disk storage, or generate prefix expression notations (Polish notation).',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(h) where h is height',
    pseudocode: [
      'procedure preorder(node)',
      '  if node is null then return',
      '  visit(node)',
      '  preorder(node.left)',
      '  preorder(node.right)',
      'end procedure'
    ],
    code: `function preorderTraversal(root) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    result.push(node.val);
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
  return result;
}`,
    keyPoints: [
      'Top-Down Processing: Root is visited prior to any descendant node.',
      'Serialization Standard: Used to serialize trees into strings or files.',
      'Polish Notation: Generates prefix expression syntax trees.'
    ],
    applications: ['Tree cloning & copying', 'Serialization / deserialization of hierarchical data', 'Prefix expression generation']
  },

  'postorder-traversal': {
    id: 'postorder-traversal',
    name: 'Postorder Traversal',
    category: 'trees',
    categoryName: 'Trees',
    shortDescription: 'Traverse left subtree, traverse right subtree, then visit current root node (Left-Right-Root).',
    description: 'Postorder Traversal visits both subtrees before visiting the node itself. It is commonly used for bottom-up operations, such as deleting nodes in a tree (where children must be freed before parents), or computing node depths, heights, and aggregate subtree sums.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(h) where h is height',
    pseudocode: [
      'procedure postorder(node)',
      '  if node is null then return',
      '  postorder(node.left)',
      '  postorder(node.right)',
      '  visit(node)',
      'end procedure'
    ],
    code: `function postorderTraversal(root) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    traverse(node.right);
    result.push(node.val);
  }
  traverse(root);
  return result;
}`,
    keyPoints: [
      'Bottom-Up Computation: Children are processed completely before their parent.',
      'Safe Node Deletion: Deletes child leaves before touching parent pointers.',
      'Postfix Notation: Generates Reverse Polish Notation (RPN).'
    ],
    applications: ['Memory deallocation / tree deletion', 'Directory size calculation', 'Postfix evaluation']
  },

  'level-order-traversal': {
    id: 'level-order-traversal',
    name: 'Level Order Traversal',
    category: 'trees',
    categoryName: 'Trees',
    shortDescription: 'Visits all nodes layer by layer from top root to bottom leaves using a FIFO queue.',
    description: 'Level Order Traversal is a Breadth-First Search (BFS) technique for trees. It visits all nodes present at the current depth level before moving on to nodes at the next deeper level. A FIFO queue is used to keep track of child nodes to visit.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(w) where w is maximum width',
    pseudocode: [
      'procedure levelOrder(root)',
      '  if root is null then return',
      '  queue := new Queue()',
      '  queue.enqueue(root)',
      '  while not queue.isEmpty() do',
      '    curr := queue.dequeue()',
      '    visit(curr)',
      '    if curr.left then queue.enqueue(curr.left)',
      '    if curr.right then queue.enqueue(curr.right)',
      'end procedure'
    ],
    code: `function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const curr = queue.shift();
    result.push(curr.val);
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
  }
  return result;
}`,
    keyPoints: [
      'Breadth-First Exploration: Visits shallow nodes before deep nodes.',
      'Queue-driven: Relies on FIFO ordering rather than a call stack.',
      'Finds Shortest Tree Paths: Guarantees shortest path in unweighted tree graphs.'
    ],
    applications: ['Hierarchical rendering', 'Finding tree diameter and maximum width', 'Network broadcast routing']
  },

  'bst-operations': {
    id: 'bst-operations',
    name: 'BST Insert, Search & Delete',
    category: 'trees',
    categoryName: 'Trees',
    shortDescription: 'Interactive BST operations: step-by-step Insertion, Search, and Deletion with Inorder Successor.',
    description: 'Comprehensive manipulation of Binary Search Trees. Demonstrates how values are routed left or right based on comparisons during insertion, how search terminates with match or null, and the three cases of deletion: deleting a leaf, deleting a node with one child, and deleting a node with two children (replacing with inorder successor).',
    timeComplexity: {
      best: 'O(log n)',
      average: 'O(log n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(h)',
    pseudocode: [
      'Delete(node, val):',
      '  if val < node.val: node.left = Delete(node.left, val)',
      '  else if val > node.val: node.right = Delete(node.right, val)',
      '  else:',
      '    if no left child: return node.right',
      '    if no right child: return node.left',
      '    succ = findMin(node.right)',
      '    node.val = succ.val',
      '    node.right = Delete(node.right, succ.val)',
      '  return node'
    ],
    code: `function deleteNode(root, key) {
  if (!root) return null;
  if (key < root.val) root.left = deleteNode(root.left, key);
  else if (key > root.val) root.right = deleteNode(root.right, key);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    let succ = root.right;
    while (succ.left) succ = succ.left;
    root.val = succ.val;
    root.right = deleteNode(root.right, succ.val);
  }
  return root;
}`,
    keyPoints: [
      '3 Cases of Deletion: Leaf deletion, Single child bypass, and Two children successor replacement.',
      'Maintains BST Invariant: Left subtree < Node < Right subtree preserved through all mutations.',
      'Logarithmic Average Speed: Extremely efficient for balanced trees.'
    ],
    applications: ['Database indexing engines', 'Dynamic dictionary storage', 'Priority queue alternatives']
  },

  // ==========================================
  // GRAPH ALGORITHMS
  // ==========================================
  'bfs': {
    id: 'bfs',
    name: 'Breadth-First Search (BFS)',
    category: 'graphs',
    categoryName: 'Graphs',
    shortDescription: 'Explores vertices layer by layer using a FIFO queue, finding shortest paths in unweighted graphs.',
    description: 'Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at a designated source vertex and explores all of the neighbor vertices at the present depth level before moving on to vertices at the next depth level. It uses a FIFO queue.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)'
    },
    spaceComplexity: 'O(V)',
    pseudocode: [
      'procedure BFS(G, start_v)',
      '  let Q be a Queue',
      '  label start_v as visited',
      '  Q.enqueue(start_v)',
      '  while Q is not empty do',
      '    v := Q.dequeue()',
      '    for all edges from v to w in G.adjacentEdges(v) do',
      '      if w is not visited then',
      '        label w as visited',
      '        parent[w] := v',
      '        Q.enqueue(w)',
      'end procedure'
    ],
    code: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
    keyPoints: [
      'Shortest Path in Unweighted Graphs: Finds the minimum number of edge hops between any two vertices.',
      'Queue Data Structure: Explores all frontier vertices in order of distance from source.',
      'Cycle Safe: Visited set prevents infinite loops in cyclic graphs.'
    ],
    applications: ['Social network friend degrees (LinkedIn connections)', 'GPS unweighted routing', 'Web crawlers', 'Network broadcasting']
  },

  'dfs': {
    id: 'dfs',
    name: 'Depth-First Search (DFS)',
    category: 'graphs',
    categoryName: 'Graphs',
    shortDescription: 'Explores as far as possible along each branch before backtracking, using recursion or a stack.',
    description: 'Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root in the case of a graph) and explores as far as possible along each branch before backtracking.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)'
    },
    spaceComplexity: 'O(V)',
    pseudocode: [
      'procedure DFS(G, v)',
      '  label v as visited',
      '  for all directed edges from v to w that are in G.adjacentEdges(v) do',
      '    if vertex w is not visited then',
      '      DFS(G, w)',
      'end procedure'
    ],
    code: `function dfs(graph, start) {
  const visited = new Set();
  const order = [];
  function traverse(node) {
    visited.add(node);
    order.push(node);
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        traverse(neighbor);
      }
    }
  }
  traverse(start);
  return order;
}`,
    keyPoints: [
      'Deep Exploration: Follows paths to dead ends before backtracking.',
      'Call Stack or Explicit Stack: Minimal memory on graphs with small maximum path length.',
      'Fundamental Building Block: Used in topological sort, strongly connected components (Kosaraju/Tarjan), and cycle detection.'
    ],
    applications: ['Maze solving', 'Cycle detection', 'Topological sorting', 'Connected components analysis']
  },

  'dijkstra': {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'graphs',
    categoryName: 'Graphs',
    shortDescription: 'Finds the shortest paths between nodes in a graph with non-negative edge weights using a greedy priority queue.',
    description: "Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a weighted graph with non-negative edge weights. For a given source node, the algorithm finds the shortest path between that node and every other node by greedily settling the vertex with the lowest known distance and relaxing its incident edges.",
    timeComplexity: {
      best: 'O((V + E) log V)',
      average: 'O((V + E) log V)',
      worst: 'O(V²)'
    },
    spaceComplexity: 'O(V)',
    pseudocode: [
      'procedure Dijkstra(G, source)',
      '  dist[source] := 0',
      '  for each vertex v != source: dist[v] := infinity',
      '  create priority queue Q with all vertices prioritized by dist',
      '  while Q is not empty do',
      '    u := Q.extractMin()',
      '    for each neighbor v of u do',
      '      alt := dist[u] + weight(u, v)',
      '      if alt < dist[v] then',
      '        dist[v] := alt',
      '        prev[v] := u',
      '        Q.decreaseKey(v, alt)',
      'end procedure'
    ],
    code: `function dijkstra(graph, start) {
  const dist = {};
  const visited = new Set();
  for (const node in graph) dist[node] = Infinity;
  dist[start] = 0;

  while (visited.size < Object.keys(graph).length) {
    let u = null;
    for (const node in dist) {
      if (!visited.has(node) && (u === null || dist[node] < dist[u])) {
        u = node;
      }
    }
    if (u === null || dist[u] === Infinity) break;
    visited.add(u);

    for (const { node: v, weight } of graph[u] || []) {
      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
      }
    }
  }
  return dist;
}`,
    keyPoints: [
      'Greedy Choice Property: Once a vertex is settled, its shortest distance is guaranteed final and optimal.',
      'Non-negative Weights Only: Fails or loops infinitely on graphs containing negative edge weights.',
      'Priority Queue Acceleration: Reduces time complexity to O((V + E) log V) with a binary min-heap.'
    ],
    applications: ['Google Maps / GPS navigation', 'Network routing protocols (OSPF, IS-IS)', 'Flight connections optimization']
  },

  'bellman-ford': {
    id: 'bellman-ford',
    name: 'Bellman-Ford Algorithm',
    category: 'graphs',
    categoryName: 'Graphs',
    shortDescription: 'Computes single-source shortest paths on weighted graphs and accurately detects negative weight cycles.',
    description: 'The Bellman-Ford algorithm computes shortest paths from a single source vertex to all of the other vertices in a weighted digraph. Unlike Dijkstra, Bellman-Ford can handle graphs in which edge weights are negative numbers. It relaxes all edges V-1 times, and an extra V-th pass detects any negative weight cycles.',
    timeComplexity: {
      best: 'O(E)',
      average: 'O(V · E)',
      worst: 'O(V · E)'
    },
    spaceComplexity: 'O(V)',
    pseudocode: [
      'procedure BellmanFord(vertices, edges, source)',
      '  dist[source] := 0',
      '  for each v != source: dist[v] := infinity',
      '  for i := 1 to |V| - 1 do',
      '    for each edge (u, v) with weight w in edges do',
      '      if dist[u] + w < dist[v] then',
      '        dist[v] := dist[u] + w',
      '  for each edge (u, v) with weight w in edges do',
      '    if dist[u] + w < dist[v] then',
      '      report "Graph contains a negative-weight cycle"',
      'end procedure'
    ],
    code: `function bellmanFord(vertices, edges, source) {
  const dist = {};
  for (const v of vertices) dist[v] = Infinity;
  dist[source] = 0;

  for (let i = 0; i < vertices.length - 1; i++) {
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      throw new Error("Negative-weight cycle detected");
    }
  }
  return dist;
}`,
    keyPoints: [
      'Handles Negative Edges: Successfully navigates graphs where edge costs can be negative.',
      'Negative Cycle Detection: Detects unbounded decreasing cycles that make shortest paths ill-defined.',
      'Dynamic Programming Basis: Relaxes edges iteratively, guaranteeing optimal paths of up to k edges at step k.'
    ],
    applications: ['Routing Information Protocol (RIP)', 'Currency arbitrage detection in financial markets', 'Chemical reaction thermodynamics']
  },

  'floyd-warshall': {
    id: 'floyd-warshall',
    name: 'Floyd-Warshall Algorithm',
    category: 'graphs',
    categoryName: 'Graphs',
    shortDescription: 'All-pairs shortest path dynamic programming algorithm updating distances via intermediate nodes k.',
    description: 'The Floyd-Warshall algorithm is an algorithm for finding shortest paths in a directed weighted graph with positive or negative edge weights (but no negative cycles). A single execution of the algorithm will find the lengths of shortest paths between all pairs of vertices in O(V³) time.',
    timeComplexity: {
      best: 'O(V³)',
      average: 'O(V³)',
      worst: 'O(V³)'
    },
    spaceComplexity: 'O(V²)',
    pseudocode: [
      'procedure FloydWarshall(W : |V| x |V| matrix)',
      '  let dist be a |V| x |V| matrix initialized to W',
      '  for k := 0 to |V| - 1 do',
      '    for i := 0 to |V| - 1 do',
      '      for j := 0 to |V| - 1 do',
      '        if dist[i][k] + dist[k][j] < dist[i][j] then',
      '          dist[i][j] := dist[i][k] + dist[k][j]',
      '  return dist',
      'end procedure'
    ],
    code: `function floydWarshall(matrix) {
  const n = matrix.length;
  const dist = matrix.map(row => [...row]);

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
}`,
    keyPoints: [
      'All-Pairs Solution: Computes distance between every vertex pair (i, j) simultaneously.',
      'Elegant DP Formulation: `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`.',
      'Transitive Closure: Can be adapted with Boolean algebra to find graph reachability (Warshall algorithm).'
    ],
    applications: ['All-pairs routing tables', 'Network diameter computation', 'Finding regular expression equivalences']
  },

  'prim': {
    id: 'prim',
    name: "Prim's Algorithm",
    category: 'graphs',
    categoryName: 'Graphs',
    shortDescription: 'Greedy Minimum Spanning Tree (MST) algorithm that grows a connected tree from an arbitrary starting vertex.',
    description: "Prim's algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph. The algorithm operates by building this tree one vertex at a time, from an arbitrary starting vertex, at each step adding the cheapest possible connection from the growing tree to another vertex not yet in the tree.",
    timeComplexity: {
      best: 'O((V + E) log V)',
      average: 'O((V + E) log V)',
      worst: 'O(V²)'
    },
    spaceComplexity: 'O(V + E)',
    pseudocode: [
      'procedure Prim(G, start)',
      '  visited := {start}',
      '  mst := []',
      '  while |visited| < |V| do',
      '    find minimum weight edge (u, v) where u in visited and v not in visited',
      '    if no such edge exists then break',
      '    add v to visited',
      '    add (u, v) to mst',
      '  return mst',
      'end procedure'
    ],
    code: `function primMST(graph, numVertices) {
  const visited = new Set([0]);
  const mstEdges = [];

  while (visited.size < numVertices) {
    let minEdge = null;
    let minWeight = Infinity;

    for (const u of visited) {
      for (const edge of graph[u] || []) {
        if (!visited.has(edge.v) && edge.weight < minWeight) {
          minWeight = edge.weight;
          minEdge = { u, v: edge.v, weight: edge.weight };
        }
      }
    }
    if (!minEdge) break;
    visited.add(minEdge.v);
    mstEdges.push(minEdge);
  }
  return mstEdges;
}`,
    keyPoints: [
      'Tree Growing: Always maintains a single contiguous subtree that gradually spans all vertices.',
      'Greedy Cut Property: Guarantees that minimum edge across any graph cut belongs to MST.',
      'Optimal on Dense Graphs: Outperforms Kruskal when graph has high edge density (E ≈ V²).'
    ],
    applications: ['Laying fiber optic / telecom cabling networks', 'Electrical power grid layout', 'Road and pipeline networks']
  },

  'kruskal': {
    id: 'kruskal',
    name: "Kruskal's Algorithm",
    category: 'graphs',
    categoryName: 'Graphs',
    shortDescription: 'Builds an MST by sorting all edges by weight and adding them greedily using Union-Find to prevent cycles.',
    description: "Kruskal's algorithm finds a minimum spanning forest of an undirected edge-weighted graph. It treats every vertex as an independent disjoint set. It sorts all edges by weight in non-decreasing order and adds each edge to the forest if and only if it does not form a cycle (checked via Disjoint Set Union / Union-Find).",
    timeComplexity: {
      best: 'O(E log E)',
      average: 'O(E log E)',
      worst: 'O(E log E)'
    },
    spaceComplexity: 'O(V + E)',
    pseudocode: [
      'procedure Kruskal(G)',
      '  mst := []',
      '  for each vertex v in G: makeSet(v)',
      '  sort edges of G by weight in ascending order',
      '  for each edge (u, v, w) in sorted edges do',
      '    if find(u) != find(v) then',
      '      mst.append((u, v, w))',
      '      union(u, v)',
      '  return mst',
      'end procedure'
    ],
    code: `class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }
  find(i) {
    if (this.parent[i] === i) return i;
    return this.parent[i] = this.find(this.parent[i]);
  }
  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI !== rootJ) {
      this.parent[rootI] = rootJ;
      return true;
    }
    return false;
  }
}

function kruskal(edges, n) {
  edges.sort((a, b) => a.weight - b.weight);
  const uf = new UnionFind(n);
  const mst = [];
  for (const edge of edges) {
    if (uf.union(edge.u, edge.v)) {
      mst.push(edge);
    }
  }
  return mst;
}`,
    keyPoints: [
      'Edge Sorting: Global sort on all edges upfront in O(E log E).',
      'Disjoint Set Union (DSU): Near O(1) cycle detection with path compression and union by rank.',
      'Optimal on Sparse Graphs: Excels when graph has fewer edges (E << V²).'
    ],
    applications: ['Cluster analysis & hierarchical clustering', 'LAN network design', 'Approximation algorithms for Traveling Salesperson']
  }
};

export const ALGORITHM_LIST = Object.values(ALGORITHMS);
