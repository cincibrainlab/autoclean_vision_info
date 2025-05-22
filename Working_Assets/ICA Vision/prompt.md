"""Analyze this EEG ICA component image and classify it.

The image displays an Independent Component (IC) from an EEG recording. It includes:
1. A scalp topography map showing the spatial distribution of the component's activity.
2. A Power Spectral Density (PSD) plot showing the component's power at different frequencies.
3. Time series plots of the component's activity (typically a full view and a shorter 10-second segment).

Based on a comprehensive analysis of ALL these features, classify the component into ONE of the following categories:

- "brain":
    - *Topography:* Often looks dipolar (distinct positive and negative poles). A good dipole fit is suggested by a clean, bilobed pattern, and the source appears to be located within the brain. Scalp map is not excessively concentrated to a single electrode.
    - *Spectrum:* Shows a 1/f-like decrease in power with increasing frequency (i.e., power diminishes at higher frequencies). Often has distinct peaks in physiological bands (e.g., alpha around 8-12 Hz, but also other peaks between 5-30 Hz are common).
    - *Time Series:* Can show Event-Related Potentials (ERPs) if the data is epoched (activity consistently related to experimental events). Generally smoother compared to stereotyped, non-physiological artifact patterns.

- "eye": (Eye movements or blinks)
    - *Topography:* Suggests electrical sources near the eyes.
        - *Vertical eye movements/blinks:* Strong activity at frontal electrodes, often appearing unipolar (all positive or all negative deflection) due to the typical EEG recording montage.
        - *Horizontal eye movements:* Often a dipolar pattern with opposite polarities on the left and right frontal sides, suggesting a source between the eyes.
    - *Spectrum:* Most power is concentrated at low frequencies (typically < 5 Hz).
    - *Time Series:*
        - *Vertical (blinks/looking up/down):* Shows clear, relatively frequent, large-amplitude spikes (blinks) or slow rolling waves/drifts.
        - *Horizontal (saccades):* Often shows step-function-like changes (fast transitions to different stable levels) corresponding to saccadic eye movements.

- "muscle": (Muscle activity, EMG)
    - *Topography:* Can sometimes appear dipolar but is usually very focal/concentrated, indicating a shallow source outside the skull (e.g., scalp, temporal, or neck muscles). The pattern is often less organized than brain dipoles.
    - *Spectrum:* Dominated by power at higher frequencies (typically > 20 Hz). This power is often broadband, meaning it's spread across a wide range of high frequencies, rather than a sharp peak. Little low-frequency power relative to high-frequency power.
    - *Time Series:* Often shows sustained or bursting high-frequency, spiky, non-stationary activity.

- "heart": (Heartbeat artifact, ECG)
    - *Topography:* Often a near-linear gradient across the scalp or a very broad, diffuse pattern, suggesting a distant and powerful electrical source like the heart. Can sometimes have a left-to-right or inferior-to-superior orientation.
    - *Spectrum:* May not show specific defining peaks related to the heartbeat itself; the primary evidence is in the time series. Spectrum might be contaminated by other activity.
    - *Time Series:* Shows clear, regular, repetitive QRS-complex-like waveforms (sharp peak followed by slower wave). These complexes occur at a rate of approximately 1 Hz (around 60 beats per minute, but can vary).

- "line_noise": (Electrical grid interference)
    - *Topography:* Can vary and is not the primary indicator. The effect might be widespread or more localized depending on the noise source.
    - *Spectrum:* Characterized by a VERY SHARP and prominent peak at either 50 Hz or 60 Hz (depending on the local power system frequency). This peak should be significantly more powerful than surrounding frequencies. (Note: This is different from a notch filter *dip* or *absence of power* at these frequencies, which is a common preprocessing step).
    - *Time Series:* Shows continuous or intermittent sinusoidal oscillations at 50 Hz or 60 Hz.

- "channel_noise": (Noise specific to one or a few EEG channels)
    - *Topography:* Extremely focal, with almost all the component's energy concentrated on a single electrode or a very small, isolated group of adjacent electrodes.
    - *Spectrum:* Typically shows a 1/f-like spectrum (power decreasing with frequency), which can sometimes resemble brain activity. However, the extreme focality of the topography is the key differentiator. This spectral pattern helps distinguish it from muscle components, which have more high-frequency power.
    - *Time Series:* May show large, erratic, or persistent high-amplitude artifacts, sudden pops, or periods of flat or noisy signal unique to that component.

- "other_artifact": (Artifacts not fitting other categories, or unclear/mixed components)
    - *Topography:* Often non-dipolar, splotchy, messy, or not clearly interpretable according to the patterns above.
    - *Spectrum:* May lack clear features, or show a mixture of patterns that don't fit a single category well. Could have weak or unusual peaks.
    - *General:* Use for components that do not clearly fit any of the above categories. Components with very high IC numbers (e.g., IC 150 of 200, indicating low variance explained) are often in this category. Use this also if features are highly contradictory (e.g., some brain-like spectral features but a very non-brain-like, noisy topography), making a single primary classification difficult.

Return your classification in this exact format:
("label", confidence_score, "detailed_reasoning")

Where:
- "label" is one of the exact category strings listed above (e.g., "brain", "eye", "muscle", etc.).
- confidence_score is a number between 0 and 1 (e.g., 0.95), representing your confidence in the assigned label.
- "detailed_reasoning" is a concise explanation (1-2 sentences) justifying your classification based on specific visual features observed in the topography, power spectrum, AND time series, referencing the characteristics described for each category.

Example: ("eye", 0.95, "Strong bilateral frontal topography. Spectrum power concentrated below 5 Hz. Time series shows large, recurrent sharp deflections characteristic of eye blinks.")
Example: ("brain", 0.88, "Clear dipolar topography over parietal regions. Spectrum shows a prominent peak at 10 Hz and a 1/f decrease. Time series is relatively smooth.")
Example: ("muscle", 0.92, "Focal topography over temporal area, shallow appearance. Spectrum is dominated by broadband high-frequency activity (>20Hz). Time series shows sustained spiky, high-frequency bursts.")
Example: ("line_noise", 0.98, "Spectrum exhibits an extremely sharp and dominant peak at 50 Hz, far exceeding other frequencies. Topography is diffuse but the spectral peak is unequivocal.")
Example: ("channel_noise", 0.90, "Topography is highly focal, concentrated on a single frontal electrode. Spectrum shows a 1/f trend. Time series exhibits intermittent large spikes.")
"""
