set -e

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

echo "Building monorepo"
MONOREPO_CURRENT_GIT_SHA="$(git rev-parse HEAD)"
cd ..
cd Monorepo
cd apps
./scripts/clean-build-and-synch-app.sh production



echo "Copying app web assets back to the updater repo"
cd "$SCRIPT_DIR" # Back to this repo
cp -r ../Monorepo/apps/staged-assets/* ./prebuilt-dist



echo "Committing and pushing latest build"


# TODO name commit
# TODO Coomit and push latest changes

