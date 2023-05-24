import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DetailsService } from 'src/app/service/details.service';
import { DataserviceService } from 'src/app/service/dataservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-created-table',
  templateUrl: './created-table.component.html',
  styleUrls: ['./created-table.component.css']
})
export class CreatedTableComponent implements OnInit {

  periodsub :any[] = [];
  perioddept :any[] = [];

  tablesub:any;
  tabledept:any;
  tablestaffid: any;
  tablestaffname: any;
  tablestaffdept:any;

  day1firstperiodsub:any;
  day1secondperiodsub:any;
  day1thirdperiodsub:any;
  day1fourthperiodsub:any;
  day1fifthperiodsub:any;
  day1sixthperiodsub:any;
  day1seventhperiodsub:any;
  day2firstperiodsub:any;
  day2secondperiodsub:any;
  day2thirdperiodsub:any;
  day2fourthperiodsub:any;
  day2fifthperiodsub:any;
  day2sixthperiodsub:any;
  day2seventhperiodsub:any;
  day3firstperiodsub:any;
  day3secondperiodsub:any;
  day3thirdperiodsub:any;
  day3fourthperiodsub:any;
  day3fifthperiodsub:any;
  day3sixthperiodsub:any;
  day3seventhperiodsub:any;
  day4firstperiodsub:any;
  day4secondperiodsub:any;
  day4thirdperiodsub:any;
  day4fourthperiodsub:any;
  day4fifthperiodsub:any;
  day4sixthperiodsub:any;
  day4seventhperiodsub:any;
  day5firstperiodsub:any;
  day5secondperiodsub:any;
  day5thirdperiodsub:any;
  day5fourthperiodsub:any;
  day5fifthperiodsub:any;
  day5sixthperiodsub:any;
  day5seventhperiodsub:any;



  day1firstperioddept:any;
  day1secondperioddept:any;
  day1thirdperioddept:any;
  day1fourthperioddept:any;
  day1fifthperioddept:any;
  day1sixthperioddept:any;
  day1seventhperioddept:any;
  day2firstperioddept:any;
  day2secondperioddept:any;
  day2thirdperioddept:any;
  day2fourthperioddept:any;
  day2fifthperioddept:any;
  day2sixthperioddept:any;
  day2seventhperioddept:any;
  day3firstperioddept:any;
  day3secondperioddept:any;
  day3thirdperioddept:any;
  day3fourthperioddept:any;
  day3fifthperioddept:any;
  day3sixthperioddept:any;
  day3seventhperioddept:any;
  day4firstperioddept:any;
  day4secondperioddept:any;
  day4thirdperioddept:any;
  day4fourthperioddept:any;
  day4fifthperioddept:any;
  day4sixthperioddept:any;
  day4seventhperioddept:any;
  day5firstperioddept:any;
  day5secondperioddept:any;
  day5thirdperioddept:any;
  day5fourthperioddept:any;
  day5fifthperioddept:any;
  day5sixthperioddept:any;
  day5seventhperioddept:any;

 


  constructor(private http: HttpClient,private detailss:DetailsService,private dataservice: DataserviceService, private router:Router, ) { }

  ngOnInit() {

    this.periodsub = this.dataservice.tablesub
    console.log(this.periodsub);
    this.perioddept = this.dataservice.tabledept
    console.log(this.perioddept);
    


    this.tablestaffid = this.dataservice.staffid
    this.tablestaffname = this.dataservice.staffname
    this.tablestaffdept = this.dataservice.staffdept


    // for (let i = 0; i < this.periodarr.length; i++) {
    //   this.tablesub = this.periodarr[i].subject
    //   this.tabledept = this.periodarr[i].deptname
    // }
    // console.log(this.tablesub);
    // console.log(this.tabledept);

  this.day1firstperiodsub= this.periodsub[1];
  this.day1secondperiodsub= this.periodsub[2];
  this.day1thirdperiodsub= this.periodsub[3];
  this.day1fourthperiodsub= this.periodsub[4];
  this.day1fifthperiodsub= this.periodsub[5];
  this.day1sixthperiodsub= this.periodsub[6];
  this.day1seventhperiodsub= this.periodsub[7];
  this.day2firstperiodsub= this.periodsub[8];
  this.day2secondperiodsub= this.periodsub[9];
  this.day2thirdperiodsub= this.periodsub[10];
  this.day2fourthperiodsub= this.periodsub[11];
  this.day2fifthperiodsub= this.periodsub[12];
  this.day2sixthperiodsub= this.periodsub[13];
  this.day2seventhperiodsub= this.periodsub[14];
  this.day3firstperiodsub= this.periodsub[15];
  this.day3secondperiodsub= this.periodsub[16];
  this.day3thirdperiodsub= this.periodsub[17];
  this.day3fourthperiodsub= this.periodsub[18];
  this.day3fifthperiodsub= this.periodsub[19];
  this.day3sixthperiodsub= this.periodsub[20];
  this.day3seventhperiodsub= this.periodsub[21];
  this.day4firstperiodsub= this.periodsub[22];
  this.day4secondperiodsub= this.periodsub[23];
  this.day4thirdperiodsub= this.periodsub[24];
  this.day4fourthperiodsub= this.periodsub[25];
  this.day4fifthperiodsub= this.periodsub[26];
  this.day4sixthperiodsub= this.periodsub[27];
  this.day4seventhperiodsub= this.periodsub[28];
  this.day5firstperiodsub= this.periodsub[29];
  this.day5secondperiodsub= this.periodsub[30];
  this.day5thirdperiodsub= this.periodsub[31];
  this.day5fourthperiodsub= this.periodsub[32];
  this.day5fifthperiodsub= this.periodsub[33];
  this.day5sixthperiodsub= this.periodsub[34];
  this.day5seventhperiodsub= this.periodsub[35];


  this.day1firstperioddept= this.perioddept[1];
  this.day1secondperioddept= this.perioddept[2];
  this.day1thirdperioddept= this.perioddept[3];
  this.day1fourthperioddept= this.perioddept[4];
  this.day1fifthperioddept= this.perioddept[5];
  this.day1sixthperioddept= this.perioddept[6];
  this.day1seventhperioddept= this.perioddept[7];
  this.day2firstperioddept= this.perioddept[8];
  this.day2secondperioddept= this.perioddept[9];
  this.day2thirdperioddept= this.perioddept[10];
  this.day2fourthperioddept= this.perioddept[11];
  this.day2fifthperioddept= this.perioddept[12];
  this.day2sixthperioddept= this.perioddept[13];
  this.day2seventhperioddept= this.perioddept[14];
  this.day3firstperioddept= this.perioddept[15];
  this.day3secondperioddept= this.perioddept[16];
  this.day3thirdperioddept= this.perioddept[17];
  this.day3fourthperioddept= this.perioddept[18];
  this.day3fifthperioddept= this.perioddept[19];
  this.day3sixthperioddept= this.perioddept[20];
  this.day3seventhperioddept= this.perioddept[21];
  this.day4firstperioddept= this.perioddept[22];
  this.day4secondperioddept= this.perioddept[23];
  this.day4thirdperioddept= this.perioddept[24];
  this.day4fourthperioddept= this.perioddept[25];
  this.day4fifthperioddept= this.perioddept[26];
  this.day4sixthperioddept= this.perioddept[27];
  this.day4seventhperioddept= this.perioddept[28];
  this.day5firstperioddept= this.perioddept[29];
  this.day5secondperioddept= this.perioddept[30];
  this.day5thirdperioddept= this.perioddept[31];
  this.day5fourthperioddept= this.perioddept[32];
  this.day5fifthperioddept= this.perioddept[33];
  this.day5sixthperioddept= this.perioddept[34];
  this.day5seventhperioddept= this.perioddept[35];


  console.log(this.dataservice.tablesub)
  console.log(this.dataservice.tabledept)
    

  }
  print_bill(){
    window.print();
  }
  back(){
    this.router.navigate(["/create-table"])
  }
}
