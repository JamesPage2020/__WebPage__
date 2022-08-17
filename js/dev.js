// == EVENTS ==
document.getElementById('btnHome').addEventListener('mouseover', function () {
    mouseOver('titleHome');
}, false);
document.getElementById('btnSkills').addEventListener('mouseover', function () {
    mouseOver('titleSkills');
}, false);
document.getElementById('btnLinkedin').addEventListener('mouseover', function () {
    mouseOver('titleLinkedin');
}, false);
document.getElementById('btnPDF').addEventListener('mouseover', function () {
    mouseOver('titlePDF');
}, false);
document.getElementById('btnProj').addEventListener('mouseover', function () {
    mouseOver('titleProj');
}, false);
document.getElementById('btnSend').addEventListener('mouseover', function () {
    mouseOver('titleSend');
}, false);


document.getElementById('btnHome').addEventListener('mouseout', function () {
    mouseOut('titleHome');
}, false);
document.getElementById('btnSkills').addEventListener('mouseout', function () {
    mouseOut('titleSkills');
}, false);
document.getElementById('btnLinkedin').addEventListener('mouseout', function () {
    mouseOut('titleLinkedin');
}, false);
document.getElementById('btnPDF').addEventListener('mouseout', function () {
    mouseOut('titlePDF');
}, false);
document.getElementById('btnProj').addEventListener('mouseout', function () {
    mouseOut('titleProj');
}, false);
document.getElementById('btnSend').addEventListener('mouseout', function () {
    mouseOut('titleSend');
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