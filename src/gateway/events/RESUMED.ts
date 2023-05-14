import { Gateway } from "..";

export default function RESUMED(_: any, gateway: Gateway) {
  gateway.status = "connected";

  gateway.logger.debug("Resumed successfully");
}
