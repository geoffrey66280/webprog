const urlLignes = "https://api.tisseo.fr/v1/lines.json?&key=a3732a1074e2403ce364ad6e71eb998cb"
const urlArrets = "https://api.tisseo.fr/v1/stop_points.json?key=a3732a1074e2403ce364ad6e71eb998cb&lineId="



function allLines() {
fetch(urlLignes)
.then(response => response.json())
.then(data => {
    console.log(data)
    const lines = data.lines.line
    for(x of lines) {
        document.querySelector('#lines').innerHTML += '<li value=' + x.id +'><a class="line">' + x.name + '</a></li>'
        document.querySelector('#lines').innerHTML += '</br>'
    }

    const lis = document.querySelector('#lines').querySelectorAll("li")
    for (const li of lis) {
    li.addEventListener("click",function(e) {
        allArrets(this.getAttribute('value'))
    })
}
})
.catch(err => console.error(err))



}


function allArrets(idLine) {
    console.log(idLine)
    console.log(urlArrets + idLine)
fetch(urlArrets + idLine)
.then(response => response.json())
.then(data => {
    console.log(data.physicalStops.physicalStop)
    

})
.catch(err => console.error(err))
}