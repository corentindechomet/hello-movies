export default defineEventHandler(async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZWM5OGY3MDM4ODE2MmQ0OGFjMjBiNjc1MTVkYTZlYSIsIm5iZiI6MTYxOTM2NjA5Ny40OCwic3ViIjoiNjA4NTkwZDFmZmM5ZGUwMDI5Zjc2MTkyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.NZDDPAETOjfeGRocFOyVJs0acWt1Qn-mpzyT0Pe9ucM',
    },
  };

  try {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=fr', options);
    const data = await res.json();
    return data;
  }
  catch (err) {
    console.error('Impossible de récupérer la liste des genres :', err);
    return { error: 'Failed to fetch genres' };
  }
});
