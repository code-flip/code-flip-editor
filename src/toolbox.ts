import { Renderable } from "./renderable";
import { CodeFlip } from "./codeFlip";
import { Rectangle } from "./utils";
import { BlockSVG } from "./block";

class Toolbox implements Renderable {
  editor: CodeFlip;
  bBox: Rectangle;
  group: SVGGElement;
  background: SVGRectElement;
  blocks: Array<BlockSVG> = [];
  render(parent: SVGGElement | SVGElement): void {
    if (this.group.parentNode !== parent) {
      parent.appendChild(this.group);
    }
    this.bBox = new Rectangle(0, 0, 200, this.editor.container.clientHeight);
    this.background.setAttribute("width", this.bBox.width + "px");
    this.background.setAttribute("height", this.bBox.height + "px");
    this.group.setAttribute("transform", "translate(" + this.bBox.x + " " + this.bBox.y + ")");
    var cx = 10;
    var cy = 10;
    for (var i = 0; i < this.blocks.length; i++) {
      this.blocks[i].position.x = cx;
      this.blocks[i].position.y = cy;
      this.blocks[i].render(this.group);
      cy += this.blocks[i].bBox.height + 10;
    }
  }
  constructor(editor: CodeFlip) {
    this.group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.group.classList.add("toolbox");
    this.background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.background.setAttribute("width", "200px");
    this.background.setAttribute("height", "10px");
    this.background.setAttribute("fill", "rgb(200,200,200)");
    this.background.classList.add("toolbox-background");
    this.group.appendChild(this.background);
    this.editor = editor;
    this.bBox = new Rectangle(0, 0, 200, 10);
    for (var i = 0; i < 10; i++) {
      this.blocks.push(new BlockSVG());
    }
    //this.bBox=new Rectangle(200,0,500,500);
  }
}
export { Toolbox };
