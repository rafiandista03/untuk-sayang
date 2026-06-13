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
// 3. FITUR PERPINDAHAN HALAMAN PESAN
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
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    setTimeout(() => {
        pages[index].classList.add('active');
    }, 50);

    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    prevBtn.disabled = (index === 0);

    // Menyembunyikan tombol navigasi bawaan di halaman terakhir agar fokus ke pilihan Ya/Tidak
    if (index === pages.length - 1) {
        navButtons.style.display = 'none';
        pageIndicator.style.display = 'none';
    } else {
        navButtons.style.display = 'flex';
        pageIndicator.style.display = 'flex';
        nextBtn.innerText = "Lanjut ❤️";
    }
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
    
    // Menghitung batas area aman agar tombol tidak melompati batas luar box kotak pesan
    const maxX = container.clientWidth - noBtn.clientWidth - 30;
    const maxY = container.clientHeight - noBtn.clientHeight - 40;

    // Koordinat acak
    const randomX = Math.floor(Math.random() * maxX) + 15;
    const randomY = Math.floor(Math.random() * maxY) + 15;

    // Pindahkan tombol menggunakan gaya CSS absolute koordinat
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Berpindah tempat ketika mouse mendekat (PC/Laptop)
noBtn.addEventListener('mouseover', moveButton);

// Berpindah tempat ketika disentuh jari (HP/Smartphone)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveButton();
});

// Aksi ketika tombol "Iya dong!" berhasil diklik
yesBtn.addEventListener('click', () => {
    alert("Yesss! Aku tahu kamu pasti pilih IYA! I love you so much, Sayang! 💖✨");
});