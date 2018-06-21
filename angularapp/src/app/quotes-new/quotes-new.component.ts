import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-quotes-new',
  templateUrl: './quotes-new.component.html',
  styleUrls: ['./quotes-new.component.css']
})
export class QuotesNewComponent implements OnInit {
  errors: any;
  quote: any;
  author_id: any;
  author: any;
  constructor(
    private _http: HttpService, 
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe(Params => {
      this.author_id = Params['id']
      this._http.getAuthor(this.author_id).subscribe(data => {
        this.author = data["result"]["name"];
      });
    });
    this.quote = {text: "", votes: 0};
  }

  submit() {
    this.errors = [];
    //Front end validations (back-end response is too complicated to parse through because error is under quote.n.text for the nth quote).
    if (!this.quote.text) {
      this.errors.push("Quote cannot be blank.")
    } else if (this.quote.text.length < 3) {
      this.errors.push("Quote must be at least 3 characters long.")
    } else {
      this._http.postQuote(this.author_id, this.quote).subscribe(data => {
        this._router.navigate([`/authors/${this.author_id}/quotes`]);
      });
    }
  }

}