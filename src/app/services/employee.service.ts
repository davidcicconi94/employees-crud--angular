import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private firestore: AngularFirestore) {}

  addEmployee(employee: any): Promise<any> {
    return this.firestore.collection('employees').add(employee);
  }

  getEmployees(): Observable<any> {
    return this.firestore
      .collection('employees', (ref) => ref.orderBy('createDate', 'asc'))
      .snapshotChanges();
  }

  deleteEmployee(id: string): Promise<any> {
    return this.firestore.collection('employees').doc(id).delete();
  }

  editEmployee(id: string): Observable<any> {
    return this.firestore.collection('employees').doc(id).snapshotChanges();
  }

  updateEmployee(id: string, data: any): Promise<any> {
    return this.firestore.collection('employees').doc(id).update(data);
  }
}
