import { CodeFlip } from "./codeFlip";
import { Rectangle } from "./utils";
import { Renderable } from "./renderable";

class Workspace implements Renderable{
  render(parent: SVGGElement | SVGElement): void {
    if(this.group.parentNode!==parent){
      parent.appendChild(this.group);
    }
    this.bBox=new Rectangle(200,0,this.editor.container.clientWidth-this.editor.toolbox.bBox.width,this.editor.container.clientHeight);
    this.background.setAttribute("width", this.bBox.width+ "px");
    this.background.setAttribute("height", this.bBox.height+ "px");
    this.group.setAttribute("transform","translate("+this.bBox.x+" "+this.bBox.y+")");
  }
  group: SVGGElement;
  bBox:Rectangle;
  editor:CodeFlip;
  background: SVGRectElement;
  constructor(editor:CodeFlip){
    this.group=document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.editor=editor;
    this.background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.background.setAttribute("width", "200px");
    this.background.setAttribute("height", "10px");
    this.background.setAttribute("fill", "rgb(250,250,250)");
    this.background.classList.add("workspace-background");
    this.group.appendChild(this.background);
    this.bBox=new Rectangle(200,0,500,500);
  }
}
export {Workspace};
