// document.getElementById('Department').addEventListener('keyup', (event)=>{
//     document.getElementById('inputDepartment').innerText = event.target.value;
//     console.log(event.target.value);
// });

function eventGenerator (input, display){
    document.getElementById(input).addEventListener('keyup', (event)=>{
        document.getElementById(display).innerText = event.target.value;
        console.log(event.target.value);
    });
}


eventGenerator ('Department', 'inputDepartment');
eventGenerator ('username', 'inputUsername');
eventGenerator ('ID', 'inputId');
eventGenerator ('Semester', 'inputSemester');
eventGenerator ('Section', 'inputSection');
eventGenerator ('Email', 'inputEmail');
eventGenerator ('Contact', 'inputContact');
eventGenerator ('CourseCode', 'inputCourseCode');
eventGenerator ('CourseTitle', 'inputCourseTitle');
eventGenerator ('CourseTeacher', 'inputCourseTeacher');
eventGenerator ('TeacherDesignation', 'inputTeacherDesignation');
// eventGenerator ('Date', 'inputDate');

document.getElementById('Date').addEventListener('keyup', (event)=>{
    const d = new Date(event.target.value);
    document.getElementById('inputDate').innerText = `${d.getDate()}/${d.getMonth()+1}/${d.getUTCFullYear()}`;
});
document.getElementById('Date').addEventListener('mouseleave', (event)=>{
    const d = new Date(event.target.value);
    document.getElementById('inputDate').innerText = `${d.getDate()}/${d.getMonth()+1}/${d.getUTCFullYear()}`;
});
