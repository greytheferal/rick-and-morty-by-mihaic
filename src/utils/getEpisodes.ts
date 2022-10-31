const getEpisodes = async (url: string): Promise<any> => {
    const episodes = await fetch(url).then(res => res.json()).catch((e) => console.error(e))
    console.log(episodes);
    const episodeNames = [];
    for(let episode of episodes) {
        const { name } = episode;
        episodeNames.push(name);
    } 
    return episodeNames;
}

export default getEpisodes;