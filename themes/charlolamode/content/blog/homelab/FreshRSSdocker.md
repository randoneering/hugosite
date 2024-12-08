---
title: FreshRSS, but using Docker Compose
type: page
description: Don't like running LAMP stacks? Well, there is a docker image for that.
topic: self-hosted
publishDate: 2023-07-04
---


# This is a quick one

To prove a point, and make it "easier", you could just use docker and run FreshRSS that way. It takes less time, honestly, and less complicated. So, why not:

# Oh, linuxserver.io, how I adore you

I went with the instructions and image curated by linuxserver.io:

https://docs.linuxserver.io/images/docker-freshrss

This cuts out a lot of the work, and actually setups up a cronjob to refresh your feeds automatically. No fussing around with systemd or crontabs yourself. Here is my docker-compose

```yml
---
version: "2.1"
services:
  freshrss:
    image: lscr.io/linuxserver/freshrss:latest
    container_name: freshrss
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Chicago
    volumes:
      - /path/to/data:/config
    ports:
      - 80:80
    restart: unless-stopped
```

However, if docker cmd is your thing:

```bash
docker run -d \
  --name=freshrss \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -p 80:80 \
  -v /path/to/data:/config \
  --restart unless-stopped \
  lscr.io/linuxserver/freshrss:latest
```
These are pretty much exact copies from the linuxserver.io site but as far as database backend, I actually reused the same database server (mariadb) that I used in the previous post. However, you can stick with sqlite and go through the install instructions once you have connected to the server url. 

# Next project please

This time round, I went with the FeedMe rss reader, added tailscale on the server I was running the image one and went on my way. And, I didn't have to reset my feeds, I just simply exported my feeds and import into the new FreshRSS server. 

{{< figure src="/images/importexport.png" title="" >}}
