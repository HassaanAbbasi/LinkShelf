const inputButton = document.getElementById("input-btn"); //Blue button
const deleteButton = document.getElementById("delete-btn") //Red button
const input = document.getElementsByClassName("input-el"); //Text Field
const list = document.getElementById("list"); //List
let links = []; //Stores the saved links
const linksFromLocalStorage = JSON.parse(localStorage.getItem("links"));

if(linksFromLocalStorage != null)
{
    links = linksFromLocalStorage;
    listUpdate();
}

inputButton.addEventListener("click", function() {
    var inputVal = input[0].value;
    if(inputVal != "")
    {
        links.push(inputVal);
        input[0].value = "";
        localStorage.setItem("links", JSON.stringify(links));
        listUpdate();
    }
    else
    {
        alert("Whoops! You can't save this tab with a blank input. Please write anything in the input line and press 'Save Tab'.");
    }
});

function listUpdate()
{
    list.innerHTML = "";
    for (let i = 0; i < links.length; i++) 
    {
        const name = links[i];

        var item = document.createElement("li");
        var link = document.createElement("a");
        link.innerText = name;

        var btnRemove = document.createElement("INPUT");
        btnRemove.value = "❌";
        btnRemove.type = "button";
        btnRemove.id = "delete-btn-small";
        btnRemove.onclick = function () {
            links = links.filter(function (val,index,arr) {return val != name});
            localStorage.setItem("links", JSON.stringify(links));
            listUpdate();
        };

        link.setAttribute('href', window.location.href);
        link.setAttribute('target', "_blank");

        item.appendChild(link);
        item.appendChild(btnRemove);
        list.appendChild(item);
    }
}

deleteButton.addEventListener("click", function() {
    if(links.length == 0)
    {
        alert("There are no links in your list to delete.");
    }
    localStorage.clear();
    links = [];
    listUpdate();
})