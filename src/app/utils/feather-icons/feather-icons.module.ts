import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeatherModule} from "angular-feather";
import {allIcons} from "angular-feather/icons";
import {FeatherIconsComponent} from "./feather-icons.component";




@NgModule({
  imports: [CommonModule, FeatherModule.pick(allIcons)],
  exports: [FeatherIconsComponent, FeatherModule],
  declarations: [FeatherIconsComponent],
})
export class FeatherIconsModule {}
