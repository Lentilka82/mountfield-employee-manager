import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './models/employee';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // private emplUrl = 'http://localhost:3000/employees';
  // private emplUrlPostfix = "";
  private emplUrl =
    'https://mtf-employee-manager-default-rtdb.firebaseio.com/employees';
  private emplUrlPostfix = '.json';
  constructor(private http: HttpClient) {}

  getEmployee() {
    const employee$ = this.http.get<Employee[]>(
      this.emplUrl + this.emplUrlPostfix
    );
    return employee$.pipe(
      map((data:Employee[])=>{
        return data.filter(row => row !== null);
      }),
      tap((data) => {
        console.log(data);
      })
    );
  }

  editedEmpl(empl) {
    const editedempl$ = this.http.put(
      this.emplUrl + '/' + empl.id + this.emplUrlPostfix,
      empl
    );
    return editedempl$;
  }

  deleteEmpl(empl: Employee) {
    const deletedEmpl$ = this.http.delete(
      this.emplUrl + '/' + empl.id + this.emplUrlPostfix
    );
    return deletedEmpl$;
  }
}
