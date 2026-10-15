Put real product photos here, one per hardware type, named exactly:
router.jpg mesh.jpg modem.jpg ap.jpg switch.jpg poe.jpg cable.jpg nic.jpg adapter.jpg
nas.jpg ups.jpg firewall.jpg camera.jpg rack.jpg server.jpg

Any file that is missing falls back to the built-in illustration.
Only use photos you have the right to use (your own, a manufacturer press kit, or Creative Commons with credit).
To record a credit shown under the photo, add an entry in src/data/hardwareCredits.json:
{"router":{"author":"Name","license":"CC BY-SA 4.0","source":"https://..."}}
Or run: npm run images   (downloads Creative Commons photos from Wikimedia Commons, see scripts/fetch-hardware-images.mjs)
