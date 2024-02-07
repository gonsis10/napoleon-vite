const Store = require("electron-store");

const storage = new Store();

function getTodoList(list) {
  const items = storage.get(list);
  if (items) return [list, items];
  else {
    storage.set(list, []);
    return [list, []];
  }
}

function saveTodoItem(data) {
  const items = storage.get(data.list);
  storage.set(data.list, [{ id: data.id, title: data.title, completed: data.completed }, ...items]);
  console.log("item saved");
}

function saveTodoList(data) {
  storage.set(data.list, data.arr);
}

function finish() {
  storage.clear();
}

module.exports = {
  getTodoList: getTodoList,
  saveTodoItem: saveTodoItem,
  saveTodoList: saveTodoList,
  finish: finish,
};
