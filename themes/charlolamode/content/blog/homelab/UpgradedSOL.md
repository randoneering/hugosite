---
title: Upgraded SOL
type: page
description: Time to upgrade the SOLar Server
topic: Homelab
publishDate: 2022-01-01
---

As a true homelab enthusiast, I decided to swap out the middle fans of my supermicro 826 server chassis and the two X5860s  with two L5640s. For months, I have left my lab running, but barely using the 20+ cores and 128GB of RAM I have in the box. Paired with a 1000w power supply, I was feeling pretty guilty having this old server sucking power and it not going to good use.


So naturally, I looked into where I can cut some of the power. A friend of mine sent me a link on how to change the power settings in proxmox, which you can do for yourself from the information [here](https://community.home-assistant.io/t/psa-how-to-configure-proxmox-for-lower-power-usage/323731).




**Xeon Comparison**


L5640
{{< figure src="/images/L5640.png" title="" >}}
X5680
{{< figure src="/images/X5680.png" title="" >}}


Yet, I figured, while I was at it, I could replace the middle fans to lower power/lower rpm models. At the same time, I would be reducing some of the noise this server creates. After some research, I picked up three Noctua NF-A8 PWN fans. Now, it was how I was going to get these fans replaced that left me hoping someone out there created a 3d model of the hot swappable cases the supermicro fans come in. Lucky for me, someone did just that!


[Link to STL](https://www.thingiverse.com/thing:5452309)


With the power script in place, it was just a matter of planning downtime to install the cpus and fans!


**Final Product**
{{< figure src="/images/frontpicturefans.png" title="" >}}
{{< figure src="/images/backpicturefans.png" title="" >}}


In typical fashion, the plan was solid. However, It seems I did not double check if the case for the fans would fit (they did, but needed modification) and I apparently was out of thermal paste. What would have been a one night upgrade, took two. I ended up using an oscillating saw to cut off the tabs since they were printed at 100% infill.


Regardless, I am happy with the upgrade. The fans are so quiet compared to the previous fans, which was not a shock. Of course there would be a difference between 6000rpm to 2000-3000rpm. And I feel better knowing the cpus are sipping power.


Overall, happy with the decision. I can feel less guilty if SOL isn't working hard since it will be taking half the power it was taking in before. On to the next upgrade!
