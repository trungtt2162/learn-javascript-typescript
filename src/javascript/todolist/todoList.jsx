
const nameToDo = document.getElementById("nameToDo");
const btnSubmit = document.getElementById("btnSubmit");
const tbody = document.querySelector("#todos tbody");
const data = localStorage.getItem("todo")
const array = JSON.parse(data);


let todo = [];
const generateId = () => {
    return Math.random().toString(36).substring(2, 10);
}




btnSubmit.addEventListener("click", () => {
    const id = generateId();
    //check coi có gì nhập vào
    if (nameToDo.value && nameToDo.value.length) {
        // // nếu có thì hiển thị
        // tbody.innerHTML +=
        //     `<tr>
        // <td>${id}</td>
        // <td>${nameToDo.value}</td>
        // <td>
        // <button class="btnDelete" data-id="${id}">Delete</button>
        // </td>
        // </tr>`
        //lữu trữ
        // nếu có sẵn data trong localstorage
        if (data && data.length) {
            if (array && array.length) {
                // add thêm nếu local storage đã có data
                array.push({ id: id, name: nameToDo.value });
                localStorage.setItem("todo", JSON.stringify(array));
                window.location.reload();
            }
        } else  //nếu chưa có data
        {
            //add thêm vào list trống
            todo.push({ id: id, name: nameToDo.value });
            localStorage.setItem("todo", JSON.stringify(todo));
            window.location.reload();

        }
    }
}
)


const fecthAllTodo = () => {
    if (data && data.length) {

        if (array && array.length) {
            array.forEach(element => {
                tbody.innerHTML +=
                    `<tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>
                <button class="btnDelete" data-id="${element.id}">Delete</button>
                </td>
                </tr>`
            });
        }
    }
}

fecthAllTodo();


const btnDelete = document.querySelectorAll(".btnDelete");
if (btnDelete) {
    btnDelete.forEach((button, index) => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            handleDeleteTodo(id);
            window.location.reload();

        });
    });
}

const handleDeleteTodo = (id) => {
    if (array) {
        const newArray = array.filter((element, index) => {
            return element.id !== id;
        })
        localStorage.setItem("todo", JSON.stringify(newArray))
    }
}