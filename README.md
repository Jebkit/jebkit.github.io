# Jebkit — Nintendo Switch 2 WebKit Project

Jebkit is a clean, browser-compatible user interface built for the Nintendo Switch 2 WebKit browser environment.

## Visual & Functional Features
- **Matrix Waterfall Animation**: Lightweight 2D canvas effect featuring red glowing characters.
- **Glossy UI & Dark-Red Palette**: Aesthetic interface design using CSS backdrop filters and smooth gradient styling.
- **Firmware Verification Modal**: Includes a non-intrusive reminder popup requesting manual firmware verification in system settings.
- **5-Second Delayed Confirmation**: Enforces a safety delay on confirmation actions.
- **Sandboxed Compatibility**: Graceful handling of isolated browser sandbox constraints without false system state claims.

## How to Run

### Local Web Server
1. Clone or extract the project directory.
2. Serve the directory using any static web server:
   ```bash
   # Using Python 3
   python3 -m http.server 8080