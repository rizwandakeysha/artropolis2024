/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Sesuaikan dengan struktur folder Anda
    ],
    theme: {
        extend: {
            fontFamily: {
                yatra: ['"Yatra One"', 'sans-serif'], // Tambahkan di sini
            },
            keyframes: {
                bounce: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInSlide: {
                    '0%': { opacity: 0, transform: 'translateY(-10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
            animation: {
                bounce: 'bounce 1s infinite',
                'fade-in': 'fade-in 1s ease-out forwards',
                'fade-in-up': 'fade-in-up 1s ease-out forwards',
                fadeInSlide: 'fadeInSlide 0.3s ease-out forwards',
            },
        },
    },
    plugins: [],
};