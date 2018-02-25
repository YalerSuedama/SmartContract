import { Component, OnInit } from '@angular/core';
import { SimpleStorageWrapper } from 'contracts/simple-storage-wrapper';

@Component({
  selector: 'app-simple-storage-test',
  templateUrl: './simple-storage-test.html',
  styleUrls: ['./simple-storage-test.css']
})
export class SimpleStorageTestComponent  implements OnInit {

  value: number;
  newValue: string;
  waiting: boolean;
  private simpleStorageWrapper: SimpleStorageWrapper;

  ngOnInit(): void {
    this.simpleStorageWrapper = new SimpleStorageWrapper();
  }

  public loadValue() {
    this.simpleStorageWrapper.getValue().then((value) => this.value = value);
  }

  public setValue() {
    const newValue = parseInt(this.newValue, 10);
    if (newValue && newValue !== NaN) {
        this.waiting = true;
        this.simpleStorageWrapper.setValue(newValue).then(() => this.waiting = false).catch(() => this.waiting = false) ;
    } else {
        alert('Valor inválido.');
    }
  }

}
