# Items with conflicting GUIDs – delete these in Sitecore by hand

These are content/style items in Sitecore that use the same IDs as the AHA Cards templates in the repo. Serialization was trying to rename/move them into the AHA Cards template folder, causing "Non-unique paths" and mapping errors. Delete the items below in Content Editor (or PowerShell) so the push can succeed.

**Current template IDs in repo (do NOT delete these):**
- AHA Cards: 8b7c6d5e-4f3a-4b2c-9d1e-0f8a7b6c5d4e
- AHA Cards Folder: 9a8b7c6d-5e4f-4a3b-8c2d-1e0f9a8b7c6d
- AHA Cards Folder/__Standard Values: 7c6d5e4f-3a2b-4c1d-0e9f-8a7b6c5d4e3f

---

## 1. Forma-lux – Hide Title (same ID as old AHA Cards template)

- **Path:** /sitecore/content/industry-verticals/forma-lux/Presentation/Styles/In This Section/Hide Title
- **Conflicting ID:** b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e
- **Action:** Delete this Hide Title item.

---

## 2. Forma-lux – child under In This Section (same ID as old AHA Cards Folder/__Standard Values)

- **Path:** Under /sitecore/content/industry-verticals/forma-lux/Presentation/Styles/In This Section/ — the child whose ID is d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a (may show as "Hide Title" or similar).
- **Conflicting ID:** d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a
- **Action:** Find the item with this ID under forma-lux In This Section and delete it.

---

## 3. Essential-living – In This Section style (same ID as old AHA Cards Folder template)

- **Path:** /sitecore/content/industry-verticals/essential-living/Presentation/Styles/In This Section
- **Conflicting ID:** c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f
- **Action:** Delete the In This Section item that has this ID. If there are two "In This Section" items there, delete the one with ID c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f.

---

## How to find by ID in Content Editor

1. Use Search (Search tab or Ctrl+Shift+F) and search for the GUID (e.g. b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e).
2. Or navigate to the paths above; the duplicate is the one whose ID (in item properties) matches the Conflicting ID.
3. Delete only the duplicate style item at that path/ID. Do NOT delete the template items under /sitecore/templates/Project/industry-verticals/Components/Page Content/AHA Cards/.

After deleting these, run the serialization push again.
