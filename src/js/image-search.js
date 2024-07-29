import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";



document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('searchForm')
    const input = document.getElementById('searchQuery')
    const resultDiv = document.getElementById('results')
    const loader = document.getElementById('loader');
    const loadMoreBtn = document.getElementById('loadMoreBtn')

    let currentPage = 1;
    let currentQuery = '';
    let totalHits = 40;

    loadMoreBtn.style.display = 'none';

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        currentQuery = input.value;
        currentPage = 1;
        resultDiv.innerHTML = '';
        loadMoreBtn.style.display = 'inline-block';
        fetchImages(currentQuery, currentPage)
    });
    
    loadMoreBtn.addEventListener('click', async () => {
        currentPage++;
        await fetchImages(currentQuery, currentPage);
        const firstCard = document.querySelector('.image-card');
        if (firstCard) {
            const cardHeight = firstCard.getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight * 4,
                behavior: 'smooth'
            });
        }
    });

    async function fetchImages(query, page) {
        const searchParams = new URLSearchParams({
            key: '44808922-f3ebf9148f40a6c297279d5b7',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: page,
            per_page: 20
        });


        const url = `https://pixabay.com/api/?${searchParams}`;
        loader.style.display = 'block';

        try {
            const response = await axios.get(url);
            const data = response.data;
            returnResult(data);
        } catch (error) {
            console.log('Error:', error);
        } finally {
            loader.style.display = 'none';
        }
    }
    
    function returnResult(data) {
        if(data.hits.length > 0) {
            data.hits.forEach(hit => {
                const card = document.createElement('div');
                card.className = 'image-card';
                card.innerHTML = 
                    `<a href="${hit.largeImageURL}" class="gallery-item">
                        <img src="${hit.webformatURL}" alt="${hit.tags}">
                    </a>
                    <div class="info">
                        <div><p>Likes</p><span>${hit.likes}</span></div>
                        <div><p>Views</p><span>${hit.views}</span></div>
                        <div><p>Comments</p><span>${hit.comments}</span></div>
                        <div><p>Downloads</p><span>${hit.downloads}</span></div>
                    </div>`;
                resultDiv.appendChild(card);
            });

            const lightbox = new SimpleLightbox('.gallery-item', {});
                lightbox.refresh();

            if (data.hits.length < 20) {
                loadMoreBtn.style.display = 'none';
            } else if (resultDiv.children.length >= totalHits) {
                loadMoreBtn.style.display = 'none';
                iziToast.info({
                    message: "We're sorry, but you've reached the end of search results.",
                    progressBarColor: '#808080',
                    displayMode: 'replace',
                    position: 'topRight',
                    zindex: '999',
                    closeOnClick: 'true'
                });
            } else {
                loadMoreBtn.style.display = 'block';
            }
        } else {
            loadMoreBtn.style.display = 'none';
            iziToast.error({
                message: `Sorry, there are no images matching<br> your search query. Please try again!`,
                progressBarColor: '#808080',
                displayMode: 'replace',
                position: 'topRight',
                zindex: '999',
                closeOnClick: 'true'
            });
        }
    }
})