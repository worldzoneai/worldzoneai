// বিজ্ঞাপনের কোড এখানে বসাবেন
const adHeader = "Header Ad Here"; 
const adMid1 = "Middle Ad 1 Here";
const adMid2 = "Middle Ad 2 Here";
const adFooter = "Footer Ad Here";

let articles = [];

async function loadNews() {
    try {
        const res = await fetch('data.json');
        articles = await res.json();
        displayArticles();
    } catch (e) { console.error("Data load failed"); }
}

function displayArticles(filter = 'All', search = '') {
    const container = document.getElementById('news-container');
    container.innerHTML = '';
    articles.forEach(article => {
        if ((filter === 'All' || article.category === filter) && article.title.toLowerCase().includes(search.toLowerCase())) {
            const parts = article.content.split('\n\n');
            const card = document.createElement('article');
            card.className = 'article-card';
            card.id = `post-${article.id}`;
            card.innerHTML = `
                <span class="cat-badge" style="background:var(--primary);color:#fff;padding:2px 8px;border-radius:5px;font-size:11px;">${article.category}</span>
                <div class="headline">${article.title}</div>
                <div class="meta">WorldzoneAI • ${article.date}</div>
                <div class="ad-slot">${adHeader}</div>
                <div class="content-area truncated">${article.content}</div>
                <div class="content-area full-content">
                    ${parts.slice(0, 1).join('<br><br>')}
                    <div class="ad-slot">${adMid1}</div>
                    ${parts.slice(1, 2).join('<br><br>')}
                    <div class="ad-slot">${adMid2}</div>
                    ${parts.slice(2).join('<br><br>')}
                    <div class="ad-slot">${adFooter}</div>
                </div>
                <div style="display:flex; justify-content:space-between; margin-top:15px; border-top:1px solid var(--border); padding-top:10px;">
                    <span class="read-more-btn" onclick="toggleReadMore(${article.id})">বিস্তারিত পড়ুন...</span>
                    <span onclick="openShare('${article.title}', ${article.id})" style="cursor:pointer; font-weight:600;"><i class="fa fa-share-nodes"></i> শেয়ার</span>
                </div>
            `;
            container.appendChild(card);
        }
    });
}

function toggleReadMore(id) {
    const card = document.getElementById(`post-${id}`);
    const isExp = card.classList.toggle('expanded');
    card.querySelector('.read-more-btn').innerText = isExp ? 'সংক্ষিপ্ত করুন' : 'বিস্তারিত পড়ুন...';
}

function openShare(title, id) {
    const url = window.location.href + "#post-" + id;
    document.getElementById('social-links').innerHTML = `
        <i class="fab fa-facebook" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${url}')"></i>
        <i class="fab fa-facebook-messenger" onclick="window.open('fb-messenger://share?link=${url}')"></i>
        <i class="fab fa-whatsapp" onclick="window.open('https://api.whatsapp.com/send?text=${title} ${url}')"></i>
        <i class="fab fa-twitter" onclick="window.open('https://twitter.com/intent/tweet?url=${url}')"></i>
    `;
    document.getElementById('share-modal').style.display = 'block';
}

function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('active'); }
function toggleDarkMode() { document.body.setAttribute('data-theme', document.body.getAttribute('data-theme') === 'dark' ? '' : 'dark'); }
function toggleSearch() { document.getElementById('search-box').style.display = (document.getElementById('search-box').style.display === 'none') ? 'block' : 'none'; }
function filterCategory(cat) { if(cat==='যোগাযোগ') document.getElementById('contact-modal').style.display='block'; else displayArticles(cat); toggleSidebar(); }
function searchArticles() { displayArticles('All', document.getElementById('search-input').value); }

loadNews();
