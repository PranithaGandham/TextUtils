import React from 'react';

export default function About() {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">About Us</h1>
      <p className="lead text-justify">
        Welcome to our Text Analysis tool! Designed for students, writers, and professionals, our website provides quick insights into your text to help improve readability and understanding.
      </p>
      <p className="text-justify">
        Here’s what you can expect:
        <ul>
          <li>Enter any text, and our tool will provide a comprehensive summary with word and character counts.</li>
          <li>Get an estimated read time based on your text length—ideal for helping you gauge content for presentations or articles.</li>
          <li>See a real-time preview of your text and its analysis, ensuring you can make necessary edits and adjustments instantly.</li>
        </ul>
      </p>
    </div>
  );
}
