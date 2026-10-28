function isSelfDescribing(n) {
  // Convert number to string to access each digit
  const str = String(n);
  const len = str.length;
  
  // Count occurrences of each digit
  const counts = {};
  for (let i = 0; i < len; i++) {
    const digit = parseInt(str[i]);
    counts[digit] = (counts[digit] || 0) + 1;
  }
  
  // Check each position: digit at position i should equal count of i
  for (let i = 0; i < len; i++) {
    const expectedCount = parseInt(str[i]);
    const actualCount = counts[i] || 0;
    if (expectedCount !== actualCount) {
      return false;
    }
  }
  
  return true;
}
