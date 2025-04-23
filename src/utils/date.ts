export function formatDateBR(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(date);
}
