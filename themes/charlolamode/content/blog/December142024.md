---
title: Weekly Post (2024-12-16)
type: page
description: News, Projects, Meditation, and Tangents
topic: weekly
publishDate: 2024-12-14
---
 
# Notable Articles

## The "Ideal" Pull Request Template
https://ashleemboyer.com/blog/pull-request-template/

I started to see this more at the company I work with now when I get tagged for schema reviews. To be honest, I love templates; I used to have a go to template for my test cases when I was a QA Test Lead. They helped me create repeatable tests that included the necessary information for anyone to pick it up and repeat that same test in the same manner. Templates are also fantastic for bug/issue reporting, incident management, demand management, and knowledge base articles. However, I think for pull requests...we should be concise and to the point. Links to related issues, design docs, and related materials should be included. If the pull request contains multiple files and commits, describing everything in detail makes it feel, for me atleast, like I am reading a novel and I will already be reading through all of the files that were committed to the PR. The article does a good job in pointing out that, like anything, you do not need to follow this EXACT method. However, it could be extremely helpful if your team is managing several feature requests and code reviewers need a quick rundown on what they are about to look at. 

## The other Macs(no not emacs)
https://eclecticlight.co/2024/12/07/a-brief-history-of-mac-servers/

Despite not being a big fan of macOS, I do like older Apple related hardware. One of the things that I never got to see until I was in my late 20s were some of the original Apple consumer servers. I love to look at some of the over engineered work done by Apple, and I cannot help to think how many companies have taken some of these designs and used them in modern day products...cough, UniFI.


## A list of 25 Space Achievements (spoiler, lots of SpaceX stuff)
https://arstechnica.com/space/2024/12/ranking-the-25-coolest-things-in-space-so-far-during-the-21st-century/

Okay, yes it was cool to see boosters come back to earth and land successfully to be reused again in other flights. Yes; SpaceX paved the way for modernizing the commercial side of the Space Industry. Yet, there were other cool things that happened in the 21st century to note as well. Like a tiny little helicopter flying on Mars, new pictures of Pluto, and my favorite, James Webb Telescope. I really want to see other companies have the same success as SpaceX so I can see less of Elon. Also-I volunteer for a Mars trip.

## Happy 9 years Let's Encrypt! 
https://letsencrypt.org/2024/12/11/eoy-letter-2024/

I remember some of my first attempts at securing my first websites were through the help of Lets Encrypt. Here is to one more year to 10!

## Clearly, the writer missed a perfect opportunity to use "Doh" as the headline...
https://www.theverge.com/2024/12/11/24318861/krispy-kreme-cybersecurity-incident-online-ordering

As someone who grew up eating these terrible donuts, and never watching a full episode of the Simpsons, I feel like this was a missed opportunity for a good "Doh" meme headline. Right? 

# Things This Week 

There has been one thing on my to do list for awhile; create some github actions to assist with posting to my website without having to do much of anything other than committing to my hugosite repo. I was not shocked to see some great tutorials out there, as well as some already put together actions that were pretty much copy pasta ready. As of this post, I have only two actions running for the hugo site repo, but I plan on getting a few more to do some things like linting, checking my grammar/spelling, suggesting better words to use in my writing to make me seem smart(er), and post to other sites. Lobste.rs is on my radar and I imagine someone has already written a solid github action for me to use as well. 


Related to my jobby job, I have been tackling a few big ticket items that have given me the opportunity to work on my python skills. In doing so, I believe I have found a bug with AWS's `describe_db_cluster` function, or someone never entered a database name when creating the instance. 


You might also notice that my site now has comments enabled, but through github conversations. So all 2-3 of you can hash out your differences in the comments section if you feel so inclined. 

For next week, I intend on posting some more terraform modules and some playbooks I have been working on. If you are looking to implement a lights out policy for your AWS RDS clusters/instances, I have a playbook ready to use for you. 




# Tool Shed

### 3 shell scripts to make you sound smarter without chatgpt
https://matt.might.net/articles/shell-scripts-for-passive-voice-weasel-words-duplicates/


### Version Control, Jujutsu style
https://neugierig.org/software/blog/2024/12/jujutsu.html

### Schema migrations, online, zero-downtime, sign me up

https://github.com/xataio/pgroll?tab=readme-ov-file

