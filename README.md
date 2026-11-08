# PortoBestCity

This repository represents a full refresh of my media outlet **PortoBestCity**, rebuilt from the ground up with **Next.js**.  
The content base remains powered by **Sanity**, with improvements to its schema and integration.

The project follows a **mobile-first approach**, based on the mockups created after a refresh of the graphic identity:

<img width="2736" height="1221" alt="imagem" src="https://github.com/user-attachments/assets/fafa09e8-61e7-4e21-b10d-0592d110266f" />

## Phase 1 — Mobile Implementation

The first phase focused on rebuilding the mobile experience using **Next.js 15**, **TypeScript** and the App Router. The frontend was developed around reusable components and React Server Components, with **Sanity** providing the content infrastructure through a tailored schema and a direct CMS integration.

The mobile version was designed around a flexible article list system, where posts adapt their presentation according to their type and the context in which they appear.

Original content articles receive enhanced prominence. Article pages also support image galleries, video embeds, image credits and captions, as well as related news based on associated keywords.

This established the foundation for a more flexible editorial experience, with room for content-specific features.

January, 2026.

## Phase 2 — Desktop Implementation

With the mobile experience completed, the second phase focused on bringing the new visual identity to desktop.

Rather than simply scaling up the mobile layout, the desktop version was implemented directly from the previous mockups, with layouts and component variations designed to make better use of the available screen space.

The goal was to maintain a consistent visual language across devices while giving the desktop experience its own structure and hierarchy. Instead of a bigger miniature, original posts have a bigger cover in the post page itself.

<img width="2000" height="887" alt="imagem" src="https://github.com/user-attachments/assets/369e5754-7b80-46a5-8411-6150830861aa" />


April, 2026.

## Phase 3 — Content-Specific Components

The third phase focused on taking the editorial experience further by tailoring the content presentation to the nature of each report.

Different stories require different types of information. Instead of relying exclusively on a generic article layout, I introduced **specialized content blocks** in Sanity, allowing individual reports to include structured information that better fits their subject.

This includes dedicated components for sports coverage, with match scoreboards and starting lineups, as well as concert setlists for music events.

These blocks are integrated directly into the article content, combining the flexibility of Sanity's Portable Text with custom React components. This approach makes it possible to extend the editorial experience without compromising the content workflow.

<img width="1598" height="887" alt="imagem" src="https://github.com/user-attachments/assets/dbbce4b6-9ad4-453f-96e1-8a7382e3f048" />

November, 2026.
