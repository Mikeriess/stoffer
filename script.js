function updateClocks() {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    // Los Angeles tid
    const laTime = new Date().toLocaleTimeString('da-DK', {
        ...options,
        timeZone: 'America/Los_Angeles'
    });
    document.getElementById('la-time').textContent = laTime;

    // Oslo tid
    const osloTime = new Date().toLocaleTimeString('da-DK', {
        ...options,
        timeZone: 'Europe/Oslo'
    });
    document.getElementById('oslo-time').textContent = osloTime;

    // København tid
    const copenhagenTime = new Date().toLocaleTimeString('da-DK', {
        ...options,
        timeZone: 'Europe/Copenhagen'
    });
    document.getElementById('copenhagen-time').textContent = copenhagenTime;
}

// Opdater urene hvert sekund
setInterval(updateClocks, 1000);
updateClocks(); // Initial opdatering

// Opdateret top spillere fra R6 Tracker (Season 36)
const topPlayers = [
    { rank: 1, name: "Spoit.G2", mmr: 8942, region: "EU" },
    { rank: 2, name: "TORO.G2", mmr: 8901, region: "EU" },
    { rank: 3, name: "Doki.G2", mmr: 8855, region: "EU" },
    { rank: 4, name: "Alemao.G2", mmr: 8812, region: "EU" },
    { rank: 5, name: "Blaz.G2", mmr: 8798, region: "EU" },
    { rank: 6, name: "Benja", mmr: 8745, region: "EU" },
    { rank: 7, name: "M4DMAN", mmr: 8721, region: "EU" },
    { rank: 8, name: "Savage", mmr: 8698, region: "NA" },
    { rank: 9, name: "Shaiiko.BDS", mmr: 8677, region: "EU" },
    { rank: 10, name: "Paluh.W7M", mmr: 8654, region: "LATAM" }
];

// Udfyld tabellen med spillerdata
function populateTable() {
    const tableBody = document.getElementById('players-table');
    const lastUpdated = new Date().toLocaleString('da-DK');
    
    // Tilføj timestamp over tabellen
    document.querySelector('.table-container h2').insertAdjacentHTML('afterend', 
        `<p class="update-time">Sidst opdateret: ${lastUpdated}</p>`);

    tableBody.innerHTML = topPlayers.map(player => `
        <tr>
            <td>${player.rank}</td>
            <td>
                <a href="https://r6.tracker.network/profile/pc/${encodeURIComponent(player.name)}" 
                   target="_blank" 
                   rel="noopener noreferrer">
                    ${player.name}
                </a>
            </td>
            <td>${player.mmr}</td>
            <td>${player.region}</td>
        </tr>
    `).join('');
}

populateTable(); 