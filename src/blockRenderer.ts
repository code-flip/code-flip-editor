import { BlockSVG } from "./blockSVG";

interface BlockRenderer {
  renderBlock(block:BlockSVG):void;
  renderHint(block:BlockSVG):any;
  compareHints(hint1:any,hint2:any):boolean;
  shouldRender(block:BlockSVG):boolean;
}
export {BlockRenderer};
