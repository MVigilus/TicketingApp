// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080',
  servizi:{
    auth:{
      login:"auth/login",
      logout: "auth/logout",
      checkJWT: "auth/checkJWT"
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
      updateTicketStatus: "operator/updateTicketStatus",
      updateTicketStatusLav: "operator/updateTicketStatusLav",
      updateTicketStatusChiuso: "operator/updateTicketStatusChiuso"
    },
    adminService: {
      getAllClientiCodes: "admin/getAllClientiCodes",
      getAllImpiegatoName: "admin/getAllImpiegatoName",
      getAllOperatore: "admin/getAllOperatore",
      getAllOperatoreFR: "admin/getAllOperatoreFR",
      getAllCliente: "admin/getAllCliente",
      getDashboardResume: "admin/dashboardGeneraleResume",
      insertCliente: "admin/insertCliente",
      deleteCliente: "admin/deleteCliente",
      deleteOperatore: "admin/FR",
      getAllTicketAdmin: "admin/getAllTicketAdmin",
      insertOperatore: "admin/InsertOperatore"
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
