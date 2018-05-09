import { Renderable } from "./renderable";
import { Rectangle, Vector } from "./utils";
import { RectBlockShape, BlockSVG } from "./block";
import { InputSVG } from "./input";

class InputLabel extends InputSVG {
  group: SVGGElement;
  bBox: Rectangle;
  shape: SVGPathElement;
  label: SVGTextElement;
  text: string;
  position: Vector = new Vector(0, 0);
  color: string = "hsl(0, 100%, 50%)";
  width: number = 48;
  type: string = "InputLabel";
  toCode(): string {
    return "undefined";
  }
  height(): number {
    return this.bBox.height;
  }

  render(parent: SVGGElement | SVGElement): void {
    if (this.group.parentNode !== parent) {
      parent.appendChild(this.group);
    }
    if (this.label.parentNode !== this.group) {
      this.group.appendChild(this.label);
    }

    this.bBox = new Rectangle(this.position.x, this.position.y, this.label.getBBox().width, this.label.getBBox().height);



    var bshape = new RectBlockShape(this.bBox.width, this.bBox.height, 12, false, false);
    this.shape.setAttribute("d", bshape.path());
    this.group.setAttribute("transform", "translate(" + this.position.x + " " + this.position.y + ")");
    this.group.setAttribute("id", "stack-man");
    this.label.innerHTML = this.text;
    this.shape.setAttribute("fill", "transparent");//this.color);
  }
  constructor() {
    super();
    this.label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.label.setAttribute("fill", "white");//this.color);
    this.label.setAttribute("y", "4");//this.color);
    this.label.setAttribute("style", "alignment-baseline: hanging;font-family:monospace;font-size:16px;");


  }
}
export { InputLabel };
