// ১. বিজ্ঞাপনের কোড (এখানে আপনার অ্যাডসেন্স কোড বসাবেন)
const ADS = {
    banner: "<div class='ad-slot'>[Homepage Banner Ad]</div>",
    article: "<div class='ad-slot'>[In-Article Ad]</div>"
};

let allPosts = [];

// ২. ডাটা লোড করার ফাংশন (এটাই আসল সমস্যা সমাধান করবে)
async function fetcharticles() {
    try {
        // এখানে আপনার গিটহাবের ফাইলের নাম 'articles.json' তাই এটাই দেওয়া হলো
        const response = await fetch('articles.json'); 
        if (!response.ok) throw new Error('File not found');
        allPosts = await response.json();
        renderFeed('All');
    } catch (err) {
        console.log("Error loading articles.json. Trying alternative...");
        // যদি উপরের নামে না পায়, তবে Data.json নামে খোঁজার চেষ্টা করবে
        try {
            const resAlt = await fetch('Data.json');
            allPosts = await resAlt.json();
            renderFeed('All');
        } catch (e) {
            document.getElementById('articles-wrapper').innerHTML = "<p style='text-align:center; padding:20px;'>No articles found. Please check articles.json file.</p>";
        }
    }
}

// ৩. ফিড রেন্ডার ফাংশন
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
                    ${ADS.article}
                    ${parts.slice(0, 2).join('<br><br>')}
                    ${ADS.article}
                    ${parts.slice(2).join('<br><br>')}
                    ${ADS.article}
                </div>
                <div class="read-more-btn" onclick="toggleReadMore(${post.id})">Read More</div>
            `;
            wrapper.appendChild(card);
            if (count % 4 === 0) wrapper.innerHTML += ADS.banner;
        }
    });
}

// ৪. বিস্তারিত পড়া ও মেনু কন্ট্রোল (আগের মতোই থাকবে)
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

function toggleMenu(e) {
    if(e) e.stopPropagation();
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
    if(type === 'privacy') content.innerHTML = "<h2>Privacy Policy</h2><p>Your privacy is important to WorldzoneAI...</p>";
    else if(type === 'terms') content.innerHTML = "<h2>Terms of Service</h2><p>Our content is for informational purposes only...</p>";
    else if(type === 'contact') content.innerHTML = "<h2>Contact Us</h2><p>Email: contact@worldzoneai.pages.dev</p>";
}

function toggleTheme() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
}

function toggleSearch() {
    const s = document.getElementById('search-container');
    s.style.display = s.style.display === 'none' ? 'block' : 'none';
}

function searchPosts() { renderFeed('All', document.getElementById('search-input').value); }

fetchArticles();
