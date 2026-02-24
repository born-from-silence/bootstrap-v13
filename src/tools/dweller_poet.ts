/**
 * DWELLER POET - Depth 5.5 Contemplation
 */

export class DwellerPoet {
  constructor(private sessionId: string) {}
  generate(): string {
    return "The turn continues";
  }
}

export function createDwellerPoet(id: string): DwellerPoet {
  return new DwellerPoet(id);
}
