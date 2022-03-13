import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GiphyComponent } from './components/giphy/giphy.component';
import { UltraGiphyComponent } from './ultra-giphy/ultra-giphy.component';

@NgModule({
  declarations: [
    AppComponent,
    GiphyComponent,
    UltraGiphyComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
