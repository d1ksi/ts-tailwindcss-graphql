var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var url = "https://graphqlzero.almansi.me/api";
var addTodo = document.getElementById("addTask");
var addButton = document.getElementById("addBtn");
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", addTaskHandler);
var searchTodo = document.getElementById("searchTask");
var searchButton = document.getElementById("searchBtn");
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener("click", findTodos);
var todoList = document.getElementById("allToDo");
var request = function (query) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ query: query })
                })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var printToDo = function (todo) {
    var title = todo.title, _a = todo.completed, completed = _a === void 0 ? false : _a, _b = todo.id, id = _b === void 0 ? "" : _b, user = todo.user;
    var li = document.createElement("li");
    li.className = "list-group-item flex justify-between bg-slate-200";
    var userName = (user === null || user === void 0 ? void 0 : user.name) || "Unknown user";
    li.innerHTML = "&nbsp; ".concat(title, " | ID:").concat(id, " | ").concat(userName);
    li.setAttribute("data-id", id);
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "mr-2";
    if (completed) {
        checkBox.setAttribute("checked", "true");
    }
    checkBox.addEventListener("change", todoSrarus);
    li.prepend(checkBox);
    var del = document.createElement("button");
    del.className = "btn btn-link mb-1";
    del.innerHTML = "&times;";
    li.append(del);
    del === null || del === void 0 ? void 0 : del.addEventListener("click", deleteToDo);
    todoList === null || todoList === void 0 ? void 0 : todoList.prepend(li);
};
request("query Todos{\n      todos{\n        data{\n          id\n          title\n          completed\n          user{\n            id\n            name\n          }\n        }\n      }\n    }").then(function (_a) {
    var data = _a.data;
    return data.todos.data.forEach(function (e) { return printToDo(e); });
});
function addTaskHandler(e) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var newTodo, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (!addTodo.value) return [3 /*break*/, 2];
                    newTodo = "mutation addTodo{\n         createTodo(input: {title: \"".concat(addTodo.value, "\", completed: false}){\n           id\n           title\n           completed\n           user{\n             id\n             name\n           }\n         }\n       }");
                    return [4 /*yield*/, request(newTodo)];
                case 1:
                    data = _b.sent();
                    printToDo((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.createTodo);
                    addTodo.value = '';
                    _b.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function findTodos(e) {
    return __awaiter(this, void 0, void 0, function () {
        var search, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!searchTodo.value) return [3 /*break*/, 2];
                    search = "query serch{\n         todos(options: {search:{q: \"".concat(searchTodo.value, "\"}, sort:{field: \"id\", order: DESC}}){\n           data{\n             id\n             title\n             completed\n             user{\n               name\n               id\n             }\n           }\n         }\n       }");
                    return [4 /*yield*/, request(search)];
                case 1:
                    data = (_a.sent()).data;
                    todoList.innerHTML = '';
                    data.todos.data.forEach(function (e) { return printToDo(e); });
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function todoSrarus() {
    return __awaiter(this, void 0, void 0, function () {
        var todoId, checkStatus, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    todoId = this.parentElement.dataset.id;
                    checkStatus = "mutation up{\n      updateTodo(id: ".concat(todoId, ", input: {completed: ").concat(this.checked, "}){\n        completed\n      }\n    }");
                    return [4 /*yield*/, request(checkStatus)];
                case 1:
                    data = _a.sent();
                    if (data.data.updateTodo.completed) {
                        this.setAttribute("checked", "true");
                    }
                    else {
                        this.removeAttribute("checked");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function deleteToDo() {
    return __awaiter(this, void 0, void 0, function () {
        var todoId, del, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    todoId = this.parentElement.dataset.id;
                    del = "mutation deleteToDo{\n         deleteTodo(id: ".concat(todoId, ")\n       }");
                    return [4 /*yield*/, request(del)];
                case 1:
                    data = _a.sent();
                    if (data.data.deleteTodo) {
                        this.parentElement.remove();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
