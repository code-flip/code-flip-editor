import { BlockSVG } from "./blockSVG";
import { Vector } from "./utils";
import { Link } from "./link";

class Connection {
  private _block: BlockSVG;
  private _anchor: Vector;
  private _partner: Connection = undefined;
  private connectListeners: Array<(me: Connection, other: Connection) => void> = [];
  private disconnectListeners: Array<(me: Connection, other: Connection) => void> = [];
  constructor(block: BlockSVG, anchor: Vector) {
    [this._block, this._anchor] = [block, anchor];
  }
  private handleDisconnect(): void {
    for (var i of this.disconnectListeners) {
      i(this, this._partner);
    }
    this._partner = undefined;
  }
  addEventListener(type: "connect" | "disconnect", handler: (me: Connection, other: Connection) => void): void {
    if (type == "disconnect") {
      this.disconnectListeners.push(handler);
    } else if (type == "connect") {
      this.connectListeners.push(handler);
    }
  }
  private handleConnect(other: Connection): void {
    this._partner = other;
    for (var i of this.connectListeners) {
      i(this, this._partner);
    }
  }
  get block(): BlockSVG {
    return this._block;
  }
  get otherBlock(): BlockSVG {
    return this._partner ? this._partner.block : undefined;
  }
  get partner(): Connection {
    return this._partner;
  }
  set partner(other: Connection) {
    if (this._partner != other) {
      if (this._partner) {
        this.handleDisconnect();
        this._partner.handleDisconnect();
      }
      if (other) {
        this.handleConnect(other);
        other.handleConnect(this);
      }
    }
  }
  get anchor(): Vector {
    return this._anchor;
  }
  set anchor(value: Vector) {
    this._anchor = value;
  }
}
export { Connection };
