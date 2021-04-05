import { Component, OnInit } from '@angular/core';
import { DataService, Task } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public _tasks: Task[];

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.storageReady.subscribe(() => {
      this.getTasks();
    });
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getTasks() {
    this.data.getTasks().then((val) => {
      this._tasks = val;
      console.log('what is the task: ', val);
    });
  }
}
