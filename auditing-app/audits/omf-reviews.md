---
sitename: "OMF Reviews"
slug: "omf-reviews"
url: "http://staging.onemain.financial/accounts"
auditor: "Carey Estes"
date: "2022-09-23"
score: undefined
summary: "Small number of issues, one critical but not possible to resolve. The other is a very simple fix."
issues: [
  {
    tool: "Axe", 
    mode: "N/A", 
    severity: "90", 
    issue: "ID's used in ARIA and labels should be unique", 
    description: "Duplicate IDs are common validation errors that may break the accessibility of labels, e.g., form fields, table header cells.", 
    solution: "Create unique ID's for starRating. This is likely impossible using the iframe widget.", 
    pages: "/reviews", 
  },
  {
    tool: "Axe", 
    mode: "N/A", 
    severity: "50", 
    issue: "Scrollable region must have keyboard access", 
    description: "The key to getting a scrollable region to be accessible with the keyboard is to ensure that a keyboard-only user can focus the scrollable region itself or a static text item within the scrollable region. ", 
    solution: "Add a tabindex to the widget container so it can receive focus.", 
    pages: "/reviews", 
  },
]
---