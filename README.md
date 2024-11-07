## Delivery repo for optio frontend builds

### Setup

Place this in same parent directory as the monorepo. 

So, if you do this from root of this repo:
    
```
cd ..
cd Monorepo
```

then you should end up in the monorepo.


(See apps/README.md in monorepo for more info.)


### How to push out new Live Updates from the monorepo

From the root of this repo, run:

`./update-app-webassets-build-from-monorepo.sh`

It will build the monorepo mobile web assets, commit them inside this repo, and push them to the remote.

Then log into the Appflow console (https://dashboard.ionicframework.com).

Open the the optio-mobile-app-webassets-live-update-updater app.

Build -> New build

Pick the latest commit from this repo, corresponding to the current main HEAD monorepo commit 
(you should see the commit message clearly reference the SHA of that commit).
Pick "Target platform: Web"
Enable "Live Update" -> "Production" channel.
Click "Build".

The build should only take a few moments, since nothing is actually built, it just distributes our web assets to the
live update channel.

The new web assets should now be live in the production channel: go to "Deployments" -> "Production".
The latest build should be at the top of the list, marked as "Active build".

Our mobile apps should now automatically download the new assets when they are opened, or when the user refreshes the app.