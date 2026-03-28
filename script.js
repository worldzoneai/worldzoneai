// বিজ্ঞাপনের কোড (আপনার অ্যাডসেন্স কোড এখানে বসাবেন)
const HOME_BANNER = "<div class='ad-slot'>Homepage Banner Ad</div>";
const POST_AD = "<div class='ad-slot'>Article Content Ad</div>";

let allPosts = [];

// ডাটা লোড করা
async function fetchArticles() {
    try {
        const response = await fetch('articles.json');
        allPosts = await response.json();
        renderFeed('All');
    } catch (err) { console.error("Error loading articles"); }
}

// ফিড রেন্ডার করা (ক্যাটাগরি অনুযায়ী)
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
            card.innerHTML = `
                <small style="color:var(--primary)">${post.category}</small>
                <h2 style="margin:5px 0;">${post.title}</h2>
                <div class="post-preview">${shortText}</div>
                <div class="post-full hidden-content">
                    ${POST_AD} ${parts.slice(0, 2).join('<br><br>')}
                    ${POST_AD} ${parts.slice(2, 4).join('<br><br>')}
                    ${POST_AD} ${parts.slice(4).join('<br><br>')}
                    ${POST_AD} </div>
                <div class="read-more-btn" onclick="togglePost(this)">Read More</div>
            `;
            wrapper.appendChild(card);

            if (count % 4 === 0) wrapper.innerHTML += HOME_BANNER; // হোমপেজে ৪টি পর অ্যাড
        }
    });
}

// Read More ফাংশন
function togglePost(btn) {
    const card = btn.parentElement;
    const preview = card.querySelector('.post-preview');
    const full = card.querySelector('.post-full');
    if (full.style.display === "block") {
        full.style.display = "none"; preview.style.display = "block"; btn.innerText = "Read More";
    } else {
        full.style.display = "block"; preview.style.display = "none"; btn.innerText = "Show Less";
    }
}

// মেনু ও স্ট্যাটিক পেজ কন্ট্রোল
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function filterPosts(cat) {
    document.getElementById('main-feed').style.display = 'block';
    document.getElementById('static-pages').style.display = 'none';
    renderFeed(cat); toggleMenu();
}

function showPage(type) {
    document.getElementById('main-feed').style.display = 'none';
    document.getElementById('static-pages').style.display = 'block';
    const content = document.getElementById('page-content-area');
    toggleMenu();

    if(type === 'privacy') content.innerHTML = "<h2>Privacy Policy</h2><p>We value your privacy. Your data is never shared...</p>";
    else if(type === 'terms') content.innerHTML = "<h2>Terms of Service</h2><p>Usage of WorldzoneAI is subject to international law...</p>";
    else if(type === 'contact') content.innerHTML = "<h2>Contact Us</h2><p>Email: contact@worldzoneai.pages.dev</p>";
}

function toggleTheme() {
    const body = document.body;
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

function toggleSearch() {
    const s = document.getElementById('search-container');
    s.style.display = s.style.display === 'none' ? 'block' : 'none';
}

function searchPosts() { renderFeed('All', document.getElementById('search-input').value); }

fetchArticles();
