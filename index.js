const inputButton = document.getElementById("input-btn"); //Blue button
const deleteButton = document.getElementById("delete-btn") //Red button
const input = document.getElementsByClassName("input-el"); //Text Field
const list = document.getElementById("list"); //List
let links = []; //Stores the saved link names
const linksFromLocalStorage = JSON.parse(localStorage.getItem("links"));

if(linksFromLocalStorage != null)
{
    links = linksFromLocalStorage;
    listUpdate();
};

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

input[0].addEventListener("keyup", function(e) {
    if(e.keyCode === 13)
    {
        e.preventDefault();
        inputButton.click();
    }
})

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
            deleteSmallButton(name);
        };
        
        link.setAttribute('href', url);
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

function deleteSmallButton(name)
{
    links = links.filter(function (val,index,arr) {return val != name});
    localStorage.setItem("links", JSON.stringify(links));
    listUpdate();
}