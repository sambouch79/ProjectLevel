import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';
import { movieService } from './services/movie.service';
import { DetailsMovieComponent } from './details-movie/details-movie.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { SigninComponent } from './signin/signin.component';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'details/:id', component: DetailsMovieComponent },
  { path: 'notFound', component: NotFoundComponent },
  { path: 'addMovie', component: AddMovieComponent },
  { path: 'signin', component: SigninComponent },
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


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule
  ],
  providers: [movieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
