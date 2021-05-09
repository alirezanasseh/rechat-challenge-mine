module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            minHeight: {
                '680': '680px'
            },
            minWidth: {
                '120': '120px',
                '250': '250px'
            },
            boxShadow: {
                custom: '2px 2px 4px 0px rgba(5, 5, 5, 0.5);'
            },
            colors: {
                blue: {
                    light: '#a2ceed',
                    dark: '#1775b9',
                    border: '#2b74ba'
                },
                gray: {
                    light: '#e9eaeb',
                    border: '#878888',
                    lightBorder: '#d4d5d5'
                }
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
