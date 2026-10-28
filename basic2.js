function isSelfDescribing(n) {
  const s = String(n);
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== String([...s].filter(c => c === String(i)).length)) {
      return false;
    }
  }
  return true;
}
