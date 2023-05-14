export class Bitfield<T = number> {
  field: T;
  constructor(bitfield: T) {
    this.field = bitfield;
  }

  has(...biefields: T[]): boolean {
    const bitfield: number = (biefields as number[]).reduce((a, b) => a + b);

    return ((this.field as number) & bitfield) === bitfield;
  }
}
