import { Renderable } from "./renderable";
import { Rectangle, Vector } from "./utils";
import { SquareBlockShape, BlockSVG } from "./blockSVG";
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



    var bshape = new SquareBlockShape({ heights: [this.bBox.height-20], tHeight: this.bBox.height, widths: [this.bBox.width], mWidth: this.bBox.width, data: [{prev:false,next:false}] },0,false,false);
    this.shape.setAttribute("d", bshape.path());
    this.group.setAttribute("transform", "translate(" + this.position.x + " " + this.position.y + ")");
    this.group.setAttribute("id", "stack-man");
    this.label.innerHTML = this.text;
    this.shape.setAttribute("fill", "transparent");
  }
  constructor(text?: string) {
    super();
    this.text = text || "";
    this.label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.label.setAttribute("fill", "white");
    this.label.setAttribute("y", "2");
    this.label.setAttribute("style", "alignment-baseline: hanging;font-family:monospace;font-size:16px;");


  }
}
export { InputLabel };
