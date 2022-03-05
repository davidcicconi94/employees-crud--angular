import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit {
  createEmployee: FormGroup;
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder , private _employeeService: EmployeeService) { 
    this.createEmployee = this.formBuilder.group({
      name: ['' , Validators.required],
      last: ['' , Validators.required],
      dni: ['' , Validators.required],
      salary: ['' , Validators.required]
    })
  }
  
  ngOnInit(): void {
  }
  
  addEmployee(){
    this.submitted = true;
    
    if(this.createEmployee.invalid){
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
    
         this._employeeService.addEmployee(employee).then(() => {
           console.log('Empleado agregado')
         }).catch((error) => {
           console.log(error)
         })
         console.log(this.createEmployee)
  }
}
