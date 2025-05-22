---
title: FreshRSS RSS Feed Aggregator
type: page
description: Self-host your own rss feed aggregator, and use your own app to read!
topic: self-hosted
publishDate: 2023-06-23
---

# I love RSS


If you are like me and love RSS, I highly recommend hosting your own RSS Feed aggregator. A fellow community member in the TechnoTim discord (Thanks Blade) introduced me to FressRSS. It is free, lightweight, relatively easy to work with, and fully customizable. Though, it seems I like to do things the "hard way" and decided against using the docker image.  So if you are looking for the fire and forget method you get with docker, then you are in the wrong place. 

# Install

https://github.com/FreshRSS/FreshRSS/releases/tag/1.21.0

First, lets install our LAMP stack

## LAMP Stack

```bash
sudo apt install apache2 libapache2-mod-php mariadb-server php-curl php-mbstring php-mysql php-zip php-xml 
```

## MySQL Secure Install
Once this has been completed, move to running mysql_secure_installation

```bash
sudo mysql_secure_installation
```

1. Enter Current Password for Root  (mysql/mariadb root user). If none, just press enter. However, I recommend setting your root password at this step. Just makes life easier later.
2. Switch to Unix_Socket authentication? (Y)
3. Change root password? (N, you already set one in step 1)
4. Remove Anonymous Users? (Y)
5. Remove Remote Root Login? (Y-this disallows the ability to connect, remotely, to the db instance as root)
6. Remote Test Databases? (Y, don't need it)
7. Reload Privileges? (Y)

## Create Database for FreshRSS

```sql
CREATE DATABASE freshrss;

CREATE USER 'freshrss'@'localhost' IDENTIFIED BY 'yourpasswordhere';

GRANT ALL PRIVILEGES ON freshrss.* to freshrss@localhost;

```

## Clone FreshRSS Repo

```bash
git clone https://github.com/FreshRSS/FreshRSS.git

```

## Change Ownership on FreshRSS Directory 

```bash
sudo chown -R yourlocaluser:yourlocaluser FreshRSS
```

## Change ownership on data directory


```bash
sudo chown -R www-data:www-data data
```

## Edit 000-default.conf in /etc/apache2/sites-enabled


```bash
sudo nano /etc/appache2/sites-enabled/000-default.conf


## Change , in this file, DocumentRoot to where you have cloned the FreshRSS Repo, but add the P directoy

ServerAdmin webmaster@localhost
DocumentRoot /var/www/FreshRSS/p

```

## Configure/Finish install of FreshRSS

Go to your server site "http://192.168.x.xxx/i" and follow the install steps using database user and password you created in the previous steps

# Post-Install

Out of the box, my FreshRSS instance was not auto-refreshing my feeds. This made it pointless to use, honestly, and I almost just deleted the vm. However, I was shown a method via the following doc:

https://freshrss.github.io/FreshRSS/en/admins/08_FeedUpdates.html

In here, you can either create a cronjob or actually use systemd to create trigger and service to do the refreshing for you. Here is the example files (the trigger and service itself) that I created. Your's may vary depending on your install path and/or your user.

freshrss.service
```bash
 
[Unit]                           
Description=FreshRSS get new content        
Wants=freshrss.timer                                               
[Service]                                            
User=www-data                                        
Type=simple                                                                      
ExecStart=/usr/bin/php /var/www/FreshRSS/app/actualize_script.php
```

freshrss.trigger
```shell
[Unit]                                                                           
Description=FreshRSS get new content                                                                               
[Timer]                                                                          
OnBootSec=30s                                                                    
OnCalendar=*:0/20                                                                                                  
[Install]                                                              
WantedBy=timers.target
```

Once these have been created in /etc/systemd/system, enable the timer with `systemctl enable freshrss.timer` followed by reloading the systemd config with `systemctl daemon-reload`. 