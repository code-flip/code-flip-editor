import { Renderable } from "./renderable";
import { Rectangle, Vector } from "./utils";
interface BlockShape{
  path():string;
}
class RectBlockShape implements BlockShape{
  width:number;
  height:number;
  radius:number;
  path():string{
    var self=this;
    var m = "M " + self.radius + ",0 l " + (self.width - self.radius * 2) + ",0";
    m = m + "a" + self.radius + "," + self.radius + ",0,0,1," + self.radius + "," + self.radius;
    m = m + "l " + 0 + "," + (self.height - self.radius * 2);
    m = m + "a" + self.radius + "," + self.radius + ",0,0,1," + (-self.radius) + "," + self.radius;
    m = m + "l " + (-self.width + self.radius * 2) + "," + 0;
    m = m + "a" + self.radius + "," + self.radius + ",0,0,1," + (-self.radius) + "," + (-self.radius);
    m = m + "l " + 0 + "," + (-self.height + self.radius * 2);
    m = m + "a" + self.radius + "," + self.radius + ",0,0,1," + (self.radius) + "," + (-self.radius);
    return m;
  };
  constructor(width:number,height:number,radius:number=2){
    this.width=width;
    this.height=height;
    this.radius=radius;
  };
}
class BlockSVG implements Renderable {
  group: SVGGElement;
  bBox: Rectangle;
  shapeDark: SVGPathElement;
  shape: SVGPathElement;
  shapeLight: SVGPathElement;
  previous: BlockSVG|Boolean;
  next: BlockSVG|Boolean;
  position: Vector=new Vector(0,0);
  toCode(): string {
    return "undefined";
  }
  layoutChildren(): void {

  }
  layoutNext(): void{

  }
  render(parent: SVGGElement | SVGElement): void {
    this.layoutChildren();
    if(this.group.parentNode!==parent){
      parent.appendChild(this.group);
    }

    this.bBox = new Rectangle(this.position.x, this.position.y, 128, 32);
    var bshape=new RectBlockShape(this.bBox.width,this.bBox.height,4);
    this.shape.setAttribute("d",bshape.path());
    this.group.setAttribute("transform", "translate(" + this.position.x + " " + this.position.y + ")");
  }
  constructor() {
    var hue=Math.floor(Math.random()*360);
    this.group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.group.classList.add("block");
    this.shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.shape.setAttribute("fill", "hsl("+hue+", 70%, 50%)");
    this.shape.setAttribute("filter","url(#Bevel)");
    this.group.appendChild(this.shape);
  }
}
export { BlockSVG };
