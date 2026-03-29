// Global variable to store articles
let allArticles = [];

// ===== 1. INITIAL LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    loadArticles();

    // Mobile Hamburger Menu logic
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});

// ===== 2. FETCH DATA FROM data.json =====
async function loadArticles() {
    try {
        showLoader(true);
        
        // Fetching data.json with a timestamp to prevent caching issues
        const response = await fetch('./data.json?v=' + Date.now());
        
        if (!response.ok) {
            throw new Error(`ফাইল পাওয়া যায়নি (Status: ${response.status})`);
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('ডেটা পাওয়া যায়নি অথবা JSON ফরম্যাট ভুল।');
        }

        allArticles = data;

        // Sort by date: Newest first
        allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Display Home/Latest articles initially
        loadCategory('home');

    } catch (error) {
        console.error('Error details:', error);
        const container = document.getElementById('articlesContainer');
        container.innerHTML = `
            <div style="background: #fff5f5; padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid #feb2b2; margin: 20px;">
                <h3 style="color: #c53030; margin-bottom: 10px;">⚠️ লোডিং সমস্যা!</h3>
                <p style="color: #742a2a; font-weight: bold;">${error.message}</p>
                <p style="color: #a0aec0; font-size: 13px; margin-top: 10px;">
                    টিপস: নিশ্চিত করুন গিটহাবে ফাইলের নাম 'data.json' আছে।
                </p>
                <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 25px; background: #c53030; color: white; border: none; border-radius: 6px; cursor: pointer;">আবার চেষ্টা করুন</button>
            </div>
        `;
    } finally {
        showLoader(false);
    }
}

// ===== 3. CATEGORY FILTERING =====
function loadCategory(category) {
    let filtered = [];
    
    if (category === 'home' || category === 'latest') {
        filtered = allArticles.slice(0, 10); // Show latest 10
    } else {
        filtered = allArticles.filter(item => item.category === category);
    }

    displayArticles(filtered);
    
    // Close mobile menu after clicking
    document.getElementById('nav').classList.remove('active');
    document.getElementById('hamburger').classList.remove('active');
}

// ===== 4. DISPLAY ARTICLES ON UI =====
function displayArticles(articles) {
    const container = document.getElementById('articlesContainer');
    container.innerHTML = '';

    if (articles.length === 0) {
        container.innerHTML = `<p style="text-align:center; padding:20px;">No articles found in this category.</p>`;
        return;
    }

    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.innerHTML = `
            <div class="category-badge">${article.category.toUpperCase()}</div>
            <h2>${article.title}</h2>
            <div class="meta">By ${article.author} | ${article.date}</div>
            <p>${article.content.substring(0, 150)}...</p>
            <button class="read-more" onclick="viewArticle('${article.id}')">Read Full Article</button>
        `;
        container.appendChild(card);
    });
}

// ===== 5. VIEW SINGLE ARTICLE =====
function viewArticle(id) {
    const article = allArticles.find(a => a.id === id);
    if (!article) return;

    const container = document.getElementById('articlesContainer');
    container.innerHTML = `
        <div class="full-article">
            <button onclick="loadCategory('home')" class="back-btn">← Back to Home</button>
            <h1>${article.title}</h1>
            <div class="meta">Published: ${article.date} | Author: ${article.author}</div>
            <hr>
            <div class="article-body">${article.content.replace(/\n/g, '<br>')}</div>
            <div class="share-section" style="margin-top:30px; padding:15px; background:#f4f4f4; border-radius:8px;">
                <strong>Share this article:</strong><br>
                <button onclick="copyLink('${article.id}')" style="margin-top:10px; cursor:pointer;">Copy Link</button>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

// ===== 6. SEARCH LOGIC =====
function searchArticles() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const results = allArticles.filter(a => 
        a.title.toLowerCase().includes(query) || 
        a.content.toLowerCase().includes(query)
    );
    displayArticles(results);
}

// ===== 7. UTILITIES (LOADER & COPY) =====
function showLoader(show) {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = show ? 'block' : 'none';
    }
}

function copyLink(id) {
    const url = window.location.origin + window.location.pathname + '?id=' + id;
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
    });
}

function goHome() {
    loadCategory('home');
}
