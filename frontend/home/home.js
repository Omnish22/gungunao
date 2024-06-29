import loadHTML from "../base/loadhtml.js";
let container = document.querySelector('#container');
let paginatorSection = document.querySelector('#pagination');


loginClicked();
// ============== EVENT LISTENER ==================
document.addEventListener('DOMContentLoaded', () => {
    loadHTML("#navbar", '../base/navbar.html');
    loadSongs(1); // Load the first page of songs when the page loads
});

// =========== FUNCTIONS ==========

export function loadSongs(page) {
    fetch(`http://127.0.0.1:8000/songs/?page=${page}`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(response => {
            
            return response.json()})
        .then(data => {
            console.log(data);
            createPaginator(data);
            // CREATE CARD FOR EACH SONG
            container.innerHTML = ''; // Clear previous songs
            let songs = data['results'];

            songs.forEach(song => {
                let cardDiv = createCard(song.id, song.thumbnail_base64, song.name);
                cardDiv.addEventListener('click', () => {
                    console.log(cardDiv.querySelector('.title').innerHTML);
                    localStorage.setItem('song', JSON.stringify(song));
                    window.location.href = `/song/song.html?${song.id}`;
                });
            });
        })
        .catch((e)=>{
            console.log('Error in Autherization')
            window.location.href = `/user/login/index.html`;
        })
}

function createCard(songId, imgSrc, songName) {
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.id = songId;

    let thumbnail = document.createElement('img');
    thumbnail.setAttribute('src', `data:image/jpeg;base64,${imgSrc}`);
    thumbnail.classList.add('thumbnail');
    cardDiv.appendChild(thumbnail);

    let playlistcircle = document.createElement('div');
    playlistcircle.classList.add('playlistCircle');
    let addicon = document.createElement('img');
    addicon.src = "images/add.png";
    addicon.classList.add('addIcon');
    playlistcircle.appendChild(addicon);
    cardDiv.appendChild(playlistcircle);

    let icondiv = document.createElement('div');
    icondiv.classList.add('icon-div');

    let circlediv1 = document.createElement('div');
    circlediv1.classList.add('circle');
    let likeicon = document.createElement('img');
    likeicon.classList.add('icon', 'like');
    likeicon.src = 'images/unlike.png';
    circlediv1.appendChild(likeicon);
    icondiv.appendChild(circlediv1);

    let circlediv2 = document.createElement('div');
    circlediv2.classList.add('circle');
    let pause = document.createElement('img');
    pause.classList.add('icon', 'pause');
    pause.src = 'images/play-solid.svg';
    circlediv2.appendChild(pause);
    icondiv.appendChild(circlediv2);

    cardDiv.appendChild(icondiv);

    let title = document.createElement('p');
    title.classList.add('title');
    title.innerHTML = songName;
    cardDiv.appendChild(title);
    container.appendChild(cardDiv);

    return cardDiv;
}

function createPaginator(response) {
    paginatorSection.innerHTML = ''; // Clear previous pagination

    let prev = document.createElement('div');
    prev.classList.add('previous', 'pagi-item');
    prev.innerHTML = '<< Prev';

    let currentPageNum = getCurrentPage(response);
    let current = document.createElement('div');
    current.classList.add('num', 'pagi-item');
    current.innerHTML = currentPageNum;

    let next = document.createElement('div');
    next.classList.add('next', 'pagi-item');
    next.innerHTML = 'Next >>';

    let prevUrl = response['previous'];
    let nextUrl = response['next'];

    if (prevUrl) {
        prev.addEventListener('click', () => {
            loadSongs(currentPageNum - 1);
        });
        paginatorSection.appendChild(prev);
    }

    paginatorSection.appendChild(current);

    if (nextUrl) {
        next.addEventListener('click', () => {
            loadSongs(currentPageNum + 1);
        });
        paginatorSection.appendChild(next);
    }
}

function createUrl(page) {
    return `http://127.0.0.1:8000/songs/?page=${page}`;
}

function getCurrentPage(response) {
    let next = response['next'];
    let previous = response['previous'];

    if (!previous && !next) {
        return 1;
    }

    function getPageNumberFromUrl(url) {
        if (!url) return null;
        const urlObj = new URL(url);
        let pageValue = parseInt(urlObj.searchParams.get('page'), 10);
        console.log('pageValue ', pageValue);
        if (isNaN(pageValue)) { return 1; }
        return pageValue;
    }

    const previousPage = getPageNumberFromUrl(previous);
    const nextPage = getPageNumberFromUrl(next);

    if (previousPage !== null && nextPage !== null) {
        return previousPage + 1;
    } else if (previousPage !== null) {
        return previousPage + 1;
    } else if (nextPage !== null) {
        return nextPage - 1;
    }

    return 1;
}

function saveNextPreviousIds(currentSongElement){
    localStorage.setItem('nextSong',currentSongElement.nextSibling.id)
    localStorage.setItem('prevSong',currentSongElement.perviousSibling.id)
}


function loginClicked() {
    document.addEventListener('click', (event) => {
        
        // Check if the clicked element or its parent is the logout button
        if (event.target.id === 'login' || event.target.closest('#login') ) {
            setTimeout(() => {
                window.location.href='/user/login/index.html'
            }, 100);
        }
        if(event.target.id === 'logout' || event.target.closest('#logout'))
        {
            setTimeout(() => {
                localStorage.clear()
                window.location.href='/user/login/index.html'
            }, 100); 
        }
    });
}

export default loadSongs;