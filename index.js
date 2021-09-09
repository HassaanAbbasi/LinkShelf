let data = {}
const saveBtn = document.getElementById("save-btn")
const deleteBtn = document.getElementById("delete-btn")
const note = document.getElementById("note")
const list = document.getElementById("list")

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

let loadData = () => {
    const localData = localStorage.getItem("data")
    if (localData) {
        console.log(`loading: ${localData}`)
        data = JSON.parse(localData)
    }
}

let saveData = () => {
    localStorage.setItem("data", JSON.stringify(data))
}

const render = () => {
    console.log('rendering')
    list.innerHTML = ''

    for (const id in data) {
        const { url, note } = data[id]
        console.log(`rendering: ${id}, ${url}, ${note}`)
        
        const item = document.createElement("li")
        const link = document.createElement("a")
        link.innerText = note
        
        const btnRemove = document.createElement("INPUT")
        btnRemove.value = "❌"
        btnRemove.type = "button"
        btnRemove.id = "delete-btn-small"
        btnRemove.onclick = () => {
            handleDelete(id)
        }
        
        link.setAttribute('href', url)
        link.setAttribute('target', "_blank")

        item.appendChild(link)
        item.appendChild(btnRemove)
        list.appendChild(item)
    }
}

const handleDelete = (id) => {
    console.log(`deleteing ${id}`)
    delete data[id]
    saveData()
    render()
}

const handleSave = (url, note) => {
    console.log(`saving ${url}, ${note}`)
    
    const id = uuidv4()
    data[id] = { url, note }
    saveData()
    render()
    note.value = ''
}

saveBtn.addEventListener("click", function() {
    const value = note.value
    if (value === "") {
        alert("Whoops! You can't save this tab with a blank input. Please write anything in the input line and press 'Save Tab'.")
        return
    }

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url
        handleSave(url, value)
    })

    note.value = ""
})

note.addEventListener("keyup", function(e) {
    if (e.keyCode === 13){
        e.preventDefault()
        saveBtn.click()
    }
})

deleteBtn.addEventListener("click", function(e) {
    if (JSON.stringify(data) === JSON.stringify({})){
        alert("There are no links in your list to delete.")
        return
    }
    data = {}
    saveData()
    render()
})

loadData()
render()