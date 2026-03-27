const articles = [
    { title: "কিভাবে ফ্রিল্যান্সিং শুরু করবেন?", category: "ইনকাম", date: "২৭ মার্চ", desc: "ঘরে বসে ইনকাম করার সেরা উপায়গুলো জানুন।" },
    { title: "এআই প্রযুক্তির নতুন বিপ্লব", category: "এআই", date: "২৭ মার্চ", desc: "চ্যাটজিপিটির নতুন ভার্সন এখন আরও শক্তিশালী।" },
    { title: "বিসিএস প্রস্তুতির সহজ গাইড", category: "পড়াশোনা", date: "২৬ মার্চ", desc: "পড়াশোনায় মন বসানোর কার্যকরী কৌশল।" },
    { title: "স্মার্টফোন ব্যবহারের স্বাস্থ্য ঝুঁকি", category: "স্বাস্থ্য", date: "২৬ মার্চ", desc: "অতিরিক্ত ফোন ব্যবহার আপনার চোখের ক্ষতি করছে।" }
];

// ডার্ক মোড ফাংশন
function toggleDarkMode() {
    const body = document.body;
    const icon = document.querySelector('#dark-mode-toggle i');
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
}

// সাইডবার ফাংশন
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function displayArticles(filter = 'All') {
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    articles.forEach((article) => {
        if (filter === 'All' || article.category === filter) {
            container.innerHTML += `
                <article class="article-card">
                    <span class="cat-badge">${article.category}</span>
                    <div class="headline">${article.title}</div>
                    <div class="meta">WorldzoneAI • ${article.date}</div>
                    <p style="font-size:14px; margin-bottom:15px; opacity: 0.9;">${article.desc}</p>
                    <div style="color:#0866ff; font-weight:bold; cursor:pointer;">বিস্তারিত পড়ুন...</div>
                </article>
            `;
        }
    });
}

function filterCategory(catName) {
    displayArticles(catName);
    toggleSidebar(); // ক্লিক করলে মেনু বন্ধ হবে
}

displayArticles();
