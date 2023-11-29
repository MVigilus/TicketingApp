// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
      editClienteTicketPassword: "admin/editPwdTicket",
      exportExcel:"admin/exportTicketAdmin",
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


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
