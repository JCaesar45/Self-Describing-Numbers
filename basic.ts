function isSelfDescribing(n: number): boolean {
  const s: string = String(n);
  return [...s].every((d: string, i: number) => 
    Number(d) === [...s].filter((c: string) => c === String(i)).length
  );
}
