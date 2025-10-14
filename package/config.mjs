export const config = {
	world: {
		name: "A Game",
	},
	server: {
		port: 23,
	},
};

export const pkg = {
	name: "config",
	loader: async () => {
		// read a config file and set new info
		config.world.name = "Da Game";
	},
};
