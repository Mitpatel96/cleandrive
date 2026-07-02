# Testimonial Customer Photos

Drop your real customer photos into this folder using these exact filenames:

- `rakesh.jpg` — for "Rakesh P." card
- `meera.jpg`  — for "Meera S." card
- `harsh.jpg`  — for "Harsh D." card
- `nikita.jpg` — for "Nikita J." card

Any square-ish image works best (400×400 or larger). JPG or PNG are fine, but keep the file extension `.jpg`
in the filename (or update the paths in `src/components/site/Testimonials.jsx`).

## How the fallback works
For each testimonial card the site tries these images in order:
1. `/testimonials/<name>.jpg` (this folder)
2. A stock Unsplash portrait
3. An initials avatar (`ui-avatars.com`) — always works

So the page never breaks, even if a photo is missing.

## To change a customer's name/text/location
Edit `REVIEWS` in `/app/frontend/src/components/site/Testimonials.jsx`. Each entry has:
`name`, `initials`, `area`, `stars`, `photo`, `unsplash`, `text`.
