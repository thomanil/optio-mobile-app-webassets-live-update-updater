set -e

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

echo "--Building monorepo mobile app web assets--"
cd ..
cd Monorepo
MONOREPO_CURRENT_GIT_SHA="$(git rev-parse HEAD)"
cd apps
# TODO Check that no diff exists locally and on main branch
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
    COMMIT_COMMENT="Monorepo build of: ${MONOREPO_CURRENT_GIT_SHA}"
    git add ./prebuilt-dist
    git commit -m "${COMMIT_COMMENT}"
    git push origin main
    echo "Done! Latest mobile app web asset build discoverable in Appflow, can now be distributed via Live Update there."
    echo "Built based on:"
    echo "https://github.com/OptioIncentives/Monorepo/commit/${MONOREPO_CURRENT_GIT_SHA}"
fi



