const toggle = document.getElementById('theme-toggle');

// Determine the initial theme
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

// Apply it to <html>
document.documentElement.setAttribute('data-theme', theme);

// Make the checkbox reflect the current theme
if (toggle) {
  toggle.checked = theme === 'dark';

  // Listen for checkbox changes
  toggle.addEventListener('change', () => {
    const newTheme = toggle.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}
