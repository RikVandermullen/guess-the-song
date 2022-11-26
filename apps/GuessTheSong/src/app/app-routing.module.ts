import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './core/user/user-details/user-details.component';
import { HomepageComponent } from './feature/homepage/homepage.component';
import { AboutpageComponent } from './feature/aboutpage/aboutpage.component';
import { SongListComponent } from './core/song/song-list/song-list.component';
import { ProfilepageComponent } from './feature/profilepage/profilepage.component';
import { SongDetailComponent } from './core/song/song-detail/song-detail.component';
import { ArtistListComponent } from './core/artist/artist-list/artist-list.component';
import { ArtistDetailComponent } from './core/artist/artist-detail/artist-detail.component';
import { ArtistEditComponent } from './core/artist/artist-edit/artist-edit.component';

const routes: Routes = [
  {path: "", pathMatch: "full", component: HomepageComponent},
  {path: "about", pathMatch: "full", component: AboutpageComponent},
  {path: "songs/new", pathMatch: "full", component: SongDetailComponent},
  {path: "songs", pathMatch: "full", component: SongListComponent, children: [
    {path: "songs/:id", pathMatch: "full", component: SongDetailComponent}
  ]},
  {path: "songs/:id/edit", pathMatch: "full", component: SongDetailComponent},
  {path: "profile/:id", pathMatch: "full", component: ProfilepageComponent, children: [
    {path: "", component: UserDetailsComponent}
  ]},
  {path: "artists", pathMatch: "full", component: ArtistListComponent},
  {path: "artists/new", pathMatch: "full", component: ArtistEditComponent},
  {path: "artists/:id/details", pathMatch: "full", component: ArtistDetailComponent},
  {path: "artists/:id/edit", pathMatch: "full", component: ArtistEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
