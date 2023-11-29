export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080',
  servizi:{
    auth:{
      login:"auth/login",
      loginCliente:"auth/loginCliente",
      logout: "auth/logout",
      resetPassword: "auth/resetPassword",
      editProfile:"auth/editProfile",
      checkJWT: "auth/checkJWT"
    },
    api:{
      getAll:"operator/getall",
    },
    ticketing:{
      checkCliente: "ticketing/checkCliente",
      checkClientePassword:"ticketing/checkClientePassword",
      insertTicket: "ticketing/insertTicket",
      getLogoCliente: "ticketing/getLogo",
    },
    clienteService:{
      getResumeCliente:"monitoring/getResume",
      getAllImpiegatoName: "monitoring/getAllImpiegatoName",
      exportExcel:"monitoring/exportTicket",
    },
    operatoreService: {
      getResumeOperatore: "operator/getResumeOperatore",
      updateTicketStatus: "operator/updateTicketStatus",
      updateTicketNoteLavorazione: "operator/updateTicketNoteLavorazione",
      updateTicketStatusLav: "operator/updateTicketStatusLav",
      updateTicketStatusChiuso: "operator/updateTicketStatusChiuso",
      exportExcel:"operator/exportTicket",

    },
    adminService: {
      getAllClientiCodes: "admin/getAllClientiCodes",
      editClientePassword: "admin/editPwdCliente",
      exportExcel:"admin/exportTicketAdmin",
      editClienteTicketPassword: "admin/editPwdTicket",
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
