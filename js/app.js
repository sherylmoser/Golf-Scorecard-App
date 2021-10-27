function getAvailableCourses() {
    return new Promise((resolve, reject) => {
        fetch('https://golf-courses-api.herokuapp.com/courses/')
            .then(response => response.json())
            .then(data => resolve(render(data.courses)));
    });
}
function render(courses) {
    let courseSelectionHTML = '';
    courses.forEach((course) => {
        courseSelectionHTML += `<option value="${course.id}">${course.name}</option>`
    })
    document.getElementById('courseSelect').innerHTML = courseSelectionHTML;
}
getAvailableCourses()

let selectedCourse = document.getElementById('courseSelect').selectedIndex.text;


function getAvailableTees() {
    return new Promise((resolve, reject) => {
        fetch()
    })
}
