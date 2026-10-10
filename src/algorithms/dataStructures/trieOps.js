/**
 * Trie (Prefix Tree) interactive data structure operations.
 */

export class TrieNode {
  constructor(char = '', id = 'root') {
    this.id = id;
    this.char = char;
    this.children = {}; // char -> TrieNode
    this.isEndOfWord = false;
  }
}

/**
 * Creates default Trie populated with words: ['cat', 'car', 'cart', 'dog']
 */
export function createDefaultTrie() {
  const root = new TrieNode('', 'root');
  const words = ['cat', 'car', 'cart', 'dog'];

  words.forEach(word => {
    let curr = root;
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      if (!curr.children[ch]) {
        curr.children[ch] = new TrieNode(ch, `${curr.id}-${ch}`);
      }
      curr = curr.children[ch];
    }
    curr.isEndOfWord = true;
  });

  return root;
}

export function cloneTrie(node) {
  if (!node) return null;
  const copy = new TrieNode(node.char, node.id);
  copy.isEndOfWord = node.isEndOfWord;
  for (const [key, child] of Object.entries(node.children)) {
    copy.children[key] = cloneTrie(child);
  }
  return copy;
}

/**
 * Generates steps for inserting a word into the Trie.
 */
export function generateTrieInsertSteps(currentTrie, word) {
  const steps = [];
  const cleanWord = String(word).trim().toLowerCase();
  if (!cleanWord) return { steps, updatedTrie: currentTrie };

  const rootClone = cloneTrie(currentTrie);

  steps.push({
    trie: cloneTrie(rootClone),
    activeNodeId: 'root',
    currentChar: null,
    charIndex: -1,
    description: `Inserting word "${cleanWord}" into Trie. Starting at root node.`,
    type: 'init'
  });

  let curr = rootClone;

  for (let i = 0; i < cleanWord.length; i++) {
    const ch = cleanWord[i];

    if (!curr.children[ch]) {
      const newNode = new TrieNode(ch, `${curr.id}-${ch}`);
      curr.children[ch] = newNode;
      curr = newNode;

      steps.push({
        trie: cloneTrie(rootClone),
        activeNodeId: curr.id,
        currentChar: ch,
        charIndex: i,
        description: `Character '${ch}' not found under current node. Created new Trie node for '${ch}'.`,
        type: 'create-node'
      });
    } else {
      curr = curr.children[ch];
      steps.push({
        trie: cloneTrie(rootClone),
        activeNodeId: curr.id,
        currentChar: ch,
        charIndex: i,
        description: `Character '${ch}' already exists as a child. Reusing existing node (prefix sharing).`,
        type: 'reuse-node'
      });
    }
  }

  curr.isEndOfWord = true;

  steps.push({
    trie: cloneTrie(rootClone),
    activeNodeId: curr.id,
    currentChar: null,
    charIndex: cleanWord.length - 1,
    description: `Marked end of word on node '${curr.char}' (isEndOfWord = true). Word "${cleanWord}" successfully inserted!`,
    type: 'complete'
  });

  return { steps, updatedTrie: rootClone };
}

/**
 * Generates steps for searching a word in the Trie.
 */
export function generateTrieSearchSteps(currentTrie, word) {
  const steps = [];
  const cleanWord = String(word).trim().toLowerCase();
  if (!cleanWord) return steps;

  steps.push({
    trie: cloneTrie(currentTrie),
    activeNodeId: 'root',
    currentChar: null,
    charIndex: -1,
    description: `Searching for exact word "${cleanWord}" in Trie.`,
    type: 'init'
  });

  let curr = currentTrie;
  let found = true;

  for (let i = 0; i < cleanWord.length; i++) {
    const ch = cleanWord[i];

    steps.push({
      trie: cloneTrie(currentTrie),
      activeNodeId: curr.id,
      currentChar: ch,
      charIndex: i,
      description: `Checking if character '${ch}' exists as child of current node ('${curr.char || 'root'}').`,
      type: 'check-char'
    });

    if (!curr.children[ch]) {
      found = false;
      steps.push({
        trie: cloneTrie(currentTrie),
        activeNodeId: curr.id,
        currentChar: ch,
        charIndex: i,
        found: false,
        description: `Character '${ch}' does NOT exist. Word "${cleanWord}" is not in the Trie.`,
        type: 'not-found'
      });
      break;
    }

    curr = curr.children[ch];
    steps.push({
      trie: cloneTrie(currentTrie),
      activeNodeId: curr.id,
      currentChar: ch,
      charIndex: i,
      description: `Found '${ch}'. Advanced deeper along the branch.`,
      type: 'step'
    });
  }

  if (found) {
    if (curr.isEndOfWord) {
      steps.push({
        trie: cloneTrie(currentTrie),
        activeNodeId: curr.id,
        currentChar: null,
        charIndex: cleanWord.length - 1,
        found: true,
        description: `Reached end of word and isEndOfWord is TRUE! Word "${cleanWord}" found in Trie!`,
        type: 'found'
      });
    } else {
      steps.push({
        trie: cloneTrie(currentTrie),
        activeNodeId: curr.id,
        currentChar: null,
        charIndex: cleanWord.length - 1,
        found: false,
        description: `Prefix "${cleanWord}" exists, but isEndOfWord is FALSE. The complete word "${cleanWord}" is not registered.`,
        type: 'prefix-only'
      });
    }
  }

  return steps;
}
