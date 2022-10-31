import * as React from "react";
import styles from "./index.module.scss";

interface Props {
	characters: any[];
	lastFocus: number;
}

const Characters: React.FC<Props> = ({ characters, lastFocus}) => {
	return (
		<section className={styles.characters} >
			{characters &&
				characters.map((character: any, i) => (
				<div className={styles.characterBox} onClick={() => window.location.href = `/character/${character.id}`}>
					<button
						id={`character-${i}`}
						key={character.id}
						className={styles.character}
						data-id={i}
						data-image={character?.image}
						aria-label={`Ver detalles de ${character.name}`}
						data-location={character?.location?.name}
						data-name={character?.name}
						data-origin-name={character?.origin?.name}
						data-origin-url={character?.origin?.url}
						data-status={character?.status}
						data-species={character?.species}
					>
						{console.log(character)}
						<img
							src={character.image}
							alt={character.name}
							loading="lazy"
							width={200}
							height={200}
						/>
						<p>{character.name}</p>
					</button>
					<div className={styles.badge} data-color={character.gender}></div>

					</div>
				))}
		</section>
	);
};

export default Characters;
