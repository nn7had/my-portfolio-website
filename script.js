// SmoothScroll sınıfı
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }
    
    handleClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
}

// ButtonHandlers sınıfı
class ButtonHandlers {
    constructor() {
        this.init();
    }
    
    init() {
        const contactBtn = document.querySelector('.btn-primary');
        if (contactBtn) {
            contactBtn.addEventListener('click', () => this.handleContact());
        }
        
        const projectsBtn = document.querySelector('.btn-secondary');
        if (projectsBtn) {
            projectsBtn.addEventListener('click', () => this.handleProjects());
        }
    }
    
    handleContact() {
        const email = 'n7hadisayev@gmail.com';
        window.location.href = `mailto:${email}`;
    }
    
    handleProjects() {
        console.log('Projeler bölümüne yönlendiriliyor...');
    }
}

// NavbarScroll sınıfı
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navContainer = document.querySelector('.nav-container');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.handleScroll();
        this.updateBackgroundAccordingToBody();
    }

    handleScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            this.navbar.style.background = '#030014';
            this.navContainer.style.background = '#030014';
            this.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            this.navbar.style.background = '#030014';
            this.navContainer.style.background = '#030014';
            this.navbar.style.boxShadow = 'none';
        }
    }

    updateBackgroundAccordingToBody() {
        this.navbar.style.background = '#030014';
        this.navContainer.style.background = '#030014';
        this.navbar.style.color = '#eee';
    }
}

// TypingAnimation sınıfı
class TypingAnimation {
    constructor() {
        this.titleElement = document.querySelector('.hero-title');
        this.originalText = 'Nihad Isayev';
        this.init();
    }
    
    init() {
        if (!this.titleElement) return;
        
        this.titleElement.textContent = '';
        this.typeText();
    }
    
    async typeText() {
        for (let i = 0; i <= this.originalText.length; i++) {
            this.titleElement.textContent = this.originalText.slice(0, i);
            await this.delay(100);
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// WhatsApp Widget ve diğer işlevler
document.addEventListener("DOMContentLoaded", () => {
    // WhatsApp Widget elemanları
    const chatHeader = document.getElementById("chat-header");
    const chatContent = document.getElementById("chat-content");
    const messageInput = document.getElementById("message-input");
    const closeBtn = document.getElementById("close-btn");
    const whatsappBtn = document.getElementById("whatsapp-btn");
    const chatIcon = document.getElementById("chat-icon");
    let isFirstOpen = true;
    let hasBeenOpened = false;
    
    function showChat() {
        chatIcon.style.display = "none";
        chatHeader.style.display = "flex";
        chatContent.style.display = "block";
        messageInput.style.display = "flex";
        setTimeout(() => {
            chatHeader.style.opacity = "1";
            chatHeader.style.transform = "translateY(0)";
            chatContent.style.opacity = "1";
            chatContent.style.transform = "translateY(0)";
            messageInput.style.opacity = "1";
            messageInput.style.transform = "translateY(0)";
        }, 50);
        if (isFirstOpen) {
            setTimeout(showTypingIndicator, 1000);
            isFirstOpen = false;
        }
        hasBeenOpened = true;
    }
    
    function hideChat() {
        chatHeader.style.opacity = "0";
        chatHeader.style.transform = "translateY(20px)";
        chatContent.style.opacity = "0";
        chatContent.style.transform = "translateY(20px)";
        messageInput.style.opacity = "0";
        messageInput.style.transform = "translateY(20px)";
        setTimeout(() => {
            chatHeader.style.display = "none";
            chatContent.style.display = "none";
            messageInput.style.display = "none";
            chatIcon.style.display = "flex";
        }, 500);
    }
    
    let autoOpenTimeout = setTimeout(() => {
        if (!hasBeenOpened) {
            showChat();
        }
    }, 3000);
    
    closeBtn.addEventListener("click", hideChat);
    chatIcon.addEventListener("click", (e) => {
        e.preventDefault();
        clearTimeout(autoOpenTimeout);
        showChat();
    });
    
    whatsappBtn.addEventListener("click", () => {
        window.open(
            "https://api.whatsapp.com/send/?phone=%2B994558896611&text&type=phone_number&app_absent=0",
            "_blank"
        );
    });
    
    function showTypingIndicator() {
        const typingIndicator = document.createElement("div");
        typingIndicator.className = "typing-indicator";
        typingIndicator.innerHTML = "<span></span><span></span><span></span>";
        chatContent.appendChild(typingIndicator);
        chatContent.scrollTop = chatContent.scrollHeight;
        setTimeout(() => {
            typingIndicator.remove();
            showIncomingMessage();
        }, 3000);
    }
    
    function showIncomingMessage() {
        const incomingMessage = document.createElement("div");
        incomingMessage.className = "message received";
        incomingMessage.textContent =
            "Welcome to our WhatsApp support team. How can we assist you today? Please send us your questions here, and we will get back to you as soon as possible.";
        chatContent.appendChild(incomingMessage);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    // Ana site fonksiyonları çağrılıyor
    new SmoothScroll();
    new ButtonHandlers();
    new NavbarScroll();

    setTimeout(() => {
        new TypingAnimation();
    }, 1000);
});

// Mouse cursor efekti
document.addEventListener('mousemove', (e) => {
    let cursor = document.querySelector('.cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(59, 130, 246, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);
    }
    
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

document.querySelectorAll('button, a, .skill-item').forEach(element => {
    element.addEventListener('mouseenter', () => {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(59, 130, 246, 0.5)';
        }
    });
    
    element.addEventListener('mouseleave', () => {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(59, 130, 246, 0.3)';
        }
    });
});
