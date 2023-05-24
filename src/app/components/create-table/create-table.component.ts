import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { count, filter, map, startWith } from 'rxjs/operators';
import { DetailsService } from 'src/app/service/details.service';

// import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/service/dataservice.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

// interface dept {
//   department:string,
// }

export interface individual_staff {
  staff_id: any;
  staff_data: {
    staff_name: any;
    staff_arr:  any[];
    class_arr: individual_class[];
  };
}

export interface individual_class {
  dept: any;
  year: any;
  sem: any;
  subject: any;
  position: any[];
}

let testing: individual_staff[] = [];

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css'],
})
export class CreateTableComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  details: any;
  subdetails: any;
  temp_name: any;
  tempvar_dept: any;
  temp_dept: any;
  actdata: any;
  actsem: any;
  storereg: any;
  storedept: any;
  storeyear: any;
  storesem: any;
  showstaffsid: any;
  showstaffs: any;
  showreg: any;
  showdept: any;
  showyear: any;
  showsem: any;
  showsub: any;
  perriod: any;
  storesub: any = [];
  storestf: any;
  storeid: any;
  storeperiod: any;
  storecredit: any;

  formdata = {
    staffs: '',
    dept: '',
    id: '',
    regulattion: '',
    yearr: '',
    sem: '',
    subb: '',
    period: '',
    credit: '',
  };
  submit = false;

  // staffsFormControl = new FormControl('', [Validators.required,]);
  // deptFormControl = new FormControl('', [Validators.required,]);
  // regulattionFormControl = new FormControl('', [Validators.required,]);
  // subjectFormControl = new FormControl('', [Validators.required,]);
  // staffidFormControl = new FormControl('', [Validators.required,]);
  // idFormControl = new FormControl('', [Validators.required,]);
  // yearFormControl = new FormControl('', [Validators.required,]);
  // semFormControl = new FormControl('', [Validators.required,]);
  // subFormControl = new FormControl('', [Validators.required,]);
  // periodFormControl = new FormControl('', [Validators.required,]);
  // creditFormControl = new FormControl('', [Validators.required,]);

  staffs: string[] = [];
  dept: string[] = [];
  id: string[] = [];
  reg: string[] = [];
  sem: string[] = [];
  yearr: string[] = [];
  sub: string[] = [];
  arr: any[] = [];
  submits: any[] = [];
  temparr: any[] = [];
  position: any[] = [];
  totval: any = [];
  vardept: any = [];
  tempstorre: any;
  temp_sno: any[] = [];
  delarr: any;
  newperiod: any[] = [];
  newtemparr: any[] = [];
  lastarr: any[] = [];
  tablearr: any[] = [];

  staffscollection: any[] = [];

  tables = [0];

  //controls
  my_Control_staffs = new FormControl();
  my_Control_dept = new FormControl();
  my_Control_id = new FormControl();
  my_Control_yearr = new FormControl();
  my_Control_reg = new FormControl();
  my_Control_sem = new FormControl();
  my_Control_sub = new FormControl();
  my_Control_period = new FormControl();
  my_Control_credit = new FormControl();

  public userProfileForm = new FormGroup({
    staffssname: new FormControl(''),
    deptname: new FormControl(''),
    id: new FormControl(''),
    regulation: new FormControl(''),
    year: new FormControl(''),
    semester: new FormControl(''),
    subject: new FormControl(''),
    period: new FormControl(''),
    credit: new FormControl(''),
    position: new FormControl(this.temparr),
    sno: new FormControl(),
  });

  //filtered
  filteredOption_staff: Observable<string[]> | undefined;
  filteredOption_dept: Observable<string[]> | undefined;
  filteredOption_id: Observable<string[]> | undefined;
  filteredOption_idno: Observable<string[]> | undefined;
  filteredOption_yearr: Observable<string[]> | undefined;
  filteredOption_reg: Observable<string[]> | undefined;
  filteredOption_sem: Observable<string[]> | undefined;
  filteredOption_sub: Observable<string[]> | undefined;
  tempsub: any;
  temp_period: any;
  temp_credit: any;
  form: any;
  temmpmainval: any;
  val_element: any = null;
  val_elements: any;
  notPresent: any;
  finalarrr: any;
  storevalue: any;
  tempval: any[] = [];
  temppp_id: any;
  userid: any;
  newwwarr: any[] = [];
  newids: any[] = [];
  temps_id: any;
  indexVal: any;
  min: any;
  max: any;

  //ends
  //private filter st
  private _filter_staff(value: string) {
    const filter_Value = value.toLowerCase();
    return this.staffs.filter((staffs) =>
      staffs.toLowerCase().includes(filter_Value)
    );
  }
  private _filter_dept(value: string) {
    const filter_Value = value.toLowerCase();
    return this.dept.filter((dept) => dept.toLowerCase().includes(filter_Value));
  }
  private _filter_id(value: string) {
    const filter_Value = value.toLowerCase();
    return this.id.filter((id) => id.toLowerCase().includes(filter_Value));
  }

  private _filter_reg(value: string) {
    const filter_Value = value.toLowerCase();
    return this.reg.filter((reg) => reg.toLowerCase().includes(filter_Value));
  }

  private _filter_yearr(value: string) {
    const filter_Value = value.toLowerCase();
    return this.yearr.filter((yearr) =>
      yearr.toLowerCase().includes(filter_Value)
    );
  }

  private _filter_sem(value: string) {
    const filter_Value = value.toLowerCase();
    return this.sem.filter((sem) => sem.toLowerCase().includes(filter_Value));
  }
  private _filter_sub(value: any) {
    const filter_Value = value.toLowerCase();
    return this.sub.filter((sub) => sub.toLowerCase().includes(filter_Value));
  }

  onSelect() {
    // console.log(
    //   this.userProfileForm.value,
    // );
    // this.submits.push(this.userProfileForm.value)
    // console.log(this.submits);

    this.perriod = this.userProfileForm.value.period;
    console.log(this.perriod);
  }

  //private filter ends

  constructor(
    private detailss: DetailsService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public SVC: DataserviceService
  ) {
    this.userForm = this.fb.group({
      staffsFormControl: ['', Validators.required],
      deptFormControl: ['', Validators.required],
      regulattionFormControl: ['', Validators.required],
      subjectFormControl: ['', Validators.required],
      staffidFormControl: ['', Validators.required],
      idFormControl: ['', Validators.required],
      yearFormControl: ['', Validators.required],
      semFormControl: ['', Validators.required],
      subFormControl: ['', Validators.required],
      periodFormControl: ['', Validators.required],
      creditFormControl: ['', Validators.required],

      Referrals: this.fb.array([]),
    });
  }

  public checkErrorUserForm = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  };

  // get ReferralsFormArr(): FormArray {
  //   return this.userForm.get('Referrals') as FormArray;
  // }

  // getReferralsFormArr(index:any): FormGroup {
  //   const formGroup = this.ReferralsFormArr.controls[index] as FormGroup;
  //   return formGroup;
  // }

  // addReferral(): void {
  //   if (this.ReferralsFormArr.length <5) {
  //     this.ReferralsFormArr.push(
  //       this.fb.group({
  //         staffsFormControlRef: ['', Validators.required],
  //         deptFormControlRef: ['', Validators.required],
  //         regulattionFormControlRef: ['', Validators.required],
  //         subjectFormControlRef: ['', Validators.required],
  //         staffidFormControlRef: ['', Validators.required],
  //         idFormControlRef: ['', Validators.required],
  //         yearFormControlRef: ['', Validators.required],
  //         semFormControlRef: ['', Validators.required],
  //         subFormControlRef: ['', Validators.required],
  //         periodFormControlRef: ['', Validators.required],
  //         creditFormControlRef: ['', Validators.required],

  //       })
  //     );
  //   }
  // }

  // removeReferral(index:any) {
  //   this.ReferralsFormArr.removeAt(index);
  // }

  // onSubmits(values:any) {
  //   console.log(values);

  //   var formData: any = new FormData();

  //   this.http.post('http://localhost:4000/api/mypage.php', formData).subscribe(
  //     (response) => console.log(response),
  //     (error) => console.log(error)
  //   );
  // }

  ngOnInit() {
    // function getRandomItem(arr:any) {
    //   const randomIndex = Math.floor(Math.random() * arr.length);
    //   const item = arr[randomIndex];
    //   return item;
    // }
    // const array = [[1, 'hello', 5, 8],[1,5,8],[8,"siraj",6],[7,9,2,4]];
    // const result = getRandomItem(array);
    // console.log(result);

    this.detailss.subDetails().subscribe((results: any) => {
      this.subdetails = results.datas;
      console.log(this.subdetails);
    });
    this.detailss.getDetails().subscribe((result: any) => {
      this.details = result.data;
      console.log(this.details);
      //filtered opt start
      for (let i = 0; i < this.details.length; i++) {
        this.temp_name = this.details[i].Name;
      }
      this.filteredOption_staff = this.my_Control_staffs.valueChanges.pipe(
        startWith(''),
        map((value1) => this._filter_staff(value1))
      );
      this.filteredOption_dept = this.my_Control_dept.valueChanges.pipe(
        startWith(''),
        map((value2) => this._filter_dept(value2))
      );
      this.filteredOption_id = this.my_Control_id.valueChanges.pipe(
        startWith(''),
        map((value3) => this._filter_id(value3))
      );

      this.filteredOption_reg = this.my_Control_reg.valueChanges.pipe(
        startWith(''),
        map((value4) => this._filter_reg(value4))
      );

      //filtered opt end

      //tables name call
      for (let i = 0; i < this.details.length; i++) {
        this.staffs.push(this.details[i].Name);
      }

      for (let i = 0; i < this.details.length; i++) {
        this.id.push(this.details[i].StaffID);
      }

      for (let i = 0; i < this.subdetails.length; i++) {
        if (this.reg.indexOf(this.subdetails[i].regulations) === -1) {
          this.reg.push(this.subdetails[i].regulations);
        }
      }
      this.storevalue = 35 - this.arr.length;
      console.log(this.storevalue);
    });
  }

  //applyfilters starts
  apply_Filter_staff(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.my_Control_staffs.value);
  }
  apply_Filter_dept(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.my_Control_dept.value);
  }

  apply_Filter_id(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.my_Control_id.value);
  }

  apply_Filter_reg(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.my_Control_reg.value);
    console.log(event);
  }
  apply_Filter_yearr(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.my_Control_yearr.value);
    console.log(event);
  }
  apply_Filter_sem(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.my_Control_sem.value);
    console.log(event);
  }
  apply_Filter_sub(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.my_Control_sub.value);
    console.log(event);
  }
  //applyfilters ends

  onSelectionChangeid(valueid: any) {
    this.storeid = valueid;
    console.log(this.storeid);

    for (let i = 0; i < this.details.length; i++) {
      if (this.details[i].StaffID == this.storeid) {
        this.temp_name = this.details[i].Name;
        console.log(this.temp_name);
        this.tempvar_dept = this.details[i].Dept;
        console.log(this.tempvar_dept);

        this.my_Control_staffs.setValue(this.temp_name);
      }
    }
  }

  onSelectionChangestaffs(valuestaff: any) {
    for (let i = 0; i < this.details.length; i++) {
      if (this.details[i].Name == valuestaff) {
        this.temps_id = this.details[i].StaffID;
        console.log(this.temp_name);
        this.tempvar_dept = this.details[i].Dept;
        console.log(this.tempvar_dept);

        this.my_Control_id.setValue(this.temps_id);
      }
    }
  }

  onSelectionChange(valuereg: any) {
    this.storereg = valuereg;
    console.log(this.storereg);

    for (let i = 0; i < this.subdetails.length; i++) {
      if (
        this.subdetails[i].regulations == valuereg &&
        this.dept.indexOf(this.subdetails[i].dept) === -1
      ) {
        this.dept.push(this.subdetails[i].dept);
        console.log(this.dept);
      }
    }

    this.filteredOption_dept = this.my_Control_dept.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter_dept(value))
    );
  }

  onSelectionChangedept(valuedept: any) {
    this.storedept = valuedept;
    console.log(this.storedept);

    this.yearr = [];
    for (let i = 0; i < this.subdetails.length; i++) {
      if (
        this.subdetails[i].dept == valuedept &&
        this.yearr.indexOf(this.subdetails[i].year) === -1
      ) {
        this.yearr.push(this.subdetails[i].year);
        console.log(this.yearr);
      }
    }
    this.filteredOption_yearr = this.my_Control_yearr.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter_yearr(value))
    );
  }

  onSelectionChangeyear(valueyear: any) {
    this.storeyear = valueyear;
    console.log(this.storeyear);

    this.sem = [];
    for (let i = 0; i < this.subdetails.length; i++) {
      if (
        this.subdetails[i].year == valueyear &&
        this.sem.indexOf(this.subdetails[i].semester) === -1
      ) {
        this.sem.push(this.subdetails[i].semester);
        console.log(this.sem);
      }
    }
    
    for (let i = 0; i < this.subdetails.length; i++) {
      if (this.subdetails[i].year == valueyear && this.subdetails[i].dept == this.storedept) {
        
        this.min = this.subdetails[i].min
        this.max = this.subdetails[i].max
      
      }
    }
console.log(this.min);
console.log(this.max);


    this.filteredOption_sem = this.my_Control_sem.valueChanges.pipe(
      startWith(''),
      map((valueyear) => this._filter_sem(valueyear))
    );
  }

  onSelectionChangesub(valuesem: any) {
    this.storesem = valuesem;
    console.log(this.storesem);

    this.sub = [];
    for (let i = 0; i < this.subdetails.length; i++) {
      if (
        this.subdetails[i].regulations == this.storereg &&
        this.subdetails[i].dept == this.storedept &&
        this.subdetails[i].year == this.storeyear &&
        this.subdetails[i].semester == this.storesem &&
        this.sub.indexOf(this.subdetails[i].subject) === -1
      ) {
        this.sub.push(this.subdetails[i].subject);
        console.log(this.sub);
      }
    }
    this.filteredOption_sub = this.my_Control_sub.valueChanges.pipe(
      startWith(''),
      map((valuesem) => this._filter_sub(valuesem))
    );
  }
  onSelectionChangesubj(valuesub: any) {
    this.storesub = valuesub;
    console.log(this.storesub);
    for (let i = 0; i < this.subdetails.length; i++) {
      if (this.subdetails[i].subject == valuesub) {
        this.temp_period = this.subdetails[i].period;
        console.log(this.temp_period);
        this.my_Control_period.setValue(this.temp_period);
        this.temp_credit = this.subdetails[i].credit;
        console.log(this.temp_credit);
        this.my_Control_credit.setValue(this.temp_credit);
        this.temp_sno = this.subdetails[i].sno;
        console.log(this.temp_sno);
        this.my_Control_period.disable();
        this.my_Control_credit.disable();
      }
    }
  }

  onSelectionChangecredit(valuecredit: any) {
    this.storecredit = valuecredit;
    console.log(this.storecredit);
  }
  onSubmit() {
    this.notPresent = 1;
    for (let i = 0; i < this.submits.length; i++) {
      if (this.temp_sno == this.submits[i].sno) {
        this.notPresent = 0;
      }
    }

    if (this.notPresent) {
      if (this.val_element != null) {
        Swal.fire({
          title: 'Do you want to Edit ?',
          showCancelButton: true,
          confirmButtonText: 'Save',
        }).then((result) => {
          if (result.isConfirmed) {
            this.submits[this.val_element] = this.userProfileForm.value;

            this.val_element = null;
            let index;
            for (var i = 0; i < this.delarr.length; i++) {
              index = this.arr.indexOf(this.delarr[i]);
              if (index > -1) {
                this.arr.splice(index, 1);
              }
            }

            let indexs;
            for (let j = 0; j < testing.length; j++) {
            for (var i = 0; i < this.delarr.length; i++) {
              indexs = testing[j].staff_data.staff_arr.indexOf(this.delarr[i]);
              if (indexs > -1) {
                testing[j].staff_data.staff_arr.splice(indexs, 1);
    
              }
              console.log(testing[j].staff_data.staff_arr);
              
            }
            }
            for (let j = 0; j < testing.length; j++) {
    
            testing[j].staff_data.class_arr.splice(this.val_elements, 1);
            console.log(testing[j].staff_data.class_arr);
            }
            this.lastarr = this.arr;
            console.log(this.lastarr);

            console.log(this.arr);

            this.generatenum();

            this.submits = this.submits.reduce(
              (a: any[], b: { subject: any }) => {
                if (!a.find((submits) => submits.subject === b.subject)) {
                  a.push(b);
                }
                return a;
              },
              []
            );
            this.storevalue = 35 - this.arr.length;
            console.log(this.storevalue);

           this.adddata()

            Swal.fire('Editted Successfully!', '', 'success');
          } else {
            Swal.fire('Changes Canccel', 'It has been Cancelled', 'error');
          }
        });
      } else {
        if (this.userProfileForm.valid) {
          this.showstaffsid = this.userProfileForm.value.id;
          console.log(this.showstaffsid);

          this.generatenum();

          this.storevalue = 35 - this.arr.length;
          console.log(this.storevalue);

          // for (var i = 0; i < this.submits.length; i++) {

          // }

          // this.my_Control_staffs.disable();
          // this.my_Control_id.disable();
          //  if(this.showstaffs == this.staffscollection[this.showstaffsid] ){

          //  }


          


          console.log(this.staffscollection);
          console.log(this.arr);
          console.log(this.temparr);

          this.submits = this.submits.reduce(
            (a: any[], b: { subject: any }) => {
              if (!a.find((submits) => submits.subject === b.subject)) {
                a.push(b);
              }
              return a;
            },
            []
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Filled Required ',
          }).then((result) => {
            if (result.isConfirmed) {
              this.my_Control_staffs.enable();
              this.my_Control_id.enable();
            }
          });
        }
        if (this.arr.length == 35) {
          this.my_Control_staffs.disable();
          this.my_Control_id.disable();
          this.my_Control_dept.disable();
          this.my_Control_yearr.disable();
          this.my_Control_reg.disable();
          this.my_Control_sem.disable();
          this.my_Control_sub.disable();
          this.my_Control_period.disable();
          this.my_Control_credit.disable();
        }
        this.adddata();
      }
    } else {
      Swal.fire('Cancelled', 'Its already Submitted:)', 'error');
    }
  }

  // update(){

  //   this.tempstorre = {id:this.userProfileForm.value.sno,subject:this.userProfileForm.value.subject,period:this.userProfileForm.value.period, }
  //   console.log(this.tempstorre);
  //   // for (let i = 0; i < this.finalstore.length; i++) {
  //   //   if (this.finalstore[i].sno == this.tempstorre.id) {
  //   //     // console.log(this.userProfileForm.value.subject);
  //   //     this.finalstore[i].period = this.tempstorre.period;
  //   //     this.finalstore[i].period = this.userProfileForm.value.period
  //   //     console.log(this.finalstore[i].period);
  //   //     this.finalstore[i].subject = this.tempstorre.subject;
  //   //     this.finalstore[i].subject = this.userProfileForm.value.subject
  //   //     console.log(this.finalstore[i].subject);
  //   //     //removes duplicates
  //       this.finalstore = this.finalstore.reduce((a: any[], b: { subject: any }) => {
  //         if (!a.find((finalstore) =>finalstore.subject === b.subject)) {
  //           a.push(b);
  //         }
  //         return a;
  //       }, []);
  //       // this.ELEMENT_DATA[i].amount = this.ELEMENT_DATA[i].quantity * this.ELEMENT_DATA[i].price;
  //   //   }
  //   // }
  // }

  adddata() {
    if (this.arr.length == 35) {
      this.my_Control_staffs.disable();
      this.my_Control_id.disable();
      this.my_Control_dept.disable();
      this.my_Control_yearr.disable();
      this.my_Control_reg.disable();
      this.my_Control_sem.disable();
      this.my_Control_sub.disable();
      this.my_Control_period.disable();
      this.my_Control_credit.disable();
    } else {
      // this.dept = [];
      // this.yearr = [];
      this.sem = [];
      this.sub = [];
      this.my_Control_dept.setValue('');
      this.my_Control_yearr.setValue('');
      this.my_Control_reg.setValue('');
      this.my_Control_sem.setValue('');
      this.my_Control_sub.setValue('');
      this.my_Control_period.setValue('');
      this.my_Control_credit.setValue('');
      // this.my_Control_staffs.disable();
      // this.my_Control_id.disable();
    }
  }

  generate(quantity: any, min:any, max: any) {
    let count = 0;
    while (count < quantity) {
      var candidateInt = Math.floor(Math.random() * (max - min + 1) + min);
      if (this.arr.indexOf(candidateInt) === -1) {
        this.temparr.push(candidateInt);
        this.arr.push(candidateInt);
        count++;
      }
    }
    return this.temparr;
  }

  generatenum() {
    this.temparr = [];

    this.storevalue = 35 - this.arr.length;
    console.log(this.storevalue);

    if (this.storevalue >= this.temp_period) {


      for (let i = 0; i < this.submits.length; i++) {
        this.newids = this.submits[i].id;
      }
      


      this.generate(this.temp_period,1,35);
      // this.generate(this.temp_period,1,35);

      console.log(this.arr);
      this.userProfileForm.value.position = this.temparr;
      this.userProfileForm.value.sno = this.temp_sno;
      console.log(this.temparr);
      console.log(this.userProfileForm.value);
      this.submits.push(this.userProfileForm.value);

      console.log(this.submits);
      this.indexVal = testing.findIndex(
        (x) => x.staff_id === this.userProfileForm.value.id
      );

      console.log(this.indexVal);
      
      if (this.indexVal!=-1) {
        console.log(this.userProfileForm.value.position)
        // if(this.userProfileForm.value.position)
        for(var el of this.temparr){
          testing[this.indexVal].staff_data.staff_arr.push(el);
          

        }
        console.log(testing[this.indexVal].staff_data.staff_arr);

        
          // testing[indexVal].staff_data.staff_arr
          // staff_arr.push(
          // this.userProfileForm.value.position
        // );
        testing[this.indexVal].staff_data.class_arr.push({
          dept: this.userProfileForm.value.deptname,
          year: this.userProfileForm.value.year,
          sem: this.userProfileForm.value.semester,
          subject: this.userProfileForm.value.subject,
          position: [this.userProfileForm.value.position],
        });
      } 
      else {
        let newArr=[];
        for(var el of this.temparr){
          newArr.push(el);
        }

        console.log();
        
        testing.push({
          staff_id: this.userProfileForm.value.id,
          staff_data: {
            staff_name: this.userProfileForm.value.staffssname,
            staff_arr: newArr,
            class_arr: [
              {
                dept: this.userProfileForm.value.deptname,
                year: this.userProfileForm.value.year,
                sem: this.userProfileForm.value.semester,
                subject: this.userProfileForm.value.subject,
                position: [this.userProfileForm.value.position],
              },
            ],
          },
        });
      }

      for (let j = 0; j < testing.length; j++) {
        console.log(testing[j].staff_data.staff_arr);
      }

      console.log(testing);
    } else {
      Swal.fire(
        `Subject Overload... Remaining Period are :${this.storevalue}`
      );
    }
  }

  //  let url = ""
  // let url = "https://jsonplaceholder.typicode.com/todos/1"

  deleteProduct(elements: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.val_elements = elements;
        console.log(this.val_elements);

        this.delarr = this.submits[elements].position;
        console.log(this.delarr);

        let index;
        for (var i = 0; i < this.delarr.length; i++) {
          index = this.arr.indexOf(this.delarr[i]);
          if (index > -1) {
            this.arr.splice(index, 1);
          }
        }
        let indexs;
        for (let j = 0; j < testing.length; j++) {
        for (var i = 0; i < this.delarr.length; i++) {
          indexs = testing[j].staff_data.staff_arr.indexOf(this.delarr[i]);
          if (indexs > -1) {
            testing[j].staff_data.staff_arr.splice(indexs, 1);

          }
          console.log(testing[j].staff_data.staff_arr);
          
        }
        }
        for (let j = 0; j < testing.length; j++) {

        testing[j].staff_data.class_arr.splice(this.val_elements, 1);
        console.log(testing[j].staff_data.class_arr);
        }

        this.storevalue = 35 - this.arr.length;
        console.log(this.storevalue);

        this.lastarr = this.arr;
        console.log(this.lastarr);
        this.submits.splice(this.val_elements, 1);

        
        console.log(testing);
        
        Swal.fire('Deleted!', 'It has been deleted.', 'success');
      } else {
        Swal.fire('Cancelled', 'It has been Cancelled', 'error');
      }
    });
  }

  EditDetails(elements: any) {
    this.val_element = elements;
    // this.dept
    // this.yearr
    // this.sem
    // this.sub

    console.log(this.dept);
    console.log(this.yearr);
    console.log(this.sem);
    console.log(this.sub);

    this.my_Control_staffs.disable();
    this.my_Control_id.disable();
    this.my_Control_period.disable();
    this.my_Control_credit.disable();

    this.my_Control_id.setValue(this.submits[this.val_element].id);
    this.my_Control_staffs.setValue(this.submits[this.val_element].staffssname);
    this.my_Control_reg.setValue(this.submits[this.val_element].regulation);
    this.my_Control_dept.setValue(this.submits[this.val_element].deptname);
    this.my_Control_yearr.setValue(this.submits[this.val_element].year);
    this.my_Control_sem.setValue(this.submits[this.val_element].semester);
    this.my_Control_sub.setValue(this.submits[this.val_element].subject);
    this.my_Control_period.setValue(this.submits[this.val_element].period);
    this.my_Control_credit.setValue(this.submits[this.val_element].credit);

    this.delarr = this.submits[elements].position;
    console.log(this.delarr);

    // this.storeyear = valueyear;
    // console.log(this.storeyear);

    this.sem = [];
    for (let i = 0; i < this.subdetails.length; i++) {
      if (
        this.subdetails[i].year == this.submits[this.val_element].year &&
        this.sem.indexOf(this.subdetails[i].semester) === -1
      ) {
        this.sem.push(this.subdetails[i].semester);
        console.log(this.sem);
      }
    }

    this.filteredOption_sem = this.my_Control_sem.valueChanges.pipe(
      startWith(''),
      map((valueyear) => this._filter_sem(valueyear))
    );

    this.sub = [];
    for (let i = 0; i < this.subdetails.length; i++) {
      if (
        this.subdetails[i].regulations ==
          this.submits[this.val_element].regulation &&
        this.subdetails[i].dept == this.submits[this.val_element].deptname &&
        this.subdetails[i].year == this.submits[this.val_element].year &&
        this.subdetails[i].semester ==
          this.submits[this.val_element].semester &&
        this.sub.indexOf(this.subdetails[i].subject) === -1
      ) {
        this.sub.push(this.subdetails[i].subject);
        console.log(this.sub);
      }
    }
    this.filteredOption_sub = this.my_Control_sub.valueChanges.pipe(
      startWith(''),
      map((valuesem) => this._filter_sub(valuesem))
    );
  }
  finalarr() {
    // this.http.post('',JSON.stringify(this.varsub)).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // );

    // if(this.arr.length >= 30){

    this.totval = [];
    this.vardept = [];

    for (let i = 0; i < this.submits.length; i++) {
      for (let j = 0; j < this.submits[i].position.length; j++) {
        this.totval[this.submits[i].position[j]] = this.submits[i].subject;

        // console.log(this.varsub[this.submits[i].position[j]].subject);

        console.log(this.tempval);
      }
    }

    // for (let i = 0; i < this.submits.length; i++) {
    //   for (let j = 0; j < this.submits[i].position.length; j++) {
    //     this.totval[this.submits[i].position[j]] = {id:this.submits[i].id,
    //       staffssname:this.submits[i].staffssname,
    //       regulation:this.submits[i].regulation,deptname:this.submits[i].deptname,
    //       semester:this.submits[i].semester,year:this.submits[i].year,
    //       subject:this.submits[i].subject,period:this.submits[i].period,
    //       credit:this.submits[i].credit};

    //     // console.log(this.varsub[this.submits[i].position[j]].subject);

    //     console.log(this.tempval);
    //     }
    // }
    //  if(this.storeid )
    // this.staffscollection = [[staffid:this.storeid {staffs:this.temp_name,dept:this.tempvar_dept}]]

    for (let i = 0; i < this.submits.length; i++) {
      for (let j = 0; j < this.submits[i].position.length; j++) {
        this.vardept[this.submits[i].position[j]] = this.submits[i].deptname;
      }
    }

    console.log(this.totval);

    this.SVC.tablesub = this.totval;
    this.SVC.tabledept = this.vardept;
    this.SVC.staffid = this.storeid;
    this.SVC.staffname = this.temp_name;
    this.SVC.staffdept = this.tempvar_dept;

    const divarr = this.totval;
    console.log(this.totval);

    console.log(this.sliceIntoChunks(divarr, 7));

    console.log(this.SVC.tablesub);
    console.log(this.SVC.tabledept);

    this.router.navigate(['/created-table']);
    // }
    // else {
    //   // Swal.fire( 'Cant Generate.. Plzz Fill above 25 Subjects', 'error');
    //   Swal.fire('Cant Generate..', 'Plzz Fill above 25 Period', 'error');

    // }
  }

  sliceIntoChunks(divarr: any, chunkSize: any) {
    const res = [];
    for (let i = 0; i < divarr.length; i += chunkSize) {
      const chunk = divarr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }
}
