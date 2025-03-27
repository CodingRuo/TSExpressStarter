import config from "./config";
import { bootStrap } from "./server";

const server = bootStrap();

server.listen(config.port, () =>
  console.log(`API running on http://localhost:${config.port}`),
);
