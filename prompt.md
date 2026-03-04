# 🧾 FileMyTax.in – Full UX Architecture Document

## Product Overview

**Product Name:** FileMyTax.in  
**Purpose:** A guided Indian Income Tax Return (ITR) filing assistant that helps users calculate tax liability, compare regimes, manage deductions, and file returns for multiple taxpayers under one account.

**Core Model:**  
One Account → Multiple Taxpayer Profiles

The system must clearly separate:
- Account-level controls
- Taxpayer-level data

---

# 🌐 Global Layout System

## Top Bar (All Pages)
- Left: FileMyTax.in logo
- Center: Current Page Title
- Right: Taxpayer Profile Switcher dropdown

### Profile Switching Logic
- Switching profile refreshes entire application context
- All data updates instantly
- If unsaved changes exist → show confirmation modal

---

## Navigation Structure

### Navigation Items (Fixed)
1. Dashboard  
2. My Taxpayers  
3. Start Filing  
4. Documents  
5. Tax Summary  
6. Submit & Track  
7. Settings  

### Responsive Behavior
- Mobile: Bottom navigation
- Desktop: Left sidebar navigation

---

# 📄 Page 1: Dashboard

## Objective
Provide instant clarity on filing status and next steps.

## Sections

### 1. Financial Year Selector
- Dropdown for Assessment Year (AY)
- Reloads all taxpayer data when changed
- Shows banner if no data exists for selected year

**Logic:** Prevents cross-year confusion.

---

### 2. Filing Status Overview Card
Displays:
- ITR Type (e.g., ITR-1)
- Filing Stage (Draft / In Progress / Filed / Verified / Processed)
- Last Updated timestamp

**Logic:** Builds confidence and status transparency.

---

### 3. Tax Snapshot Card
Displays:
- Estimated Tax Payable OR Refund
- Selected Tax Regime
- “Compare Regimes” button

**Color Logic:**
- Refund → Green highlight
- Tax Payable → Amber highlight

---

### 4. Pending Actions Panel
Dynamic checklist:
- Missing income entries
- Missing deductions
- Unuploaded Form 16
- Pending verification

Clicking an item deep-links to relevant section.

---

### 5. Primary CTA
Sticky mobile button:
- “Start Filing” or “Resume Filing”

---

# 📄 Page 2: My Taxpayers

## Objective
Manage multiple individuals under one account.

---

## Section 1: Taxpayer List

Display:
- Mobile → Cards
- Desktop → Table

Each entry shows:
- Full Name
- PAN
- ITR Type
- Filing Status
- Financial Year

Actions:
- Edit
- Delete (confirmation required)
- Switch Profile

---

## Section 2: Add New Taxpayer Flow

### Step 1: Identity Details
- PAN (format validation)
- Name
- Date of Birth
- Residential Status

**Validation:**
- PAN format check
- Duplicate PAN prevention

---

### Step 2: Income Type Selection
Options:
- Salary
- Business
- Capital Gains
- Other Sources

System automatically:
- Suggests ITR form
- Displays recommended ITR badge

---

# 📄 Page 3: Start Filing (Core Wizard)

## Structure
- 5-step guided wizard
- Progress bar at top
- Auto-save enabled
- Save & Continue Later option
- Error summary at top

---

## Step 1: Personal Details
Fields:
- PAN (locked)
- Aadhaar
- Address
- Email
- Phone
- Bank Account (for refund)

**Validation:**
- Mandatory fields marked
- Inline error messaging

---

## Step 2: Income Details

Accordion-based modular sections:

### A. Salary
- Gross Salary
- HRA
- Standard Deduction (auto-applied)
- Professional Tax

### B. House Property
- Rental Income
- Home Loan Interest

### C. Business Income
- Presumptive Taxation Toggle (44AD/44ADA)
- Gross Receipts

### D. Capital Gains
- Short-Term
- Long-Term

### E. Other Sources
- Interest Income
- Dividend Income

Only relevant sections expand based on taxpayer profile.

---

## Step 3: Deductions

Sections:
- 80C (with remaining limit indicator)
- 80D
- 80G
- NPS
- Home Loan Interest

Dynamic display:
- Maximum limit
- Used amount
- Remaining eligibility

---

## Step 4: Tax Regime Comparison

Two-column layout:

### Old Regime
- Slab breakdown
- Deductions applied

### New Regime
- Slab breakdown
- Reduced deductions

System highlights:
- Recommended regime
- Estimated savings difference

---

## Step 5: Review & Confirm

Displays:
- Income summary
- Deduction summary
- Tax computation sheet
- Editable section links

User must:
- Accept declaration checkbox

Primary CTA:
- “Confirm & Proceed to Submit”

---

# 📄 Page 4: Documents

## Section 1: Upload Area
- Drag & Drop zone
- Manual file browse
- Supported formats: PDF, JPG, PNG

---

## Section 2: Document Categories
Tabs:
- Form 16
- 26AS
- AIS
- Investment Proofs

Each file displays:
- Upload date
- Status (Uploaded / Reviewed)

---

## Section 3: Extraction Status (Future-ready)
Status indicators:
- Parsed
- Pending Review
- Error

---

# 📄 Page 5: Tax Summary

## Objective
Provide transparent tax computation overview.

## Sections
1. Gross Total Income  
2. Total Deductions  
3. Taxable Income  
4. Slab-wise Tax Calculation  
5. TDS & Advance Tax  
6. Net Payable or Refund  

Strong visual emphasis on final payable/refund amount.

Include:
- “Download Summary” button

---

# 📄 Page 6: Submit & Track

## Section 1: Pre-Submission Checklist
- All steps completed
- No validation errors
- Required documents uploaded

---

## Section 2: Submit CTA
Primary button:
- “Submit Return”

---

## Section 3: E-Verification Guidance
Options:
- Aadhaar OTP
- Net Banking
- ITR-V Physical Submission

---

## Section 4: Filing Timeline
Visual progress tracker:

Draft → Filed → Verified → Processed → Refund Issued

---

# 📄 Page 7: Settings

## Sections
- Account Information
- Default Financial Year
- Data Export
- Delete Taxpayer
- Delete Account Data

Critical actions require confirmation modal.

---

# 🎨 Design Requirements

- Light theme default
- Deep blue primary accent
- Professional fintech tone
- Strong numeric hierarchy
- Sticky mobile CTAs
- Desktop two-column layout
- Clear validation states
- Card-based UI structure

---

# 🔁 Edge Cases to Handle

- Switching profile with unsaved data
- Switching financial year mid-filing
- Duplicate PAN entry
- Submission attempt with incomplete data
- Missing mandatory documents

---

# 📦 Expected UX Output

UX system must produce:
1. Sitemap
2. Detailed wireframes
3. Section hierarchy
4. Interaction logic
5. Validation rules
6. Mobile vs desktop behavior
7. State management logic

---

**FileMyTax.in should feel calm, structured, and trustworthy — like a digital tax advisor guiding users step-by-step through compliance.**