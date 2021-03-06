import { Renderable } from "./renderable";
import { Rectangle, Vector } from "./utils";
import { InputSVG } from "./input";
import { InputStack } from "./stackInput";
interface BlockShape {
  path(): string;
}
class RectBlockShape implements BlockShape {
  width: number;
  height: number;
  radius: number;
  tabHeight: number = 4;
  tabWidth: number = 16;
  tabOffset: number = 8;
  next: boolean;
  previous: boolean;
  path(): string {
    var m = "M " + this.radius + ",0";
    if (this.previous) {
      m = m + "l " + (this.tabOffset) + ",0";
      m = m + "l " + (this.tabHeight) + "," + (this.tabHeight);
      m = m + "l " + (this.tabWidth - this.tabHeight * 2) + "," + (0);
      m = m + "l " + (this.tabHeight) + "," + (-this.tabHeight);
      m = m + "l " + (this.width - this.radius * 2 - this.tabWidth - this.tabOffset) + ",0";
    } else {
      m = m + "l " + (this.width - this.radius * 2) + ",0";
    }
    m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + this.radius + "," + this.radius;
    m = m + "l " + 0 + "," + (this.height - this.radius * 2);
    m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + (-this.radius) + "," + this.radius;

    if (this.next) {
      m = m + "l " + (-this.width + this.radius * 2 + this.tabWidth + this.tabOffset) + ",0";
      m = m + "l " + (-this.tabHeight) + "," + (this.tabHeight);
      m = m + "l " + (-this.tabWidth + this.tabHeight * 2) + "," + (0);
      m = m + "l " + (-this.tabHeight) + "," + (-this.tabHeight);
      m = m + "l " + (-this.tabOffset) + ",0";
    } else {
      m = m + "l " + (-this.width + this.radius * 2) + "," + 0;
    }
    m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + (-this.radius) + "," + (-this.radius);
    m = m + "l " + 0 + "," + (-this.height + this.radius * 2);
    m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + (this.radius) + "," + (-this.radius);
    return m;
  };
  constructor(width: number, height: number, radius: number = 2, next: boolean = true, previous: boolean = true) {
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.next = next;
    this.previous = previous;
  };
}
class CoolBlockShape implements BlockShape {
  layout: { heights: Array<number>, widths: Array<number>, tHeight: number, mWidth: number };
  radius: number;
  tabHeight: number = 4;
  tabWidth: number = 8;
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
        m = m + "l " + ((wDiff - this.radius * 2)) + ",0";
      } else if (wDiff < -this.radius * 2) {
        m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + (-this.radius) + "," + this.radius;
        m = m + "l " + ((wDiff + this.radius * 2)) + ",0";
      } else {
        m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + (-this.radius) + "," + this.radius;
        m = m + "l " + ((wDiff)) + ",0";
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
  constructor(layout: { heights: Array<number>, widths: Array<number>, tHeight: number, mWidth: number }, radius: number = 2, next: boolean = true, previous: boolean = true) {
    this.layout = layout;
    this.radius = radius;
    this.next = next;
    this.previous = previous;
  };
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
  previous: BlockSVG;
  next: BlockSVG;
  inputList: Array<Array<InputSVG>> = [[]];
  canHavePrevious: boolean = false;
  canHaveNext: boolean = false;
  position: Vector = new Vector(0, 0);
  color: string = "hsl(0, 70%, 50%)";
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
    var cy = 10;
    var maxWidth = 0;
    var heights: number[] = [];
    var widths: number[] = [];
    var data: { prev: boolean; next: boolean; }[] = [];
    var stack = false;
    var nStack = false;
    for (var i = 0; i < this.inputList.length; i++) {
      var row = this.inputList[i];
      var lowX = 48;
      if (stack) {
        lowX = 128;
      }
      data[i] = { prev: stack && true && nStack, next: false };
      var cx = 10;
      var minHeight = 12;
      var height = minHeight + 0;
      stack = false;
      nStack = false;
      for (var j = 0; j < row.length; j++) {

        if (row[j].type == "InputStack") {
          lowX = 48;
          cx = Math.max(cx, lowX);
          row[j].render(this.group);
          var bb = row[j].group.getBBox();
          bb.height = row[j].height();
          row[j].position.x = cx;
          row[j].position.y = cy - 10;
          row[j].render(this.group);
          //cx += bb.width + 10;
          height = Math.max(height, bb.height - 20);
          stack = true;

          if (i > 0) {
            widths[i - 1] = Math.max(widths[i - 1], 128);
          }
          if (i === this.inputList.length - 1) {
            widths[i - 1] = Math.max(widths[i - 1], 128);
          }
          if (!((row[j] as InputStack).stack) || ((row[j] as InputStack).stack as BlockSVG).lastBlock().canHaveNext) {
            nStack = true;
            data[i].next = true;
          }
          data[i - 1].next = true;
        } else {
          row[j].render(this.group);
          var bb = row[j].group.getBBox();
          bb.height = row[j].height();
          row[j].position.x = cx;
          row[j].position.y = cy;
          cx += bb.width + 10;
          height = Math.max(height, bb.height);
        }
        //row[j].render(this.group);
      }
      for (var j = 0; j < row.length; j++) {

        if (row[j].type != "InputStack") {
          row[j].position.y = cy - row[j].height() / 2 + height / 2;
          row[j].render(this.group);
        }
      }

      heights.push(height);
      widths.push(Math.max(cx, lowX));
      maxWidth = Math.max(maxWidth, Math.max(cx, lowX));
      cy += height + 20;
      if (i === this.inputList.length - 1 && stack) {
        widths[i + 1] = 128;
        heights[i + 1] = 4;
        cy += 4 + 20;
        data[i + 1] = { prev: nStack, next: false };
      }

    }

    return { heights: heights, tHeight: cy - 10, widths: widths, mWidth: maxWidth, data: data };
  }
  layoutNext(): void {
    if (this.next) {
      this.next.position.x = 0;
      this.next.position.y = this.bBox.height;
      this.next.render(this.group);
    }
  }
  render(parent: SVGGElement | SVGElement): void {
    var layout = this.layoutChildren();
    if (this.group.parentNode !== parent) {
      parent.appendChild(this.group);
    }

    this.bBox = new Rectangle(this.position.x, this.position.y, 128, layout.tHeight);
    var bshape = new SquareBlockShape(layout, 0, this.canHaveNext, this.canHavePrevious);
    this.shape.setAttribute("d", bshape.path());
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
  }
}
