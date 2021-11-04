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
getAvailableCourses();

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
            frontNineYardsHTML += `<td scope="row">${yards}</td>`;
        }
        frontNineYardsHTML += '<th id="frontYardsOut" scope="row"></th>'
        document.getElementById('frontYards').innerHTML = frontNineYardsHTML;
        let backNineYardsHTML = '<th scope="row">Yards</th>';
        for (let i = 9; i < 18; i++) {
            const teeType = holes[i].teeBoxes[currentTeeType];
            const yards = teeType.yards;
            backNineYardsHTML += `<td scope="row">${yards}</td>`;
        }
        backNineYardsHTML += `<th id="backYardsIn" scope="row"></th>
            <th id="backYardsTotal" scope="row"></th>`;
        document.getElementById('backYards').innerHTML = backNineYardsHTML;
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
            frontNineParHTML += `<td scope="row">${par}</td>`;
        }
        frontNineParHTML += '<th id="frontParOut" scope="row"></th>'
        document.getElementById('frontPar').innerHTML = frontNineParHTML;
        let backNineParHTML = '<th scope="row">Par</th>';
        for (let i = 9; i < 18; i++) {
            const teeType = holes[i].teeBoxes[currentTeeType];
            const par = teeType.par;
            backNineParHTML += `<td scope="row">${par}</td>`;
        }
        backNineParHTML += `<th id="backParIn" scope="row"></th>
            <th id="backParTotal" scope="row"></th>`;
        document.getElementById('backPar').innerHTML = backNineParHTML;
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
            frontNineHcpHTML += `<td scope="row">${hcp}</td>`;
        }
        frontNineHcpHTML += '<th id="frontHcpOut" scope="row"></th>'
        document.getElementById('frontHandicap').innerHTML = frontNineHcpHTML;
        let backNineHcpHTML = '<th scope="row">Handicap</th>';
        for (let i = 9; i < 18; i++) {
            const teeType = holes[i].teeBoxes[currentTeeType];
            const hcp = teeType.hcp;
            backNineHcpHTML += `<td scope="row">${hcp}</td>`;
        }
        backNineHcpHTML += `<th id="backHcpIn" scope="row"></th>
            <th id="backHcpTotal" scope="row"></th>`;
        document.getElementById('backHandicap').innerHTML = backNineHcpHTML;
    });
}

function playerRender() {
    players.forEach(player => {
        let frontNinePlayerRowHTML = document.createElement('tr')
        frontNinePlayerRowHTML.innerHTML = `<th scope="row">${player.name}</th>`;
        for (let i = 1; i < 10; i++) {
            frontNinePlayerRowHTML.innerHTML += `<td><input id="${player.name}Score${i}" class="hitsInput" type="number"></td>`;
        }
        frontNinePlayerRowHTML.innerHTML += `<td id="${player.name}Out"></td>`;
        document.getElementById('frontNine').appendChild(frontNinePlayerRowHTML);
        let backNinePlayerRowHTML = document.createElement('tr')
        backNinePlayerRowHTML.innerHTML = `<th scope="row">${player.name}</th>`;
        for (let i = 10; i < 19; i++) {
            backNinePlayerRowHTML.innerHTML += `<td><input id="${player.name}Score${i}" class="hitsInput" type="number"></td>`
        }
        backNinePlayerRowHTML.innerHTML += `<td id="${player.name}Total"></td>`;
        document.getElementById('backNine').appendChild(backNinePlayerRowHTML);
    })
}
function tableRender() {
    yardsRender();
    parRender();
    handicapRender();
    playerRender();
}
function addScore() {

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
