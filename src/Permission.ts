import { Permissions } from './RawTypes';

export class Bitfield {
  field: number;
  constructor(bitfield: number) {
    this.field = bitfield;
  }

  has(bitfield: number): boolean {
    if ((this.field & bitfield) === bitfield) return true;
    return false;
  }
}

export class Permission extends Bitfield {
  id?: string;

  constructor(permission: string | number, id?: string) {
    super(typeof permission === 'string' ? parseInt(permission) : permission);
    this.id = id;
  }

  can(...perms: (keyof typeof Permissions)[]): boolean {
    const permissions = perms.map(p => Permissions[p]).reduce((a, b) => a + b);
    return this.has(permissions);
  }
}
