import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './core/user/user-details/user-details.component';
import { HomepageComponent } from './feature/homepage/homepage.component';
import { AboutpageComponent } from './feature/aboutpage/aboutpage.component';
import { SongListComponent } from './core/song/song-list/song-list.component';
import { ProfilepageComponent } from './feature/profilepage/profilepage.component';

const routes: Routes = [
  {path: "", component: HomepageComponent},
  {path: "about", component: AboutpageComponent},
  // {path: "users/:id", component: UserDetailsComponent},
  {path: "songs", component: SongListComponent},
  {path: "profile/:id", component: ProfilepageComponent, children: [
    {path: "", component: UserDetailsComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
