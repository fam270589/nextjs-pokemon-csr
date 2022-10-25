import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import styles from "../../styles/Details.module.css";
import { IPokemon } from "../../models/Types";

type Props = {
	children?: React.ReactNode;
	// props....
};

//todo:-----[id] component-----://
const Details = (props: Props) => {
	const {
		query: { id },
	} = useRouter();

	const [pokemon, setPokemon] = useState<IPokemon>();

	useEffect(() => {
		const getPokemon = async () => {
			const resp = await fetch(
				`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
			);

			setPokemon(await resp.json());
		};
		if (id) {
			getPokemon();
		}

		console.log(pokemon);

		return () => {};
	}, [id]);

	if (!pokemon) {
		return null;
	}

	return (
		<div>
			<Head>
				<title>{pokemon.name}</title>
			</Head>
			<div>
				<Link href="/">
					<a>Back to Home</a>
				</Link>
			</div>
			<div className={styles.layout}>
				<div>
					<Image
						className={styles.picture}
						src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
						alt={pokemon.name}
						width={300}
						height={300}
					/>
				</div>
				<div>
					<div className={styles.name}>{pokemon.name}</div>
					<div className={styles.type}>{pokemon.type.join(", ")}</div>
					<table>
						<thead className={styles.header}>
							<tr>
								<th>Name</th>
								<th>Value</th>
							</tr>
						</thead>
						<tbody>
							{pokemon.stats.map(({ name, value }) => (
								<tr key={name}>
									<td className={styles.attribute}>{name}</td>
									<td>{value}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Details;
