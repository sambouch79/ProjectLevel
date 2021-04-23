import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { movieService } from './services/movie.service';
import { DetailsMovieComponent } from './details-movie/details-movie.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { authService } from './services/auth.service';
import { MyMoviesComponent } from './my-movies/my-movies.component';
import { authGuard } from './services/auth-Gaurd.service';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'details/:id', component: DetailsMovieComponent },
  { path: 'notFound', component: NotFoundComponent },
  { path: 'addMovie', component: AddMovieComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'myMovies', canActivate: [authGuard], component: MyMoviesComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'notFound' }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    HomeComponent,
    ContactComponent,
    AboutUsComponent,
    EditComponent,
    DetailsMovieComponent,
    NotFoundComponent,
    AddMovieComponent,
    SigninComponent,
    SignupComponent,
    MyMoviesComponent,


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [movieService, authService, authGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
