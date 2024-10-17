import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Assuming you have some common styling here
import { useTypingEffect } from './useTypingEffect'; // Import the custom hook

const InternalServerErrorPage = ({ errorMessage }) => {
    const typedText = useTypingEffect('500 - Internal Server Error', 100); // Speed of 100ms per character

    return (
        <div className="error-page">
            <div className="container text-center">
                <h1>{typedText}</h1> {/* Typing effect applied here */}
                <p>{errorMessage || 'Oops! Something went wrong on our end. Please try again later.'}</p>
                <Link to="/" className="btn btn-primary">Go Back Home</Link>
            </div>
        </div>
    );
};

export default InternalServerErrorPage;
