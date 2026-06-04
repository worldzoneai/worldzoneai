 // এলিমেন্টগুলো সিলেক্ট করা
const projectModal = document.getElementById('project-modal');
const mainApp = document.getElementById('main-app');
const createProjectBtn = document.getElementById('create-project-btn');
const backToMenuBtn = document.getElementById('back-to-menu');

const projectNameInput = document.getElementById('project-name');
const canvasResolutionSelect = document.getElementById('canvas-resolution');
const displayProjectName = document.getElementById('display-project-name');
const canvas = document.getElementById('canvas');

// ১. Create Button এ ক্লিক করলে যা হবে
createProjectBtn.addEventListener('click', function() {
    const projName = projectNameInput.value.trim() || "Untitled Project";
    const selectedRes = canvasResolutionSelect.value;

    // টপ বারে প্রজেক্টের নাম সেট করা
    displayProjectName.innerText = projName;

    // ক্যানভাসের পুরাতন রেজুলেশন ক্লাস রিমুভ করে নতুনটা সেট করা
    canvas.className = "white-canvas"; // রিসেট
    canvas.classList.add(selectedRes); // নতুন সাইজ ক্লাস (youtube / reels / square)

    // মোডাল হাইড করে মেইন অ্যাপ পেজ শো করা
    projectModal.classList.add('hidden');
    mainApp.classList.remove('hidden');
});

// ২. ব্যাক বাটনে ক্লিক করলে আবার হোম মোডালে ফিরে যাওয়া
backToMenuBtn.addEventListener('click', function() {
    mainApp.classList.add('hidden');
    projectModal.classList.remove('hidden');
});
