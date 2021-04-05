import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';

export interface Task {
  name: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _storage: Storage | null = null;

  public storageReady: Subject<any> = new Subject<any>();

  private _tasks: Task[];

  private _task: Task;

  constructor(private storage: Storage) {
    this._tasks = [];

    storage
      .create()
      .then((result) => {
        this._storage = result;
        this._storage.set('1', {
          name: 'ma super tache',
          text: 'Montrer ma super appli a Clem',
        });
        this.storageReady.next();
      })
      .catch((e) => console.error('Erreur lors de la création du storage', e));
  }

  //get all tasks
  public async getTasks(): Promise<Task[]> {
    return await this._storage
      .forEach((value, key, iteration) => {
        this._task = { name: key, text: value };

        console.log('what iteration? ', iteration);
        this._tasks.push(this._task);
      })
      .then(() => {
        return this._tasks;
      });
  }

  //get one task
  public async getTaskById(id: string): Promise<Task> {
    return await this._storage.get(id);
  }

  //add Task
  public async setTask(name: string, text: string): Promise<any> {
    return this._storage.set(name, text);
  }

  //edit task
  public async editTask(name: string, text: string) {}
}
