# Paged.js the year in review



2020 is finally getting a well deserved ending. 

A lot of planned events were postponed, or simply cancelled, and with it a lot of Pagedjs workshop and demos. We ended up buying cameras and microphones, trying to move things toward a more remote events planning. But when everyone started to do the same.

But 2020 also came up with some interresting stuff in pagedjs. Let’s see what happened, and what’s 2021 is preparing for us. 



Building a js library to help people is hard. 

First, you have a lot of different users. Some come from the land of documentation (report, data stuff, manuals, etc.) who want to be efficient when it comes to make PDF. Some others come from the land of the designers, and they want to get out of the proprietary software, or try new things. While both have mutual interrests, they also come with high specifities. 

ANd then comes the roadmap.



## Wait, why are you talking about the w3c? We’re talking about print, aren’t they folks of the web?

The web is a land of differences: people will use different devices, different computers, different OSes, and each of them will have their own way of doing/reading/touching things. To be able to offer a choice to the user, the people in charge of how things work put on paper how things work. And people in charge of browsers make it work following those specifications that we call the *standards*.

That’s why when someone is looking at a website on his apple phone, they see more or less the same content than somebody else sees. They’re are some differences, but people who make website know how to make it work, and test those websites on as much computer and devices as possible.

Those specs are the dictionnaries of the common language of the web designers. Like all languages, it has some flaws, but we’re able to understand ourselves pretty much. And people even make poetry out of it, and find news ways of using that language, pushing the boundaries of what the dictionnaries cover, adding things to be discussed by the people in charge of the specifications.

For Paged.js, we decided to follow the specifications first and foremost. The goal is the following: we help the browser, until they implement what we do, and then, we’ll go do something else, job done. To be sure that the plan works, there is only one way: follow the standards. 



---

Let’s have a look at how footnote works today:

- There is a standard for footnote in the specification for #CSSprint, but nothing for HTML note elements, or any other kind of note (notes in the margins, hanging notes, etc.). There is no way to set the those using semantic HTML. People rely on `span` elements with a footnote class, and some CSS trickery to make it look like a footnote, but it’s not a real footnote.

- So we decided to take up the conversation to the w3c. Julie and I spent quite some time on figuring out how footnote should be described in HTML, pushing the boundaries of the standards.

- Eventually, we’ll be able to discuss this and show some example of how it could work. We’ll even put that into actual Pagedjs supported features to show how it could work for print, and we also have some ideas for the screen.

- In the end, we’ll have HTML semantic notes (margin notes, footnotes, etc.), offering to the browsers ways to implement it, if they want to support it someday. 

- Meantime, we’ll follow the W3C specs for the css print, and allow authors to use footnote in the very limited assumptions the specs offer. Note that those standards are old, and things changed a lot. I’m pretty sure that the specs would be written differently today.

---

Paged.js 1.0 is coming. That doesn’t mean that the work is over. But we’re almost to the point where the features defined in the existing specs are supported, or at least easily made with hooks or plug-ins, including the exciting footnotes. 













### But why talking about those specs? I don’t get it.

When you’re building a library, you’re adding tools to an existing toolbox. In a world where evey screw has a Philips head, you don’t want to give to your users a Torx one.

If we want paged.js to be broadly used by the community 

Paged.js is all about community: working together with other folks of #CSSPrint to define the next specs, help people 

Footnotes doesn’t exist in the specs.

What happens when you need something that is not covered by the specs?






 



To be used in the browser, or in a web environment, any feature 

Pagedjs is a polyfill. A polyfill is a javascript implementation of a feature that is ready to be supported by the browser.



## Our users are the best

The good thing with this kind of post is that you get to go through all the things you did in the year. A lot of this is an invisible —but the most important one— to help people understand how pagedjs work, and what can be done with it.

- Musée Chiragan

- Voting works

- Walden Pond

- Sarah Garcin

- The french state, Rstudio, Thomas  Vroydtland, Maelle Salmon

- Atla self publishing with Editoria

- La Head





















