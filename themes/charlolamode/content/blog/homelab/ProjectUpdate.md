---
title: DBRE Terraform Modules, Ansible-Playbooks, and my first Public Project
type: page
description: While I was gone, I was busy at work with IaC and my first public github project
topic: IaC and HTML/CSS
date: 2024-07-14
---

# I have been busy

You will notice how my posts are spread out, and my answer for that is simple; life. Between several life changes, a cross country move, and busy work life, it is hard for me to muster the energy to do anything other than meditate and go to sleep. So here are a few things I have been working on in the limited time I have.

## Terraform Modules for DBREs

Over the last few months, I have been working hard on deploying Database IaC at my jobby job. When I first started building the modules, I realized how much there WASN'T out there for fellow DBAs and DBREs. I would find overly complicated modules with more variables than members of the Duggar's Family, embedded scripts to ping alerts, etc. So I started building out modules that were easy to use, without anything complicated to it. Over time, I will iterate from these as they are now, but they can serve as a good base for your journey into IaC as a DBA/DBRE with Terraform.  

Full disclosure: these are written to work with AWS RDS, DocumentDB, DynamoDB, and AWS Aurora engines. In the future, I hope to include as many cloud providers as possible.

https://github.com/randoneering/aws_dba_terraform_modules


## Ansible Playbooks

It goes without saying that these playbooks are nothing too complicated. Again, I was looking at low hanging fruit to tackle when modernizing automated tasks as a DBA/DBRE. 

https://github.com/randoneering/aws_db_ansible_playbooks


## Hugo Template 

When it comes to HTML and CSS, I have no experience at all. However, I feel pretty confident in my ability to research, study, reverse engineer, and simply just ask those who do have experience for help. I originally found this Hugo template and immediately fell in love with it. It is simple, easy to read, and doesn't have too much going on. The point for this blog is to just write about my hobbies and things I find interesting. However, I wanted to make it tailored to my liking. I started to mess with the HTML and CSS code, and went down the path of just forking the original repo to create my own flavor. And of course, throwing the Dracula theme in the mix. This is an unofficial "Dracula" themed site, but I did use the official color scheme. 

To be honest, I am pretty proud of where I am with this. Sure, the readme needs work, and I still have to clean up the code a bit. But this is a true passion project that has no tie in with what I do with my job. I love to learn new aspects of technology, reverse engineer, and build off of the experience. Feel free to use this template for yourself! 

https://github.com/randoneering/hugo-dracula-charlolamode
