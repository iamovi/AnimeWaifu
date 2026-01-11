const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

function showPage(pageName) {
    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageName).classList.add('active');
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });

    // Close mobile menu
    navMenu.classList.remove('active');
}

// Mobile toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Nav link clicks
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const pageName = this.getAttribute('data-page');
        if (pageName) {
            showPage(pageName);
        }
    });
});

// Download functions
function toggleDownload(btn, appId) {
    const options = document.getElementById(appId);
    const allOptions = document.querySelectorAll('.download-options');
    const allBtns = document.querySelectorAll('.download-btn');
    
    // Close all other download options and show their buttons
    allOptions.forEach((opt, index) => {
        if (opt.id !== appId) {
            opt.classList.remove('show');
            allBtns[index].style.display = 'flex';
        }
    });
    
    // Toggle current
    options.classList.toggle('show');
    
    // Hide the download button when showing options
    if (options.classList.contains('show')) {
        btn.style.display = 'none';
    }
}

function closeDownload(appId) {
    const options = document.getElementById(appId);
    const btn = options.previousElementSibling;
    options.classList.remove('show');
    btn.style.display = 'block';
}

function downloadApp(app, platform) {
    const downloads = {
        animewaifu: {
            windows: 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifuSetup.exe',
            android: 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu.apk'
        },
        basic: {
            windows: 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Basic_Setup.exe',
            android: 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Basic.apk'
        },
        lite: {
            windows: 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Lite_Setup.exe',
            android: 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Lite.apk'
        },
        cloud: {
            windows: 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Cloud_Setup.exe',
            android: 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/AnimeWaifu_Cloud.apk'
        },
        quickchat: {
            windows: 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/QuickChatSetup.exe',
            android: 'https://github.com/iamovi/AnimeWaifu/releases/download/waifuappsv2/QuickChat.apk'
        }
    };
    
    const url = downloads[app][platform];
    window.open(url, '_blank');
}