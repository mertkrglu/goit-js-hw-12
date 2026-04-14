import { fetchImages } from './odev.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// iziToast gibi bir kütüphane kullanıyorsanız import etmeyi unutmayın
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let query = '';
let page = 1;
let totalLoaded = 0;

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

// Başlangıçta butonu gizle
loadMoreBtn.style.display = 'none';

let lightbox = new SimpleLightbox('.gallery a');

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();

  if (!query) return;

  page = 1;
  totalLoaded = 0;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';

  await handleFetch();
}

async function onLoadMore() {
  page += 1;
  await handleFetch();
  smoothScroll(); // Yeni resimler gelince kaydır
}

async function handleFetch() {
  try {
    // Loader'ı göster (HTML'de loader'ın varsa)
    document.querySelector('.loader').style.display = 'block';

    const data = await fetchImages(query, page);

    if (data.hits.length === 0 && page === 1) {
      iziToast.error({ message: 'Sorry, no images found.' });
      return;
    }

    renderGallery(data.hits);

    // Toplam yüklenen sayıyı kümülatif olarak artır
    totalLoaded += data.hits.length;
    lightbox.refresh();

    // KOLEKSİYON SONU KONTROLÜ
    // Pixabay bazen totalHits'ten daha az resim döner,
    // bu yüzden "data.hits.length < 40" (sayfa başı miktar) kontrolü hayat kurtarır.
    if (totalLoaded >= data.totalHits || data.hits.length < 40) {
      loadMoreBtn.style.display = 'none'; // Butonu gizle

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      loadMoreBtn.style.display = 'block'; // Hala resim varsa göster
    }
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    document.querySelector('.loader').style.display = 'none';
  }
}

function renderGallery(images) {
  const markup = images
    .map(
      img => `
    <div class="photo-card">
      <a href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${img.likes}</p>
        <p><b>Views:</b> ${img.views}</p>
        <p><b>Comments:</b> ${img.comments}</p>
        <p><b>Downloads:</b> ${img.downloads}</p>
      </div>
    </div>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

// Yumuşak Kaydırma (Smooth Scroll) Fonksiyonu
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
