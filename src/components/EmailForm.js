// EmailForm.js
import React, { useState } from 'react';

function EmailForm() {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5001/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to, subject, text }),
        });

        if (response.ok) {
            alert('Email sent successfully!');
        } else {
            alert('Failed to send email.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    To:
                    <input type="email" value={to} onChange={(e) => setTo(e.target.value)} required />
                </label>
            </div>
            <div>
                <label>
                    Subject:
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </label>
            </div>
            <div>
                <label>
                    Message:
                    <textarea value={text} onChange={(e) => setText(e.target.value)} required />
                </label>
            </div>
            <button type="submit">Send Email</button>
        </form>
    );
}

export default EmailForm;