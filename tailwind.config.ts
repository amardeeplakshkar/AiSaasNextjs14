import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const generateSafelist = (): string[] => {
	const safelist: string[] = [];
	const colorKeys = Object.keys(colors);

	colorKeys.forEach((color) => {
		const colorShades = colors[color as keyof typeof colors];

		if (typeof colorShades === "object") {
			for (const shade in colorShades) {
				safelist.push(`text-${color}-${shade}`);
				safelist.push(`bg-${color}-${shade}/10`);
			}
		} else {
			safelist.push(`text-${color}`);
			safelist.push(`bg-${color}/10`);
		}
	});

	return safelist;
};

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	safelist: generateSafelist(),
	theme: {
		extend: {
			fontSize: {
				'chat-title': ['2.5rem', '1.2'],
			  },
			colors: {
				'chat-dark': '#0A2725',
				'chat-card': 'rgba(19, 45, 43, 0.5)',
				'chat-border': 'rgba(255, 255, 255, 0.1)',
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				marquee: {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(calc(-100% - var(--gap)))" },
				  },
				  "marquee-vertical": {
					from: { transform: "translateY(0)" },
					to: { transform: "translateY(calc(-100% - var(--gap)))" },
				  },
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				marquee: "marquee var(--duration) linear infinite",
				"marquee-vertical": "marquee-vertical var(--duration) linear infinite",
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
