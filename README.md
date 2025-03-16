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

## Upload prod site to AWS 
### Build the site
```bash
npm run build
```
This will also build the sitemap.xml

### Export fresh AWS credentials
Using the terminal you wish to use:
```bash
aws sso login
```

or set up and use a saved link to 'AWS access portal'

Then run:
```bash
npm run pubProd
```

In order to see the site immediately, kill the cache.
```bash
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

# STS User
how do i set up aws sts for a new user?

Attach Permissions to Allow STS Usage

The user needs permissions to assume roles using STS. You can attach an inline policy or a managed policy.

Option 1: Attach an Inline Policy

Create a JSON policy file (e.g., sts-policy.json):
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::123456789012:role/MyRole"
        }
    ]
}

Replace:
	•	123456789012 with your AWS account ID.
	•	MyRole with the IAM role the user should assume.

Then, attach it to the user:
aws iam put-user-policy --user-name NewUserName --policy-name STS-AssumeRole --policy-document file://sts-policy.json

Create Access Keys (For CLI Usage)

Generate access keys for the user (needed for CLI authentication):
aws iam create-access-key --user-name NewUserName


Configure AWS CLI with New Credentials

On the user’s system, configure the AWS CLI:
aws configure

Enter the credentials:
	•	AWS Access Key ID: AKIAEXAMPLE123456
	•	AWS Secret Access Key: EXAMPLESECRETKEY
	•	Default region: Your AWS region (e.g., us-east-1)
	•	Output format: json (or text/table)


Verify STS Access

Test if the user can call STS:
aws sts get-caller-identity
