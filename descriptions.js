descriptions = {
    "clickPower": "Zvětší počet kliků za klik.",
    "criticalChance": "Zvětší šanci na kritický zásah.",
    "criticalPower": "Zvětší počet kliků u kritického zásahu.",
    "prestige": "Restartuje postup, ale zvyší skóre za klik a zvířátka."
}

function show(upgrade) {
    document.getElementById("descriptionText").style.opacity = "1"
    document.getElementById("descriptionText").innerHTML = descriptions[upgrade]
}

function hide() {
    document.getElementById("descriptionText").style.opacity = "0"
}