import loadHTML from "../base/loadhtml.js"
let container = document.querySelector('#container')

// ============== EVENT LISTENER ==================
document.addEventListener('DOMContentLoaded',()=>{
    loadHTML("#navbar", '../base/navbar.html')
})



// =========== FETCH ==========

document.addEventListener('DOMContentLoaded',()=>{
    fetch("http://127.0.0.1:8000/songs/")
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        // CREATE CARD FOR EACH SONG
        data.forEach(song=>{
            let cardDiv = createCard(song.id, song.thumbnail_base64, song.name)
            cardDiv.addEventListener('click', ()=>{
                console.log(cardDiv.querySelector('.title').innerHTML)
                localStorage.setItem('song',JSON.stringify(song))
                window.location.href = `../song/song.html?${song.id}`
            })

        })
    })
})

// =========== FUNCTIONS ==========
function createCard(songId, imgSrc, songName){
    let cardDiv = document.createElement('div')
    cardDiv.classList = ['card']
    cardDiv.id = songId

    let thumbnail = document.createElement('img')
    thumbnail.setAttribute('src', `data:image/jpeg;base64,${imgSrc}`)
    thumbnail.classList=['thumbnail']
    cardDiv.appendChild(thumbnail)

    let playlistcircle = document.createElement('div')
    playlistcircle.classList = ['playlistCircle']
    let addicon = document.createElement('img')
    addicon.src = "images/add.png"
    addicon.classList = ['addIcon']
    playlistcircle.appendChild(addicon)
    cardDiv.appendChild(playlistcircle)

    let icondiv = document.createElement('div')
    icondiv.classList=['icon-div']

    let circlediv1 = document.createElement('div')
    circlediv1.classList = ['circle']
    let likeicon = document.createElement('img')
    likeicon.classList = ['icon like']
    likeicon.src = 'images/unlike.png'
    circlediv1.appendChild(likeicon)
    icondiv.appendChild(circlediv1)
    
    let circlediv2 = document.createElement('div')
    circlediv2.classList = ['circle']
    let pause = document.createElement('img')
    pause.classList = ['icon pause']
    pause.src = 'images/play-solid.svg'
    circlediv2.appendChild(pause)
    icondiv.appendChild(circlediv2)

    cardDiv.appendChild(icondiv)

    let title = document.createElement('p')
    title.classList=['title']
    title.innerHTML = songName
    cardDiv.appendChild(title)
    container.appendChild(cardDiv)

    return cardDiv
}