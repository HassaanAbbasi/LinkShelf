const inputButton = document.getElementById("input-btn"); //Blue button
const input = document.getElementsByClassName("input-el"); //Text Field
const list = document.getElementById("list"); //List
let links = []; //Stores the saved links

inputButton.addEventListener("click", function() {
    var inputVal = input[0].value;
    if(inputVal != "")
    {
        links.push(inputVal);
        input[0].value = "";
        listUpdate(links.length - 1);
    }
    else
    {
        alert("Whoops! You can't save this tab with a blank input. Please write anything in the input line and press 'Save Tab'.");
    }
});

function listUpdate(link)
{
    const name = links[link];
    var item = document.createElement("li");
    var link = document.createElement("a");
    link.innerText = name;
    link.setAttribute('href', window.location.href);
    link.setAttribute('target', "_blank");
    item.appendChild(link);
    list.appendChild(item);
}