function getAvailableCourses() {
    return fetch('https://golf-courses-api.herokuapp.com/courses/')
        .then(response => response.json())
        .then(data => courseSelectionRender(data.courses));
}
function courseSelectionRender(courses) {
    let courseSelectionHTML = '';
    courses.forEach((course) => {
        courseSelectionHTML += `<option value="${course.id}">${course.name}</option>`
    })
    document.getElementById('courseSelect').innerHTML = courseSelectionHTML;
}
getAvailableCourses();

function onCourseSelection(event) {
    const courseId = event.target.value
    getCourseInfo(courseId).then(data => {
        const course = data.data;
    })
}


function getCourseInfo(courseId) {
    return fetch(`https://golf-courses-api.herokuapp.com/courses/${courseId}`)
        .then((response) => response.json());
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