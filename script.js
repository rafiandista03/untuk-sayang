// ==========================================
// 1. PENGATURAN TANGGAL JADIAN (1 JANUARI 2026)
// ==========================================
const anniversaryDate = new Date(2026, 0, 1, 0, 0, 0); 

function updateCounter() {
    const now = new Date();
    const difference = now - anniversaryDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
}

setInterval(updateCounter, 1000);
updateCounter();


// ==========================================
// 2. ANIMASI HATI MELAYANG
// ==========================================
function createHearts() {
    const container = document.getElementById('heartContainer');
    const heartSymbols = ['💖', '💙', '❤️', '💕', '✨'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 15 + 15 + 'px'; 
        heart.style.animationDuration = Math.random() * 3 + 4 + 's'; 
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 450); 
}

createHearts();


// ==========================================
// 3. FITUR PERPINDAHAN HALAMAN PESAN HALUS
// ==========================================
const surpriseBtn = document.getElementById('surpriseBtn');
const messageContainer = document.getElementById('messageContainer');
const pages = document.querySelectorAll('.page');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const navButtons = document.getElementById('navButtons');
const pageIndicator = document.getElementById('pageIndicator');

let currentPageIndex = 0;

surpriseBtn.addEventListener('click', () => {
    surpriseBtn.classList.add('hidden');
    messageContainer.classList.remove('hidden');
});

function updatePage(index) {
    const activePage = document.querySelector('.page.active');
    
    // 1. Efek keluar halus pada halaman aktif lama
    if (activePage) {
        activePage.classList.add('exit');
        activePage.classList.remove('active');
        
        setTimeout(() => {
            activePage.classList.remove('exit');
            activePage.style.display = 'none';
            
            // 2. Tampilkan halaman baru setelah halaman lama selesai hilang
            targetPageSetup(index);
        }, 400); // Sinkron dengan durasi transisi CSS
    } else {
        targetPageSetup(index);
    }

    // Perbarui status titik indikator
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    // Sembunyikan navigasi jika berada di halaman pertanyaan romantis terakhir
    if (index === pages.length - 1) {
        navButtons.style.opacity = '0';
        pageIndicator.style.opacity = '0';
        setTimeout(() => {
            navButtons.style.display = 'none';
            pageIndicator.style.display = 'none';
        }, 400);
    } else {
        navButtons.style.display = 'flex';
        pageIndicator.style.display = 'flex';
        setTimeout(() => {
            navButtons.style.opacity = '1';
            pageIndicator.style.opacity = '1';
        }, 50);
        prevBtn.disabled = (index === 0);
        nextBtn.innerText = "Lanjut ❤️";
    }
}

function targetPageSetup(index) {
    const targetPage = pages[index];
    targetPage.style.display = 'block';
    
    setTimeout(() => {
        targetPage.classList.add('active');
    }, 20); // Jeda mikro agar browser merender perpindahan kelas dengan mulus
}

nextBtn.addEventListener('click', () => {
    if (currentPageIndex < pages.length - 1) {
        currentPageIndex++;
        updatePage(currentPageIndex);
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        updatePage(currentPageIndex);
    }
});


// ==========================================
// 4. LOGIKA TOMBOL "ENGGAK" MENGHINDAR
// ==========================================
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

function moveButton() {
    const container = document.getElementById('messageContainer');
    
    const maxX = container.clientWidth - noBtn.clientWidth - 30;
    const maxY = container.clientHeight - noBtn.clientHeight - 40;

    const randomX = Math.floor(Math.random() * maxX) + 15;
    const randomY = Math.floor(Math.random() * maxY) + 15;

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Mencegah klik tidak sengaja di layar HP Android/iOS
    moveButton();
});

yesBtn.addEventListener('click', () => {
    alert("Yesss! Aku tahu kamu pasti pilih IYA! I love you so much, Sayang! 💖✨");
});
