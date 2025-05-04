export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const page = query.page ?? 1;
  const searchTerms = query.searchTerms ?? '';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${config.tmdbApiKey}`,
    },
  };

  try {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?language=fr&include_adult=false&page=${page}&query=${searchTerms}`, options);
    const data = await res.json();
    return data;
  }
  catch (err) {
    console.error('Impossible d\'effectuer une recherche :', err);
    return { error: 'Impossible d\'effectuer une recherche' };
  }
});
