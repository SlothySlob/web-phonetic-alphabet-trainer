// const toggle = document.getElementById('theme-toggle');
// const currentTheme = localStorage.getItem('theme') || 'light';
// document.documentElement.setAttribute('data-theme', currentTheme);

// toggle.textContent = currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';

// toggle.addEventListener('click', () => {
//   const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
//   document.documentElement.setAttribute('data-theme', newTheme);
//   localStorage.setItem('theme', newTheme);
//   toggle.textContent = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
// });

const toggle = document.getElementById('theme-toggle');
const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', theme);

toggle.addEventListener('click', () => {
  const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
