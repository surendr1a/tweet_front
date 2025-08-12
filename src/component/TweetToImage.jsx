import React, { useState } from 'react';

const TweetToImage = () => {
  const [tweetUrl, setTweetUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState('');
  
  // Image modification states
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [brightness, setBrightness] = useState(100);
  const [grayscale, setGrayscale] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tweetUrl) {
      setError('Please enter a valid Tweet URL.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log("📤 Sending request to backend with URL:", tweetUrl);
      const res = await fetch("https://tweet-back.onrender.com/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tweetUrl })
      });
      const data = await res.json();

      console.log("📥 Response from backend:", data);

      if (data.image) {
        setImageUrl(data.image);
      }
      setLoading(false);
    } catch (err) {
      console.error("❌ Error in frontend while fetching:", err);
      setLoading(false);
      setError('Oops! Something went wrong.');
    }
  };

  const resetImage = () => {
    setRotation(0);
    setScale(1);
    setBrightness(100);
    setGrayscale(false);
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'tweet-image.png';
    link.click();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-indigo-600 to-purple-800 p-6">
      
      {/* Left Panel - URL Input */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Tweet to Image</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={tweetUrl}
            onChange={(e) => setTweetUrl(e.target.value)}
            placeholder="Enter Tweet URL"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className={`w-full py-3 text-white rounded-md ${
              loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } transition-all duration-300`}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Image'}
          </button>
        </form>
      </div>

      {/* Right Panel - Image + Tools */}
      <div className="flex-1 ml-6 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        {!imageUrl && <p className="text-gray-500">Your image will appear here after generation.</p>}
        
        {imageUrl && (
          <>
            {/* Image Preview */}
            <div className="mb-4 overflow-hidden border rounded-lg shadow-lg max-w-full max-h-[500px] flex items-center justify-center bg-gray-50">
              <img
                src={imageUrl}
                alt="Generated Tweet"
                style={{
                  transform: `rotate(${rotation}deg) scale(${scale})`,
                  filter: `brightness(${brightness}%) grayscale(${grayscale ? 100 : 0}%)`,
                  transition: 'transform 0.3s ease, filter 0.3s ease'
                }}
              />
            </div>

            {/* Tools */}
            <div className="flex flex-wrap gap-3 mb-4">
              <button onClick={() => setRotation(r => r - 90)} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">↺ Rotate Left</button>
              <button onClick={() => setRotation(r => r + 90)} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">↻ Rotate Right</button>
              <button onClick={() => setScale(s => s + 0.1)} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">➕ Zoom In</button>
              <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">➖ Zoom Out</button>
              <button onClick={() => setBrightness(b => b + 10)} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">☀ Bright+</button>
              <button onClick={() => setBrightness(b => b - 10)} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">🌙 Bright-</button>
              <button onClick={() => setGrayscale(g => !g)} className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">🎨 Gray</button>
              <button onClick={resetImage} className="px-3 py-2 bg-red-200 text-red-700 rounded hover:bg-red-300">🔄 Reset</button>
            </div>

            {/* Download Button */}
            <button
              onClick={downloadImage}
              className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-all"
            >
              ⬇ Download Image
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TweetToImage;
