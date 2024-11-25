---
title: Stay awhile, and listen...to my nixOS journey!
type: page
description: Taking immutable to a new level
topic: NixOS
date: 2023-12-29
---


# NixOS Journey, Part 1

So, for those who have yet to go down this path, it would be helpful to explain what NixOS is. NixOS is a free and open-source Linux distribution. What sets itself apart from Pop!os, Debian, Ubuntu, Arch, and many others is that its entire operating system is built by the Nix package manager. This includes nix application packages, your kernel, system settings, SMB shares, and pretty much anything you can think of. 

What this allows the users to do is work within a declarativve configuration. If you make a change to the configuration file and want the changes to take, you run `nixos-rebuild switch`. NixOS then takes in the new changes, goes out to get new packages if needed, and generates a new configuration file. If this breaks anything or you just want to go back to the previous version, all you have to do is `nixos-rebuild switch --rollback`. Even on boot, you are presented with previous `nixos-rebuild` events that you can select and boot right into. Combine this with commiting to github or version control manager and you could start sharing your configs with other devices. 

## Are you starting to get it yet?

To most, even the seasoned Linux user, nixOS can be daunting at a glance. It takes every fiber of my being not to install packages via `apt install` or `snap install` or `yum install`. Finding packages that the community and nixOS team have compiled specifically for nixOS is easy, and can be done by searching directly on the site (https://search.nixos.org/packages). However, there is a possibility that your favorite package may not be packaged yet. You can request that package be assembled via github (https://github.com/NixOS/nixpkgs/issues). I am currently hoping for tabby.sh to be packaged up for me so I can use my favorite terminal app. Someone already requested it, but fingers crossed it gets done! 

But the catch is, while you can "install" packages using `nix-env -iA cider`, for example. This installs at the user level, so it will not be system wide and will not appear in your nixOS config. Additionally, you can try out a package without installing it by running `nix shell`, and a shell instance will run the package. When the shell instance is terminated, it will no longer persist on your device. 

## The NixOS Config
I have referenced the "nixOS config" file a few times now, which is the whole reason why I wanted to try nixOS out. It is just like any config file, but you can declare your entire state in this SINGLE file. Got a bunch of guh-nome (gnome) extensions you always setup on a fresh install? Yeah, you can declare that in your nix config file. Packages? Easy, all in the config file. Services like your vpn, syncthing shared folders, and your tailscale mesh network? Ye...you get the point.

## The 'Planned' Outcome
The whole purpose of this is for me to, at the end of all of this fiddling around, have a nixOS config file that I can pull down from my private repo, run `nixos-rebuild switch` and let the device configure itself. I want to be able to do this on all of my laptops or desktops that I come in possession of. That way, I have the same desktop environment switching from one device to the next. 

### The Stretch Goal
You know what would be really nice? Moving all my servers over from Debian and Ubuntu to nixOS...........


### NixOS Config (as of 2023/12/29)

```bash

{ config, pkgs, ... }:

{
  imports =
    [ # Include the results of the hardware scan.
      ./hardware-configuration.nix
    ];

  # Bootloader.
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;

  networking.hostName = "nixos"; # Define your hostname.
  # networking.wireless.enable = true;  # Enables wireless support via wpa_supplicant.

  # Configure network proxy if necessary
  # networking.proxy.default = "http://user:password@proxy:port/";
  # networking.proxy.noProxy = "127.0.0.1,localhost,internal.domain";

  # Enable networking
  networking.networkmanager.enable = true;

  # Set your time zone.
  time.timeZone = "America/Chicago";

  # Select internationalisation properties.
  i18n.defaultLocale = "en_US.UTF-8";

  i18n.extraLocaleSettings = {
    LC_ADDRESS = "en_US.UTF-8";
    LC_IDENTIFICATION = "en_US.UTF-8";
    LC_MEASUREMENT = "en_US.UTF-8";
    LC_MONETARY = "en_US.UTF-8";
    LC_NAME = "en_US.UTF-8";
    LC_NUMERIC = "en_US.UTF-8";
    LC_PAPER = "en_US.UTF-8";
    LC_TELEPHONE = "en_US.UTF-8";
    LC_TIME = "en_US.UTF-8";
  };

  # Enable the X11 windowing system.
  services.xserver.enable = true;

  # Enable the GNOME Desktop Environment.
  services.xserver.displayManager.gdm.enable = true;
  services.xserver.desktopManager.gnome.enable = true;
  
  # Tailcale
  services.tailscale.enable = true;
  
  # Configure keymap in X11
  services.xserver = {
    layout = "us";
    xkbVariant = "";
  };

  # Enable CUPS to print documents.
  services.printing.enable = true;

  # Enable sound with pipewire.
  sound.enable = true;
  hardware.pulseaudio.enable = false;
  security.rtkit.enable = true;
  services.pipewire = {
    enable = true;
    alsa.enable = true;
    alsa.support32Bit = true;
    pulse.enable = true;
    # If you want to use JACK applications, uncomment this
    #jack.enable = true;

    # use the example session manager (no others are packaged yet so this is enabled by default,
    # no need to redefine it in your config for now)
    #media-session.enable = true;
  };

  # Enable touchpad support (enabled default in most desktopManager).
  # services.xserver.libinput.enable = true;

  # Define a user account. Don't forget to set a password with ‘passwd’.
  users.users.randoneering = {
    isNormalUser = true;
    description = "randoneering";
    extraGroups = [ "networkmanager" "wheel" ];
    packages = with pkgs; [
      firefox
    #  thunderbird
    ];
  };

  # Allow unfree packages
  nixpkgs.config.allowUnfree = true;

  nixpkgs.config.permittedInsecurePackages = [
                "electron-24.8.6"
              ];

  # List packages installed in system profile. To search, run:
  # $ nix search wget
  environment.systemPackages = with pkgs; [
      firefox
      element-desktop
      discord
      cider
      vscodium
      remmina
      wget
      neofetch
      signal-desktop
      obsidian
      syncthing
      gnome-extension-manager
      git
      steam
      bitwarden
      tailscale
      bash
      gnome.gnome-tweaks
      gnomeExtensions.tophat
      gnomeExtensions.dash-to-panel
      woeusb
      vlc
      bspwn
      python3
      bottom
      fish
      terminator
      openvpn3
      tuba
      zoom-us
      popsicle
      gimp
      inkscape
      flameshot
      gnupg
      hugo
      tailscale
      starship
      zip
      rake
      rubyPackages.rake
      libgtop
      gtop
      flameshot
      pinentry
      pinentry-curses
      pinentry-gtk2
      pinentry-gnome
      brave

  ];

  # Some programs need SUID wrappers, can be configured further or are
  # started in user sessions.
  # programs.mtr.enable = true;
   programs.gnupg.agent = {
     enable = true;
     pinentryFlavor = "gtk2";
     enableSSHSupport = true;
  # };
  #
  # List services that you want to enable:

  # Enable the OpenSSH daemon.
   services.openssh.enable = true;
   services.syncthing = {
     enable = true;
     user = "randoneering";
     dataDir = "/home/randoneering/Documents/"; # Default folder for new synced folders
     configDir = "/home/randoneering/Documents/.config/syncthing";
     };
  # Open ports in the firewall.
  # networking.firewall.allowedTCPPorts = [ ... ];
  # networking.firewall.allowedUDPPorts = [ ... ];
  # Or disable the firewall altogether.
  # networking.firewall.enable = false;

  # This value determines the NixOS release from which the default
  # settings for stateful data, like file locations and database versions
  # on your system were taken. It‘s perfectly fine and recommended to leave
  # this value at the release version of the first install of this system.
  # Before changing this value read the documentation for this option
  # (e.g. man configuration.nix or on https://nixos.org/nixos/options.html).
  system.stateVersion = "23.05"; # Did you read the comment?

}

```