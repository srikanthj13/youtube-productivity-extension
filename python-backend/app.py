from flask import Flask, request, jsonify
from flask_cors import CORS
from youtube_transcript_api import YouTubeTranscriptApi

app = Flask(__name__)
CORS(app)

@app.route('/summarize', methods=['POST'])
def get_transcript():
    """
    Gets the transcript using the new API method
    """
    data = request.json
    video_id = data.get('videoId')
    
    if not video_id:
        return jsonify({'error': 'No video ID provided'}), 400
    
    try:
        print(f"Fetching transcript for video: {video_id}")
        
        # NEW METHOD: Create an instance first, then use .fetch()
        ytt_api = YouTubeTranscriptApi()
        fetched_transcript = ytt_api.fetch(video_id)
        
        print(f"Successfully fetched transcript!")
        
        # Convert to raw data format
        transcript_data = fetched_transcript.to_raw_data()
        
        # Combine all text
        full_text = ' '.join([item['text'] for item in transcript_data])
        
        print(f"Full transcript length: {len(full_text)} characters")
        
        # Create a simple summary (first 500 characters)
        if len(full_text) > 500:
            summary = full_text[:500] + "..."
        else:
            summary = full_text
        
        print("Summary generated successfully!")
        return jsonify({
            'success': True,
            'summary': summary,
            'full_length': len(full_text)
        })
        
    except Exception as e:
        error_message = str(e)
        print(f"Error: {error_message}")
        return jsonify({
            'success': False,
            'error': error_message
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'Server is running! ✅'})

if __name__ == '__main__':
    print("\n🚀 Starting YouTube Productivity Backend...")
    print("Server will run on http://localhost:5000")
    print("= " * 50)
    app.run(debug=True, port=5000)
