# Dev Journal: Improving Luxury Lune

## What I Worked On
I spent today polishing the website to make it look great and work even better. I added the new jewelry items (the Pearl and Piercing collections) and fixed a really annoying bug on the Account page that was stopping buttons from working.

## The Problem: Buttons That Wouldn't Click
The biggest headache was the new **Login / Register** page. It looks cool with that frosted glass effect, but when I tried to click "Register," nothing happened.

**What was happening:**
I thought my code was broken, but it turned out to be a design issue. Those decorative blurry circles in the background were actually sitting *in front* of the buttons, like a window pane you can't reach through. Even though they looked like they were in the back, the browser saw them as being on top, so they were "stealing" my clicks.

## The Fix: Bringing It to the Front
The fix was actually pretty simple once I found it. I used a CSS rule called `z-index`.

```css
/* style.css */
.glass-panel {
    z-index: 10; /* Move the card to the front! */
}
```

This basically told the browser: "Make sure the login card is stacked on top of everything else." As soon as I added that, the buttons started working perfectly.

## Making Navigation Smarter
I also wanted to make it easier to get to the right place. If you click "Create Account" from the menu, you should go straight to the registration form, not the login form.

I added some code to check the website link (URL).
- If the link ends in `?mode=register`, the page automatically switches to the **Register** form.
- If it ends in `?mode=login`, it shows the **Sign In** form.

Now, the dropdown menu works exactly how you expect it to.

## Speeding Up Images
Finally, I made the site faster. Our images were high quality but huge file sizes. I wrote a small script to convert all of them to a newer format called **WebP**. They look just as good but load much faster now.

## Summary
The site is now faster, the buttons actually work, and navigating around feels much smoother. Ready for launch!
