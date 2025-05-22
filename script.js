// AutoClean Vision Interactive Elements

class AutoCleanVisionApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupNavigation();
        this.setupModuleInteractions();
        this.setupClassificationHovers();
        this.setupExperimentCards();
        this.setupCodeHighlighting();
        this.setupPerformanceAnimations();
        this.setupMobileMenu();
    }

    // Scroll-triggered animations using Intersection Observer
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Animate sections on scroll
        const animatedElements = document.querySelectorAll(`
            .problem-item,
            .concept-item,
            .module-item,
            .classification-category,
            .advantage-item,
            .experiment-card,
            .benefit-item,
            .phase-item
        `);

        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });

        // Stagger animation for grids
        this.staggerAnimations('.problem-grid .problem-item', 100);
        this.staggerAnimations('.module-grid .module-item', 150);
        this.staggerAnimations('.classification-grid .classification-category', 100);
        this.staggerAnimations('.advantages-grid .advantage-item', 120);
    }

    staggerAnimations(selector, delay) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.transitionDelay = `${index * delay}ms`;
        });
    }

    // Smooth scrolling navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavLink();
            this.updateNavbarBackground();
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

    updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Module interaction effects
    setupModuleInteractions() {
        const moduleItems = document.querySelectorAll('.module-item');
        
        moduleItems.forEach(module => {
            module.addEventListener('mouseenter', () => {
                this.highlightModule(module);
            });
            
            module.addEventListener('mouseleave', () => {
                this.resetModuleHighlight(module);
            });

            module.addEventListener('click', () => {
                this.showModuleDetails(module);
            });
        });
    }

    highlightModule(module) {
        const icon = module.querySelector('.module-icon');
        const details = module.querySelector('.module-details');
        
        module.style.borderColor = '#f97316';
        module.style.borderWidth = '2px';
        module.style.borderStyle = 'solid';
        
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease-in-out';
        }
        
        if (details) {
            details.style.opacity = '1';
            details.style.transform = 'translateY(0)';
        }
    }

    resetModuleHighlight(module) {
        const icon = module.querySelector('.module-icon');
        
        module.style.borderColor = 'transparent';
        
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    }

    showModuleDetails(module) {
        const moduleName = module.dataset.module;
        const detailsContent = this.getModuleDetails(moduleName);
        
        this.showModal('Module Details', detailsContent);
    }

    getModuleDetails(moduleName) {
        const details = {
            ica: `
                <h3>ICA Vision Module</h3>
                <p>Advanced independent component analysis using computer vision techniques.</p>
                <ul>
                    <li>98% classification accuracy</li>
                    <li>6 artifact categories</li>
                    <li>Real-time processing capability</li>
                    <li>Expert-level consistency</li>
                </ul>
            `,
            peak: `
                <h3>Peak Finder Module</h3>
                <p>Multi-candidate visual heuristic for spectral peak detection.</p>
                <ul>
                    <li>Visual disagreement resolution</li>
                    <li>Up to 3 candidate peaks</li>
                    <li>Background model integration</li>
                    <li>Human-interpretable reasoning</li>
                </ul>
            `,
            continuous: `
                <h3>Continuous Rejection Module</h3>
                <p>Real-time artifact detection for streaming EEG data.</p>
                <ul>
                    <li>Adaptive thresholding</li>
                    <li>Context-aware margins</li>
                    <li>Minimal latency processing</li>
                    <li>Stream compatibility</li>
                </ul>
            `,
            epoch: `
                <h3>Epoch Rejection Module</h3>
                <p>Trial-based cleaning for event-related studies.</p>
                <ul>
                    <li>Event-related processing</li>
                    <li>Trial-wise analysis</li>
                    <li>Context preservation</li>
                    <li>Temporal coherence</li>
                </ul>
            `,
            channel: `
                <h3>Channel Rejection Module</h3>
                <p>Bad channel identification and marking system.</p>
                <ul>
                    <li>Single electrode analysis</li>
                    <li>Focal artifact detection</li>
                    <li>Spatial pattern recognition</li>
                    <li>Automated marking</li>
                </ul>
            `
        };
        
        return details[moduleName] || '<p>Module details not available.</p>';
    }

    // Classification category interactions
    setupClassificationHovers() {
        const categories = document.querySelectorAll('.classification-category');
        
        categories.forEach(category => {
            category.addEventListener('mouseenter', () => {
                this.showClassificationDetails(category);
            });
            
            category.addEventListener('mouseleave', () => {
                this.hideClassificationDetails(category);
            });
        });
    }

    showClassificationDetails(category) {
        const categoryType = category.dataset.category;
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'classification-details';
        detailsDiv.innerHTML = this.getClassificationDetails(categoryType);
        
        // Remove existing details
        const existingDetails = category.querySelector('.classification-details');
        if (existingDetails) {
            existingDetails.remove();
        }
        
        category.appendChild(detailsDiv);
        
        // Animate in
        setTimeout(() => {
            detailsDiv.style.opacity = '1';
            detailsDiv.style.transform = 'translateY(0)';
        }, 10);
    }

    hideClassificationDetails(category) {
        const details = category.querySelector('.classification-details');
        if (details) {
            details.style.opacity = '0';
            details.style.transform = 'translateY(10px)';
            setTimeout(() => details.remove(), 300);
        }
    }

    getClassificationDetails(categoryType) {
        const details = {
            brain: 'Clear dipolar topography over central/parietal regions. 1/f spectral pattern with alpha peaks. Rhythmic, wave-like time series without artifacts.',
            eye: 'Frontal activation patterns. Low-frequency dominance (<5Hz). Sharp deflections (blinks) or step-like changes (saccades) in time series.',
            muscle: 'High-frequency spectral dominance (>20Hz). Edge-focused, shallow topography. Sustained or bursting spiky activity in time series.',
            heart: 'Broad electrical field gradient. Regular QRS-like complexes at ~1Hz. Distant source characteristics in topography.',
            line_noise: 'Sharp spectral peak at 50/60Hz. Continuous sinusoidal oscillations. Widespread or localized topographic patterns.',
            channel_noise: 'Extremely focal topography on single electrode. 1/f-like spectrum. Erratic or persistent high-amplitude artifacts.'
        };
        
        return `<p><strong>Key Features:</strong> ${details[categoryType] || 'Details not available.'}</p>`;
    }

    // Experiment card interactions
    setupExperimentCards() {
        const experimentCards = document.querySelectorAll('.experiment-card');
        
        experimentCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.expandExperimentCard(card, index);
            });
        });
    }

    expandExperimentCard(card, index) {
        const experimentDetails = [
            {
                title: 'Cross-Dataset Validation',
                details: `
                    <h4>Detailed Methodology</h4>
                    <p>This experiment will establish the generalizability of AutoClean Vision across different EEG recording conditions, equipment, and populations.</p>
                    <h5>Training Phase</h5>
                    <ul>
                        <li>Dataset A: High-density EEG (128 channels) from healthy adults</li>
                        <li>1000+ hours of manually validated data</li>
                        <li>Expert consensus from 3+ EEG specialists</li>
                    </ul>
                    <h5>Testing Phase</h5>
                    <ul>
                        <li>Dataset B: Clinical EEG (32 channels) from patients</li>
                        <li>Dataset C: Mobile EEG (16 channels) from field studies</li>
                        <li>Dataset D: Sleep EEG (64 channels) from overnight recordings</li>
                    </ul>
                `
            },
            {
                title: 'Expert Inter-Rater Reliability',
                details: `
                    <h4>Validation Protocol</h4>
                    <p>Direct comparison between AutoClean Vision and expert consensus to establish clinical validity.</p>
                    <h5>Expert Panel</h5>
                    <ul>
                        <li>5 board-certified clinical neurophysiologists</li>
                        <li>3 research EEG specialists</li>
                        <li>Minimum 10 years of EEG analysis experience</li>
                    </ul>
                    <h5>Blinding Protocol</h5>
                    <ul>
                        <li>Randomized presentation order</li>
                        <li>No identification of automated vs. manual classifications</li>
                        <li>Independent review sessions</li>
                    </ul>
                `
            },
            {
                title: 'Clinical Pipeline Integration',
                details: `
                    <h4>Real-World Deployment</h4>
                    <p>Integration into active clinical EEG laboratories to validate practical utility and workflow efficiency.</p>
                    <h5>Partner Institutions</h5>
                    <ul>
                        <li>3 academic medical centers</li>
                        <li>2 specialized epilepsy centers</li>
                        <li>1 pediatric neurophysiology lab</li>
                    </ul>
                    <h5>Metrics Collection</h5>
                    <ul>
                        <li>Processing time per study</li>
                        <li>Expert review time reduction</li>
                        <li>Error rate comparisons</li>
                        <li>User satisfaction surveys</li>
                    </ul>
                `
            },
            {
                title: 'Active Learning Validation',
                details: `
                    <h4>Continuous Improvement Study</h4>
                    <p>Demonstration of the system's ability to learn and improve from expert corrections over time.</p>
                    <h5>Learning Protocol</h5>
                    <ul>
                        <li>Initial baseline performance measurement</li>
                        <li>Expert correction collection and feedback</li>
                        <li>Model retraining with updated examples</li>
                        <li>Performance re-evaluation</li>
                    </ul>
                    <h5>Long-term Tracking</h5>
                    <ul>
                        <li>Monthly performance assessments</li>
                        <li>Learning curve analysis</li>
                        <li>Convergence to expert-level performance</li>
                    </ul>
                `
            }
        ];
        
        this.showModal(experimentDetails[index].title, experimentDetails[index].details);
    }

    // Syntax highlighting for code blocks
    setupCodeHighlighting() {
        const codeBlocks = document.querySelectorAll('code.language-python');
        
        codeBlocks.forEach(block => {
            this.highlightPythonCode(block);
        });
    }

    highlightPythonCode(block) {
        let code = block.textContent;
        
        // Simple Python syntax highlighting
        code = code
            .replace(/\b(import|from|def|class|if|else|elif|for|while|try|except|finally|with|as|return|yield|lambda|and|or|not|in|is|True|False|None)\b/g, '<span style="color: #3b82f6; font-weight: 600;">$1</span>')
            .replace(/\b(mne|AutoCleanVision|ICA|raw|ica|classifications)\b/g, '<span style="color: #059669; font-weight: 500;">$1</span>')
            .replace(/#.*$/gm, '<span style="color: #6b7280; font-style: italic;">$&</span>')
            .replace(/'([^']*)'|"([^"]*)"/g, '<span style="color: #d97706;">$&</span>');
        
        block.innerHTML = code;
    }

    // Performance metric animations
    setupPerformanceAnimations() {
        const statValues = document.querySelectorAll('.stat-value');
        
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStatValue(entry.target);
                }
            });
        }, observerOptions);
        
        statValues.forEach(stat => {
            observer.observe(stat);
        });
    }

    animateStatValue(element) {
        const finalValue = element.textContent;
        const isPercentage = finalValue.includes('%');
        const isDecimal = finalValue.includes('.');
        const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        
        let currentValue = 0;
        const increment = numericValue / 30; // 30 frames for animation
        const duration = 2000; // 2 seconds
        const frameTime = duration / 30;
        
        const animate = () => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
            }
            
            let displayValue;
            if (isDecimal) {
                displayValue = currentValue.toFixed(2);
            } else {
                displayValue = Math.round(currentValue);
            }
            
            if (isPercentage) {
                element.textContent = displayValue + '%';
            } else if (finalValue.includes('+')) {
                element.textContent = displayValue + '+';
            } else {
                element.textContent = displayValue;
            }
            
            if (currentValue < numericValue) {
                setTimeout(animate, frameTime);
            } else {
                element.textContent = finalValue; // Ensure final value is exact
            }
        };
        
        animate();
    }

    // Mobile menu setup
    setupMobileMenu() {
        // Add mobile menu toggle if needed
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            this.createMobileMenu(navbar, navMenu);
        }
        
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                this.createMobileMenu(navbar, navMenu);
            } else {
                this.removeMobileMenu(navbar);
            }
        });
    }

    createMobileMenu(navbar, navMenu) {
        if (!navbar.querySelector('.mobile-menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-menu-toggle';
            toggle.innerHTML = '☰';
            toggle.style.cssText = `
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--primary-blue);
                cursor: pointer;
                display: block;
            `;
            
            toggle.addEventListener('click', () => {
                navMenu.classList.toggle('mobile-open');
            });
            
            navbar.querySelector('.nav-container').appendChild(toggle);
            
            // Style mobile menu
            navMenu.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                box-shadow: var(--shadow-lg);
                transform: translateY(-100%);
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease-in-out;
                padding: var(--spacing-lg);
                gap: var(--spacing-md);
            `;
        }
    }

    removeMobileMenu(navbar) {
        const toggle = navbar.querySelector('.mobile-menu-toggle');
        if (toggle) {
            toggle.remove();
        }
    }

    // Modal system for detailed content
    showModal(title, content) {
        // Remove existing modal
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            padding: var(--spacing-lg);
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        `;
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.cssText = `
            background: white;
            border-radius: 0.75rem;
            padding: var(--spacing-2xl);
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease-in-out;
            position: relative;
        `;
        
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.style.cssText = `
            position: absolute;
            top: var(--spacing-lg);
            right: var(--spacing-lg);
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: var(--gray-500);
            line-height: 1;
        `;
        
        closeButton.addEventListener('click', () => this.closeModal(modalOverlay));
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.closeModal(modalOverlay);
            }
        });
        
        modal.innerHTML = `<h2>${title}</h2>${content}`;
        modal.appendChild(closeButton);
        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);
        
        // Animate in
        setTimeout(() => {
            modalOverlay.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 10);
    }

    closeModal(modalOverlay) {
        modalOverlay.style.opacity = '0';
        const modal = modalOverlay.querySelector('.modal');
        modal.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            modalOverlay.remove();
        }, 300);
    }

    // CTA button interactions
    setupCTAButtons() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCTAClick(button);
            });
        });
    }

    handleCTAClick(button) {
        if (button.textContent.includes('Explore')) {
            document.querySelector('#technologies').scrollIntoView({ behavior: 'smooth' });
        } else if (button.textContent.includes('Documentation')) {
            this.showModal('Documentation', `
                <h3>AutoClean Vision Documentation</h3>
                <p>Comprehensive documentation and API reference coming soon.</p>
                <h4>Available Resources:</h4>
                <ul>
                    <li>Installation Guide</li>
                    <li>Quick Start Tutorial</li>
                    <li>API Reference</li>
                    <li>Integration Examples</li>
                    <li>Validation Studies</li>
                </ul>
                <p>For early access, please contact the research team.</p>
            `);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new AutoCleanVisionApp();
    
    // Add mobile menu styles
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                display: flex !important;
            }
            
            .nav-menu.mobile-open {
                transform: translateY(0) !important;
                opacity: 1 !important;
                pointer-events: auto !important;
            }
            
            .mobile-menu-toggle {
                display: block !important;
            }
        }
        
        @media (min-width: 769px) {
            .mobile-menu-toggle {
                display: none !important;
            }
            
            .nav-menu {
                position: static !important;
                transform: none !important;
                opacity: 1 !important;
                pointer-events: auto !important;
                background: none !important;
                box-shadow: none !important;
                flex-direction: row !important;
                padding: 0 !important;
            }
        }
    `;
    document.head.appendChild(mobileStyles);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll event handling is now debounced
}, 16)); // ~60fps