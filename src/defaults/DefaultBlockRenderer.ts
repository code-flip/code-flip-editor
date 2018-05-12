import { BlockRenderer } from "../blockRenderer";
import { BlockSVG } from "../blockSVG";

class DefaultBlockRender implements BlockRenderer {
  renderBlock(block: BlockSVG): void {
    throw new Error("Method not implemented.");
  }
  renderHint(block: BlockSVG) {
    throw new Error("Method not implemented.");
  }
  compareHints(hint1: any, hint2: any): boolean {
    throw new Error("Method not implemented.");
  }
  shouldRender(block: BlockSVG): boolean {
    throw new Error("Method not implemented.");
  }
}
