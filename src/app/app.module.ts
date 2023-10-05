import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {Page505Component} from './wildcard/page505/page505.component';
import {Page404Component} from './wildcard/page404/page404.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {LoadingBarRouterModule} from "@ngx-loading-bar/router";
import {NgScrollbarModule} from "ngx-scrollbar";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {CoreModule} from "@core/core.module";
import {SharedModule} from "./utils/shared/shared.module";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {JwtInterceptor} from "@core/interceptor/jwt.interceptor";
import {ErrorInterceptor} from "@core/interceptor/error.interceptor";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {HeaderComponent} from "./layout/header/header.component";
import {SidebarComponent} from "./layout/sidebar/sidebar.component";
import {RightSidebarComponent} from "./layout/right-sidebar/right-sidebar.component";
import {PageLoaderComponent} from "./layout/page-loader/page-loader.component";
import {AdminLayoutComponent} from "./layout/app-layout/admin-layout/admin-layout.component";
import {MainLayoutComponent} from "./layout/app-layout/main-layout/main-layout.component";
import {AuthLayoutComponent} from "./layout/app-layout/auth-layout/auth-layout.component";
import {TicketLayoutComponent} from "./layout/app-layout/ticket-layout/ticket-layout.component";
import {GestioneOperatoreComponent} from './gestione/gestione-operatore/gestione-operatore.component';
import {GestioneOperatoreFRComponent} from './gestione/gestione-operatore-fr/gestione-operatore-fr.component';
import {GestioneClienteComponent} from './gestione/gestione-cliente/gestione-cliente.component';
import {GestioneRichiesteComponent} from './gestione/gestione-richieste/gestione-richieste.component';
import {ComponentsModule} from "./utils/components/components.module";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    Page505Component,
    Page404Component,
    HeaderComponent,
    PageLoaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    AdminLayoutComponent,
    TicketLayoutComponent,
    GestioneOperatoreComponent,
    GestioneOperatoreFRComponent,
    GestioneClienteComponent,
    GestioneRichiesteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LoadingBarRouterModule,
    NgScrollbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    // core & shared
    CoreModule,
    SharedModule,
    CKEditorModule,
    ComponentsModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
