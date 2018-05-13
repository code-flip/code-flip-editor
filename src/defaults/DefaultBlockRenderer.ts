import { BlockRenderer } from "../blockRenderer";
import { BlockSVG } from "../blockSVG";
import { InputStack } from "../stackInput";
const defaultRenderValues = {
  tabWidth: 12,
  tabHeight: 6,
  tabOffset: 12,
  topPadding: 8,
  bottomPadding: 8,
  leftPadding: 4,
  rightPadding: 4,
  rowMargin: 16,
  inputMargin: 4,
  minWidth: 36,
  minRowHeight: 18,
};
class DefaultBlockRenderer implements BlockRenderer {
  renderBlock(block: BlockSVG): void {
    throw new Error("Method not implemented.");
  }
  path(hint: any): string {
    var m = "M 0,0";
    if (hint.previous) {
      m = m + "l " + (defaultRenderValues.tabOffset) + ",0";
      m = m + "l " + (defaultRenderValues.tabHeight * 0) + "," + (defaultRenderValues.tabHeight);
      m = m + "l " + (defaultRenderValues.tabWidth - defaultRenderValues.tabHeight * 2 * 0) + "," + (0);
      m = m + "l " + (defaultRenderValues.tabHeight * 0) + "," + (-defaultRenderValues.tabHeight);
      m = m + "l " + (hint.widths[0] - 0 - defaultRenderValues.tabWidth - defaultRenderValues.tabOffset) + ",0";
    } else {
      m = m + "l " + (hint.widths[0] - 0) + ",0";
    }
    m = m + "l " + 0 + "," + (hint.heights[0] + (hint.widths.length < 2 ? defaultRenderValues.topPadding + defaultRenderValues.bottomPadding : defaultRenderValues.rowMargin) - 0);
    var preWidth = hint.widths[0];
    for (var i = 1; i < hint.widths.length; i++) {
      var newWidth = hint.widths[i];
      var nextWidth = i < hint.widths.length - 1 ? hint.widths[i + 1] : 0;
      var wDiff = newWidth - preWidth;
      var wDiff2 = nextWidth - newWidth;
      if (wDiff > 0) {

        //m = m + "l " + ((wDiff - this.radius * 2)) + ",0";
        if (hint.data[i - 1].next) {
          m = m + "l " + (defaultRenderValues.tabOffset) + ",0";
          m = m + "l " + (defaultRenderValues.tabHeight * 0) + "," + (defaultRenderValues.tabHeight);
          m = m + "l " + (defaultRenderValues.tabWidth - defaultRenderValues.tabHeight * 2 * 0) + "," + (0);
          m = m + "l " + (defaultRenderValues.tabHeight * 0) + "," + (-defaultRenderValues.tabHeight);
          m = m + "l " + (wDiff - 0 - defaultRenderValues.tabWidth - defaultRenderValues.tabOffset) + ",0";
        } else {
          m = m + "l " + ((wDiff - 0)) + ",0";
        }
      } else if (wDiff < 0) {

        //m = m + "l " + ((wDiff + this.radius * 2)) + ",0";
        if (hint.data[i - 1].next) {
          m = m + "l " + (-(-wDiff + 0 - defaultRenderValues.tabWidth - defaultRenderValues.tabOffset)) + ",0";
          m = m + "l " + (defaultRenderValues.tabHeight * 0) + "," + (defaultRenderValues.tabHeight);
          m = m + "l " + (-defaultRenderValues.tabWidth + defaultRenderValues.tabHeight * 2 * 0) + "," + (0);
          m = m + "l " + (defaultRenderValues.tabHeight * 0) + "," + (-defaultRenderValues.tabHeight);
          m = m + "l " + (-defaultRenderValues.tabOffset) + ",0";



        } else {
          m = m + "l " + ((wDiff + 0)) + ",0";
        }
      } else {

        if (hint.data[i - 1].next) {
          m = m + "l " + (defaultRenderValues.tabOffset) + ",0";
          m = m + "l " + (defaultRenderValues.tabHeight * 0) + "," + (defaultRenderValues.tabHeight);
          m = m + "l " + (defaultRenderValues.tabWidth - defaultRenderValues.tabHeight * 2 * 0) + "," + (0);
          m = m + "l " + (defaultRenderValues.tabHeight * 0) + "," + (-defaultRenderValues.tabHeight);
          m = m + "l " + (wDiff - defaultRenderValues.tabWidth - defaultRenderValues.tabOffset) + ",0";
        } else {
          m = m + "l " + ((wDiff)) + ",0";
        }
      }
      if (wDiff < 0) {
        //m = m + "a" + this.radius + "," + this.radius + ",0,0,0," + (-this.radius) + "," + (this.radius);
      } else {
        //  m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + this.radius + "," + this.radius;
      }
      m = m + "l " + 0 + "," + (hint.heights[i] + defaultRenderValues.rowMargin - 0);
      preWidth = newWidth + 0;
    }
    //m=m+"H 0";
    var lastW = hint.widths[hint.widths.length - 1];
    //m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + (-this.radius) + "," + this.radius;

    if (hint.next) {
      m = m + "l " + (-lastW + 0 + defaultRenderValues.tabWidth + defaultRenderValues.tabOffset) + ",0";
      m = m + "l " + (-defaultRenderValues.tabHeight * 0) + "," + (defaultRenderValues.tabHeight);
      m = m + "l " + (-defaultRenderValues.tabWidth + defaultRenderValues.tabHeight * 2 * 0) + "," + (0);
      m = m + "l " + (-defaultRenderValues.tabHeight * 0) + "," + (-defaultRenderValues.tabHeight);
      m = m + "l " + (-defaultRenderValues.tabOffset) + ",0";
    } else {
      m = m + "l " + (-lastW + 0) + "," + 0;
    }
    //m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + (-this.radius) + "," + (-this.radius);
    m = m + "l " + 0 + "," + (-hint.tHeight + 0);
    //  m = m + "a" + this.radius + "," + this.radius + ",0,0,1," + (this.radius) + "," + (-this.radius);
    return m;
  }

  renderHint(block: BlockSVG) {
    var cy = defaultRenderValues.topPadding;
    var maxWidth = 0;
    var heights: number[] = [];
    var widths: number[] = [];
    var data: { prev: boolean; next: boolean; }[] = [];
    var stack = false;
    var nStack = false;
    for (var i = 0; i < block.inputList.length; i++) {
      var row = block.inputList[i];
      var lowX = defaultRenderValues.minWidth;
      if (stack) {
        lowX = 128;
      }
      data[i] = { prev: stack && true && nStack, next: false };
      var cx = defaultRenderValues.leftPadding;
      var minHeight = defaultRenderValues.minRowHeight;
      var height = minHeight + 0;
      stack = false;
      nStack = false;
      for (var j = 0; j < row.length; j++) {
        if (row[j].type == "InputStack") {
          lowX = 48;
          cx = Math.max(cx, lowX);
          row[j].render(block.group);
          var bb = row[j].group.getBBox();
          bb.height = row[j].height();
          row[j].position.x = cx;
          row[j].position.y = cy - defaultRenderValues.rowMargin / 2;
          row[j].render(block.group);
          //cx += bb.width + 10;
          height = Math.max(height, bb.height - defaultRenderValues.rowMargin);
          stack = true;

          if (i > 0) {
            widths[i - 1] = Math.max(widths[i - 1], 128);
          }
          if (i === block.inputList.length - 1) {
            widths[i - 1] = Math.max(widths[i - 1], 128);
          }
          if (!((row[j] as InputStack).stack) || ((row[j] as InputStack).stack as BlockSVG).lastBlock().nextConnection) {
            nStack = true;
            data[i].next = true;
          }
          data[i - 1].next = true;
        } else {
          row[j].position.x = cx;
          row[j].position.y = cy;
          row[j].render(block.group);
          var bb = row[j].group.getBBox();
          bb.height = row[j].height();
          cx += bb.width + defaultRenderValues.inputMargin;
          height = Math.max(height, bb.height);
        }
        //row[j].render(this.group);
      }
      for (var j = 0; j < row.length; j++) {

        if (row[j].type != "InputStack") {
          row[j].position.y = cy - row[j].height() / 2 + height / 2;
          row[j].render(block.group);
        }
      }

      heights.push(height);
      widths.push(Math.max(cx - defaultRenderValues.inputMargin + defaultRenderValues.rightPadding, lowX));
      maxWidth = Math.max(maxWidth, widths[widths.length - 1]);
      cy += height + defaultRenderValues.rowMargin;
      if (i === block.inputList.length - 1 && stack) {
        widths[i + 1] = 128;
        heights[i + 1] = 4;
        cy += heights[i + 1] + defaultRenderValues.rowMargin;
        data[i + 1] = { prev: nStack, next: false };
      }

    }

    return { previous: block.canHavePrevious, next: block.canHaveNext, out: block.canHaveOutput, heights: heights, tHeight: cy - defaultRenderValues.rowMargin + defaultRenderValues.bottomPadding, widths: widths, mWidth: maxWidth, data: data };
  }
  compareHints(hint1: any, hint2: any): boolean {
    //undefined hints are always different
    if (!hint1 || !hint2) {
      return false;
    }
    if (!hint1.heights || !hint2.heights) {
      return false;
    }
    if (!hint1.heights || !hint2.heights) {
      return false;
    }
    return true;
  }
  shouldRender(block: BlockSVG): boolean {
    throw new Error("Method not implemented.");
  }
}
export { DefaultBlockRenderer, defaultRenderValues };
