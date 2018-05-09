import { Toolbox } from "./toolbox";
import { Workspace } from "./workspace";

class CodeFlip {
  render(): void {
    this.svg.setAttribute("width", this.container.clientWidth + "");
    this.svg.setAttribute("height", this.container.clientHeight + "");
    this.toolbox.render(this.svg);
    this.workspace.render(this.svg);
  }

  container: HTMLDivElement;
  svg: SVGElement;
  toolbox: Toolbox;
  workspace: Workspace;
  constructor(container: HTMLDivElement) {
    this.container = container;
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.innerHTML = `
    <filter id="Bevel" filterUnits="objectBoundingBox" x="-10%" y="-10%" width="150%" height="150%">
  		<feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur"/>
  		<feSpecularLighting in="blur" surfaceScale="3" specularConstant="0.5" specularExponent="5" result="specOut" lighting-color="white">
  			<fePointLight x="-5000" y="-5000" z="8000"/>
  		</feSpecularLighting>
  		<feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2"/>
      <feComposite in="SourceGraphic" in2="specOut2" operator="arithmetic" k1="0" k2="0" k3="1" k4="-0.3" result="litPaint0" />
  		<feComposite in="SourceGraphic" in2="litPaint0" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
  	</filter>
    <filter id="Bevel2" filterUnits="objectBoundingBox" x="-10%" y="-10%" width="150%" height="150%">
  		<feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur"/>
  		<feSpecularLighting in="blur" surfaceScale="3" specularConstant="0.5" specularExponent="5" result="specOut" lighting-color="white">
  			<fePointLight x="5000" y="5000" z="8000"/>
  		</feSpecularLighting>
  		<feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2"/>
      <feComposite in="SourceGraphic" in2="specOut2" operator="arithmetic" k1="0" k2="0" k3="1" k4="-0.3" result="litPaint0" />
  		<feComposite in="SourceGraphic" in2="litPaint0" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
  	</filter>
    <defs><pattern id="Stripes" patternUnits="userSpaceOnUse" width="50" height="50" patternTransform="rotate(45)">
    <rect x="0" y="0" width="50" height="50" fill="#444444"></rect>
    <line x1="25" y="0" x2="25" y2="50" stroke="#444444" stroke-width="25" />
    </pattern></defs>
    `;
    this.container.appendChild(this.svg);
    this.svg.setAttribute("width", this.container.clientWidth + "");
    this.svg.setAttribute("height", this.container.clientHeight + "");
    this.toolbox = new Toolbox(this);
    this.workspace = new Workspace(this);
    var me = this;
    window.setInterval(function() { me.render() }, 100);
  }
}
export { CodeFlip };
