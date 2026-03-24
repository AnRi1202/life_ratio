# life ratio

## Run locally

```bash
npm run dev
```

Open `http://localhost:8000`.

## Deploy

### Vercel

This project is a plain static site, so Vercel deployment is simple.

1. Push this directory to a GitHub repository.
2. Open Vercel and choose `Add New Project`.
3. Import the repository.
4. Leave the framework as `Other`.
5. Leave the build command empty.
6. Set the output directory to `.` if Vercel asks for one.
7. Deploy.

### GitHub Pages

1. Push this directory to a GitHub repository.
2. Open the repository settings on GitHub.
3. Go to `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select the branch you want to publish and choose the `/ (root)` folder.
6. Save.

After that, GitHub Pages will publish the static files in this directory.

## Files

- `index.html`: layout and form structure
- `styles.css`: visual design and chart styling
- `script.js`: calculation and rendering logic
