# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AutoClean Vision is a vision-enabled EEG artifact detection suite that uses computer vision models to automatically detect and classify artifacts in EEG recordings. The system converts multi-channel EEG signals into visual representations (spectrograms, topographic maps, signal plots) and processes them with AI agents trained to recognize visual signatures of common artifacts.

## Architecture

This project is structured around multiple vision-based analysis modules:

### Core Components

- **ICA Vision**: Independent Component Analysis with visual classification of brain vs. artifact components (eye, muscle, heart, line noise, channel noise, other artifacts)
- **Peak Finder**: Spectral peak detection using visual analysis of detrended power spectra with candidate ranking
- **Continuous Rejection**: Real-time artifact detection in continuous EEG data
- **Epoch Rejection**: Artifact detection in epoched EEG data  
- **Channel Rejection**: Bad channel identification and marking

### Key Features

- Modular AI agents for specialized artifact types
- Human-in-the-loop interface for expert review and correction
- Prompt-guided workflows with natural language priorities
- Visual outputs with heatmaps showing artifact locations
- Active learning capabilities for model improvement

## Vision Classification System

### ICA Component Classification
Components are classified into categories:
- `brain`: Dipolar topography, 1/f spectrum, physiological activity
- `eye`: Frontal activation (vertical/horizontal eye movements)
- `muscle`: High-frequency spectral power, edge-focused topography
- `heart`: QRS-like time series, broad electrical field gradient
- `line_noise`: Sharp 50/60Hz spectral peaks
- `channel_noise`: Single electrode focal activity
- `other_artifact`: Mixed or unclear patterns

Classification uses confidence scoring (0-1) with detailed reasoning based on topography, power spectrum, and time series analysis.

### Peak Detection Strategy
Multi-candidate visual heuristic approach:
1. Identify local maxima with slope reversal on detrended spectra
2. Filter peaks that exceed background model
3. Rank up to 3 candidates by visual prominence
4. Override algorithmic peaks when visual analysis disagrees

## Working Assets Structure

- `ICA Vision/`: Contains prompts, test results, and classification examples
- `Peak Finder/`: Peak detection methodology and examples
- `Channel Rejection/`, `Continuous Rejection/`, `Epoch Rejection/`: Module-specific assets
- `ConfigWizard/`: Setup and configuration interface screenshots
- Literature and rationale documentation

## Development Notes

- Vision models process EEG data converted to visual formats
- Classification confidence should be ≥0.9 for reliable automated decisions
- Human review interface allows expert validation and model training
- Multi-step analysis pipelines combine different artifact detection approaches