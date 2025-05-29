function loadAchivements()
{
    let achive10k = JSON.parse(localStorage.getItem("achive10k") || "false");
    let achive100k = JSON.parse(localStorage.getItem("achive100k") || "false");
    let achive1m = JSON.parse(localStorage.getItem("achive1m") || "false");
    let achive10m = JSON.parse(localStorage.getItem("achive10m") || "false");
    let achive1b = JSON.parse(localStorage.getItem("achive1b") || "false");

    let achiveClick = JSON.parse(localStorage.getItem("achiveClick") || "false");
    let achiveCrit = JSON.parse(localStorage.getItem("achiveCrit") || "false");
    let achiveCritValue = JSON.parse(localStorage.getItem("achiveCritValue") || "false");
    let achivePrestige = JSON.parse(localStorage.getItem("achivePrestige") || "false");

    let achiveTung = JSON.parse(localStorage.getItem("achiveTung") || "false");
    let achiveTrala = JSON.parse(localStorage.getItem("achiveTrala") || "false");
    let achiveLirili = JSON.parse(localStorage.getItem("achiveLirili") || "false");
    let achiveBombardino = JSON.parse(localStorage.getItem("achiveBombardino") || "false");
    let achivePatapim = JSON.parse(localStorage.getItem("achivePatapim") || "false");
    let achiveBananini = JSON.parse(localStorage.getItem("achiveBananini") || "false");

    let progressBar1 = document.getElementById("progressBar1");
    finishAchievement(achive10k, progressBar1);

    let progressBar2 = document.getElementById("progressBar2");
    finishAchievement(achive100k, progressBar2);

    let progressBar3 = document.getElementById("progressBar3");
    finishAchievement(achive1m, progressBar3);

    let progressBar4 = document.getElementById("progressBar4");
    finishAchievement(achive10m, progressBar4);

    let progressBar5 = document.getElementById("progressBar5");
    finishAchievement(achive1b, progressBar5);

    let progressBar6 = document.getElementById("progressBar6");
    finishAchievement(achiveClick, progressBar6);

    let progressBar7 = document.getElementById("progressBar7");
    finishAchievement(achiveCrit, progressBar7);

    let progressBar8 = document.getElementById("progressBar8");
    finishAchievement(achiveCritValue, progressBar8);

    let progressBar9 = document.getElementById("progressBar9");
    finishAchievement(achivePrestige, progressBar9);

    let progressBar10 = document.getElementById("progressBar10");
    finishAchievement(achiveTung, progressBar10);

    let progressBar11 = document.getElementById("progressBar11");
    finishAchievement(achiveTrala, progressBar11);

    let progressBar12 = document.getElementById("progressBar12");
    finishAchievement(achiveLirili, progressBar12);

    let progressBar13 = document.getElementById("progressBar13");
    finishAchievement(achiveBombardino, progressBar13);

    let progressBar14 = document.getElementById("progressBar14");
    finishAchievement(achivePatapim, progressBar14);

    let progressBar15 = document.getElementById("progressBar15");
    finishAchievement(achiveBananini, progressBar15);
}

function finishAchievement (variable, progresbar)
{
    if (variable === true)
    {
        progresbar.style.width = "100%";
    }
}

loadAchivements();

