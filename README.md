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

List current services:  
> systemctl list-units --type=service --all

Create a new service cfg:
> sudo nano /etc/systemd/system/<esc-servicename>.service
>

Start a new service:
> sudo systemctl start <esc-servicename>.service

Stop a service:
> sudo systemctl stop <esc-servicename>.service

Restart a service:
> sudo systemctl restart <esc-servicename>.service

Get the status of a service:
> sudo systemctl status <esc-servicename>.service

Enable a new port through the firewall:
> sudo ufw allow <3000 or whatever>


## Deploy a new version to the dev server

ssh in to the server, then
> cd $DEV_SITES_DIR
to delete an existing: 
> rm -rf <site-instance>

> git clone https://github.com/pbuntine/escala-15.git
>

Then go to your local dev machine and run:
> npm run pushCustom

Returning to the remote server:
> npm install
> npm run dev

If no error, then set the application up as a service

