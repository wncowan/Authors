import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorsNewComponent } from './authors-new/authors-new.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthorComponent } from './author/author.component';
import { QuotesComponent } from './quotes/quotes.component';
import { QuotesNewComponent } from './quotes-new/quotes-new.component'

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    AuthorsNewComponent,
    NotFoundComponent,
    AuthorComponent,
    QuotesComponent,
    QuotesNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }