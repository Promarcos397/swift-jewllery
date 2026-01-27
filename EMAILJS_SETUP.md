# EmailJS Template Setup

Since our code dynamically generates the order summary (including product list, totals, and shipping details) to ensure it looks perfect on all devices, the setup in EmailJS is very simple.

## Step 1: Edit Your Template
1.  Go to your **EmailJS Dashboard**.
2.  Click **Email Templates** on the left.
3.  Select your template (`template_r985599`).

## Step 2: Configure the Content
You only need to put a single placeholder in the body. Our code now generates a **professionally designed, responsive HTML email** that will fill this space.

*   **Subject Field**:
    ```text
    Order Confirmation #{{order_id}}
    ```

*   **Content / Body Field**:
    *(Delete everything else and paste exactly this)*
    ```html
    {{{message}}}
    ```

## Step 3: Configure "To Email" (Critical!)
1.  Click the **Settings** tab at the top of the template editor.
2.  Find the **To Email** field.
3.  Enter: `{{to_email}}`
    *   *This connects the customer's email from the checkout form to the email system.*
4.  Click **Save**.

> **Important**: You must use **triple curly braces** `{{{ }}}`. This tells EmailJS to render the HTML we created (buttons, bold text, tables) instead of showing raw code.

## Step 3: Save
Click **Save**. You are done!

---

## (Optional) Reference: What does the HTML look like?
If you are curious, the `{{{message}}}` placeholder will output a responsive HTML design like this:

```html
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
    <h2 style="border-bottom: 2px solid #333; padding-bottom: 10px;">Order Confirmation #LL1234</h2>
    <p>Dear [Customer Name],</p>
    <p>Thank you for choosing Luxury Lune...</p>
    
    <h3>Shipping Details</h3>
    <p>[Address Info]</p>
    
    <h3>Order Summary</h3>
    <!-- Product Table generated automatically -->
    <table>...</table>
</div>
```
