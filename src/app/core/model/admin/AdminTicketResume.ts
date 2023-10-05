import {TicketAdminElement} from "@core/model/admin/TicketAdminElement";
import {TicketTableElement} from "@core/model/ticketing/TicketTableElement";

export interface AdminTicketResume {
  adminResumeTicket: TicketAdminElement,
  ticketElementTable: TicketTableElement[]
}
