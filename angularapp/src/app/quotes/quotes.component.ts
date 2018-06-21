import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  ascending = false;
  author_id;
  author;
  constructor(
    private _route: ActivatedRoute,
    private _http: HttpService
  ) { }

  ngOnInit() {
    this._route.params.subscribe(Params => {
      
      console.log("Params: ");
      console.log(Params);
      this.author_id = Params['id'];
    });

    this._http.getAuthor(this.author_id).subscribe(data=>{
      this.author = data["result"];
      // console.log("this.author");
      // console.log(this.author);

      console.log('this.author["quotes"]');
      console.log(this.author["quotes"]);
      // for (let quote in this.author["quotes"]) {
      //   console.log("quote");
      //   console.log(this.author["quotes"][quote].text);
      // }
    });

  }

  vote(i,up){
    if(up){

      console.log()
      this.author["quotes"][i]["votes"]++;
    } else {
      this.author["quotes"][i]["votes"]--;
    }
    this.updateAuthor();
  }

  delete(i){
    this.author["quotes"].splice(i,1);
    this.updateAuthor();
  }

  updateAuthor(){
    this._http.putAuthor(this.author_id, this.author).subscribe()
  }

  quoteSort(){
    if(!this.ascending) {
      this.author["quotes"].sort(function(a, b){
        var valueA=a.votes, valueB=b.votes
        if (valueA < valueB) //sort string ascending
            return -1 
        if (valueA > valueB)
            return 1
        return 0 //default return value (no sorting)
      }); 
    } else {
      this.author["quotes"].sort(function(a, b){
        var valueA=a.votes, valueB=b.votes
        if (valueA > valueB) //sort string ascending
            return -1 
        if (valueA < valueB)
            return 1
        return 0 //default return value (no sorting)
      });
    }
    this.ascending = !this.ascending;
  }

}