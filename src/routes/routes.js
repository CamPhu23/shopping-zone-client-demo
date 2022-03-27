import CLIENT from "./private/client-private-route";
import PUBLIC from "./public/public-route";

export default [
  ...CLIENT,
  ...PUBLIC,
];