set -e

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

echo "--Building monorepo mobile app web assets--"
cd ..
cd Monorepo
MONOREPO_CURRENT_GIT_SHA="$(git rev-parse HEAD)"
cd apps
./scripts/clean-build-and-synch-app.sh production


echo "--Copying app web assets back to the updater repo--"
cd "$SCRIPT_DIR" # Back to this repo
cp -r ../Monorepo/apps/staged-assets/* ./prebuilt-dist



echo "--Committing and pushing latest build--"

git add ./prebuilt-dist

if git diff --quiet ./prebuilt-dist && git diff --cached --quiet ./prebuilt-dist; then
    echo "--No changes to built web assets since last commit, nothing to do. Aborting.--"
    exit 1
else
    COMMIT_COMMENT="Mobile app dist files built from monorepo commit ${MONOREPO_CURRENT_GIT_SHA}"
    git add ./prebuilt-dist
    git commit -m "${COMMIT_COMMENT}"
    git push origin main
    echo "Done! Can now build and run live update from Appflow."
fi



