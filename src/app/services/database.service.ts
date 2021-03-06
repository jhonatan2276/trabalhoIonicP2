import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

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
  dbUserId: any[] = [];
  dbTasks: any[] = [];

  constructor(
    private sqlite: SQLite
  ) { }

  getDatabase() {
    return this.sqlite.create(this.options)
  }

  createDatabase() {
    this.getDatabase()
    .then((db: SQLiteObject) => {
      db.sqlBatch([
        ['CREATE TABLE IF NOT EXISTS users ('+
        'id integer primary key AUTOINCREMENT NOT NULL, '+
        'id_server integer, '+
        'name TEXT, '+
        'email TEXT, '+
        'dateBirth TEXT, '+
        'photo TEXT, '+
        'curriculum TEXT, '+
        'status TEXT, '+
        'theme TEXT)', []],
        ['CREATE TABLE IF NOT EXISTS sync ('+
        'id integer primary key AUTOINCREMENT NOT NULL, '+
        'type_service TEXT, '+
        'id_server integer, '+
        'name TEXT, '+
        'email TEXT, '+
        'dateBirth TEXT, '+
        'photo TEXT, '+
        'curriculum TEXT, '+
        'status TEXT, '+
        'theme TEXT)', []]
      ])
      .then(() => console.log('Tabelas Criadas ou Abertas com sucesso'))
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }

  //USER TABLE
  getUsers() {
    return this.getDatabase()
    .then((db: SQLiteObject) => {
      let sql = 'select * from users';
      return db.executeSql(sql, [])
      .then((data: any) => {
        if (data.rows.length > 0) {
          this.dbItems = [];
          for (var i = 0; i < data.rows.length; i++) {
            var dbItem = data.rows.item(i);
            this.dbItems.push(dbItem);
          }
          return this.dbItems;
        } else {
          return [];
        }
      });
    });
  }

  getUserById(id) {
    return this.getDatabase()
    .then((db: SQLiteObject) => {
      let sql = 'select * from users where id = '+id;
      return db.executeSql(sql, [])
      .then((data: any) => {
        this.dbUserId = [];
          for (var i = 0; i < data.rows.length; i++) {
            var user = data.rows.item(i);
            this.dbUserId.push(user);
          }
          return this.dbUserId;
      });
    });
  }

  searchUsers(text) {
    return this.getDatabase()
    .then((db: SQLiteObject) => {
      var dbTextFormat = "'%"+text+"%'";
      let sql = 'select * from users where name like '+dbTextFormat;
      return db.executeSql(sql, [])
      .then((data: any) => {
        if (data.rows.length > 0) {
          this.dbItems = [];
          for (var i = 0; i < data.rows.length; i++) {
            var dbItem = data.rows.item(i);
            this.dbItems.push(dbItem);
          }
          return this.dbItems;
        } else {
          return [];
        }
      });
    });
  }

  insertUser(idServer, name, email, dateBirth, photo, curriculum, status, theme) {
    return this.getDatabase()
    .then((db: SQLiteObject) => {
      db.sqlBatch([
        ['insert into users (id_server, name, email, dateBirth, photo, curriculum, status, theme) values (?, ?, ?, ?, ?, ?, ?, ?)',
        [idServer, name, email, dateBirth, photo, curriculum, status, theme]]
      ])
        .then(() => console.log('Dados Inseridos com Sucesso'))
        .catch(e => console.error('Erro ao incluir Dados = ', e));
    })
  }

  updateUser (id, idServer, name, email, dateBirth, photo, curriculum, status, theme) {
    return this.getDatabase()
      .then((db: SQLiteObject) => {
        let sql = 'update users set id_server = ?, name = ?, email = ?, dateBirth = ?, photo = ?, curriculum = ?, status = ?, theme = ? where id = '+id;
        let data = [idServer, name, email, dateBirth, photo, curriculum, status, theme];
        db.executeSql(sql, data)
          .then(() => console.log('Dados Inseridos com Sucesso'))
          .catch(e => console.error('Erro ao Alterar Dados = ', e));
      })
  }

  deleteUser(id) {
    return this.getDatabase()
    .then ((db: SQLiteObject) => {
      let sql = 'delete from users where id = '+id;
      db.executeSql(sql, [])
      .then(() => console.log('Usuário Removido com Sucesso'))
      .catch(e => console.error('Erro ao Remover Usuário = ', e));
    })
  }

  //SYNC TABLE
  getTasksSync() {
    return this.getDatabase()
    .then((db: SQLiteObject) => {
      let sql = 'select * from sync';
      return db.executeSql(sql, [])
      .then((data: any) => {
        if (data.rows.length > 0) {
          this.dbTasks = [];
          for (var i = 0; i < data.rows.length; i++) {
            var dbTask = data.rows.item(i);
            this.dbTasks.push(dbTask);
          }
          return this.dbTasks;
        } else {
          return [];
        }
      });
    });
  }

  insertTaskSync(type, idServer, name, email, dateBirth, photo, curriculum, status, theme) {
    return this.getDatabase()
    .then((db: SQLiteObject) => {
      db.sqlBatch([
        ['insert into sync (type_service, id_server, name, email, dateBirth, photo, curriculum, status, theme) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [type, idServer, name, email, dateBirth, photo, curriculum, status, theme]]
      ])
        .then(() => console.log('Dados Inseridos com Sucesso'))
        .catch(e => console.error('Erro ao incluir Dados = ', e));
    })
  }

  deleteTaskSync(id) {
    return this.getDatabase()
    .then ((db: SQLiteObject) => {
      let sql = 'delete from sync where id = '+id;
      db.executeSql(sql, [])
      .then(() => console.log('Task Removida com Sucesso'))
      .catch(e => console.error('Erro ao Remover Task = ', e));
    })
  }

  clearDatabase() {
    this.getDatabase()
    .then((db: SQLiteObject) => {
      let sql = 'delete from users';
      db.executeSql(sql, [])
      .then(() => console.log('Dados Removidos com Sucesso'))
      .catch(e => console.error('Erro ao Remover Dados = ', e));
    })
  }
}
