# .design-ref — TEMPORARY

Visual reference for the redesign discussed on the client call. Exported from
the Claude Design canvas because the hosted link is not readable from the dev
environment.

**This directory is temporary. Delete it once the redesign lands.**

```
Homepage-Copper.dc.html   the chosen palette — primary reference
Homepage.dc.html          alternate palette, not chosen
Tratamentos.dc.html       treatments listing
Tratamento.dc.html        treatment detail (sticky sidebar pattern)
Blog.dc.html              blog index
Design System.dc.html     tokens, type scale, components on one page
REDESIGN-PROMPT.md        the original brief
screenshots/              PNG renders, quicker to scan than the HTML
support.js                Claude Design canvas runtime; needed only to open
                          the .dc.html files in a browser
```

Open any `.dc.html` directly in a browser to inspect it.

## Two things in these files are out of date

1. **City.** The brief and every mock say Curitiba / Eco Medical Center / (41)
   phone. The practice is in **Campo Grande/MS, Instituto do Aparelho
   Digestivo**. Port the layout, never the content.
2. **Fonts.** The mocks use Newsreader + Manrope; the site ships Montserrat +
   Cinzel. Swapping is a brand decision and a performance cost — see PR #17.

## Ported so far

Tracked as checkboxes under "Escopo do mês → 3" in PR #17.
