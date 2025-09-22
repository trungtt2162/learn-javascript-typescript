
const addNewBlog = () => {
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const content = document.getElementById("content");
    const btnSubmit = document.getElementById("btnSubmit");

    btnSubmit.addEventListener("click", () => {
        (async () => {
            const rawResponse = await fetch('http://localhost:8000/blogs', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title.value, author: author.value, content: content.value })
            });
            const data = await rawResponse.json();
            const tableBody = document.querySelector('#blogs tbody');
            const newRow = document.createElement("tr");
            newRow.setAttribute("data-id", data.id);
            // console.log(tableBody);
            newRow.innerHTML = `
        <td>${data.id}</td>
        <td>${data.title}</td>
        <td>${data.author}</td>
        <td>${data.content}</td>
        <td>   <button class="btnDelete" data-id="${data.id}">Delete</button></td>`
            tableBody.appendChild(newRow);


            const button = newRow.querySelector(`.btnDelete`);
            button.addEventListener("click", async () => {
                const res = await fetch(`http://localhost:8000/blogs/${data.id}`, {
                    method: "DELETE"
                });

                if (res.ok) {
                    newRow.remove()
                    console.log(`Blog id=${data.id} đã được xóa`);
                } else {
                    console.error("Xóa blog thất bại");
                }
            })


        })();
    })
}


const fecthAllBlogs = async () => {
    const response = await fetch("http://localhost:8000/blogs");
    const data = await response.json();
    const tbody = document.querySelector("#blogs tbody");
    if (data && data.length) {
        data.forEach((element, index) =>
            tbody.innerHTML +=
            `<tr>
            <td>${element.id}</td>
            <td>${element.title}</td>
            <td>${element.author}</td>
            <td>${element.content}</td>
            <td>   
            <button class="btnDelete" data-id="${element.id}">Delete</button>
            </td>
            </tr>`
        )
    };

}


const deleteBlogByID = () => {
    const btnDelete = document.querySelectorAll(".btnDelete");
    console.log("btnDelete:", btnDelete)
    if (btnDelete) {
        btnDelete.forEach((button, index) => {
            button.addEventListener("click", async () => {
                const id = button.getAttribute('data-id');
                const res = await fetch(`http://localhost:8000/blogs/${id}`, {
                    method: "DELETE"
                });

                if (res.ok) {
                    // Xóa row trong DOM
                    // const row = document.querySelector(`tr[data-id="${id}"]`);
                    const row = button.closest('tr');
                    if (row) row.remove();
                    console.log(`Blog id=${id} đã được xóa`);
                } else {
                    console.error("Xóa blog thất bại");
                }
                // window.location.reload();
            })
        })

    }

}
fecthAllBlogs().then(() => {
    deleteBlogByID()
})
addNewBlog();

