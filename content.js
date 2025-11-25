console.log('YouTube Productivity Extension loaded!');

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'toggleRecommendations') {
    toggleRecommendations(request.value);
  } else if (request.action === 'toggleComments') {
    toggleComments(request.value);
  } else if (request.action === 'toggleShorts') {
    toggleShorts(request.value);
  } else if (request.action === 'startTimer') {
    startPomodoroTimer();
  } else if (request.action === 'stopTimer') {
    stopPomodoroTimer();
  } else if (request.action === 'highlightTranscript') {
    highlightTranscript();
  }
});

// Feature 1: Hide Recommended Videos
function toggleRecommendations(hide) {
  const selectors = [
    'ytd-compact-video-renderer',
    'ytd-video-renderer',
    '#related',
    '#secondary'
  ];
  
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.style.display = hide ? 'none' : '';
    });
  });
}

// Feature 2: Hide Comments
function toggleComments(hide) {
  const comments = document.querySelector('ytd-comments');
  if (comments) {
    comments.style.display = hide ? 'none' : '';
  }
}

// Feature 3: Hide Shorts
function toggleShorts(hide) {
  const shorts = document.querySelectorAll('ytd-reel-shelf-renderer, [title*="Shorts"]');
  shorts.forEach(element => {
    element.style.display = hide ? 'none' : '';
  });
}

// Feature 4: Pomodoro Timer
let timerInterval = null;
let timeRemaining = 25 * 60; // 25 minutes in seconds

function startPomodoroTimer() {
  // Create timer overlay if it doesn't exist
  let timerDiv = document.getElementById('productivity-timer');
  if (!timerDiv) {
    timerDiv = document.createElement('div');
    timerDiv.id = 'productivity-timer';
    timerDiv.className = 'timer-overlay';
    document.body.appendChild(timerDiv);
  }
  
  timerInterval = setInterval(function() {
    timeRemaining--;
    
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDiv.textContent = `Focus Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timerDiv.textContent = 'Time for a break!';
      timeRemaining = 25 * 60; // Reset
    }
  }, 1000);
}

function stopPomodoroTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  const timerDiv = document.getElementById('productivity-timer');
  if (timerDiv) {
    timerDiv.remove();
  }
  timeRemaining = 25 * 60; // Reset
}

// Feature 5: Highlight Transcript Keywords
function highlightTranscript() {
  // Find transcript elements
  const transcriptSegments = document.querySelectorAll('ytd-transcript-segment-renderer');
  
  const keywords = ['important', 'definition', 'steps', 'conclusion', 'remember', 'key point'];
  
  transcriptSegments.forEach(segment => {
    const textElement = segment.querySelector('.segment-text');
    if (textElement) {
      let text = textElement.textContent;
      
      keywords.forEach(keyword => {
        const regex = new RegExp(`(${keyword})`, 'gi');
        text = text.replace(regex, '<mark style="background-color: yellow;">$1</mark>');
      });
      
      textElement.innerHTML = text;
    }
  });
  
  alert('Transcript highlighted! Open the transcript to see highlighted keywords.');
}

// Load saved settings when page loads
chrome.storage.local.get(['hideRecommendations', 'hideComments', 'hideShorts'], function(data) {
  if (data.hideRecommendations) toggleRecommendations(true);
  if (data.hideComments) toggleComments(true);
  if (data.hideShorts) toggleShorts(true);
});

