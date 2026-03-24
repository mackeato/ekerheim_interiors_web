/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                sand: '#f5f1ea',
                stone: '#d6cec2',
                ink: '#1b1b1b',
                taupe: '#8b7d6b',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['Georgia', 'serif'],
            },
        },
    },
    plugins: [],
}