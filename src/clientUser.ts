import { Client } from "./client";
import { RawUser } from "./rawTypes";
import User from "./user";

export default class ClientUser extends User {
  private client: Client;

  constructor(user: RawUser, client: Client) {
    super(user);
    this.client = client;
  }
}
