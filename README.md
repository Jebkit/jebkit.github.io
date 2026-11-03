# Jebkit

A standalone, WebKit-oriented frontend for the Jebkit interface.

## Contents

- `index.html` — self-contained interface with the red/black theme, Matrix-style background, firmware reminder dialog, Cancel control, and five-second OK delay.

## Run locally

Open `index.html` in a modern browser. No build step or external dependencies are required.

## WebKit notes

The page includes the `-webkit-` backdrop-filter prefix and standard HTML/CSS/JavaScript APIs. Test on the exact WebKit/Safari version and device where it will be hosted.

## Scope

This repository contains frontend presentation and interaction only. It does not include or implement console jailbreak, exploit, memory manipulation, or payload execution functionality. The firmware dialog is a user-facing reminder; it does not read or verify device firmware.
