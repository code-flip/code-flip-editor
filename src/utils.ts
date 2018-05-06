class Rectangle {
  height: number;
  width: number;
  y: number;
  x: number;
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
class Vector {
  y: number;
  x: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
export {Rectangle, Vector};
