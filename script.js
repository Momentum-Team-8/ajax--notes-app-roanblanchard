const url = 'http://localhost:3000/notes'
const form = document.querySelector('#note-form')
const output = document.querySelector('.notes')
const getNotesButton = document.querySelector('.button')


// iterates through notes and renders them to the screen
function getListOfNotes () {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        
        for (let x of data) {
        renderNotes(x)
        }
    })
}

function renderNotes(noteObj) {
    const itemEl = document.createElement('li')
    itemEl.id = noteObj.id
    itemEl.classList.add(
        
    )   
    
    renderNoteText(itemEl, noteObj)
    output.appendChild(itemEl)
}

function renderNoteText(noteListItem, noteObj) {
    noteListItem.innerHTML = noteObj.body
    }

// end of note rendering


// listens for the submit button to be pressed, submits a new note
form.addEventListener('submit', event => {
    event.preventDefault()
    const noteText = document.getElementById('newNote').value
    createNote(noteText)
    location.reload();
})


// handles creating a new note using a post request
function createNote(noteText) {
    fetch(url, {

        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: noteText,
            body: noteText,
            create_at: moment().format()
        })
    })
    .then(response => response.json())
    .then(data => renderNotes(data))
}




// calls function to display notes
getListOfNotes()
