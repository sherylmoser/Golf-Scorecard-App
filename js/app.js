function getAvailableCourses() {
    return new Promise((resolve, reject) => {
        fetch('https://golf-courses-api.herokuapp.com/courses/')
            .then(response => response.json())
            .then(data => resolve(data));
    });
}
let coursesPromise = getAvailableCourses();

coursesPromise.then(() => {
    for (let course in courses) {
        console.log(course.name)
    }
}

)

// let courseSelectionHTML = '';
// courses.forEach((course) => {
//     courseSelectionHTML += `<option value="${course.id}">${course.name}</option>`
// })