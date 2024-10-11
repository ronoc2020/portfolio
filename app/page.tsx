@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Montserrat:wght@400;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary-color: #8a2be2;
  --secondary-color: #4b0082;
  --accent-color: #a855f7;
  --background-color: #1a0033;
  --text-color: #ffffff;
  --card-bg-color: rgba(138, 43, 226, 0.2);
  --hover-card-shadow: rgba(138, 43, 226, 0.5);
  --button-bg-color: #d10707;
  --button-hover-bg-color: #a80707;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
  color: var(--primary-color);
}

a {
  color: var(--accent-color);
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: var(--primary-color);
  }
}

.glow-text {
  text-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color), 0 0 30px var(--primary-color);
}

.hover-text {
  transition: color 0.3s ease-in-out, text-shadow 0.3s ease-in-out;

  &:hover {
    color: var(--accent-color);
    text-shadow: 0 0 10px var(--accent-color);
  }
}

.hover-section {
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px var(--hover-card-shadow);
  }
}

.hover-card {
  @apply bg-opacity-20 rounded-lg p-5;
  background-color: var(--card-bg-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px var(--hover-card-shadow);
  }
}

.lightsaber {
  position: fixed;
  width: 4px;
  height: 0;
  background-color: #fff;
  box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff;
  animation: lightsaber-glow 2s ease-in-out infinite alternate;
}

.lightsaber-1 {
  top: 0;
  left: 10%;
  transform-origin: top;
  animation: lightsaber-1 10s linear infinite;
}

.lightsaber-2 {
  bottom: 0;
  right: 10%;
  transform-origin: bottom;
  animation: lightsaber-2 12s linear infinite;
}

@keyframes lightsaber-glow {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}

@keyframes lightsaber-1 {
  0% { height: 0; transform: rotate(45deg); }
  50% { height: 100vh; }
  100% { height: 0; transform: rotate(405deg); }
}

@keyframes lightsaber-2 {
  0% { height: 0; transform: rotate(-45deg); }
  50% { height: 100vh; }
  100% { height: 0; transform: rotate(-405deg); }
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
    align-items: center;
  }

  // Button styles
  .report-issue-btn,
  .submit-btn {
    background-color: var(--button-bg-color);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: var(--button-hover-bg-color);
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }
  }

  // Input field styles
  input,
  textarea {
    color: black !important;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: var(--button-bg-color);
      box-shadow: 0 0 5px var(--button-bg-color);
    }
  }

  .form-group {
    margin-bottom: 16px;
  }

  label {
    font-weight: bold;
    margin-bottom: 8px;
    display: block;
    color: var(--text-color);
  }

  nav a {
    margin: 5px 0;
    color: var(--text-color);
    transition: color 0.3s ease-in-out;

    &:hover {
      color: var(--accent-color);
    }
  }
}
