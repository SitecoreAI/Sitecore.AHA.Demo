# American Heart Association Bulk Content Generator

## Overview

`American-Heart-Association-bulk-content-generator.json` is a bulk content generator configuration for the American Heart Association. It is based on the UChicago Medicine bulk content generator pattern and is adapted for AHA’s heart health mission and audiences.

## What’s included

- **Channels**: Landing Page, Blog, Email (with AHA-focused dos/don’ts and context).
- **Audiences**: Donor, Volunteer, Health Information Seeker (replacing the original patient/caregiver segments).
- **Branding**: No UChicago Medicine references; copy and tone reference the American Heart Association. Accent color is AHA red (`#c8102e`).
- **Image guidance**: All image prompts should describe AHA-themed imagery with **people wearing red or a red clothing accent** (e.g., red scarf, red shirt, red hat). The `HeroImage` field in the email schema uses this guidance.

## AHA images (red clothing)

Pre-generated images for the bulk content flow are in `public/aha-bulk-content/`:

| File | Use |
|------|-----|
| `aha-bulk-donor.png` | Donor audience – person in red scarf/accent, donor/heart health context |
| `aha-bulk-volunteer.png` | Volunteer audience – person in red shirt/vest, volunteer/event context |
| `aha-bulk-health-seeker.png` | Health information seeker – person in red accent, reading/trustworthy setting |
| `aha-bulk-hero.png` | Hero/group – diverse people with red clothing at a heart walk/community event |

Each image shows at least one person in red or with a clear red clothing highlight, per your requirement.

## Image API placeholder

The JSON templates use a placeholder image base URL: `your-aha-image-api.example.com`. Replace this with:

- Your own image API that accepts a `query` or `prompt` (e.g. `?query={{HeroImage}}` or `?prompt={{HeroTitle}}`), and ensure generated prompts follow the red-clothing guidance above, or  
- Static URLs to the images in `public/aha-bulk-content/` (or your CDN) when you want to use the pre-generated AHA images.

## Usage

1. Import `American-Heart-Association-bulk-content-generator.json` into your bulk content generator tool (e.g. Sitecore).
2. Replace `your-aha-image-api.example.com` in the JSON with your real image API or asset base URL if needed.
3. Run the generator; it will create variants by channel (Landing Page, Blog, Email) and audience (Donor, Volunteer, Health Information Seeker).
4. Use the images in `public/aha-bulk-content/` where you need fixed AHA assets with red clothing.

## Related

- `personalize-uid-condition.js` – Sitecore Personalize custom condition for UID query parameter matching.
