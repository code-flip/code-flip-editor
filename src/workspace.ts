import { CodeFlip } from "./codeFlip";
import { Rectangle } from "./utils";
import { Renderable } from "./renderable";

class Workspace implements Renderable{
  render(parent: SVGGElement | SVGElement): void {
    parent.appendChild(this.group);
  }
  group: SVGGElement;
  bBox:Rectangle;
  editor:CodeFlip;
  constructor(editor:CodeFlip){
    this.group=document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.editor=editor;
    this.bBox=new Rectangle(200,0,500,500);
  }
}
export {Workspace};
