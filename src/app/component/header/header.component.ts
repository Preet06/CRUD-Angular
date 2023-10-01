import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnChanges{
  show: boolean;
  
  ngOnInit(): void {
    this.show = true
  }
  ngOnChanges() {
    console.log(this.show,"ngonchangge")
  }

  home(): void{
    this.show = true;
  }

  emp(): void{
    this.show = false;
  }

  


  

}
