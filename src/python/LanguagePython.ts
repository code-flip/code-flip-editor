import { Language } from "../language";
import { BlockSVG } from "../block";
import { InputLabel } from "../labelInput";
import { InputStack } from "../stackInput";
import { InputBlock } from "../blockInput";

class LanguagePython implements Language {
  blockIf(test?: BlockSVG, consequent?: BlockSVG): BlockSVG {
    var b = new BlockSVG();
    b.color = "hsl(180, 100%, 40%)";
    b.canHaveNext = true;
    b.canHavePrevious = true;
    b.inputList = [[new InputLabel("if ("), new InputBlock(test, b.color), new InputLabel("):")],
    [new InputStack(consequent)]];
    return b;
  }
  blockIfElse(): BlockSVG {
    var b = new BlockSVG();
    b.color = "hsl(180, 100%, 40%)";
    b.canHaveNext = true;
    b.canHavePrevious = true;
    b.inputList = [[new InputLabel("if ("), new InputBlock(this.blockFalse(), b.color), new InputLabel("):")],
    [new InputStack()],
    [new InputLabel("else:")],
    [new InputStack()]
    ];
    return b;
  }
  blockFalse(): BlockSVG {
    var b = new BlockSVG();
    b.color = "hsl(120, 100%, 40%)";
    b.canHaveNext = false;
    b.canHavePrevious = false;
    b.inputList = [[new InputLabel("False")]];
    return b;
  }
  blockTrue(): BlockSVG {
    var b = new BlockSVG();
    b.color = "hsl(120, 100%, 40%)";
    b.canHaveNext = false;
    b.canHavePrevious = false;
    b.inputList = [[new InputLabel("True")]];
    return b;
  }
  blockPrint(x?: BlockSVG): BlockSVG {
    var b = new BlockSVG();
    b.color = "hsl(60, 100%, 40%)";
    b.canHaveNext = true;
    b.canHavePrevious = true;
    b.inputList = [[new InputLabel("print ("), new InputBlock(x, b.color), new InputLabel(")")]];
    return b;
  }
  blockMathAdd(x?: BlockSVG, y?: BlockSVG): BlockSVG {
    var b = new BlockSVG();
    b.color = "hsl(210, 100%, 40%)";
    b.canHaveNext = false;
    b.canHavePrevious = false;
    b.inputList = [[new InputLabel("("), new InputBlock(x, b.color), new InputLabel("+"), new InputBlock(y, b.color), new InputLabel(")")]];
    return b;
  }
  getBlocks(): BlockSVG[] {
    var blocks: BlockSVG[] = [];
    blocks.push(this.blockIf());
    blocks.push(this.blockIfElse());
    blocks.push(this.blockFalse());
    blocks.push(this.blockTrue());
    blocks.push(this.blockPrint());
    blocks.push(this.blockMathAdd());
    blocks.push(this.blockIf(this.blockTrue(),this.blockPrint(this.blockFalse())));
    return blocks;
  }
  codeToBlock(str: string): BlockSVG {
    return this.blockFalse();
  }
}
export { LanguagePython };
