"use strict";

function range(start, end, increment = 1) {
  let r = [];
  for (let i = start; i < end; i += increment) {
    r.push(i);
  }
  return r;
}

module.exports = {
  range
};
