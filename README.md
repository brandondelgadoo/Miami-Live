# WEB103 Project 3 - *Miami Live*

Submitted by: **Brandon Delgado**

About this web app: **Miami Live is a virtual community space for Miami's music scene. An interactive map of Miami shows five venues (Kaseya Center, The Fillmore Miami Beach, Ball & Chain, Club Space and Oasis Wynwood). Click a pin or a venue card to open that venue's page and see its upcoming and past shows. An All Events page lists every show in the city, with filters and sorting, and each upcoming show has a live countdown.**

Time spent: **#** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `Events` table**
  - [ ]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [ ]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **The web app displays a title.**
- [x] **Website includes a visual interface that allows users to select a location they would like to view.**
  - [x] *Note: A non-visual list of links to different locations is insufficient.*
- [x] **Each location has a detail page with its own unique URL.**
- [x] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**

The following **optional** features are implemented:

- [x] An additional page shows all possible events
  - [x] Users can sort *or* filter events by location.
- [x] Events display a countdown showing the time remaining before that event
  - [x] Events appear with different formatting when the event has passed (ex. negative time, indication the event has passed, crossed out, etc.).

The following **additional** features are implemented:

- [x] Interactive SVG map of Miami with venue pins placed from each venue's latitude/longitude. Hovering a pin or a venue card highlights both and shows a preview card.
- [x] The All Events page can also filter by upcoming/past and sort by date, venue or event name. Filters are saved in the URL (e.g. `/events?location=3&when=upcoming`), so a filtered view can be bookmarked or shared.
- [x] Venue pages split events into **Upcoming** and **Past** sections. Past events are greyed out, crossed out and labeled "Event has passed".
- [x] All countdowns run off one shared clock, so they tick in sync. Shows starting within 24 hours are labeled "Starting soon".
- [x] Event times always display in Miami time (ET), whatever the viewer's time zone.
- [x] Loading, error and 404 states, including a "Venue not found" page for invalid venue URLs.
- [x] Keyboard-accessible map pins, visible focus styles, reduced-motion support and a responsive layout down to phone widths.

## Video Walkthrough

Here's a walkthrough of implemented required features:

<!-- TODO: replace the link below with your GIF walkthrough. Include the Render dashboard and `SELECT * FROM events;` in psql. -->
<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

### Running locally

1. Create a PostgreSQL database on [Render](https://render.com) and copy its connection values into `server/.env` (see `server/.env.example`):

   ```
   PGUSER=...
   PGPASSWORD=...
   PGHOST=...
   PGPORT=5432
   PGDATABASE=...
   ```

2. Install dependencies for the root, server and client (the root `postinstall` installs the other two):

   ```bash
   npm install
   ```

3. Create and seed the `locations` and `events` tables:

   ```bash
   npm run reset
   ```

4. Start the Express API (port 3001) and the Vite dev server (port 5173) together:

   ```bash
   npm run dev
   ```

   Then open http://localhost:5173.

### API

| Method | Route | Description |
| --- | --- | --- |
| GET | `/api/locations` | All venues (with a count of upcoming events) |
| GET | `/api/locations/:id` | One venue |
| GET | `/api/locations/:id/events` | All events at a venue |
| GET | `/api/events` | All events, with venue name and color |
| GET | `/api/events/:id` | One event |

### Database schema

- **locations**: `id`, `name`, `neighborhood`, `address`, `city`, `state`, `zip`, `description`, `image`, `capacity`, `latitude`, `longitude`, `color`
- **events**: `id`, `location_id` (foreign key → `locations.id`), `title`, `genre`, `description`, `start_time` (`TIMESTAMPTZ`), `price_from`, `image`

### Challenges

Describe any challenges encountered while building the app or any additional context you'd like to add.

## License

Copyright 2026 Brandon Delgado

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
