// Create floating hearts and stars
function createFloatingItems() {
    const container = document.getElementById('floatingItems');
    const items = ['❤', '⭐', '•'];
    const colors = ['#e75a88', '#9370db', '#ffd700'];
    
    for (let i = 0; i < 30; i++) {
        const item = document.createElement('div');
        item.className = 'floating-item';
        
        // Random item
        const randomItem = items[Math.floor(Math.random() * items.length)];
        item.textContent = randomItem;
        
        // Random position, size, and color
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = Math.random() * 20 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        item.style.left = `${left}%`;
        item.style.top = `${top}%`;
        item.style.fontSize = `${size}px`;
        item.style.color = color;
        item.style.opacity = Math.random() * 0.5 + 0.2;
        
        // Animation
        const duration = Math.random() * 60 + 40;
        item.style.animation = `float ${duration}s linear infinite`;
        
        container.appendChild(item);
    }
}

// Add confetti on card open
function addConfetti() {
    const colors = ['#e75a88', '#9370db', '#ffd700', '#ff6b6b', '#5cdbd3', '#88d45a'];
    const shapes = ['square', 'circle'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random position, color, shape
            const left = Math.random() * 100;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const size = Math.random() * 8 + 5;
            
            confetti.style.left = `${left}%`;
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = color;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            }
            
            document.body.appendChild(confetti);
            
            // Animation
            const speed = Math.random() * 3 + 2;
            const rotation = Math.random() * 360;
            
            confetti.animate([
                { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${rotation}deg)`, opacity: 0 }
            ], {
                duration: speed * 1000,
                easing: 'cubic-bezier(0.2, 0.8, 0.9, 0.99)'
            });
            
            setTimeout(() => {
                confetti.remove();
            }, speed * 1000);
        }, i * 50);
    }
}

// Calculate time remaining until target date
function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    
    // If deadline has passed, return all zeros but don't mark as past yet
    if (total <= 0) {
        return {
            total: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isPast: false // Will be handled by a separate timer
        };
    }
    
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return {
        total,
        days,
        hours,
        minutes,
        seconds,
        isPast: false
    };
}

// Initialize countdown
function initializeCountdown(endtime) {
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    
    // Check if birthday has passed
    const now = new Date();
    const isPastDate = now > endtime;
    
    function updateClock() {
        const t = getTimeRemaining(endtime);
        
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    }
    
    // Run update clock once to set initial values
    updateClock();
    
    // If the date has passed, show zeros for a few seconds then transition
    if (isPastDate) {
        // Show zeros for 3 seconds before transitioning
        setTimeout(() => {
            showReady();
        }, 3000);
    } else {
        // Normal countdown behavior
        const timeinterval = setInterval(() => {
            updateClock();
            
            // Check if we've just crossed the deadline
            if (new Date() >= endtime) {
                clearInterval(timeinterval);
                // Show zeros for 3 seconds then transition
                setTimeout(() => {
                    showReady();
                }, 3000);
            }
        }, 1000);
    }
}

// Remove unused function since we're now handling the transition directly
// in the window.onload function
/* function showCountdown() {
    document.getElementById('loadingScreen').style.display = 'none';
    document.getElementById('countdownScreen').style.display = 'block';
    
    // Set deadline to May 14, 2025 at 00:00:00 (midnight)
    const deadline = new Date(2025, 4, 14, 0, 0, 0); // Month is 0-indexed, so 4 = May
    initializeCountdown(deadline);
} */

function showReady() {
    document.getElementById('countdownScreen').style.display = 'none';
    document.getElementById('readyScreen').style.display = 'block';
}

function showCard() {
    document.getElementById('readyScreen').style.display = 'none';
    document.getElementById('cardScreen').style.display = 'block';
    addConfetti();
}

function openCard() {
    document.getElementById('giftCard').style.display = 'none';
    document.getElementById('openedCard').style.display = 'block';
    addConfetti();
}

// Initialize
window.onload = function() {
    createFloatingItems();
    
    // Set event listeners
    document.getElementById('forYouBtn').addEventListener('click', showCard);
    document.getElementById('giftCard').addEventListener('click', openCard);
    
    // Show loading screen for 5 seconds, then proceed to countdown
    setTimeout(() => {
        // Hide loading screen
        document.getElementById('loadingScreen').style.display = 'none';
        // Show countdown screen
        document.getElementById('countdownScreen').style.display = 'block';
        
        // Set deadline to May 14, 2025 at 00:00:00 (midnight)
        const deadline = new Date(2025, 4, 14, 0, 0, 0); // Month is 0-indexed, so 4 = May
        initializeCountdown(deadline);
    }, 5000);
};

let title = document.title;
let speed = 180; // Speed in milliseconds

function scrollTitle() {
    title = title.substring(1) + title.charAt(0);
    document.title = title;
    setTimeout(scrollTitle, speed);
}

scrollTitle();