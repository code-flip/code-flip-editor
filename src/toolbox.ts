import { Renderable } from "./renderable";
import { CodeFlip } from "./codeFlip";
import { Rectangle } from "./utils";
import { BlockSVG } from "./block";
import { InputSVG } from "./input";

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
    this.bBox = new Rectangle(0, 0, 400, this.editor.container.clientHeight);
    this.background.setAttribute("width", this.bBox.width + "px");
    this.background.setAttribute("height", this.bBox.height + "px");
    this.group.setAttribute("transform", "translate(" + this.bBox.x + " " + this.bBox.y + ")");
    var cx = 10;
    var cy = 10;
    for (var i = 0; i < this.blocks.length; i++) {
      this.blocks[i].position.x = cx;
      this.blocks[i].position.y = cy;
      this.blocks[i].render(this.group);
      cy += this.blocks[i].group.getBBox().height + 10;
    }
  }
  constructor(editor: CodeFlip) {
    this.group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.group.classList.add("toolbox");
    this.background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.background.setAttribute("width", "200px");
    this.background.setAttribute("height", "10px");
    this.background.setAttribute("fill", "url(#Stripes)");//rgb(200,200,200)");
    this.background.setAttribute("filter", "url(#Bevel)");
    this.background.classList.add("toolbox-background");
    this.group.appendChild(this.background);
    this.editor = editor;
    this.bBox = new Rectangle(0, 0, 500, 10);
    for (var i = 0; i < 10; i++) {
      this.blocks.push(new BlockSVG());
      var hue = Math.random() * 360;
      this.blocks[this.blocks.length - 1].color = "hsl(" + hue + ", 100%, 40%)";
      if (Math.random() < 0.5) {
        var b = this.blocks[this.blocks.length - 1];
        b.canHaveNext = true;
        b.canHavePrevious = true;
        b.next = new BlockSVG();
        b.next.canHaveNext = true;
        b.next.canHavePrevious = true;
        var hue2 = Math.random() * 360;
        b.next.color = "hsl(" + hue2 + ", 100%, 40%)";
      }
      var k = Math.random() * 4 - 1;
      var b = this.blocks[this.blocks.length - 1];
      for (var j = 0; j < k; j++) {
        b.inputList[j] = [];
        var m = b.inputList[j];
        var b = this.blocks[this.blocks.length - 1];
        var h = Math.random() * 4 - 1;
        for (var l = 0; l < h; l++) {
          var g = new InputSVG();
          var hue2 = Math.random() * 360;
          g.color = b.color;// "hsl(" + hue2 + ", 100%, 50%)";
          b.inputList[j][l] = g;
        }
      }
    }
  }
  //this.bBox=new Rectangle(200,0,500,500);
}

export { Toolbox };
