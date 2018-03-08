"use strict";

const { range } = require("./utils");

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

function Node(value, left = null, right = null) {
  return {
    value,
    left,
    right
  };
}

let root = Node(null);
let nums = range(1, 100);

buildAvlTree(nums, root);
console.log(JSON.stringify(root, null, 2));
