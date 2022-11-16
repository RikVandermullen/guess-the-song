import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { UserDetailsComponent } from './core/user/user-details/user-details.component';
import { HomepageComponent } from './feature/homepage/homepage.component';
import { AboutpageComponent } from './feature/aboutpage/aboutpage.component';

const routes: Routes = [
  {path: "", component: HomepageComponent},
  {path: "about", component: AboutpageComponent},
  {path: "user/:id", component: UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
