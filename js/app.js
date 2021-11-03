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
    getCourseInfo(courseId).then(data => {
        const course = data.data;
        const holes = course.holes;
        let teeSelectionHTML = '<option value="0">Select Your Tee</option>';
        holes[0].teeBoxes.forEach(teeBox => {
            teeSelectionHTML += `<option value="${teeBox.teeTypeId}">${teeBox.teeType}</option>`;
        });
        document.getElementById('teeSelect').innerHTML = teeSelectionHTML;
    });
}

class Player {
    constructor(name, id = getNextId(), scores = []) {
        this.name = name;
        this.id = id;
        this.scores = scores;
    }
    addScore(score) {
        this.scores.push(score)
    }
}

const players = [];

function getNextId() {
    return 'player' + (players.length + 1);
}

function addPlayer(event) {
    let newPlayer = new Player(event.target.value);
    players.push(newPlayer);
    console.log(players)
}




// let coursePromise = getCourseInfo();
// coursePromise.then(data => {
//     const course = data.data;
//     course.holes.forEach(hole => {
//         console.log(`${hole.teeBoxes[0].par}`)
//         console.log(`${hole.teeBoxes[0].yards}`)
//         console.log(`${hole.teeBoxes[0].hcp}`)
//     })
// })