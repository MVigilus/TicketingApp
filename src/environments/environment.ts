export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080',
  servizi:{
    auth:{
      login:"auth/login",
      logout:"auth/logout"
    },
    api:{
      getAll:"operator/getall",
    },
    ticketing:{
      checkCliente: "ticketing/checkCliente",
      insertTicket: "ticketing/insertTicket"
    },
    operatoreService: {
      getResumeOperatore: "operator/getResumeOperatore",
      updateTicketStatus: "operator/updateTicketStatus"
    },
    adminService: {
      getAllClientiCodes: "admin/getAllClientiCodes",
      getAllOperatore: "admin/getAllOperatore",
      getAllCliente: "admin/getAllCliente",
      insertCliente: "admin/insertCliente"

    }
  }
};
