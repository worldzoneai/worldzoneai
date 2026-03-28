// বিজ্ঞাপনের কোডগুলো এখানে বসান (একবারই বসাবেন)
const BANNER_AD_CODE = "<div class='ad-slot'>[Homepage Banner Ad Here]</div>";
const ARTICLE_AD_CODE = "<div class='ad-slot'>[In-Article/Header/Footer Ad]</div>";

let allPosts = [];

// JSON ফাইল থেকে আর্টিকেল লোড করার ফাংশন
async function fetchArticles() {
    try {
        const response = await fetch('articles.json');
        allPosts = await response.json();
        renderFeed('All'); // ডিফল্টভাবে সব আর্টিকেল দেখাবে
    } catch (err) {
        console.error("Failed to load articles:", err);
    }
}

// হোমপেজে ফিড দেখানোর ফাংশন (ক্যাটাগরি ও সার্চ লজিকসহ)
function renderFeed(category, search = "") {
    const wrapper = document.getElementById('articles-wrapper');
    wrapper.innerHTML = ""; // আগের কন্টেন্ট পরিষ্কার করা
    let postCount = 0;

    allPosts.forEach((post) => {
        // ক্যাটাগরি এবং সার্চ ফিল্টার
        if ((category === 'All' || post.category === category) && 
            post.title.toLowerCase().includes(search.toLowerCase())) {
            
            postCount++;
            
            // ৬০ শব্দ পর্যন্ত শর্ট ডেসক্রিপশন তৈরি (ফেসবুকের মতো "Read More" সিস্টেম)
            const words = post.content.split(' ');
            const isLong = words.length > 60;
            const shortText = words.slice(0, 60).join(' ') + "...";

            // কন্টেন্টকে প্যারাগ্রাফে ভাগ করা (বিজ্ঞাপন বসানোর জন্য)
            const contentParts = post.content.split('\n\n');
            const midIndex = Math.floor(contentParts.length / 2);

            const card = document.createElement('div');
            card.className = "post-card";
            card.id = `post-${post.id}`;
            
            // আর্টিকেল কার্ডের HTML কাঠামো
            card.innerHTML = `
                <div class="post-meta">${post.category}</div>
                <div class="post-title">${post.title}</div>
                
                <div class="post-desc preview-text">${shortText}</div>
                
                <div class="post-desc full-text hidden-content">
                    ${ARTICLE_AD_CODE}
                    
                    ${contentParts.slice(0, 2).join('<br><br>')}
                    
                    ${ARTICLE_AD_CODE}
                    
                    ${contentParts.slice(2, 4).join('<br><br>')}
                    
                    ${ARTICLE_AD_CODE}
                    
                    ${contentParts.slice(4).join('<br><br>')}
                    
                    ${ARTICLE_AD_CODE}
                </div>

                <div class="read-more-btn" onclick="toggleReadMore(${post.id})">Read More</div>
            `;
            wrapper.appendChild(card);

            // শর্ত ১: হোমপেজে প্রতি ৪টি পোস্টের পর অটোমেটিক ব্যানার বিজ্ঞাপন দেখানো
            if (postCount % 4 === 0) {
                wrapper.innerHTML += BANNER_AD_CODE;
            }
        }
    });
}

// বিস্তারিত পড়ুন এবং কমানোর লজিক (Inline "See More")
function toggleReadMore(id) {
    const card = document.getElementById(`post-${id}`);
    const preview = card.querySelector('.preview-text');
    const full = card.querySelector('.full-text');
    const btn = card.querySelector('.read-more-btn');

    if (full.style.display === "block") {
        full.style.display = "none";
        preview.style.display = "block";
        btn.innerText = "Read More";
        // মোবাইল স্ক্রিনে কমানোর পর আর্টিকেলের শুরুতে ফিরে যাওয়া (ঐচ্ছিক)
        window.scrollTo({top: card.offsetTop - 80, behavior: 'smooth'});
    } else {
        full.style.display = "block";
        preview.style.display = "none";
        btn.innerText = "Show Less";
    }
}

// সাইডবার ও মেনু ফাংশন (বাইরে ক্লিক করলে বন্ধ হবে Overlay দিয়ে)
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

// ডার্ক মোড ফাংশন
function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    const isDark = (current === 'dark');
    
    // থিম পরিবর্তন
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    
    // আইকন পরিবর্তন
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.className = isDark ? 'fa fa-moon' : 'fa fa-sun';
}

// সার্চ বার ফাংশন
function toggleSearch() {
    const box = document.getElementById('search-container');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
    if(box.style.display === 'block') document.getElementById('search-input').focus();
}

// আর্টিকেল সার্চ করার ফাংশন
function searchPosts() {
    const query = document.getElementById('search-input').value;
    renderFeed('All', query);
}

// ক্যাটাগরি ফিল্টার ফাংশন
function filterPosts(cat) {
    renderFeed(cat);
    toggleMenu(); // ফিল্টার করার পর মেনু বন্ধ করা
}

// শুরুতে ডাটা লোড করা
fetchArticles();
