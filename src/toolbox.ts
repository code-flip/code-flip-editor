import { Renderable } from "./renderable";
import { CodeFlip } from "./codeFlip";

class Toolbox implements Renderable {
  editor: CodeFlip;
  group: SVGGElement;
  render(parent: SVGGElement | SVGElement): void {
    parent.appendChild(this.group);
  }
  constructor(editor:CodeFlip){
    this.group=document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.group.classList.add("toolbox");
    this.editor=editor;
    //this.bBox=new Rectangle(200,0,500,500);
  }
}
export {Toolbox};
