descriptions = {
    "clickPower": "Zvětší počet kliků za sekundu.",
    "criticalChance": "Zvětší šanci na kritický zásah.",
    "criticalPower": "Zvětší počet kliků u kritického zásahu.",
    "prestige": "Restartuje postup, ale zvyší skóre za klik a zvířátka."
}

function zobraz(upgrade) {
    document.getElementById("descriptionText").innerHTML = dexcriptions[upgrade];
}