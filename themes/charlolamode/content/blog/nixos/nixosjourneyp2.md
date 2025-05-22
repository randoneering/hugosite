---
title: NixOS part 1.5
type: page
description: What spending too much time in a single config file does to you
topic: NixOS
publishDate: 2024-03-05
---

# I gave up

To save the trouble of leaving you all on a cliff hanger, I switched back to pop_OS. I'll explain, to my best ability why. But I do want to point out some of things I learned about NixOS that make it one of the best operating systems I have ever used. At the end of the day, I wanted to be on a platform that did not require me to fight to use every time I wanted to add something to my config file. Anyways, let's get to the point of this post. 

## What ~~was~~ is great about NixOS




### Switching Desktop Environments

It is no secret I am a fan of Gnome desktop. I basically have been using this since 2010 , or whenever I first used Ubuntu. So, it was an obvious choice for me to use the latest version of Gnome when using NixOS. Right?

I did install NixOS first with Gnome, and went through my usual routine of getting my favorite extensions installed. Once I had my Dracula theme configured just right, I went about my business. In the time frame of starting the journey with NixOS, I also picked up a SteamDeck for Christmas. As some of you might know, SteamOS uses KDE for the desktop environment. Whenever I needed to go into desktop mode, I was left learning more about KDE and where everything was. You could imagine that after a few weeks, I figured why not give KDE a shot on NixOS? 

After a quick search on the NixOS documentation site and posts, it was clear to me that this was way too easy. Two lines to my config, change or comment out gnome related settings, and do a rebuild? That is it? 

```conf
services.xserver.enable = true;
services.xserver.displayManager.sddm.enable = true;
services.xserver.desktopManager.plasma5.enabled = true;

```


No catch here-that was really it. After my rebuild, I did a quick reboot for safe keepings and I was presented with a new login page. KDE, here we go! 

From there on, I continued to tweak my preferences in KDE only to ask myself "How can I make sure that all of these customizations are in my config as well?" I saw posts and mentions of Home Manager, but never really looked into it. You could add it as module in your config,  and from a high level you could essentially set it so your customizations are in the config just like everything else. Well, now I kind of want to do that! But, let's take a step back first because I didn't realize it at the time but I actually had something broken after switching to KDE that didn't surface until I picked up my laptop to bring to bed with me that night. Can you guess what wasn't working?

If you said audio, nice guess but you are wrong. No, my audio was working like a charm. What was not working was my wifi! For some reason, the switch to KDE disabled my wifi so I figured a quick enabling of the service would do the trick. That didn't work either, which made me laugh. Did I just bork my wifi card? 

Again, back to documentation and posts I went and discovered others experienced this as well. Throwing in the following in my config did the trick:

```conf
networking.wireless.enable = true;

# Later I found out that I should have used below, for my specific setup since I kept losing wifi connection randomly. Found this in post in a thread (look for buovjaga's response) https://discourse.nixos.org/t/how-do-i-set-up-wifi-with-kde-plasma/18560/3


networking.networkmanager.enable = true; #should already be in your config
networking.wireless.iwd.enable = true;
networking.networkmanager.wifi.backend = "iwd";


```


I am sure there is a logical reason behind this, related to different network managers in KDE and Gnome, but I didn't care. It was working. 


### Services

Naturally, I use a few services that could be baked into my config. For the sake of this post, I will use talescale and syncthing. Watch as I enable both services, complete with the necessary settings, with just a few lines of code in your config.

```conf
# Enable Syncthing
services.syncthing = {
    enable = true;
    user = "randoneering";
    dataDir = "/home/randoneering/Documents/"; # Default folder for new synced folders
    configDir = "/home/randoneering/Documents/.config/syncthing";
    };
# Enable Tailscale
services.tailscale.enable = true; 

```


### Fixing your mistakes

Something we take for granted is having the ability to rollback the mistakes you make in life...wait, we don't get that luxury. Yet, if you bork your config, you can simply revert your changes. One way you can do this is by rebooting your session, selecting a previous build in the list. You will boot right up, using the previous config state. There, you can tiddy up your config or leave it. Make sure to do a `nix-collect-garbage -d` then `nixos-rebuild switch`. This cleans up the previous versions of your configs and updates the boot entries. 


## What next?

I will eventually get back to nixOS, but for now, I am patiently waiting for COSMIC DE from our folks who make pop_OS (system76). I have been trying to write this post for almost two months, and I am about to post this after Plasma 6 was officially released. It is not enough to get me back into nixOS, but you can if you want to switch to the unstable channel. Best of luck, and happy config-cofiguring.
