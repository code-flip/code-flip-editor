import { Renderable } from "./renderable";
import { CodeFlip } from "./codeFlip";
import { Rectangle } from "./utils";
import { BlockSVG } from "./block";
import { InputSVG } from "./input";
import { InputStack } from "./stackInput";
import { InputLabel } from "./labelInput";
import { Horrible } from "./horrible";
import { InputBlock } from "./blockInput";

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
    this.bBox = new Rectangle(0, 0, 1000, this.editor.container.clientHeight);
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
    for (var i = 0; i < 4; i++) {
      this.blocks.push(randBlock(4));
    }
  }
  //this.bBox=new Rectangle(200,0,500,500);
}
var cp: number[] = [];
for (var i = 0; i < 12; i++) {
  cp.push(360 / 12 * i);
}
function randBlock(iterations: number): BlockSVG {
  var kwlist = ['False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'];
  var b = new BlockSVG();
  var hue = cp[Math.floor(Math.random() * cp.length)];
  b.color = "hsl(" + hue + ", 100%, 40%)";
  if (!(iterations > 0)) {
    return b;
  }
  if (Math.random() < 0.5) {
    b.canHaveNext = true;
    b.canHavePrevious = true;
    b.next = new BlockSVG();
    b.next.canHaveNext = true;
    b.next.canHavePrevious = true;
    var hue2 = cp[Math.floor(Math.random() * cp.length)];
    b.next.color = "hsl(" + hue2 + ", 100%, 40%)";
  }
  var k = Math.random() * 4 - 1;
  for (var j = 0; j < k; j++) {
    b.inputList[j] = [];
    var m = b.inputList[j];
    var h = Math.random() * 5;
    if (Math.random() > 0.5 || j !== 1) {
      for (var l = 0; l < h; l++) {
        var mg = new InputLabel();
        mg.text = kwlist[Math.floor(Math.random() * kwlist.length)];//[1, 1, 1, 1, 1, 1, 1, 1].map(x => String.fromCharCode(Math.floor(Math.random() * 26) + 65)).join("");
        var q = Math.random() > 0.5;
        var g = q ? new InputBlock() : mg;
        if (q) {
          var g3 = new InputBlock();
          g3.setBlock(randBlock(iterations - 2));
          g = g3;
        }
        var hue2 = cp[Math.floor(Math.random() * cp.length)];
        g.color = b.color;// "hsl(" + hue2 + ", 100%, 50%)";
        b.inputList[j][l] = g;
      }
    } else {
      var g2 = new InputStack();
      var hue2 = cp[Math.floor(Math.random() * cp.length)];
      g2.setBlock(randBlock(iterations - 1));
      g2.stack.canHavePrevious = true;
      g2.color = b.color;// "hsl(" + hue2 + ", 100%, 50%)";
      b.inputList[j][0] = g2;
    }
  }
  return b;
}

export { Toolbox };
