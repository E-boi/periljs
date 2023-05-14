import { Gateway } from "..";
import ClientUser from "../../clientUser";
import { RawUnavailableGuild, RawUser } from "../../rawTypes";

interface ReadyPayload {
  session_id: string;
  resume_gateway_url: string;
  guilds: RawUnavailableGuild[];
  user: RawUser;
}

export default function READY(data: ReadyPayload, gateway: Gateway) {
  gateway.sessionId = data.session_id;
  gateway.resumeUrl = data.resume_gateway_url;
  gateway.retries = 0;
  gateway.expectedGuilds = data.guilds.map((g) => g.id);
  gateway.client.user = new ClientUser(data.user, gateway.client);

  gateway.logger.debug("Connected successfully", data.resume_gateway_url);
}
