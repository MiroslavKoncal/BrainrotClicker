let score = localStorage.getItem("score") ? JSON.parse(localStorage.getItem("score")) : 0;
let score_label = document.getElementById("score") || { innerHTML: "Error: neni element!" };
let cps_label = document.getElementById("cps") || { innerHTML: "Neni element!" };


//dictionary ve kterém se uchovávají všechny vylepšení a jejich cena,násobič ceny, hodnota a váha jejich hodnoty
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


// dictionary ve kterém se uchvávají všechny zvířátka, jejich cena, nasobič ceny atd.
const animals =
    {
        tung:
            {
                name: "Tung Tung Sahur",
                sound: new Audio("./media/tung.mp3"),
                count: JSON.parse(localStorage.getItem("tungCount")) || 0,
                countLabel: document.getElementById("tungCountValue"),
                price: JSON.parse(localStorage.getItem("tungPrice")) || 30,
                priceLabel: document.getElementById("tungPriceValue"),
                priceMultiplier: 1.75,
                scoreValue: 100,
            }
    };


// uchovává data do localstorage aby se při jakémkoliv refreshy vypnutí a podobně všechna data uživateli neresetovali
function saveData ()
{
    if (!isNaN(score))
    {
        localStorage.setItem("score", JSON.stringify(score));
    }

    localStorage.setItem("tungCount", JSON.stringify(animals["tung"].count));
    localStorage.setItem("tungPrice", JSON.stringify(animals["tung"].price))

    localStorage.setItem("prestigePrice", JSON.stringify(upgrades["prestige"].price));
    localStorage.setItem("prestigeValue", JSON.stringify(upgrades["prestige"].value));

    localStorage.setItem("critPrice", JSON.stringify(upgrades["crit"].price));
    localStorage.setItem("critValue", JSON.stringify(upgrades["crit"].value));

    localStorage.setItem("clickPrice", JSON.stringify(upgrades["click"].price));
    localStorage.setItem("clickValue", JSON.stringify(upgrades["click"].value));

    localStorage.setItem("critValuePrice", JSON.stringify(upgrades["critValue"].price));
    localStorage.setItem("critValueValue", JSON.stringify(upgrades["critValue"].value));
}

// vyčistí všechna uživatelská data
function clearData(clearPrestige = false)
{

    localStorage.clear();

    // po vyčistění dat přiřadí všem proměnným zpět jejich základní hodnoty
    score = 0;

    upgrades["crit"].value = 0;
    upgrades["crit"].price = 500;

    upgrades["click"].value = 1;
    upgrades["click"].price = 20;

    upgrades["critValue"].value = 10;
    upgrades["critValue"].price = 1000;

    animals["tung"].count = 0;
    animals["tung"].price = 10;

    // pokud do funkce vejde true přenastavý se i hodnoty pro pestige
    if (clearPrestige)
    {
        upgrades["prestige"].price = 100_000;
        upgrades["prestige"].value = 1
    }
    // obnoví obraz aby zoobrazoval změněné hodnoty
    updateScoreDisplay();
}


function buyAnimal(animalKey)
{
    // uloží si zvíře a jeho data za pomocí kliče zadaného v  parametrech
    let animal = animals[animalKey];

    if (score >= animal.price)
    {
        // zmení cenu, vezme skóré a zahraje zvuk daného zvířete pokud bylo skóré větší než cena
        score -= animal.price;
        animal.count += 1;
        animal.price = priceChange(animal.price, animal.priceMultiplier);
        animal.sound.play();
        // obnoví obraz aby zoobrazoval změněné hodnoty
        updateScoreDisplay();
    }
}


function getTotalCPS()
{
    let cps = 0;
    // postupně spočítá kolik je celková hodnota kolik zvířata vydělají za sekundu
    for (let key in animals)
    {
        cps += animals[key].count * animals[key].scoreValue * upgrades["prestige"].value;
    }
    return cps;
}


function playerClicker(crit = false)
{
    // pokud do funkce vejde parametr true:
    if (crit)
    {
        let clicks = upgrades["click"].value * upgrades["critValue"].value * upgrades["prestige"].value;
        // secte hodnotu clicks s hodnodnotou kterou vrací funkce getTotalCPS a vypíše jí na obrazovku
        cps_label.innerHTML = getTotalCPS() + clicks;
        return clicks;
    }
    // jinak:
    else
    {
        let clicks = upgrades["click"].value * upgrades["prestige"].value
        // secte hodnotu clicks s hodnodnotou kterou vrací funkce getTotalCPS a vypíše jí na obrazovku
        cps_label.innerHTML = getTotalCPS() + clicks;
        return clicks;
    }
}


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


function callClicker ()
{
    score += critChance();
    updateScoreDisplay();
}


function upgrade (key)
{
    if (score >= upgrades[key].price)
    {
        if (key === "crit")
        {
            // vylepší se šance na kritický zásah
            upgrades[key].value += upgrades["crit"].valueMultiplier;
        }
        else
        {
            // zvětší hodnoty pro vylepšení které užívatel vybral
            upgrades[key].value = Math.round(upgrades[key].value * upgrades[key].valueMultiplier);
        }
        // odebere skore, změní cenu a vypíše na obrazovku
        score -= upgrades[key].price;
        upgrades[key].price = priceChange(upgrades[key].price, upgrades[key].priceMultiplier);
    }
    updateScoreDisplay();
}


function prestige ()
{
    if (score >= upgrades["prestige"].price)
    {
        // kdyz uzivatel koupi prestige resetuje vsechna data a zvetsi hodnotu prestige o 10 nasledne zmeni cenu
        upgrades["prestige"].value *= 10;
        upgrades["prestige"].price = priceChange(upgrades["prestige"].price, upgrades["prestige"].priceMultiplier);
        clearData();
    }
}


function priceChange (price, multiplier)
{
    // vratí zaokrouhlenou hodnotu nasobku ceny a nasobitele ceny
    return Math.round(price * multiplier);
}


function addScoreFromAnimals ()
{
    for (let key in animals)
    {
        // prochází postupně klíči všech zvířat a vždy ke skoré pričte jejich score vynásobené jejich počtem a prestige
        let animal = animals[key];
        if (animal.count > 0)
        {
            score += animal.count * animal.scoreValue * upgrades["prestige"].value;
        }
    }
    updateScoreDisplay();
}


function updateScoreDisplay ()
{
    // nastavi hodnotu pro skore do html
    score_label.innerHTML = score;

    // postupně projde všechny zvířata a vypíše do html hodnoty
    for (let animal in animals)
    {
        animals[animal].priceLabel.innerHTML = animals[animal].price;
        animals[animal].countLabel.innerHTML = animals[animal].count;
    }
    // postupně projde všechny vylepšení a vypíše do html hodnoty
    for (let upgrade in upgrades)
    {
        upgrades[upgrade].priceLabel.innerHTML = upgrades[upgrade].price;
        upgrades[upgrade].valueLabel.innerHTML = upgrades[upgrade].value;
    }
    // uloží hodnoty
    saveData();
}


const audio = new Audio("./media/theme_music.mp3");
// audio se opakuje nekonecnekrat
audio.loop = true;
let isPlaying = false;

// po stlačení tlačítka se buď zapne pisnička nebo vypne podle stavu
document.getElementById("playButton").addEventListener("click", () => {
    if (isPlaying)
    {
        // zastavi pisen a nastavy jeji cas na zacatek
        audio.pause();
        audio.currentTime = 0;
        document.getElementById("playButton").textContent = "zapnout pisničku";
    } else {
        // zapne pisen
        audio.play();
        document.getElementById("playButton").textContent = "zastavit pisničku";
    }
    // nastavi druhou moznost pro podminku
    isPlaying = !isPlaying;
});


//každou sekundu zavolá funkci a přidelí html elementu novou hodnotu
setInterval(() => {document.getElementById("cps").innerHTML = getTotalCPS();}, 1000);


// každou sekundu přidá score ze zvířat
setInterval(() => addScoreFromAnimals(), 1000);


// po zapnutí stránky se obnoví co je na obrazovce
window.onload = () =>
{
    updateScoreDisplay();
};