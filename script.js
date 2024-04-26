import Tree from './Tree.js';

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);

// Define the prettyPrint function
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// Log the tree structure before insertion
console.log("Tree before insertion:");
prettyPrint(tree.root);

// Insert values into the tree
tree.insert(10);
tree.insert(6);
tree.insert(6346);
tree.insert(6344);

// Log the tree structure after insertion
console.log("Tree after insertion:");
prettyPrint(tree.root);

// Check if the tree is balanced
console.log('Is the tree balanced?', tree.isBalanced());

// Rebalance the tree
tree.rebalance();

// Log the tree structure after rebalancing
console.log('Tree after rebalance:');
prettyPrint(tree.root);

// Check if the tree is balanced after rebalance
console.log('Is the tree balanced after rebalance?', tree.isBalanced());
