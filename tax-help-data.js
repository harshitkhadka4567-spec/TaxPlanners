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

window.taxHelpStates = TAX_HELP_STATES;
window.taxHelpStateAbbreviations = TAX_HELP_STATE_ABBREVIATIONS;
window.taxHelpResources = [...officialTaxHelpResources, ...stateTaxAgencyResources];
