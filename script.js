// বিজ্ঞাপনের কোডগুলো এখানে বসান (একবারই বসাবেন)
const BANNER_AD = "<div class='home-ad'>[Homepage Banner Ad Here]</div>";
const ARTICLE_AD = "<div class='home-ad'>[In-Article Middle Ad]</div>";

let allPosts = [];

// JSON ফাইল থেকে আর্টিকেল লোড করার ফাংশন
async function fetchArticles() {
    try {
        const response = await fetch('articles.json');
        allPosts = await response.json();
        renderFeed('All');
    } catch (err) {
        console.error("Failed to load articles:", err);
    }
}

// হোমপেজে ফিড দেখানোর ফাংশন
function renderFeed(category, search = "") {
    const wrapper = document.getElementById('articles-wrapper');
    wrapper.innerHTML = "";
    let postCount = 0;

    allPosts.forEach((post, index) => {
        // ক্যাটাগরি এবং সার্চ ফিল্টার
        if ((category === 'All' || post.category === category) && 
            post.title.toLowerCase().includes(search.toLowerCase())) {
            
            postCount++;
            
            // ৬০ শব্দ পর্যন্ত শর্ট ডেসক্রিপশন তৈরি (ফেসবুকের মতো)
            const words = post.content.split(' ');
            const isLong = words.length > 60;
            const shortText = words.slice(0, 60).join(' ') + "...";

            const card = document.createElement('div');
            card.className = "post-card";
            card.id = `post-${post.id}`;
            
            card.innerHTML = `
                <small style="color:var(--primary)">${post.category}</small>
                <div class="post-title">${post.title}</div>
                
                <div class="post-desc preview-text">${shortText}</div>
                <div class="post-desc full-text hidden-content">
                    ${ARTICLE_AD}
                    ${post.content.split('\n\n').slice(0, 2).join('<br><br>')}
                    ${ARTICLE_AD}
                    ${post.content.split('\n\n').slice(2, 4).join('<br><br>')}
                    ${ARTICLE_AD}
                    ${post.content.split('\n\n').slice(4).join('<br><br>')}
                    ${ARTICLE_AD}
                </div>

                <div class="read-more-btn" onclick="toggleReadMore(${post.id})">Read More</div>
            `;
            wrapper.appendChild(card);

            // প্রতি ৪টি পোস্টের পর হোমপেজে ব্যানার বিজ্ঞাপন দেখানো
            if (postCount % 4 === 0) {
                wrapper.innerHTML += BANNER_AD;
            }
        }
    });
}

// বিস্তারিত পড়ার লজিক
function toggleReadMore(id) {
    const card = document.getElementById(`post-${id}`);
    const preview = card.querySelector('.preview-text');
    const full = card.querySelector('.full-text');
    const btn = card.querySelector('.read-more-btn');

    if (full.style.display === "block") {
        full.style.display = "none";
        preview.style.display = "block";
        btn.innerText = "Read More";
    } else {
        full.style.display = "block";
        preview.style.display = "none";
        btn.innerText = "Show Less";
    }
}

// সাইডবার ও মেনু ফাংশন
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

function toggleSearch() {
    const box = document.getElementById('search-container');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

function searchPosts() {
    const query = document.getElementById('search-input').value;
    renderFeed('All', query);
}

function filterPosts(cat) {
    renderFeed(cat);
    toggleMenu();
}

// শুরুতে ডাটা লোড করা
fetchArticles();
