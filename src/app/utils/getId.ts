export function getId(url: string) {
  return url.split('/api/users')[1].slice(1);
}
