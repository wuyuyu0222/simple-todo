import { db } from './database';

export const Common = {
  getDistinctArray: (array) => {
    return [...(new Set(array.map(todo => todo.category)))];
  }
}

export const Utils = {
  getTodoList: () => {
    return new Promise((resolve, reject) => {
      const ran = Math.floor((Math.random() * 100) + 1);
      if (ran > 1) {
        setTimeout(() => {
          resolve(db.todo);
        }, 500)
      } else {
        setTimeout(() => {
          reject('getTodolist failed');
        }, 500)
      }
    });
  },
  getTodo: (id) => {
    return new Promise((resolve, reject) => {
      const ran = Math.floor((Math.random() * 100) + 1);
      if (ran > 1) {
        setTimeout(() => {
          resolve(db.todo.find(todo => todo.id === id));
        }, 100)
      } else {
        setTimeout(() => {
          reject('getTodo failed');
        }, 100)
      }
    });
  },
  searchTodo: (keyword, category) => {
    return new Promise((resolve, reject) => {
      const ran = Math.floor((Math.random() * 100) + 1);
      if (ran > 1) {
        setTimeout(() => {
          resolve(db.todo.filter(todo => {
            return (
              (
                category === undefined ||
                category === 'all' ||
                todo.category === category
              ) &&
              (
                todo.title.includes(keyword) ||
                todo.category.includes(keyword) ||
                todo.content.includes(keyword)
              )
            )
          }))
        })
      } else {
        setTimeout(() => {
          reject('searchTodo failed');
        }, 200)
      }
    });
  },
  upsertTodo: (todo) => {
    return new Promise((resolve, reject) => {
      const ran = Math.floor((Math.random() * 100) + 1);
      if (ran > 1) {
        let targetTodo = db.todo.find(t => t.id === todo.id);
        if (targetTodo) {
          targetTodo = Object.assign(targetTodo, todo);
        } else {
          todo.id = db.todo.length;
          db.todo.unshift(todo);
        }
        setTimeout(() => {
          resolve();
        }, 200)
      } else {
        setTimeout(() => {
          reject('upsertTodo failed');
        }, 200)
      }
    });
  },
  deleteTodo: (id) => {
    return new Promise((resolve, reject) => {
      const ran = Math.floor((Math.random() * 100) + 1);
      if (ran > 1) {
        db.todo = db.todo.filter(todo => todo.id !== id);
        setTimeout(() => {
          resolve();
        }, 200)
      } else {
        setTimeout(() => {
          reject('deleteTodo failed');
        }, 200)
      }
    });
  }
}
