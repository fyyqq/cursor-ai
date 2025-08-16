class ScrollTextAnimator {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        this.animatedText = this.container.querySelector('.text-animation h2');
        if (!this.animatedText) return;
        this.chars = [];
        this.totalChars = 0;
        this.splitTextIntoChars();
        this.chars = this.animatedText.querySelectorAll('.char');
        this.totalChars = this.chars.length;
        this.handleScroll = this.handleScroll.bind(this);
        this.updateScrollProgress = this.updateScrollProgress.bind(this);
        this.updateScrollProgress();
        window.addEventListener('scroll', this.handleScroll);
    }

    splitTextIntoChars() {
        const text = this.animatedText.textContent;
        this.animatedText.innerHTML = '';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');
            span.classList.add('char');
            span.textContent = char === ' ' ? '\u00A0' : char;
            this.animatedText.appendChild(span);
        }
    }

    updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        // Get section position and dimensions
        const sectionRect = this.container.getBoundingClientRect();
        const sectionTop = scrollTop + sectionRect.top;
        const sectionBottom = sectionTop + sectionRect.height;
        // Calculate animation progress when in section
        if (scrollTop >= sectionTop - window.innerHeight && scrollTop <= sectionBottom) {
            const sectionScrollStart = sectionTop - window.innerHeight * 0.5;
            const sectionScrollEnd = sectionTop + window.innerHeight * 0.5;
            const sectionProgress = Math.max(0, Math.min(1, (scrollTop - sectionScrollStart) / (sectionScrollEnd - sectionScrollStart)));
            const charsToAnimate = Math.floor(sectionProgress * this.totalChars);
            this.chars.forEach((char, index) => {
                if (index < charsToAnimate) {
                    char.classList.add('active');
                } else {
                    char.classList.remove('active');
                }
            });
        }
        // Reset animation if scrolled past section
        if (scrollTop > sectionBottom + window.innerHeight) {
            this.chars.forEach(char => char.classList.add('active'));
        }
        // Reset animation if scrolled before section
        if (scrollTop < sectionTop - window.innerHeight) {
            this.chars.forEach(char => char.classList.remove('active'));
        }
    }

    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateScrollProgress();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
}

// Example usage for multiple elements:
new ScrollTextAnimator('#text-animation-container');
new ScrollTextAnimator('#another-text-animation-container');