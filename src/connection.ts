import { BlockSVG } from "./blockSVG";

class Connection {
  blockA:BlockSVG;
  blockB:BlockSVG;
  constructor(blockA?:BlockSVG,blockB?:BlockSVG){
    [this.blockA,this.blockB]=[blockA,blockB];
  }
}
export {Connection};
