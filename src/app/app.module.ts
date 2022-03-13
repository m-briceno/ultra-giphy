import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UltraGiphyComponent } from './ultra-giphy/ultra-giphy.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './ultra-giphy/components/header/header.component';
import { FooterComponent } from './ultra-giphy/components/footer/footer.component';
import { GiphyGridComponent } from './ultra-giphy/components/giphy-grid/giphy-grid.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { giphyReducer } from './ultra-giphy/store/reducers/giphy.reducer';
import { GiphyEffects } from './ultra-giphy/store/effects/gipphy.effects';

@NgModule({
  declarations: [
    AppComponent,
    UltraGiphyComponent,
    HeaderComponent,
    FooterComponent,
    GiphyGridComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    CoreModule,
    EffectsModule.forFeature([GiphyEffects]),
    StoreModule.forRoot({ ultraGiphy: giphyReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
