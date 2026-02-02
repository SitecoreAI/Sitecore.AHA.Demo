# American Heart Association Site – Marketer MCP Audit Report

**Date:** 2026-02-02  
**Site:** american-heart-association (luxury-retail)  
**Scope:** Content, templates, component references

---

## 1. Site and pages

| Item | Value |
|------|--------|
| Site ID | `ea5d0efa-d923-4e63-a4c1-f8d3e0d9af27` |
| Root path | `f557e9f8-8408-4926-a2a7-aae8598bd185` (Home) |
| Pages found | 14 (Home, Health Topics, Healthy Living, About Us, Get Involved, 5 Health Topic pages, 3 Healthy Living pages) |

---

## 2. Page templates – all valid

All pages use templates that exist and resolve correctly in Sitecore:

| Template ID | Name | Used by | Status |
|-------------|------|---------|--------|
| `98e60957-0783-4a9a-85cc-77dad30e9711` | Page | Home | OK |
| `4d2b49e6-1130-444a-b22c-5c7e25d01b56` | LandingPage | Health Topics, About Us, Healthy Living, Get Involved | OK |
| `412bf445-b1a6-4aff-8054-0b21a1febc47` | ArticlePage | (insert option) | OK – path: `/sitecore/templates/Project/industry-verticals/Pages/ArticlePage` |
| `f6e44a9e-074a-4865-987e-0c2dc00b7af5` | HealthyLivingPage | Diabetes, Sleep Disorders, Cholesterol, Atrial Fibrillation, Heart Attack, Healthy Lifestyle, Healthy Eating, Fitness | OK |
| `c14b6289-8ac2-439c-9e5b-40de9f820c3f` | Redirect | (insert option) | OK |

**Note:** HealthyLivingPage has product-style fields (SKU, Price, Images 1–5, etc.). Health topic pages (e.g. Diabetes) use this template; confirm whether that reuse is intentional.

---

## 3. Template paths – verified

| Path | Exists |
|------|--------|
| `/sitecore/templates/Project/industry-verticals/Pages/LandingPage` | Yes |
| `/sitecore/templates/Project/industry-verticals/Pages/ArticlePage` | Yes |
| `/sitecore/templates/Project/industry-verticals/Components/Page Content/AHA Cards/AHA Cards Folder` | Yes (ID: `9a8b7c6d-5e4f-4a3b-8c2d-1e0f9a8b7c6d`) |
| `/sitecore/templates/Project/industry-verticals/Components/Page Content/In This Section` | Yes (folder) |

---

## 4. Broken references (corruption)

### 4.1 AHA Cards datasource – broken template

- **Item ID:** `9cc43ab2-49c8-44ec-b4ce-5c240ea94b66`
- **Usage:** Datasource for “AHA Cards” component on **Home** (`/`).
- **Error:**  
  `The '{00000000-0000-0000-0000-000000000000}' template doesn't exist or you don't have access rights to it. Cannot resolve a template for the '9cc43ab2-49c8-44ec-b4ce-5c240ea94b66' item.`
- **Cause:** The item’s **template** field almost certainly still points at the **old** AHA Cards Folder template ID (`c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f`), which was changed in serialization to avoid GUID collisions. In Sitecore the template now has ID **`9a8b7c6d-5e4f-4a3b-8c2d-1e0f9a8b7c6d`** (AHA Cards Folder). The datasource was never updated, so its template reference is invalid.

### 4.2 “Homepage Cards” folder – broken template

- **Item ID:** `70ea6d8f-f1d8-432b-b6ac-62b388e2e71c`
- **Path:** `/sitecore/content/industry-verticals/american-heart-association/Data/Homepage Cards`
- **Error:** Same template resolution failure when loading by path.
- **Cause:** Same as above – folder (and possibly children) still reference the old AHA Cards Folder template ID.

---

## 5. Components on Home – references

| Component | Rendering ID | Datasource ID | Datasource status |
|-----------|--------------|---------------|-------------------|
| AHA Hero Banner | `b6d0e1f2-a3b4-4c5d-7e8f-90a1b2c3d4e5` | `f278b535-f84b-45c4-a779-301148593232` | OK (template: AHA Hero Banner) |
| **AHA Cards** | `f8a9b0c1-d2e3-4f4a-5b6c-7d8e9f0a1b2c` | **`9cc43ab2-49c8-44ec-b4ce-5c240ea94b66`** | **Broken template** |
| AHA Changing the Future | `2c3d4e5f-6a7b-4c8d-9e0f-1a2b3c4d5e6f` | `be2ff032-f1be-4335-90ff-517761ba72ae` | OK |
| AHA Promo | `4d5e6f7a-8b9c-4e0f-1a2b-3c4d5e6f7a8b` | `1e408236-dd62-468c-a35a-d43461296975` | OK |

Rendering paths and template references for these components are correct; only the AHA Cards **datasource item** has a bad template.

---

## 6. Required fix (PowerShell – Content Editor cannot open items)

You **cannot** fix this by deploying the template with the ID Homepage Cards expects. That ID (`c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f`) was changed on purpose to avoid a GUID collision (it is used by another item in Sitecore). Deploying a template with that ID would overwrite that item and break another site.

Because the items have a broken template reference, **Content Editor cannot open them**. Use the **PowerShell script** instead:

1. **Open Content Editor** and go to:
   - `/sitecore/content/industry-verticals/american-heart-association/Data/Homepage Cards`
2. **Fix the folder** “Homepage Cards” (`70ea6d8f-f1d8-432b-b6ac-62b388e2e71c`):
   - If the item does not open (template missing), use **Assign template** or **Change template** and set template to **AHA Cards Folder** (path:  
     `/sitecore/templates/Project/industry-verticals/Components/Page Content/AHA Cards/AHA Cards Folder`).
3. **Fix the AHA Cards datasource** (`9cc43ab2-49c8-44ec-b4ce-5c240ea94b66`):
   - It should be under “Homepage Cards” (e.g. a child or the folder itself used as datasource).
   - Set its template to **AHA Cards Folder** (same path as above).
4. **Check all siblings/children** under `Data/Homepage Cards` and any other items that use “AHA Cards Folder” as template; ensure every such item uses the **current** template:
   - **AHA Cards Folder**  
   - ID: `9a8b7c6d-5e4f-4a3b-8c2d-1e0f9a8b7c6d`

After the script runs, the items should open in Content Editor and the AHA Cards block on the Home page should render correctly.

---

## 7. Summary

- **Page templates:** All correct and existing.
- **Template paths:** All checked paths exist (LandingPage, ArticlePage, AHA Cards Folder, In This Section).
- **Corruption:** AHA Cards datasource and “Homepage Cards” folder (and possibly related items) still reference the old AHA Cards Folder template ID; run `authoring/spe-scripts/fix-aha-cards-template-reference.ps1` in Sitecore PowerShell Console (Content Editor cannot open the items).
