const articles = [
    { title: "কিভাবে ফ্রিল্যান্সিং শুরু করবেন?", category: "ইনকাম", date: "২৭ মার্চ", desc: "ঘরে বসে ইনকাম করার সেরা উপায়গুলো জানুন।" },
    { title: "এআই প্রযুক্তির নতুন বিপ্লব", category: "এআই", date: "২৭ মার্চ", desc: "চ্যাটজিপিটির নতুন ভার্সন এখন আরও শক্তিশালী।" },
    { title: "বিসিএস প্রস্তুতির সহজ গাইড", category: "পড়াশোনা", date: "২৬ মার্চ", desc: "পড়াশোনায় মন বসানোর কার্যকরী কৌশল।" },
    { title: "স্মার্টফোন ব্যবহারের স্বাস্থ্য ঝুঁকি", category: "স্বাস্থ্য", date: "২৬ মার্চ", desc: "অতিরিক্ত ফোন ব্যবহার আপনার চোখের ক্ষতি করছে।" }
];

function displayArticles(filter = 'All') {
    const container = document.getElementById('news-container');
    container.innerHTML = ''; // আগেরগুলো পরিষ্কার করা

    articles.forEach((article) => {
        if (filter === 'All' || article.category === filter) {
            const articleHtml = `
                <article class="article-card">
                    <span class="cat-badge">${article.category}</span>
                    <div class="headline">${article.title}</div>
                    <div class="meta">WorldzoneAI • ${article.date}</div>
                    <p style="color:#444; font-size:14px; margin-bottom:15px;">${article.desc}</p>
                    <div class="card-actions">
                        <span style="color:#0866ff; font-weight:bold; cursor:pointer;">বিস্তারিত পড়ুন...</span>
                        <button class="share-btn" onclick="shareLink()"><i class="fa fa-share"></i> Share</button>
                    </div>
                </article>
            `;
            container.innerHTML += articleHtml;
        }
    });
}

// ক্যাটাগরি অনুযায়ী ফিল্টার করার ফাংশন
function filterCategory(catName) {
    displayArticles(catName);
    
    // বাটনগুলোর অ্যাক্টিভ কালার পরিবর্তন
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText === catName || (catName === 'All' && btn.innerText === 'সব')) {
            btn.classList.add('active');
        }
    });
}

function shareLink() {
    alert('লিঙ্ক কপি হয়েছে: ' + window.location.href);
}

function showInfo() { document.getElementById('info-section').style.display = 'flex'; }
function closeInfo() { document.getElementById('info-section').style.display = 'none'; }

// শুরুতে সব আর্টিকেল দেখানো
displayArticles();
