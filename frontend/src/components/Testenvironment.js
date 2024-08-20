import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import '../styles/Testenvironment.css';

const WebcamTest = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const bufferLengthRef = useRef(null);
  const dataArrayRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleCameraTest = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        setIsCameraEnabled(true);
        setErrorMessage("");
      })
      .catch(() => {
        setErrorMessage("Error: Webcam permission denied or not working. Please check your webcam.");
      });
  };

  const handleMicrophoneTest = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        setIsMicrophoneEnabled(true);
        setErrorMessage("");
        startAudioVisualization(stream);
      })
      .catch(() => {
        setErrorMessage("Error: Microphone permission denied or not working. Please check your microphone.");
      });
  };

  const startAudioVisualization = (stream) => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = audioContext;

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyserRef.current = analyser;

    const mediaStreamSource = audioContext.createMediaStreamSource(stream);
    mediaStreamSource.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    bufferLengthRef.current = bufferLength;

    const dataArray = new Uint8Array(bufferLength);
    dataArrayRef.current = dataArray;

    const draw = () => {
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i];
        canvasCtx.fillStyle = 'rgba(255, 0, 0, 0.7)';
        canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
        x += barWidth + 1;
      }
    };

    draw();
  };

  const handleUserMediaError = () => {
    setErrorMessage("Error: Webcam permission denied. Please allow webcam access.");
  };

  const handleStartTest = () => {
    if (!isCameraEnabled || !isMicrophoneEnabled) {
      setErrorMessage("Please test both the camera and microphone before proceeding.");
    } else {
      setErrorMessage("");  
      navigate('/mcq');  
    }
  };

  return (
    <div className="webcam-container">
      <div className="header">
        <div className="step arrow">Webcam Test</div>
        <div className="step arrow">Audio Test</div>
        <div className="step arrow">Start Test</div>
      </div>
      <div className="instructions">
        <h2>Instructions :</h2>
        <ul>
          <li>Please allow webcam permission to this link to check if your webcam is properly working or not.</li>
          <li>Please click on the "Test Camera" button to see if your webcam is functioning correctly.</li>
          <li>Click on the "Test Microphone" button to verify if your microphone is working.</li>
          <li>If the live webcam is not seen, please refresh the page.</li>
        </ul>
      </div>
      <div className="webcam-feed">
        <div className="webcam-section">
          <h3>Live Web Cam</h3>
          {errorMessage && <div className="error">{errorMessage}</div>}
          {isCameraEnabled && (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              onUserMediaError={handleUserMediaError}
              className="small-webcam"
            />
          )}
          <button className="test-btn" onClick={handleCameraTest}>Test Camera</button>
        </div>
        <div className="captured-section">
          <h3>Audio Test</h3>
          {isMicrophoneEnabled && (
            <canvas ref={canvasRef} className="audio-visualizer" width="600" height="150"></canvas>
          )}
          <button className="test-btn" onClick={handleMicrophoneTest}>Test Microphone</button>
        </div>
      </div>
      <button className="continue-btn" onClick={handleStartTest}>
        Start Test
      </button>
    </div>
  );
};

export default WebcamTest;
