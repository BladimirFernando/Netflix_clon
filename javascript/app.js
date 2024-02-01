const boxPopular = document.getElementById('boxPopular')
const imgPopular = document.getElementById('imgPopular').content
const details = document.getElementById('movieDetails')
const cardDetails = document.getElementById('cardDetails').content
const fragment = document.createDocumentFragment()

let releases

document.addEventListener('DOMContentLoaded', () => {
    loadData()
})

const loadData = async () => {
    const url = 'https://watchmode.p.rapidapi.com/releases';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8608917c9emsh7f5e6b12a812d15p1f34cbjsnbb86019cb253',
            'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        releases = await response.json();
        createCards()
        console.log('@@@ result => ',result);
    } catch (error) {
        console.error(error);
    }
}

const createCards = () => {
    boxPopular.innerHTML = ''
    releases.releases.forEach((movie) => {
        const clone = imgPopular.cloneNode(true)
        clone.querySelector('p').textContent = movie.title 
        clone.querySelector('img').setAttribute('src',movie.poster_url ? movie.poster_url : '../assets/images/notimge.png')
        clone.querySelector('button').dataset.id = movie.id

        const btnCard = clone.querySelector('button')

        btnCard.addEventListener('click', async () => {
            console.log('click')
            await movieDetails(movie.id)
            boxPopular.innerHTML = ''
        })

        fragment.appendChild(clone)
    })
    boxPopular.appendChild(fragment)
}

const movieDetails = async (id) => {
    const url = `https://watchmode.p.rapidapi.com/title/${id}/details/?language=ES`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '81be6ae3d7mshd35d4b3ecddcb69p190effjsn9ee08343153e',
            'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        detalles(result)
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

const detalles = movie => {
    details.innerHTML=''
    const clone = cardDetails.cloneNode(true)
    clone.querySelector('p').textContent = movie.title
    clone.querySelector('img').setAttribute('src',movie.poster ? movie.poster : '../assets/images/notimge.png')
    clone.querySelector('.date').textContent = movie.release_date
    clone.querySelector('.tipo').textContent = movie.type
    clone.querySelector('.genero').textContent = movie.genre_names[0]
    clone.querySelector('.descripcion').textContent = movie.plot_overview
    clone.querySelector('.rating').textContent = movie.user_rating
    clone.querySelector('.trailer').textContent = movie.trailer

   const btnBack = clone.querySelector('button')
   btnBack.addEventListener('click', ()=> {
    details.innerHTML = ''
    loadData()
   })
    fragment.appendChild(clone)
    details.appendChild(fragment)
}
