// AutoClean Vision - Academic Minimalist JavaScript
// Focused on functionality over decoration

class AcademicAutoCleanVision {
    constructor() {
        this.init();
    }

    init() {
        this.setupAccessibleNavigation();
        this.setupCitationExport();
        this.setupPrintOptimization();
        this.setupProgressiveEnhancement();
        this.setupReducedMotionSupport();
    }

    // Enhanced navigation for academic reading
    setupAccessibleNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Remove active class from all links
                    navLinks.forEach(l => l.classList.remove('active'));
                    
                    // Add active class to current link
                    link.classList.add('active');
                    
                    // Smooth scroll with offset for fixed header
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Announce to screen readers
                    this.announceToScreenReader(`Navigated to ${targetElement.querySelector('h2')?.textContent || 'section'}`);
                }
            });
        });

        // Update active nav on scroll (minimal implementation)
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateActiveNavLink();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id], header[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 150; // Offset for better UX
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Citation export functionality
    setupCitationExport() {
        window.exportCitation = (format) => {
            const citations = {
                bibtex: `@article{autoclean_vision_2025,
    title={Computer Vision Approaches to Automated EEG Artifact Classification},
    author={AutoClean Vision Research Team},
    journal={AutoClean Vision Technical Documentation},
    year={2025},
    url={https://autoclean-vision.org},
    note={Open source framework for EEG preprocessing}
}`,
                apa: `AutoClean Vision Research Team. (2025). Computer vision approaches to automated EEG artifact classification. AutoClean Vision Technical Documentation. https://autoclean-vision.org`,
                
                mla: `AutoClean Vision Research Team. "Computer Vision Approaches to Automated EEG Artifact Classification." AutoClean Vision Technical Documentation, 2025, autoclean-vision.org.`,
                
                chicago: `AutoClean Vision Research Team. "Computer Vision Approaches to Automated EEG Artifact Classification." AutoClean Vision Technical Documentation. 2025. https://autoclean-vision.org.`
            };
            
            if (citations[format]) {
                this.copyToClipboard(citations[format]);
                this.showNotification(`${format.toUpperCase()} citation copied to clipboard`);
            }
        };
    }

    // Enhanced print styles and functionality
    setupPrintOptimization() {
        // Add print button functionality if needed
        const printButton = document.querySelector('[data-print]');
        if (printButton) {
            printButton.addEventListener('click', () => {
                window.print();
            });
        }

        // Optimize images for print
        window.addEventListener('beforeprint', () => {
            document.body.classList.add('print-mode');
        });

        window.addEventListener('afterprint', () => {
            document.body.classList.remove('print-mode');
        });
    }

    // Progressive enhancement for advanced features
    setupProgressiveEnhancement() {
        // Table enhancements for mobile
        this.enhanceTablesForMobile();
        
        // Figure zoom functionality (touch-friendly)
        this.setupFigureInteraction();
        
        // Jump-to-section links
        this.createJumpLinks();
    }

    enhanceTablesForMobile() {
        const tables = document.querySelectorAll('.academic-table');
        
        tables.forEach(table => {
            // Wrap tables for horizontal scrolling
            if (!table.parentElement.classList.contains('table-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-wrapper';
                wrapper.style.overflowX = 'auto';
                wrapper.style.marginBottom = 'var(--space-lg)';
                
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }

            // Add mobile-friendly table navigation
            if (window.innerWidth <= 768) {
                this.addTableNavigation(table);
            }
        });
    }

    addTableNavigation(table) {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            row.setAttribute('data-row', index + 1);
            row.addEventListener('click', () => {
                // Simple row highlighting for mobile interaction
                rows.forEach(r => r.classList.remove('highlighted'));
                row.classList.add('highlighted');
            });
        });
    }

    setupFigureInteraction() {
        const figures = document.querySelectorAll('.academic-figure img');
        
        figures.forEach(img => {
            // Add click/tap to zoom functionality
            img.addEventListener('click', (e) => {
                this.showImageModal(img);
            });
            
            // Add keyboard accessibility
            img.setAttribute('tabindex', '0');
            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.showImageModal(img);
                }
            });
        });
    }

    showImageModal(img) {
        // Simple modal for image viewing
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-backdrop">
                <div class="modal-content">
                    <img src="${img.src}" alt="${img.alt}" style="max-width: 90vw; max-height: 90vh;">
                    <button class="modal-close" aria-label="Close image">×</button>
                </div>
            </div>
        `;
        
        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.9);
        `;
        
        const backdrop = modal.querySelector('.modal-backdrop');
        backdrop.style.cssText = `
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        `;
        
        const content = modal.querySelector('.modal-content');
        content.style.cssText = `
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
        `;
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            padding: 0.5rem;
        `;
        
        document.body.appendChild(modal);
        
        // Close functionality
        const closeModal = () => {
            document.body.removeChild(modal);
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target === backdrop) {
                closeModal();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }

    createJumpLinks() {
        // Create academic-style jump links
        const sections = document.querySelectorAll('h2[id], h3[id]');
        if (sections.length > 3) {
            const jumpNav = document.createElement('div');
            jumpNav.className = 'jump-navigation';
            jumpNav.innerHTML = '<h4>Contents</h4><ul></ul>';
            
            sections.forEach(section => {
                const link = document.createElement('li');
                link.innerHTML = `<a href="#${section.id}">${section.textContent}</a>`;
                jumpNav.querySelector('ul').appendChild(link);
            });
            
            // Insert after hero section
            const hero = document.querySelector('.hero');
            if (hero && hero.nextElementSibling) {
                hero.parentNode.insertBefore(jumpNav, hero.nextElementSibling);
            }
        }
    }

    // Respect reduced motion preferences
    setupReducedMotionSupport() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable smooth scrolling
            document.documentElement.style.scrollBehavior = 'auto';
            
            // Remove any transition animations
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Utility functions
    copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
            } catch (err) {
                console.warn('Could not copy text to clipboard');
            }
            
            document.body.removeChild(textArea);
        }
    }

    showNotification(message) {
        // Simple, accessible notification
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.setAttribute('role', 'status');
        notification.setAttribute('aria-live', 'polite');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--academic-blue);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.25rem;
            font-family: var(--font-secondary);
            font-size: 0.875rem;
            z-index: 1000;
            box-shadow: var(--shadow-medium);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AcademicAutoCleanVision();
    
    // Add any additional academic-specific functionality
    setupAcademicTableStyles();
    setupPrintStyles();
});

// Academic table enhancements
function setupAcademicTableStyles() {
    const tables = document.querySelectorAll('.academic-table');
    
    tables.forEach(table => {
        // Add table number if caption exists
        const caption = table.nextElementSibling;
        if (caption && caption.classList.contains('table-caption')) {
            const tableNum = Array.from(document.querySelectorAll('.academic-table')).indexOf(table) + 1;
            if (!caption.textContent.includes('Table ' + tableNum)) {
                caption.innerHTML = caption.innerHTML.replace('<strong>', `<strong>Table ${tableNum}: `);
            }
        }
    });
}

// Print-specific enhancements
function setupPrintStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            .image-modal,
            .notification,
            .jump-navigation {
                display: none !important;
            }
            
            .academic-table {
                break-inside: avoid;
            }
            
            .academic-figure {
                break-inside: avoid;
            }
            
            h2, h3 {
                break-after: avoid;
            }
            
            .table-caption,
            .figure-caption {
                break-before: avoid;
            }
        }
    `;
    document.head.appendChild(style);
}

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    // Quick navigation with number keys (academic convention)
    if (e.altKey && e.key >= '1' && e.key <= '7') {
        e.preventDefault();
        const sectionIndex = parseInt(e.key) - 1;
        const sections = document.querySelectorAll('section[id]');
        if (sections[sectionIndex]) {
            sections[sectionIndex].scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}