import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { UserListingComponent } from './modules/user-listing/user-listing.component';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { SummaryComponent } from './modules/summary/summary.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/landing-page', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'landing-page', component: LandingPageComponent
  },
  {
    path: 'user', component: UserListingComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'summary', component: SummaryComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
