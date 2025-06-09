let itemJsonArray = []
function update() {
    let tit = document.getElementById("title").value.trim()
    let desc = document.getElementById("description").value.trim()
    if (tit == "" && desc == "") return;
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray.push([tit, desc])
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else {
        let itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr ) || []
        itemJsonArray.push([tit, desc])
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    render()

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
}
function render() {
    let itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr) || []
    let table = document.getElementById("tableBody")
    let str = ""
    try{
    itemJsonArray.forEach((element, index) => {
        str += 
        `<tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class = "btn btn-sm btn-primary" onclick = "deleteItem(${index})">delete</button></td>
        </tr>`
    })
    table.innerHTML = str
    }
    catch(error){
        console.log("bye bye bye")
    }
}

function deleteItem(item){
    let itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr)
    itemJsonArray.splice(item,1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    render()
}

function LocalClear(){
    if(confirm("do you really want to clear")){
        localStorage.clear()
        render()
    }
}

add = document.getElementById("add")
add.addEventListener("click", update);
render()

// Get the search input element
const searchInput = document.getElementById('searchInput');

// Listen for input changes
searchInput.addEventListener('keyup', function() {
    let filter = searchInput.value.toLowerCase();
    let table = document.getElementById('tableBody');
    let tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        // Get the title cell (2nd column, index 1)
        let td = tr[i].getElementsByTagName('td')[0];
        if (td) {
            let textValue = td.textContent || td.innerText;
            if (textValue.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = "";  // Show row
            } else {
                tr[i].style.display = "none";  // Hide row
            }
        }
    }
});

document.getElementById('addForm').addEventListener('submit', function(e) {
    e.preventDefault(); // prevent form from reloading the page
    update(); // your add function
});

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    searchItems(); // function to filter your list based on search input
});

