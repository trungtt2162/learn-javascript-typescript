




const loadUser = async () => {
    const respone = await fetch("http://localhost:8000/users");
    const data = await respone.json();
    const tbody = document.querySelector("#users tbody");
    console.log(data);
    if (data && data.length) {
        data.forEach((element, index) =>
            tbody.innerHTML +=
            `<tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            </tr>`
        )
    }

}
loadUser();