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


function clearData(clearPrestige = false)
{
    localStorage.clear();

    score = 0;

    upgrades["crit"].value = 0;
    upgrades["crit"].price = 500;

    upgrades["click"].value = 1;
    upgrades["click"].price = 20;

    upgrades["critValue"].value = 10;
    upgrades["critValue"].price = 1000;

    animals["tung"].count = 0;
    animals["tung"].price = 10;

    if (clearPrestige)
    {
        upgrades["prestige"].price = 100_000;
        upgrades["prestige"].value = 1
    }

    updateScoreDisplay();
}


function buyAnimal(animalKey)
{
    let animal = animals[animalKey];

    if (score >= animal.price)
    {
        score -= animal.price;
        animal.count += 1;
        animal.price = priceChange(animal.price, animal.priceMultiplier);
        animal.sound.play();

        updateScoreDisplay();
    }
    else
    {
        console.log(`Není dost peněz na koupi ${animal.name}. Potřeba: ${animal.price}, nyní: ${score}`);
    }
}


function getTotalCPS()
{
    let cps = 0;
    for (let key in animals)
    {
        cps += animals[key].count * animals[key].scoreValue * upgrades["prestige"].value;
    }
    return cps;
}


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
            upgrades[key].value += upgrades["crit"].valueMultiplier;
        }
        else
        {
            upgrades[key].value = Math.round(upgrades[key].value * upgrades[key].valueMultiplier);
        }
        score -= upgrades[key].price;
        upgrades[key].price = priceChange(upgrades[key].price, upgrades[key].priceMultiplier);
        console.log(`Nová cena ${upgrades[key].price}, nova value ${upgrades[key].value}`);
    }
    updateScoreDisplay();
}


function prestige ()
{
    if (score >= upgrades["prestige"].price)
    {
        upgrades["prestige"].value *= 10;
        upgrades["prestige"].price = priceChange(upgrades["prestige"].price, upgrades["prestige"].priceMultiplier);
        console.log(`Nová cena ${upgrades["prestige"].price}, nova value ${upgrades["prestige"].value}`);
        clearData();
    }
    else
    {
        console.log(`cena ${upgrades["prestige"].price}`);
    }
}


function priceChange (price, multiplier)
{
    return Math.round(price * multiplier);
}


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


function updateScoreDisplay ()
{
    score_label.innerHTML = score;
    for (let animal in animals)
    {
        animals[animal].priceLabel.innerHTML = animals[animal].price;
        animals[animal].countLabel.innerHTML = animals[animal].count;
    }
    for (let upgrade in upgrades)
    {
        upgrades[upgrade].priceLabel.innerHTML = upgrades[upgrade].price;
        upgrades[upgrade].valueLabel.innerHTML = upgrades[upgrade].value;
    }
    saveData();
}


const audio = new Audio("./media/theme_music.mp3");
// audio se opakuje nekonecnekrat
audio.loop = true;
let isPlaying = false;

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

setInterval(() => {document.getElementById("cps").innerHTML = getTotalCPS();}, 1000);

setInterval(() => addScoreFromAnimals(), 1000);

window.onload = () => {
    updateScoreDisplay();
};