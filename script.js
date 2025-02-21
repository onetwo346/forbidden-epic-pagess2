// Show Main Page
function showMainPage() {
  document.getElementById('intro-page').classList.add('hidden');
  document.getElementById('main-page').classList.remove('hidden');
}

// Generate Story
document.getElementById('story-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const genre = document.getElementById('genre').value;
  const character = document.getElementById('character').value;
  const setting = document.getElementById('setting').value;

  // Generate a placeholder story
  const story = `Once upon a time, in a ${setting}, there was a ${character} who embarked on an epic ${genre} adventure...`;

  document.getElementById('generated-story').textContent = story;
  document.getElementById('story-preview').classList.remove('hidden');
});

// Download PDF
document.getElementById('download-pdf').addEventListener('click', function () {
  const story = document.getElementById('generated-story').textContent;

  // Use jsPDF to create a PDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Your Epic Story', 10, 20);
  doc.setFontSize(12);
  doc.text(story, 10, 30, { maxWidth: 180 });

  // Save the PDF
  doc.save('epic-story.pdf');
});
