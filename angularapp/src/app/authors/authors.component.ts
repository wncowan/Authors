import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  data: any;
  ascending = true;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this.getData(true);
  }

  delete(id) {
    this._http.deleteAuthor(id).subscribe(data => {
      console.log("delete data:");
      console.log(data);
    });
    this.getData(false);
  }

  getData(sort) {
    this._http.getAuthors().subscribe(data => {
      this.data = data
      console.log("data:");
      console.log(data);
      if(sort) {
        this.authorSort();
      }
    });
  }

  //Only sorts by first name -- not sure if corresponding up/down arrows are in sync.
  authorSort(){
    if(!this.ascending) {
      this.data.result.sort(function(a, b){
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1 
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
      }); 
    } else {
      this.data.result.sort(function(a, b){
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA > nameB) //sort string ascending
            return -1 
        if (nameA < nameB)
            return 1
        return 0 //default return value (no sorting)
      });
    }
    this.ascending = !this.ascending;
  }

}