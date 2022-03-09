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
  id: string | null;
  title = 'Create new employee:';

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

  addEditEmployee() {
    this.submitted = true;

    if (this.createEmployee.invalid) {
      return;
    }

    if (this.id === null) {
      this.addEmployee();
    } else {
      this.edit(this.id);
    }
  }

  addEmployee() {
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
  }

  //

  edit(id: string) {
    const employee: any = {
      name: this.createEmployee.value.name,
      last: this.createEmployee.value.last,
      dni: this.createEmployee.value.dni,
      salary: this.createEmployee.value.salary,
      updateDate: new Date(),
    };

    this.loading = true;

    this._employeeService
      .updateEmployee(id, employee)
      .then(() => {
        this.loading = false;
        this.toastr.info(
          '¡Empleado modificado con éxito!',
          'The employee was succesfully updated!',
          {
            positionClass: 'toast-bottom-right',
          }
        );
        this.router.navigate(['/list-employees']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  editEmployee() {
    if (this.id !== null) {
      this.loading = true;
      this.title = 'Edit employee:';

      this._employeeService.editEmployee(this.id).subscribe((data) => {
        this.loading = false;

        this.createEmployee.setValue({
          name: data.payload.data()['name'],
          last: data.payload.data()['last'],
          dni: data.payload.data()['dni'],
          salary: data.payload.data()['salary'],
        });
      });
    }
  }
}
