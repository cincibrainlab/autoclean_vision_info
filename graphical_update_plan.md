# Graphical Update Implementation Plan

## Overview
Add high-quality images from Working_Assets directory to enhance the academic website with visual evidence and examples for each module, following the original index.html as a reference.

## Available Images Analysis

### 1. ICA Vision Module Images
**Location**: `Working_Assets/ICA Vision/`
- `CleanShot 2025-05-22 at 09.06.16@2x.png` - Main ICA interface screenshot
- `CleanShot 2025-05-22 at 09.42.08@2x.png` - Component classification example
- `CleanShot 2025-05-22 at 09.42.24@2x.png` - Classification results view
- `brain_component.webp` - Brain component example
- `heart_rate.webp` - Heart artifact component example

### 2. Peak Detection Module Images
**Location**: `Working_Assets/Peak Finder/`
- `CleanShot 2025-04-30 at 16.38.26@2x.png` - Peak detection interface

### 3. Continuous Rejection Module Images
**Location**: `Working_Assets/Continuous Rejection/`
- `CleanShot 2025-05-22 at 09.13.32@2x.png` - Continuous processing interface

### 4. Epoch Rejection Module Images
**Location**: `Working_Assets/Epoch Rejection/`
- `CleanShot 2025-05-22 at 09.15.03@2x.png` - Epoch rejection interface

### 5. Channel Rejection Module Images
**Location**: `Working_Assets/Channel Rejection/`
- `CleanShot 2025-05-22 at 09.16.27@2x.png` - Channel rejection interface

### 6. Configuration/Setup Images
**Location**: `Working_Assets/ConfigWizard/`
- `Wiz -1.PNG` - Configuration wizard step 1
- `Wiz -2.PNG` - Configuration wizard step 2
- `Wiz -3.PNG` - Configuration wizard step 3

## Implementation Strategy

### Phase 1: Copy Assets to Website Directory
Move all Working_Assets images to `assets/images/` with organized subdirectories:
- `assets/images/ica/` - ICA Vision screenshots and examples
- `assets/images/peaks/` - Peak detection visuals
- `assets/images/continuous/` - Continuous rejection screenshots
- `assets/images/epochs/` - Epoch rejection visuals
- `assets/images/channels/` - Channel rejection screenshots
- `assets/images/config/` - Configuration wizard screenshots

### Phase 2: Strategic Image Placement

#### 2.1 ICA Vision Module (Section 2.5)
**Target Location**: After "Multi-Modal Feature Extraction" (around line 215)
- **Primary Image**: `CleanShot 2025-05-22 at 09.06.16@2x.png`
  - Replace the existing placeholder: `ica_component_analysis.png`
  - Shows complete ICA interface with topographic maps, spectra, and time series
- **Component Examples**: 
  - `brain_component.webp` - Example of brain component classification
  - `heart_rate.webp` - Example of cardiac artifact classification
- **Results View**: `CleanShot 2025-05-22 at 09.42.24@2x.png`
  - Show classification results interface

#### 2.2 Peak Detection Module (Section 2.4)
**Target Location**: After "Multi-Candidate Analysis Example" (around line 186)
- **Primary Image**: `CleanShot 2025-04-30 at 16.38.26@2x.png`
  - Replace existing: `peak_detection.png`
  - Shows actual peak detection interface with detrended spectrum

#### 2.3 Continuous Rejection Module (Section 2.6.1)
**Target Location**: After "Real-Time Processing Architecture" (around line 367)
- **Primary Image**: `CleanShot 2025-05-22 at 09.13.32@2x.png`
  - New figure showing real-time continuous rejection interface
  - Demonstrates sliding window analysis and artifact detection

#### 2.4 Epoch Rejection Module (Section 2.6.2)
**Target Location**: After "Trial-Based Analysis Framework" (around line 557)
- **Primary Image**: `CleanShot 2025-05-22 at 09.15.03@2x.png`
  - New figure showing epoch rejection interface
  - Demonstrates trial-based artifact identification

#### 2.5 Channel Rejection Module (Section 2.6.3)
**Target Location**: After "Multi-Criteria Bad Channel Identification" (around line 790)
- **Primary Image**: `CleanShot 2025-05-22 at 09.16.27@2x.png`
  - New figure showing channel rejection interface
  - Demonstrates bad channel detection and spatial analysis

#### 2.6 Implementation Section (Section 5)
**Target Location**: After "MNE-Python Integration Framework" (around line 507)
- **Configuration Wizard**: All three wizard screenshots
  - `Wiz -1.PNG` - Initial setup configuration
  - `Wiz -2.PNG` - Population-specific parameters
  - `Wiz -3.PNG` - Advanced settings and validation

### Phase 3: Figure Captions and Academic Context

#### 3.1 Academic Figure Standards
Each image will include:
- **Figure Number**: Sequential numbering (Figure 3, 4, 5, etc.)
- **Descriptive Title**: Clear, academic-style caption
- **Detailed Description**: Technical explanation of what's shown
- **Methodology Context**: How the image relates to the described methods
- **Key Insights**: What the image demonstrates or proves

#### 3.2 Example Caption Format
```
**Figure 4:** ICA Vision component classification interface showing multi-modal analysis. 
(A) Topographic map displaying spatial distribution of ICA Component 15, 
(B) Power spectral density with background modeling highlighting characteristic 
muscle artifact frequency profile, (C) Time series epochs showing sustained 
high-frequency activity typical of EMG contamination. The system correctly 
classified this component as "muscle artifact" with 97% confidence based on 
the combination of edge-focused topography, high-frequency spectral dominance, 
and spiky temporal patterns.
```

### Phase 4: Integration with Existing Content

#### 4.1 Replace Placeholder Images
- Update existing `src` attributes to point to new high-quality images
- Maintain responsive design and accessibility

#### 4.2 Add New Figure Sections
- Insert new `<div class="academic-figure">` sections for each module
- Include detailed captions and technical explanations
- Ensure proper spacing and academic formatting

#### 4.3 Cross-Reference Integration
- Update text to reference specific figures
- Add "see Figure X" references in methodology descriptions
- Ensure figures support and enhance the written content

### Phase 5: CSS and Styling Updates

#### 5.1 Figure Gallery Styles
```css
.module-figure-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: var(--space-xl);
    margin: var(--space-xl) 0;
}

.figure-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-lg);
    margin: var(--space-xl) 0;
}

.config-wizard-steps {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
}
```

#### 5.2 Image Optimization
- Ensure all images are properly sized for web
- Add loading="lazy" for performance
- Include appropriate alt text for accessibility
- Optimize file formats (keep .webp, convert .PNG to appropriate formats)

### Phase 6: Content Enhancement Strategy

#### 6.1 Before/After Examples
Use images to create compelling before/after comparisons:
- Traditional vs. AutoClean Vision interfaces
- Raw data vs. cleaned data visualizations
- Manual process vs. automated process screenshots

#### 6.2 Step-by-Step Workflows
Show actual user workflows through sequential screenshots:
- Configuration wizard progression
- Analysis pipeline execution
- Results interpretation and export

#### 6.3 Real Data Examples
Replace generic examples with actual interface screenshots:
- Real EEG component classifications
- Actual peak detection results
- Live artifact rejection in action

## Implementation Checklist

### Pre-Implementation
- [ ] Copy all images to assets/images/ with organized structure
- [ ] Verify image quality and resolution
- [ ] Plan figure numbering sequence
- [ ] Create detailed caption outlines

### Implementation Steps
- [ ] Replace existing placeholder images (ICA, Peak Detection)
- [ ] Add new figures for Continuous Rejection module
- [ ] Add new figures for Epoch Rejection module  
- [ ] Add new figures for Channel Rejection module
- [ ] Add Configuration Wizard sequence in Implementation section
- [ ] Update all figure captions with academic descriptions
- [ ] Add cross-references in text to figures
- [ ] Update CSS for new figure layouts

### Post-Implementation
- [ ] Test image loading and responsiveness
- [ ] Verify accessibility (alt text, keyboard navigation)
- [ ] Check figure numbering consistency
- [ ] Validate academic caption quality
- [ ] Test on different devices and browsers

## Expected Outcomes

### Visual Impact
- Transform abstract technical descriptions into concrete visual demonstrations
- Provide researchers with clear understanding of system capabilities
- Show actual interface quality and usability

### Academic Credibility
- Replace placeholder graphics with real system screenshots
- Demonstrate working implementation rather than theoretical concepts
- Provide visual evidence for claimed functionality

### User Experience
- Help users understand practical implementation steps
- Show realistic expectations for interface and workflows
- Guide configuration and setup processes

### Research Communication
- Enable easier reference and citation of specific system features
- Support grant applications and research presentations
- Facilitate peer review and academic evaluation

This comprehensive graphical update will transform the academic website from a text-heavy technical document into a visually-rich, evidence-based demonstration of AutoClean Vision's capabilities and implementation.