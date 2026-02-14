// Sample student data for demo (replace with real from Google Sheets or API)
const students = {
  "stu001": {
    password: "pass123",
    name: "Tilak Sharma",
    class: "8th Grade",
    parentName: "Rajesh Sharma",
    phone: "+91 9876543210",
    academicYear: "2025-26",
    exams: [
      { exam: "Mid Term", subject: "Math", marksObtained: 88, maxMarks: 100 },
      { exam: "Mid Term", subject: "Science", marksObtained: 92, maxMarks: 100 },
      { exam: "Quarterly", subject: "English", marksObtained: 75, maxMarks: 100 },
      { exam: "Quarterly", subject: "Social Studies", marksObtained: 80, maxMarks: 100 },
    ],
  },
  // Add more student entries here if needed
};

const loginForm = document.getElementById("login-form");
const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const loginError = document.getElementById("login-error");

// Dashboard elements to populate
const studentNameElem = document.getElementById("student-name");
const studentNameFooter = document.getElementById("student-name-footer");
const studentClassElem = document.getElementById("student-class");
const parentNameElem = document.getElementById("parent-name");
const phoneElem = document.getElementById("phone");
const academicYearElem = document.getElementById("academic-year");
const studentIdDisplay = document.getElementById("student-id-display");

const overallPercentageElem = document.getElementById("overall-percentage");
const bestSubjectElem = document.getElementById("best-subject");
const needsImprovementElem = document.getElementById("needs-improvement");

const examTableBody = document.getElementById("exam-table-body");

const logoutBtn = document.getElementById("logout-btn");

// Utility: Calculate percentage
function calculatePercentage(marksObtained, maxMarks) {
  return ((marksObtained / maxMarks) * 100).toFixed(2);
}

// Calculate overall percentage, best subject, and needs improvement
function analyzeExams(exams) {
  if (!exams || exams.length === 0) {
    return {
      overall: "-",
      bestSubject: "-",
      needsImprovement: "-"
    };
  }

  let totalObtained = 0;
  let totalMax = 0;
  const subjectScores = {};

  exams.forEach(({subject, marksObtained, maxMarks}) => {
    totalObtained += marksObtained;
    totalMax += maxMarks;
    if (!subjectScores[subject]) subjectScores[subject] = [];
    subjectScores[subject].push(marksObtained / maxMarks);
  });

  const overall = ((totalObtained / totalMax) * 100).toFixed(2);

  // Average per subject
  const avgPerSubject = {};
  for (const sub in subjectScores) {
    const scores = subjectScores[sub];
    avgPerSubject[sub] = scores.reduce((a,b) => a + b, 0) / scores.length;
  }

  // Best subject = highest average
  const bestSubject = Object.entries(avgPerSubject).sort((a,b) => b[1] - a[1])[0][0];

  // Needs improvement = lowest average
  const needsImprovement = Object.entries(avgPerSubject).sort((a,b) => a[1] - b[1])[0][0];

  return {
    overall,
    bestSubject,
    needsImprovement
  };
}

function populateDashboard(studentId, studentData) {
  studentNameElem.textContent = studentData.name;
  studentNameFooter.textContent = studentData.name;
  studentClassElem.textContent = studentData.class;
  parentNameElem.textContent = studentData.parentName;
  phoneElem.textContent = studentData.phone;
  academicYearElem.textContent = studentData.academicYear;
  studentIdDisplay.textContent = studentId;

  // Populate exams table
  examTableBody.innerHTML = "";
  studentData.exams.forEach(({ exam, subject, marksObtained, maxMarks }) => {
    const percent = calculatePercentage(marksObtained, maxMarks);
    const row = `
      <tr>
        <td>${exam}</td>
        <td>${subject}</td>
        <td>${marksObtained}</td>
        <td>${maxMarks}</td>
        <td>${percent}%</td>
      </tr>`;
    examTableBody.insertAdjacentHTML("beforeend", row);
  });

  // KPIs
  const analysis = analyzeExams(studentData.exams);
  overallPercentageElem.textContent = analysis.overall + "%";
  bestSubjectElem.textContent = analysis.bestSubject;
  needsImprovementElem.textContent = analysis.needsImprovement;
}

// Handle login form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const studentId = loginForm.studentId.value.trim();
  const password = loginForm.password.value.trim();

  if (!studentId || !password) {
    loginError.textContent = "Please enter both Student ID and Password.";
    loginError.hidden = false;
    return;
  }

  const studentData = students[studentId];

  if (!studentData || studentData.password !== password) {
    loginError.textContent = "Invalid Student ID or Password.";
    loginError.hidden = false;
    return;
  }

  // Login success
  loginError.hidden = true;
  loginForm.reset();

  // Show dashboard
  loginSection.hidden = true;
  dashboardSection.hidden = false;

  populateDashboard(studentId, studentData);
});

// Logout button
logoutBtn.addEventListener("click", () => {
  dashboardSection.hidden = true;
  loginSection.hidden = false;
});
