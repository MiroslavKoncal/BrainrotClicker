function darkm() {                                // Přepíná třídu "dark-mode" na <body>
    document.body.classList.toggle('dark-mode');
}

document.getElementById('temnomod')               // Najde tlačítko s ID "temnomod"
    .addEventListener('click', darkm);            // a po kliknutí spustí funkci darkm()

function zobrazDatum() {                          // Zobrazí aktuální datum ve formátu cs-CZ
    let dnes = new Date();                        // Získá aktuální datum
    let formatovaneDatum = dnes.toLocaleDateString('cs-CZ');  // Naformátuje ho
    document.getElementById('datum')              // Najde <span id="datum">
        .textContent = formatovaneDatum;          // a vloží formátované datum
}

zobrazDatum();                                     // Zavolá funkci hned po načtení
