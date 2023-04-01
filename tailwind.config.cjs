/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                card: '#f8fafc',
                background: '#e0e7ff',
                navbar: '#a5b4fc',
            },
        },
    },
    plugins: [],
};
