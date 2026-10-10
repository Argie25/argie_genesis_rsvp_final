ARGIE & GENESIS — SUPABASE RSVP SETUP

1. Create a free Supabase project.
2. Open Supabase > SQL Editor > New query.
3. Copy all of supabase_setup.sql and click Run.
4. In your Supabase project settings/API area, copy:
   - Project URL
   - Publishable (browser-safe) key
5. Open script.js.
6. Replace:
     YOUR_SUPABASE_PROJECT_URL
     YOUR_SUPABASE_PUBLISHABLE_KEY
7. Save script.js.
8. Open/index host the website and submit a test RSVP.
9. View responses in Supabase > Table Editor > rsvps.

SECURITY
The included Row Level Security policy lets visitors INSERT responses only.
It does NOT let the public website SELECT/read the guest list.

NEVER put a Supabase secret/service_role key in script.js.

FILES
index.html
style.css
script.js
supabase_setup.sql
README.txt

UPDATED VERSION
- Semi-formal palette: mustard yellow, dusty blue, white, beige.
- Generated outfit inspiration is included in assets/guest-dress-code.jpg.
- Selecting No hides/disables the attendee fields and saves guests=0 and an empty attendee_names array.
- Selecting Yes allows 1–10 attendees INCLUDING the person responding.
- One required full name per attendee; names are saved in attendee_names.
- Fixed early Supabase initialization: missing configuration no longer breaks the menu or form behavior.

IMPORTANT DATABASE UPGRADE
If your table already exists from the previous version, run supabase_migration.sql
in the SQL Editor BEFORE using this version. It preserves existing responses.
For a new project, run supabase_setup.sql instead.
Copy your URL and browser-safe key from the project's Connect dialog or
Settings > API Keys into the two CUSTOMIZE placeholders in script.js.
No real credentials were present in the previous ZIP.

TEST BEFORE SHARING
Select Yes, choose 10, and enter all names. Submit and check the row in Table Editor.
Select No: the attendee section disappears; submit and verify zero guests.
Test on your phone and with a failed network connection.
Live database saving requires your Supabase configuration; it was not tested here.

DEPLOY
Upload index.html, style.css, script.js and the assets folder together to your
static host (GitHub Pages, Netlify or Cloudflare Pages). Keep relative paths intact.
SQL files are run in Supabase, not in the browser. Edit the contact email and
reception venue placeholders before sharing the invitation.

PHOTO CREDIT
Urdaneta Philippines Temple by ProbablyOblivious, CC0 public domain.
https://commons.wikimedia.org/wiki/File:UrdanetaPhilippinesTemple.jpg

IMAGE GUIDE PROMPT
Semi-formal Filipino wedding guest fashion illustration, four pairs in mustard
yellow, dusty blue, white and beige; modest dresses, collared shirts and tailored
trousers/suits on ivory paper, labeled colors with matching swatches.
Created using the built-in image generator.

FLORAL DESIGN UPDATE
Added original watercolor sunflower, dusty-blue flower, white blossom and sage
eucalyptus corner bouquets to the story and RSVP sections.
Decorative images are hidden from screen readers and cannot block taps.
Mobile devices use smaller, subtler florals. Search CUSTOMIZE in style.css to
adjust their size and placement. Keep assets/floral-minimal.png with the site.
Generated with the built-in image generator: transparent upper-left watercolor
bouquet, yellow sunflowers, dusty-blue flowers, white blossoms and eucalyptus.

FINAL VISUAL UPDATE
- Hero uses assets/urdaneta-temple-sunset.jpg, an AI-edited sunset depiction
  based on the Urdaneta Temple photograph. It is not an original documentary photo.
- No floral decorations in the hero section.
- Option 3 minimalist sunflower/dusty-blue corners decorate Our Story and RSVP.
- Guest dress-code guide now shows clothing only, gentlemen and ladies, in
  mustard yellow, dusty blue, white and beige.
- Earlier RSVP behavior and Supabase setup/migration are preserved.
