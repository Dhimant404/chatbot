import React, { useState, useEffect, useRef } from 'react';
import "./App.css"
import "@babel/polyfill";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const App = () => {
    const [lastTranscript, setLastTranscript] = useState('');
    const transcriptTimeoutRef = useRef(null);
    const [isListning,setIsListning]=useState(false);

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true });
        setIsListning(true)
        setLastTranscript(setLastTranscript);
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        setIsListning(false)
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

    // Visual element that changes color
    const visualIndicatorStyle = {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: isListning ? 'red' : 'green',
        margin: '10px auto'
    };

    return (
        <>
        <div className="container">
            <h1>Chatbot Frontend</h1>
            <br/>
            <p>This is the audio transcription window for the chatbot</p>
            <div style={visualIndicatorStyle}></div> {/* Visual indicator element */}

            
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
