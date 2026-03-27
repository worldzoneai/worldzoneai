const articles = [
    { id: 1, title: "WorldzoneAI-তে আপনাকে স্বাগতম", date: "২৭ মার্চ ২০২৬", time: "০২:০০ PM", ago: "১০ মিনিট আগে" },
    { id: 2, title: "প্রযুক্তির দুনিয়ায় নতুন কি আসছে?", date: "২৭ মার্চ ২০২৬", time: "০১:৩০ PM", ago: "৪০ মিনিট আগে" },
    { id: 3, title: "সেরা ৫টি AI টুলস যা আপনার কাজ সহজ করবে", date: "২৭ মার্চ ২০২৬", time: "০১:০০ PM", ago: "১ ঘণ্টা আগে" },
    { id: 4, title: "অনলাইনে আয় করার কার্যকরী উপায়", date: "২৭ মার্চ ২০২৬", time: "১২:১৫ PM", ago: "২ ঘণ্টা আগে" },
    { id: 5, title: "স্মার্টফোন রিভিউ ২০২৬", date: "২৭ মার্চ ২০২৬", time: "১১:০০ AM", ago: "৩ ঘণ্টা আগে" }
];

const container = document.getElementById('news-container');

articles.forEach((article, index) => {
    const articleHtml = `
        <article class="article-card">
            <h2 class="headline">${article.title}</h2>
            <div class="meta-info">
                <span><i class="fa fa-calendar-alt"></i> ${article.date}</span>
                <span><i class="fa fa-clock"></i> ${article.time}</span>
                <span>${article.ago}</span>
            </div>
            <div class="card-footer">
                <a href="#" class="read-more-btn">Read more</a>
                <div class="share-icon"><i class="fa fa-share-nodes"></i></div>
            </div>
        </article>
    `;

    container.innerHTML += articleHtml;

    // প্রতি ৪টি আর্টিকেলের পর বিজ্ঞাপন
    if ((index + 1) % 4 === 0) {
        const adHtml = `
            <div class="infeed-ad">
                <p style="font-size: 10px; color: #999;">SPONSORED AD</p>
                <div style="width:100%; height:120px; background:#f9f9f9; display:flex; align-items:center; justify-content:center; border:1px solid #ddd;">
                    আপনার বিজ্ঞাপন কোড এখানে
                </div>
            </div>
        `;
        container.innerHTML += adHtml;
    }
});

function toggleMenu() {
    console.log("Menu Clicked");
}
