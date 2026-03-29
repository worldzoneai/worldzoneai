// ===== GLOBAL VARIABLES =====
let allArticles = [];
// এই ভেরিয়েবলটি সরাসরি ডাটা ধরে রাখবে
const myArticlesData = [
    {
        "id": "finance-1",
        "title": "10 Essential Tips for Personal Finance Management",
        "category": "finance",
        "author": "John Smith",
        "date": "2024-01-15",
        "content": "Managing personal finances is one of the most important skills you can develop..."
    },
    {
        "id": "finance-2",
        "title": "How to Build an Emergency Fund in 6 Months",
        "category": "finance",
        "author": "Sarah Johnson",
        "date": "2024-01-14",
        "content": "An emergency fund is one of the most important financial safety nets you can create..."
    }
    // আপনার বাকি সব আর্টিকেল এখানে কমা দিয়ে দিয়ে যোগ করুন
];

// আপনার loadArticles ফাংশনটি এভাবে পরিবর্তন করুন
async function loadArticles() {
    try {
        showLoader(true);
        
        // এখন আমরা fetch না করে সরাসরি উপরের ডাটা ব্যবহার করব
        allArticles = myArticlesData; 

        if (allArticles.length === 0) {
            throw new Error('No articles found');
        }

        allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
        loadCategory('home');

    } catch (error) {
        document.getElementById('articlesContainer').innerHTML = `<h3>Error: ${error.message}</h3>`;
    } finally {
        showLoader(false);
    }
}

// ===== LOAD ALL ARTICLES FROM SINGLE JSON FILE =====
async function loadArticles() {
    try {
        showLoader(true);
        
        // '?v=' + Date.now() যোগ করা হয়েছে যাতে ব্রাউজার পুরনো ফাইল না দেখায় (Cache Busting)
        const response = await fetch('./articles.json?v=' + Date.now());
        
        if (!response.ok) {
            // যদি ৪0৪ এরর আসে তবে এটি ক্যাচ করবে
            throw new Error(`সার্ভার ফাইলটি খুঁজে পাচ্ছে না (Status: ${response.status})`);
        }

        const data = await response.json();

        // চেক করা হচ্ছে ডাটা কি আসলেও কোনো লিস্ট বা অ্যারে কি না
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('JSON ফাইলে কোনো আর্টিকেল খুঁজে পাওয়া যায়নি বা ফরম্যাট ভুল।');
        }

        allArticles = data;

        // তারিখ অনুযায়ী নতুন পোস্টগুলো আগে দেখাবে
        allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

        // হোম পেজ লোড করবে
        loadCategory('home');

    } catch (error) {
        console.error('Error details:', error);
        const container = document.getElementById('articlesContainer');
        
        // স্ক্রিনে এরর মেসেজ দেখানোর স্টাইলিশ বক্স
        container.innerHTML = `
            <div style="background: #fff5f5; padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid #feb2b2; margin: 20px;">
                <h3 style="color: #c53030; margin-bottom: 10px;">⚠️ লোডিং সমস্যা!</h3>
                <p style="color: #742a2a; font-weight: bold;">${error.message}</p>
                <p style="color: #a0aec0; font-size: 13px; margin-top: 10px;">
                    টিপস: articles.json ফাইলটি index.html এর পাশেই আছে কি না নিশ্চিত করুন।
                </p>
                <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 25px; background: #c53030; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">পুনরায় চেষ্টা করুন</button>
            </div>
        `;
    } finally {
        showLoader(false);
    }
}

// ===== LOAD CATEGORY =====
function loadCategory(category) {
    const container = document.getElementById('articlesContainer');
    let articles = [];
    let title = '';

    closeMenu();

    switch(category) {
        case 'home':
            articles = allArticles.slice(0, 5);
            title = '📰 Latest Articles';
            break;
        case 'finance':
            articles = allArticles.filter(a => a.category === 'finance');
            title = '💳 Finance Tips';
            break;
        case 'make-money':
            articles = allArticles.filter(a => a.category === 'make-money');
            title = '💵 Make Money Online';
            break;
        case 'latest':
            articles = allArticles;
            title = '📅 All Latest Posts';
            break;
        default:
            articles = allArticles;
            title = '📰 Articles';
    }

    container.innerHTML = `<h2 style="margin-bottom: 1.5rem; text-align: center; font-size: 1.8rem;">${title}</h2>`;

    if (articles.length === 0) {
        container.innerHTML += '<p style="text-align:center; margin-top: 2rem; color: #999;">No articles found.</p>';
        return;
    }

    articles.forEach((article, index) => {
        container.innerHTML += createArticleHTML(article, index);
    });

    window.scrollTo(0, 0);
}

// ===== CREATE ARTICLE HTML =====
function createArticleHTML(article, index) {
    // Content safe check
    const content = article.content || "";
    const words = content.split(' ');
    const excerptWords = words.slice(0, 40).join(' ');
    const hasMore = words.length > 40;

    let adsHTML = '<div class="ads-container"><div class="ad-placeholder">Advertisement</div></div>';

    const shareUrl = encodeURIComponent(`${window.location.origin}?article=${article.id}`);
    const shareTitle = encodeURIComponent(article.title);
    const categoryLabel = article.category === 'finance' ? '💳 FINANCE' : '💵 MAKE MONEY';

    return `
        <article class="article-card">
            <div class="article-header">
                <span class="article-badge">${categoryLabel}</span>
                <h2 class="article-title">${article.title}</h2>
                <div class="article-meta">
                    <span><i class="fas fa-calendar"></i> ${formatDate(article.date)}</span>
                    <span><i class="fas fa-user"></i> ${article.author}</span>
                </div>
            </div>
            
            <div class="article-content-wrapper">
                <div class="article-left">
                    <div class="article-body">
                        <p>${excerptWords}${hasMore ? '...' : ''}</p>
                    </div>
                    ${hasMore ? `
                        <button class="read-more-btn" onclick="readFullArticle('${article.id}')">
                            <i class="fas fa-book-open"></i> Read More
                        </button>
                    ` : ''}
                    <div style="margin-top: 1.5rem;">${adsHTML}</div>
                </div>
                
                <div class="share-section">
                    <div class="share-title">Share This</div>
                    <div class="share-buttons">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" class="share-btn share-facebook"><i class="fab fa-facebook"></i></a>
                        <a href="https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}" target="_blank" class="share-btn share-twitter"><i class="fab fa-twitter"></i></a>
                        <button class="share-btn share-copy" onclick="copyToClipboard('${shareUrl}', this)"><i class="fas fa-copy"></i></button>
                    </div>
                </div>
            </div>
        </article>
    `;
}

// ===== READ FULL ARTICLE =====
function readFullArticle(articleId) {
    const article = allArticles.find(a => String(a.id) === String(articleId));
    if (!article) return;

    const container = document.getElementById('articlesContainer');
    const fullContent = article.content.split('\n\n').map(para => `<p>${para}</p>`).join('');

    container.innerHTML = `
        <button onclick="loadCategory('home')" class="read-more-btn" style="margin-bottom:20px; background: #333;">
            <i class="fas fa-arrow-left"></i> Back
        </button>
        <article class="article-card">
            <div class="article-header">
                <h1 class="article-title">${article.title}</h1>
            </div>
            <div class="article-content-wrapper">
                <div class="article-left">
                    <div class="article-body">${fullContent}</div>
                </div>
            </div>
        </article>
    `;
    window.scrollTo(0, 0);
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text, btn) {
    const url = decodeURIComponent(text);
    navigator.clipboard.writeText(url).then(() => {
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => { btn.innerHTML = originalIcon; }, 2000);
    });
}

// ===== SEARCH, HAMBURGER & INIT =====
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    loadArticles();
});

function closeMenu() {
    document.getElementById('hamburger').classList.remove('active');
    document.getElementById('nav').classList.remove('active');
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function showLoader(show) {
    const loader = document.getElementById('loader');
    if(loader) loader.style.display = show ? 'block' : 'none';
}

function searchArticles() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allArticles.filter(a => a.title.toLowerCase().includes(term));
    const container = document.getElementById('articlesContainer');
    container.innerHTML = term ? `<h2>Search Results for: ${term}</h2>` : `<h2>Latest</h2>`;
    filtered.forEach(a => container.innerHTML += createArticleHTML(a));
}

// script.js এর একদম শুরুতে এটি দিন টেস্ট করার জন্য
fetch('./articles.json')
    .then(response => {
        if (!response.ok) {
            console.log("Status: " + response.status);
            alert("ফাইলটি সার্ভারে পাওয়া যাচ্ছে না! Status: " + response.status);
        }
        return response.json();
    })
    .then(data => console.log("Success:", data))
    .catch(error => alert("ভুল ধরা পড়েছে: " + error.message));
