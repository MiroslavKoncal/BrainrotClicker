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
}

loadAchivements();