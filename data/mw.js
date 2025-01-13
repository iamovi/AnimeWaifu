// Array of direct GIF links
const gifUrls = [
    "https://ik.imagekit.io/iamovi/hengifs/17560226_OvdY9nFku.gif",
    "https://ik.imagekit.io/iamovi/hengifs/B4G1dx7_oWlE-0o2U.gif",
    "https://ik.imagekit.io/iamovi/hengifs/10798795_r_ZI3oR9U.gif",
    "https://ik.imagekit.io/iamovi/hengifs/10859903_qhEWKqESe4.gif",
    "https://ik.imagekit.io/iamovi/hengifs/11418564_JpeRwXQTm.gif",
    "https://ik.imagekit.io/iamovi/hengifs/11835280_5TCe-_jsiR.gif",
    "https://ik.imagekit.io/iamovi/hengifs/11960019_UsR9rjERN.gif",
    "https://ik.imagekit.io/iamovi/hengifs/11979365_G_xWkTyx3.gif",
    "https://ik.imagekit.io/iamovi/hengifs/12374865_kSPEjRAYhi.gif",
    "https://ik.imagekit.io/iamovi/hengifs/12545925_pkN7kIjGW9.gif",
    "https://ik.imagekit.io/iamovi/hengifs/13034662_Jerlx-lcR.gif",
    "https://ik.imagekit.io/iamovi/hengifs/14585524_qSKrwCXEWA.gif",
    "https://ik.imagekit.io/iamovi/hengifs/15084565_g-3ihVeXDX.gif",
    "https://ik.imagekit.io/iamovi/hengifs/15473256_V0sujp6FHW.gif",
    "https://ik.imagekit.io/iamovi/hengifs/15815628_VU7cD3e3qn.gif",
    "https://ik.imagekit.io/iamovi/hengifs/15828814_lsBfWCYTY.gif",
    "https://ik.imagekit.io/iamovi/hengifs/16054460_HQeqwqEkO.gif",
    "https://ik.imagekit.io/iamovi/hengifs/16105796_nkFZGQIiJv.gif",
    "https://ik.imagekit.io/iamovi/hengifs/16517512_m_5VhonGRB.gif",
    "https://ik.imagekit.io/iamovi/hengifs/16602710_mveyfBfVyj.gif",
    "https://ik.imagekit.io/iamovi/hengifs/16986053_ajcLjgo5I.gif",
    "https://ik.imagekit.io/iamovi/hengifs/17014015_sMnDdBnrTW.gif",
    "https://ik.imagekit.io/iamovi/hengifs/17560226_rM1SRwwGL.gif",
    "https://ik.imagekit.io/iamovi/hengifs/17612376_oEyhaZ-BIc.gif",
    "https://ik.imagekit.io/iamovi/hengifs/17836722_X85hSfQD2e.gif",
    "https://ik.imagekit.io/iamovi/hengifs/17958943_em7WORwWu.gif",
    "https://ik.imagekit.io/iamovi/hengifs/18177340_P95yEjMZ9.gif",
    "https://ik.imagekit.io/iamovi/hengifs/18199010_wEgyn-90x.gif",
    "https://ik.imagekit.io/iamovi/hengifs/18572800_O3BkTEjh5.gif",
    "https://ik.imagekit.io/iamovi/hengifs/18646488_kYqdmPJDIB.gif",
    "https://ik.imagekit.io/iamovi/hengifs/18730205_qcrvBiujCf.gif",
    "https://ik.imagekit.io/iamovi/hengifs/18826921_iCd0ib1yky.gif",
    "https://ik.imagekit.io/iamovi/hengifs/19008297_TilKopEv6a.gif",
    "https://ik.imagekit.io/iamovi/hengifs/19163255_Gs4YIVXgO.gif",
    "https://ik.imagekit.io/iamovi/hengifs/19228958_HS09eGFIh.gif",
    "https://ik.imagekit.io/iamovi/hengifs/19298797_Eppjr4CxOv.gif",
    "https://ik.imagekit.io/iamovi/hengifs/19365650_5ktDYszKk.gif",
    "https://ik.imagekit.io/iamovi/hengifs/19665460_YAtxyyjJ4z.gif",
    "https://ik.imagekit.io/iamovi/hengifs/19736818_ubx9gyqEh.gif",
    "https://ik.imagekit.io/iamovi/hengifs/19759095_qgg4fNbHh.gif",
    "https://ik.imagekit.io/iamovi/hengifs/19760111_vdbPl1dFF.gif",
    "https://ik.imagekit.io/iamovi/hengifs/19782134_WqV_mjusKH.gif",
    "https://ik.imagekit.io/iamovi/hengifs/19880262_-xit7067v.gif",
    "https://ik.imagekit.io/iamovi/hengifs/19917647_kFgjG_uzCW.gif",
    "https://ik.imagekit.io/iamovi/hengifs/20011331_cWS1jlKAR.gif",
    "https://ik.imagekit.io/iamovi/hengifs/20042632_X-LRSHaEMQ.gif",
    "https://ik.imagekit.io/iamovi/hengifs/20063836_MD2qzsu9lc.gif",
    "https://ik.imagekit.io/iamovi/hengifs/20239232_CmEFbnakSb.gif",
    "https://ik.imagekit.io/iamovi/hengifs/20299543_obgb7Ablp.gif",
    "https://ik.imagekit.io/iamovi/hengifs/20316812_h14aEPcSk.gif",
    "https://ik.imagekit.io/iamovi/hengifs/20775235_evMIOkpf9.gif",
    "https://ik.imagekit.io/iamovi/hengifs/20893884_vF2QlHBPo.gif",
    "https://ik.imagekit.io/iamovi/hengifs/20940449_-F7db7BfX.gif",
    "https://ik.imagekit.io/iamovi/hengifs/21365746_9c5rQA87D.gif",
    "https://ik.imagekit.io/iamovi/hengifs/21519139_IjNAyNHop.gif",
    "https://ik.imagekit.io/iamovi/hengifs/21539131_fWJ0UAk4V.gif",
    "https://ik.imagekit.io/iamovi/hengifs/21569551_g8-TA55FO.gif",
    "https://ik.imagekit.io/iamovi/hengifs/21835045_vpBpglLbvN.gif",
    "https://ik.imagekit.io/iamovi/hengifs/22473847_0pY9vMqiWp.gif",
    "https://ik.imagekit.io/iamovi/hengifs/22574297_tRWBlIrTdL.gif",
    "https://ik.imagekit.io/iamovi/hengifs/22663723_H9vDmNJQo.gif",
    "https://ik.imagekit.io/iamovi/hengifs/22894036_cvtucjVOu.gif",
    "https://ik.imagekit.io/iamovi/hengifs/23001207_6hCe0Wkg4.gif",
    "https://ik.imagekit.io/iamovi/hengifs/23096741_yYS7X7FTA.gif",
    "https://ik.imagekit.io/iamovi/hengifs/23442295_oFPVxe8U9.gif",
    "https://ik.imagekit.io/iamovi/hengifs/23808520_bdh0jmVCa.gif",
    "https://ik.imagekit.io/iamovi/hengifs/23819690_LYhllf-MI.gif",
    "https://ik.imagekit.io/iamovi/hengifs/23907185_BkWj11QJNx.gif",
    "https://ik.imagekit.io/iamovi/hengifs/23985466_Kbkjgi_Hj.gif",
    "https://ik.imagekit.io/iamovi/hengifs/24253889_ehew2ujVX.gif",
    "https://ik.imagekit.io/iamovi/hengifs/24312200_Di9rd7T1z.gif",
    "https://ik.imagekit.io/iamovi/hengifs/24513205_EYD_bStNp.gif",
    "https://ik.imagekit.io/iamovi/hengifs/24871981_KqUBqTbCD.gif",
    "https://ik.imagekit.io/iamovi/hengifs/25051582_KhNQWuMGs.gif",
    "https://ik.imagekit.io/iamovi/hengifs/25177107_cmFEMBU94.gif",
    "https://ik.imagekit.io/iamovi/hengifs/26558689_6BqHekXPx.gif",
    "https://ik.imagekit.io/iamovi/hengifs/26609933_Sgq9pJ3iIu.gif",
    "https://ik.imagekit.io/iamovi/hengifs/26650121_9IWwBgQSv.gif",
    "https://ik.imagekit.io/iamovi/hengifs/26805730_kaIsSDGlR.gif",
    "https://ik.imagekit.io/iamovi/hengifs/27002655_iBNnREqHq.gif",
    "https://ik.imagekit.io/iamovi/hengifs/27221692_B90PNLDXq.gif",
    "https://ik.imagekit.io/iamovi/hengifs/27332182_3lvEeORLU.gif",
    "https://ik.imagekit.io/iamovi/hengifs/27473745_ZGGyhWsa68.gif",
    "https://ik.imagekit.io/iamovi/hengifs/27516966_giutqswdg.gif",
    "https://ik.imagekit.io/iamovi/hengifs/27760345_xdtwPuX7_.gif",
    "https://ik.imagekit.io/iamovi/hengifs/27775887_zmW4D5dXc.gif",
    "https://ik.imagekit.io/iamovi/hengifs/27875889_cobg0M4Qs.gif",
    "https://ik.imagekit.io/iamovi/hengifs/28669772_s-sHhkkrlX.gif",
    "https://ik.imagekit.io/iamovi/hengifs/28669778_IRGkybzum.gif",
    "https://ik.imagekit.io/iamovi/hengifs/28669803_Go7EbGdaE.gif",
    "https://ik.imagekit.io/iamovi/hengifs/28669811_mpfjiKOXhM.gif",
    "https://ik.imagekit.io/iamovi/hengifs/29388816_XhEKvuF9UI.gif",
    "https://ik.imagekit.io/iamovi/hengifs/29996182_drGzn4w_f.gif",
    "https://ik.imagekit.io/iamovi/hengifs/3914814_HZxIZ4M-p.gif",
    "https://ik.imagekit.io/iamovi/hengifs/3946939_KvBgC25eI.gif",
    "https://ik.imagekit.io/iamovi/hengifs/4516866_sauRMdoFA.gif",
    "https://ik.imagekit.io/iamovi/hengifs/4738041_PVfyLKy9Ve.gif",
    "https://ik.imagekit.io/iamovi/hengifs/5059717_taMLJDEj4.gif",
    "https://ik.imagekit.io/iamovi/hengifs/6342257_hjz_yue8y.gif",
    "https://ik.imagekit.io/iamovi/hengifs/6527066_I-aGduYAY.gif",
    "https://ik.imagekit.io/iamovi/hengifs/7457055_LrPTspgw2.gif",
    "https://ik.imagekit.io/iamovi/hengifs/8908943_iq0xNlRrQ.gif",
    "https://ik.imagekit.io/iamovi/hengifs/8964114_BWC6VVh-d.gif",
    "https://ik.imagekit.io/iamovi/hengifs/Anime_Girlies_Fanart_Wallpaper__2B_in_White_Silk_Pajamas_at_Sunrise_UFnkFvBz4.jpg"
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
    preloader.style.display = 'block';
    memeImg.style.display = 'none'; 

    const randomChoice = Math.random() > 0.5; // 50% chance for API or GIF
    let imageUrl;

    if (randomChoice) {
        fetch('https://api.waifu.pics/nsfw/blowjob')
            .then(response => response.json())
            .then(data => {
                const waifuImageUrl = data.url;
                memeImg.src = waifuImageUrl;
                memeImg.onload = function() {
                    preloader.style.display = 'none';
                    memeImg.style.display = 'block';
                    countdownToEnableButton(generateButton, 'Get Pic');
                };
            })
            .catch(error => {
                console.error('Error fetching image:', error);
                preloader.style.display = 'none';
                generateButton.disabled = false;
                generateButton.innerHTML = 'Get Pic';
            });
    } else {
        const randomGifIndex = Math.floor(Math.random() * gifUrls.length);
        imageUrl = gifUrls[randomGifIndex];
        memeImg.src = imageUrl;
        memeImg.onload = function() {
            preloader.style.display = 'none';
            memeImg.style.display = 'block';
            countdownToEnableButton(generateButton, 'Get Pic');
        };
    }
}

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
