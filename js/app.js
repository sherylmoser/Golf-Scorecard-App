function getAvailableCourses() {
    return fetch('https://golf-courses-api.herokuapp.com/courses/')
        .then(response => response.json())
        .then(data => courseSelectionRender(data.courses));
}
function courseSelectionRender(courses) {
    let courseSelectionHTML = '<option value="1">Select Your Course</option>';
    courses.forEach((course) => {
        courseSelectionHTML += `<option value="${course.id}">${course.name}</option>`
    })
    document.getElementById('courseSelect').innerHTML = courseSelectionHTML;
}

function getCourseInfo(courseId) {
    return fetch(`https://golf-courses-api.herokuapp.com/courses/${courseId}`)
        .then((response) => response.json());
}

function onCourseSelection(event) {
    const courseId = event.target.value
    localStorage.setItem('courseId', courseId)
    getCourseInfo(courseId).then(data => {
        const course = data.data;
        const holes = course.holes;
        let teeSelectionHTML = '<option value="0">Select Your Tee</option>';
        holes[0].teeBoxes.forEach((teeBox, index) => {
            teeSelectionHTML += `<option value="${index}">${teeBox.teeType}</option>`;
        });
        document.getElementById('teeSelect').innerHTML = teeSelectionHTML;
    });
}

function saveTeeSelection(event) {
    const teeTypeIndex = event.target.value;
    localStorage.setItem('teeTypeIndex', teeTypeIndex)
}

class Player {
    constructor(name, scores = []) {
        this.name = name;
        this.scores = scores;
    }
    addScore(score) {
        this.scores.push(score)
    }
}

const players = playerRetrieve();

function addPlayer(event) {
    const newPlayer = new Player(event.target.value);
    let playerId = event.target.id
    players[playerId] = newPlayer;
    save()
}

function yardsRender() {
    const currentCourseId = localStorage.getItem('courseId');
    const currentTeeType = localStorage.getItem('teeTypeIndex');
    getCourseInfo(currentCourseId).then(data => {
        const course = data.data;
        const holes = course.holes;

        let frontNineYardsHTML = '<th scope="row">Yards</th>';
        for (let i = 0; i < 9; i++) {
            const teeType = holes[i].teeBoxes[currentTeeType];
            const yards = teeType.yards;
            frontNineYardsHTML += `<td class="yardsOut" scope="row">${yards}</td>`;
        }
        frontNineYardsHTML += '<th id="yardsOut" scope="row"></th>'
        document.getElementById('frontYards').innerHTML = frontNineYardsHTML;

        outTotal('yards')

        let backNineYardsHTML = '<th scope="row">Yards</th>';
        for (let i = 9; i < 18; i++) {
            const teeType = holes[i].teeBoxes[currentTeeType];
            const yards = teeType.yards;
            backNineYardsHTML += `<td class="yardsIn" scope="row">${yards}</td>`;
        }
        backNineYardsHTML += `<th id="yardsIn" scope="row"></th>
            <th id="yardsTotal" scope="row"></th>`;
        document.getElementById('backYards').innerHTML = backNineYardsHTML;

        inTotal('yards');
        completeTotal('yards');
    });
}

function parRender() {
    const currentCourseId = localStorage.getItem('courseId');
    const currentTeeType = localStorage.getItem('teeTypeIndex');
    getCourseInfo(currentCourseId).then(data => {
        const course = data.data;
        const holes = course.holes;

        let frontNineParHTML = '<th scope="row">Par</th>';
        for (let i = 0; i < 9; i++) {
            const teeType = holes[i].teeBoxes[currentTeeType];
            const par = teeType.par;
            frontNineParHTML += `<td class="parOut" scope="row">${par}</td>`;
        }
        frontNineParHTML += '<th id="parOut" scope="row"></th>'
        document.getElementById('frontPar').innerHTML = frontNineParHTML;

        outTotal('par');

        let backNineParHTML = '<th scope="row">Par</th>';
        for (let i = 9; i < 18; i++) {
            const teeType = holes[i].teeBoxes[currentTeeType];
            const par = teeType.par;
            backNineParHTML += `<td class="parIn" scope="row">${par}</td>`;
        }
        backNineParHTML += `<th id="parIn" scope="row"></th>
            <th id="parTotal" scope="row"></th>`;
        document.getElementById('backPar').innerHTML = backNineParHTML;

        inTotal('par');
        completeTotal('par');
    });
}

function handicapRender() {
    const currentCourseId = localStorage.getItem('courseId');
    const currentTeeType = localStorage.getItem('teeTypeIndex');
    getCourseInfo(currentCourseId).then(data => {
        const course = data.data;
        const holes = course.holes;

        let frontNineHcpHTML = '<th scope="row">Handicap</th>';
        for (let i = 0; i < 9; i++) {
            const teeType = holes[i].teeBoxes[currentTeeType];
            const hcp = teeType.hcp;
            frontNineHcpHTML += `<td class="hcpOut" scope="row">${hcp}</td>`;
        }
        frontNineHcpHTML += '<th id="hcpOut" scope="row"></th>'
        document.getElementById('frontHandicap').innerHTML = frontNineHcpHTML;

        outTotal('hcp');

        let backNineHcpHTML = '<th scope="row">Handicap</th>';
        for (let i = 9; i < 18; i++) {
            const teeType = holes[i].teeBoxes[currentTeeType];
            const hcp = teeType.hcp;
            backNineHcpHTML += `<td class="hcpIn" scope="row">${hcp}</td>`;
        }
        backNineHcpHTML += `<th id="hcpIn" scope="row"></th>
            <th id="hcpTotal" scope="row"></th>`;
        document.getElementById('backHandicap').innerHTML = backNineHcpHTML;

        inTotal('hcp');
        completeTotal('hcp');
    });
}

function playerRender() {
    players.forEach(player => {
        if (player.name == '') {
            return;
        }
        let frontNinePlayerRowHTML = document.createElement('tr')
        frontNinePlayerRowHTML.innerHTML = `<th scope="row">${player.name}</th>`;
        for (let i = 0; i < 9; i++) {
            frontNinePlayerRowHTML.innerHTML += `<td><input onkeyup="addPlayerScore()" 
            id="${player.name}Score${i}" class="${player.name}Out hitsInput" type="number"></td>`;
        }
        frontNinePlayerRowHTML.innerHTML += `<th id="${player.name}Out">0</th>`;
        document.getElementById('frontNine').appendChild(frontNinePlayerRowHTML);

        let backNinePlayerRowHTML = document.createElement('tr')
        backNinePlayerRowHTML.innerHTML = `<th scope="row">${player.name}</th>`;
        for (let i = 9; i < 18; i++) {
            backNinePlayerRowHTML.innerHTML += `<td><input onkeyup="addPlayerScore()" 
            id="${player.name}Score${i}" class="${player.name}Out hitsInput" type="number"></td>`
        }
        backNinePlayerRowHTML.innerHTML += `<th id="${player.name}In">0</th>
            <th id="${player.name}Total">0</th>`;
        document.getElementById('backNine').appendChild(backNinePlayerRowHTML);
    })
}
function tableRender() {
    yardsRender();
    parRender();
    handicapRender();
    playerRender();
}

function outTotal(row) {
    let total = 0;
    let rowData = document.getElementsByClassName(`${row}Out`);
    for (let td of rowData) {
        let cellValue = parseInt(td.innerText);
        total += cellValue;
    }
    let outCell = document.getElementById(`${row}Out`);
    outCell.innerText = total;
}

function inTotal(row) {
    let total = 0;
    let rowData = document.getElementsByClassName(`${row}In`);
    for (let td of rowData) {
        let cellValue = parseInt(td.innerText);
        total += cellValue;
    }
    let outCell = document.getElementById(`${row}In`);
    outCell.innerText = total;
}

function completeTotal(row) {
    let totalIn = parseInt(document.getElementById(`${row}In`).innerText);
    let totalOut = parseInt(document.getElementById(`${row}Out`).innerText);
    let totalCell = document.getElementById(`${row}Total`);
    totalCell.innerText = totalOut + totalIn;
}

function addPlayerScore() {
    players.forEach(player => {
        for (let i = 0; i < 18; i++) {
            let scoreCell = parseInt(document.getElementById(`${player.name}Score${i}`).value);
            if (scoreCell) {
                player.scores[i] = scoreCell;
            } else {
                player.scores[i] = 0;
            }
        }
        let playerOutCell = document.getElementById(`${player.name}Out`);
        let outTotal = 0;
        let playerInCell = document.getElementById(`${player.name}In`);
        let inTotal = 0;
        let playerTotalCell = document.getElementById(`${player.name}Total`);
        for (let i = 0; i < 9; i++) {
            outTotal += player.scores[i];
        }
        playerOutCell.innerText = outTotal;
        for (let i = 9; i < 18; i++) {
            inTotal += player.scores[i]
        }
        playerInCell.innerText = inTotal;
        playerTotalCell.innerText = outTotal + inTotal;
    })
}

function save() {
    const playersArrayString = JSON.stringify(players);
    localStorage.setItem('playersArrayString', playersArrayString)
}

function playerRetrieve() {
    const playersArrayString = localStorage.getItem('playersArrayString');
    const playersArrayObject = JSON.parse(playersArrayString)

    if (playersArrayObject) {
        const playersObjects = playersArrayObject.map((player) => {
            let players = new Player(player.name, player.scores)
            return players;
        })
        return playersObjects;
    }
    return []
}
