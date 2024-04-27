import Node from './Node.js';

/**
 * Represents a binary search tree.
 */
export default class Tree {
    /**
     * Constructs a new Tree object.
     * @param { number[] } array - The array of numbers to build the tree from.
     */
    constructor(array) {
        this.root = this.buildTree(array);
    }

    /**
     * Builds a binary search tree from the given array.
     * @param { number[] } array - The array of numbers to build the tree from.
     * @returns { Node } The root node of the built tree.
     */
    buildTree(array) {
        // Sort and remove duplicates
        const sortedArray = [...new Set(array)].sort((a, b) => a - b);

        return this.#buildTreeHelper(sortedArray, 0, sortedArray.length - 1);
    }

    /**
     * Recursive helper function to build the binary search tree.
     * @param { number[] } array - The array of numbers to build the tree from.
     * @param { number } start - The starting index of the current subarray.
     * @param { number } end - The ending index of the current subarray.
     * @returns { Node } The root node of the built subtree.
     */
    #buildTreeHelper(array, start, end) {
        if (start > end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);
        const node = new Node(array[mid]);
        node.left = this.#buildTreeHelper(array, start, mid - 1);
        node.right = this.#buildTreeHelper(array, mid + 1, end);

        return node;
    }

    /**
     * Inserts a new value into the binary search tree.
     *
     * @param { number } value - The value to be inserted.
     */
    insert(value) {
        this.root = this.#insertRecursively(this.root, value);
    }

    /**
     * Inserts a value into the binary search tree recursively.
     *
     * @param { Node } node - The current node being traversed.
     * @param { number } value - The value to be inserted.
     * @returns { Node } - The updated node after insertion.
     */
    #insertRecursively(node, value) {
        // If the tree is empty, return a new node
        if (node === null) {
            return new Node(value);
        }

        // Otherwise, recursively traverse the tree
        if (value < node.data) {
            node.left = this.#insertRecursively(node.left, value);
        } else if (value > node.data) {
            node.right = this.#insertRecursively(node.right, value);
        }

        return node;
    }

    /**
     * Deletes a node with the specified value from the binary search tree.
     *
     * @param { number } value - The value of the node to be deleted.
     * @returns { string } - A message indicating that the node with the specified value was found and deleted.
     */
    deleteNode(value) {
        this.root = this.#findAndDeleteNode(this.root, value);
        const message = `Node with value ${value} found and deleted `;
        return message;
    }

    /**
     * Finds and deletes a node with the specified value in the binary search tree.
     * @param { Node } node - The root node of the binary search tree.
     * @param { number } value - The value to be deleted from the binary search tree.
     * @returns { Node } - The root node of the modified binary search tree.
     */
    #findAndDeleteNode(node, value) {
        // Base case
        if (node === null) {
            return null;
        }

        // If the node to delete is smaller than the node value
        if (value < node.data) {
            node.left = this.#findAndDeleteNode(node.left, value);
        }
        // If the node to delete is bigger than the node value
        else if (value > node.data) {
            node.right = this.#findAndDeleteNode(node.right, value);
        }
        // If value is same as node
        else {
            // Node with only one child or no child
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            // Find the minimum value in the right subtree (successor)
            let successor = this.#findMin(node.right);
            // Replace the node's data with successor's data
            node.data = successor.data;
            // Delete the successor node from the right subtree
            node.right = this.#findAndDeleteNode(node.right, successor.data);
        }

        return node;
    }

    /**
     * Finds a node with the specified value in the binary search tree.
     *
     * @param { any } value - The value to search for.
     * @returns { Node|null } - The found node, or null if the value is not found.
     */
    find(value) {
        return this.#findNode(this.root, value);
    }

    /**
     * Helper function to find a node with the given value in the binary search tree.
     *
     * @param {Node} node - The root node of the binary search tree.
     * @param {number} value - The value to search for.
     * @returns {Node|null} - The node with the given value, or null if not found.
     */
    #findNode(node, value) {
        if (node === null) {
            return null;
        }

        if (value === node.data) {
            return node;
        } else if (value < node.data) {
            return this.#findNode(node.left, value);
        } else {
            return this.#findNode(node.right, value);
        }
    }

    /**
     * Performs a level order traversal on the binary search tree.
     *
     * @param { function } callback - Optional callback function to be executed on each node's data.
     * @returns { Array } - An array containing the data of the nodes in level order.
     */
    levelOrder(callback) {
        if (!this.root) {
            return [];
        }

        // Queue with the root node and an empty array to store results traversal
        const queue = [this.root];
        const result = [];

        // Loop to dequeue a node form the front of the queue, push its data to result array
        // Enqueue its left and right children to the queue
        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node.data);

            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }

            if (callback) {
                callback(node.data);
            }
        }

        return result;
    }

    /**
     * Performs an in-order traversal of the binary search tree
     * and applies the given callback function to each node.
     *
     * @param { function } callback - The callback function to be applied to each node.
     * @returns { void }
     */
    inOrder(callback) {
        return this.#inOrderTraversal(this.root, callback);
    }

    /**
     * Performs an in-order traversal of the binary search tree rooted at the given node.
     *
     * @param { Node } node - The root node of the binary search tree.
     * @param { Function } [callback] - Optional callback function to be called for each visited node.
     * @returns { Array } - An array containing the values of the visited nodes in the order they were visited.
     */
    #inOrderTraversal(node, callback) {
        if (node === null) {
            return [];
        }

        const result = [];

        // Traverse the left subtree
        if (node.left) {
            result.push(...this.#inOrderTraversal(node.left, callback));
        }

        // Visit current node
        if (callback) {
            callback(node);
        } else {
            result.push(node.data);
        }

        // Traverse the right subtree
        if (node.right) {
            result.push(...this.#inOrderTraversal(node.right, callback));
        }

        return result;
    }

    /**
     * Performs a pre-order traversal of the binary search tree.
     *
     * @param { Function } callback - The callback function to be executed for each visited node.
     * @returns {void}
     */
    preOrder(callback) {
        return this.#preOrderTraversal(this.root, callback);
    }

    /**
     * Performs a pre-order traversal on the binary search tree starting from the given node.
     *
     * @param { Node } node - The starting node for the traversal.
     * @param { Function } [callback] - Optional callback function to be executed for each visited node.
     * @returns { Array } - An array containing the values of the visited nodes in pre-order.
     */
    #preOrderTraversal(node, callback) {
        if (node === null) {
            return [];
        }

        const result = [];

        // Visit current node
        if (callback) {
            callback(node);
        } else {
            result.push(node.data);
        }

        // Traverse the left subtree
        if (node.left) {
            result.push(...this.#preOrderTraversal(node.left, callback));
        }

        // Traverse the right subtree
        if (node.right) {
            result.push(...this.#preOrderTraversal(node.right, callback));
        }

        return result;
    }

    /**
     * Performs a post-order traversal of the binary search tree
     * and applies the given callback function to each node.
     *
     * @param { Function } callback - The callback function to be applied to each node.
     * @returns { void }
     */
    postOrder(callback) {
        return this.#postOrderTraversal(this.root, callback);
    }

    /**
     * Performs a post-order traversal of the binary search tree.
     * @param { Node } node - The starting node for the traversal.
     * @param { Function } [callback] - Optional callback function to be executed on each visited node.
     * @returns { Array } - An array containing the nodes visited during the traversal.
     */
    #postOrderTraversal(node, callback) {
        if (node === null) {
            return [];
        }

        const result = [];

        // Traverse the left subtree
        if (node.left) {
            result.push(...this.#postOrderTraversal(node.left, callback));
        }

        // Traverse the right subtree
        if (node.right) {
            result.push(...this.#postOrderTraversal(node.right, callback));
        }

        // Visit current node
        if (callback) {
            callback(node);
        } else {
            result.push(node.data);
        }

        return result;
    }

    /**
     * Calculates the height of a given node in the binary search tree.
     * The height of a node is defined as the maximum number of edges between the node and a leaf node.
     *
     * @param { Node } node - The node for which to calculate the height.
     * @returns { number } The height of the node.
     */
    height(node) {
        if (node === null) {
            // Height of null node is -1
            return -1;
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        // Height of the current node is the maximum height of its children, plus 1
        const result = Math.max(leftHeight, rightHeight) + 1;

        return result;
    }

    /**
     * Calculates the depth of a given node in the binary search tree.
     * @param { Node } node - The node for which to calculate the depth.
     * @returns { number } - The depth of the node.
     */
    depth(node) {
        return this.#calculateDepth(this.root, node, 0);
    }

    /**
     * Calculates the depth of a target node in a binary search tree.
     *
     * @param { Node } currentNode - The current node being evaluated.
     * @param { Node } targetNode - The target node whose depth needs to be calculated.
     * @param { number } currentDepth - The current depth of the tree.
     * @returns { number } - The depth of the target node. Returns -1 if the target node is not found.
     */
    #calculateDepth(currentNode, targetNode, currentDepth) {
        if (currentNode === null) {
            // Target node not found, return -1
            return -1;
        }

        if (currentNode === targetNode) {
            // Found the target node, return the current depth
            return currentDepth;
        }

        // Recursively search in the left and right subtrees
        const leftDepth = this.#calculateDepth(
            currentNode.left,
            targetNode,
            currentDepth + 1
        );
        const rightDepth = this.#calculateDepth(
            currentNode.right,
            targetNode,
            currentDepth + 1
        );

        // The maximum depth found in the left and right subtrees
        const result = Math.max(leftDepth, rightDepth);

        return result;
    }

    /**
     * Checks if the binary search tree is balanced.
     *
     * @returns { boolean } True if the tree is balanced, false otherwise.
     */
    isBalanced() {
        return this.#checkBalanced(this.root) !== -1;
    }

    /**
     * Checks if the binary search tree rooted at the given node is balanced.
     * A binary search tree is considered balanced if the heights of its left and right subtrees differ by at most 1.
     *
     * @param { Node } node - The root node of the binary search tree to check.
     * @returns { number } The height of the binary search tree if it is balanced, or -1 if it is unbalanced.
     */
    #checkBalanced(node) {
        if (node === null) {
            // Height of null node is 0
            return 0;
        }

        const leftHeight = this.#checkBalanced(node.left);
        if (leftHeight === -1) {
            // Left subtree is unbalanced
            return -1;
        }

        const rightHeight = this.#checkBalanced(node.right);
        if (rightHeight === -1) {
            // Right subtree is unbalanced
            return -1;
        }

        // Check if the difference in heights of left and right subtree is at most 1
        if (Math.abs(leftHeight - rightHeight) > 1) {
            // Tree is unbalanced
            return -1;
        }

        // The height of the current node
        const result = Math.max(leftHeight, rightHeight) + 1;

        return result;
    }

    /**
     * Rebalance the binary search tree.
     * Extracts values from the tree using an in-order traversal,
     * clears the existing tree structure, and rebuilds the tree
     * with a balanced structure.
     */
    rebalance() {
        // Extract values from the tree using an in-order
        const inOrderList = this.inOrder();

        // Clear the existing tree structure
        this.root = null;

        // Rebuild the tree with balanced structure
        this.root = this.buildTree(inOrderList);
    }

    /**
     * Finds the minimum value in a binary search tree.
     *
     * @param { Node } node - The root node of the binary search tree.
     * @returns { Node } - The node with the minimum value.
     */
    #findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
}
