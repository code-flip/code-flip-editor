import { BlockSVG } from "./block";

interface Language {
  getBlocks(): Array<BlockSVG>;
  codeToBlock(str:string):BlockSVG;
}
export { Language };
