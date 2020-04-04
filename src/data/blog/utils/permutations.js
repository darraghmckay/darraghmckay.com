export const perm = a =>
  a.length
    ? a.reduce(
        (r, v, i) => [
          ...r,
          ...perm([...a.slice(0, i), ...a.slice(i + 1)]).map(x => [v, ...x]),
        ],
        [],
      )
    : [[]];

export const isFlip = (numArr1, numArr2) =>
  numArr1
    .map(
      (el, index) =>
        el === numArr2[index + 1] &&
        numArr1[index + 1] === numArr2[index] &&
        numArr1
          .slice(index + 2)
          .every((endEl, endInd) => endEl === numArr2[index + 2 + endInd]) &&
        numArr1
          .slice(0, Math.max(index - 1, 0))
          .every((startEl, startInd) => startEl === numArr2[startInd]),
    )
    .filter(Boolean).length === 1;