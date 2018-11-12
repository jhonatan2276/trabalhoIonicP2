import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  //Default Local Database Options
  options: any = {
    name: 'TrabalhoP2Database.db',
    location: 'default',
    createFromLocation: 1
  };

  dbItems: any[] = [];

  //TESTE
  tPhoto: string = '../../assets/default-user-photo/default-user.png';

  constructor(
    private sqlite: SQLite,
    private service: GlobalService
  ) { }

  getDatabase() {
    return this.sqlite.create(this.options)
  }

  createDatabase() {
    this.getDatabase()
    .then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS users ('+
        'id integer primary key AUTOINCREMENT NOT NULL, '+
        'id_server integer, '+
        'name TEXT, '+
        'email TEXT, '+
        'dateBirth DATE, '+
        'photo TEXT, '+
        'curriculum TEXT, '+
        'status integer, '+
        'theme TEXT)', [])
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }

  insertUser(idServer, name, email, dateBirth, photo, curriculum, status, theme) {
    this.getDatabase()
    .then((db: SQLiteObject) => {
      db.sqlBatch([
        ['insert into users (id_server, name, email, dateBirth, photo, curriculum, status, theme) values (?, ?, ?, ?, ?, ?, ?, ?)',
        [idServer, name, email, new Date(dateBirth), photo, curriculum, status, theme]]
      ])
        .then(() => console.log('Dados Inseridos com Sucesso'))
        .catch(e => console.error('Erro ao incluir dados padrões', e));
    })
  }

  getUsers() {
    return this.getDatabase()
    .then((db: SQLiteObject) => {
      let sql = 'select * from users';
      return db.executeSql(sql, [])
      .then((data: any) => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            var dbItem = data.rows.item(i);
            console.log(dbItem);
            this.dbItems.push(dbItem);
          }
          return this.dbItems;
        } else {
          return [];
        }
      });
    });
  }
}
