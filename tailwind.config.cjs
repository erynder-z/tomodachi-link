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
                popInAnimation: {
                    '0%': {
                        transform: 'scale(0)',
                        opacity: '0',
                    },
                    '70%': {
                        transform: 'scale(1.1)',
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'scale(1)',
                        opacity: '1',
                    },
                },
                popOutAnimation: {
                    '0%': {
                        transform: 'scale(1)',
                        opacity: '1',
                    },
                    '70%': {
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'scale(0)',
                        opacity: '0',
                    },
                },
            },
            animation: {
                inAnimation: 'inAnimation 150ms ease-in',
                outAnimation: 'outAnimation 170ms ease-out',
                popInAnimation: 'popInAnimation 200ms ease-in-out',
                popOutAnimation: 'popOutAnimation 220ms ease-in-out',
            },
        },
    },
    plugins: [],
};
