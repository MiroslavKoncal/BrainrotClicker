function loadAchivements()
{
    let achive10k = localStorage.getItem("achive10k") || false;
    let achive100k = localStorage.getItem("achive100k") || false;
    let achive1m = localStorage.getItem("achive1m") || false;
    let achive10m = localStorage.getItem("achive10m") || false;
    let achive1b = localStorage.getItem("achive1b") || false;

    let achiveClick = localStorage.getItem("achiveClick") || false;
    let achiveCrit = localStorage.getItem("achiveCrit") || false;
    let achiveCritValue = localStorage.getItem("achiveCritValue") || false;
    let achivePrestige = localStorage.getItem("achivePrestige") || false;

    let achiveTung = localStorage.getItem("achive1b") || false;
    let achiveTrala = localStorage.getItem("achive1b") || false;
    let achiveLirili = localStorage.getItem("achive1b") || false;
    let achiveBombardino = localStorage.getItem("achive1b") || false;
    let achivePatapim = localStorage.getItem("achive1b") || false;
    let achiveBananini = localStorage.getItem("achive1b") || false;
}

loadAchivements();
