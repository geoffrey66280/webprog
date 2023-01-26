const urlLignes = "https://api.tisseo.fr/v1/lines.json?&key=a3732a1074e2403ce364ad6e71eb998cb"
const urlArrets = "https://api.tisseo.fr/v1/stop_points.json?key=a3732a1074e2403ce364ad6e71eb998cb&lineId="
const urlArretsSuivant = "https://api.tisseo.fr/v1/stops_schedules.json?key=a3732a1074e2403ce364ad6e71eb998cb&stopPointId="

document.querySelector("button").addEventListener('click', () => {
    allLines()
})
function allLines() {
fetch(urlLignes)
.then(response => response.json())
.then(data => {
    const lines = data.lines.line
    console.log(lines)
    for(x of lines) {
        document.querySelector('#lines').innerHTML += '<li value=' + x.id +' style="color:' + x.bgXmlColor + '"><a class="line">' + x.name + '</a></li>'
        document.querySelector('#lines').innerHTML += '</br>'
    }

    const lis = document.querySelector('#lines').querySelectorAll("li")
    for (const li of lis) {
    li.addEventListener("click",function(e) {
        let color = this.getAttribute('style')
        allArrets(this.getAttribute('value'), color)
    })
}
})
.catch(err => console.error(err))
}


function allArrets(idLine, color) {
fetch(urlArrets + idLine)
.then(response => response.json())
.then(data => {
    document.querySelector('#lines3').innerHTML = ""
    const arrets = data.physicalStops.physicalStop
    let arretsFilter = filterSameArret(arrets)
    document.querySelector('#lines2').innerHTML = ""
    for(x of arretsFilter) {
        document.querySelector('#lines2').innerHTML += '<li value=' + x.id +' style="' + color + '"><a class="line">' + x.name + '</a></li>'
        document.querySelector('#lines2').innerHTML += '</br>'
    }

    const lis2 = document.querySelector('#lines2').querySelectorAll("li")
    for (const li of lis2) {
    li.addEventListener("click",function(e) {
        allArretsSuivant(this.getAttribute('value'))
    })
}
    

})
.catch(err => console.error(err))
}

function allArretsSuivant(idPoint) {
fetch(urlArretsSuivant + idPoint)
.then(response => response.json())
.then(data => {
    document.querySelector('#lines3').innerHTML = ""
    const arretsSuivant = data.departures.departure
    for(x of arretsSuivant) {
        document.querySelector('#lines3').innerHTML += '<li value=' + x.destination +'><a class="line">' + x.dateTime + '</a></li>'
        document.querySelector('#lines3').innerHTML += '</br>'
    }

})
.catch(err => console.error(err))
}

function filterSameArret(array) {
    return Object.values(array.reduce((acc,cur)=>Object.assign(acc,{[cur.name]:cur}),{}))

}