---
title: Not Another AI Hype Train
type: page
description: Embracing, to a degree, the AI Hype Train told by a skeptic
topic: AI
category: random
publishDate: 2025-08-29
---

## Confessions

As the AI Chatbot Hype-Train started chugging along at the first announcement of OpenAI's ChatGPT in November of 2022[^1], I will admit that I was an immediate skeptic. Between the blatent dismissal of licenses and tactics to scrape the internet for training, I felt that this tool would be just like NFTs and Crypto Currency. The hype would be unreal for a few months, maybe a year, and then reality would set in that this was just another pipe dream to scam  humanity of its diginity (and money).

However, 2 years later, the hype is still strong. So strong that it becomes impossible to try and keep up with what tools are being released, who is using Agentic AI in their products, who is developing products leveraging AI entirely, and poorly designed software was found with so many vulnerabilities that it makes Gitlab Community look like a bullet proof piece of software.

Even the general public is talking about AI as a typical piece of life and how their neighbor just built this crazy new game on steam that literally uses AI to generate content for itself [^2]. I tried to avoid it, telling myself (and anyone who asked) that it was against my morals to let some chatbot suck up my hard work, phone it home for training, and suggest garbage code to fix mine code.

But-I was wrong to think this. Today, I have a dedicated server just for LLMs to assist with my personal projects and Randoneering, LLC. It is all local, cutoff from the ability to phone home to the AI Overlords, and I accessible where ever I go (thanks Tailscale!)

## Wait! Before you scream at me!

I just admitted I was wrong about AI and I know there are people out there ready to call me a traitor. Me, the Open Source Evangalist, proud supporter of the GPLv3 license, and tin hat wearing security nut.

You are right! I can totally see how you feel that way and I agree with you. Yet, I still am that person. I can still be both. When I am working on something and get stuck, I would normally go to Duck Duck Go, fire a request, and hope for the best. Sometimes, I got lucky; first post had the solution. Sometimes, I would be 4 pages in and then start reaching into my communities for help. That took a lot of time and typically led me down more rabbit holes than solutions.

So, I figured, why not replace my queries to the internet and use a model trained (albeit without any consent, regardless of copy left licensing ) on the same results I would comb through? To my complete shock, I was having better luck asking models (gwen2/3, llama2/3, etc) than what Duck Duck Go and Google. Now, I honestly just immediately ask the question to my models and hope for the best. How is that any different than using our search engines?

Of course, that was rhetorical. But feel free to tell me why I am wrong.


## AI + IDE = ??

As someone who likes to pay attention to detail, the hardest thing for me was to allow myself to use chatbots inside my IDE. I didn't want anyone trying to learn off my work and try and think like me, providing suggestions inline with my cursor. Thankfully, this is where I drew my line.

I use my local LLMs to help me get unstuck, to help me visualize examples of code, or to even review my code when I don't have someone who can. Just like giving the jock in your English class your paper to "proof read", I can let AI be that code reviewer providing suggestions. Ultimately, it is up to me and my follow up research to help me make the decision of whether or not to include it in my final work. It doesn't write my code-it simply does what any opinionated "super user" on stack overflow would do to my questions; provide feedback.

What really made me shift my stance was thanks to a talk at my local user group[^3]. I came to the talk with a completely open mind and left feeling optimistic that I could still stay true to my moral code and use AI.

## Ethical Usage

### Code

We can debate on whether or not the code our models are trained on was done in an ethical manner or the impact the training has on our environment. Each side of the argument provide their own facts and it is up to you to decide whether or not you agree.

For me, I took this to heart. I consider myself an advocate for protecting Mother Earth and giving those credit for their work. AI challenges this with its obscene amount of energy consumption [^4] and its blatant disregard for crediting authors for the code the models were trained on. So how can I justify using it?

1) 100% of the power that comes to my house is made by renewable energy. Thanks to Idaho Power, I have the option to pay extra on my rates to switch my house to use 100% renewable energy. With the extra money they receive ends up funding initiatives and grants here in Idaho [^5]
2) Early in July, ETH Zurich and EPFL announced that they would release an LLM developed on "public infrastructure" [^6]. Efforts like this prove to me that there will be more ethically trained models out there for us to use. I imagine this will continue to grow along the AI Hype-Train. While I currently haven't found a model to use, I will certainly be using this one once it is available to the greater public.


### Other Uses

You might have noticed that this entire conversation has been centered around using AI for more technical uses. But what about Art, Literature, and other uses we have yet to discover? Where do they play a role?

They don't-because the relationship between the tool and the user is not of Mutualism[^7], but of Parasitism. Using AI to generate logos, branding, or works of art takes away the human element. What is art without a human to create it?


## Final Comments and Jevons Paradox

The industry is moving fast and I cannot fathom what it will look like in 6 months because of the amount of time and money invested. Regardless, I am here to embrace AI as a tool for my work. It is not going to replace me, but rather be the flat head screw driver in my tool box. More often than not, the flat head screw driver can be used to do other tasks, like pry open a can of paint or act as a makeshift chisel.  At the end of the day,  it is just a tool to help us complete a task.

A concept that surfaces in conversations around AI is Jevons Paradox [^8]. I was listening to an episode of Changelog News Brief where first heard about Jevons Paradox [^9]. While AI seemingly "reduces" the need for us peasants because it is more "efficient" at what it does, the cost of using AI because less expensive. With the lower cost, the demand increases to integrate AI. Who is going to be the one to do that and utilize AI in these tasks? You guessed it; us peasants. That growing tech debt your team keeps adding to starts to shrink as you use AI to help knock out some of the low hanging fruit. There is still a need to review the code, but we can continue to train the AI models we use today to be better at writing tests to assist with the review.

This is ultimately what changed my mind on AI. It is up to you on how you use it. Your vibe coded weekend project turned out to be a CVE nightmare? Maybe you should have had someone other than the same tool that wrote it to verify it was following industry standard security practices. That is on you.



[^1]: https://openai.com/index/chatgpt/
[^2]: https://www.gamingonlinux.com/2025/08/some-game-developers-are-far-too-shameless-about-generative-ai-use/
[^3]: https://www.youtube.com/watch?v=6pFpB9fgYuE
[^4]: https://unric.org/en/artificial-intelligence-how-much-energy-does-ai-use/
[^5]: https://www.idahopower.com/energy-environment/green-choices/clean-energy-your-way/clean-energy-for-your-home/
[^6]:https://ethz.ch/en/news-and-events/eth-news/news/2025/07/a-language-model-built-for-the-public-good.html
[^7]:https://www.britannica.com/science/mutualism-biology
[^8]: https://en.wikipedia.org/wiki/Jevons_paradox
[^9]: https://www.youtube.com/watch?v=OgQXcAG6Crs
