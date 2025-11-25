// Save settings when checkboxes change
document.getElementById('hideRecommendations').addEventListener('change', function(e) {
  chrome.storage.local.set({ hideRecommendations: e.target.checked });
  sendMessageToContent({ action: 'toggleRecommendations', value: e.target.checked });
});

document.getElementById('hideComments').addEventListener('change', function(e) {
  chrome.storage.local.set({ hideComments: e.target.checked });
  sendMessageToContent({ action: 'toggleComments', value: e.target.checked });
});

document.getElementById('hideShorts').addEventListener('change', function(e) {
  chrome.storage.local.set({ hideShorts: e.target.checked });
  sendMessageToContent({ action: 'toggleShorts', value: e.target.checked });
});

// Load saved settings when popup opens
chrome.storage.local.get(['hideRecommendations', 'hideComments', 'hideShorts'], function(data) {
  document.getElementById('hideRecommendations').checked = data.hideRecommendations || false;
  document.getElementById('hideComments').checked = data.hideComments || false;
  document.getElementById('hideShorts').checked = data.hideShorts || false;
});

// Timer buttons
document.getElementById('startTimer').addEventListener('click', function() {
  sendMessageToContent({ action: 'startTimer' });
  document.getElementById('timerDisplay').textContent = 'Timer: Started!';
});

document.getElementById('stopTimer').addEventListener('click', function() {
  sendMessageToContent({ action: 'stopTimer' });
  document.getElementById('timerDisplay').textContent = 'Timer: Stopped';
});

// Summarize button
document.getElementById('summarizeBtn').addEventListener('click', async function() {
  const resultDiv = document.getElementById('summaryResult');
  resultDiv.textContent = 'Summarizing...';
  
  // Get current video ID
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const videoId = extractVideoId(tab.url);
  
  if (!videoId) {
    resultDiv.textContent = 'Error: Not a YouTube video';
    return;
  }
  
  // Call Python backend
  try {
    const response = await fetch('http://localhost:5000/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId: videoId })
    });
    
    const data = await response.json();
    resultDiv.textContent = data.summary || 'Summary generated! Check console.';
  } catch (error) {
    resultDiv.textContent = 'Error: Make sure Python backend is running';
  }
});

// Highlight transcript button
document.getElementById('highlightBtn').addEventListener('click', function() {
  sendMessageToContent({ action: 'highlightTranscript' });
});

// Helper function to send messages to content script
function sendMessageToContent(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

// Extract video ID from YouTube URL
function extractVideoId(url) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}
