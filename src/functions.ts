export function cumulativeSum(x: number, a: number = 0) {
  if (x <= 0) {
    return a;
  } else {
    return cumulativeSum(x - 1, a + x);
  }
}

export function toPyramidCoords(x: number, a: number = 0): [i: number, j: number] {
  if (x < a + 1) {
    return [a, x];
  } else {
    return toPyramidCoords(x - (a + 1), a + 1);
  }
}

export function fromPyramidCoords(i: number, j: number): number {
  return cumulativeSum(i) + j;
}

export function interpretValue(v: number): [x: number, color: string] {
  const colors = ['#E63946', '#2B9348', '#0077B6', '#6F4E97'];
  return [v % 13 + 1, colors[Math.floor(v / 13)]];
}

export function cardsAdjacent(val0: number, val1: number): boolean {
  const [v0, v1] = [interpretValue(val0)[0], interpretValue(val1)[0]];
  return Math.abs(v0 - v1) === 1 || Math.abs(v0 - v1) === 12;  // Adjacent or 1 and 13.
}

export function valueToCardText(val: number): string {
  const value = interpretValue(val)[0];
  switch(value) {
    case 13:
      return 'K';
    case 12:
      return 'Q';
    case 11:
      return 'J';
    default:
      return value.toString();
  }
}