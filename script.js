import Tree from './Tree.js';

const randomArray = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};
const tree = new Tree(randomArray(20));

// Define the prettyPrint function
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

// Log the tree structure before insertion
console.log('Tree before insertion:');
prettyPrint(tree.root);

console.log(' ');

console.log('Is the tree balanced? Before insertion', tree.isBalanced());

console.log(' ');

// Insert values into the tree
tree.insert(10);
tree.insert(6);
tree.insert(6346);
tree.insert(6347);

// Log the tree structure after insertion
console.log('Tree after insertion:');
prettyPrint(tree.root);

console.log(' ');

// Check if the tree is balanced
console.log('Is the tree balanced? After insertion', tree.isBalanced());

console.log(' ');

// Rebalance the tree
console.log('Rebalancing tree ...');
tree.rebalance();

console.log(' ');

// Check if the tree is balanced after rebalance
console.log('Is the tree balanced after rebalance?', tree.isBalanced());

console.log(' ');

// Log the tree structure after rebalancing
console.log('Tree after rebalance:');
prettyPrint(tree.root);

console.log(' ');

console.log('Depth of tree.root.right: ', tree.depth(tree.root.right));

console.log(' ');

console.log('Height of tree.root.right.right: ', tree.height(tree.root.right.right));

console.log(' ');

console.log('Find node with value 10: ', tree.find(10));

console.log(' ');

console.log('Delete node with value 10: ', tree.deleteNode(10));

console.log(' ');

// Log the tree structure after deleting
console.log('Tree after delete:');
prettyPrint(tree.root);

// Print out all elements in level, pre, post, and in order
console.log(' ');

console.log('Elements in level order: ', tree.levelOrder());

console.log(' ');

console.log('Elements in pre-order: ', tree.preOrder());

console.log(' ');

console.log('Elements in pots-order: ', tree.postOrder());

console.log(' ');

console.log('Elements in order: ', tree.inOrder());
