import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/models/employee';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainMenuComponent implements OnInit {
  employees$: Observable<Employee[]>;
  isEditing: boolean = false;
  editEmpl: Employee;
  isDisplaying: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employees$ = this.employeeService.getEmployee();
  }

  editEmployee(empl: Employee) {
    this.isDisplaying = false;
    this.isEditing = true;
    this.editEmpl = { ...empl };
  }

  editedEmpl(empl: Employee) {
    const response$ = this.employeeService.editedEmpl(empl);
    response$.subscribe(() => {
      alert('Item edited');
      this.employees$ = this.employeeService.getEmployee();
      this.isEditing = false;
    });
  }

  deleteEmployee(empl: Employee) {
    const deletedEmpl$ = this.employeeService.deleteEmpl(empl);
    deletedEmpl$.subscribe(() => {
      alert('Item deleted');
      this.employees$ = this.employeeService.getEmployee();
    });
  }

  cancel(empl: Employee) {
    this.isEditing = false;
  }

  displayEmployee(empl: Employee) {
    this.isEditing = false;
    this.isDisplaying = true;
    this.editEmpl = { ...empl };
  }

  cancelView() {
    this.isDisplaying = false;
  }
}
