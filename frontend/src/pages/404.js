import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Assuming you have some common styling here
import { useTypingEffect } from './useTypingEffect'; // Import the custom hook

const BadRequestPage = ({ errorMessage }) => {
    const typedText = useTypingEffect('400 - Bad Request', 100); // Speed of 100ms per character

    return (
        <div className="error-page container-fluid">
            <center>
                <div className="container text-center">
                    <h1 className='col-md-12 text-center'>{typedText}</h1> {/* Typing effect applied here */}
                    <p>{errorMessage || 'Sorry, the request could not be processed due to a client-side issue.'}</p>
                    <Link to="/" className="btn btn-primary">Go Back Home</Link>
                </div>
            </center>
        </div>
    );
};

export default BadRequestPage;
