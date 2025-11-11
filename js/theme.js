const toggle = document.getElementById('theme-toggle');

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
