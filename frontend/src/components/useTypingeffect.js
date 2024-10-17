import { useState, useEffect } from 'react';

export const useTypingEffect = (text, speed = 100) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            setDisplayText((prev) => prev + text[index]);
            index++;
            if (index === text.length) {
                clearInterval(typingInterval);
            }
        }, speed);

        return () => clearInterval(typingInterval); // Cleanup on unmount
    }, [text, speed]);

    return displayText;
};
