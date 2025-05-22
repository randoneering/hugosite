---
title: When Two Weather Stations Walk Into A Bar
type: page
description: A gifted weather station starts a new hobby
topic: Weather Stations
publishDate: 2022-01-01
---


**Davis Vantage Pro2 Acquired**

A few years ago, my wife's grandfather gifted me a Davis Vantage Pro2 weather station. Originally, he was given this weather station by one of his sons who was deployed on active duty  in the Middle East shortly after 9/11. This specific weather station was used at his post and when his deployment ended, and the station was gearing down, his son packed up the weather station. It made its way to my wife's grandfather, where it sat for fifteen years. That is when I walked into the family, and was given the station.

{{< figure src="/images/davis.jpeg" title="" >}}

My wife's grandfather knew I would get the station back and running, even if it did take me five years to finally get around to it. Kids and home ownership got in the way, but ironically, I fell into a job working for a company that dealt with weather data. Thus, a new project was born.


Thankfully, the son packaged the weather station well, and all the parts were still intact when I got around to putting it together. Additionally, all of the mounting hardware and accessories were  still present, making my job a lot easier. I should have taken pictures of when I was cleaning the weather station, but it was a wild trip when I found myself cleaning off sand and debris that was most certainly not from this country. It was both exciting and humbling to break down the device, clean out the internals, and replace any lithium batteries that no longer could hold a charge.

After putting the station back together, I immediately heard the fan start up (I believe it is the radiation fan) which gave me a sense of relief; it must work! Now, I just needed to get the ISS to communicate with the Display Monitor.

{{< figure src="/images/sidebyside.jpeg" title="" >}}

Luckily, the documentation Davis provides is pretty straightforward and detailed. The setup was a breeze, and soon enough, my station was sending data to my display console. Success! Time to mount the machine outside and work on the second weather station!

**Weather Flow Tempest**

Jumping from 20 year old technology to modern day weather stations was eye opening. Just in size, the Tempest stations are tiny in comparison to even the more modern Davis weather stations. Unfortunately, there is no special story behind this one, and the setup is even easier. In literally minutes of mounting the weather station and plugging in the wireless relay, I was getting data fed to my Tempest app. I officially had two weather stations actively working in my backyard. But you know it doesn't stop here....

{{< figure src="/images/Tempest.jpeg" title="" >}}

**Hijacking the Davis ISS module**

Full disclosure; you can pay anywhere from $150-200 to get an official Davis Weatherlink logger that connects to the serial port on the back of the display. Yet, in typical fashion, I wanted to find a route where I could use some inexpensive radios to hijack the frequency the ISS module used to deliver the data. I found several posts on various forums on how people worked their magic and ingested the data from their Davis stations using low powered devices. For me, I already have a Raspberry Pi 4 that I just recently decommissioned from its pihole and uptime-kuma duties, and already had plans to use it to also track air traffic. Everything was going to run in docker containers, so surely there was something out there that I could use that was inexpensive and the code could be maintained in a container.  

**Stay tuned for Part 2**

At the time I am writing this, I have a few devices inbound that will make this project (and others) work. Once I have successfully started collecting data, I will write up a detailed post on how I did this and what I used to do. The goal is to make this as easy as possible, and reproducible, so that anyone else with an itch for a new project could do the same. Until then, I will stare at my tracking numbers.

