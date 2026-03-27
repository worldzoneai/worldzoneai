// বিজ্ঞাপনের কোডগুলো কোটেশনের (" ") ভেতরে বসান
const adCodeHeader = "";
const adCodeMiddle1 = "";
const adCodeMiddle2 = "";
const adCodeFooter = "";

let articles = [];

// JSON থেকে ডাটা লোড করা
async function loadNews() {
    try {
        const response = await fetch('data.json');
        articles = await response.json();
        displayArticles();
    } catch (error) {
        console.error("ডাটা লোড করতে সমস্যা:", error);
    }
}

function displayArticles(filter = 'All', searchTerm = '') {
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    articles.forEach((article) => {
        const matchesFilter = (filter === 'All' || article.category === filter);
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());

        if (matchesFilter && matchesSearch) {
            const formattedContent = article.content.replace(/\n/g, '<br>');
            const contentParts = formattedContent.split('<br>');
            const mid = Math.floor(contentParts.length / 2);

            const card = document.createElement('article');
            card.className = 'article-card';
            card.id = `post-${article.id}`;
            
            card.innerHTML = `
                <span class="cat-badge">${article.category}</span>
                <div class="headline">${article.title}</div>
                <div class="meta">WorldzoneAI • ${article.date}</div>

                <div class="ad-slot">${adCodeHeader}</div>

                <div class="content-area truncated">${article.content}</div>

                <div class="content-area full-content">
                    ${contentParts.slice(0, Math.floor(mid/2)).join('<br>')}
                    <div class="ad-slot">${adCodeMiddle1}</div>
                    ${contentParts.slice(Math.floor(mid/2), mid).join('<br>')}
                    <div class="ad-slot">${adCodeMiddle2}</div>
                    ${contentParts.slice(mid).join('<br>')}
                    <div class="ad-slot">${adCodeFooter}</div>
                </div>

                <div class="card-actions">
                    <span class="read-more-btn" onclick="toggleReadMore(${article.id})">বিস্তারিত পড়ুন...</span>
                    <button class="share-btn" onclick="sharePage()"><i class="fa fa-share-nodes"></i> শেয়ার</button>
                </div>
            `;
            container.appendChild(card);
        }
    });
}

function toggleReadMore(id) {
    const card = document.getElementById(`post-${id}`);
    const btn = card.querySelector('.read-more-btn');
    if (card.classList.contains('expanded')) {
        card.classList.remove('expanded');
        btn.innerText = 'বিস্তারিত পড়ুন...';
        window.scrollTo({top: card.offsetTop - 80, behavior: 'smooth'});
    } else {
        card.classList.add('expanded');
        btn.innerText = 'সংক্ষিপ্ত করুন';
    }
}

// কমন ফাংশনসমূহ
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('active'); }
function toggleSearch() { 
    const box = document.getElementById('search-box');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
    if(box.style.display === 'block') document.getElementById('search-input').focus();
}
function toggleDarkMode() {
    const body = document.body;
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? '' : 'dark');
}
function searchArticles() { displayArticles('All', document.getElementById('search-input').value); }
function filterCategory(catName) { displayArticles(catName); toggleSidebar(); }
function sharePage() {
    if (navigator.share) navigator.share({ title: 'WorldzoneAI', url: window.location.href });
    else alert('লিঙ্ক কপি করুন: ' + window.location.href);
}

// অ্যাপ্লিকেশন শুরু
loadNews();
