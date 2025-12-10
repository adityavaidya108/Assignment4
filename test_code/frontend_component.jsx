// React component with XSS vulnerabilities
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
    const [userData, setUserData] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetch(`/api/user/${userId}`)
            .then(res => res.json())
            .then(data => setUserData(data));
    }, [userId]);

    // XSS vulnerability - innerHTML with user input
    function displayUserBio(bio) {
        const bioDiv = document.getElementById('user-bio');
        // Dangerous: Direct innerHTML assignment
        bioDiv.innerHTML = bio;
    }

    // XSS vulnerability - dangerouslySetInnerHTML
    function renderComment(userComment) {
        return (
            <div dangerouslySetInnerHTML={{ __html: userComment }} />
        );
    }

    // XSS vulnerability - document.write
    function showNotification(message) {
        // Dangerous: document.write with user input
        document.write(`<div class="notification">${message}</div>`);
    }

    // Safe usage - should be false positive
    function safeDisplay(content) {
        const div = document.getElementById('safe-content');
        // Safe: Using textContent instead of innerHTML
        div.textContent = content;
    }

    // Code injection vulnerability
    function executeUserScript(userScript) {
        // Dangerous: Using eval with user input
        eval(userScript);
    }

    // Another code injection - setTimeout with string
    function delayedExecution(code) {
        // Dangerous: setTimeout with string code
        setTimeout(code, 1000);
    }

    return (
        <div>
            <h1>User Profile</h1>
            {userData && (
                <div>
                    <p>{userData.name}</p>
                    {renderComment(userData.comment)}
                </div>
            )}
        </div>
    );
}

export default UserProfile;



