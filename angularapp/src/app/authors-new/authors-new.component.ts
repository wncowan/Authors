import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors-new',
  templateUrl: './authors-new.component.html',
  styleUrls: ['./authors-new.component.css']
})
export class AuthorsNewComponent implements OnInit {
  errors: any;
  newAuthor: any;

  constructor(
    private _http: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newAuthor = { name: "" }
  }

  submit() {
    //Create object for post.
    //Use HTTP service to send a post request to the server.
    console.log("this.newAuthor:");
    console.log(this.newAuthor);
    this._http.postAuthor(this.newAuthor).subscribe(data => {
      console.log("data");
      console.log(data);
      if (data["message"] == "error") {
        this.errors = [];
        if (data["error"]["code"] == 11000) {
          this.errors.push("Author already added.");
        }
        for (let e in data["error"]["errors"]){
          let error = data["error"]["errors"][e]["properties"]["message"];
          this.errors.push(error);
        }
      }
      else {
        this._router.navigate(['/authors']);
      }
    });
    //Reset object.
    this.newAuthor = { name: "" };
  }
} 