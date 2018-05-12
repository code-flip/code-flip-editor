import { Connection } from "./connection";

class Link {
  connectionA: Connection;
  connectionB: Connection;
  constructor(connectionA?: Connection, connectionB?: Connection) {
    [this.connectionA, this.connectionB] = [connectionA, connectionB];
  }
  other(a: Connection): Connection {
    if (this.connectionA == a) {
      return this.connectionB;
    }
    return this.connectionA;
  }
}
export { Link };
