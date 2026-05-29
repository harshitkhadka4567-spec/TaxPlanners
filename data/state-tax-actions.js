const taxActionLabels = {
  refund: "Refund Status",
  payment: "Tax Payments",
  forms: "Tax Forms",
  salesTax: "Sales Tax",
  businessTax: "Business Tax",
  notice: "Tax Notice Help"
};

const STATE_FORM_LIBRARY_URLS = {
  Alabama: "https://www.revenue.alabama.gov/forms/",
  Alaska: "https://tax.alaska.gov/programs/programs/forms/index.aspx",
  Arizona: "https://azdor.gov/forms",
  Arkansas: "https://www.dfa.arkansas.gov/income-tax/forms/",
  California: "https://www.ftb.ca.gov/forms/",
  Colorado: "https://tax.colorado.gov/forms-by-tax-type",
  Connecticut: "https://portal.ct.gov/drs/drs-forms/current-year-forms",
  Delaware: "https://revenue.delaware.gov/forms/",
  "District of Columbia": "https://otr.cfo.dc.gov/page/tax-forms-and-publications",
  Florida: "https://www.floridarevenue.com/Pages/forms_index.aspx",
  Georgia: "https://dor.georgia.gov/documents/forms",
  Hawaii: "https://tax.hawaii.gov/forms/",
  Idaho: "https://tax.idaho.gov/forms/",
  Illinois: "https://tax.illinois.gov/forms.html",
  Indiana: "https://www.in.gov/dor/tax-forms/",
  Iowa: "https://tax.iowa.gov/forms",
  Kansas: "https://www.ksrevenue.gov/forms.html",
  Kentucky: "https://revenue.ky.gov/Forms/Pages/default.aspx",
  Louisiana: "https://revenue.louisiana.gov/Forms/ForBusinesses",
  Maine: "https://www.maine.gov/revenue/tax-return-forms",
  Maryland: "https://www.marylandtaxes.gov/forms/",
  Massachusetts: "https://www.mass.gov/lists/dor-tax-forms-and-instructions",
  Michigan: "https://www.michigan.gov/taxes/forms",
  Minnesota: "https://www.revenue.state.mn.us/tax-forms",
  Mississippi: "https://www.dor.ms.gov/forms",
  Missouri: "https://dor.mo.gov/forms/",
  Montana: "https://mtrevenue.gov/resources/forms/",
  Nebraska: "https://revenue.nebraska.gov/about/forms",
  Nevada: "https://tax.nv.gov/Forms/",
  "New Hampshire": "https://www.revenue.nh.gov/forms",
  "New Jersey": "https://www.nj.gov/treasury/taxation/forms/",
  "New Mexico": "https://www.tax.newmexico.gov/forms-publications/",
  "New York": "https://www.tax.ny.gov/forms/",
  "North Carolina": "https://www.ncdor.gov/taxes-forms",
  "North Dakota": "https://www.tax.nd.gov/forms",
  Ohio: "https://tax.ohio.gov/forms",
  Oklahoma: "https://oklahoma.gov/tax/forms.html",
  Oregon: "https://www.oregon.gov/dor/forms/Pages/default.aspx",
  Pennsylvania: "https://www.revenue.pa.gov/FormsandPublications/Pages/default.aspx",
  "Rhode Island": "https://tax.ri.gov/forms",
  "South Carolina": "https://dor.sc.gov/forms",
  "South Dakota": "https://dor.sd.gov/forms/",
  Tennessee: "https://www.tn.gov/revenue/forms.html",
  Texas: "https://comptroller.texas.gov/taxes/forms/",
  Utah: "https://tax.utah.gov/forms",
  Vermont: "https://tax.vermont.gov/forms-and-publications",
  Virginia: "https://www.tax.virginia.gov/forms",
  Washington: "https://dor.wa.gov/forms-publications",
  "West Virginia": "https://tax.wv.gov/TaxForms/Pages/default.aspx",
  Wisconsin: "https://www.revenue.wi.gov/Pages/HTML/formpub.aspx",
  Wyoming: "https://revenue.wyo.gov/forms"
};

const createMissingStateAction = (state, agencyName, actionKey) => ({
  title: `${state} ${taxActionLabels[actionKey]}`,
  url: "",
  answer:
    "I found the state and topic, but a direct official page has not been added yet. Use the official state tax agency website below as a fallback.",
  buttonText: `Open ${state} Tax Agency`,
  missingDirectUrl: true,
  fallbackSource: agencyName
});

const buildStateActions = (state, agencyName, agencyUrl, overrides = {}) => {
  const actions = {
    refund: createMissingStateAction(state, agencyName, "refund"),
    payment: createMissingStateAction(state, agencyName, "payment"),
    forms: createMissingStateAction(state, agencyName, "forms"),
    salesTax: createMissingStateAction(state, agencyName, "salesTax"),
    businessTax: createMissingStateAction(state, agencyName, "businessTax"),
    notice: createMissingStateAction(state, agencyName, "notice"),
    agency: {
      title: `${state} Tax Agency`,
      url: agencyUrl,
      answer: `Use the official ${agencyName} website for state tax agency information and state tax resources.`,
      buttonText: `Open ${state} Tax Agency`
    }
  };

  Object.entries(overrides).forEach(([actionKey, action]) => {
    actions[actionKey] = { ...actions[actionKey], ...action, missingDirectUrl: false };
  });

  return actions;
};

const buildStateForms = (state, agencyName, agencyUrl, forms = {}, actionFormsUrl = "") => {
  const generalUrl = forms.general?.url || actionFormsUrl || STATE_FORM_LIBRARY_URLS[state] || agencyUrl;
  const general = {
    title: `${state} Tax Forms`,
    url: generalUrl,
    answer: `Use the official ${state} tax forms page to find state tax forms, instructions, schedules, and publications.`,
    buttonText: `Open ${state} Tax Forms`,
    ...(forms.general || {})
  };

  return {
    general,
    individual: {
      title: `${state} Individual Tax Forms`,
      url: general.url,
      answer: `Use the official ${state} individual tax forms page to find resident and nonresident individual income tax forms.`,
      buttonText: "Open Individual Tax Forms",
      ...(forms.individual || {})
    },
    business: {
      title: `${state} Business Tax Forms`,
      url: general.url,
      answer: `Use the official ${state} business tax forms page to find business, corporate, partnership, and entity tax forms.`,
      buttonText: "Open Business Tax Forms",
      ...(forms.business || {})
    },
    salesTax: {
      title: `${state} Sales Tax Forms`,
      url: general.url,
      answer: `Use the official ${state} sales tax forms page to find sales and use tax forms, certificates, and filing resources.`,
      buttonText: "Open Sales Tax Forms",
      ...(forms.salesTax || {})
    },
    withholding: {
      title: `${state} Withholding Tax Forms`,
      url: general.url,
      answer: `Use the official ${state} withholding tax forms page to find employer withholding and payroll-related forms.`,
      buttonText: "Open Withholding Tax Forms",
      ...(forms.withholding || {})
    },
    exactForms: forms.exactForms || []
  };
};

const createStateActionEntry = ({ state, abbreviations, aliases = [], agencyName, agencyUrl, actions = {}, forms = {} }) => ({
  state,
  abbreviations,
  aliases,
  agencyName,
  agencyUrl,
  actions: buildStateActions(state, agencyName, agencyUrl, actions),
  forms: buildStateForms(state, agencyName, agencyUrl, forms, actions.forms?.url)
});

const stateTaxActions = [
  createStateActionEntry({ state: "Alabama", abbreviations: ["AL"], agencyName: "Alabama Department of Revenue", agencyUrl: "https://revenue.alabama.gov/" }),
  createStateActionEntry({ state: "Alaska", abbreviations: ["AK"], agencyName: "Alaska Department of Revenue", agencyUrl: "https://dor.alaska.gov/" }),
  createStateActionEntry({ state: "Arizona", abbreviations: ["AZ"], agencyName: "Arizona Department of Revenue", agencyUrl: "https://www.azdor.gov/" }),
  createStateActionEntry({ state: "Arkansas", abbreviations: ["AR"], agencyName: "Arkansas Department of Finance and Administration", agencyUrl: "https://www.dfa.arkansas.gov/" }),
  createStateActionEntry({
    state: "California",
    abbreviations: ["CA"],
    agencyName: "California Franchise Tax Board",
    agencyUrl: "https://www.ftb.ca.gov/",
    actions: {
      refund: {
        title: "Check California Refund Status",
        url: "https://www.ftb.ca.gov/refund/index.asp",
        answer:
          "To check your California income tax refund, use the official California Franchise Tax Board refund status page. You may need identifying information, the tax year, and the refund amount from your return.",
        buttonText: "Open CA Refund Status Page"
      },
      payment: {
        title: "Pay California Taxes",
        url: "https://www.ftb.ca.gov/pay/",
        answer:
          "Use the official California Franchise Tax Board payment page for eligible California income tax payments. Confirm the payment type, tax year, and account details before submitting.",
        buttonText: "Open CA Payment Page"
      },
      forms: {
        title: "California Tax Forms",
        url: "https://www.ftb.ca.gov/forms/",
        answer: "Use the official California Franchise Tax Board forms page to find California tax forms, instructions, and publications.",
        buttonText: "Open CA Tax Forms"
      },
      salesTax: {
        title: "California Sales Tax",
        url: "https://www.cdtfa.ca.gov/taxes-and-fees/sutprograms.htm",
        answer:
          "Use the official California Department of Tax and Fee Administration sales and use tax page for sales tax guidance, filing, permits, and business responsibilities.",
        buttonText: "Open CA Sales Tax Page",
        source: "California Department of Tax and Fee Administration"
      },
      businessTax: {
        title: "California Business Tax",
        url: "https://www.ftb.ca.gov/file/business/index.html",
        answer: "Use the official California Franchise Tax Board business filing page for California business tax filing and payment guidance.",
        buttonText: "Open CA Business Tax Page"
      },
      notice: {
        title: "California Tax Notice Help",
        url: "https://www.ftb.ca.gov/help/letters/index.html",
        answer: "Use the official California Franchise Tax Board notices and letters page for help understanding California tax letters and account issues.",
        buttonText: "Open CA Notice Help"
      }
    },
    forms: {
      general: { url: "https://www.ftb.ca.gov/forms/", buttonText: "Open CA Tax Forms" },
      individual: {
        title: "California Individual Tax Forms",
        url: "https://www.ftb.ca.gov/forms/",
        buttonText: "Open CA Individual Tax Forms"
      },
      business: {
        title: "California Business Tax Forms",
        url: "https://www.ftb.ca.gov/forms/",
        buttonText: "Open CA Business Tax Forms"
      },
      salesTax: {
        title: "California Sales Tax Forms",
        url: "https://www.cdtfa.ca.gov/formspubs/",
        buttonText: "Open CA Sales Tax Forms"
      },
      withholding: {
        title: "California Payroll and Withholding Forms",
        url: "https://edd.ca.gov/en/payroll_taxes/forms_and_publications/",
        buttonText: "Open CA Withholding Forms"
      },
      exactForms: [
        {
          form: "CA 540",
          title: "California Form 540",
          url: "https://www.ftb.ca.gov/forms/",
          answer: "Use the official California Franchise Tax Board forms page to find Form 540 and related California resident income tax instructions.",
          keywords: ["ca540", "ca 540", "california 540", "form 540", "california resident return"]
        }
      ]
    }
  }),
  createStateActionEntry({ state: "Colorado", abbreviations: ["CO"], agencyName: "Colorado Department of Revenue", agencyUrl: "https://www.colorado.gov/tax" }),
  createStateActionEntry({ state: "Connecticut", abbreviations: ["CT"], agencyName: "Connecticut Department of Revenue Services", agencyUrl: "https://portal.ct.gov/DRS" }),
  createStateActionEntry({ state: "Delaware", abbreviations: ["DE"], agencyName: "Delaware Division of Revenue", agencyUrl: "https://revenue.delaware.gov/" }),
  createStateActionEntry({ state: "District of Columbia", abbreviations: ["DC"], aliases: ["Washington DC", "Washington, D.C.", "D.C."], agencyName: "District of Columbia Office of Tax and Revenue", agencyUrl: "https://otr.cfo.dc.gov/" }),
  createStateActionEntry({
    state: "Florida",
    abbreviations: ["FL"],
    agencyName: "Florida Department of Revenue",
    agencyUrl: "https://floridarevenue.com/",
    actions: {
      payment: {
        title: "Pay Florida Taxes",
        url: "https://floridarevenue.com/taxes/eservices/Pages/filepay.aspx",
        answer:
          "Use the official Florida Department of Revenue eFile and Pay page for eligible Florida taxes, fees, and remittances. Confirm the tax type and payment category before submitting.",
        buttonText: "Open FL Payment Page"
      },
      forms: {
        title: "Florida Tax Forms",
        url: "https://www.floridarevenue.com/Pages/forms_index.aspx",
        answer: "Use the official Florida Department of Revenue forms and publications page to find Florida tax forms and instructions.",
        buttonText: "Open FL Tax Forms"
      },
      salesTax: {
        title: "Florida Sales Tax",
        url: "https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx",
        answer: "Use the official Florida Department of Revenue sales and use tax page for Florida sales tax guidance, filing, and business responsibilities.",
        buttonText: "Open FL Sales Tax Page"
      },
      businessTax: {
        title: "Florida Business Tax",
        url: "https://floridarevenue.com/taxes/taxesfees/Pages/corporate.aspx",
        answer: "Use the official Florida Department of Revenue corporate income tax page for Florida business tax filing and payment guidance.",
        buttonText: "Open FL Business Tax Page"
      },
      notice: {
        title: "Florida Tax Notice Help",
        url: "https://floridarevenue.com/taxes/Pages/default.aspx",
        answer: "Use the official Florida Department of Revenue General Tax Administration page for help with tax notices, account questions, and tax issues.",
        buttonText: "Open FL Notice Help"
      }
    },
    forms: {
      general: { url: "https://www.floridarevenue.com/Pages/forms_index.aspx", buttonText: "Open FL Tax Forms" },
      business: {
        title: "Florida Business Tax Forms",
        url: "https://www.floridarevenue.com/Pages/forms_index.aspx",
        buttonText: "Open FL Business Tax Forms"
      },
      salesTax: {
        title: "Florida Sales Tax Forms",
        url: "https://www.floridarevenue.com/Pages/forms_index.aspx",
        buttonText: "Open FL Sales Tax Forms"
      },
      withholding: {
        title: "Florida Employer and Withholding Forms",
        url: "https://www.floridarevenue.com/Pages/forms_index.aspx",
        answer: "Florida does not have a broad individual income tax withholding system. Use the official Florida Department of Revenue forms page for available employer and tax forms.",
        buttonText: "Open FL Tax Forms"
      }
    }
  }),
  createStateActionEntry({ state: "Georgia", abbreviations: ["GA"], agencyName: "Georgia Department of Revenue", agencyUrl: "https://dor.georgia.gov/" }),
  createStateActionEntry({ state: "Hawaii", abbreviations: ["HI"], agencyName: "Hawaii Department of Taxation", agencyUrl: "https://tax.hawaii.gov/" }),
  createStateActionEntry({ state: "Idaho", abbreviations: ["ID"], agencyName: "Idaho State Tax Commission", agencyUrl: "https://tax.idaho.gov/" }),
  createStateActionEntry({ state: "Illinois", abbreviations: ["IL"], agencyName: "Illinois Department of Revenue", agencyUrl: "https://tax.illinois.gov/" }),
  createStateActionEntry({ state: "Indiana", abbreviations: ["IN"], agencyName: "Indiana Department of Revenue", agencyUrl: "https://www.in.gov/dor/" }),
  createStateActionEntry({ state: "Iowa", abbreviations: ["IA"], agencyName: "Iowa Department of Revenue", agencyUrl: "https://tax.iowa.gov/" }),
  createStateActionEntry({ state: "Kansas", abbreviations: ["KS"], agencyName: "Kansas Department of Revenue", agencyUrl: "https://www.ksrevenue.gov/" }),
  createStateActionEntry({ state: "Kentucky", abbreviations: ["KY"], agencyName: "Kentucky Department of Revenue", agencyUrl: "https://revenue.ky.gov/" }),
  createStateActionEntry({ state: "Louisiana", abbreviations: ["LA"], agencyName: "Louisiana Department of Revenue", agencyUrl: "https://revenue.louisiana.gov/" }),
  createStateActionEntry({ state: "Maine", abbreviations: ["ME"], agencyName: "Maine Revenue Services", agencyUrl: "https://www.maine.gov/revenue/" }),
  createStateActionEntry({ state: "Maryland", abbreviations: ["MD"], agencyName: "Comptroller of Maryland", agencyUrl: "https://www.marylandtaxes.gov/" }),
  createStateActionEntry({ state: "Massachusetts", abbreviations: ["MA"], agencyName: "Massachusetts Department of Revenue", agencyUrl: "https://www.mass.gov/orgs/massachusetts-department-of-revenue" }),
  createStateActionEntry({ state: "Michigan", abbreviations: ["MI"], agencyName: "Michigan Department of Treasury", agencyUrl: "https://www.michigan.gov/treasury" }),
  createStateActionEntry({ state: "Minnesota", abbreviations: ["MN"], agencyName: "Minnesota Department of Revenue", agencyUrl: "https://www.revenue.state.mn.us/" }),
  createStateActionEntry({ state: "Mississippi", abbreviations: ["MS"], agencyName: "Mississippi Department of Revenue", agencyUrl: "https://dor.ms.gov/" }),
  createStateActionEntry({ state: "Missouri", abbreviations: ["MO"], agencyName: "Missouri Department of Revenue", agencyUrl: "https://dor.mo.gov/" }),
  createStateActionEntry({ state: "Montana", abbreviations: ["MT"], agencyName: "Montana Department of Revenue", agencyUrl: "https://mtrevenue.gov/" }),
  createStateActionEntry({ state: "Nebraska", abbreviations: ["NE"], agencyName: "Nebraska Department of Revenue", agencyUrl: "https://revenue.nebraska.gov/" }),
  createStateActionEntry({ state: "Nevada", abbreviations: ["NV"], agencyName: "Nevada Department of Taxation", agencyUrl: "https://tax.nv.gov/" }),
  createStateActionEntry({ state: "New Hampshire", abbreviations: ["NH"], agencyName: "New Hampshire Department of Revenue Administration", agencyUrl: "https://revenue.nh.gov/" }),
  createStateActionEntry({
    state: "New Jersey",
    abbreviations: ["NJ"],
    agencyName: "New Jersey Division of Taxation",
    agencyUrl: "https://www.nj.gov/treasury/taxation/",
    actions: {
      refund: {
        title: "Check New Jersey Refund Status",
        url: "https://www.nj.gov/treasury/taxation/checkrefundstatus.shtml",
        answer:
          "To check your New Jersey income tax refund, use the official New Jersey Division of Taxation refund status page. You may need your Social Security number or ITIN, tax year, and refund amount from your return.",
        buttonText: "Open NJ Refund Status Page"
      },
      payment: {
        title: "Pay New Jersey Taxes",
        url: "https://www.nj.gov/treasury/taxation/payments-notices.shtml",
        answer:
          "Use the official New Jersey Division of Taxation payment page to make eligible state tax payments. Confirm the tax type, tax year, and payment category before submitting.",
        buttonText: "Open NJ Payment Page"
      },
      forms: {
        title: "New Jersey Tax Forms",
        url: "https://www.nj.gov/treasury/taxation/forms/",
        answer: "Use the official New Jersey tax forms page to find state tax forms and instructions.",
        buttonText: "Open NJ Tax Forms"
      },
      salesTax: {
        title: "New Jersey Sales Tax",
        url: "https://www.nj.gov/treasury/businesses/salestax/index.shtml",
        answer: "Use the official New Jersey sales tax page for sales and use tax guidance, filing, and business responsibilities.",
        buttonText: "Open NJ Sales Tax Page"
      },
      businessTax: {
        title: "New Jersey Business Tax",
        url: "https://www.nj.gov/treasury/taxation/onlinebus.shtml",
        answer: "Use the official New Jersey business tax page for business filing and payment guidance.",
        buttonText: "Open NJ Business Tax Page"
      },
      notice: {
        title: "New Jersey Tax Notice Help",
        url: "https://www.nj.gov/treasury/taxation/payments-notices.shtml",
        answer: "Use the official New Jersey Division of Taxation page for help with tax notices, letters, bills, and account issues.",
        buttonText: "Open NJ Notice Help"
      }
    },
    forms: {
      general: { url: "https://www.nj.gov/treasury/taxation/forms/", buttonText: "Open NJ Tax Forms" },
      individual: {
        title: "New Jersey Individual Tax Forms",
        url: "https://www.nj.gov/treasury/taxation/forms/",
        buttonText: "Open NJ Individual Tax Forms"
      },
      business: {
        title: "New Jersey Business Tax Forms",
        url: "https://www.nj.gov/treasury/taxation/forms/",
        buttonText: "Open NJ Business Tax Forms"
      },
      salesTax: {
        title: "New Jersey Sales Tax Forms",
        url: "https://www.nj.gov/treasury/taxation/forms/",
        buttonText: "Open NJ Sales Tax Forms"
      },
      withholding: {
        title: "New Jersey Withholding Tax Forms",
        url: "https://www.nj.gov/treasury/taxation/forms/",
        buttonText: "Open NJ Withholding Tax Forms"
      },
      exactForms: [
        {
          form: "NJ-1040",
          title: "New Jersey Form NJ-1040",
          url: "https://www.nj.gov/treasury/taxation/forms/",
          answer: "Use the official New Jersey Division of Taxation forms page to find Form NJ-1040 and related resident income tax instructions.",
          keywords: ["nj1040", "nj 1040", "nj-1040", "new jersey resident return"]
        }
      ]
    }
  }),
  createStateActionEntry({ state: "New Mexico", abbreviations: ["NM"], agencyName: "New Mexico Taxation and Revenue Department", agencyUrl: "https://tax.newmexico.gov/" }),
  createStateActionEntry({
    state: "New York",
    abbreviations: ["NY"],
    aliases: ["NYS", "NYC", "New York State", "newyork"],
    agencyName: "New York State Department of Taxation and Finance",
    agencyUrl: "https://www.tax.ny.gov/",
    actions: {
      refund: {
        title: "Check New York State Refund Status",
        url: "https://www.tax.ny.gov/pit/file/refund.htm",
        answer:
          "For a New York State tax refund, use the official New York State Tax Department refund status page. You may need the tax year, Social Security number or ITIN, and the refund amount shown on the return.",
        buttonText: "Open NY Refund Status Page"
      },
      payment: {
        title: "Pay New York State Taxes",
        url: "https://www.tax.ny.gov/pay/",
        answer:
          "Use the official New York State Tax Department payment page to make state tax payments. Confirm the correct tax type, period, and payment category before submitting.",
        buttonText: "Open NY Payment Page"
      },
      forms: {
        title: "New York Tax Forms",
        url: "https://www.tax.ny.gov/forms/",
        answer: "Use the official New York State Tax Department forms page to find state tax forms, schedules, and instructions.",
        buttonText: "Open NY Tax Forms"
      },
      salesTax: {
        title: "New York Sales Tax",
        url: "https://www.tax.ny.gov/bus/st/stidx.htm",
        answer: "Use the official New York State Tax Department sales tax page for sales tax guidance, filing, and business responsibilities.",
        buttonText: "Open NY Sales Tax Page"
      },
      businessTax: {
        title: "New York Business Tax",
        url: "https://www.tax.ny.gov/bus/",
        answer: "Use the official New York State Tax Department business tax page for business filing, payment, and tax guidance.",
        buttonText: "Open NY Business Tax Page"
      },
      notice: {
        title: "New York Tax Notice Help",
        url: "https://www.tax.ny.gov/help/contact/",
        answer: "Use the official New York State Tax Department contact and help page for tax notices, letters, and account questions.",
        buttonText: "Open NY Notice Help"
      }
    },
    forms: {
      general: { url: "https://www.tax.ny.gov/forms/", buttonText: "Open NY Tax Forms" },
      individual: {
        title: "New York Individual Tax Forms",
        url: "https://www.tax.ny.gov/forms/income_cur_forms.htm",
        buttonText: "Open NY Individual Tax Forms"
      },
      business: {
        title: "New York Business Tax Forms",
        url: "https://www.tax.ny.gov/forms/business_cur_forms.htm",
        buttonText: "Open NY Business Tax Forms"
      },
      salesTax: {
        title: "New York Sales Tax Forms",
        url: "https://www.tax.ny.gov/forms/sales_cur_forms.htm",
        buttonText: "Open NY Sales Tax Forms"
      },
      withholding: {
        title: "New York Withholding Tax Forms",
        url: "https://www.tax.ny.gov/forms/withholding_cur_forms.htm",
        buttonText: "Open NY Withholding Tax Forms"
      },
      exactForms: [
        {
          form: "IT-201",
          title: "New York Form IT-201",
          url: "https://www.tax.ny.gov/forms/current-forms/it/it201.htm",
          answer: "Use the official New York Form IT-201 page or forms library for resident income tax filing.",
          keywords: ["it201", "it 201", "it-201", "ny resident return", "new york resident return"]
        },
        {
          form: "IT-203",
          title: "New York Form IT-203",
          url: "https://www.tax.ny.gov/forms/income_cur_forms.htm",
          answer: "Use the official New York individual income tax forms page to find Form IT-203 for nonresident and part-year resident filing.",
          keywords: ["it203", "it 203", "it-203", "ny nonresident return", "new york nonresident return"]
        }
      ]
    }
  }),
  createStateActionEntry({ state: "North Carolina", abbreviations: ["NC"], agencyName: "North Carolina Department of Revenue", agencyUrl: "https://www.ncdor.gov/" }),
  createStateActionEntry({ state: "North Dakota", abbreviations: ["ND"], agencyName: "North Dakota Office of State Tax Commissioner", agencyUrl: "https://www.nd.gov/tax/" }),
  createStateActionEntry({ state: "Ohio", abbreviations: ["OH"], agencyName: "Ohio Department of Taxation", agencyUrl: "https://tax.ohio.gov/" }),
  createStateActionEntry({ state: "Oklahoma", abbreviations: ["OK"], agencyName: "Oklahoma Tax Commission", agencyUrl: "https://oklahoma.gov/tax.html" }),
  createStateActionEntry({ state: "Oregon", abbreviations: ["OR"], agencyName: "Oregon Department of Revenue", agencyUrl: "https://www.oregon.gov/dor/" }),
  createStateActionEntry({ state: "Pennsylvania", abbreviations: ["PA"], agencyName: "Pennsylvania Department of Revenue", agencyUrl: "https://www.revenue.pa.gov/" }),
  createStateActionEntry({ state: "Rhode Island", abbreviations: ["RI"], agencyName: "Rhode Island Division of Taxation", agencyUrl: "https://tax.ri.gov/" }),
  createStateActionEntry({ state: "South Carolina", abbreviations: ["SC"], agencyName: "South Carolina Department of Revenue", agencyUrl: "https://dor.sc.gov/" }),
  createStateActionEntry({ state: "South Dakota", abbreviations: ["SD"], agencyName: "South Dakota Department of Revenue", agencyUrl: "https://dor.sd.gov/" }),
  createStateActionEntry({ state: "Tennessee", abbreviations: ["TN"], agencyName: "Tennessee Department of Revenue", agencyUrl: "https://www.tn.gov/revenue/" }),
  createStateActionEntry({
    state: "Texas",
    abbreviations: ["TX"],
    agencyName: "Texas Comptroller of Public Accounts",
    agencyUrl: "https://comptroller.texas.gov/",
    actions: {
      payment: {
        title: "Pay Texas Taxes",
        url: "https://comptroller.texas.gov/taxes/file-pay/",
        answer: "Use the official Texas Comptroller file and pay page for eligible Texas taxes. Confirm the tax type and filing or payment requirement before submitting.",
        buttonText: "Open TX Payment Page"
      },
      forms: {
        title: "Texas Tax Forms",
        url: "https://comptroller.texas.gov/taxes/forms/",
        answer: "Use the official Texas Comptroller forms page to find Texas tax forms and instructions.",
        buttonText: "Open TX Tax Forms"
      },
      salesTax: {
        title: "Texas Sales Tax",
        url: "https://comptroller.texas.gov/taxes/sales/",
        answer: "Use the official Texas Comptroller sales and use tax page for Texas sales tax guidance, permits, filing, and payment resources.",
        buttonText: "Open TX Sales Tax Page"
      },
      businessTax: {
        title: "Texas Business Tax",
        url: "https://comptroller.texas.gov/taxes/franchise/",
        answer: "Use the official Texas Comptroller franchise tax page for Texas business tax filing and payment guidance.",
        buttonText: "Open TX Business Tax Page"
      }
    },
    forms: {
      general: { url: "https://comptroller.texas.gov/taxes/forms/", buttonText: "Open TX Tax Forms" },
      business: {
        title: "Texas Business Tax Forms",
        url: "https://comptroller.texas.gov/taxes/forms/",
        buttonText: "Open TX Business Tax Forms"
      },
      salesTax: {
        title: "Texas Sales Tax Forms",
        url: "https://comptroller.texas.gov/taxes/forms/",
        buttonText: "Open TX Sales Tax Forms"
      },
      withholding: {
        title: "Texas Employer and Withholding Forms",
        url: "https://comptroller.texas.gov/taxes/forms/",
        answer: "Texas does not have a broad individual income tax withholding system. Use the official Texas Comptroller forms page for available employer and tax forms.",
        buttonText: "Open TX Tax Forms"
      }
    }
  }),
  createStateActionEntry({ state: "Utah", abbreviations: ["UT"], agencyName: "Utah State Tax Commission", agencyUrl: "https://tax.utah.gov/" }),
  createStateActionEntry({ state: "Vermont", abbreviations: ["VT"], agencyName: "Vermont Department of Taxes", agencyUrl: "https://tax.vermont.gov/" }),
  createStateActionEntry({ state: "Virginia", abbreviations: ["VA"], agencyName: "Virginia Tax", agencyUrl: "https://www.tax.virginia.gov/" }),
  createStateActionEntry({ state: "Washington", abbreviations: ["WA"], agencyName: "Washington Department of Revenue", agencyUrl: "https://dor.wa.gov/" }),
  createStateActionEntry({ state: "West Virginia", abbreviations: ["WV"], agencyName: "West Virginia Tax Division", agencyUrl: "https://tax.wv.gov/" }),
  createStateActionEntry({ state: "Wisconsin", abbreviations: ["WI"], agencyName: "Wisconsin Department of Revenue", agencyUrl: "https://www.revenue.wi.gov/" }),
  createStateActionEntry({ state: "Wyoming", abbreviations: ["WY"], agencyName: "Wyoming Department of Revenue", agencyUrl: "https://revenue.wyo.gov/" })
];

const federalTaxActions = [
  {
    id: "irs-direct-pay",
    action: "payment",
    title: "IRS Direct Pay",
    url: "https://www.irs.gov/payments/direct-pay",
    source: "IRS",
    answer:
      "Use IRS Direct Pay for eligible individual federal tax payments. Confirm the tax year, form type, and payment reason before submitting.",
    buttonText: "Open IRS Direct Pay",
    keywords: ["pay irs", "direct pay", "pay federal", "pay taxes"]
  },
  {
    id: "irs-payments",
    action: "payment",
    title: "Pay IRS Taxes",
    url: "https://www.irs.gov/payments",
    source: "IRS",
    answer: "The IRS payments page lists official federal tax payment methods, including Direct Pay, debit or credit card, EFTPS, and other payment options.",
    buttonText: "Open IRS Payment Page",
    keywords: ["irs payments", "payment plan", "tax bill", "balance due"]
  },
  {
    id: "eftps",
    action: "payment",
    title: "Pay Federal Business or Payroll Taxes Through EFTPS",
    url: "https://www.eftps.gov",
    source: "EFTPS",
    answer: "EFTPS is an official U.S. Treasury system commonly used for federal business and payroll tax payments. Enrollment may be required before making payments.",
    buttonText: "Open EFTPS",
    keywords: ["eftps", "payroll payment", "business tax payment", "federal tax deposit"]
  },
  {
    id: "irs-refund",
    action: "refund",
    title: "Check Federal IRS Refund Status",
    url: "https://www.irs.gov/refunds",
    source: "IRS",
    answer: "To check a federal tax refund, use the official IRS refund status page. The IRS usually requires the tax year, filing status, and exact refund amount.",
    buttonText: "Open IRS Refund Status Page",
    keywords: ["irs refund", "federal refund", "where is my refund"]
  },
  {
    id: "irs-notice",
    action: "notice",
    title: "Understand an IRS Notice or Letter",
    url: "https://www.irs.gov/individuals/understanding-your-irs-notice-or-letter",
    source: "IRS",
    answer: "If you received an IRS notice or letter, read it carefully and check the notice number, tax year, deadline, and requested action. Use the official IRS notice guide for general information.",
    buttonText: "Open IRS Notice Page",
    keywords: ["irs notice", "irs letter", "cp2000"]
  },
  {
    id: "irs-poa",
    action: "poa",
    title: "IRS Power of Attorney, Form 2848",
    url: "https://www.irs.gov/forms-pubs/about-form-2848",
    source: "IRS",
    answer: "IRS Form 2848 allows an authorized representative to communicate with the IRS for specific tax matters, forms, and years listed on the authorization.",
    buttonText: "Open Form 2848 Page",
    keywords: ["poa", "power of attorney", "form 2848", "authorize accountant"]
  },
  {
    id: "irs-ein",
    action: "ein",
    title: "Apply for an EIN",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online",
    source: "IRS",
    answer: "Businesses can apply for an Employer Identification Number through the official IRS EIN application page. Use only the official IRS website.",
    buttonText: "Open EIN Application",
    keywords: ["ein", "tax id", "employer identification number", "apply ein"]
  },
  {
    id: "irs-business-taxes",
    action: "businessTax",
    title: "IRS Business Taxes",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/business-taxes",
    source: "IRS",
    answer: "Use the official IRS business taxes page for general federal business tax filing, payment, and tax responsibility information.",
    buttonText: "Open Official Guide",
    keywords: ["business tax", "business taxes", "company tax", "llc tax", "business filing"]
  },
  {
    id: "irs-s-corporations",
    action: "businessTax",
    title: "IRS S Corporation Tax Information",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/s-corporations",
    source: "IRS",
    answer: "Use the official IRS S corporation page for general federal information about S corporation filing and tax responsibilities.",
    buttonText: "Open Official Guide",
    keywords: ["s corp info", "s corporation info", "s corp", "s corporation", "s-corp information"]
  },
  {
    id: "irs-partnerships",
    action: "businessTax",
    title: "IRS Partnership Tax Information",
    url: "https://www.irs.gov/businesses/partnerships",
    source: "IRS",
    answer: "Use the official IRS partnership page for general federal information about partnership filing and tax responsibilities.",
    buttonText: "Open Official Guide",
    keywords: ["partnership info", "partnership information", "partnership tax"]
  },
  {
    id: "irs-corporations",
    action: "businessTax",
    title: "IRS Corporation Tax Information",
    url: "https://www.irs.gov/businesses/corporations",
    source: "IRS",
    answer: "Use the official IRS corporations page for general federal information about corporate filing and tax responsibilities.",
    buttonText: "Open Official Guide",
    keywords: ["corporation info", "corporation information", "corporate tax", "c corp info"]
  },
  {
    id: "irs-foreign-owned-entity-info",
    action: "businessTax",
    title: "IRS Foreign-Owned U.S. Entity Reporting Information",
    url: "https://www.irs.gov/forms-pubs/about-form-5472",
    source: "IRS",
    answer: "Use the official IRS Form 5472 information page for general information about reporting by certain foreign-owned U.S. corporations and disregarded entities.",
    buttonText: "Open Official Guide",
    keywords: ["foreign owned llc", "foreign owned us entity", "foreign-owned entity", "foreign owner", "foreign owned"]
  },
  {
    id: "irs-forms",
    action: "forms",
    title: "IRS Forms and Instructions",
    url: "https://www.irs.gov/forms-instructions",
    source: "IRS",
    answer: "Use the official IRS Forms and Instructions page to find federal tax forms, schedules, instructions, and publications.",
    buttonText: "Open IRS Forms",
    keywords: ["forms", "instructions", "publication", "schedule"]
  },
  {
    id: "irs-payroll",
    action: "payroll",
    title: "IRS Employment Taxes",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/employment-taxes",
    source: "IRS",
    answer: "Review official IRS employment tax guidance for employer withholding, reporting, and payroll tax responsibilities.",
    buttonText: "Open IRS Employment Taxes",
    keywords: ["payroll", "employment tax", "941", "944", "w2"]
  },
  {
    id: "irs-payroll-due-dates",
    action: "payroll",
    title: "IRS Employment Tax Due Dates",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/employment-tax-due-dates",
    source: "IRS",
    answer: "IRS employment tax due dates depend on the employer's filing and deposit requirements. Review the official IRS due date guidance.",
    buttonText: "Open Payroll Due Dates",
    keywords: ["payroll deadline", "payroll due date", "employment tax due date", "941 due date"]
  },
  {
    id: "irs-fbar",
    action: "fbar",
    title: "IRS FBAR Guidance",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar",
    source: "IRS",
    answer: "Review official IRS FBAR guidance for general information about reporting foreign bank and financial accounts.",
    buttonText: "Open IRS FBAR Guidance",
    keywords: ["fbar", "foreign bank", "foreign account", "form 114"]
  },
  {
    id: "fincen-fbar",
    action: "fbar",
    title: "FinCEN FBAR Filing",
    url: "https://bsaefiling.fincen.gov/file/fbar",
    source: "FinCEN",
    answer: "FBAR is filed electronically through the official BSA E-Filing system. Use the official FinCEN filing website for submission.",
    buttonText: "Open FinCEN FBAR Filing",
    keywords: ["fincen", "bsa efiling", "file fbar", "foreign account filing"]
  }
];

window.stateTaxActions = stateTaxActions;
window.federalTaxActions = federalTaxActions;
