// সব আর্টিকেল জমা রাখার ভেরিয়েবল
let allArticles = [];

// ===== ১. পেজ লোড হওয়ার সময় প্রাথমিক কাজ (Initial Load) =====
document.addEventListener('DOMContentLoaded', () => {
    // ডার্ক মোড চেক করা (আগে সেট করা থাকলে তা চালু হবে)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateDarkModeUI(true);
    }

    // আর্টিকেল লোড করা
    loadArticles();

    // মোবাইল হামবুর্গ মেনু কন্ট্রোল
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active'); // CSS এনিমেশনের জন্য
        });
    }
});

// ===== ২. data.json থেকে ডেটা নিয়ে আসা =====
async function loadArticles() {
    try {
        showLoader(true);
        // ক্যাশ সমস্যা এড়াতে টাইমস্ট্যাম্প ব্যবহার করে ডেটা ফেচ
        const response = await fetch('./data.json?v=' + Date.now());
        
        if (!response.ok) throw new Error(`ফাইল পাওয়া যায়নি (Status: ${response.status})`);

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('ডেটা পাওয়া যায়নি অথবা JSON ফরম্যাট ভুল।');
        }

        allArticles = data;

        // নতুন পোস্ট আগে দেখানোর জন্য তারিখ অনুযায়ী সর্টিং
        allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

        // শুরুতে হোম/লেটেস্ট পোস্ট দেখানো
        loadCategory('home');

    } catch (error) {
        console.error('Error details:', error);
        const container = document.getElementById('articlesContainer');
        container.innerHTML = `
            <div style="background: #fff5f5; padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid #feb2b2; margin: 20px;">
                <h3 style="color: #c53030; margin-bottom: 10px;">⚠️ লোডিং সমস্যা!</h3>
                <p style="color: #742a2a; font-weight: bold;">${error.message}</p>
                <button onclick="location.reload()" style="margin-top: 15px; padding: 8px 20px; background: #c53030; color: white; border: none; border-radius: 5px; cursor: pointer;">আবার চেষ্টা করুন</button>
            </div>
        `;
    } finally {
        showLoader(false);
    }
}

// ===== ৩. সার্চ বার টগল ও সার্চ লজিক =====
function toggleSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.classList.toggle('show');
        if (searchInput.classList.contains('show')) {
            searchInput.focus();
        }
    }
}

function searchArticles() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const results = allArticles.filter(a => 
        a.title.toLowerCase().includes(query) || 
        a.content.toLowerCase().includes(query)
    );
    displayArticles(results);
}

// ===== ৪. ডার্ক মোড লজিক (ক্যাটাগরি মেনুর ভেতর) =====
function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    
    if (isDark) {
        localStorage.setItem('theme', 'dark');
        updateDarkModeUI(true);
    } else {
        localStorage.setItem('theme', 'light');
        updateDarkModeUI(false);
    }
}

// ডার্ক মোড টেক্সট ও আইকন আপডেট করার ফাংশন
function updateDarkModeUI(isDark) {
    const modeText = document.getElementById('modeText');
    const modeIcon = document.getElementById('modeIcon');
    const darkBtn = document.getElementById('darkModeBtn'); // যদি আলাদা বাটন থাকে

    if (modeText) modeText.innerText = isDark ? "Light Mode" : "Dark Mode";
    if (modeIcon) modeIcon.innerText = isDark ? "☀️" : "🌙";
    if (darkBtn) darkBtn.innerText = isDark ? "☀️" : "🌙";
}

// ===== ৫. ক্যাটাগরি ফিল্টারিং =====
function loadCategory(category) {
    let filtered = [];
    if (category === 'home' || category === 'latest') {
        filtered = allArticles.slice(0, 10); // লেটেস্ট ১০টি দেখাবে
    } else {
        filtered = allArticles.filter(item => item.category === category);
    }

    displayArticles(filtered);
    
    // মেনু বন্ধ করা (মোবাইলে ক্লিক করার পর)
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('hamburger');
    if (nav) nav.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
}

// ===== ৬. ইউজার ইন্টারফেসে আর্টিকেল দেখানো =====
function displayArticles(articles) {
    const container = document.getElementById('articlesContainer');
    if (!container) return;
    
    container.innerHTML = '';

    if (articles.length === 0) {
        container.innerHTML = `<p style="text-align:center; padding:20px;">কোনো আর্টিকেল পাওয়া যায়নি।</p>`;
        return;
    }

    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.innerHTML = `
            <div class="article-header">
                <span class="article-badge">${article.category.toUpperCase()}</span>
                <h2 class="article-title">${article.title}</h2>
                <div class="article-meta">By ${article.author} | ${article.date}</div>
            </div>
            <div class="article-content-wrapper">
                <div class="article-left">
                    <p class="article-body">${article.content.substring(0, 150)}...</p>
                    <button class="read-more-btn" onclick="viewArticle('${article.id}')">Read Full Article</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// ===== ৭. একটি আর্টিকেল বিস্তারিত দেখা =====
function viewArticle(id) {
    const article = allArticles.find(a => a.id === id);
    if (!article) return;

    const container = document.getElementById('articlesContainer');
    container.innerHTML = `
        <div class="full-article" style="padding: 20px; background: var(--white); border-radius: 12px; box-shadow: var(--shadow);">
            <button onclick="loadCategory('home')" class="read-more-btn" style="margin-bottom: 20px;">← Back to Home</button>
            <h1 style="margin-bottom: 10px;">${article.title}</h1>
            <div class="meta" style="font-size: 0.9rem; color: #777; margin-bottom: 20px;">
                Published: ${article.date} | Author: ${article.author}
            </div>
            <hr style="margin-bottom: 20px; opacity: 0.2;">
            <div class="article-body" style="line-height: 1.8; color: var(--text); font-size: 1.1rem;">
                ${article.content.replace(/\n/g, '<br>')}
            </div>
            <div class="share-section" style="margin-top:30px; padding:15px; background: rgba(0,0,0,0.05); border-radius:8px;">
                <strong>Share this article:</strong><br>
                <button class="read-more-btn" onclick="copyLink('${article.id}')" style="margin-top:10px; padding: 5px 15px;">Copy Link</button>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

// ===== ৮. ইউটিলিটি ফাংশন (Loader, Copy, Home) =====
function showLoader(show) {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = show ? 'block' : 'none';
}

function copyLink(id) {
    const url = window.location.origin + window.location.pathname + '?id=' + id;
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
    });
}

function goHome() {
    loadCategory('home');
    window.scrollTo(0, 0);
}