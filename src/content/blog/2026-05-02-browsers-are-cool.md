---
title: "Browsers Are Cool"
description: "Notes for Chapter 1 of Web Browser Engineering"
pubDate: "2026-05-03"
tags: []
---

As a web developer, I've become quite comfortable working within browser environments. Yet I've never fully understood how they work. 

I've also been itching to write again (about anything) and to just tinker!

So I figured I'd casually read through the [Web Browser Engineering](https://browser.engineering/) book and jot down my thoughts and learnings.

### Preface Notes

I loved the [History of the Web](https://browser.engineering/history.html) chapter! It makes you realize just how far we've come - and also just how impressive a feat it is to have such sophisticated web browsers right at our fingertips.

[This](http://info.cern.ch/hypertext/WWW/TheProject.html) is the first ever web page ... crazy... and freaking cool.

Also this:

> Since Chromium and WebKit have a common ancestral codebase, while Gecko is an open-source descendant of Netscape, all three date back to the 1990s—almost to the beginning of the web.

... amazing.

### Chapter 1 Notes

CH1 was fun! By the end of the chapter I was already rendering simple html pages, albeit crudely!

> All code is here: https://github.com/supermacro/netview/

And all it took to implement simple rendering was this:

```python lineNumbers
def show(html_body: str) -> str:
    in_tag = False

    raw_content = ""

    for c in html_body:
        if c == "<":
            in_tag = True
        elif c == ">":
            in_tag = False
        elif not in_tag:
            raw_content += c

    return raw_content
```


Calling `load(URL(url))` on https://gdelgado.ca (using http 1.0, not 1.1) works and renders this [crude] content:

```
 Giorgio Delgado
  Giorgio DelgadoAboutArchives    Latest Post:   Reference xargs Input String In Your Shell Expressions    January 7, 2022  in software   While working on the Caribou Engineering Blog website (repo), I needed to do some reshuffling of the contents of a particular directory. 
Continue Reading ...
    © Giorgio Delgado 2013 - 2026. View source code on GitHub.
```

Or more interestingly, calling it on [the first site ever](http://info.cern.ch/hypertext/WWW/TheProject.html) renders this:

```
The World Wide Web project



World Wide WebThe WorldWideWeb (W3) is a wide-area
hypermedia information retrieval
initiative aiming to give universal
access to a large universe of documents.
Everything there is online about
W3 is linked directly or indirectly
to this document, including an executive
summary of the project, Mailing lists
, Policy , November's  W3  news ,
Frequently Asked Questions .

What's out there?
 Pointers to the
world's online information, subjects
, W3 servers, etc.
Help
 on the browser you are using
Software Products
 A list of W3 project
components and their current state.
(e.g. Line Mode ,X11 Viola ,  NeXTStep
, Servers , Tools , Mail robot ,
Library )
Technical
 Details of protocols, formats,
program internals etc
Bibliography
 Paper documentation
on  W3 and references.
People
 A list of some people involved
in the project.
History
 A summary of the history
of the project.
How can I help ?
 If you would like
to support the web..
Getting code
 Getting the code by
anonymous FTP , etc.
```

## Other interesting things


#### HTTP 3 no longer relies on TCP! 

Up until HTTP/3.0, the underlying networking protocol was TCP - but moving forward the underlying protocol is [QUIC](https://en.wikipedia.org/wiki/QUIC), which is actually UDP-based!


