import { Renderable } from "./renderable";
import { Rectangle, Vector } from "./utils";
import { RectBlockShape } from "./block";

class InputSVG implements Renderable {
  group: SVGGElement;
  bBox: Rectangle;
  shape: SVGPathElement;
  position: Vector = new Vector(0, 0);
  color: string = "hsl(0, 100%, 50%)";
  width: number = 48;
  toCode(): string {
    return "undefined";
  }
  layoutChildren(): void {

  }

  render(parent: SVGGElement | SVGElement): void {
    this.layoutChildren();
    if (this.group.parentNode !== parent) {
      parent.appendChild(this.group);
    }

    this.bBox = new Rectangle(this.position.x, this.position.y, this.width, 24);
    var bshape = new RectBlockShape(this.bBox.width, this.bBox.height, 12, false, false);
    this.shape.setAttribute("d", bshape.path());
    this.group.setAttribute("transform", "translate(" + this.position.x + " " + this.position.y + ")");
    this.shape.setAttribute("fill", this.color);
  }
  constructor() {
    this.width = Math.random() * 48 + 24;
    var hue = Math.floor(Math.random() * 360);
    this.group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.group.classList.add("block");
    this.shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
    //this.shape.setAttribute("fill", "hsl("+hue+", 70%, 50%)");
    this.shape.setAttribute("filter", "url(#Bevel2)");
    this.group.appendChild(this.shape);
  }
}
export { InputSVG };
