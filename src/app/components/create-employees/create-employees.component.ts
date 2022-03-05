import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit {
  createEmployee: FormGroup;
  submitted = false

  constructor(private formBuilder: FormBuilder) { 
    this.createEmployee = this.formBuilder.group({
      name: ['' , Validators.required],
      last: ['' , Validators.required],
      dni: ['' ,[Validators.required , Validators.max(8)]],
      salary: ['' , Validators.required]
    })
  }
  
  ngOnInit(): void {
  }
  
  addEmployee(){
    
    if(this.createEmployee.invalid){
      this.submitted = true;
      return;
    }
    const employee:any = {
      name: this.createEmployee.value.name,
      last: this.createEmployee.value.last,
      dni: this.createEmployee.value.dni,
      salary: this.createEmployee.value.salary,
      createDate: new Date(),
      updateDate: new Date()
    }
console.log(employee)

    console.log(employee)
  }

}
