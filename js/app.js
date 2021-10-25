function getAvailableCourses() {
    return fetch('https://golf-courses-api.herokuapp.com/courses/').then(
        function (response) {
            return response.json();
        }
    );
}
let courses = getAvailableCourses();
let courseSelectionHTML = '';
courses.forEach((course) => {
    courseSelectionHTML += `<option value="${course.id}">${course.name}</option>`
})