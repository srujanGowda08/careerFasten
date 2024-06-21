function generateResume() {
  const { jsPDF } = window.jspdf;

  // Getting the form values
  const name = document.getElementById("name").value;
  const degree = document.getElementById("degree").value;
  const objective = document.getElementById("objective").value;
  const technicalSkills = document.getElementById("technicalSkills").value;
  const personalSkills = document.getElementById("personalSkills").value;
  const address = document.getElementById("address").value;
  const contact = document.getElementById("contact").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const education = document.getElementById("education").value;
  const achievements = document.getElementById("achievements").value;
  const experience = document.getElementById("experience").value;

  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Adding content to the PDF
  doc.setFontSize(22);
  doc.setTextColor(0, 0, 0);
  doc.text(name, 20, 20);

  doc.setFontSize(16);
  doc.setTextColor(0, 150, 150);
  doc.text(degree, 20, 30);

  doc.setDrawColor(0, 150, 150);
  doc.line(20, 35, 190, 35); // horizontal line

  doc.setFontSize(14);
  doc.setTextColor(0, 150, 150);
  doc.text("CAREER OBJECTIVE", 20, 45);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(objective, 20, 50, { maxWidth: 170 });

  doc.setFontSize(14);
  doc.setTextColor(0, 150, 150);
  doc.text("TECHNICAL SKILLS", 20, 70);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(technicalSkills, 20, 75, { maxWidth: 170 });

  doc.setFontSize(14);
  doc.setTextColor(0, 150, 150);
  doc.text("PERSONAL SKILLS", 20, 95);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(personalSkills, 20, 100, { maxWidth: 170 });

  doc.setFontSize(14);
  doc.setTextColor(0, 150, 150);
  doc.text("ADDRESS", 140, 45);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(address, 140, 50, { maxWidth: 50 });

  doc.setFontSize(14);
  doc.setTextColor(0, 150, 150);
  doc.text("CONTACT", 140, 70);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(contact, 140, 75);

  doc.setFontSize(14);
  doc.setTextColor(0, 150, 150);
  doc.text("E-MAIL", 140, 85);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(email, 140, 90);

  doc.setFontSize(14);
  doc.setTextColor(0, 150, 150);
  doc.text("DATE OF BIRTH", 140, 105);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(dob, 140, 110);

  doc.setFontSize(14);
  doc.setTextColor(0, 150, 150);
  doc.text("EDUCATION", 20, 120);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(education, 20, 125, { maxWidth: 170 });

  doc.setFontSize(14);
  doc.setTextColor(0, 150, 150);
  doc.text("ACHIEVEMENTS/RESPONSIBILITIES", 20, 145);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(achievements, 20, 150, { maxWidth: 170 });

  doc.setFontSize(14);
  doc.setTextColor(0, 150, 150);
  doc.text("PRE-PROFESSIONAL EXPERIENCE", 20, 170);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(experience, 20, 175, { maxWidth: 170 });

  // Save the PDF
  doc.save(`${name}_Resume.pdf`);
}
