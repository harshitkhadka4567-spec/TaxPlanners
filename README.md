# Accounting & Tax Planners of NY Inc Website

Premium static multi-page website for **Accounting & Tax Planners of NY Inc**, a New York accounting, tax preparation, bookkeeping, payroll, and tax compliance firm led by Rakesh Baxi, EA.

The site uses only HTML, CSS, and JavaScript. It is informational and lead-generation only. It does not include a backend, database, document upload, client portal, SSN collection, tax document collection, or bank information collection.

## Pages

```text
index.html       Home
services/        Services
resources/       Firm-created resources, checklists, and worksheets
tax-help/        Official Tax Action Finder, smart answers, government links, tax topics
about/           Firm story and process
contact/         Contact form and map
```

## File Structure

```text
.
|-- index.html
|-- services/
|   `-- index.html
|-- resources/
|   |-- .gitkeep
|   `-- index.html
|-- tax-help/
|   `-- index.html
|-- about/
|   `-- index.html
|-- contact/
|   `-- index.html
|-- styles.css
|-- script.js
|-- tax-help-data.js
|-- data/
|   `-- state-tax-actions.js
|-- README.md
|-- assets/
|   |-- .gitkeep
|   `-- images/
|       |-- site-logo.png
|       |-- hero-office.jpg
|       |-- services-banner.png
|       |-- tax-resources.png
|       |-- nyc-office.png
|       |-- accounting-desk.png
|       |-- advisory-illustration.png
|       `-- contact.png
```

## Run Locally

Run a simple static server from the project root:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Publish With GitHub Pages

1. Push this folder to a GitHub repository.
2. Open the repository on GitHub.
3. Go to **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the branch, usually `main`, and the root folder `/`.
6. Save and wait for the published GitHub Pages URL.

## Resources Page

`resources/index.html` is for firm-created resources only. It currently lists checklists, worksheets, and organizers as Coming Soon items:

- Tax Document Checklist
- FBAR Worksheet
- Schedule Worksheet
- New Client Tax Organizer
- Business Tax Organizer
- Estimated Tax Worksheet

Do not add IRS, federal, state, or government search tools to the Resources page.

## Official Tax Action Finder

The Official Tax Action Finder lives on `tax-help/index.html`. It uses `data/state-tax-actions.js`, `data/tax-form-intents.js`, `script.js`, and `styles.css`.

The finder is action-based and form-aware, not homepage-based. It first classifies searches into four user intents: refund check, tax payment, basic official information, or forms. For searches like `NJ refund`, `CA payment`, `Texas sales tax`, `Florida business tax`, `IRS 1040`, or `NY IT-201`, the script detects the state, action, form number, or plain-English form intent, then returns the most direct official page available.

Search data is stored locally in JavaScript. User searches are handled in the browser and are not sent to a server by this website. The finder does not use a backend, database, AI API, chatbot, embedded web search, document upload, payment collection, SSN collection, tax document collection, bank information collection, or live website scraping.

Visitors should not enter Social Security numbers, bank information, tax documents, tax forms, or other sensitive taxpayer information.

To update official links:

1. Open `data/state-tax-actions.js`.
2. Update state direct links in `stateTaxActions`.
3. Update federal direct links in `federalTaxActions`.
4. Use the Federation of Tax Administrators state tax agency directory as the reference source for state agency URLs: https://taxadmin.org/tax-agencies/
5. Keep URLs pointed to official government websites where possible.
6. For every state, keep the action keys `refund`, `payment`, `forms`, `salesTax`, `businessTax`, `notice`, and `agency`.

State form links are controlled by each state object's `forms` field:

```js
forms: {
  general: { title: "New York Tax Forms", url: "https://www.tax.ny.gov/forms/" },
  individual: { title: "New York Individual Tax Forms", url: "https://www.tax.ny.gov/forms/income_cur_forms.htm" },
  business: { title: "New York Business Tax Forms", url: "https://www.tax.ny.gov/forms/business_cur_forms.htm" },
  salesTax: { title: "New York Sales Tax Forms", url: "https://www.tax.ny.gov/forms/sales_cur_forms.htm" },
  withholding: { title: "New York Withholding Tax Forms", url: "https://www.tax.ny.gov/forms/withholding_cur_forms.htm" },
  exactForms: []
}
```

If an exact state form is not mapped, the finder returns the state's official forms library or category forms page before using the state agency homepage. State homepage fallback is only a last resort.

Federal IRS form matches are controlled by `data/tax-form-intents.js`. Users can search by form number or by what they want to do, such as `s corp election`, `power of attorney`, `business extension`, `foreign owned llc`, `partnership return`, `employee withholding`, or `contractor form`.

To add a new federal form intent, add an object to `taxFormIntents`:

```js
{
  id: "irs-form-2553",
  title: "IRS Form 2553, Election by a Small Business Corporation",
  formNumber: "2553",
  source: "IRS",
  category: "Business Tax / S Corporation Election",
  answer: "To make an S corporation election...",
  url: "https://www.irs.gov/forms-pubs/about-form-2553",
  buttonText: "Open IRS Form 2553",
  related: [],
  keywords: ["s corp election", "elect s corp", "2553"]
}
```

Use official IRS `About Form` pages when available. If an exact federal form is not mapped, the finder falls back to IRS Forms and Instructions: https://www.irs.gov/forms-instructions

Homepage fallback is only used when a direct action URL is missing. In that case, the answer card says the direct page has not been added and the console logs:

```text
Missing direct action URL for [State] [Action]. Add it to data/state-tax-actions.js.
```

To add or edit a direct state link, update the matching state action:

```js
payment: {
  title: "Pay New Jersey Taxes",
  url: "https://www.nj.gov/treasury/taxation/payments-notices.shtml",
  answer: "Use the official New Jersey Division of Taxation payment page...",
  buttonText: "Open NJ Payment Page"
}
```

To run the console-only test searches, open the Tax Help page in a browser and run:

```js
runTaxHelpFinderTests()
```

The tests check searches such as `nj refund`, `ca refund`, `pay ny tax`, `pay irs`, `irs notice`, `poa`, `fbar`, `payroll deadline`, `texas sales tax`, `fl business tax`, `s corp election`, `business extension`, `foreign owned llc`, `employee withholding`, `contractor form`, `ny it 201`, `nj 1040`, and `ca 540`.

## Contact Form

The contact form is in `contact/index.html` and uses `script.js` for inline Formspree submission.

## Jotform Redirect Setup

In Jotform, go to:

```text
Settings → Thank You Page → Redirect to external link
```

Use this redirect URL:

```text
https://taxplanners.pro/thank-you/
```

Important: Do not collect SSNs, ITINs, tax documents, bank information, IDs, or sensitive documents through the website or public form.

## Google Maps Embed

The Google Maps iframe is in `contact/index.html`. Search for:

```html
title="Accounting &amp; Tax Planners of NY Inc location map"
```

Update the iframe only if the office address changes.

## Images and Logo

All current images are local image files in `assets/images/`, including a logo inspired by the provided reference image. The logo uses the firm name and says **Since 1998**.

If real photography becomes available later, replace the SVG illustrations with optimized local image files and update the corresponding image paths in each HTML page.

## Security Note

Do not collect sensitive tax documents through this static website.

Do not ask visitors to submit Social Security numbers, bank information, tax forms, W-2s, 1099s, identity documents, or confidential financial records through the contact form. This site should remain informational and lead-generation only.
