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
    const del = document.createElement('p')
    const edit = document.createElement('p')
    del.classList.add('delete')
    edit.classList.add('edit')
    del.innerHTML = '❌'
    edit.innerHTML = '✍️'
    noteListItem.innerHTML = noteObj.body
    noteListItem.appendChild(del)
    noteListItem.appendChild(edit)

    // noteListItem.classList.add(
    //     'delete',
    //     'edit'
    // )
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
    // if my user clicks on an element with the class name of
    // delete, then I wan to run deleteTodo()
    if (event.target.classList.contains('delete')) {
        deleteNote(event.target)
    }
})

function deleteNote(element) {
    // I need to find the todo item that I want to remove from the DOM
    // and delete from the database by grabbing on to the todo's id
    const noteId = element.parentElement.id
    // This request url is slightly different than your GET request url
    // I am taking my base url localhost:3000/notes and adding
    // /${todoId} where todoId equals the id of todoId element
    fetch(url + "/" + `${noteId}`, {
        // I need to send some information with this request
        // I am telling the API that the request method is DELETE
        method: 'DELETE'
        // here is where I am moving the todo from the DOM
        // so we don't see it on our page anymore
    }).then(() => element.parentElement.remove())
}




// calls function to display notes
getListOfNotes()
