// Background music control using YouTube iframe API


// Array of love messages to display
const loveMessages = [
    "You're the most beautiful person I've ever met! 😍",
    "You make my heart skip a beat every time I see you! 💓",
    "You're my dream come true! 🌟",
    "I want to spend every moment with you! 💑",
    "You're my perfect match! 💝",
    "My love for you grows stronger every day! 💕"
];

let messageIndex = 0;

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    document.getElementById('hearts-container').appendChild(heart);
    
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// Handle screen orientation
function handleOrientation() {
    const container = document.querySelector('.container');
    
    if (window.matchMedia("(max-width: 768px) and (orientation: landscape)").matches) {
        // Enable smooth scrolling in landscape mode
        container.style.overflowY = 'auto';
        container.style.height = '100vh';
        
        // Adjust floating hearts position in landscape
        const hearts = document.querySelectorAll('.floating-heart');
        hearts.forEach(heart => {
            heart.style.position = 'absolute';
        });
    } else {
        // Reset to default in portrait mode
        container.style.overflowY = 'hidden';
        container.style.height = 'auto';
    }
    
    // Force layout recalculation
    container.style.display = 'none';
    container.offsetHeight; // trigger reflow
    container.style.display = 'block';
}

// Listen for orientation changes
window.addEventListener('load', handleOrientation);
window.addEventListener('resize', handleOrientation);
window.addEventListener('orientationchange', handleOrientation);

// Create firework effect
function createFirework() {
    const fireworks = document.querySelector('.fireworks');
    const firework = document.createElement('div');
    firework.style.left = Math.random() * 100 + 'vw';
    firework.style.top = Math.random() * 100 + 'vh';
    firework.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
    firework.style.position = 'absolute';
    firework.style.fontSize = '50px';
    firework.innerHTML = '✨';
    fireworks.appendChild(firework);

    const animation = firework.animate([
        { transform: 'scale(0) rotate(0deg)', opacity: 1 },
        { transform: 'scale(1.5) rotate(360deg)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });

    animation.onfinish = () => firework.remove();
}

function createScrollMessage(message, index) {
    const messageEl = document.createElement('div');
    messageEl.className = 'scroll-message';
    messageEl.style.animationDelay = `${index * 2}s`;
    messageEl.innerHTML = `
        <div class="message-content">
            <span class="scroll-heart">💖</span>
            <p>${message}</p>
            <span class="scroll-heart">💖</span>
        </div>
    `;
    return messageEl;
}

function yesClicked() {
    // Clear existing content
    document.querySelector('.container').innerHTML = '';
    
    // Create celebration elements
    const celebration = document.createElement('div');
    celebration.className = 'celebration-container';
    celebration.style.textAlign = 'center';
    
    // Add initial message
    const message = document.createElement('h1');
    message.textContent = "I Love You So Much! 💑";
    message.style.animation = 'fadeIn 2s ease';
    celebration.appendChild(message);
    
    // Create scrolling messages container
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'scroll-container';
    
    // Add all messages with scroll effect
    loveMessages.forEach((msg, index) => {
        const messageEl = createScrollMessage(msg, index);
        scrollContainer.appendChild(messageEl);
    });
    
    celebration.appendChild(scrollContainer);
    
    // Start floating hearts and fireworks
    setInterval(createFloatingHeart, 300);
    setInterval(createFirework, 2000);
    
    document.querySelector('.container').appendChild(celebration);
}

const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("mouseover", () => {
    const x = Math.floor(Math.random() * 80) - 40;
    const y = Math.floor(Math.random() * 80) - 40;
    noBtn.style.transform = `translate(${x}vw, ${y}vh)`;
});
