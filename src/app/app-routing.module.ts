import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './core/components/error-page/error-page.component';
import { UltraGiphyComponent } from './ultra-giphy/ultra-giphy.component';


const routes: Routes = [
  { path: '', redirectTo: '/ultra-giphy', pathMatch: 'full' },
  { path: 'ultra-giphy', component: UltraGiphyComponent },
  { path: '**', component: ErrorPageComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



