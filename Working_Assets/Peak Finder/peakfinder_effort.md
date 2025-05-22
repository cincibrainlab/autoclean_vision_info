 

Peak detection has been TRICKY – for the continuous cleaning a little extra margin around the target cut points is more “human” around bad segments, but with peak it has to be more exact. My strategy thus far is to start with our python peak finder that already makes figures and then have the LLM agree or DISAGREE with the decision and give three other candidates to choose from. It seems like when it has to rank a bad choice with a good choice, it works better.

 

 

Here's the “harder” image:

 



here’s my prompt:

EEG Spectral Peak Detection – Multi-Candidate Visual Heuristic Prompt

You are analyzing a detrended EEG power spectrum. Your goal is to identify up to three candidate dominant spectral peaks, each defined as a frequency that:

1.      Is a local maximum—the blue curve must rise then fall (slope reversal).

2.      Visibly exceeds the background model—the blue line should be clearly above the orange dashed line at the peak.

3.      Falls within the 6–12 Hz band, unless an out-of-band peak is visually dominant.

4.      Can override the red vertical line—do not assume the algorithmically marked peak is correct if it doesn’t follow the above.

Step-by-step Instructions:

·         Identify all local maxima on the blue curve with visible slope reversal.

·         From these, retain only those that rise clearly above the orange background.

·         Rank up to three most visually prominent peaks based on height above background and distinctness.

·         If no peaks are convincing, return an empty list.

Here’s the output:

{

  "channel": "C3",

  "candidates": [

    {

      "frequency": 7.5,

      "confidence": "high",

      "reason": "Clear local maximum with visible slope reversal; blue line is substantially above the orange background model."

    },

    {

      "frequency": 8.5,

      "confidence": "moderate",

      "reason": "Local maximum with slight slope reversal; blue curve exceeds background modestly but distinctly."

    },

    {

      "frequency": 11.0,

      "confidence": "low",

      "reason": "Marked algorithmic peak; only slightly above background and less distinct compared to others."

    }

  ]

}

 

 
