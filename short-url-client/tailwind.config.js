module.exports = {
	content: [
	  "./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
		  colors: {
			primary: {
			  color: '#000',
			  
			},
			secondary: {
			  dark: '#047857',
			},
		  },
		  gridTemplateColumns: {
			'2-max': 'repeat(2, max-content)',
		  },
		  backgroundImage: {
			'custom-gradient': 'linear-gradient(180deg, hsla(0, 0%, 0%, 0) 0%, black 120%)',
		  },
		},
	  },
	plugins: [require('tailwind-scrollbar')({nocompatible: true})],
  }
  