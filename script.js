// সব আর্টিকেল জমা রাখার ভেরিয়েবল
let allArticles = [];

// ===== ১. পেজ লোড হওয়ার সময় প্রাথমিক কাজ (Initial Load) =====
document.addEventListener('DOMContentLoaded', () => {
    // ডার্ক মোড চেক করা
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
            hamburger.classList.toggle('active');
        });
    }
});

// ===== ২. data.json থেকে ডেটা নিয়ে আসা =====
async function loadArticles() {
    try {
        showLoader(true);
        const response = await fetch('./data.json?v=' + Date.now());

        if (!response.ok) throw new Error(`ফাইল পাওয়া যায়নি (Status: ${response.status})`);

        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('ডেটা পাওয়া যায়নি অথবা JSON ফরম্যাট ভুল।');
        }

        allArticles = data;
        allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
        loadCategory('home');

    } catch (error) {
        console.error('Error details:', error);
        const container = document.getElementById('articlesContainer');
        container.innerHTML = `<div style="text-align:center; padding:50px; color:red;"><h3>⚠️ লোডিং সমস্যা!</h3><p>${error.message}</p></div>`;
    } finally {
        showLoader(false);
    }
}

// ===== ৩. সার্চ লজিক =====
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

// ===== ৪. ডার্ক মোড লজিক =====
function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateDarkModeUI(isDark);
}

function updateDarkModeUI(isDark) {
    const modeText = document.getElementById('modeText');
    const modeIcon = document.getElementById('modeIcon');
    if (modeText) modeText.innerText = isDark ? "Light Mode" : "Dark Mode";
    if (modeIcon) modeIcon.innerText = isDark ? "☀️" : "🌙";
}

// ===== ৫. ক্যাটাগরি ফিল্টারিং (Contact সহ) =====
function loadCategory(category) {
    // যদি Contact এ ক্লিক করা হয়, তবে সরাসরি কন্টাক্ট পেজে নিয়ে যাবে
    if (category === 'contact') {
        window.location.href = 'contact.html';
        return;
    }

    let filtered = [];
    if (category === 'home' || category === 'latest') {
        filtered = allArticles.slice(0, 10);
    } else {
        filtered = allArticles.filter(item => item.category === category);
    }

    displayArticles(filtered);

    // মোবাইল মেনু বন্ধ করা
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('hamburger');
    if (nav) nav.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
}

// ===== ৬. ইউজার ইন্টারফেসে আর্টিকেল দেখানো (প্রথম আলো স্টাইল - বক্স ছাড়া) =====
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
        card.className = 'article-card'; // CSS থেকে বক্স ও শ্যাডো রিমুভ করা হয়েছে
        card.innerHTML = `
            <div style="padding: 10px 0;">
                <span class="article-badge" style="color:#e94560; font-weight:bold; cursor:pointer;" onclick="loadCategory('${article.category}')">
                    ${article.category.toUpperCase()}
                </span>
                <h2 class="article-title" style="margin: 8px 0; cursor:pointer;" onclick="viewArticle('${article.id}')">
                    ${article.title}
                </h2>
                <div class="article-meta" style="color: #888; font-size: 0.85rem; margin-bottom: 8px;">
                    By ${article.author} | ${article.date}
                </div>
                <p class="article-body" style="color: #444; line-height: 1.6;">
                    ${article.content.substring(0, 160)}...
                </p>
                <span class="read-more-btn" style="color:#007bff; cursor:pointer; font-weight:bold; text-decoration:underline;" onclick="viewArticle('${article.id}')">
                    আরও পড়ুন
                </span>
            </div>
        `;
        container.appendChild(card);
    });
}

// ===== ৭. বিস্তারিত আর্টিকেল দেখা =====
function viewArticle(id) {
    const article = allArticles.find(a => a.id === id);
    if (!article) return;

    const container = document.getElementById('articlesContainer');
    container.innerHTML = `
        <div class="full-article" style="padding: 10px 0;">
            <button onclick="loadCategory('home')" style="background:none; border:none; color:#007bff; cursor:pointer; font-weight:bold; margin-bottom:15px;">← ফিরে যান</button>
            <h1 style="font-size: 2rem; margin-bottom: 10px;">${article.title}</h1>
            <div style="color:#777; margin-bottom:20px;">প্রকাশিত: ${article.date} | লেখক: ${article.author}</div>
            <hr style="border: 0; border-top: 1px solid #eee; margin-bottom: 20px;">
            <div style="line-height: 1.8; font-size: 1.1rem; color:#222;">
                ${article.content.replace(/\n/g, '<br>')}
            </div>
            <div style="margin-top:40px; padding:15px; background:#f9f9f9; border-radius:8px;">
                <strong>শেয়ার করুন:</strong> <br>
                <button onclick="copyLink('${article.id}')" style="margin-top:10px; padding:5px 15px; cursor:pointer;">লিংক কপি করুন</button>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

// ===== ৮. অন্যান্য ফাংশন =====
function showLoader(show) {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = show ? 'block' : 'none';
}

function copyLink(id) {
    const url = window.location.origin + window.location.pathname + '?id=' + id;
    navigator.clipboard.writeText(url).then(() => alert('লিংক কপি হয়েছে!'));
}

function goHome() {
    loadCategory('home');
}