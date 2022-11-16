import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { UserDetailsComponent } from './core/user/user-details/user-details.component';
import { HomepageComponent } from './feature/homepage/homepage.component';

const routes: Routes = [
  {path: "", component: HomepageComponent},
  {path: "user/:id", component: UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
