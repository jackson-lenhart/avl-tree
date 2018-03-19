"use strict";

const {
  buildAvlTree,
  determineTypeOfImbalance,
  insertNode,
  Node,
  nodeCount,
  satisfiesAvlProperty
} = require("./main");
const { range } = require("./utils");
const render = require("./render");

// to introduce imbalances to tree
function insertAndDontRotate(value, root) {
  if (value >= root.value) {
    if (root.right) {
      insertAndDontRotate(value, root.right);
    } else {
      root.right = Node(value);
    }
  } else if (value < root.value) {
    if (root.left) {
      insertAndDontRotate(value, root.left);
    } else {
      root.left = Node(value);
    }
  } else if (isNaN(value)) {
    throw new Error("Invalid type. Insert numbers only");
  }
}

let nums = range(0, 51, 5);
let mockRoot = Node(null);

buildAvlTree(nums, mockRoot);
console.log("Tree 1:", render(mockRoot));

// this should log true
console.log("Tree 1 satisfies AVL property?:", satisfiesAvlProperty(mockRoot));

// would introduce imbalance if not for rotations
insertNode(-5, mockRoot);
console.log("Tree 1 after insert of -5 with rotations:", render(mockRoot));

// this should still log true
console.log("Tree 1 satisfies AVL property after insert of -5 with rotations?:", satisfiesAvlProperty(mockRoot));

// we build a fresh tree
buildAvlTree(nums, mockRoot);
console.log("Tree 2:", render(mockRoot));

// this should log true
console.log("Tree 2 satisfies AVL property?:", satisfiesAvlProperty(mockRoot));

// here we introduce an imbalance
insertAndDontRotate(-5, mockRoot);
console.log("Tree 2 after insert of -5 without rotations:", render(mockRoot));

// this should log false
console.log("Tree 2 satisfies AVL property after insert of -5 without rotations?:", satisfiesAvlProperty(mockRoot));
