let score = localStorage.getItem("score") ? JSON.parse(localStorage.getItem("score")) : 0;
let score_label = document.getElementById("score") || { innerHTML: "Error: neni element!" };
let cps_label = document.getElementById("cps") || { innerHTML: "Neni element!" };


const upgrades =
    {
        crit:
            {
                price: JSON.parse(localStorage.getItem("critPrice")) || 100,
                value: JSON.parse(localStorage.getItem("critValue")) || 0,
                priceMultiplier: 3,
                scoreMultiplier: 5
            },
        click:
            {
                price: JSON.parse(localStorage.getItem("clickPrice")) || 10,
                value: JSON.parse(localStorage.getItem("clickValue")) || 1,
                priceMultiplier: 3,
                scoreMultiplier: 1.5
            },
        critValue:
            {
                price: JSON.parse(localStorage.getItem("critValuePrice")) || 1_000,
                value: JSON.parse(localStorage.getItem("critValueValue")) || 10,
                priceMultiplier: 2,
                scoreMultiplier: 2
            },
        prestige:
            {
                price: JSON.parse(localStorage.getItem("prestigePrice")) || 100_000,
                value: JSON.parse(localStorage.getItem("prestigeValue")) || 1,
                priceMultiplier: 5
            }
};

const animals =
    {
        tung:
            {
                name: "Tung Tung Sahur",
                count: JSON.parse(localStorage.getItem("tungCount")) || 0,
                price: JSON.parse(localStorage.getItem("tungPrice")) || 30,
                priceMultiplier: 1.75,
                scoreValue: 100,
            },
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

    upgrades["prestige"].price = 100_000;

    if (clearPrestige)
    {
        upgrades["prestige"].value = 1
    }


    updateScoreDisplay();
}

function buyAnimal (animalKey)
{
    let animal = animals[animalKey];

    if (score >= animal.price) {
        score -= animal.price;
        updateScoreDisplay();
        animal.count += 1;
        animal.price = priceChange(animal.price, animal.priceMultiplier);

        console.log(`Koupeno ${animal.name}. Počet: ${animal.count}, nová cena: ${animal.price}`);
    } else {
        console.log(`Není dost peněz na koupi ${animal.name}. Potřeba: ${animal.price}, nyní: ${score}`);
    }
}

function playerClicker(crit = false)
{
    let cps = 0
    if (crit)
    {
        cps = upgrades["click"].value * upgrades["critValue"].value * upgrades["prestige"].value;
    }
    else
    {
        cps = upgrades["click"].value * upgrades["prestige"].value
    }
    cps_label.innerHTML = cps;
    return cps;
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
    if (score >= upgrades[key].price) {
        if (key === "crit") {
            upgrades[key].value += upgrades["crit"].scoreMultiplier;
        } else {
            upgrades[key].value = Math.round(upgrades[key].value * upgrades[key].scoreMultiplier);
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
    for (let key in animals) {
        let animal = animals[key];
        if (animal.count > 0) {
            score += animal.count * animal.scoreValue;
        }
    }
    updateScoreDisplay();
}


function updateScoreDisplay ()
{
    score_label.innerHTML = score;
    saveData();
}


setInterval(() => addScoreFromAnimals(), 1000);

updateScoreDisplay();
