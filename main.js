"use strict";

const { range } = require("./utils");

function Node(value, left = null, right = null) {
  return {
    value,
    left,
    right
  };
}

function insert(value, root, parent = null) {
  if (value >= root.value) {
    root.right ?
      insert(value, root.right, root) :
      root.right = Node(value);
  } else {
    root.left ?
      insert(value, root.left, root) :
      root.left = Node(value);
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
console.log("Before insert:", JSON.stringify(root, null, 2));

insert(5.5, root);
console.log("After insert:", JSON.stringify(root, null, 2));
