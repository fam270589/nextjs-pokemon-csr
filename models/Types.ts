export interface IPokemon {
	id: number;
	name: string;
	image: string;
	type: string[];
	stats: Stats[];
}

export type Stats = {
	name: string;
	value: number;
};
