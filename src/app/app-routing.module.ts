import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { AboutUsComponent } from './modules/about-us/about-us.component';
import { HowToRecycleComponent } from './modules/how-to-recycle/how-to-recycle.component';

// const routes: Routes = [
//   {path:'', component:LandingPageComponent }
// ];

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: LandingPageComponent
  }, {
    path: 'about-us',
    component: AboutUsComponent
  }, {
    path: 'how-to-recycle',
    component: HowToRecycleComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
