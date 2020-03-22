
export const getTvSchedule = async () => {
  const result = await fetch('https://apis.is/tv/ruv');
  if (!result.ok) { throw new Error('Network error.'); }
  const json = await result.json();
  return json.results;
};
