const articles = [
    { title: "ব্রেকিং নিউজ: নতুন এআই প্রযুক্তির আবির্ভাব", category: "সর্বশেষ", date: "২৭ মার্চ", desc: "বিশ্বের সব দেশ এখন এআই নিয়ে কাজ করছে।" },
    { title: "আজকের জনপ্রিয় খবর", category: "ট্রেন্ডিং", date: "২৭ মার্চ", desc: "ইন্টারনেটে আজ যা সবচেয়ে বেশি আলোচিত।" },
    { title: "ফ্রিল্যান্সিং টিপস ২০২৬", category: "ইনকাম", date: "২৬ মার্চ", desc: "নতুনদের জন্য ইনকাম করার সেরা গাইড।" },
    { title: "স্মার্টফোনের দাম কমছে", category: "টেকনোলজি", date: "২৬ মার্চ", desc: "বাজারের সর্বশেষ টেক আপডেট দেখুন।" }
];

// সার্চবার টগল
function toggleSearch() {
    const box = document.getElementById('search-box');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

// সার্চ ফাংশন
function searchArticles() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const container = document.getElementById('news-container');
    container.innerHTML = '';
    
    articles.forEach(article => {
        if (article.title.toLowerCase().includes(input) || article.desc.toLowerCase().includes(input)) {
            renderCard(article);
        }
    });
}

function toggleSidebar() { document.getElementById('sidebar').classList.toggle('active'); }

function displayArticles(filter = 'All') {
    const container = document.getElementById('news-container');
    container.innerHTML = '';
    articles.forEach(article => {
        if (filter === 'All' || article.category === filter) {
            renderCard(article);
        }
    });
}

function renderCard(article) {
    const container = document.getElementById('news-container');
    container.innerHTML += `
        <article class="article-card">
            <span style="background:var(--primary-color);color:#fff;font-size:11px;padding:3px 8px;border-radius:5px;display:inline-block;margin-bottom:5px;">${article.category}</span>
            <div style="font-size:1.1rem;font-weight:bold;margin-bottom:8px;">${article.title}</div>
            <div style="font-size:12px;color:#65676b;margin-bottom:10px;">WorldzoneAI • ${article.date}</div>
            <p style="font-size:14px;margin-bottom:15px;line-height:1.5;">${article.desc}</p>
            <div class="card-actions">
                <span style="color:var(--primary-color);font-weight:bold;cursor:pointer;">বিস্তারিত পড়ুন...</span>
                <button class="share-btn" onclick="sharePage()"><i class="fa fa-share-nodes"></i> শেয়ার করুন</button>
            </div>
        </article>
    `;
}

function filterCategory(catName) { displayArticles(catName); toggleSidebar(); }
function toggleDarkMode() {
    const body = document.body;
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? '' : 'dark');
}

displayArticles();
