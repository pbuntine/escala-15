# eScala-core

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

### New development environment

If you are setting up a new environment to develop in or demonstrate in dev mode, make the following changes:

#### Add os environment variables

Add the following to bash or zsh config:

```bash
nano ~/.bashrc
```

or

```zsh
nano ~/.zshrc
```

Check using...

```bash
echo $SHELL
/bin/bash
```

```bash
export CUSTOM_SITES_DIR="/var/www/escala-custom-sites-cfg"
export DEV_SITES_DIR="/var/www/escala-15-sites"
export CMS_MGT_KEY=CFPAT-nnnnn
```

### To rsync sites to remote server
```bash
rsync -av ./ phil@raspberrypi:/var/www/escala-custom-sites-cfg
```

### New instance

If it is a new dev instance, run the following to setup cf-types for development:

```bash
npm run ctf:ts
```

Then, run the development server:

```bash
npm run dev
```

or if you want dev to automatically restart your application when file changes are detected, run:

```bash
npm run nodemon
```

Open the site using localhost on the port specified in the package.json dev script.

To build the project, run:

```bash
npm run build
```

This will also run the sitemap generator.

## To run the app as a service

