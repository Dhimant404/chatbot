import React, { useState, useEffect, useRef } from 'react';
import "./App.css"
import "@babel/polyfill";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const App = () => {
    const [lastTranscript, setLastTranscript] = useState('');
    const transcriptTimeoutRef = useRef(null);

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true });
        setLastTranscript('');
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        if (transcriptTimeoutRef.current) {
            clearTimeout(transcriptTimeoutRef.current);
        }
    }

    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    useEffect(() => {
        if (transcript !== lastTranscript) {
            setLastTranscript(transcript);
            if (transcriptTimeoutRef.current) {
                clearTimeout(transcriptTimeoutRef.current);
            }
            transcriptTimeoutRef.current = setTimeout(() => {
                stopListening();
            }, 3000); // 3 seconds
        }
    }, [transcript]);

    if (!browserSupportsSpeechRecognition) {
        return null;
    }

    return (
        <>
        <div className="container">
            <h1>Chatbot Frontend</h1>
            <br/>
            <p>This is the audio transcription window for the chatbot</p>
            <div className="main-content">
                {transcript}
            </div>

            <div className="btn-style">
                <button onClick={startListening}>Start Listening</button>
                <button onClick={stopListening}>Stop Listening</button>
            </div>
        </div>
        </>
    );
};

export default App;
