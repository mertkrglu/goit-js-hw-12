import { fetchImages } from './odev.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// iziToast gibi bir kütüphane kullanıyorsanız import etmeyi unutmayın

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
    // 1. İstek başladığında loader'ı göster (İsteğe bağlı ama önerilir)
    const data = await fetchImages(query, page);

    // 2. Gelen veriyi ekrana bas
    renderGallery(data.hits);

    // 3. TOPLAM YÜKLENEN SAYIYI GÜNCELLE (Kritik nokta)
    totalLoaded += data.hits.length;
    lightbox.refresh();

    // 4. KOLEKSİYON SONU KONTROLÜ
    // Eğer toplam yüklenen sayı, API'den gelen toplam sonuca eşit veya büyükse
    if (totalLoaded >= data.totalHits || data.hits.length < 40) {
      loadMoreBtn.style.display = 'none'; // Butonu gizle

      // Ödevde istenen tam mesajı göster
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      // Hala yüklenecek resim varsa butonu göster
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error('Hata:', error);
    iziToast.error({ message: 'Something went wrong!' });
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
        <div class="info-item">
          <b>Likes</b>
          <span>${img.likes}</span>
        </div>
        <div class="info-item">
          <b>Views</b>
          <span>${img.views}</span>
        </div>
        <div class="info-item">
          <b>Comments</b>
          <span>${img.comments}</span>
        </div>
        <div class="info-item">
          <b>Downloads</b>
          <span>${img.downloads}</span>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

// Yumuşak Kaydırma (Smooth Scroll) Fonksiyonu
function smoothScroll() {
  // Galerideki ilk kartın yüksekliğini al
  const galleryElement = document.querySelector('.gallery');
  if (galleryElement.firstElementChild) {
    const { height: cardHeight } =
      galleryElement.firstElementChild.getBoundingClientRect();

    // Sayfayı 2 kart boyu aşağı kaydır
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth', // Yumuşak kaydırma efekti
    });
  }
}
