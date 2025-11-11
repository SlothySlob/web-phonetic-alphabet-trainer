// Determine the initial theme
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

// Apply it to <html>
document.documentElement.setAttribute('data-theme', theme);