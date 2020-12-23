import { v4 as UUID } from 'uuid';

export abstract class Entity<TInitProps> {
  public readonly guid: string;

  constructor(guid?: string) {
    this.guid = guid || UUID();
  }
} 