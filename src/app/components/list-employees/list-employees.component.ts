import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  items: Observable <any[]>

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('items').valueChanges();

   }

  ngOnInit(): void {
  }

}
