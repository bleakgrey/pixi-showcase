export default {
	CONTAINER: {
		centerOnStage: true,
		dimensions: { x: 600, y: 800 },

		'(orientation: landscape)': {
			dimensions: { x: 800, y: 600 },
		}
	},
	LOGO: {
		alignment: { x: 0.5, y: 0.25 },
		scale: { x: 0.3, y: 0.3 },

		'(orientation: landscape)': {
			alignment: { x: 0.18, y: 0.5 },
			scale: { x: 0.225, y: 0.225 },
		}
	},
	LIST: {
		scale: { x: 1, y: 1 },
		alignment: { x: 0.5, y: 0.6 },

		'(orientation: landscape)': {
			alignment: { x: 0.65, y: 0.5 },
			scale: { x: 0.9, y: 0.9 },
		}
	}
}