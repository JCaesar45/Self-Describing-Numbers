# Self-Describing Numbers

A minimal, dependency-free verifier for self-describing integers, shipped as a single HTML file with inline CSS and JavaScript. Enter any positive integer and the page tells you whether each digit position correctly declares the frequency of its corresponding digit.

No build step. No framework. No network calls.

## What is a self-describing number?

An integer of length `N` is self-describing when, for every position `i` in `0..N-1`, the digit stored at position `i` equals the number of times the digit `i` appears in the entire number.

Example — `2020`:

| Position | Digit | Declares count of | Actual count | Match |
|----------|-------|-------------------|--------------|-------|
| 0 | 2 | 0 | 2 | yes |
| 1 | 0 | 1 | 0 | yes |
| 2 | 2 | 2 | 2 | yes |
| 3 | 0 | 3 | 0 | yes |

All four positions agree, so `2020` is self-describing.

Counter-example — `3021`:

| Position | Digit | Declares count of | Actual count | Match |
|----------|-------|-------------------|--------------|-------|
| 0 | 3 | 0 | 1 | no |

A single mismatch is sufficient to reject the number.

## Known values below 100,000,000

```
1210
2020
21200
3211000
42101000
```

These five are the complete set under the stated bound. The verifier does not rely on this list — it computes the check from first principles, so it works for any positive integer within JavaScript's safe integer range.

## Usage

Open `index.html` in any modern browser. There is no server component and no installation step.

1. Type a positive integer into the input field.
2. Press **Verify** or hit Enter.
3. The verdict appears above a per-position breakdown table showing declared versus counted values.

Clicking any card in the known-values catalogue loads that number into the verifier and scrolls to the result.

## Algorithm

The implementation is deliberately small. Given a string `s` of digits:

1. Build a frequency map of every digit character in `s`.
2. For each index `i` from `0` to `s.length - 1`:
   - Read `declared = Number(s[i])`.
   - Read `actual = counts.get(String(i)) || 0`.
   - If `declared !== actual`, the number fails.
3. If every position agrees, the number passes.

Time complexity is O(N) in the number of digits. Space complexity is O(N) for the frequency map and the report rows. There is no need for early termination beyond the first mismatch, but the full breakdown is rendered regardless so the user can see exactly where the check failed.

## Design notes

- The page is a single file with no external assets. That keeps it portable, forkable, and immune to CDN outages.
- Colours are defined as CSS custom properties at the root. Changing the accent is a one-line edit.
- The result area uses `aria-live="polite"` so screen readers announce the verdict after submission.
- The known-value cards are real `<button>` elements, not `<div>` elements with click handlers, so keyboard navigation and focus rings work without extra code.
- `prefers-reduced-motion` disables the pulse animation and smooth scrolling for users who request it.
- Input validation happens twice: the HTML `pattern` attribute catches most cases natively, and the JavaScript `render` function rejects anything that is not a run of digits before analysis begins.

## What this project is not

It is not a web service, not a package, and not a benchmark suite. It is a single-page reference implementation of one number-theoretic predicate, written to be read and run without ceremony. If you need a library binding for Node, Python, TypeScript, or Java, those belong in separate repositories with their own test harnesses.

## Testing

The verifier has been checked against the five known values and against `3021` as a negative case. To re-verify by hand, load the page, click each catalogue card, and confirm the verdict reads "is self-describing" for all five. Then enter `3021` and confirm the verdict reads "is not self-describing" with a mismatch flagged at position 0.

## License

MIT. Do whatever you want with it.
```
