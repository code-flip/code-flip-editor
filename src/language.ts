import { BlockSVG } from "./blockSVG";

interface Language {
  getBlocks(): Array<BlockSVG>;
  codeToBlock(str:string):BlockSVG;
}
export { Language };
