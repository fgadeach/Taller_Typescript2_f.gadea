import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { studentDetail } from './studentDetail.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;


const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByRange: HTMLElement = document.getElementById("button-filterByRange")!;


const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputBajo: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box1")!;
const inputAlto: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box2")!;

const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

let studentTbody: HTMLElement = document.getElementById('students')!;
renderDetailsInTable(studentDetail);


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByRange.onclick = () => applyFilterByCredit();

renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function renderDetailsInTable(students: Student[]): void {
  console.log('Desplegando cursos');
  students.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${student.name}</td>
                           <td>${student.descripcion}</td>`;
    studentTbody.appendChild(trElement);
  });
}
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredit() { 
  let text = inputBajo.value;
  let text1 = inputAlto.value;
  text = (text == null) ? '' : text;
  text1 = (text1 == null) ? '' : text1;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCreditDown(text,text1,dataCourses) ;
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByCreditDown(nameDown: string, nameUp: string,courses: Course[]) {
  return nameDown === '' ? dataCourses : courses.filter( c => 
    c.credits >= parseInt( nameDown) && c.credits <= parseInt(nameUp));
}



function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}
