export class TicketReq {
  nominativo!: string;
  codice!: string;
  telefono!: string;
  descrizione!: string;
  mail!: string;

  public constructor(init?: Partial<TicketReq>) {
    Object.assign(this, init);
  }
}
