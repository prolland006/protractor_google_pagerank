import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

export class CommonHelper {

  static commonModuleList() {
    return [
      BrowserModule,
      FormsModule,
      HttpModule
    ];
  };

}
