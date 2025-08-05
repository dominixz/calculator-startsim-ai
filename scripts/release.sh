#!/bin/bash

# Calculator Startsim.AI Release Script
# Usage: ./scripts/release.sh <version> <title>

set -e

VERSION=$1
TITLE=$2

if [ -z "$VERSION" ] || [ -z "$TITLE" ]; then
    echo "Usage: ./scripts/release.sh <version> <title>"
    echo "Example: ./scripts/release.sh v1.1.0 'Feature Update'"
    exit 1
fi

echo "🚀 Creating release $VERSION: $TITLE"

# Update package.json version (remove 'v' prefix for package.json)
PACKAGE_VERSION=${VERSION#v}
echo "📝 Updating package.json to version $PACKAGE_VERSION"
npm version $PACKAGE_VERSION --no-git-tag-version

# Build and test
echo "🔨 Building application..."
npm run build

echo "🧪 Running linter..."
npm run lint

# Commit version update
echo "📝 Committing version update..."
git add package.json
git commit -m "🔖 Bump version to $VERSION"

# Create git tag
echo "🏷️  Creating git tag $VERSION"
git tag -a $VERSION -m "$TITLE

Release $VERSION with the following updates:
- See CHANGELOG.md for detailed changes
- Built and tested for production
- Ready for deployment"

# Push changes and tag
echo "📤 Pushing changes and tag..."
git push origin main
git push origin $VERSION

# Create GitHub release
echo "🎉 Creating GitHub release..."
gh release create $VERSION \
  --title "🚀 $TITLE - $VERSION" \
  --generate-notes \
  --latest

echo "✅ Release $VERSION created successfully!"
echo "🔗 View at: https://github.com/dominixz/calculator-startsim-ai/releases/tag/$VERSION"
