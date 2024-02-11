import {
  createServer,
  IncomingMessage,
  Server as HTTPServer,
  ServerResponse,
} from "http";
import { getRequestMask } from "../helpers";
import { emitter } from "../emitter";

export class Server {
  server: HTTPServer;

  constructor() {
    this.server = createServer(this.configureServer);
  }

  configureServer(req: IncomingMessage, res: ServerResponse) {
    const { url, method } = req;

    const emitted = emitter.emit(getRequestMask(url, method), req, res);

    if (!emitted) {
      res.writeHead(404);

      res.end("Such path does not exists");
    }
  }

  listen(port: string | undefined) {
    this.server.listen(port, () =>
      console.log(`The server is running on ${port} port...`),
    );
  }
}
