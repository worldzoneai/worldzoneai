 const articles = [
    { title: "WorldzoneAI-তে আপনাকে স্বাগতম! আজকের প্রযুক্তি সংবাদ দেখুন", date: "২৭ মার্চ ২০২৬", time: "০৩:০০ PM" },
    { title: "নতুন স্মার্টফোনের বাজারে অস্থিরতা: কি ঘটছে?", date: "২৭ মার্চ ২০২৬", time: "০২:৩০ PM" },
    { title: "ফ্রিল্যান্সিং টিপস: কিভাবে প্রথম কাজ পাবেন?", date: "২৭ মার্চ ২০২৬", time: "০২:০০ PM" },
    { title: "বিশ্বের সেরা ৫টি AI টুলস যা আপনার কাজ সহজ করবে", date: "২৭ মার্চ ২০২৬", time: "০১:৩০ PM" },
    { title: "ঢাকার বাতাসের মানের বড় পরিবর্তন", date: "২৭ মার্চ ২০২৬", time: "০১:০০ PM" },
    { title: "ক্রিকেট বিশ্বকাপের আজকের আপডেট", date: "২৭ মার্চ ২০২৬", time: "১২:০০ PM" }
];

const container = document.getElementById('news-container');

articles.forEach((article, index) => {
    // নিউজ কার্ড
    const articleHtml = `
        <article class="article-card">
            <div class="headline">${article.title}</div>
            <div class="meta">${article.date} • ${article.time}</div>
            <p style="color:#444; font-size:14px; margin-bottom:15px;">বিস্তারিত তথ্য এবং খবর জানতে আমাদের সাথেই থাকুন। এটি WorldzoneAI এর একটি স্ট্যাটিক ডেমো পোস্ট।</p>
            <div class="card-actions">
                <button class="action-btn"><i class="fa fa-thumbs-up"></i> Like</button>
                <button class="action-btn"><i class="fa fa-comment"></i> Comment</button>
                <button class="action-btn" onclick="alert('Shared!')"><i class="fa fa-share"></i> Share</button>
            </div>
        </article>
    `;

    container.innerHTML += articleHtml;

    // প্রতি ৪টি পোস্ট পর পর বিজ্ঞাপন (index ০ থেকে শুরু তাই +১)
    if ((index + 1) % 4 === 0) {
        container.innerHTML += `
            <div class="infeed-ad">
                <p style="font-size: 10px; color: #999; margin-bottom: 8px;">SPONSORED</p>
                <div style="height: 150px; background: #f0f2f5; display: flex; align-items: center; justify-content: center; border: 1px dashed #ccc;">
                    বিজ্ঞাপনের কোড এখানে বসান
                </div>
            </div>
        `;
    }
});

function showInfo() { document.getElementById('info-section').style.display = 'flex'; }
function closeInfo() { document.getElementById('info-section').style.display = 'none'; }
