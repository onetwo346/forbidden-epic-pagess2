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

  // Save the story to localStorage
  localStorage.setItem('generatedStory', story);
  localStorage.setItem('genre', genre);
  localStorage.setItem('character', character);
  localStorage.setItem('setting', setting);
  localStorage.setItem('paragraphs', paragraphs);

  // Display the story
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

  // Create a temporary URL for the Blob
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Create a hidden <a> tag to handle the download
  const a = document.createElement('a');
  a.href = pdfUrl;
  a.download = 'epic-story.pdf';
  a.style.display = 'none';
  document.body.appendChild(a);

  // Fallback for Safari on iOS
  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    // Open the PDF in a new tab for Safari on iOS
    window.open(pdfUrl, '_blank');
  } else {
    // Trigger the download for other devices
    a.click();
  }

  // Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(pdfUrl);
});

// Clear Text
document.getElementById('clear-text').addEventListener('click', function () {
  document.getElementById('story-form').reset();
  document.getElementById('generated-story').textContent = '';
  document.getElementById('story-preview').classList.add('hidden');

  // Clear localStorage
  localStorage.removeItem('generatedStory');
  localStorage.removeItem('genre');
  localStorage.removeItem('character');
  localStorage.removeItem('setting');
  localStorage.removeItem('paragraphs');
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

// Restore Story on Page Load
window.addEventListener('load', function () {
  const savedStory = localStorage.getItem('generatedStory');

  if (savedStory) {
    // Skip the intro page and go straight to the main page
    showMainPage();

    // Restore the story and form inputs
    document.getElementById('generated-story').textContent = savedStory;
    document.getElementById('genre').value = localStorage.getItem('genre');
    document.getElementById('character').value = localStorage.getItem('character');
    document.getElementById('setting').value = localStorage.getItem('setting');
    document.getElementById('paragraphs').value = localStorage.getItem('paragraphs');
    document.getElementById('story-preview').classList.remove('hidden');
  }
});
