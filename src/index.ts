import { bootStrap } from "./server";

const server = bootStrap();

server.listen(process.env.PORT, () =>
  console.log(`API running on http://localhost:${process.env.PORT}`),
);

if (process.env.NODE_ENV !== "production") {
  console.clear();
}
