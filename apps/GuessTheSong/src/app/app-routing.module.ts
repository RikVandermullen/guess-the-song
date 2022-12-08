import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './core/user/user-details/user-details.component';
import { HomepageComponent } from './feature/homepage/homepage.component';
import { AboutpageComponent } from './feature/aboutpage/aboutpage.component';
import { SongListComponent } from './core/song/song-list/song-list.component';
import { ProfilepageComponent } from './feature/profilepage/profilepage.component';
import { SongDetailComponent } from './core/song/song-detail/song-detail.component';
import { SongEditComponent } from './core/song/song-edit/song-edit.component';
import { ArtistListComponent } from './core/artist/artist-list/artist-list.component';
import { ArtistDetailComponent } from './core/artist/artist-detail/artist-detail.component';
import { ArtistEditComponent } from './core/artist/artist-edit/artist-edit.component';
import { GameListComponent } from './core/game/game-list/game-list.component';
import { GameEditComponent } from './core/game/game-edit/game-edit.component';
import { GamePlayComponent } from './core/game/game-play/game-play.component';
import { GameScoreComponent } from './core/game/game-score/game-score.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { AuthGuard } from './core/auth/auth.guard';
import { LeaderboardComponent } from './feature/leaderboard/leaderboard.component';

const routes: Routes = [
	{path: "", pathMatch: "full", component: HomepageComponent},
	{path: "login", pathMatch: "full", component: LoginComponent},
	{path: "register", pathMatch: "full", component: RegisterComponent},
	{path: "about", pathMatch: "full", component: AboutpageComponent},
	{path: "songs/new", pathMatch: "full", component: SongEditComponent, 
		canActivate: [AuthGuard],
		data: {roles: ['ADMIN']}
	},
	{path: "songs", pathMatch: "full", component: SongListComponent},
	{path: "songs/:id", pathMatch: "full", component: SongDetailComponent},
	{path: "songs/:id/edit", pathMatch: "full", component: SongEditComponent, 
		canActivate: [AuthGuard], 
		data: {roles: 'ADMIN'}
	},
	{path: "profile", pathMatch: "full", component: ProfilepageComponent, 
		canActivate: [AuthGuard],
		data: {roles: 'PLAYER'},
		children: [
		{
			path: "", component: UserDetailsComponent, 
			canActivate: [AuthGuard],
			data: {roles: 'PLAYER'}
		}
	]},
	{path: "artists", pathMatch: "full", component: ArtistListComponent},
	{path: "artists/new", pathMatch: "full", component: ArtistEditComponent,
		canActivate: [AuthGuard],
		data: {roles: ['ADMIN']}
	},
	{path: "artists/:id", pathMatch: "full", component: ArtistDetailComponent},
	{path: "artists/:id/edit", pathMatch: "full", component: ArtistEditComponent,
		canActivate: [AuthGuard],
		data: {roles: ['ADMIN']}
	},
	{path: "games", pathMatch: "full", component: GameListComponent},
	{path: "games/new", pathMatch: "full", component: GameEditComponent,
		canActivate: [AuthGuard],
		data: {roles: ['PLAYER']}
	},
	{path: "games/:me", pathMatch: "full", component: GameListComponent,
		canActivate: [AuthGuard],
		data: {roles: ['PLAYER']}
	},
	{path: "games/:id/edit", pathMatch: "full", component: GameEditComponent,
		canActivate: [AuthGuard],
		data: {roles: ['PLAYER']}
	},
	{path: "games/:id/play", pathMatch: "full", component: GamePlayComponent,
		canActivate: [AuthGuard],
		data: {roles: ['PLAYER']}
	},
	{path: "games/:id/score", pathMatch: "full", component: GameScoreComponent,
		canActivate: [AuthGuard],
		data: {roles: ['PLAYER']}
	},
	{path: "games/:id/leaderboard", pathMatch: "full", component: LeaderboardComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes,{
		scrollPositionRestoration: 'enabled',
		anchorScrolling: 'enabled',
	})],
	exports: [RouterModule]
	})
export class AppRoutingModule { }
