import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthGuard} from "./guard/auth.guard";
import {DirectionService} from "./services/direction.service";
import {AuthService} from "@core/services/auth.service";
import {AdminGuard} from "@core/guard/admin.guard";


function throwIfAlreadyLoaded(
  parentModule: CoreModule,
  moduleName: string
) {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import ${moduleName} modules in the AppModule only.`
    );
  }
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [/*RightSidebarService*/ AdminGuard, AuthGuard, AuthService, DirectionService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
