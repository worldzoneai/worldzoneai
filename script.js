const articles = [
    { 
        title: "ব্রেকিং নিউজ: ২০২৬ সালের সেরা এআই টুলস কোনগুলো?", 
        category: "সর্বশেষ", 
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
        date: "২৭ মার্চ", 
        desc: "প্রযুক্তি বিশ্বে প্রতিদিন নতুন নতুন এআই আসছে। তবে এ বছর উৎপাদনশীলতা বাড়াতে চ্যাটজিপিটি এবং জেমিনিই শীর্ষে রয়েছে।" 
    },
    { 
        title: "ফ্রিল্যান্সিং করে মাসে লাখ টাকা ইনকামের সহজ উপায়", 
        category: "ইনকাম", 
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
        date: "২৭ মার্চ", 
        desc: "ঘরে বসে ইনকাম করতে চাইলে এখন গ্রাফিক ডিজাইন ও ওয়েব ডেভেলপমেন্টের চাহিদা সবচেয়ে বেশি। জেনে নিন কিভাবে শুরু করবেন।" 
    },
    { 
        title: "ইন্টারনেটে আজ যা সবচেয়ে বেশি আলোচিত: ট্রেন্ডিং সংবাদ", 
        category: "ট্রেন্ডিং", 
        image: "https://images.unsplash.com/photo-1510733722163-bb299581a3c6?w=600&q=80",
        date: "২৭ মার্চ", 
        desc: "সোশ্যাল মিডিয়ায় ভাইরাল হওয়া আজকের সেরা সব খবর এবং ভিডিওর আপডেট একনজরে দেখে নিন।" 
    }
];

// সার্চবার টগল
function toggleSearch() {
    const box = document.getElementById('search-box');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
    if(box.style.display === 'block') document.getElementById('search-input').focus();
}

// সার্চ ফাংশন
function searchArticles() {
    const input = document.getElementById('search-input').value.toLowerCase();
    displayArticles('All', input);
}

// ডার্ক মোড
function toggleDarkMode() {
    const body = document.body;
    const icon = document.querySelector('#dark-mode-toggle i');
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.className = 'fa fa-moon';
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.className = 'fa fa-sun';
    }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function displayArticles(filter = 'All', searchTerm = '') {
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    articles.forEach((article) => {
        const matchesFilter = (filter === 'All' || article.category === filter);
        const matchesSearch = article.title.toLowerCase().includes(searchTerm) || article.desc.toLowerCase().includes(searchTerm);

        if (matchesFilter && matchesSearch) {
            container.innerHTML += `
                <article class="article-card">
                    <span class="cat-badge">${article.category}</span>
                    <img src="${article.image}" class="article-img" alt="news">
                    <div class="headline">${article.title}</div>
                    <div class="meta">WorldzoneAI • ${article.date}</div>
                    <p style="font-size:14px; margin-bottom:15px; opacity: 0.9; line-height: 1.5;">${article.desc}</p>
                    <div class="card-actions">
                        <a href="#" class="read-more">বিস্তারিত পড়ুন...</a>
                        <button class="share-btn" onclick="sharePage()">
                            <i class="fa fa-share-nodes"></i> শেয়ার
                        </button>
                    </div>
                </article>
            `;
        }
    });
}

function sharePage() {
    if (navigator.share) {
        navigator.share({ title: 'WorldzoneAI', url: window.location.href });
    } else {
        alert('লিঙ্ক কপি করুন: ' + window.location.href);
    }
}

function filterCategory(catName) {
    displayArticles(catName);
    toggleSidebar();
}

// শুরুতে সব লোড করা
displayArticles();
