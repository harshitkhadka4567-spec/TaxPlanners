const TAX_HELP_STATES = [
  { state: "Alabama", abbreviation: "AL", url: "https://revenue.alabama.gov/" },
  { state: "Alaska", abbreviation: "AK", url: "https://dor.alaska.gov/" },
  { state: "Arizona", abbreviation: "AZ", url: "https://www.azdor.gov/" },
  { state: "Arkansas", abbreviation: "AR", url: "https://www.dfa.arkansas.gov/" },
  { state: "California", abbreviation: "CA", url: "https://cdtfa.ca.gov/" },
  { state: "Colorado", abbreviation: "CO", url: "https://www.colorado.gov/tax" },
  { state: "Connecticut", abbreviation: "CT", url: "https://portal.ct.gov/DRS" },
  { state: "Delaware", abbreviation: "DE", url: "https://revenue.delaware.gov/" },
  {
    state: "District of Columbia",
    abbreviation: "DC",
    aliases: ["Washington DC", "Washington, D.C.", "D.C."],
    url: "https://cfo.dc.gov/"
  },
  { state: "Florida", abbreviation: "FL", url: "https://floridarevenue.com/" },
  { state: "Georgia", abbreviation: "GA", url: "https://dor.georgia.gov/" },
  { state: "Hawaii", abbreviation: "HI", url: "https://tax.hawaii.gov/" },
  { state: "Idaho", abbreviation: "ID", url: "https://tax.idaho.gov/" },
  { state: "Illinois", abbreviation: "IL", url: "https://www2.illinois.gov/rev/" },
  { state: "Indiana", abbreviation: "IN", url: "https://www.in.gov/dor/" },
  { state: "Iowa", abbreviation: "IA", url: "https://tax.iowa.gov/" },
  { state: "Kansas", abbreviation: "KS", url: "https://www.ksrevenue.org/" },
  { state: "Kentucky", abbreviation: "KY", url: "https://revenue.ky.gov/" },
  { state: "Louisiana", abbreviation: "LA", url: "https://revenue.louisiana.gov/" },
  { state: "Maine", abbreviation: "ME", url: "https://www.maine.gov/revenue/" },
  { state: "Maryland", abbreviation: "MD", url: "https://www.marylandtaxes.gov/" },
  { state: "Massachusetts", abbreviation: "MA", url: "https://www.mass.gov/orgs/massachusetts-department-of-revenue" },
  { state: "Michigan", abbreviation: "MI", url: "https://www.michigan.gov/treasury" },
  { state: "Minnesota", abbreviation: "MN", url: "https://www.revenue.state.mn.us/" },
  { state: "Mississippi", abbreviation: "MS", url: "https://dor.ms.gov/" },
  { state: "Missouri", abbreviation: "MO", url: "https://dor.mo.gov/" },
  { state: "Montana", abbreviation: "MT", url: "https://mtrevenue.gov/" },
  { state: "Nebraska", abbreviation: "NE", url: "https://revenue.nebraska.gov/" },
  { state: "Nevada", abbreviation: "NV", url: "https://tax.nv.gov/" },
  { state: "New Hampshire", abbreviation: "NH", url: "https://revenue.nh.gov/" },
  { state: "New Jersey", abbreviation: "NJ", url: "https://www.state.nj.us/treasury/taxation/" },
  { state: "New Mexico", abbreviation: "NM", url: "https://tax.newmexico.gov/" },
  { state: "New York", abbreviation: "NY", aliases: ["NYS", "New York State", "newyork"], url: "https://tax.ny.gov/" },
  { state: "North Carolina", abbreviation: "NC", url: "https://www.ncdor.gov/" },
  { state: "North Dakota", abbreviation: "ND", url: "https://www.nd.gov/tax/" },
  { state: "Ohio", abbreviation: "OH", url: "https://tax.ohio.gov/" },
  { state: "Oklahoma", abbreviation: "OK", url: "https://www.ok.gov/tax" },
  { state: "Oregon", abbreviation: "OR", url: "https://www.oregon.gov/DOR/Pages/index.aspx" },
  { state: "Pennsylvania", abbreviation: "PA", url: "https://www.revenue.pa.gov/Pages/default.aspx" },
  { state: "Rhode Island", abbreviation: "RI", url: "https://tax.ri.gov/" },
  { state: "South Carolina", abbreviation: "SC", url: "https://dor.sc.gov/" },
  { state: "South Dakota", abbreviation: "SD", url: "https://dor.sd.gov/" },
  { state: "Tennessee", abbreviation: "TN", url: "https://www.tn.gov/revenue/" },
  { state: "Texas", abbreviation: "TX", url: "https://comptroller.texas.gov/" },
  { state: "Utah", abbreviation: "UT", url: "https://tax.utah.gov/" },
  { state: "Vermont", abbreviation: "VT", url: "https://tax.vermont.gov/" },
  { state: "Virginia", abbreviation: "VA", url: "https://tax.virginia.gov/" },
  { state: "Washington", abbreviation: "WA", url: "https://dor.wa.gov/" },
  { state: "West Virginia", abbreviation: "WV", url: "https://tax.wv.gov/Pages/default.aspx" },
  { state: "Wisconsin", abbreviation: "WI", url: "https://www.revenue.wi.gov/" },
  { state: "Wyoming", abbreviation: "WY", url: "https://revenue.wyo.gov/" }
];

const TAX_HELP_STATE_ABBREVIATIONS = TAX_HELP_STATES.reduce((map, item) => {
  map[item.abbreviation.toLowerCase()] = item.state;
  (item.aliases || []).forEach((alias) => {
    map[alias.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()] = item.state;
  });
  return map;
}, {});

const officialTaxHelpResources = [
  {
    id: "ny-refund-status",
    title: "Check New York State Refund Status",
    answer:
      "For a New York State tax refund, use the official New York State Tax Department refund status page. You may need the tax year, Social Security number or ITIN, and the refund amount shown on the return.",
    source: "New York State Tax Department",
    state: "New York",
    category: "Refunds",
    intent: "refund",
    keywords: [
      "ny",
      "nys",
      "new york",
      "new york state",
      "refund",
      "check refund",
      "check my refund nys",
      "where is my ny refund",
      "ny refund status",
      "state refund"
    ],
    url: "https://www.tax.ny.gov/pit/file/refund.htm",
    buttonLabel: "Open NY Refund Status Page"
  },
  {
    id: "nj-refund-status",
    title: "Check New Jersey Refund Status",
    answer:
      "To check your New Jersey income tax refund, use the official New Jersey Division of Taxation refund status page. You may need your Social Security number or ITIN, tax year, and refund amount from your return.",
    source: "New Jersey Division of Taxation",
    state: "New Jersey",
    category: "Refunds",
    intent: "refund",
    keywords: [
      "nj",
      "new jersey",
      "new jersey refund",
      "nj refund",
      "check nj refund",
      "where is my nj refund",
      "new jersey refund status",
      "state refund"
    ],
    url: "https://www.nj.gov/treasury/taxation/checkrefundstatus.shtml",
    buttonLabel: "Open NJ Refund Status Page"
  },
  {
    id: "ca-refund-status",
    title: "Check California Refund Status",
    answer:
      "To check a California income tax refund, use the official California Franchise Tax Board refund status page. You may need identifying information, the tax year, and the refund amount from your return.",
    source: "California Franchise Tax Board",
    state: "California",
    category: "Refunds",
    intent: "refund",
    keywords: [
      "ca",
      "california",
      "california refund",
      "ca refund",
      "check ca refund",
      "where is my ca refund",
      "california refund status",
      "state refund"
    ],
    url: "https://www.ftb.ca.gov/refund/index.asp",
    buttonLabel: "Open CA Refund Status Page"
  },
  {
    id: "irs-refund-status",
    title: "Check Federal IRS Refund Status",
    answer:
      "To check a federal tax refund, use the official IRS Where's My Refund? tool. The IRS usually requires the tax year, Social Security number or ITIN, filing status, and exact refund amount.",
    source: "IRS",
    state: "",
    category: "Refunds",
    intent: "refund",
    keywords: ["irs refund", "federal refund", "where is my refund", "check refund", "refund status"],
    url: "https://www.irs.gov/refunds"
  },
  {
    id: "irs-direct-pay",
    title: "Pay Individual Taxes to the IRS",
    answer:
      "For individual federal tax payments, use IRS Direct Pay or other official IRS payment options. Confirm the correct tax year, form type, and payment reason before submitting payment.",
    source: "IRS",
    state: "",
    category: "Payments",
    intent: "payment",
    keywords: ["pay irs", "irs payment", "direct pay", "federal tax payment", "pay federal tax", "pay taxes"],
    url: "https://www.irs.gov/payments/direct-pay"
  },
  {
    id: "irs-payment-options",
    title: "IRS Payment Options",
    answer:
      "The IRS payment page lists official federal tax payment methods, including Direct Pay, debit or credit card, EFTPS, and other payment options.",
    source: "IRS",
    state: "",
    category: "Payments",
    intent: "payment",
    keywords: ["irs payment options", "pay irs", "payment plan", "tax bill", "balance due"],
    url: "https://www.irs.gov/payments"
  },
  {
    id: "eftps",
    title: "Pay Business or Federal Taxes Through EFTPS",
    answer:
      "EFTPS is an official U.S. Treasury system commonly used for federal business and payroll tax payments. Enrollment may be required before making payments.",
    source: "EFTPS",
    state: "",
    category: "Payments",
    intent: "payment",
    relatedCategories: ["Payroll", "Business Tax"],
    keywords: ["eftps", "payroll payment", "business tax payment", "federal tax deposit", "tax deposit"],
    url: "https://www.eftps.gov"
  },
  {
    id: "ny-tax-payments",
    title: "Pay New York State Taxes",
    answer:
      "Use the official New York State Tax Department payment page to make state tax payments. Confirm the correct tax type, period, and payment category.",
    source: "New York State Tax Department",
    state: "New York",
    category: "Payments",
    intent: "payment",
    keywords: ["pay ny tax", "pay nys tax", "new york tax payment", "state tax payment", "ny payment"],
    url: "https://www.tax.ny.gov/pay/"
  },
  {
    id: "irs-notice",
    title: "Understand an IRS Notice or Letter",
    answer:
      "If you received an IRS notice or letter, read it carefully and check the notice number, tax year, deadline, and requested action. Use the official IRS notice guide for general information.",
    source: "IRS",
    state: "",
    category: "Notices / POA",
    intent: "notice",
    keywords: ["irs notice", "irs letter", "cp2000", "notice", "letter from irs", "tax notice", "got notice", "received notice"],
    url: "https://www.irs.gov/individuals/understanding-your-irs-notice-or-letter"
  },
  {
    id: "irs-poa-form-2848",
    title: "IRS Power of Attorney, Form 2848",
    answer:
      "IRS Form 2848 allows an authorized representative to communicate with the IRS for specific tax matters, forms, and years listed on the authorization.",
    source: "IRS",
    state: "",
    category: "Notices / POA",
    intent: "poa",
    relatedCategories: ["Forms"],
    keywords: ["poa", "power of attorney", "power attorney", "form 2848", "irs representative", "tax representative", "authorize accountant"],
    url: "https://www.irs.gov/forms-pubs/about-form-2848"
  },
  {
    id: "fbar-overview",
    title: "FBAR Foreign Bank Account Reporting",
    answer:
      "FBAR reporting is handled through FinCEN Form 114. It may apply when a person has foreign financial accounts over the reporting threshold. Review official IRS and FinCEN guidance.",
    source: "IRS / FinCEN",
    state: "",
    category: "FBAR / Foreign Accounts",
    intent: "fbar",
    relatedCategories: ["Forms"],
    keywords: ["fbar", "foreign bank", "foreign account", "fincen", "form 114", "overseas account", "international account"],
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar"
  },
  {
    id: "fincen-fbar-guidance",
    title: "FinCEN FBAR Guidance",
    answer:
      "FinCEN provides official information about reporting foreign bank and financial accounts and how FBAR filing works.",
    source: "FinCEN",
    state: "",
    category: "FBAR / Foreign Accounts",
    intent: "fbar",
    relatedCategories: ["Forms"],
    keywords: ["fincen fbar", "report foreign bank", "foreign financial accounts", "foreign account reporting"],
    url: "https://www.fincen.gov/report-foreign-bank-and-financial-accounts"
  },
  {
    id: "bsa-efiling-fbar",
    title: "File FBAR Through BSA E-Filing",
    answer:
      "FBAR is filed electronically through the official BSA E-Filing system. Use the official FinCEN filing website for submission.",
    source: "FinCEN",
    state: "",
    category: "FBAR / Foreign Accounts",
    intent: "fbar",
    relatedCategories: ["Forms"],
    keywords: ["file fbar", "bsa efile", "bsa e-filing", "fincen fbar", "foreign account filing"],
    url: "https://bsaefiling.fincen.gov/file/fbar"
  },
  {
    id: "payroll-taxes",
    title: "Payroll Requirements and Employment Taxes",
    answer:
      "Employers may need to withhold federal income tax, Social Security and Medicare taxes, and pay federal unemployment tax. Review IRS employment tax guidance for employer responsibilities.",
    source: "IRS",
    state: "",
    category: "Payroll",
    intent: "payroll",
    relatedCategories: ["Business Tax"],
    keywords: ["payroll", "employment tax", "payroll tax", "employer taxes", "941", "944", "w2"],
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/employment-taxes"
  },
  {
    id: "payroll-due-dates",
    title: "Payroll Tax Due Dates",
    answer:
      "IRS payroll tax due dates depend on the filing and deposit requirements for the employer. Review official IRS due date guidance for employment taxes.",
    source: "IRS",
    state: "",
    category: "Payroll",
    intent: "payroll",
    keywords: ["payroll deadline", "employment tax due date", "941 due date", "payroll deposit", "payroll due date"],
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/employment-tax-due-dates"
  },
  {
    id: "payroll-deposits",
    title: "Depositing and Reporting Employment Taxes",
    answer:
      "Employers are responsible for depositing and reporting employment taxes according to IRS rules. Review the official IRS page for deposit and reporting requirements.",
    source: "IRS",
    state: "",
    category: "Payroll",
    intent: "payroll",
    relatedCategories: ["Payments"],
    keywords: ["payroll deposit", "deposit taxes", "employment tax deposit", "941 deposit", "944 deposit"],
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/depositing-and-reporting-employment-taxes"
  },
  {
    id: "ein",
    title: "Apply for an EIN",
    answer:
      "Businesses can apply for an Employer Identification Number through the official IRS EIN application page. Use only the official IRS website.",
    source: "IRS",
    state: "",
    category: "Business Tax",
    intent: "ein",
    relatedCategories: ["Forms"],
    keywords: ["ein", "get ein", "apply ein", "business number", "employer identification number", "tax id"],
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online"
  },
  {
    id: "business-taxes",
    title: "IRS Business Taxes",
    answer:
      "The IRS business tax page provides official federal information for businesses, including filing and tax responsibilities.",
    source: "IRS",
    state: "",
    category: "Business Tax",
    intent: "business",
    keywords: ["business tax", "business taxes", "company tax", "llc tax", "business filing"],
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/business-taxes"
  },
  {
    id: "s-corporations",
    title: "IRS S Corporation Tax Information",
    answer:
      "The IRS S corporation page provides official federal information about S corporation filing and tax responsibilities.",
    source: "IRS",
    state: "",
    category: "Business Tax",
    intent: "business",
    keywords: ["s corp", "s corporation", "1120s", "s corp return"],
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/s-corporations"
  },
  {
    id: "partnerships",
    title: "IRS Partnership Tax Information",
    answer:
      "The IRS partnership page provides official federal information about partnership filing and tax responsibilities.",
    source: "IRS",
    state: "",
    category: "Business Tax",
    intent: "business",
    keywords: ["partnership", "partnership return", "1065", "partner tax"],
    url: "https://www.irs.gov/businesses/partnerships"
  },
  {
    id: "corporations",
    title: "IRS Corporation Tax Information",
    answer:
      "The IRS corporation page provides official federal information about corporate filing and tax responsibilities.",
    source: "IRS",
    state: "",
    category: "Business Tax",
    intent: "business",
    keywords: ["corporation", "corporate tax", "c corp", "1120", "corp return"],
    url: "https://www.irs.gov/businesses/corporations"
  },
  {
    id: "ny-sales-tax",
    title: "New York Sales Tax Information",
    answer:
      "New York businesses that sell taxable goods or services may have sales tax responsibilities. Use the official New York State Tax Department sales tax page for guidance.",
    source: "New York State Tax Department",
    state: "New York",
    category: "Sales Tax",
    intent: "sales",
    relatedCategories: ["Business Tax"],
    keywords: ["ny sales tax", "nys sales tax", "sales tax new york", "sales tax web file", "collect sales tax"],
    url: "https://www.tax.ny.gov/bus/st/stidx.htm"
  },
  {
    id: "ny-sales-tax-web-file",
    title: "New York Sales Tax Web File",
    answer:
      "New York businesses can use the official New York State Tax Department online services to file sales tax returns when applicable.",
    source: "New York State Tax Department",
    state: "New York",
    category: "Sales Tax",
    intent: "sales",
    relatedCategories: ["Business Tax", "Forms"],
    keywords: ["ny sales tax web file", "file sales tax", "sales tax filing", "nys sales tax filing"],
    url: "https://www.tax.ny.gov/bus/st/stmp.htm"
  },
  {
    id: "irs-forms",
    title: "IRS Forms and Instructions",
    answer:
      "Use the official IRS Forms and Instructions page to find federal tax forms, schedules, instructions, and publications.",
    source: "IRS",
    state: "",
    category: "Forms",
    intent: "forms",
    keywords: ["forms", "irs forms", "tax forms", "instructions", "publications", "schedule"],
    url: "https://www.irs.gov/forms-instructions"
  },
  {
    id: "irs-tax-topics",
    title: "IRS Tax Topics",
    answer: "IRS Tax Topics provide official general information on common federal tax subjects.",
    source: "IRS",
    state: "",
    category: "Forms",
    intent: "forms",
    keywords: ["tax topics", "help", "tax question", "irs help", "topic"],
    url: "https://www.irs.gov/help/tax-topics"
  },
  {
    id: "irs-ita",
    title: "IRS Interactive Tax Assistant",
    answer: "The IRS Interactive Tax Assistant can help users find answers to some common federal tax law questions.",
    source: "IRS",
    state: "",
    category: "Forms",
    intent: "forms",
    keywords: ["interactive tax assistant", "ita", "tax question", "irs assistant"],
    url: "https://www.irs.gov/help/ita"
  },
  {
    id: "ssa-w2-filing",
    title: "SSA Employer W-2 Filing",
    answer:
      "Employers can use the Social Security Administration employer services for W-2 filing information and wage reporting.",
    source: "Social Security Administration",
    state: "",
    category: "Payroll",
    intent: "payroll",
    relatedCategories: ["Forms"],
    keywords: ["w2", "w-2", "wage reporting", "ssa employer", "employer w2"],
    url: "https://www.ssa.gov/employer/"
  },
  {
    id: "dol-wage-hour",
    title: "Department of Labor Wage and Hour",
    answer:
      "The U.S. Department of Labor Wage and Hour Division provides official information about federal wage and hour rules.",
    source: "U.S. Department of Labor",
    state: "",
    category: "Payroll",
    intent: "payroll",
    keywords: ["wage", "hour", "labor", "dol", "wage and hour", "employee pay"],
    url: "https://www.dol.gov/agencies/whd"
  }
];

const stateAgencyKeywords = [
  "state tax",
  "income tax",
  "sales tax",
  "business tax",
  "refund",
  "payment",
  "notice",
  "forms",
  "pay state tax",
  "state refund",
  "state notice"
];

const stateTaxAgencyResources = TAX_HELP_STATES.map((agency) => ({
  id: `${agency.abbreviation.toLowerCase()}-tax-agency`,
  title: `${agency.state} Tax Agency`,
  answer: `Use the official ${agency.state} tax agency website for state tax payments, forms, refunds, notices, business taxes, and state tax guidance.`,
  source: "State Tax Agency",
  state: agency.state,
  category: "State",
  intent: "state",
  relatedCategories: ["Payments", "Refunds", "Notices / POA", "Sales Tax", "Business Tax", "Forms"],
  keywords: [agency.state, agency.abbreviation, ...(agency.aliases || []), ...stateAgencyKeywords],
  url: agency.url
}));

const expandedFederalTaxActions = [
  {
    id: "irs-payments",
    action: "payment",
    title: "IRS Make a Payment",
    url: "https://www.irs.gov/payments",
    source: "IRS",
    answer: "Use this official IRS page to make or review federal tax payment options, including balance due, estimated tax, payment plans, card payments, and EFTPS.",
    buttonText: "Open IRS Payments",
    keywords: ["irs", "payment", "payments", "make payment", "pay irs", "pay federal tax", "pay taxes", "federal payment", "balance due", "estimated tax", "tax account"]
  },
  {
    id: "irs-direct-pay",
    action: "payment",
    title: "IRS Direct Pay",
    url: "https://www.irs.gov/payments/direct-pay",
    source: "IRS",
    answer: "Use this official IRS page to make a federal tax payment from a bank account.",
    buttonText: "Open IRS Direct Pay",
    keywords: ["irs", "direct pay", "irs direct pay", "pay irs", "pay federal", "pay federal tax", "bank account payment", "1040 payment", "estimated payment", "balance due"]
  },
  {
    id: "irs-payment-plan",
    action: "payment",
    title: "IRS Payment Plans and Installment Agreements",
    url: "https://www.irs.gov/payments/payment-plans-installment-agreements",
    source: "IRS",
    answer: "Use this official IRS page to apply for or review a payment plan or installment agreement.",
    buttonText: "Open IRS Payment Plans",
    keywords: ["irs", "payment plan", "installment agreement", "installment", "can't pay", "cannot pay", "pay over time", "tax bill", "balance due", "account"]
  },
  {
    id: "irs-card-payment-processors",
    action: "payment",
    title: "IRS Debit, Credit Card, and Digital Wallet Payments",
    url: "https://www.irs.gov/payments/pay-your-taxes-by-debit-or-credit-card",
    source: "IRS",
    answer: "Use this official IRS page to review IRS-approved card payment processors, including Pay1040 when listed by the IRS.",
    buttonText: "Open IRS Card Payment Page",
    keywords: ["irs", "card payment", "credit card", "debit card", "digital wallet", "pay1040", "pay 1040", "aci payments", "card processor", "payment processor"]
  },
  {
    id: "irs-estimated-taxes",
    action: "payment",
    title: "IRS Estimated Taxes",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes",
    source: "IRS",
    answer: "Use this official IRS page to review federal estimated tax payment rules for individuals and businesses.",
    buttonText: "Open IRS Estimated Taxes",
    keywords: ["irs", "estimated tax", "estimated taxes", "quarterly payment", "quarterly taxes", "1040 es", "1040-es", "pay estimated tax"]
  },
  {
    id: "irs-business-tax-account",
    action: "account",
    title: "IRS Business Tax Account",
    url: "https://www.irs.gov/businesses/business-tax-account",
    source: "IRS",
    answer: "Use this official IRS page to access a business tax account for eligible federal business tax services and payments.",
    buttonText: "Open Business Tax Account",
    keywords: ["irs", "business tax account", "business account", "tax account", "business payment", "business tax payment", "payroll deposit", "federal tax deposit", "account"]
  },
  {
    id: "eftps",
    action: "payment",
    title: "EFTPS",
    url: "https://www.eftps.gov",
    source: "EFTPS",
    answer: "Use this official U.S. Treasury system for eligible federal tax deposits and business, payroll, or estimated tax payments.",
    buttonText: "Open EFTPS",
    keywords: ["eftps", "electronic federal tax payment system", "federal tax deposit", "payroll payment", "business tax payment", "estimated tax", "treasury payment"]
  },
  {
    id: "irs-refund",
    action: "refund",
    title: "IRS Where's My Refund",
    url: "https://www.irs.gov/refunds",
    source: "IRS",
    answer: "Use this official IRS page to check the status of a federal tax refund.",
    buttonText: "Open IRS Refund Status",
    keywords: ["irs", "refund", "refund status", "where is my refund", "where's my refund", "federal refund", "check refund"]
  },
  {
    id: "irs-amended-return-status",
    action: "refund",
    title: "IRS Where's My Amended Return",
    url: "https://www.irs.gov/filing/wheres-my-amended-return",
    source: "IRS",
    answer: "Use this official IRS page to check the status of an amended federal tax return.",
    buttonText: "Open Amended Return Status",
    keywords: ["irs", "amended return", "amended refund", "1040x", "1040-x", "where is my amended return", "amended return status", "1040 x"]
  },
  {
    id: "irs-online-account",
    action: "account",
    title: "IRS Online Account",
    url: "https://www.irs.gov/payments/your-online-account",
    source: "IRS",
    answer: "Use this official IRS page to access an individual online account for balance, payment, tax records, and account information.",
    buttonText: "Open IRS Online Account",
    keywords: ["irs", "online account", "irs account", "tax account", "account", "balance", "payment history", "view account", "individual account"]
  },
  {
    id: "irs-get-transcript",
    action: "account",
    title: "IRS Get Transcript",
    url: "https://www.irs.gov/individuals/get-transcript",
    source: "IRS",
    answer: "Use this official IRS page to get federal tax transcripts or tax records online or by mail.",
    buttonText: "Open IRS Get Transcript",
    keywords: ["irs", "transcript", "get transcript", "tax transcript", "tax records", "wage transcript", "account transcript", "return transcript", "record of account"]
  },
  {
    id: "irs-ip-pin",
    action: "account",
    title: "IRS Identity Protection PIN",
    url: "https://www.irs.gov/identity-theft-fraud-scams/get-an-identity-protection-pin",
    source: "IRS",
    answer: "Use this official IRS page to get or manage an Identity Protection PIN.",
    buttonText: "Open IRS IP PIN",
    keywords: ["irs", "ip pin", "ippin", "identity protection pin", "identity theft", "pin", "account security"]
  },
  {
    id: "irs-withholding-estimator",
    action: "account",
    title: "IRS Tax Withholding Estimator",
    url: "https://www.irs.gov/individuals/tax-withholding-estimator",
    source: "IRS",
    answer: "Use this official IRS tool to estimate federal tax withholding from wages.",
    buttonText: "Open Withholding Estimator",
    keywords: ["irs", "withholding estimator", "tax withholding estimator", "w4", "w-4", "paycheck withholding", "employee withholding"]
  },
  {
    id: "irs-notice",
    action: "notice",
    title: "IRS Notices and Letters",
    url: "https://www.irs.gov/individuals/understanding-your-irs-notice-or-letter",
    source: "IRS",
    answer: "Use this official IRS page to understand or respond to an IRS notice or letter.",
    buttonText: "Open IRS Notices and Letters",
    keywords: ["irs", "notice", "letter", "irs notice", "irs letter", "notice reply", "respond to notice", "tax notice", "tax letter", "cp notice"]
  },
  {
    id: "irs-identity-verification",
    action: "notice",
    title: "IRS Identity and Tax Return Verification",
    url: "https://www.irs.gov/identity-theft-fraud-scams/identity-and-tax-return-verification-service",
    source: "IRS",
    answer: "Use this official IRS page if you need to verify your identity or tax return after receiving IRS instructions.",
    buttonText: "Open IRS Identity Verification",
    keywords: ["irs", "identity verification", "verify identity", "verify return", "5071c", "4883c", "identity letter", "tax return verification"]
  },
  {
    id: "irs-cp2000",
    action: "notice",
    title: "IRS CP2000 Notice",
    url: "https://www.irs.gov/individuals/understanding-your-cp2000-notice",
    source: "IRS",
    answer: "Use this official IRS page to understand a CP2000 notice and review response steps.",
    buttonText: "Open IRS CP2000 Page",
    keywords: ["irs", "cp2000", "cp 2000", "underreported income", "notice reply", "respond to cp2000", "irs letter"]
  },
  {
    id: "irs-audit-reconsideration",
    action: "notice",
    title: "IRS Audit Reconsideration",
    url: "https://www.irs.gov/filing/audit-reconsideration",
    source: "IRS",
    answer: "Use this official IRS page to review audit reconsideration information when you disagree with an IRS audit result.",
    buttonText: "Open IRS Audit Reconsideration",
    keywords: ["irs", "audit", "audit reconsideration", "reconsideration", "disagree with audit", "exam notice", "tax audit"]
  },
  {
    id: "irs-form-2848-action",
    action: "poa",
    title: "IRS Form 2848, Power of Attorney",
    url: "https://www.irs.gov/forms-pubs/about-form-2848",
    source: "IRS",
    answer: "Use this official IRS page to review Form 2848 for tax power of attorney representation.",
    buttonText: "Open Form 2848",
    keywords: ["irs", "2848", "form 2848", "poa", "power of attorney", "representative", "authorize accountant", "tax representative"]
  },
  {
    id: "irs-form-8821-action",
    action: "poa",
    title: "IRS Form 8821, Tax Information Authorization",
    url: "https://www.irs.gov/forms-pubs/about-form-8821",
    source: "IRS",
    answer: "Use this official IRS page to review Form 8821 for authorizing access to tax information.",
    buttonText: "Open Form 8821",
    keywords: ["irs", "8821", "form 8821", "tax information authorization", "authorization", "transcript authorization", "access tax information"]
  },
  {
    id: "irs-independent-contractor",
    action: "businessTax",
    title: "IRS Independent Contractor or Employee",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-defined",
    source: "IRS",
    answer: "Use this official IRS page to review worker classification information for employees and independent contractors.",
    buttonText: "Open Worker Classification Page",
    keywords: ["irs", "independent contractor", "contractor", "worker classification", "employee or contractor", "1099 worker", "w9", "w-9"]
  },
  {
    id: "irs-employment-taxes",
    action: "payroll",
    title: "IRS Employment Taxes",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/employment-taxes",
    source: "IRS",
    answer: "Use this official IRS page to review employer payroll, withholding, Social Security, Medicare, and federal unemployment tax responsibilities.",
    buttonText: "Open IRS Employment Taxes",
    keywords: ["irs", "payroll", "employment tax", "employer tax", "withholding", "941", "940", "944", "w2", "w-2", "payroll tax"]
  },
  {
    id: "irs-payroll-deposits",
    action: "payroll",
    title: "IRS Payroll Tax Deposits",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/depositing-and-reporting-employment-taxes",
    source: "IRS",
    answer: "Use this official IRS page to review depositing and reporting employment taxes.",
    buttonText: "Open IRS Payroll Deposits",
    keywords: ["irs", "payroll deposit", "payroll tax deposit", "employment tax deposit", "federal tax deposit", "941 deposit", "eftps payroll"]
  },
  {
    id: "irs-business-taxes",
    action: "businessTax",
    title: "IRS Business Taxes",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/business-taxes",
    source: "IRS",
    answer: "Use this official IRS page for federal business tax filing, payment, and tax responsibility information.",
    buttonText: "Open IRS Business Taxes",
    keywords: ["irs", "business tax", "business taxes", "company tax", "llc tax", "business filing", "business account", "business payment"]
  },
  {
    id: "irs-s-corporations",
    action: "businessTax",
    title: "IRS S Corporations",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/s-corporations",
    source: "IRS",
    answer: "Use this official IRS page for S corporation tax information and filing responsibilities.",
    buttonText: "Open IRS S Corporations",
    keywords: ["irs", "s corp", "s corporation", "s-corp", "1120s", "1120-s", "s corporation return"]
  },
  {
    id: "irs-partnerships",
    action: "businessTax",
    title: "IRS Partnerships",
    url: "https://www.irs.gov/businesses/partnerships",
    source: "IRS",
    answer: "Use this official IRS page for partnership tax information and filing responsibilities.",
    buttonText: "Open IRS Partnerships",
    keywords: ["irs", "partnership", "partnerships", "1065", "partnership return", "partner tax"]
  },
  {
    id: "irs-corporations",
    action: "businessTax",
    title: "IRS Corporations",
    url: "https://www.irs.gov/businesses/corporations",
    source: "IRS",
    answer: "Use this official IRS page for corporation tax information and filing responsibilities.",
    buttonText: "Open IRS Corporations",
    keywords: ["irs", "corporation", "corporations", "c corp", "1120", "corporate tax", "corporation return"]
  },
  {
    id: "irs-foreign-owned-entity-info",
    action: "businessTax",
    title: "IRS Foreign-Owned U.S. Entity Reporting",
    url: "https://www.irs.gov/forms-pubs/about-form-5472",
    source: "IRS",
    answer: "Use this official IRS page to review Form 5472 reporting for certain foreign-owned U.S. corporations and disregarded entities.",
    buttonText: "Open IRS Form 5472",
    keywords: ["irs", "foreign owned", "foreign-owned", "foreign owned llc", "foreign owned us entity", "disregarded entity", "5472", "1120 guidance"]
  },
  {
    id: "irs-fbar",
    action: "fbar",
    title: "IRS FBAR Guidance",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar",
    source: "IRS",
    answer: "Use this official IRS page to review FBAR reporting information for foreign bank and financial accounts.",
    buttonText: "Open IRS FBAR Guidance",
    keywords: ["irs", "fbar", "foreign account", "foreign bank", "foreign financial account", "fincen 114", "form 114"]
  },
  {
    id: "fincen-fbar-guidance",
    action: "fbar",
    title: "FinCEN FBAR Guidance",
    url: "https://www.fincen.gov/report-foreign-bank-and-financial-accounts",
    source: "FinCEN",
    answer: "Use this official FinCEN page to review FBAR reporting information.",
    buttonText: "Open FinCEN FBAR Guidance",
    keywords: ["fincen", "fbar", "foreign bank", "foreign account", "foreign financial accounts", "report foreign bank"]
  },
  {
    id: "fincen-fbar",
    action: "fbar",
    title: "BSA E-Filing FBAR",
    url: "https://bsaefiling.fincen.gov/file/fbar",
    source: "FinCEN",
    answer: "Use this official BSA E-Filing page to file FinCEN Form 114, FBAR.",
    buttonText: "Open BSA E-Filing",
    keywords: ["fincen", "bsa", "bsa efiling", "bsa e-filing", "file fbar", "fincen 114", "form 114", "foreign account filing"]
  },
  {
    id: "irs-fatca",
    action: "fbar",
    title: "IRS FATCA Information",
    url: "https://www.irs.gov/businesses/corporations/foreign-account-tax-compliance-act-fatca",
    source: "IRS",
    answer: "Use this official IRS page to review general FATCA information.",
    buttonText: "Open IRS FATCA Page",
    keywords: ["irs", "fatca", "foreign account tax compliance act", "foreign assets", "foreign account"]
  },
  {
    id: "ssa-employer-w2",
    action: "payroll",
    title: "SSA Employer W-2 Filing",
    url: "https://www.ssa.gov/employer/",
    source: "Social Security Administration",
    answer: "Use this official SSA page for employer W-2 filing and wage reporting information.",
    buttonText: "Open SSA Employer W-2 Filing",
    keywords: ["ssa", "social security", "w2", "w-2", "wage reporting", "employer w2", "business services online"]
  }
];

const expandedTaxFormIntents = [
  {
    id: "irs-form-1040-x",
    title: "IRS Form 1040-X, Amended U.S. Individual Income Tax Return",
    formNumber: "1040-X",
    source: "IRS",
    category: "Individual Tax Forms",
    answer: "Use the official IRS Form 1040-X page to review amended individual income tax return information and instructions.",
    url: "https://www.irs.gov/forms-pubs/about-form-1040x",
    buttonText: "Open IRS Form 1040-X",
    related: [{ title: "IRS Where's My Amended Return", url: "https://www.irs.gov/filing/wheres-my-amended-return" }],
    keywords: ["1040x", "1040-x", "1040 x", "amended return", "amend tax return", "amended individual return"]
  },
  {
    id: "irs-form-1041",
    title: "IRS Form 1041, U.S. Income Tax Return for Estates and Trusts",
    formNumber: "1041",
    source: "IRS",
    category: "Estate and Trust Forms",
    answer: "Use the official IRS Form 1041 page for estate and trust income tax return information.",
    url: "https://www.irs.gov/forms-pubs/about-form-1041",
    buttonText: "Open IRS Form 1041",
    related: [{ title: "IRS Forms and Instructions", url: "https://www.irs.gov/forms-instructions" }],
    keywords: ["1041", "estate return", "trust return", "estate tax return", "fiduciary return"]
  },
  {
    id: "irs-form-990",
    title: "IRS Form 990, Return of Organization Exempt From Income Tax",
    formNumber: "990",
    source: "IRS",
    category: "Exempt Organization Forms",
    answer: "Use the official IRS Form 990 page for exempt organization annual return information.",
    url: "https://www.irs.gov/forms-pubs/about-form-990",
    buttonText: "Open IRS Form 990",
    related: [{ title: "IRS Tax Exempt Organizations", url: "https://www.irs.gov/charities-non-profits" }],
    keywords: ["990", "form 990", "nonprofit return", "exempt organization", "charity return"]
  },
  {
    id: "irs-1099-information",
    title: "IRS 1099 Information Returns",
    formNumber: "1099",
    source: "IRS",
    category: "Information Forms",
    answer: "Use the official IRS information returns page to review 1099 and other information return requirements.",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/information-returns",
    buttonText: "Open IRS Information Returns",
    related: [{ title: "IRS Forms and Instructions", url: "https://www.irs.gov/forms-instructions" }],
    keywords: ["1099", "1099 forms", "information return", "information returns", "1099 information", "contractor 1099"]
  }
];

const expandedOfficialTaxHelpResources = [
  {
    id: "ny-online-services",
    title: "New York Online Services Account",
    answer: "Use this official New York Tax Department page to access individual or business online tax services.",
    source: "New York State Department of Taxation and Finance",
    state: "New York",
    category: "State",
    intent: "account",
    relatedCategories: ["Payments", "Business Tax", "Sales Tax", "Payroll"],
    keywords: ["ny online services", "nys online account", "new york account", "tax account", "online account", "business account", "individual account"],
    url: "https://www.tax.ny.gov/online/"
  },
  {
    id: "ny-withholding-payroll",
    title: "New York Withholding Tax",
    answer: "Use this official New York Tax Department page for employer withholding and payroll tax information.",
    source: "New York State Department of Taxation and Finance",
    state: "New York",
    category: "Payroll",
    intent: "payroll",
    relatedCategories: ["Business Tax"],
    keywords: ["ny payroll", "ny withholding", "nys payroll", "new york withholding", "new york payroll", "employer withholding", "payroll tax"],
    url: "https://www.tax.ny.gov/bus/wt/widx.htm"
  },
  {
    id: "ny-notices-online-services",
    title: "New York Tax Notices",
    answer: "Use this official New York Tax Department page to review notices available through Online Services.",
    source: "New York State Department of Taxation and Finance",
    state: "New York",
    category: "Notices / POA",
    intent: "notice",
    keywords: ["ny notice", "nys notice", "new york notice", "tax notice", "letter", "document summary", "online services notice"],
    url: "https://www.tax.ny.gov/online/electronic-notices.htm"
  },
  {
    id: "nj-tax-portal",
    title: "New Jersey Tax Portal",
    answer: "Use this official New Jersey Tax Portal page for online tax services, payments, and account access.",
    source: "New Jersey Division of Taxation",
    state: "New Jersey",
    category: "State",
    intent: "account",
    relatedCategories: ["Payments", "Business Tax", "Sales Tax", "Payroll"],
    keywords: ["nj tax portal", "new jersey tax portal", "nj account", "tax account", "online account", "online services", "nj payment"],
    url: "https://taxportal.nj.gov/"
  },
  {
    id: "nj-withholding-payroll",
    title: "New Jersey Employer Withholding",
    answer: "Use this official New Jersey Division of Taxation page for employer withholding and payroll tax information.",
    source: "New Jersey Division of Taxation",
    state: "New Jersey",
    category: "Payroll",
    intent: "payroll",
    relatedCategories: ["Business Tax"],
    keywords: ["nj payroll", "nj withholding", "new jersey payroll", "new jersey withholding", "employer withholding", "payroll tax"],
    url: "https://www.nj.gov/treasury/taxation/njit1.shtml"
  },
  {
    id: "ca-online-services",
    title: "California FTB Online Services",
    answer: "Use this official Franchise Tax Board page for California online account, refund, notice, and payment services.",
    source: "California Franchise Tax Board",
    state: "California",
    category: "State",
    intent: "account",
    relatedCategories: ["Payments", "Refunds", "Notices / POA", "Business Tax"],
    keywords: ["ca online services", "california online account", "ftb account", "myftb", "tax account", "online account", "respond to notice"],
    url: "https://www.ftb.ca.gov/tax-pros/online-services.html"
  },
  {
    id: "ca-payroll-edd",
    title: "California Payroll Taxes",
    answer: "Use this official California EDD page for employer payroll tax and withholding information.",
    source: "California Employment Development Department",
    state: "California",
    category: "Payroll",
    intent: "payroll",
    relatedCategories: ["Business Tax"],
    keywords: ["ca payroll", "california payroll", "ca withholding", "california withholding", "edd payroll", "employer payroll tax"],
    url: "https://edd.ca.gov/en/payroll_taxes/"
  },
  {
    id: "ca-cdtfa-file-pay",
    title: "California Sales Tax File and Pay",
    answer: "Use this official CDTFA page for California sales and use tax filing and payment information.",
    source: "California Department of Tax and Fee Administration",
    state: "California",
    category: "Sales Tax",
    intent: "salesTax",
    relatedCategories: ["Payments", "Business Tax"],
    keywords: ["ca sales tax", "california sales tax", "cdtfa", "file sales tax", "pay sales tax", "sales use tax", "file and pay"],
    url: "https://www.cdtfa.ca.gov/industry/tax-practitioners/filing-and-payments.htm"
  }
];

const mergeTaxHelpItemsById = (...groups) => {
  const map = new Map();
  groups.flat().filter(Boolean).forEach((item) => {
    if (!item.id) return;
    map.set(item.id, { ...(map.get(item.id) || {}), ...item });
  });
  return Array.from(map.values());
};

const mapTaxFormIntentToAction = (form) => ({
  id: form.id,
  action: "forms",
  formSubtype: "federalForms",
  title: form.title,
  url: form.url,
  source: form.source,
  answer: form.answer,
  buttonText: form.buttonText,
  keywords: [form.formNumber, ...(form.keywords || [])],
  formNumber: form.formNumber,
  related: form.related
});

window.taxHelpStates = TAX_HELP_STATES;
window.taxHelpStateAbbreviations = TAX_HELP_STATE_ABBREVIATIONS;
window.taxHelpResources = mergeTaxHelpItemsById(officialTaxHelpResources, expandedOfficialTaxHelpResources, stateTaxAgencyResources);
window.taxFormIntents = mergeTaxHelpItemsById(Array.isArray(window.taxFormIntents) ? window.taxFormIntents : [], expandedTaxFormIntents);
window.federalTaxActions = mergeTaxHelpItemsById(
  Array.isArray(window.federalTaxActions) ? window.federalTaxActions : [],
  expandedFederalTaxActions,
  expandedTaxFormIntents.map(mapTaxFormIntentToAction)
);
