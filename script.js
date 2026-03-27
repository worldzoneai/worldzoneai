// আপনার নিউজ ডাটা (এখানে আপনি আরও আর্টিকেল যোগ করতে পারবেন)
const articles = [
    { id: 1, title: "প্রযুক্তির দুনিয়ায় আসছে বড় পরিবর্তন", date: "২৭ মার্চ ২০২৬", time: "০২:০০ PM", ago: "১০ মিনিট আগে" },
    { id: 2, title: "কিভাবে ফ্রিল্যান্সিং শুরু করবেন?", date: "২৭ মার্চ ২০২৬", time: "০১:৩০ PM", ago: "৪০ মিনিট আগে" },
    { id: 3, title: "ঢাকার বাতাসের মানের উন্নতি", date: "২৭ মার্চ ২০২৬", time: "০১:০০ PM", ago: "১ ঘণ্টা আগে" },
    { id: 4, title: "নতুন স্মার্টফোনের রিভিউ ও দাম", date: "২৭ মার্চ ২০২৬", time: "১২:১৫ PM", ago: "২ ঘণ্টা আগে" },
    { id: 5, title: "বিশ্ব অর্থনীতিতে নতুন অস্থিরতা", date: "২৭ মার্চ ২০২৬", time: "১১:০০ AM", ago: "৩ ঘণ্টা আগে" },
    { id: 6, title: "রান্নার সহজ কিছু টিপস", date: "২৭ মার্চ ২০২৬", time: "১০:০০ AM", ago: "৪ ঘণ্টা আগে" },
    { id: 7, title: "ভ্রমণের সেরা কিছু জায়গা", date: "২৭ মার্চ ২০২৬", time: "০৯:০০ AM", ago: "৫ ঘণ্টা আগে" },
    { id: 8, title: "ক্রিকেট বিশ্বকাপের প্রস্তুতি", date: "২৭ মার্চ ২০২৬", time: "০৮:০০ AM", ago: "৬ ঘণ্টা আগে" }
];

const container = document.getElementById('news-container');

articles.forEach((article, index) => {
    // আর্টিকেল তৈরি করা
    const articleHtml = `
        <article class="article-card">
            <h2 class="headline">${article.title}</h2>
            <div class="meta-info">
                <span><i class="fa fa-calendar-alt"></i> ${article.date}</span>
                <span><i class="fa fa-clock"></i> ${article.time}</span>
                <span>${article.ago}</span>
            </div>
            <div class="card-footer">
                <a href="post.html?id=${article.id}" class="read-more-btn">Read more</a>
                <div class="share-icon" title="শেয়ার করুন">
                    <i class="fa fa-share-nodes"></i>
                </div>
            </div>
        </article>
    `;

    container.innerHTML += articleHtml;

    // --- প্রতি ৪টি আর্টিকেলের পর বিজ্ঞাপন ---
    if ((index + 1) % 4 === 0) {
        
        // *******************************************
        // শুরু: বিজ্ঞাপন কোড রাখার জায়গা
        // *******************************************
        const adHtml = `
            <div class="infeed-ad">
                <p style="font-size: 12px; color: #999; margin-bottom: 5px;">SPONSORED AD</p>
                <div style="width:100%; height:100px; background:#eee; display:flex; align-items:center; justify-content:center;">
                    বিজ্ঞাপন এখানে থাকবে (যেমন: Google AdSense)
                </div>
                </div>
        `;
        // *******************************************
        // শেষ: বিজ্ঞাপন কোড রাখার জায়গা
        // *******************************************

        container.innerHTML += adHtml;
    }
});

// ৩-ডট মেনুর জন্য ফাংশন
function toggleMenu() {
    alert("৩-ডট মেনু ক্লিক করা হয়েছে! এখানে আপনি কাস্টম সেটিংস বা লিংক যোগ করতে পারেন।");
}

// তথ্য দেখানোর ফাংশন
function showInfo() {
    document.getElementById('info-section').style.display = 'flex';
}

// তথ্য বন্ধ করার ফাংশন
function closeInfo() {
    document.getElementById('info-section').style.display = 'none';
}

// আপনার index.html-এর ড্রপডাউন মেনুর লিংকে নিচের মতো পরিবর্তন করুন:
// <a href="javascript:void(0)" onclick="showInfo()">আমাদের সম্পর্কে</a>
// <a href="javascript:void(0)" onclick="showInfo()">যোগাযোগ</a>

