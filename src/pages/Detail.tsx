import * as React from "react";
import { Controls, Hero, Modal, Pagination, Button } from "components";
import { getSingleCharacter } from "utils/getCharacters";
import getDimension from "utils/getDimension";
import getEpisodes from "utils/getEpisodes";
import { Loader } from "assets/icons";
import styles from "./Detail.module.scss";
import { useParams } from "react-router-dom";

const Particles = React.lazy(() => import("components/Particles"));

const Detail = (props: any) => {
	const { id } = useParams();
	const [character, setCharacter] = React.useState<any>(null);
	const [error, setError] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	// Getting information about the character at the beginning of page loading 
	React.useEffect(() => {
		if (id) {
			setLoading(true);

			getSingleCharacter(+id).then(async (data) => {
				const dimension = data.origin.url !== "" ? await getDimension(data.origin) : data.origin.name; // getting the dimension if exists
				const origin = data.origin.name;

				// Getting the id of each episode
				let episodes = [];
				for (let episode of data.episode) {
					episodes.push(episode.split('/').pop())
				}
				const url: string = "https://rickandmortyapi.com/api/episode/" + episodes.join(',');
				const result = await getEpisodes(url); // Getting the episodes data
				const episodesName = result.join(', ').slice(0, -1); // joining the episode name to a string of the form "name1, name2, name3..."

				setCharacter({ ...data, dimension, origin, episodesName });
				setLoading(false);
			});
		}
	}, [])


	return (
		<main>
			<Hero />
			{loading ? (
				<div className={styles.loader}>
					<Loader />
				</div>
			) : (
				<React.Suspense fallback={<Loader />}>
					{error && (
						<div className={styles.error}>
							<p aria-live="assertive">{error}</p>
						</div>
					)}
					<Particles />
					{ /* window.location.href = '/' will redirects to '/' path */}
					<Button onClick={() => window.location.href = '/'}>Back home</Button>
					{character !== null ?
						<div className={styles.content}>


							<img src={character?.image} alt={character?.name} width={400} height={400} />
							<div>
								<h2>{character?.name}</h2>
								<p>
									<strong>Status:</strong> {character?.status}{" "}
									<span>
										{character?.status === "Alive"
											? "🟢"
											: character?.status === "Dead"
												? "🔴"
												: "⚪"}
									</span>
								</p>
								<p>
									<strong>Species:</strong> {character?.species}
								</p>
								{character?.type && (
									<p>
										<strong>Type:</strong> {character?.type}
									</p>
								)}
								<p>
									<strong>Location:</strong> {character?.location.name}
								</p>
								<p>
									<strong>Origin:</strong> {character?.origin}
								</p>
								<p>
									<strong>Dimension:</strong> {character?.dimension}
								</p>
								<p>

									<strong>Episode titles:</strong> {character?.episodesName}
								</p>
							</div>
						</div>
						: <></>}

				</React.Suspense>
			)}
		</main>
	);
};

export default Detail;
