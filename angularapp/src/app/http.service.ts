import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  postAuthor(author) {
    return this._http.post('/api/authors',author);
  }
  getAuthors(){
    return this._http.get('/api/authors');
  }
  getAuthor(id) {
    return this._http.get(`api/authors/${id}`);
  }
  deleteAuthor(id){
    return this._http.delete(`/api/authors/${id}`);
  }
  putAuthor(id, author){
    return this._http.put(`/api/authors/${id}`, author);
  }
  postQuote(author_id, quote) {
    return this._http.put(`/api/authors/${author_id}/quote`, quote);
  }

}