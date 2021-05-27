const url = 'http://localhost:3000/notes/'
const output = document.querySelector('.output')
const getNotesButton = document.querySelector('.button')

function getListOfNotes () {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        
        for (let x of data) {
        // generates the title of the note
        const title = document.createElement('p')
        title.innerHTML = "Title: " + x.title
        output.appendChild(title)

        // generates the body of the note
        const body = document.createElement('p')
        body.innerHTML = "Body: " + x.body
        output.appendChild(body)
        }
    })
}



document.getElementById("button").addEventListener("click", event => {
    event.preventDefault()
    getListOfNotes()
})

// getListOfNotes()
