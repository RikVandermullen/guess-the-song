import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './core/login/login.component';
import { HomepageComponent } from './feature/homepage/homepage.component';
import { UserComponent } from './core/user/user.component';
import { UserDetailsComponent } from './core/user/user-details/user-details.component';
import { AboutpageComponent } from './feature/aboutpage/aboutpage.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomepageComponent,
    UserComponent,
    UserDetailsComponent,
    AboutpageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
