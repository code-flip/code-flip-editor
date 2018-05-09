import { Renderable } from "./renderable";
import { Rectangle, Vector } from "./utils";
import { RectBlockShape, BlockSVG } from "./block";
import { InputSVG } from "./input";

class InputStack extends InputSVG {
  group: SVGGElement;
  bBox: Rectangle;
  shape: SVGPathElement;
  stack: BlockSVG;
  position: Vector = new Vector(0, 0);
  color: string = "hsl(0, 100%, 50%)";
  width: number = 48;
  type: string = "InputStack";
  toCode(): string {
    return "undefined";
  }
  height(): number {
    return this.bBox.height;
  }
  setBlock(stack: BlockSVG): void {
    if (this.stack) {
      var oldStack = this.stack;
      if (this.stack.group.parentNode == this.group) {
        this.group.removeChild(this.stack.group);
      }
      this.stack = stack;
      if (oldStack.group.parentNode == this.group) {
        this.group.removeChild(oldStack.group);
      }
    }
    this.stack = stack;
  }
  render(parent: SVGGElement | SVGElement): void {
    if (this.group.parentNode !== parent) {
      parent.appendChild(this.group);
    }
    if (this.stack) {
      this.stack.render(this.group);
      this.bBox = new Rectangle(this.position.x, this.position.y, this.stack.group.getBBox().width,
        this.stack.group.getBBox().height - (this.stack.lastBlock().canHaveNext ? 6 : 0));
    } else {
      this.bBox = new Rectangle(this.position.x, this.position.y, 24, 24);

    }


    var bshape = new RectBlockShape(this.bBox.width, this.bBox.height, 12, false, false);
    this.shape.setAttribute("d", bshape.path());
    this.group.setAttribute("transform", "translate(" + this.position.x + " " + this.position.y + ")");
    this.group.setAttribute("id", "stack-man");
    this.shape.setAttribute("fill", "transparent");//this.color);
    if (this.stack) {
      this.stack.render(this.group);
    }
  }
  constructor(stack?:BlockSVG) {
    super();
    this.stack = stack;
    //this.stack.canHaveNext = true;
    //this.stack.canHavePrevious = true;

  }
}
export { InputStack };
