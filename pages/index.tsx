import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/Home.module.css";
import { IPokemon } from "../models/Types";

const Home: NextPage = () => {
	const [pokemons, setPokemons] = useState<IPokemon[]>([]);

	useEffect(() => {
		const getPokemon = async () => {
			const resp = await fetch(
				"https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
			);

			setPokemons(await resp.json());
		};
		getPokemon();

		return () => {};
	}, []);

	return (
		<div>
			<Head>
				<title>Pokemon List</title>
			</Head>
			<h2>Pokemon List</h2>
			<div className={styles.grid}>
				{pokemons.map((pokemon) => (
					<div className={styles.card} key={pokemon.id}>
						<Link href={`/pokemon/${pokemon.id}`}>
							<a>
								<Image
									src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
									alt={pokemon.name}
									width={300}
									height={300}
								/>
								<h3>{pokemon.name}</h3>
							</a>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
