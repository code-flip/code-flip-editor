import { Renderable } from "./renderable";

class Field implements Renderable {
  group: SVGGElement;
  render(parent: SVGGElement | SVGElement): void {
    throw new Error("Method not implemented.");
  }
}
