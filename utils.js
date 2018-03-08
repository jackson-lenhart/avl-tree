"use strict";

function range(start, end) {
  let r = [];
  for (let i = start; i < end; i++) {
    r.push(i);
  }
  return r;
}

module.exports = {
  range
};
