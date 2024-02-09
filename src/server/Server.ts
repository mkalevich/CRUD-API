import {
  createServer,
  IncomingMessage,
  Server as HTTPServer,
  ServerResponse,
} from "http";
import { getRequestMask } from "../helpers.js";
import { emitter } from "../emitter.js";

export class Server {
  server: HTTPServer;

  constructor() {
    this.server = createServer(this.configureServer);
  }

  configureServer(request: IncomingMessage, response: ServerResponse) {
    const urlWithId = request.url?.split("/")[3];

    const emitted = emitter.emit(
      getRequestMask(request.method, !!urlWithId),
      request,
      response,
    );

    if (!emitted) {
      response.writeHead(404);

      response.end("Such path does not exists");
    }
  }

  listen(port: string | undefined) {
    this.server.listen(port, () =>
      console.log(`The server is running on ${port} port...`),
    );
  }
}
