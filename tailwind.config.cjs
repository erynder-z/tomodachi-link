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
                popupMenu: '#ebc2f3',
            },
            keyframes: {
                inAnimation: {
                    '0%': {
                        opacity: '0',
                        backgroundColor: 'red',
                    },
                    '100%': {
                        opacity: '1',
                    },
                },
                outAnimation: {
                    '0%': {
                        opacity: '1',
                        backgroundColor: 'red',
                    },
                    '100%': {
                        opacity: '0',
                    },
                },
            },
            animation: {
                inAnimation: 'inAnimation 150ms ease-in',
                outAnimation: 'outAnimation 170ms ease-out',
            },
        },
    },
    plugins: [],
};
