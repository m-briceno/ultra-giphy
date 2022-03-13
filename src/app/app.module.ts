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
import * as giphyState from './ultra-giphy/store/reducers/giphy.reducer';
import { GiphyEffects } from './ultra-giphy/store/effects/gipphy.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GiphyHeaderInterceptor } from './core/interceptors/header-interceptor';
import * as httpRequests from './ultra-giphy/store/reducers/http-requests.reducer';
import { HttpCounterInterceptor } from './core/interceptors/http-counter-interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

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
    StoreModule.forRoot({
      ultraGiphy: giphyState.reducer,
      httpRequests: httpRequests.reducer,
    }),
    EffectsModule.forRoot([GiphyEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GiphyHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpCounterInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
