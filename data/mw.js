// Set to store previously seen meme URLs
const seenWaifuImages = new Set();

// Array of direct GIF links
const gifUrls = [
    "https://i.ibb.co/wRmZTTt/28669772.gif",
    "https://i.ibb.co/f2W0QCp/28669778.gif",
    "https://i.ibb.co/LZPxk19/28669803.gif",
    "https://i.ibb.co/WgPB4bD/28669811.gif",
    "https://i.ibb.co.com/0QGkSMt/10798795.gif",
    "https://i.ibb.co.com/KmxtYZZ/10859903.gif",
    "https://i.ibb.co.com/TDfXpwD/11418564.gif",
    "https://i.ibb.co.com/NLY00Fz/11835280.gif",
    "https://i.ibb.co.com/HCnKdS8/11960019.gif",
    "https://i.ibb.co.com/XSkmYLV/11979365.gif",
    "https://i.ibb.co.com/YdfPZbX/12374865.gif",
    "https://i.ibb.co.com/CPsKjpT/12545925.gif",
    "https://i.ibb.co.com/bQx5jnj/14585524.gif",
    "https://i.ibb.co.com/8bZWP04/15084565.gif",
    "https://i.ibb.co.com/pdVwZz3/15473256.gif",
    "https://i.ibb.co.com/3Mw3xL4/15815628.gif",
    "https://i.ibb.co.com/cNtX2P7/15828814.gif",
    "https://i.ibb.co.com/k1Kzvbh/16054460.gif",
    "https://i.ibb.co.com/WBQD8nZ/16105796.gif",
    "https://i.ibb.co.com/MnN6xPh/16517512.gif",
    "https://i.ibb.co.com/9gcmj8s/16602710.gif",
    "https://i.ibb.co.com/0rWyMXQ/16986053.gif",
    "https://i.ibb.co.com/qjcw7xC/17014015.gif",
    "https://i.ibb.co.com/8cNDsDR/17560226.gif",
    "https://i.ibb.co.com/wNcxcdb/17612376.gif",
    "https://i.ibb.co.com/3zGzyCy/17836722.gif",
    "https://i.ibb.co.com/kKB63Jt/17958943.gif",
    "https://i.ibb.co.com/6B2FpTk/18177340.gif",
    "https://i.ibb.co.com/BtZ8bgH/18199010.gif",
    "https://i.ibb.co.com/3CkCGmz/18572800.gif",
    "https://i.ibb.co.com/yNQ88X9/18646488.gif",
    "https://i.ibb.co.com/7bJfZwt/18730205.gif",
    "https://i.ibb.co.com/Dg3V3rh/18826921.gif",
    "https://i.ibb.co.com/dkFM9FK/19008297.gif",
    "https://i.ibb.co.com/ys9b3GY/19163255.gif",
    "https://i.ibb.co.com/0FnVYpz/19228958.gif",
    "https://i.ibb.co.com/rF9SpS1/19298797.gif",
    "https://i.ibb.co.com/dGM9Ppd/19365650.gif",
    "https://i.ibb.co.com/c6S5L3P/19665460.gif",
    "https://i.ibb.co.com/XVVN20Z/19736818.gif",
    "https://i.ibb.co.com/BjnH0nq/19759095.gif",
    "https://i.ibb.co.com/vHjpMdY/19760111.gif",
    "https://i.ibb.co.com/M73yJ5f/19782134.gif",
    "https://i.ibb.co.com/NFyzYSk/19880262.gif",
    "https://i.ibb.co.com/MCXMB4j/19917647.gif",
    "https://i.ibb.co.com/zZNT5Jt/20011331.gif",
    "https://i.ibb.co.com/FXv1DGf/20042632.gif",
    "https://i.ibb.co.com/4W8xqqX/20063836.gif",
    "https://i.ibb.co.com/q1KMZ0X/20239232.gif",
    "https://i.ibb.co.com/ctHYgb9/20299543.gif",
    "https://i.ibb.co.com/5xn9BS0/20316812.gif",
    "https://i.ibb.co.com/bL07Cdx/20775235.gif",
    "https://i.ibb.co.com/PNT1m5x/20893884.gif",
    "https://i.ibb.co.com/3cKQSvc/20940449.gif",
    "https://i.ibb.co.com/0FnVYpz/19228958.gif",
    "https://i.ibb.co.com/dMCrzkb/21519139.gif",
    "https://i.ibb.co.com/Fh0K3GW/21539131.gif",
    "https://i.ibb.co.com/cQ2L9jZ/21569551.gif",
    "https://i.ibb.co.com/80S7ChH/21835045.gif",
    "https://i.ibb.co.com/PC3F689/22473847.gif",
    "https://i.ibb.co.com/YXDJrMb/22574297.gif",
    "https://i.ibb.co.com/yg7bShv/22894036.gif",
    "https://i.ibb.co.com/KVphzsX/23001207.gif",
    "https://i.ibb.co.com/ZN45K4W/23096741.gif",
    "https://i.ibb.co.com/VjvZRvg/23442295.gif",
    "https://i.ibb.co.com/0Fk9ZQ4/23808520.gif",
    "https://i.ibb.co.com/tHxkMJq/23819690.gif",
    "https://i.ibb.co.com/681VB34/23907185.gif",
    "https://i.ibb.co.com/553VxTz/23985466.gif",
    "https://i.ibb.co.com/hF7FDbb/24253889.gif",
    "https://i.ibb.co.com/7pG7LkC/24312200.gif",
    "https://i.ibb.co.com/SNBT3Mf/24513205.gif",
    "https://i.ibb.co.com/MBwr8fH/24871981.gif",
    "https://i.ibb.co.com/JzDzrgC/25051582.gif",
    "https://i.ibb.co.com/DWkCnHh/25177107.gif",
    "https://i.ibb.co.com/FhCs7n5/26558689.gif",
    "https://i.ibb.co.com/PZDtggn/26609933.gif",
    "https://i.ibb.co.com/sjyfxWG/26650121.gif",
    "https://i.ibb.co.com/q7fbZWK/27002655.gif",
    "https://i.ibb.co.com/pZhmQDJ/27221692.gif",
    "https://i.ibb.co.com/FVsYLJ0/27332182.gif",
    "https://i.ibb.co.com/hF8CFWb/27473745.gif",
    "https://i.ibb.co.com/Jz6vj0X/27516966.gif",
    "https://i.ibb.co.com/Kx5WffD/27760345.gif",
    "https://i.ibb.co.com/vBNzjRX/27775887.gif",
    "https://i.ibb.co.com/MZP9VdK/27875889.gif",
    "https://i.ibb.co.com/tPqSrM6/29388816.gif",
    "https://i.ibb.co.com/DCF7SRz/29996182.gif",
    "https://i.ibb.co.com/BN66MV8/3914814.gif",
    "https://i.ibb.co.com/mvjDB83/3946939.gif",
    "https://i.ibb.co.com/0nQxszS/4516866.gif",
    "https://i.ibb.co.com/SPCYkrV/4738041.gif",
    "https://i.ibb.co.com/k0c4VfR/5059717.gif",
    "https://i.ibb.co.com/Z2kLL95/6342257.gif",
    "https://i.ibb.co.com/p0rrLjJ/6527066.gif",
    "https://i.ibb.co.com/Bw7X5VP/7457055.gif",
    "https://i.ibb.co.com/BnLS2w1/8908943.gif",
    "https://i.ibb.co.com/mvWKzDN/8964114.gif",
    "https://i.ibb.co.com/yR4ykzK/Anime-Girlies-Fanart-Wallpaper-2-B-in-White-Silk-Pajamas-at-Sunrise.jpg",
    "https://i.ibb.co.com/6vKxyfR/ar.png",
    "https://i.ibb.co.com/SxyW1xd/avw.gif",
    "https://i.ibb.co.com/wySJ6Rw/de.png",
    "https://i.ibb.co.com/3MQ8jC5/en.png",
    "https://i.ibb.co.com/Pz2HZ9C/es.png",
    "https://i.ibb.co.com/GC0Sm01/fr.png",
    "https://i.ibb.co.com/m8hXpDX/it.png",
    "https://i.ibb.co.com/ns485MD/pl.png",
    "https://i.ibb.co.com/52f82qP/pt.png",
    "https://i.ibb.co.com/B64dxCF/ru.png",
    "https://i.ibb.co.com/w75nPZX/t.png",
    "https://i.ibb.co.com/NFNbKV7/13034662.gif",
    "https://i.ibb.co.com/dM95wZG/16986053.gif",
    "https://i.ibb.co.com/KqjpTQc/23096741.gif",
    "https://i.ibb.co.com/pKjw9Vc/26558689.gif",
    "https://i.ibb.co.com/gVC3NT6/29539928.gif"
];

// Event listener for generating a meme when the button is clicked
document.getElementById('generate-meme-btn-mw').addEventListener('click', function() {
    fetchWaifuImage();
});

function fetchWaifuImage() {
    const generateButton = document.getElementById('generate-meme-btn-mw');
    const preloader = document.getElementById('preloader-unique-mw');
    const memeImg = document.getElementById('meme-img-unique-mw');

    // Disable the button and show loading text
    generateButton.disabled = true;
    generateButton.innerHTML = 'Loading...';

    // Show preloader before starting the fetch
    preloader.style.display = 'block'; // Show preloader GIF
    memeImg.style.display = 'none'; 

    // Decide whether to fetch a GIF or image from the API
    const randomChoice = Math.random() > 0.5; // 50% chance for API or GIF
    let imageUrl;

    if (randomChoice) {
        // Fetch image from the waifu API
        fetch('https://api.waifu.pics/nsfw/blowjob')
            .then(response => response.json())
            .then(data => {
                const waifuImageUrl = data.url; // Get the waifu image URL

                // Check if the image URL has already been shown
                if (seenWaifuImages.has(waifuImageUrl)) {
                    console.log('Duplicate image detected. Fetching a new image...');
                    fetchWaifuImage(); // Retry fetching another image
                } else {
                    // Add the image URL to the set and display it
                    seenWaifuImages.add(waifuImageUrl);
                    memeImg.src = waifuImageUrl;
                    memeImg.onload = function() {
                        // Hide preloader and show the image when it's loaded
                        preloader.style.display = 'none';
                        memeImg.style.display = 'block';

                        // Countdown in the button after the image is loaded
                        countdownToEnableButton(generateButton, 'Get Pic');
                    };
                }
            })
            .catch(error => {
                console.error('Error fetching image:', error);
                preloader.style.display = 'none';
                generateButton.disabled = false;
                generateButton.innerHTML = 'Get Pic <i class="fa-brands fa-space-awesome"></i>';
            });
    } else {
        // Select a random GIF from the gifUrls array
        const randomGifIndex = Math.floor(Math.random() * gifUrls.length);
        imageUrl = gifUrls[randomGifIndex];

        // Show the selected GIF
        memeImg.src = imageUrl;
        memeImg.onload = function() {
            // Hide preloader and show the image when it's loaded
            preloader.style.display = 'none';
            memeImg.style.display = 'block';

            // Countdown in the button after the image is loaded
            countdownToEnableButton(generateButton, 'Get Pic');
        };
    }
}

// Countdown function
function countdownToEnableButton(button, defaultText) {
    let countdown = 3;
    const countdownInterval = setInterval(() => {
        button.innerHTML = `Try again in ${countdown}s`;
        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            button.innerHTML = `${defaultText} <i class="fa-brands fa-space-awesome"></i>`;
            button.disabled = false;
        }
    }, 1000);
}
