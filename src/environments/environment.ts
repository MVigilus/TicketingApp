export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080',
  servizi:{
    auth:{
      login:"auth/login",
      logout: "auth/logout",
      resetPassword: "auth/resetPassword",
      checkJWT: "auth/checkJWT"
    },
    api:{
      getAll:"operator/getall",
    },
    ticketing:{
      checkCliente: "ticketing/checkCliente",
      insertTicket: "ticketing/insertTicket",
      getLogoCliente: "ticketing/getLogo",
    },
    operatoreService: {
      getResumeOperatore: "operator/getResumeOperatore",
      updateTicketStatus: "operator/updateTicketStatus",
      updateTicketStatusLav: "operator/updateTicketStatusLav",
      updateTicketStatusChiuso: "operator/updateTicketStatusChiuso"

    },
    adminService: {
      getAllClientiCodes: "admin/getAllClientiCodes",
      getAllImpiegatoName: "admin/getAllImpiegatoName",
      getAllOperatore: "admin/getAllOperatore",
      getDashboardResume: "admin/dashboardGeneraleResume",
      getAllOperatoreFR: "admin/getAllOperatoreFR",
      getAllCliente: "admin/getAllCliente",
      insertCliente: "admin/insertCliente",
      insertLogoCliente: "admin/insertLogoCliente",
      deleteCliente: "admin/deleteCliente",
      deleteOperatore: "admin/FR",
      getAllTicketAdmin: "admin/getAllTicketAdmin",
      insertOperatore: "admin/InsertOperatore",
    }
  }
};
