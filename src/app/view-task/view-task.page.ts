import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Task } from '../services/data.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-task.page.html',
  styleUrls: ['./view-task.page.scss'],
})
export class ViewTaskPage implements OnInit {
  task: Task;
  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.data.storageReady.subscribe(() => {
      this.data
        .getTaskById(this.activatedRoute.snapshot.params['id'])
        .then((r) => {
          this.task = r;
        });
    });
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
