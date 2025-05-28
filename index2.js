let score = localStorage.getItem("score") ? JSON.parse(localStorage.getItem("score")) : 0;
// najde elementy na stránce pro zobrazení skóre a cps, pokud neexistují vytvoří náhradní objekt s chybovou hláškou
let score_label = document.getElementById("score") || { innerHTML: "Error: neni element!" };
let cps_label = document.getElementById("cps") || { innerHTML: "Neni element!" };


// dictionary ve kterém se uchovávají všechny vylepšení a jejich cena,násobič ceny, hodnota a váha jejich hodnoty
const upgrades =
    {
        crit:
            {
                price: JSON.parse(localStorage.getItem("critPrice")) || 100,
                value: JSON.parse(localStorage.getItem("critValue")) || 0,
                priceLabel: document.getElementById("critPrice"),
                valueLabel: document.getElementById("critValue"),
                priceMultiplier: 3,
                valueMultiplier: 5
            },
        click:
            {
                price: JSON.parse(localStorage.getItem("clickPrice")) || 10,
                value: JSON.parse(localStorage.getItem("clickValue")) || 1,
                priceLabel: document.getElementById("clickPrice"),
                valueLabel: document.getElementById("clickValue"),
                priceMultiplier: 3,
                valueMultiplier: 1.5
            },
        critValue:
            {
                price: JSON.parse(localStorage.getItem("critValuePrice")) || 1_000,
                value: JSON.parse(localStorage.getItem("critValueValue")) || 10,
                priceLabel: document.getElementById("critValuePrice"),
                valueLabel: document.getElementById("critValueValue"),
                priceMultiplier: 2,
                valueMultiplier: 2
            },
        prestige:
            {
                price: JSON.parse(localStorage.getItem("prestigePrice")) || 100_000,
                value: JSON.parse(localStorage.getItem("prestigeValue")) || 1,
                priceLabel: document.getElementById("prestigePrice"),
                valueLabel: document.getElementById("prestigeValue"),
                priceMultiplier: 5
            }
    };

// dictionary ve kterém se uchovávají všechny zvířata a jejich cena,násobič ceny, hodnota a váha jejich hodnoty
const animals =
    {
        tung:
            {
                name: "Tung Tung Sahur",
                sound: new Audio("./media/zvuky/tung.mp3"),
                count: JSON.parse(localStorage.getItem("tungCount")) || 0,
                countLabel: document.getElementById("tungCountValue"),
                price: JSON.parse(localStorage.getItem("tungPrice")) || 100,
                priceLabel: document.getElementById("tungPriceValue"),
                priceMultiplier: 1.75,
                scoreValue: 100,
            },
        tralala:
            {
                name: "tralalero tralala",
                sound: new Audio("./media/zvuky/tralala.mp3"),
                count: JSON.parse(localStorage.getItem("tralalaCount")) || 0,
                countLabel: document.getElementById("tralalaCountValue"),
                price: JSON.parse(localStorage.getItem("tralalaPrice")) || 500,
                priceLabel: document.getElementById("tralalaPriceValue"),
                priceMultiplier: 1.75,
                scoreValue: 100,
            },
        bombardino:
            {
                name: "bombardino crocodilo",
                sound: new Audio("./media/zvuky/crocodilo.mp3"),
                count: JSON.parse(localStorage.getItem("bombardinoCount")) || 0,
                countLabel: document.getElementById("bombardinoCountValue"),
                price: JSON.parse(localStorage.getItem("bombardinoPrice")) || 1000,
                priceLabel: document.getElementById("bombardinoPriceValue"),
                priceMultiplier: 1.75,
                scoreValue: 100,
            },
        lirili:
            {
                name: "lirili larila",
                sound: new Audio("./media/zvuky/lirili.mp3"),
                count: JSON.parse(localStorage.getItem("liriliCount")) || 0,
                countLabel: document.getElementById("liriliCountValue"),
                price: JSON.parse(localStorage.getItem("liriliPrice")) || 10_000,
                priceLabel: document.getElementById("liriliPriceValue"),
                priceMultiplier: 1.75,
                scoreValue: 100,
            },
        patapim:
            {
                name: "br br patapim",
                sound: new Audio("./media/zvuky/patapim.mp3"),
                count: JSON.parse(localStorage.getItem("patapimCount")) || 0,
                countLabel: document.getElementById("patapimCountValue"),
                price: JSON.parse(localStorage.getItem("patapimPrice")) || 100_000,
                priceLabel: document.getElementById("patapimPriceValue"),
                priceMultiplier: 1.75,
                scoreValue: 100,
            },
        bananini:
            {
                name: "bananini chimpanzini",
                sound: new Audio("./media/zvuky/bananini.mp3"),
                count: JSON.parse(localStorage.getItem("bananiniCount")) || 0,
                countLabel: document.getElementById("bananiniCountValue"),
                price: JSON.parse(localStorage.getItem("bananiniPrice")) || 1_000_000,
                priceLabel: document.getElementById("bananiniPriceValue"),
                priceMultiplier: 1.75,
                scoreValue: 100,
            }
    };


// uklada data všech cen, počtů apod.
function saveData ()
{
    if (!isNaN(score))
    {
        localStorage.setItem("score", JSON.stringify(score));
    }

    // uložení dat pro jednotlivé upgrady a zvířata do localStorage
    localStorage.setItem("tungCount", JSON.stringify(animals["tung"].count));
    localStorage.setItem("tungPrice", JSON.stringify(animals["tung"].price))

    localStorage.setItem("tralalaCount", JSON.stringify(animals["tralala"].count));
    localStorage.setItem("tralalaPrice", JSON.stringify(animals["tralala"].price))

    localStorage.setItem("bombardinoCount", JSON.stringify(animals["bombardino"].count));
    localStorage.setItem("bombardinoPrice", JSON.stringify(animals["bombardino"].price))

    localStorage.setItem("liriliCount", JSON.stringify(animals["lirili"].count));
    localStorage.setItem("liriliPrice", JSON.stringify(animals["lirili"].price))

    localStorage.setItem("patapimCount", JSON.stringify(animals["patapim"].count));
    localStorage.setItem("patapimPrice", JSON.stringify(animals["patapim"].price))

    localStorage.setItem("bananiniCount", JSON.stringify(animals["bananini"].count));
    localStorage.setItem("bananiniPrice", JSON.stringify(animals["bananini"].price))

    localStorage.setItem("prestigePrice", JSON.stringify(upgrades["prestige"].price));
    localStorage.setItem("prestigeValue", JSON.stringify(upgrades["prestige"].value));

    localStorage.setItem("critPrice", JSON.stringify(upgrades["crit"].price));
    localStorage.setItem("critValue", JSON.stringify(upgrades["crit"].value));

    localStorage.setItem("clickPrice", JSON.stringify(upgrades["click"].price));
    localStorage.setItem("clickValue", JSON.stringify(upgrades["click"].value));

    localStorage.setItem("critValuePrice", JSON.stringify(upgrades["critValue"].price));
    localStorage.setItem("critValueValue", JSON.stringify(upgrades["critValue"].value));
}


// vyčistí data (využítí prestige a kompletní reset)
function clearData(clearPrestige = false)
{
    // vyčistí localStorage a resetuje hodnoty
    localStorage.clear();

    score = 0;

    upgrades["crit"].value = 0;
    upgrades["crit"].price = 500;

    upgrades["click"].value = 1;
    upgrades["click"].price = 20;

    upgrades["critValue"].value = 10;
    upgrades["critValue"].price = 1000;

    animals["tung"].count = 0;
    animals["tung"].price = 100;

    animals["tralala"].count = 0;
    animals["tralala"].price = 300;

    animals["bombardino"].count = 0;
    animals["bombardino"].price = 1_000 ;

    animals["lirili"].count = 0;
    animals["lirili"].price = 10_000;

    animals["patapim"].count = 0;
    animals["patapim"].price = 100_000;

    animals["bananini"].count = 0;
    animals["bananini"].price = 1_000_000;

    // pokud se přenáší reset prestiže, nastaví se její základní hodnoty
    if (clearPrestige)
    {
        upgrades["prestige"].price = 100_000;
        upgrades["prestige"].value = 1
    }

    updateScoreDisplay();
}


function achivementsSaveAnimals()
{
    if (animals["tung"].count >= 10)
    {
        localStorage.setItem("achiveTung", JSON.stringify(true));
    }
    if (animals["tralala"].count >= 10)
    {
        localStorage.setItem("achiveTrala", JSON.stringify(true));
    }
    if (animals["lirili"].count >= 10)
    {
        localStorage.setItem("achiveLirili", JSON.stringify(true));
    }
    if (animals["bombardino"].count >= 10)
    {
        localStorage.setItem("achiveBombardino", JSON.stringify(true));
    }
    if (animals["patapim"].count >= 10)
    {
        localStorage.setItem("achivePatapim", JSON.stringify(true));
    }
    if (animals["bananini"].count >= 10)
    {
        localStorage.setItem("achiveBananini", JSON.stringify(true));
    }
}

function achivementsSaveUpgrades()
{
    if (upgrades["click"].value >= 100)
    {
        localStorage.setItem("achiveClick", JSON.stringify(true));
    }
    if (upgrades["crit"].value >= 50)
    {
        localStorage.setItem("achiveCrit", JSON.stringify(true));
    }
    if (upgrades["crit"].value >= 50)
    {
        localStorage.setItem("achiveCritValue", JSON.stringify(true));
    }
    if (upgrades["prestige"].value >= 1000)
    {
        localStorage.setItem("achivePrestige", JSON.stringify(true));
    }
}

function achivementsSaveScore()
{
    if (score >= 10_000)
    {
        localStorage.setItem("achive10k", JSON.stringify(true));
    }
    if (score >= 100_000)
    {
        localStorage.setItem("achive100k", JSON.stringify(true));
    }
    if (score >= 1_000_000)
    {
        localStorage.setItem("achive1m", JSON.stringify(true));
    }
    if (score >= 10_000_000)
    {
        localStorage.setItem("achive10m", JSON.stringify(true));
    }
    if (score >= 1_000_000_000)
    {
        localStorage.setItem("achive1b", JSON.stringify(true));
    }
}

// do tlačítka vložíme klíč = název zvířete v dictionary
function buyAnimal(animalKey)
{
    let animal = animals[animalKey];

    // pokud má uživatel dost skore na koupi změní se cena, počet jednotek, a zahraje se zvuk
    if (score >= animal.price)
    {
        score -= animal.price;
        animal.count += 1;
        animal.price = priceChange(animal.price, animal.priceMultiplier);
        animal.sound.play();

        updateScoreDisplay();
    }
}


// spočítá celkový počet CPS ze všech zvířat včetně násobiče prestiže
function getTotalCPS()
{
    let cps = 0;
    for (let key in animals)
    {
        cps += animals[key].count * animals[key].scoreValue * upgrades["prestige"].value;
    }
    return cps;
}


// funkce která provádí klik hráče a vypočítá klik s kritickým zásahem nebo bez něj
function playerClicker(crit = false)
{
    if (crit)
    {
        let clicks = upgrades["click"].value * upgrades["critValue"].value * upgrades["prestige"].value;
        cps_label.innerHTML = getTotalCPS() + clicks;
        return clicks;
    }
    else
    {
        let clicks = upgrades["click"].value * upgrades["prestige"].value
        cps_label.innerHTML = getTotalCPS() + clicks;
        return clicks;
    }
}


// funkce pro výpočet šance na kritický zásah
function critChance ()
{
    let randomChance = Math.floor(Math.random() * 101);
    if (randomChance <= upgrades["crit"].value)
    {
        return playerClicker(true);
    }
    else
    {
        return playerClicker();
    }
}


let clickSound = new Audio("./media/zvuky/click.mp3");
// hlavní funkce pro kliknutí (volá se při kliknutí uživatele)
function callClicker ()
{
    score += critChance();
    clickSound.play();
    updateScoreDisplay();
}

let buySound = new Audio("./media/zvuky/buy.mp3");
// nákup upgradu podle klíče
function upgrade (key)
{
    if (score >= upgrades[key].price)
    {
        // u kritického zásahu se hodnota navyšuje lineárně
        if (key === "crit")
        {
            upgrades[key].value += upgrades["crit"].valueMultiplier;
        }
        else
        {
            // ostatní upgrady násobí svou hodnotu násobičem
            upgrades[key].value = Math.round(upgrades[key].value * upgrades[key].valueMultiplier);
        }
        score -= upgrades[key].price;
        upgrades[key].price = priceChange(upgrades[key].price, upgrades[key].priceMultiplier);
        buySound.play();
    }
    updateScoreDisplay();
}


let prestigeAudio = new Audio("./media/zvuky/prestige.mp3");
// aktivuje prestiž pokud má hráč dostatek skóre
function prestige ()
{
    if (score >= upgrades["prestige"].price)
    {
        upgrades["prestige"].value *= 10;
        upgrades["prestige"].price = priceChange(upgrades["prestige"].price, upgrades["prestige"].priceMultiplier);
        clearData();
        prestigeAudio.play();
    }
    else
    {
        console.log(`cena ${upgrades["prestige"].price}`);
    }
}


// zvýšení ceny pomocí násobiče
function priceChange (price, multiplier)
{
    return Math.round(price * multiplier);
}


// funkce přičítající skóre od zvířat každou sekundu
function addScoreFromAnimals ()
{
    for (let key in animals)
    {
        let animal = animals[key];
        if (animal.count > 0)
        {
            score += animal.count * animal.scoreValue * upgrades["prestige"].value;
        }
    }
    updateScoreDisplay();
}


// aktualizuje zobrazované hodnoty ve hře
function updateScoreDisplay ()
{
    score_label.innerHTML = score;
    for (let animal in animals)
    {
        animals[animal].priceLabel.innerHTML = animals[animal].price + ",-";
        animals[animal].countLabel.innerHTML = animals[animal].count + "x";
    }
    for (let upgrade in upgrades)
    {
        upgrades[upgrade].priceLabel.innerHTML = upgrades[upgrade].price + ",-";
        upgrades[upgrade].valueLabel.innerHTML = upgrades[upgrade].value + "x";
    }
    saveData();
}


// přehrávač hudby na pozadí hry
const audio = new Audio("./media/zvuky/theme_music.mp3");
// audio se opakuje nekonecnekrat
audio.loop = true;
let isPlaying = false;

// event listener na tlačítko pro přehrávání nebo zastavení hudby
document.getElementById("playButton").addEventListener("click", () => {
    if (isPlaying)
    {
        // zastavi pisen a nastavy jeji cas na zacatek
        audio.pause();
        audio.currentTime = 0;
        document.getElementById("playButton").textContent = "zapnout";
    } else {
        // zapne pisen
        audio.play();
        document.getElementById("playButton").textContent = "zastavit";
    }
    // nastavi druhou moznost pro podminku
    isPlaying = !isPlaying;
});

// každou sekundu obnoví CPS
setInterval(() => {document.getElementById("cps").innerHTML = getTotalCPS();}, 1000);

// každou sekundu přičte skóre ze zvířat
setInterval(() => addScoreFromAnimals(), 1000);


document.addEventListener("DOMContentLoaded", () =>
{
    score_label = document.getElementById("score");
    cps_label = document.getElementById("cps");
    updateScoreDisplay();
});
