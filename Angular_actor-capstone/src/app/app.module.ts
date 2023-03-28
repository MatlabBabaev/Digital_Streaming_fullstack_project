import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ActorsListComponent } from './components/actors-list/actors-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ActorService } from './services/actor.service';
import { ActorEditComponent } from './components/actor-edit/actor-edit.component';
import { RouterModule } from '@angular/router';
import { AddActorComponent } from './components/add-actor/add-actor.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieService } from './services/movie.service';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieAddComponent } from './components/movie-add/movie-add.component';
import { HomeComponent } from './components/home/home.component';
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';
// import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { CookieService } from 'ngx-cookie-service';
import { UsersComponent } from './components/users/users.component';
import { UserService } from './services/user.service';
import { FilterPipe } from './fiter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ActorsListComponent,
    ActorEditComponent,
    AddActorComponent,
    MoviesListComponent,
    MovieDetailsComponent,
    MovieAddComponent,
    HomeComponent,
    // LoginComponent,
    AuthComponent,
    UsersComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'actors', component: ActorsListComponent },
      { path: 'actors/:actorId', component: ActorEditComponent },
      { path: 'addActor', component: AddActorComponent },
      { path: 'movies', component: MoviesListComponent },
      { path: 'movies/:movieId', component: MovieDetailsComponent },
      { path: 'addmovie', component: MovieAddComponent },
      { path: 'home', component: HomeComponent },
      // { path: 'login', component: LoginComponent },
      // { path: '', redirectTo: 'auth', pathMatch: 'full' },
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'authorized', redirectTo: 'auth', pathMatch: 'full' },
      { path: 'auth', component: AuthComponent },
      { path: 'users', component: UsersComponent },
    ]),
  ],
  providers: [
    ActorService,
    MovieService,
    HttpService,
    AuthService,
    CookieService,
    AuthComponent,
    UserService,
    FilterPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
