const url = 'http://localhost:3000/notes'
const form = document.querySelector('#note-form')
const output = document.querySelector('.notes')
const getNotesButton = document.querySelector('.button')

function getListOfNotes () {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        
        for (let x of data) {
        // // generates the title of the note
        // const title = document.createElement('p')
        // title.innerHTML = "Title: " + x.title
        // output.appendChild(title)

        // // generates the body of the note
        // const body = document.createElement('p')
        // body.innerHTML = "Body: " + x.body
        // output.appendChild(body)

        renderNotes(x)
        }
    })
}

form.addEventListener('submit', event => {
    event.preventDefault()
    const noteText = document.getElementById('newNote').value
    createNote(noteText)
})

function createNote(noteText) {
    // I am making a POST request so that I can add
    // a new todo to my database. 
    fetch(url, {
        // I need to send some extra information with this request
        // specifically i am sending the value of my input on the DOM
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: noteText,
            body: noteText,
            // here I am creating a new key and using moment().format()
            // to create a time string that captures when the new todo was created
            create_at: moment().format()
        })
    })
    .then(response => response.json())
    .then(data => renderNotes(data))
}

function renderNotes(noteObj) {
    const itemEl = document.createElement('li')
    itemEl.id = noteObj.id
    itemEl.classList.add(
        
    )   
    
    renderNoteText(itemEl, noteObj)
    output.appendChild(itemEl)
}

   // This function is taking two arguments: a todo <li> a todo object.
function renderNoteText(noteListItem, noteObj) {
       // Here I am setting the content of my <li> to the body of my todo object
    noteListItem.innerHTML = noteObj.body
    }



// document.getElementById("button").addEventListener("click", event => {
//     event.preventDefault()
//     getListOfNotes()
// })

getListOfNotes()
