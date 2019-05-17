import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  lang: string = null;
  index: number;
  data: Array<any> = null;
  showAnswer: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, public http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.lang = this.activatedRoute.snapshot.paramMap.get('lang');
    this.http.get('assets/data/'+this.lang+'.json').subscribe(data => {
      console.log(data);
      this.data = data['entries'];
      this.index = this.randomInt(this.data.length);
    });
  }

  answer(): void {
    this.showAnswer = true;
  }

  next(): void {
    let count = 0;
    do {
      this.index = this.randomInt(this.data.length);
    }
    while(!this.data[this.index].visible && ++count!=this.data.length+1);
    this.showAnswer = false;
  }

  delete(): void {
    this.data[this.index].visible = false;
    if(this.data.filter(d => d.visible).length==0) {
      this.router.navigateByUrl("/");
    }
    else {
      this.next();
    }
  }

  getCurrent(): string {
    if(!this.data) return
    console.log(this.data[this.index]);
    return this.data[this.index];
  }

  private randomInt(max: number) {
      return Math.floor(Math.random() * max); 
  }
}
