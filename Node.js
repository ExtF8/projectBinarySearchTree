/**
 * Represents a node in a binary search tree.
 */
export default class Node {
    /**
     * Creates a new instance of the Node class.
     * @param {*} data - The data to be stored in the node.
     */
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
