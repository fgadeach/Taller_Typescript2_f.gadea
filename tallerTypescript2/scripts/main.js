import { dataCourses } from './dataCourses.js';
import { studentDetail } from './studentDetail.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByRange = document.getElementById("button-filterByRange");
var inputSearchBox = document.getElementById("search-box");
var inputBajo = document.getElementById("search-box1");
var inputAlto = document.getElementById("search-box2");
var totalCreditElm = document.getElementById("total-credits");
var studentTbody = document.getElementById('students');
renderDetailsInTable(studentDetail);
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByRange.onclick = function () { return applyFilterByCredit(); };
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderDetailsInTable(students) {
    console.log('Desplegando cursos');
    students.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + student.name + "</td>\n                           <td>" + student.descripcion + "</td>";
        studentTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredit() {
    var text = inputBajo.value;
    var text1 = inputAlto.value;
    text = (text == null) ? '' : text;
    text1 = (text1 == null) ? '' : text1;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCreditDown(text, text1, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCreditDown(nameDown, nameUp, courses) {
    return nameDown === '' ? dataCourses : courses.filter(function (c) {
        return c.credits >= parseInt(nameDown) && c.credits <= parseInt(nameUp);
    });
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
