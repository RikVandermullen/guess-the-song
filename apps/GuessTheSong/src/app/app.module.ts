import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
