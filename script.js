const articles = [
    { 
        title: "WorldzoneAI-তে আপনাকে স্বাগতম! আজকের প্রযুক্তি সংবাদ দেখুন", 
        category: "সর্বশেষ", 
        date: "২৭ মার্চ ২০২৬", 
        desc: "প্রযুক্তি বিশ্বের প্রতিদিনের আপডেট এবং নতুন সব উদ্ভাবন নিয়ে আমরা কাজ করছি। আমাদের সাথেই থাকুন।" 
    },
    { 
        title: "ফ্রিল্যান্সিং করে আয় করার ৫টি সেরা উপায়", 
        category: "ইনকাম", 
        date: "২৭ মার্চ ২০২৬", 
        desc: "২০২৬ সালে ঘরে বসে আয়ের জন্য কোন কোন স্কিলগুলো সবচেয়ে বেশি জরুরি তা জেনে নিন।" 
    },
    { 
        title: "স্মার্টফোনের ব্যাটারি দীর্ঘদিন ভালো রাখার কৌশল", 
        category: "টেকনোলজি", 
        date: "২৬ মার্চ ২০২৬", 
        desc: "আপনার ব্যবহৃত ফোনের ব্যাটারি দ্রুত নষ্ট হয়ে যাচ্ছে? এই নিয়মগুলো মেনে চললে ব্যাটারি থাকবে নতুনের মতো।" 
    }
];

// সাইডবার টগল
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

// সার্চ বক্স টগল
function toggleSearch() {
    const box = document.getElementById('search-box');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
    if(box.style.display === 'block') document.getElementById('search-input').focus();
}

// ডার্ক মোড টগল
function toggleDarkMode() {
    const body = document.body;
    const icon = document.querySelector('#dark-mode-toggle i');
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.className = 'fa fa-moon';
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.className = 'fa fa-sun';
    }
}

// আর্টিকেল ফিল্টার এবং রেন্ডার
function displayArticles(filter = 'All', searchTerm = '') {
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    articles.forEach((article) => {
        const matchesFilter = (filter === 'All' || article.category === filter);
        const matchesSearch = article.title.toLowerCase().includes(searchTerm) || article.desc.toLowerCase().includes(searchTerm);

        if (matchesFilter && matchesSearch) {
            container.innerHTML += `
                <article class="article-card">
                    <span class="cat-badge">${article.category}</span>
                    <div class="headline">${article.title}</div>
                    <div class="meta">WorldzoneAI • ${article.date}</div>
                    <p style="font-size:14px; margin-bottom:15px; opacity: 0.9; line-height: 1.6;">${article.desc}</p>
                    <div class="card-actions">
                        <span class="read-more">বিস্তারিত পড়ুন...</span>
                        <button class="share-btn" onclick="sharePage()">
                            <i class="fa fa-share-nodes"></i> শেয়ার
                        </button>
                    </div>
                </article>
            `;
        }
    });
}

// সার্চ ফাংশন
function searchArticles() {
    const input = document.getElementById('search-input').value.toLowerCase();
    displayArticles('All', input);
}

// শেয়ার ফাংশন
function sharePage() {
    if (navigator.share) {
        navigator.share({ title: 'WorldzoneAI', url: window.location.href });
    } else {
        alert('লিঙ্ক কপি করুন: ' + window.location.href);
    }
}

// ক্যাটাগরি ফিল্টার
function filterCategory(catName) {
    displayArticles(catName);
    toggleSidebar();
}

// শুরুতে খবর লোড করা
displayArticles();
