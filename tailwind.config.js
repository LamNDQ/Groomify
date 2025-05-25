/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#58655A',
                'secondary': '#575757',
                'text': '#262626',
                'accent': '#88B04B',
                'neutral': '#F7CAC9',
                'base-100': '#FFFFFF',
                'info': '#3ABFF8',
                'success': '#36D399',
                'warning': '#FBBD23',
                'error': '#F87272',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}