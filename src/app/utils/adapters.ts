import {NativeDateAdapter} from "@angular/material/core";

export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (!date) {
      return '';
    }
    return super.format(date, displayFormat);
  }
}
