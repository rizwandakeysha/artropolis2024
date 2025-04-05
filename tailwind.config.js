// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Sesuaikan dengan struktur folder Anda
    ],
    theme: {
        extend: {
            animation: {
                bounce: 'bounce 1s infinite',
            },
            keyframes: {
                bounce: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            },
            fontFamily: {
                yatra: ['"Yatra One"', 'sans-serif'], // Menambahkan font baru dengan nama 'yatra'
            },
            animation: {
                'fade-in': 'fade-in 1s ease-out forwards',
            }
        },
    },
    plugins: [],
};