import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomepageComponent } from './feature/homepage/homepage.component';
import { UserComponent } from './core/user/user.component';
import { UserDetailsComponent } from './core/user/user-details/user-details.component';
import { AboutpageComponent } from './feature/aboutpage/aboutpage.component';
import { SongComponent } from './core/song/song.component';
import { SongListComponent } from './core/song/song-list/song-list.component';
import { SongDetailComponent } from './core/song/song-detail/song-detail.component';
import { ProfilepageComponent } from './feature/profilepage/profilepage.component';
import { ArtistComponent } from './core/artist/artist.component';
import { ArtistListComponent } from './core/artist/artist-list/artist-list.component';
import { ArtistDetailComponent } from './core/artist/artist-detail/artist-detail.component';
import { ArtistEditComponent } from './core/artist/artist-edit/artist-edit.component';
import { GameComponent } from './core/game/game.component';
import { GameListComponent } from './core/game/game-list/game-list.component';
import { GameEditComponent } from './core/game/game-edit/game-edit.component';
import { GameDetailComponent } from './core/game/game-detail/game-detail.component';
import { GamePlayComponent } from './core/game/game-play/game-play.component';
import { GameScoreComponent } from './core/game/game-score/game-score.component';
import { SongEditComponent } from './core/song/song-edit/song-edit.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { httpInterceptorProviders } from './core/auth/auth.interceptor';
import { LeaderboardComponent } from './feature/leaderboard/leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomepageComponent,
    UserComponent,
    UserDetailsComponent,
    AboutpageComponent,
    SongComponent,
    SongListComponent,
    SongDetailComponent,
    ProfilepageComponent,
    ArtistComponent,
    ArtistListComponent,
    ArtistDetailComponent,
    ArtistEditComponent,
    GameComponent,
    GameListComponent,
    GameEditComponent,
    GameDetailComponent,
    GamePlayComponent,
    GameScoreComponent,
    SongEditComponent,
    LoginComponent,
    RegisterComponent,
    LeaderboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
