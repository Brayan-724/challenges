export interface SecureFloorOptions {
  number: number;
  isLast: boolean;
}

export class SecureFloor {
  constructor(private readonly options: SecureFloorOptions) {}

  get number(): number {
    return this.options.number;
  }

  get isLast(): boolean {
    return this.options.isLast;
  }
}
