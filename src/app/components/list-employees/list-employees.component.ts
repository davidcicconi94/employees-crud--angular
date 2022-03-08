import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
})
export class ListEmployeesComponent implements OnInit {
  employees: any[] = [];

  constructor(
    private _employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this._employeeService.getEmployees().subscribe((data) => {
      this.employees = [];
      data.forEach((element: any) => {
        // console.log(element.payload.doc.data());
        this.employees.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.employees);
    });
  }

  deleteEmployee(id: string) {
    this._employeeService
      .deleteEmployee(id)
      .then(() => {
        this.toastr.error(
          '¡Empleado fue borrado con éxito!',
          'The employee was succesfully deleted!',
          { positionClass: 'toast-bottom-right' }
        );
        console.log('Empleado eliminado');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
