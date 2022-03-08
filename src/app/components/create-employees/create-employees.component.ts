import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css'],
})
export class CreateEmployeesComponent implements OnInit {
  createEmployee: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  id!: string | null;
  text: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private _employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.createEmployee = this.formBuilder.group({
      name: ['', Validators.required],
      last: ['', Validators.required],
      dni: ['', Validators.required],
      salary: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.editEmployee();
  }

  addEmployee() {
    this.submitted = true;

    if (this.createEmployee.invalid) {
      return;
    }

    const employee: any = {
      name: this.createEmployee.value.name,
      last: this.createEmployee.value.last,
      dni: this.createEmployee.value.dni,
      salary: this.createEmployee.value.salary,
      createDate: new Date(),
      updateDate: new Date(),
    };

    this.loading = true;

    this._employeeService
      .addEmployee(employee)
      .then(() => {
        this.toastr.success(
          '¡Empleado registrado con éxito!',
          'The employee was successfully registered!',
          { positionClass: 'toast-bottom-right' }
        );

        this.loading = false;
        this.router.navigate(['/list-employees']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
    console.log(this.createEmployee);
  }

  editEmployee() {
    if (this.id !== null) {
      this._employeeService.editEmployee(this.id).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
