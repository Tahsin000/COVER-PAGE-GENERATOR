// DOM Elements
const formInputs = {
  departmentName: document.getElementById('departmentName'),
  courseCode: document.getElementById('courseCode'),
  courseTitle: document.getElementById('courseTitle'),
  assignmentNo: document.getElementById('assignmentNo'),
  assignmentName: document.getElementById('assignmentName'),
  studentName: document.getElementById('studentName'),
  studentId: document.getElementById('studentId'),
  batch: document.getElementById('batch'),
  program: document.getElementById('program'),
  submissionDate: document.getElementById('submissionDate'),
  teacherName: document.getElementById('teacherName'),
  teacherDepartment: document.getElementById('teacherDepartment')
};

const displayElements = {
  department: document.getElementById('displayDepartment'),
  courseCode: document.getElementById('displayCourseCode'),
  courseTitle: document.getElementById('displayCourseTitle'),
  assignmentNo: document.getElementById('displayAssignmentNo'),
  assignmentName: document.getElementById('displayAssignmentName'),
  studentName: document.getElementById('displayStudentName'),
  studentId: document.getElementById('displayStudentId'),
  batch: document.getElementById('displayBatch'),
  program: document.getElementById('displayProgram'),
  date: document.getElementById('displayDate'),
  teacherName: document.getElementById('displayTeacherName'),
  teacherDept: document.getElementById('displayTeacherDept')
};

// const exportPdfBtn = document.getElementById('exportPdf');
const exportImageBtn = document.getElementById('exportImage');
const coverPage = document.getElementById('coverPage');

// Live Preview Updates
function updatePreview(inputId, displayElement, defaultValue = '-') {
  const input = formInputs[inputId];
  if (input) {
    input.addEventListener('input', function() {
      const value = this.value.trim() || defaultValue;
      if (displayElement) {
        displayElement.textContent = value;
        saveToLocalStorage(inputId, this.value);
      }
    });
  }
}

// Initialize all preview updates
updatePreview('departmentName', displayElements.department, 'Department Name');
updatePreview('courseCode', displayElements.courseCode);
updatePreview('courseTitle', displayElements.courseTitle);
updatePreview('assignmentNo', displayElements.assignmentNo);
updatePreview('assignmentName', displayElements.assignmentName);
updatePreview('studentName', displayElements.studentName);
updatePreview('studentId', displayElements.studentId);
updatePreview('batch', displayElements.batch);
updatePreview('program', displayElements.program);
updatePreview('teacherName', displayElements.teacherName);
updatePreview('teacherDepartment', displayElements.teacherDept);

// Date formatting
formInputs.submissionDate.addEventListener('change', function() {
  const date = new Date(this.value);
  if (!isNaN(date.getTime())) {
    const formatted = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    displayElements.date.textContent = formatted;
    saveToLocalStorage('submissionDate', this.value);
  } else {
    displayElements.date.textContent = '-';
  }
});

// Local Storage Functions
function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(`coverGen_${key}`, value);
  } catch (e) {
    console.error('LocalStorage error:', e);
  }
}

function loadFromLocalStorage() {
  Object.keys(formInputs).forEach(key => {
    const savedValue = localStorage.getItem(`coverGen_${key}`);
    if (savedValue && formInputs[key]) {
      formInputs[key].value = savedValue;
      formInputs[key].dispatchEvent(new Event('input'));
      if (key === 'submissionDate') {
        formInputs[key].dispatchEvent(new Event('change'));
      }
    }
  });
}

// PDF Export - FIXED to work properly
// exportPdfBtn.addEventListener('click', async function() {
//   if (!validateForm()) {
//     alert('⚠️ Please fill in all required fields before exporting!');
//     return;
//   }
  
//   this.disabled = true;
//   this.innerHTML = '⏳ Generating PDF...';
  
//   try {
//     // Use the original coverPage element directly
//     const opt = {
//       margin: 0,
//       filename: `Assignment_Cover_${Date.now()}.pdf`,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { 
//         scale: 2,
//         useCORS: true,
//         logging: false,
//         letterRendering: true,
//         allowTaint: true,
//         scrollY: 0,
//         scrollX: 0
//       },
//       jsPDF: { 
//         unit: 'mm', 
//         format: 'a4', 
//         orientation: 'portrait',
//         compress: true
//       },
//       pagebreak: { mode: 'avoid-all' }
//     };
    
//     // Convert using html2pdf
//     await html2pdf().set(opt).from(coverPage).save();
    
//     // Success feedback
//     this.innerHTML = 'PDF Downloaded!';
//     setTimeout(() => {
//       this.innerHTML = 'Download as PDF';
//       this.disabled = false;
//     }, 2000);
//   } catch (error) {
//     console.error('PDF generation error:', error);
//     this.innerHTML = '❌ Error! Try again';
//     setTimeout(() => {
//       this.innerHTML = 'Download as PDF';
//       this.disabled = false;
//     }, 2000);
//   }
// });

// Image Export - A4 format on all devices
exportImageBtn.addEventListener('click', async function() {
  if (!validateForm()) {
    alert('⚠️ Please fill in all required fields before exporting!');
    return;
  }
  
  this.disabled = true;
  this.innerHTML = '⏳ Generating Image...';
  
  try {
    // Clone the cover page to avoid affecting the display
    const clone = coverPage.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    
    // Force A4 dimensions (210mm x 297mm at 96 DPI = 794px x 1123px)
    clone.style.width = '794px';
    clone.style.height = '1123px';
    clone.style.transform = 'none';
    clone.style.padding = '37.8px 45.4px'; // 10mm x 12mm in pixels
    
    document.body.appendChild(clone);
    
    // Capture at high resolution for A4 output
    const canvas = await html2canvas(clone, {
      scale: 3,
      useCORS: true,
      logging: false,
      allowTaint: true,
      scrollY: 0,
      scrollX: 0,
      backgroundColor: '#ffffff',
      width: 794,
      height: 1123
    });
    
    // Remove clone
    document.body.removeChild(clone);
    
    // Convert to blob and download
    canvas.toBlob(function(blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `Assignment_Cover_${Date.now()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      
      // Success feedback
      exportImageBtn.innerHTML = 'Image Downloaded!';
      setTimeout(() => {
        exportImageBtn.innerHTML = 'Download as Image';
        exportImageBtn.disabled = false;
      }, 2000);
    }, 'image/png', 1.0);
    
  } catch (error) {
    console.error('Image generation error:', error);
    // Clean up clone if it exists
    const clone = document.querySelector('[style*="-9999px"]');
    if (clone) document.body.removeChild(clone);
    
    this.innerHTML = '❌ Error! Try again';
    setTimeout(() => {
      this.innerHTML = 'Download as Image';
      this.disabled = false;
    }, 2000);
  }
});

// Form Validation
function validateForm() {
  const requiredFields = [
    'courseCode', 'courseTitle', 'assignmentNo', 'assignmentName',
    'studentName', 'studentId', 'batch', 'program', 
    'submissionDate', 'teacherName'
  ];
  
  let isValid = true;
  requiredFields.forEach(field => {
    if (!formInputs[field].value.trim()) {
      isValid = false;
    }
  });
  
  return isValid;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Load saved data
  loadFromLocalStorage();
  
  // Set today's date as default if not set
  if (!formInputs.submissionDate.value) {
    const today = new Date().toISOString().split('T')[0];
    formInputs.submissionDate.value = today;
    formInputs.submissionDate.dispatchEvent(new Event('change'));
  }
  
  console.log('✅ Assignment Cover Generator initialized!');
});

// Auto-save indicator
let saveTimeout;
Object.keys(formInputs).forEach(key => {
  if (formInputs[key] && formInputs[key].addEventListener) {
    formInputs[key].addEventListener('input', function() {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        console.log('💾 Auto-saved');
      }, 1000);
    });
  }
});
