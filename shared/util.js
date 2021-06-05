export const fetcher = url => fetch(url).then(r => r.json());

export const keyToLabel = (key) => {
  if (key.match('_')) {
    const label = key.split('_').join(' ');
    return label.charAt(0).toUpperCase() + label.toLowerCase().slice(1);
  }
  return key.toUpperCase()
}