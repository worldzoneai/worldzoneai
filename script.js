// ===== GLOBAL VARIABLES =====
let allArticles = [];

// ===== LOAD ALL ARTICLES FROM SINGLE JSON FILE =====
async function loadArticles() {
    try {
        console.log('Loading articles...'); // ডিবাগ লাইন
        showLoader(true);
        
        const response = await fetch('articles.json');
        console.log('Response status:', response.status); // ডিবাগ লাইন
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        allArticles = await response.json();
        console.log('Articles loaded:', allArticles.length); // ডিবাগ লাইন
        
        if (allArticles.length === 0) {
            throw new Error('No articles found in JSON');
        }
        
        // Sort by date (newest first)
        allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        console.log('Articles sorted. Loading home...'); // ডিবাগ লাইন
        loadCategory('home');
        
    } catch (error) {
        console.error('Error loading articles:', error);
        const container = document.getElementById('articlesContainer');
        container.innerHTML = `
            <div style="background: #ffe0e0; padding: 2rem; border-radius: 8px; text-align: center; color: #c33;">
                <h3>⚠️ Error Loading Articles</h3>
                <p>${error.message}</p>
                <p style="margin-top: 1rem; color: #666;">
                    Please check that articles.json exists in the root folder
                </p>
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
    
    showLoader(false);
    window.scrollTo(0, 0);
}

// ===== CREATE ARTICLE HTML =====
function createArticleHTML(article, index) {
    const wordCount = article.content.split(' ').length;
    const excerptWords = article.content.split(' ').slice(0, 60).join(' ');
    const hasMore = wordCount > 60;
    
    // Generate 4 Ads
    let adsHTML = '';
    for(let i = 1; i <= 4; i++) {
        adsHTML += `
            <div class="ads-container">
                <div class="ad-placeholder">
                    Advertisement ${i}
                </div>
            </div>
        `;
    }
    
    const shareUrl = encodeURIComponent(`\({window.location.origin}?article=\){article.id}`);
    const shareTitle = encodeURIComponent(article.title);
    
    const categoryLabel = article.category === 'finance' ? '💳 FINANCE' : '💵 MAKE MONEY';
    
    return `
        <article class="article-card" itemscope itemtype="https://schema.org/BlogPosting">
            <meta itemprop="image" content="images/placeholder.jpg">
            <meta itemprop="datePublished" content="${article.date}">
            <meta itemprop="author" content="${article.author}">
            
            <!-- Article Header -->
            <div class="article-header">
                <span class="article-badge">${categoryLabel}</span>
                <h2 class="article-title" itemprop="headline">${article.title}</h2>
                <div class="article-meta">
                    <span><i class="fas fa-calendar"></i> ${formatDate(article.date)}</span>
                    <span><i class="fas fa-user"></i> <span itemprop="author">${article.author}</span></span>
                    <span><i class="fas fa-clock"></i> ${calculateReadTime(article.content)} min read</span>
                </div>
            </div>
            
            <!-- Content Wrapper -->
            <div class="article-content-wrapper">
                <!-- Left Side: Content & Ads -->
                <div class="article-left">
                    <div class="article-body" itemprop="articleBody">
                        <p>\({excerptWords}\){hasMore ? '...' : ''}</p>
                    </div>
                    
                    ${hasMore ? `
                        <button class="read-more-btn" onclick="readFullArticle('${article.id}')">
                            <i class="fas fa-book-open"></i> Read More
                        </button>
                    ` : ''}
                    
                    <!-- Ads Section -->
                    <div style="margin-top: 1.5rem;">
                        ${adsHTML}
                    </div>
                </div>
                
                <!-- Right Side: Share Buttons -->
                <div class="share-section">
                    <div class="share-title"><i class="fas fa-share-alt"></i> Share This</div>
                    <div class="share-buttons">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" 
                           target="_blank" rel="noopener noreferrer" class="share-btn share-facebook" title="Share on Facebook">
                            <i class="fab fa-facebook"></i> Facebook
                        </a>
                        <a href="https://twitter.com/intent/tweet?url=\({shareUrl}&text=\){shareTitle}" 
                           target="_blank" rel="noopener noreferrer" class="share-btn share-twitter" title="Share on Twitter">
                            <i class="fab fa-twitter"></i> Twitter
                        </a>
                        <a href="https://api.whatsapp.com/send?text=\({shareTitle}%20\){shareUrl}" 
                           target="_blank" rel="noopener noreferrer" class="share-btn share-whatsapp" title="Share on WhatsApp">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </a>
                        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}" 
                           target="_blank" rel="noopener noreferrer" class="share-btn share-linkedin" title="Share on LinkedIn">
                            <i class="fab fa-linkedin"></i> LinkedIn
                        </a>
                        <button class="share-btn share-copy" onclick="copyToClipboard('${shareUrl}')" title="Copy Link">
                            <i class="fas fa-copy"></i> Copy Link
                        </button>
                    </div>
                </div>
            </div>
        </article>
    `;
}

// ===== READ FULL ARTICLE =====
function readFullArticle(articleId) {
    const article = allArticles.find(a => a.id === articleId);
    
    if (!article) {
        alert('Article not found');
        return;
    }
    
    const container = document.getElementById('articlesContainer');
    const shareUrl = encodeURIComponent(`\({window.location.origin}?article=\){article.id}`);
    const shareTitle = encodeURIComponent(article.title);
    
    // Generate 4 Ads
    let adsHTML = '';
    for(let i = 1; i <= 4; i++) {
        adsHTML += `
            <div class="ads-container">
                <div class="ad-placeholder">
                    Advertisement ${i}
                </div>
            </div>
        `;
    }
    
    // Full article content
    const fullContent = article.content
        .split('\n\n')
        .map(para => `<p>${para}</p>`)
        .join('');
    
    const categoryLabel = article.category === 'finance' ? '💳 FINANCE' : '💵 MAKE MONEY';
    const backLabel = article.category === 'finance' ? 'Finance' : 'Make Money';
    
    container.innerHTML = `
        <button onclick="loadCategory('${article.category}')" style="margin-bottom: 1.5rem; padding: 0.8rem 1.5rem; background: var(--secondary); color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 600; transition: all 0.3s;">
            <i class="fas fa-arrow-left"></i> Back to ${backLabel}
        </button>
        
        <article class="article-card" itemscope itemtype="https://schema.org/BlogPosting">
            <meta itemprop="image" content="images/placeholder.jpg">
            <meta itemprop="datePublished" content="${article.date}">
            <meta itemprop="author" content="${article.author}">
            
            <!-- Header -->
            <div class="article-header">
                <span class="article-badge">${categoryLabel}</span>
                <h1 class="article-title" itemprop="headline">${article.title}</h1>
                <div class="article-meta">
                    <span><i class="fas fa-calendar"></i> ${formatDate(article.date)}</span>
                    <span><i class="fas fa-user"></i> <span itemprop="author">${article.author}</span></span>
                    <span><i class="fas fa-clock"></i> ${calculateReadTime(article.content)} min read</span>
                </div>
            </div>
            
            <!-- Content -->
            <div class="article-content-wrapper">
                <div class="article-left">
                    <div class="article-body" itemprop="articleBody">
                        ${fullContent}
                    </div>
                    
                    <!-- Ads -->
                    <div style="margin-top: 2rem;">
                        ${adsHTML}
                    </div>
                </div>
                
                <!-- Share -->
                <div class="share-section">
                    <div class="share-title"><i class="fas fa-share-alt"></i> Share This</div>
                    <div class="share-buttons">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" 
                           target="_blank" rel="noopener noreferrer" class="share-btn share-facebook">
                            <i class="fab fa-facebook"></i> Facebook
                        </a>
                        <a href="https://twitter.com/intent/tweet?url=\({shareUrl}&text=\){shareTitle}" 
                           target="_blank" rel="noopener noreferrer" class="share-btn share-twitter">
                            <i class="fab fa-twitter"></i> Twitter
                        </a>
                        <a href="https://api.whatsapp.com/send?text=\({shareTitle}%20\){shareUrl}" 
                           target="_blank" rel="noopener noreferrer" class="share-btn share-whatsapp">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </a>
                        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}" 
                           target="_blank" rel="noopener noreferrer" class="share-btn share-linkedin">
                            <i class="fab fa-linkedin"></i> LinkedIn
                        </a>
                        <button class="share-btn share-copy" onclick="copyToClipboard('${shareUrl}')">
                            <i class="fas fa-copy"></i> Copy Link
                        </button>
                    </div>
                </div>
            </div>
        </article>
    `;
    
    window.scrollTo(0, 0);
}

// ===== SEARCH ARTICLES =====
function searchArticles() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!searchTerm) {
        loadCategory('home');
        return;
    }
    
    const results = allArticles.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm) ||
        article.author.toLowerCase().includes(searchTerm)
    );
    
    const container = document.getElementById('articlesContainer');
    
    if (results.length === 0) {
        container.innerHTML = `
            <h2 style="text-align: center; margin: 2rem 0; color: #999;">
                🔍 No results found for "<strong>${searchTerm}</strong>"
            </h2>
        `;
        return;
    }
    
    container.innerHTML = `
        <h2 style="text-align: center; margin-bottom: 1.5rem; font-size: 1.8rem;">
            🔍 Search Results <small style="color: #999;">(${results.length} found)</small>
        </h2>
    `;
    
    results.forEach((article, index) => {
        container.innerHTML += createArticleHTML(article, index);
    });
    
    closeMenu();
    window.scrollTo(0, 0);
}

// ===== HAMBURGER MENU EVENT =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    
    // Toggle menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.header-container') && !e.target.closest('.nav')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });
    
    // Search on Enter key
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchArticles();
        }
    });
    
    // Load articles on page load
    loadArticles();
});

// ===== CLOSE MENU =====
function closeMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    hamburger.classList.remove('active');
    nav.classList.remove('active');
}

// ===== GO HOME =====
function goHome() {
    loadCategory('home');
}

// ===== FORMAT DATE =====
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// ===== CALCULATE READ TIME =====
function calculateReadTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime < 1 ? 1 : readTime;
}

// ===== SHOW/HIDE LOADER =====
function showLoader(show) {
    const loader = document.getElementById('loader');
    if (show) {
        loader.classList.add('active');
    } else {
        loader.classList.remove('active');
    }
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text) {
    const url = decodeURIComponent(text);
function copyToClipboard(text) {
    const url = decodeURIComponent(text);
    navigator.clipboard.writeText(url).then(() => {
        const btn = event.target.closest('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.style.background = 'var(--success)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy link');
    });
}

// ===== RESPONSIVE HAMBURGER MENU =====
window.addEventListener('resize', function() {
    if (window.innerWidth > 767) {
        document.getElementById('hamburger').classList.remove('active');
        document.getElementById('nav').classList.remove('active');
    }
});

// ===== SMOOTH SCROLL ANIMATION =====
document.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 0) {
        header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
    }
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}