/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            screens : {
                'sm' : '425px'
                // 'sm' : '480px'
            }
        },
    },
    plugins: [],
}

