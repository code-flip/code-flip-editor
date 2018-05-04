import { Toolbox } from "./toolbox";
import { Workspace } from "./workspace";

class CodeFlip{
  render(): void {
    this.svg.setAttribute("width",this.container.clientWidth+"");
    this.svg.setAttribute("height",this.container.clientHeight+"");
    this.toolbox.render(this.svg);
    this.workspace.render(this.svg);
  }

  container:HTMLDivElement;
  svg:SVGElement;
  toolbox:Toolbox;
  workspace:Workspace;
  constructor(container:HTMLDivElement){
    this.container=container;
    this.svg=document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.container.appendChild(this.svg);
    this.svg.setAttribute("width",this.container.clientWidth+"");
    this.svg.setAttribute("height",this.container.clientHeight+"");
    this.toolbox=new Toolbox(this);
    this.workspace=new Workspace(this);
  }
}
export {CodeFlip};
