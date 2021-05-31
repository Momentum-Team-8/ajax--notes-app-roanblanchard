const url = 'http://localhost:3000/notes'
const form = document.querySelector('#note-form')
const output = document.querySelector('.notes')
const getNotesButton = document.querySelector('.button')
const changePlaceholder = document.querySelector('#newNote')
const editButtonSubmit = document.querySelector('.edit')


// iterates through notes and renders them to the screen
function getListOfNotes () {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        
        for (let x of data) {
        renderNotes(x)
        }
    })
    changePlaceholder.placeholder = 'Enter note here'
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
    const del = document.createElement('p')
    const edit = document.createElement('p')
    del.classList.add('delete')
    edit.classList.add('edit')
    del.innerHTML = '❌'
    edit.innerHTML = '✍️'
    noteListItem.innerHTML = noteObj.body
    noteListItem.appendChild(del)
    noteListItem.appendChild(edit)

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

// handles deleting a note from the list
output.addEventListener('click', event => {
    if (event.target.classList.contains('delete')) {
        deleteNote(event.target)
    }
})

function deleteNote(element) {
    const noteId = element.parentElement.id
    fetch(url + "/" + `${noteId}`, {
        method: 'DELETE'
    }).then(() => element.parentElement.remove())
}


// handles editing notes
output.addEventListener('click', event => {
    if (event.target.classList.contains('edit')) {
        newNoteInput = document.createElement('input')
        newNoteInput.classList.add('new-input-value')
        newNoteSubmit = document.createElement('button')
        newNoteSubmit.innerText = 'Submit'
        newNoteSubmit.classList.add('edit-button')
        newNoteInput.value = event.target.parentElement.innerText.slice(0, -5)
        event.target.appendChild(newNoteInput)
        event.target.appendChild(newNoteSubmit)
    }
})

output.addEventListener('click', event => {
    event.preventDefault()
    if (event.target.classList.contains('edit-button')) {
        updateNote(event.target)
    }
})

function updateNote(element) {
    const noteId = element.parentElement.parentElement.id
    const newNoteText = document.querySelector('.new-input-value').value
    fetch(url + "/" + `${noteId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: newNoteText,
            body: newNoteText,
            create_at: moment().format()
        })
    })
    .then((response) => response.JSON)
    .then((data) => console.log(data))
    location.reload()
}



// calls function to display notes
getListOfNotes()
