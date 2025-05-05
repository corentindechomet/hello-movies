export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const id = query.id;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${config.tmdbApiKey}`,
    },
  };

  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&language=fr`, options);
    const data = await res.json();
    return data;
  }
  catch (err) {
    console.error('Impossible de récupérer les détails du film :', err);
    return { error: err };
  }
});
