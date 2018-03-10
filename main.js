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
  let heightOfLeftNode = height(node.left);
  let heightOfRightNode = height(node.right);
  return heightOfLeftNode > heightOfRightNode ?
    heightOfLeftNode + 1 :
    heightOfRightNode + 1;
}

// will return type of imbalance i.e. "LL", "LR", etc. or false if no imabalance is found
function findImbalance(parent) {
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

function rightRotate(parent) {
  let temp = parent.value;
  parent.value = parent.left.value;
  parent.right = Node(temp);
  parent.left.value = parent.left.left.value;
  parent.left.left = null;
}

function leftRotate(parent) {
  let temp = parent.value;
  parent.value = parent.right.value;
  parent.left = Node(temp);
  // handle 1st rotate in double rotate sequence to fix zig-zag
  if (!parent.right.right) {
    parent.right = null;
  } else {
    parent.right.value = parent.right.right ? parent.right.right.value : null;
    parent.right.right = null;
  }
}

// todo
function restoreAvlProperty(parent, typeOfImbalance) {
  switch (typeOfImbalance) {
    case "LL":
      rightRotate(parent);
      break;
    case "LR":
      leftRotate(parent.left);
      rightRotate(parent);
      break;
    case "RR":
      leftRotate(parent);
      break;
    case "RL":
      rightRotate(parent.right);
      leftRotate(parent);
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

function insert(value, root, parent = null) {
  if (value === 0.5) {
    console.log("While inserting 0.5:", render(root));
  }
  if (value >= root.value) {
    if (root.right) {
      insert(value, root.right, root);
    } else {
      root.right = Node(value);
      let typeOfImbalance = findImbalance(parent);
      if (typeOfImbalance) {
        restoreAvlProperty(parent, typeOfImbalance);
      }
    }
  } else {
    if (root.left) {
      insert(value, root.left, root);
    } else {
      root.left = Node(value);
      let typeOfImbalance = findImbalance(parent);
      if (typeOfImbalance) {
        restoreAvlProperty(parent, typeOfImbalance);
      }
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

let root = Node(null);
let nums = range(1, 8);

buildAvlTree(nums, root);
console.log("Tree:", render(root));

insert(5.5, root);
console.log("After insert 1:", render(root));

insert(5.8, root);
console.log("After insert 2:", render(root));

insert(0, root);
console.log("After insert 3, creating zig-zag...:", render(root));

insert(0.5, root);
console.log("After insert 4, zig-zag fixed", render(root));

console.log("Height:", height(root))

console.log("Sorted order:");
inOrderTraversal(root);
