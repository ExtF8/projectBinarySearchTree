import Node from './Node.js';

export default class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        // Sort and remove duplicates
        const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);

        return this.buildTreeHelper(
            uniqueSortedArray,
            0,
            uniqueSortedArray.length - 1
        );
    }

    buildTreeHelper(array, start, end) {
        if (start > end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);
        const node = new Node(array[mid]);
        node.left = this.buildTreeHelper(array, start, mid - 1);
        node.right = this.buildTreeHelper(array, mid + 1, end);

        return node;
    }
}
