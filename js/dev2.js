document.getElementById('btnBack').addEventListener('mouseover', function () {
    mouseOver('titleBack');
}, false);
document.getElementById('btnBack').addEventListener('mouseout', function () {
    mouseOut('titleBack');
}, false);


// == Event functions == 
function mouseOut(titleId) {
    // console.log("mouse out");
    document.getElementById(titleId).style.display = "none";
}

function mouseOver(titleId) {
    // console.log("mouse over");
    document.getElementById(titleId).style.display = "block";
}