#!/bin/bash
# Deploy thủ công lên GitHub Pages
set -e
echo "=== Building for GitHub Pages ==="
VITE_BASE=/mininet/ npm run build
touch dist/.nojekyll
echo "=== Pushing to gh-pages ==="
cd dist
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M')"
git remote add origin https://github.com/phuctran2510/mininet.git
git push origin gh-pages --force
cd ..
echo "✅ Done! → https://phuctran2510.github.io/mininet/"
