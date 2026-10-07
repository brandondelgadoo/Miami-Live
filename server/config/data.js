// Seed data for Miami Live: Miami music venues and their shows.
// Times include their UTC offset (EDT is -04:00, EST is -05:00) so they are
// stored correctly in the TIMESTAMPTZ column.

const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`

const locationsData = [
  {
    name: 'Kaseya Center',
    neighborhood: 'Downtown',
    address: '601 Biscayne Blvd',
    city: 'Miami',
    state: 'FL',
    zip: '33132',
    description:
      "The bayfront arena that hosts the HEAT and the biggest touring shows in the city. Catch arena-sized pop, Latin and hip-hop tours with Biscayne Bay right outside.",
    image: img('1540039155733-5bb30b53aa14'),
    capacity: 19600,
    latitude: 25.7814,
    longitude: -80.187,
    color: '#ff4fa3',
    events: [
      {
        title: 'Neon Tide World Tour',
        genre: 'Synth-pop',
        description: 'Neon Tide brought lasers, glitter cannons and a two-hour retro synth set to the bayfront.',
        start_time: '2026-03-14T20:00:00-04:00',
        price_from: 59,
        image: img('1470229722913-7c0e2dbbafd3')
      },
      {
        title: 'Calle Ocho Allstars Reunion',
        genre: 'Latin pop',
        description: "Miami's favorite Latin pop group reunited for one night only, playing every hit from the 2000s.",
        start_time: '2026-08-22T20:00:00-04:00',
        price_from: 75,
        image: img('1501386761578-eac5c94b800a')
      },
      {
        title: 'Luna Vega: Corazón Eléctrico Tour',
        genre: 'Reggaetón',
        description: 'The reggaetón superstar brings her arena tour home to Miami with a full dance troupe and a 360° stage.',
        start_time: '2026-10-24T20:00:00-04:00',
        price_from: 89,
        image: img('1493225457124-a3eb161ffa5f')
      },
      {
        title: 'Heatwave Holiday Jam',
        genre: 'R&B / Hip-hop',
        description: 'The annual holiday show with a lineup of R&B and hip-hop headliners and a surprise guest.',
        start_time: '2026-12-12T19:30:00-05:00',
        price_from: 65,
        image: img('1459749411175-04bf5292ceea')
      },
      {
        title: 'The Midnight Pilots',
        genre: 'Rock',
        description: 'Stadium-sized rock anthems from the Grammy-nominated four-piece on their "Night Flight" tour.',
        start_time: '2027-02-20T20:00:00-05:00',
        price_from: 55,
        image: img('1429962714451-bb934ecdc4ec')
      }
    ]
  },
  {
    name: 'The Fillmore Miami Beach',
    neighborhood: 'South Beach',
    address: '1700 Washington Ave',
    city: 'Miami Beach',
    state: 'FL',
    zip: '33139',
    description:
      'A restored 1950s theater (once the Jackie Gleason Theater) a few blocks from the ocean. It has great sightlines, a big dance floor and a lot of history.',
    image: img('1514525253161-7a46d19cd819'),
    capacity: 2700,
    latitude: 25.7926,
    longitude: -80.1335,
    color: '#2de2e6',
    events: [
      {
        title: 'Coral Static',
        genre: 'Indie rock',
        description: 'Fuzzy guitars and ocean-sized choruses from the Miami Beach indie favorites.',
        start_time: '2026-05-09T20:00:00-04:00',
        price_from: 35,
        image: img('1516450360452-9312f5e86fc7')
      },
      {
        title: 'Sunset Strings Orchestra: Electronic Classics',
        genre: 'Orchestral',
        description: 'A 30-piece string orchestra reimagined dance-floor classics by candlelight.',
        start_time: '2026-09-19T19:00:00-04:00',
        price_from: 45,
        image: img('1511671782779-c97d3d27a1d4')
      },
      {
        title: 'Velvet Hurricane',
        genre: 'Soul',
        description: 'A Halloween night of big-band soul. Costumes are encouraged and the best one wins a backstage pass.',
        start_time: '2026-10-31T21:00:00-04:00',
        price_from: 40,
        image: img('1514320291840-2e0a9bf2a9ae')
      },
      {
        title: 'Art Deco Jazz Revue',
        genre: 'Jazz',
        description: 'Art Basel week kicks off with swing, bebop and a 1920s-style revue, dress code included.',
        start_time: '2026-12-05T20:00:00-05:00',
        price_from: 50,
        image: img('1415201364774-f6f0bb35f28f')
      },
      {
        title: 'Nightjar & The Saltwater Choir',
        genre: 'Folk',
        description: 'Harmony-heavy folk with a 12-voice choir, touring their new album "Low Tide Hymns".',
        start_time: '2027-01-23T20:00:00-05:00',
        price_from: 32,
        image: img('1508700115892-45ecd05ae2ad')
      }
    ]
  },
  {
    name: 'Ball & Chain',
    neighborhood: 'Little Havana',
    address: '1513 SW 8th St',
    city: 'Miami',
    state: 'FL',
    zip: '33135',
    description:
      "Calle Ocho's legendary saloon, open since 1935. It has live salsa, son and Latin jazz on the pineapple stage and some of the best mojitos in town.",
    image: img('1504680177321-2e6a879aac86'),
    capacity: 400,
    latitude: 25.7655,
    longitude: -80.2185,
    color: '#ffb547',
    events: [
      {
        title: 'Salsa Sundays with Orquesta del Sol',
        genre: 'Salsa',
        description: 'A free dance lesson at 4pm followed by three sets from a 10-piece salsa orchestra.',
        start_time: '2026-07-12T16:00:00-04:00',
        price_from: 0,
        image: img('1504680177321-2e6a879aac86')
      },
      {
        title: 'Latin Jazz Night: Rafael Montoya Quintet',
        genre: 'Latin jazz',
        description: 'Piano-led Afro-Cuban jazz from one of Little Havana’s most beloved bandleaders.',
        start_time: '2026-09-03T21:00:00-04:00',
        price_from: 15,
        image: img('1415201364774-f6f0bb35f28f')
      },
      {
        title: 'Friday Night Rumba',
        genre: 'Rumba',
        description: 'Congas, cajón and call-and-response vocals on the pineapple stage.',
        start_time: '2026-10-09T21:00:00-04:00',
        price_from: 10,
        image: img('1533174072545-7a4b6ad7a6c3')
      },
      {
        title: 'Viernes Culturales Afterparty',
        genre: 'Latin',
        description: "After Calle Ocho's monthly art walk, the party moves inside for live son and a DJ until 2am.",
        start_time: '2026-10-30T21:00:00-04:00',
        price_from: 0,
        image: img('1492684223066-81342ee5ff30')
      },
      {
        title: 'Son Cubano Night with Los Guajiros de Miami',
        genre: 'Son cubano',
        description: 'Tres guitar, bongó and classic son montuno. Expect a full dance floor.',
        start_time: '2026-11-14T21:00:00-05:00',
        price_from: 15,
        image: img('1514320291840-2e0a9bf2a9ae')
      },
      {
        title: "New Year's Eve Fiesta",
        genre: 'Salsa / Timba',
        description: 'Ring in 2027 Little Havana style with live timba, a champagne toast and twelve grapes at midnight.',
        start_time: '2026-12-31T21:00:00-05:00',
        price_from: 45,
        image: img('1506157786151-b8491531f063')
      }
    ]
  },
  {
    name: 'Club Space',
    neighborhood: 'Park West',
    address: '34 NE 11th St',
    city: 'Miami',
    state: 'FL',
    zip: '33132',
    description:
      "Miami's world-famous after-hours club. The rooftop Terrace is where the sunrise sets happen and the parties regularly run past noon.",
    image: img('1516450360452-9312f5e86fc7'),
    capacity: 2000,
    latitude: 25.7848,
    longitude: -80.193,
    color: '#a774ff',
    events: [
      {
        title: 'Terrace Sunrise Sessions: Kai Morrow',
        genre: 'Techno',
        description: 'A Miami Music Week marathon. Kai Morrow played open to close as the sun came up over the Terrace.',
        start_time: '2026-03-28T23:00:00-04:00',
        price_from: 40,
        image: img('1470229722913-7c0e2dbbafd3')
      },
      {
        title: 'Deep Current: All Night Long',
        genre: 'House',
        description: 'Soulful and deep house from the Deep Current crew, from 11pm until whenever.',
        start_time: '2026-06-20T23:00:00-04:00',
        price_from: 30,
        image: img('1524368535928-5b5e00ddc76b')
      },
      {
        title: 'Space Invaders: Halloween Edition',
        genre: 'Tech house',
        description: 'Three rooms, costumes required, and a lineup that is not announced until doors open.',
        start_time: '2026-10-31T23:00:00-04:00',
        price_from: 45,
        image: img('1540039155733-5bb30b53aa14')
      },
      {
        title: 'Basel Week Marathon: Odessa Ray',
        genre: 'Melodic techno',
        description: 'Odessa Ray plays an extended open-to-close set during Art Basel Miami Beach week.',
        start_time: '2026-12-04T23:00:00-05:00',
        price_from: 50,
        image: img('1514525253161-7a46d19cd819')
      },
      {
        title: 'Miami Music Week Closing Party',
        genre: 'Techno / House',
        description: "The last party of MMW 2027, a 24-hour lineup to close out the city's biggest week for dance music.",
        start_time: '2027-03-27T23:00:00-04:00',
        price_from: 70,
        image: img('1501386761578-eac5c94b800a')
      }
    ]
  },
  {
    name: 'Oasis Wynwood',
    neighborhood: 'Wynwood',
    address: '2335 N Miami Ave',
    city: 'Miami',
    state: 'FL',
    zip: '33127',
    description:
      "An open-air food hall and courtyard stage surrounded by Wynwood's murals. Grab a bite, find a spot on the turf and catch a show under the stars.",
    image: img('1533174072545-7a4b6ad7a6c3'),
    capacity: 1000,
    latitude: 25.7998,
    longitude: -80.1957,
    color: '#7cff6b',
    events: [
      {
        title: 'Wynwood Block Party',
        genre: 'Hip-hop',
        description: 'Local MCs, live graffiti, food trucks and a DJ battle took over the courtyard.',
        start_time: '2026-04-18T18:00:00-04:00',
        price_from: 20,
        image: img('1492684223066-81342ee5ff30')
      },
      {
        title: 'Reggae on the Patio: Island Roots Collective',
        genre: 'Reggae',
        description: 'Roots reggae and dub on a summer night with jerk chicken from the Oasis kitchens.',
        start_time: '2026-08-08T19:00:00-04:00',
        price_from: 18,
        image: img('1506157786151-b8491531f063')
      },
      {
        title: 'Indie Night: Paper Lanterns + Sea Glass',
        genre: 'Indie',
        description: 'Two of South Florida’s best up-and-coming indie bands share a bill under the string lights.',
        start_time: '2026-10-16T20:00:00-04:00',
        price_from: 22,
        image: img('1508700115892-45ecd05ae2ad')
      },
      {
        title: 'Art Basel Mural Jam',
        genre: 'Funk / Soul',
        description: 'Live mural painting set to a funk and soul band during Art Basel week.',
        start_time: '2026-12-03T19:00:00-05:00',
        price_from: 25,
        image: img('1459749411175-04bf5292ceea')
      },
      {
        title: 'Spring Fling Funk Fest',
        genre: 'Funk',
        description: 'An all-day funk festival with brass bands, a horn section battle and a sunset headliner.',
        start_time: '2027-04-10T17:00:00-04:00',
        price_from: 35,
        image: img('1429962714451-bb934ecdc4ec')
      }
    ]
  }
]

export default locationsData
