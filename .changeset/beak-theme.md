---
"@clawscale/react": minor
"@clawscale/tokens": minor
---

Add the Beak theme, with the colors of the Beak design system: warm graphite surfaces, one azure accent, and amber and coral for warnings and errors. Fonts, corners and density are the default theme's.

- The dark color scheme uses Beak's colors as authored. Intent buttons and tags are lit with dark text, and hover adds light.
- Beak has no light scheme of its own. The light color scheme keeps its hues on light grounds, with deeper intent colors that carry light text.
- Charts: slots 1 to 4 hold Beak's four categorical hues, and slots 5 to 8 extend them. The sequential ramp is Beak's warm gray, so magnitude spends no hue.
- Load `@clawscale/react/themes/beak.css` after `styles.css` and pass `defaultTheme="beak"`. `@clawscale/tokens` exports `beak`, adds `chartPalettes.beak` and ships `themes/beak.css`.
