import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Task {
  name: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _storage: Storage | null = null;
  
  private _tasks: Task[]

  private _task: Task

  constructor(private storage: Storage)
  { 

    this._tasks = []

    this.init().then(()=>{
      this._storage.set("key", "value");
      // this._storage.set("blablada", "one more time");
      // this._task = {name: "blasd",text: "text toto"}
      // this._task.name = "blasd";
      // this._task.text = "lkjhsdlfg";
      // this._storage.set("blabla", this._task);
      // this.getTaskById("blabla").then((val)=>{
      //   console.log("this is a val: ", val.text)
      // })
      // console.log("what are you doing stepsize?", this._storage)
  })
  }

  async init()
  {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  //get all tasks
  public async getTasks(): Promise<Task[]> 
  {
    return await this._storage.forEach((value, key, iteration) => {
      this._task = {name: key, text: value};

      console.log("what iteration? ", iteration)
      this._tasks.push(this._task);
    }).then(() => { return this._tasks})
  }

  //get one task
  public async getTaskById(id: string): Promise<Task> {
    return await this._storage.get(id);
  }

  //add Task
  public async setTask(name: string, text: string): Promise<any>
  {
    return this._storage.set(name, text);
  }

  //edit task
  public async editTask(name: string, text: string)
  {}
}
