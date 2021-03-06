import { Renderable } from "./renderable";
import { Rectangle, Vector } from "./utils";
import { InputSVG } from "./input";
import { InputStack } from "./stackInput";
import { Connection } from "./connection";
import { DefaultBlockRenderer } from "./defaults/DefaultBlockRenderer";
interface BlockShape {
  path(): string;
}
class SquareBlockShape implements BlockShape {
  layout: { heights: Array<number>, widths: Array<number>, tHeight: number, mWidth: number, data: Array<{ prev: boolean, next: boolean }> };
  radius: number;
  tabHeight: number = 6;
  tabWidth: number = 12;
  tabOffset: number = 12;
  next: boolean;
  previous: boolean;
  reporter: boolean = false;
  path(): string {
    var m = "M " + this.radius + ",0";
    if (this.previous) {
      m = m + "l " + (this.tabOffset) + ",0";
      m = m + "l " + (this.tabHeight * 0) + "," + (this.tabHeight);
      m = m + "l " + (this.tabWidth - this.tabHeight * 2 * 0) + "," + (0);
      m = m + "l " + (this.tabHeight * 0) + "," + (-this.tabHeight);
      m = m + "l " + (this.layout.widths[0] - this.radius * 2 - this.tabWidth - this.tabOffset) + ",0";
    } else {
      m = m + "l " + (this.layout.widths[0] - this.radius * 2) + ",0";
    }
    m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + this.radius + "," + this.radius;
    m = m + "l " + 0 + "," + (this.layout.heights[0] + 20 - this.radius * 2);
    var preWidth = this.layout.widths[0];
    for (var i = 1; i < this.layout.widths.length; i++) {
      var newWidth = this.layout.widths[i];
      var nextWidth = i < this.layout.widths.length - 1 ? this.layout.widths[i + 1] : 0;
      var wDiff = newWidth - preWidth;
      var wDiff2 = nextWidth - newWidth;
      if (wDiff > this.radius * 2) {
        m = m + "a" + this.radius + "," + this.radius + ",0,0,0," + (this.radius) + "," + this.radius;
        //m = m + "l " + ((wDiff - this.radius * 2)) + ",0";
        if (this.layout.data[i - 1].next) {
          m = m + "l " + (this.tabOffset) + ",0";
          m = m + "l " + (this.tabHeight * 0) + "," + (this.tabHeight);
          m = m + "l " + (this.tabWidth - this.tabHeight * 2 * 0) + "," + (0);
          m = m + "l " + (this.tabHeight * 0) + "," + (-this.tabHeight);
          m = m + "l " + (wDiff - this.radius * 2 - this.tabWidth - this.tabOffset) + ",0";
        } else {
          m = m + "l " + ((wDiff - this.radius * 2)) + ",0";
        }
      } else if (wDiff < -this.radius * 2) {
        m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + (-this.radius) + "," + this.radius;
        //m = m + "l " + ((wDiff + this.radius * 2)) + ",0";
        if (this.layout.data[i - 1].next) {
          m = m + "l " + (-(-wDiff + this.radius * 2 - this.tabWidth - this.tabOffset)) + ",0";
          m = m + "l " + (this.tabHeight * 0) + "," + (this.tabHeight);
          m = m + "l " + (-this.tabWidth + this.tabHeight * 2 * 0) + "," + (0);
          m = m + "l " + (this.tabHeight * 0) + "," + (-this.tabHeight);
          m = m + "l " + (-this.tabOffset) + ",0";



        } else {
          m = m + "l " + ((wDiff + this.radius * 2)) + ",0";
        }
      } else {
        m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + (-this.radius) + "," + this.radius;
        if (this.layout.data[i - 1].next) {
          m = m + "l " + (this.tabOffset) + ",0";
          m = m + "l " + (this.tabHeight * 0) + "," + (this.tabHeight);
          m = m + "l " + (this.tabWidth - this.tabHeight * 2 * 0) + "," + (0);
          m = m + "l " + (this.tabHeight * 0) + "," + (-this.tabHeight);
          m = m + "l " + (wDiff - this.tabWidth - this.tabOffset) + ",0";
        } else {
          m = m + "l " + ((wDiff)) + ",0";
        }
      }
      if (wDiff < -this.radius * 2) {
        m = m + "a" + this.radius + "," + this.radius + ",0,0,0," + (-this.radius) + "," + (this.radius);
      } else {
        m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + this.radius + "," + this.radius;
      }
      m = m + "l " + 0 + "," + (this.layout.heights[i] + 20 - this.radius * 2);
      preWidth = newWidth + 0;
    }
    //m=m+"H 0";
    var lastW = this.layout.widths[this.layout.widths.length - 1];
    m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + (-this.radius) + "," + this.radius;

    if (this.next) {
      m = m + "l " + (-lastW + this.radius * 2 + this.tabWidth + this.tabOffset) + ",0";
      m = m + "l " + (-this.tabHeight * 0) + "," + (this.tabHeight);
      m = m + "l " + (-this.tabWidth + this.tabHeight * 2 * 0) + "," + (0);
      m = m + "l " + (-this.tabHeight * 0) + "," + (-this.tabHeight);
      m = m + "l " + (-this.tabOffset) + ",0";
    } else {
      m = m + "l " + (-lastW + this.radius * 2) + "," + 0;
    }
    m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + (-this.radius) + "," + (-this.radius);
    m = m + "l " + 0 + "," + (-this.layout.tHeight + this.radius * 2);
    m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + (this.radius) + "," + (-this.radius);
    return m;
  };
  constructor(layout: { heights: Array<number>, widths: Array<number>, tHeight: number, mWidth: number, data: Array<{ prev: boolean, next: boolean }> }, radius: number = 2, next: boolean = true, previous: boolean = true) {
    this.layout = layout;
    this.radius = radius;
    this.next = next;
    this.previous = previous;
  };
}
class BlockSVG implements Renderable {
  group: SVGGElement;
  bBox: Rectangle;
  shape: SVGPathElement;
  renderHint: any = undefined;
  previousConnection: Connection = undefined;
  nextConnection: Connection = undefined;
  outputConnection: Connection = undefined;
  inputList: Array<Array<InputSVG>> = [[]];
  position: Vector = new Vector(0, 0);
  color: string = "hsl(0, 70%, 50%)";
  get previous(): BlockSVG {
    return this.previousConnection ? this.previousConnection.otherBlock : undefined;
  }
  get canHaveNext(): boolean {
    return !(!this.nextConnection);
  }
  set canHaveNext(newVal: boolean) {
    if (this.canHaveNext != newVal) {
      if (newVal) {
        this.nextConnection = new Connection(this, new Vector(0, 0));
        this.nextConnection.addEventListener("disconnect", function(me: Connection, other: Connection) {
          if (other && other.block) {
            if (other.block.group.parentNode == this.group) {
              this.group.removeChild(other.block.group);
            }
          }
        });
      } else {
        this.nextConnection.partner = undefined;
        this.nextConnection = undefined;
      }
    }
  }
  get canHavePrevious(): boolean {
    return !(!this.previousConnection);
  }
  set canHavePrevious(newVal: boolean) {
    if (this.canHavePrevious != newVal) {
      if (newVal) {
        this.previousConnection = new Connection(this, new Vector(0, 0));
      } else {
        this.previousConnection.partner = undefined;
        this.previousConnection = undefined;
      }
    }
  }
  get canHaveOutput(): boolean {
    return !(!this.outputConnection);
  }
  set canHaveOutput(newVal: boolean) {
    if (this.canHaveOutput != newVal) {
      if (newVal) {
        this.outputConnection = new Connection(this, new Vector(0, 0));
      } else {
        this.outputConnection.partner = undefined;
        this.outputConnection = undefined;
      }
    }
  }
  set previous(block: BlockSVG) {
    if (this.previousConnection) {
      this.previousConnection.partner = block.nextConnection;
    }
  }
  get next(): BlockSVG {
    return this.nextConnection ? this.nextConnection.otherBlock : undefined;
  }
  set next(block: BlockSVG) {
    if (this.nextConnection) {
      this.nextConnection.partner = block.previousConnection;
    }
  }
  toCode(): string {
    return "undefined";
  }
  lastBlock(): BlockSVG {
    if (this.next) {
      return this.next.lastBlock();
    }
    return this;
  }
  layoutChildren(): { heights: Array<number>, widths: Array<number>, tHeight: number, mWidth: number, data: Array<{ prev: boolean, next: boolean }> } {
    return new DefaultBlockRenderer().renderHint(this);
  }
  layoutNext(): void {
    if (this.next) {
      this.next.position.x = 0;
      this.next.position.y = this.bBox.height;
      this.next.render(this.group);
    }
  }
  append(block: BlockSVG): BlockSVG {
    this.next = block;
    return this;
  }
  render(parent: SVGGElement | SVGElement): void {
    var engine = new DefaultBlockRenderer();
    if (this.group.parentNode !== parent) {
      parent.appendChild(this.group);
    }
    var hint = engine.renderHint(this);

    this.bBox = new Rectangle(this.position.x, this.position.y, 128, hint.tHeight);
    //if (!engine.compareHints(this.renderHint, hint)) {
    this.shape.setAttribute("d", engine.path(hint));
    this.renderHint = hint;
    //}
    this.group.setAttribute("transform", "translate(" + this.position.x + " " + this.position.y + ")");
    this.shape.setAttribute("fill", this.color);
    this.layoutNext();
  }
  constructor() {
    var hue = Math.floor(Math.random() * 360);
    this.group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.group.classList.add("block");
    this.shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
    //this.shape.setAttribute("fill", "hsl("+hue+", 70%, 50%)");
    this.shape.setAttribute("filter", "url(#Bevel)");
    this.group.appendChild(this.shape);
    var me = this;

    var f = function(event: any, ui?: any): any {
      //console.log("MD",me);
      var startMPos = new Vector(event.clientX, event.clientY);
      var startPos = new Vector(me.position.x + 0, me.position.y + 0);
      var f2 = function(event: any, ui?: any): any {
        var endMPos = new Vector(event.clientX, event.clientY);
        me.position.x = endMPos.x - startMPos.x + startPos.x;
        me.position.y = endMPos.y - startMPos.y + startPos.y;
        //console.log("MM",me);
        return undefined;
      };
      var f3 = function(event: any, ui?: any): any {
        var endMPos = new Vector(event.clientX, event.clientY);
        me.position.x = endMPos.x - startMPos.x + startPos.x;
        me.position.y = endMPos.y - startMPos.y + startPos.y;
        document.body.removeEventListener("mousemove", f2);
        document.body.removeEventListener("mouseup", f3);
        //console.log("MU",me);
        return undefined;
      }
      document.body.addEventListener('mouseup', f3);
      document.body.addEventListener('mousemove', f2);


      return undefined;
    };
    this.group.addEventListener('mousedown', f);

  }
}
export { BlockSVG, BlockShape, SquareBlockShape };
