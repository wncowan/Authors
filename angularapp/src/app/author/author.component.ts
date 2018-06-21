import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  id: any;
  data: any;
  editAuthor: any;
  errors: any;

  constructor(
    private _route: ActivatedRoute,
    private _http: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.editAuthor = { name: "" };
    this._route.params.subscribe(Params => {
      this.id = Params['id'];
      this.getAuthor(this.id);
    });
  }

  getAuthor(id){
    this._http.getAuthor(id).subscribe(data => {
      if(data["error"]) {
        this._router.navigate(['/notfound'])
      } else {
        console.log("edit data: ");
        console.log(data);
        this.data = data;
        this.editAuthor = { name: data["result"]["name"] };
      }
    });
  }

  submit() {
    var id = this.id;
    this._http.putAuthor(id, this.editAuthor).subscribe(data=> {
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
  }

}