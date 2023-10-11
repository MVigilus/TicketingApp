import {TicketResumeOperatore} from "@core/model/ticketing/ticketResumeOperatore";
import {AndamentoGenerale} from "@core/model/andamento/stato/AndamentoStatoGenerale";

export interface AdminDashboardResume {
  codiciCliente: string[],
  codiciOperatore: string[],

  ticketResumeOperatore: TicketResumeOperatore,

  andamentoCliente: AndamentoGenerale[],
  andamentoOperatore: AndamentoGenerale[]

}
