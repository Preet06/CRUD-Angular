import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { FormControl, FormGroup,FormBuilder } from '@angular/forms'
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnChanges {
  employeesList: any;
  RegisterForm: FormGroup<{ name: FormControl<string | null>; mobile: FormControl<string | null>; address: FormControl<string | null>; gender: FormControl<string | null>; }>;
  id: any;
  show: boolean;


  @Input()
  displayShow;
  constructor(public fb:FormBuilder,private service:CrudService,private cd: ChangeDetectorRef){
    
    this.RegisterForm = this.fb.group({
      name : [""],
      mobile:[""],
      address:[""],
      gender:[""],
    })
  }
  
  ngOnInit(): void {
    this.EmployeesDisplay()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['displayShow']) {
      this.show = this.displayShow;
      console.log(this.displayShow,this.show);
    }
    this.EmployeesDisplay()
    }

  EmployeesDisplay(){
    this.service.getEmployees().subscribe(data=>{
      console.log("data",data);
      this.employeesList = data;
    })
  }

  AddUser(){
    console.log("add",this.id)
    if(this.id!=null)
    {
      this.service.EditEmployeesdata(this.RegisterForm.value,this.id).subscribe(data =>
        {})
        this.id = null;
        this.RegisterForm.reset();
    }
    else{
      console.log(this.RegisterForm.value);
    console.log('hi');
    this.service.AddDataEmployees(this.RegisterForm.value).subscribe(data =>
      {})
     this.RegisterForm.reset();
     this.EmployeesDisplay()
    }
  }

  EditEmployees(id:any)
  {
      this.service.getEmployeesById(id).subscribe(data =>{
        this.RegisterForm.patchValue({
          name:data.name,
          mobile:data.mobile,
          address:data.address,
          gender:data.gender,
        })
        this.id = data.id;
        console.log(this.id)
      }
      )
        this.show = true
        this.displayShow = true
        this.cd.detectChanges();
        this.EmployeesDisplay()   
  }


  DeleteEmployees(id:any)
  {
      this.service.DeleteEmployeesdata(id).subscribe()
      this.EmployeesDisplay();
  }

}
