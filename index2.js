let score = localStorage.getItem("score") ? JSON.parse(localStorage.getItem("score")) : 1000;
let score_label = document.getElementById("score") || { innerHTML: "Error: Element not found!" };


const upgrades =
    {
        crit:
            {
                price: 500,
                value: JSON.parse(localStorage.getItem("crit")) || 0,
                priceMultiplier: 3,
                scoreMultiplier: 5
            },
        click:
            {
                price: 20,
                value: JSON.parse(localStorage.getItem("click")) || 1,
                priceMultiplier: 3,
                scoreMultiplier: 2
            },
        critValue:
            {
                price: 1000,
                value: JSON.parse(localStorage.getItem("critValue")) || 10,
                priceMultiplier: 2,
                scoreMultiplier: 2
            }
};

const animals =
    {
        tung:
            {
                name: "Tung Tung Sahur",
                count: JSON.parse(localStorage.getItem("tung")) || 0,
                price: 10,
                priceMultiplier: 1.5,
                scoreValue: 1
            },
        tralalero:
            {
                name: "Tralalero Tralala",
                count: JSON.parse(localStorage.getItem("tralalero")) || 0,
                price: 20,
                priceMultiplier: 1.6,
                scoreValue: 3
            },
        lirili:
            {
                name: "Lirili Larila",
                count: JSON.parse(localStorage.getItem("lirili")) || 0,
                price: 30,
                priceMultiplier: 1.7,
                scoreValue: 5
            },
        patapim:
            {
                name: "br br patapim",
                count: JSON.parse(localStorage.getItem("patapim")) || 0,
                price: 50,
                priceMultiplier: 1.2,
                scoreValue: 25
            }
    };

function clicker(count = 1, value = upgrades["click"].value, multiplier = upgrades["click"].scoreMultiplier)
{
    return count * value * multiplier;
}



function critChance ()
{
    let randomChance = Math.floor(Math.random() * 101);
    if (randomChance <= upgrades["crit"].value)
    {
        return clicker(upgrades["click"].value * upgrades["critValue"].value);
    }
    else
    {
        return clicker();
    }
}


function callClicker ()
{
    score += critChance();
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

function saveData ()
{
    if (!isNaN(score))
    {
        localStorage.setItem("score", JSON.stringify(score));
    }
    localStorage.setItem("crit", JSON.stringify(upgrades["crit"].value));
    localStorage.setItem("click", JSON.stringify(upgrades["click"].value));
    localStorage.setItem("critValue", JSON.stringify(upgrades["critValue"].value));
    localStorage.setItem("tung", JSON.stringify(animals["tung"].count));
    localStorage.setItem("tralalero", JSON.stringify(animals["tralalero"].count));
    localStorage.setItem("lirili", JSON.stringify(animals["lirili"].count));
    localStorage.setItem("patapim", JSON.stringify(animals["patapim"].count));

}

function priceChange (price, multiplier)
{
    return Math.round(price * multiplier);
}

function addScoreFromAnimals () {
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

function clearData() {
    localStorage.clear();

    score = 1000;

    upgrades["crit"].value = 0;
    upgrades["crit"].price = 500;

    upgrades["click"].value = 1;
    upgrades["click"].price = 20;

    upgrades["critValue"].value = 10;
    upgrades["critValue"].price = 1000;

    animals["tung"].count = 0;
    animals["tung"].price = 10;

    animals["tralalero"].count = 0;
    animals["tralalero"].price = 20;

    animals["lirili"].count = 0;
    animals["lirili"].price = 30;

    animals["patapim"].count = 0;
    animals["patapim"].price = 50;

    updateScoreDisplay();
}


setInterval(() => addScoreFromAnimals(), 1000);

updateScoreDisplay();
