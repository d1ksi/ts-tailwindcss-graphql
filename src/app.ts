const url = "https://graphqlzero.almansi.me/api";

const addTodo = document.getElementById("addTask") as HTMLInputElement;
const addButton = document.getElementById("addBtn");
addButton?.addEventListener("click", addTaskHandler);

const searchTodo = document.getElementById("searchTask") as HTMLInputElement;
const searchButton = document.getElementById("searchBtn");
searchButton?.addEventListener("click", findTodos);

const todoList = document.getElementById("allToDo") as HTMLInputElement;


interface Todo {
   id: string;
   title: string;
   completed: boolean;
   user: {
      id: string | null;
      name: string | null;
   };
}

interface TodosResponse {
   data: {
      todos: {
         data: Todo[];
      },
      createTodo: Todo;
      updateTodo: {
         completed: boolean;
      },
      deleteTodo: boolean
   };
}


const request = async (query: string): Promise<TodosResponse> => {
   const res = await fetch(url, {
      method: "POST",
      headers: {
         "Content-type": "application/json"
      },
      body: JSON.stringify({ query })
   });
   return await res.json();
}



const printToDo = (todo: Todo): void => {
   const { title, completed = false, id = "", user } = todo;
   const li = document.createElement("li");
   li.className = "list-group-item flex justify-between bg-slate-200";
   const userName = user?.name || "Unknown user";
   li.innerHTML = `&nbsp; ${title} | ID:${id} | ${userName}`;
   li.setAttribute("data-id", id)

   const checkBox = document.createElement("input");
   checkBox.type = "checkbox";
   checkBox.className = "mr-2"
   if (completed) {
      checkBox.setAttribute("checked", "true")
   }
   checkBox.addEventListener("change", todoSrarus)
   li.prepend(checkBox);

   const del = document.createElement("button");
   del.className = "btn btn-link mb-1";
   del.innerHTML = "&times;";
   li.append(del)
   del?.addEventListener("click", deleteToDo);

   todoList?.prepend(li);
}


request(
   `query Todos{
      todos{
        data{
          id
          title
          completed
          user{
            id
            name
          }
        }
      }
    }`
).then(({ data }) => data.todos.data.forEach(e => printToDo(e)));


async function addTaskHandler(e: Event) {
   e.preventDefault();
   if (addTodo.value) {
      const newTodo = `mutation addTodo{
         createTodo(input: {title: "${addTodo.value}", completed: false}){
           id
           title
           completed
           user{
             id
             name
           }
         }
       }`
      const data = await request(newTodo);
      printToDo(data?.data?.createTodo);
      addTodo.value = '';
   }
}

async function findTodos(e: Event) {
   if (searchTodo.value) {
      const search = `query serch{
         todos(options: {search:{q: "${searchTodo.value}"}, sort:{field: "id", order: DESC}}){
           data{
             id
             title
             completed
             user{
               name
               id
             }
           }
         }
       }`
      const { data } = await request(search);
      todoList.innerHTML = '';
      data.todos.data.forEach(e => printToDo(e))
   }
}


async function todoSrarus() {
   const todoId = this.parentElement.dataset.id
   const checkStatus = `mutation up{
      updateTodo(id: ${todoId}, input: {completed: ${this.checked}}){
        completed
      }
    }`
   const data = await request(checkStatus);
   if (data.data.updateTodo.completed) {
      this.setAttribute("checked", "true");
   } else {
      this.removeAttribute("checked");
   }
}

async function deleteToDo() {
   const todoId = this.parentElement.dataset.id
   const del = `mutation deleteToDo{
         deleteTodo(id: ${todoId})
       }`
   const data = await request(del);
   if (data.data.deleteTodo) {
      this.parentElement.remove();
   }
}
