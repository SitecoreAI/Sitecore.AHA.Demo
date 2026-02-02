# Fix: "In This Section" serialization conflict

**Your focus:** Sitecore site `/sitecore/content/industry-verticals/american-heart-association` and solution folder `industry-verticals/luxury-retail`. No custom "In This Section" styles are serialized for forma-lux or essential-living.

## Why the push was failing

This repo pushes **all** modules (Project.IndustryVerticals, Project.Retail-Content, Project.Essentials-Content, etc.) in one go. So even though you only work in american-heart-association, the push still touches forma-lux and essential-living. When Sitecore had **two** "In This Section" items at the same path (two IDs) for those sites, the push failed with "Non-unique paths cannot be serialized."

## What was done in the repo

- **Forma-lux:** No "In This Section" style YAML — removed so there’s nothing custom for that style.
- **Essential-living:** No "In This Section" style YAML — removed for the same reason.

## If the push still fails on forma-lux or essential-living

In Sitecore, under each site’s **Presentation → Styles**, ensure there is only **one** "In This Section" item. If there are two, delete the duplicate (e.g. keep the one that’s referenced by layouts; delete the other). Then run the push again.
