import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  tasks: any[] = [];
  syncMonitor: any;

  constructor(
    private db: DatabaseService,
    private service: GlobalService
  ) { }

  startSyncMonitor() {   
    this.syncMonitor = setInterval(() => this.dataSync(), 30 * 1000);
  }

  dataSync() {
    this.db.getTasksSync()
    .then((result: any[]) => {
      this.tasks = result;

      if (this.tasks.length == 0) {
        return console.log('Nada para Sincronizar');
      }

      for (var i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].type_service == 'POST') {
          this.service.postServerUser(
            this.tasks[i].name,
            this.tasks[i].email,
            this.tasks[i].dateBirth,
            this.tasks[i].photo,
            this.tasks[i].curriculum,
            this.tasks[i].status,
            this.tasks[i].theme,
          );
          this.db.deleteTaskSync(this.tasks[i].id);
        }
        if (this.tasks[i].type_service == 'PUT') {
          this.service.putServerUser(
            this.tasks[i].id_server,
            this.tasks[i].name,
            this.tasks[i].email,
            this.tasks[i].dateBirth,
            this.tasks[i].photo,
            this.tasks[i].curriculum,
            this.tasks[i].status,
            this.tasks[i].theme,
          );
          this.db.deleteTaskSync(this.tasks[i].id);
        }
        if (this.tasks[i].type_service == 'DELETE') {
          this.service.deleteServerUser(this.tasks[i].id_server);
          this.db.deleteTaskSync(this.tasks[i].id);
        }
      }
    });
  }
}
