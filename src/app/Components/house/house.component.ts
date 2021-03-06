import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomHouse } from 'src/app/CustomClass/custom-house';
import { CustomHouseService } from 'src/app/CustomService/custom-house.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  result: CustomHouse[];
  res = new CustomHouse;
  resUp = new CustomHouse;
  id:string;
  srv:CustomHouseService
  ngZone:NgZone;
  router:Router;
 

  constructor(srv:CustomHouseService,ngZone:NgZone,router:Router) {
    this.ngZone = ngZone;
    this.router = router;
    this.srv = srv;
   }

   inser:boolean;
   showed:boolean;
   updat:boolean;


  ngOnInit(): void {
    this.ShowHouses();
    this.inser=true; 
    this.showed = false;
    this.updat = true;
  }

  show():void{
    this.inser=true; 
    this.showed = false;
    this.updat = true;
    this.ShowHouses()
  }

  insert():void{
    this.inser=false; 
    this.showed = true;
    this.updat = true;
  }

  update():void{
    this.inser=true; 
    this.showed = true;
    this.updat = false;
  }
  

  ShowHouses():void{
    this.srv.getHouses().subscribe((data:CustomHouse[])=>{
      this.result = data;
    })
  }

  InsertHouse(){
    this.srv.postHouse(this.res).subscribe((data:boolean)=>{
      if(data){
        alert("Data inserted");
        window.location.reload()
      }
    
    })
  }

  getbyId(id:string){
    this.id = id;
    this.srv.getbyIdHouse(this.id).subscribe((data:CustomHouse)=>{
      this.resUp = data;
    })
  }

  updateHouse(){
    console.log(this.resUp);
    this.srv.putHouse(this.id,this.resUp).subscribe((data:string)=>{
      console.log(this.resUp);
      alert(data);
      //window.location.reload();
    })
  }
}
