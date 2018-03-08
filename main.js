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

// todo
function isUnbalanced(parent) {

}

// todo
function coerceAvlProperty(parent) {
  if (isUnbalanced(parent)) {

  }
}

function insert(value, root, parent = null) {
  if (value >= root.value) {
    if (root.right) {
      insert(value, root.right, root);
    } else {
      root.right = Node(value);
      coerceAvlProperty(parent);
    }
  } else {
    if (root.left) {
      insert(value, root.left, root);
    } else {
      root.left = Node(value);
      coerceAvlProperty(parent);
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
console.log("After insert:", render(root));

console.log("Height:", height(root))
