"use strict";

const { range } = require("./utils");
const render = require("./render");

function Node(value, left = null, right = null) {
  return {
    value,
    left,
    right
  };
}

function height(node) {
  if (!node) {
    return 0;
  }
  let heightOfLeftChild = height(node.left);
  let heightOfRightChild = height(node.right);
  return heightOfLeftChild > heightOfRightChild ?
    heightOfLeftChild + 1 :
    heightOfRightChild + 1;
}

function satisfiesAvlProperty(root) {
  if (!root) {
    return true;
  }
  let heightOfLeftChild = height(root.left);
  let heightOfRightChild = height(root.right);
  if (Math.abs(heightOfLeftChild - heightOfRightChild) > 1) {
    return false;
  }
  return satisfiesAvlProperty(root.left) && satisfiesAvlProperty(root.right);
}

function nodeCount(root) {
  if (!root) {
    return 0;
  }
  return 1 + nodeCount(root.left) + nodeCount(root.right);
}

// will return type of imbalance i.e. "LL", "LR", etc. or false if no imbalance is found
function determineTypeOfImbalance(parent) {
  if (parent.left) {
    if (!parent.right) {
      if (parent.left.left) {
        return "LL";
      } else if (parent.left.right) {
        return "LR";
      }
    }
  } else if (parent.right) {
    if (!parent.left) {
      if (parent.right.right) {
        return "RR";
      } else if (parent.right.left) {
        return "RL";
      }
    }
  }
  return false;
}

function rotate(parent, direction) {
  let otherDirection = direction === "left" ? "right" : "left";
  let temp = parent.value;
  parent.value = parent[otherDirection].value;
  parent[direction] = Node(temp);
  // handle 1st rotate in double rotate sequence to fix zig-zag
  if (!parent[otherDirection][otherDirection]) {
    parent[otherDirection] = null;
  } else {
    parent[otherDirection].value = parent[otherDirection][otherDirection].value;
    parent[otherDirection][otherDirection] = null;
  }
}

function restoreAvlProperty(parent, typeOfImbalance) {
  switch (typeOfImbalance) {
    case "LL":
      rotate(parent, "right");
      break;
    case "LR":
      rotate(parent.left, "left");
      rotate(parent, "right");
      break;
    case "RR":
      rotate(parent, "left")
      break;
    case "RL":
      rotate(parent.right, "right");
      rotate(parent, "left");
      break;
    default:
      console.error("Invalid typeOfImbalance passed to restoreAvlProperty");
  }
}

function inOrderTraversal(root) {
  if (!root) {
    return;
  }
  inOrderTraversal(root.left);
  console.log(root.value);
  inOrderTraversal(root.right);
}

function insertNode(value, root, parent = null) {
  if (value >= root.value) {
    if (root.right) {
      insertNode(value, root.right, root);
    } else {
      root.right = Node(value);
      let typeOfImbalance = determineTypeOfImbalance(parent);
      if (typeOfImbalance) {
        restoreAvlProperty(parent, typeOfImbalance);
      }
    }
  } else if (value < root.value) {
    if (root.left) {
      insertNode(value, root.left, root);
    } else {
      root.left = Node(value);
      let typeOfImbalance = determineTypeOfImbalance(parent);
      if (typeOfImbalance) {
        restoreAvlProperty(parent, typeOfImbalance);
      }
    }
  } else if (isNaN(value)) {
    throw new Error("Invalid type. insertNode numbers only");
  }
}

function deleteNode(value, root, parent = null, direction = null) {
  if (!root) {
    return "Value not found, could not deleteNode";
  }
  if (value >= root.value) {
    deleteNode(value, root.right, root, "right");
  } else if (value < root.value) {
    deleteNode(value, root.left, root, "left");
  } else if (value === root.value) {
    //has no children
    if (!root.left && !root.right) {
      parent[direction] = null;

    //has only right child
    } else if (!root.left) {

    //has only left child
    } else if (!root.right) {

    //has 2 children
    } else {

    }
  } else {
    if (isNaN(value)) {
      throw new Error("deleteNode expects only numbers to be passed as values");
    }
  }
}

function buildAvlTree(sortedArr, root) {
  if (sortedArr.length === 0) {
    return;
  }
  let i = Math.floor(sortedArr.length / 2);
  root.value = sortedArr[i];
  let leftSide = sortedArr.slice(0, i);
  let rightSide = sortedArr.slice(i + 1);
  if (leftSide.length > 0) {
    root.left = Node(null);
    buildAvlTree(leftSide, root.left);
  }
  if (rightSide.length > 0) {
    root.right = Node(null);
    buildAvlTree(rightSide, root.right);
  }
}

module.exports = {
  buildAvlTree,
  determineTypeOfImbalance,
  insertNode,
  Node,
  nodeCount,
  satisfiesAvlProperty
};
