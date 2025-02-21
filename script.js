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
  const paragraphs = parseInt(document.getElementById('paragraphs').value);

  // Generate a detailed story
  const story = generateStory(genre, character, setting, paragraphs);

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
  const lines = doc.splitTextToSize(story, 180);
  doc.text(lines, 10, 30);

  // Save the PDF as a Blob
  const pdfBlob = doc.output('blob');

  // Use FileSaver.js to trigger the download
  saveAs(pdfBlob, 'epic-story.pdf');
});

// Clear Text
document.getElementById('clear-text').addEventListener('click', function () {
  document.getElementById('story-form').reset();
  document.getElementById('generated-story').textContent = '';
  document.getElementById('story-preview').classList.add('hidden');
});

// Story Generator Function
function generateStory(genre, character, setting, paragraphs) {
  const plotPoints = [
    `In a world of ${setting}, ${character} faced an unexpected challenge.`,
    `As ${character} ventured deeper into ${setting}, they discovered a hidden truth.`,
    `The journey tested ${character}'s courage and resolve.`,
    `With each step, ${character} grew stronger and wiser.`,
    `In the end, ${character} emerged victorious, forever changed by their epic ${genre} adventure.`,
  ];

  let story = '';
  for (let i = 0; i < paragraphs; i++) {
    story += plotPoints[i % plotPoints.length] + '\n\n';
  }
  return story.trim();
}
