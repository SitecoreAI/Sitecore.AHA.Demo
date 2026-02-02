<#
.SYNOPSIS
    Fixes broken template references on American Heart Association "Homepage Cards"
    items that still reference the old AHA Cards Folder template ID.

.DESCRIPTION
    Content under /sitecore/content/industry-verticals/american-heart-association/Data/Homepage Cards
    was created when the AHA Cards Folder template had ID c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f.
    That ID was changed to 9a8b7c6d-5e4f-4a3b-8c2d-1e0f9a8b7c6d to avoid GUID collisions.
    These content items were never updated, so they have invalid template references
    and cannot be opened in Content Editor.

    This script updates __Template on the affected items to the current AHA Cards Folder
    template ID so they open and render correctly.

    Run in Sitecore PowerShell Console (or SPE) against the master database.

.EXAMPLE
    .\fix-aha-cards-template-reference.ps1
#>

$ErrorActionPreference = "Stop"

# Current AHA Cards Folder template ID (in repo and in Sitecore after serialization fix)
$ahaCardsFolderTemplateId = [Sitecore.Data.ID]::Parse("{9A8B7C6D-5E4F-4A3B-8C2D-1E0F9A8B7C6D}")

# Known broken item IDs (from Marketer MCP audit)
$brokenItemIds = @(
    "{70EA6D8F-F1D8-432B-B6AC-62B388E2E71C}",  # Homepage Cards folder
    "{9CC43AB2-49C8-44EC-B4CE-5C240EA94B66}"   # AHA Cards datasource (child or folder itself)
)

$database = [Sitecore.Data.Database]::GetDatabase("master")
if (-not $database) {
    Write-Error "Could not get master database."
    exit 1
}

$fixed = 0
$skipped = 0
$errors = 0

foreach ($idString in $brokenItemIds) {
    $id = [Sitecore.Data.ID]::Parse($idString)
    $item = $database.GetItem($id)
    if (-not $item) {
        Write-Warning "Item not found: $idString"
        $skipped++
        continue
    }
    $currentTemplateId = $item.TemplateID
    if ($currentTemplateId -eq $ahaCardsFolderTemplateId) {
        Write-Host "Already correct: $($item.Paths.Path) ($idString)"
        $skipped++
        continue
    }
    try {
        $item.Editing.BeginEdit()
        try {
            $item.ChangeTemplate($ahaCardsFolderTemplateId)
        } catch {
            # When template is broken, ChangeTemplate may fail; set __Template field directly
            $templateField = $item.Fields["__Template"]
            if ($templateField) {
                $templateField.Value = $ahaCardsFolderTemplateId.ToString()
            } else {
                throw "Could not get __Template field."
            }
        }
        $item.Editing.EndEdit()
        Write-Host "Fixed: $($item.Paths.Path) ($idString) -> AHA Cards Folder"
        $fixed++
    } catch {
        Write-Warning "Failed to fix $idString : $_"
        try { $item.Editing.CancelEdit() } catch {}
        $errors++
    }
}

# Also fix any descendants of Homepage Cards that don't already use AHA Cards Folder template
$homepageCardsId = [Sitecore.Data.ID]::Parse("{70EA6D8F-F1D8-432B-B6AC-62B388E2E71C}")
$folder = $database.GetItem($homepageCardsId)
if ($folder) {
    $children = $folder.GetChildren()
    foreach ($child in $children) {
        if ($child.TemplateID -ne $ahaCardsFolderTemplateId) {
            try {
                $child.Editing.BeginEdit()
                try {
                    $child.ChangeTemplate($ahaCardsFolderTemplateId)
                } catch {
                    $templateField = $child.Fields["__Template"]
                    if ($templateField) { $templateField.Value = $ahaCardsFolderTemplateId.ToString() }
                }
                $child.Editing.EndEdit()
                Write-Host "Fixed child: $($child.Paths.Path)"
                $fixed++
            } catch {
                Write-Warning "Failed to fix child $($child.Paths.Path): $_"
                try { $child.Editing.CancelEdit() } catch {}
                $errors++
            }
        }
    }
}

Write-Host ""
Write-Host "Done. Fixed: $fixed, Skipped: $skipped, Errors: $errors"
