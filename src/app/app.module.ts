import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './core/login/login.component';
import { SongsDisplayComponent } from './feature/songs-display/songs-display.component';
import { LeaderboardDisplayComponent } from './feature/leaderboard-display/leaderboard-display.component';
import { AboutDisplayComponent } from './feature/about-display/about-display.component';
import { HeroComponent } from './feature/hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SongsDisplayComponent,
    LeaderboardDisplayComponent,
    AboutDisplayComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
