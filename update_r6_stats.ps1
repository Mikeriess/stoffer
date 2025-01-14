# Definer URL'en for R6 Tracker leaderboard
$url = "https://r6.tracker.network/r6siege/leaderboards?platformFamily=pc&season=36&gamemode=pvp_ranked&board=RankPoints&page=1"

try {
    # Hent websiden
    Write-Host "Henter data fra R6 Tracker..."
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing

    # Find script.js filen
    $scriptPath = "script.js"
    $scriptContent = Get-Content $scriptPath -Raw

    # Udtræk spillerdata fra websiden
    $players = $response.Content -split "`n" | 
        Select-String -Pattern '<tr class="trn-table__row".*?>(.*?)</tr>' -AllMatches | 
        ForEach-Object { $_.Matches.Groups[1].Value } |
        Select-Object -First 10

    # Opret ny spillerliste
    $newPlayersList = "const topPlayers = [`n"
    $rank = 1

    foreach ($player in $players) {
        if ($player -match 'href="/profile/pc/(.*?)".*?>(.*?)</a>.*?>([\d,]+)</td>') {
            $name = $matches[2]
            $mmr = $matches[3] -replace ',', ''
            
            # Bestem region (dette er en simpel antagelse baseret på team tags)
            $region = if ($name -match "LATAM") { "LATAM" }
                     elseif ($name -match "NA") { "NA" }
                     else { "EU" }

            $newPlayersList += "    { rank: $rank, name: `"$name`", mmr: $mmr, region: `"$region`" },`n"
            $rank++
        }
    }

    $newPlayersList += "];"

    # Opdater script.js filen
    $updatedContent = $scriptContent -replace "const topPlayers = \[[\s\S]*?\];", $newPlayersList
    $updatedContent | Set-Content $scriptPath -Force

    Write-Host "Toplisten er blevet opdateret!"
    Write-Host "Åbn index.html i din browser for at se ændringerne."

} catch {
    Write-Host "Der opstod en fejl under opdateringen:"
    Write-Host $_.Exception.Message
} 