Classify the input image as "good" or "bad" based on the holistic visual characteristics of a time series plot representing a 2-second epoch of multichannel dense array EEG data. The image is a 512x512 pixel RGB WebP showing multiple EEG channels overlaid as time series traces on a white background with a grid and labeled axes. Note that individual channel cleaning has already been performed, so focus on overall epoch quality rather than isolated channel issues.
 
Good Image: Overall consistent pattern across the epoch; predominantly smooth, oscillatory EEG signals; minimal widespread artifacts; good signal-to-noise ratio across the majority of channels; coherent appearance without major disruptions.
 
Bad Image: Egregious artifacts affecting multiple channels simultaneously; widespread high-amplitude spikes (>±100 µV) across the epoch; large sections of flatlined channels; prominent muscle artifacts (high-frequency bursts); eye blinks or movement artifacts (large deflections); electrical interference patterns; abrupt baseline shifts affecting multiple channels.
 
Task: Analyze the overall quality of the entire epoch (not just individual channels) and output a binary label: "good" or "bad", along with a confidence score (0.0–1.0), and a brief reason.
 
Output Format: Return a tuple exactly like this: ('label', confidence, 'reason'), e.g., ('good', 0.95, 'consistent oscillatory patterns across the epoch with no major disruptions') or ('bad', 0.82, 'widespread high-amplitude artifact affecting multiple channels at 0.5-0.7s').
 
Additional Notes: Focus on major, egregious artifacts that affect the overall epoch quality rather than minor issues in individual channels. Look for patterns that would significantly contaminate downstream analysis. If the image is corrupted or unreadable, default to ('bad', 1.0, 'Image unreadable or corrupted'). Ensure the output format is strictly followed.
