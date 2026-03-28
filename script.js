// বিজ্ঞাপনের কোড (আপনার অ্যাডসেন্স কোডগুলো এখানে বসাবেন)
const ADS = {
    banner: "<div class='ad-slot'>[Homepage Banner Ad]</div>",
    article: "<div class='ad-slot'>[In-Article/Header/Footer Ad]</div>"
};

let allPosts = [];

// ডাটা লোড করা
async function fetchArticles() {
    try {
        const response = await fetch('articles.json');
        allPosts = await response.json();
        renderFeed('All');
    } catch (err) { console.error("Error: Could not load JSON data."); }
}

// ফিড রেন্ডার ফাংশন
function renderFeed(category, search = "") {
    const wrapper = document.getElementById('articles-wrapper');
    wrapper.innerHTML = "";
    let count = 0;

    allPosts.forEach(post => {
        if ((category === 'All' || post.category === category) && post.title.toLowerCase().includes(search.toLowerCase())) {
            count++;
            const words = post.content.split(' ');
            const shortText = words.slice(0, 60).join(' ') + "...";
            const parts = post.content.split('\n\n');

            const card = document.createElement('div');
            card.className = "post-card";
            card.id = `post-${post.id}`;
            card.innerHTML = `
                <small style="color:var(--primary); font-weight:bold;">${post.category.toUpperCase()}</small>
                <div class="post-title">${post.title}</div>
                <div class="preview-text">${shortText}</div>
                <div class="full-text hidden-content">
                    ${ADS.article} ${parts.slice(0, 2).join('<br><br>')}
                    ${ADS.article} ${parts.slice(2, 4).join('<br><br>')}
                    ${ADS.article} ${parts.slice(4).join('<br><br>')}
                    ${ADS.article} </div>
                <div class="read-more-btn" onclick="toggleReadMore(${post.id})">Read More</div>
            `;
            wrapper.appendChild(card);

            if (count % 4 === 0) wrapper.innerHTML += ADS.banner; // ৪ পোস্ট পর হোমপেজে অ্যাড
        }
    });
}

// Read More / Show Less ফাংশন
function toggleReadMore(id) {
    const card = document.getElementById(`post-${id}`);
    const preview = card.querySelector('.preview-text');
    const full = card.querySelector('.full-text');
    const btn = card.querySelector('.read-more-btn');

    if (full.style.display === "block") {
        full.style.display = "none"; preview.style.display = "block"; btn.innerText = "Read More";
    } else {
        full.style.display = "block"; preview.style.display = "none"; btn.innerText = "Show Less";
    }
}

// মেনু এবং স্ট্যাটিক পেজ কন্ট্রোল
function toggleMenu(e) {
    if(e) e.stopPropagation();
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function filterPosts(cat) {
    document.getElementById('main-feed').style.display = 'block';
    document.getElementById('static-pages').style.display = 'none';
    renderFeed(cat); toggleMenu();
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function showPage(type) {
    document.getElementById('main-feed').style.display = 'none';
    document.getElementById('static-pages').style.display = 'block';
    const content = document.getElementById('page-content-area');
    toggleMenu();

    if(type === 'privacy') {
        content.innerHTML = "<h2>Privacy Policy</h2><p>Your privacy is important to WorldzoneAI. We use cookies to improve your experience and show relevant ads through Google AdSense. We do not sell your personal data to third parties.</p>";
    } else if(type === 'terms') {
        content.innerHTML = "<h2>Terms of Service</h2><p>By using WorldzoneAI, you agree to our terms. Our content is for informational purposes only and should not be taken as financial advice.</p>";
    } else if(type === 'contact') {
        content.innerHTML = "<h2>Contact Us</h2><p>For any inquiries, feedback, or business proposals, please email us directly at:</p><h3 style='color:var(--primary); margin-top:20px;'><i class='fa fa-envelope'></i> contact@worldzoneai.pages.dev</h3>";
    }
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// থিম এবং সার্চ
function toggleTheme() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.getElementById('theme-icon').className = isDark ? 'fa fa-moon' : 'fa fa-sun';
}

function toggleSearch() {
    const s = document.getElementById('search-container');
    s.style.display = s.style.display === 'none' ? 'block' : 'none';
}

function searchPosts() { renderFeed('All', document.getElementById('search-input').value); }

fetchArticles();
