export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const page = query.page ?? 1;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${config.tmdbApiKey}`,
    },
  };

  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=fr&page=${page}`, options);
    const data = await res.json();
    return data;
  }
  catch (err) {
    console.error('Impossible de récupérer les films populaires :', err);
    return { error: 'Impossible de récupérer les films populaires' };
  }
});
