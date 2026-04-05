import { useState, useRef, useMemo } from "react";
import { useNotes } from "./useNotes";

// ─── DATA: ALL 24 UNITS ─────────────────────────────────────────────────────

const sections = [
  {
    id: "vehicles",
    label: "Investment Vehicles",
    color: "#4f8ff7",
    unitIds: ["unit1","unit2","unit3","unit4","unit5"],
    examWeight: "25% of exam (~32 Qs)",
  },
  {
    id: "economics",
    label: "Economic Factors",
    color: "#a78bfa",
    unitIds: ["unit6","unit7"],
    examWeight: "15% of exam (~20 Qs)",
  },
  {
    id: "regulations",
    label: "Laws & Regulations",
    color: "#f59e0b",
    unitIds: ["unit8","unit9","unit10","unit11","unit12","unit13","unit14"],
    examWeight: "30% of exam (~39 Qs)",
  },
  {
    id: "clients",
    label: "Client Factors",
    color: "#34d399",
    unitIds: ["unit15","unit16","unit17","unit18"],
    examWeight: "Part of 30% (~22 Qs)",
  },
  {
    id: "strategies",
    label: "Analysis & Strategies",
    color: "#f472b6",
    unitIds: ["unit19","unit20","unit21","unit22","unit23","unit24"],
    examWeight: "Part of 30% (~37 Qs)",
  },
];

const units = [
  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 1 — EQUITY SECURITIES
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit1",
    number: 1,
    title: "Types and Characteristics of Equity Securities",
    examQuestions: "~7 questions",
    lessons: [
      {
        id: "1.1",
        title: "Equity Securities",
        los: [
          { code: "1.a", title: "Describe the characteristics of equity securities" },
          { code: "1.b", title: "Identify the basic features of common stock" },
          { code: "1.c", title: "Recognize the different types of preferred stock" },
        ],
        content: [
          {
            heading: "Common Stock Basics",
            body: `Common stock represents ownership (equity) in a corporation. Stockholders are residual owners — they have a claim on assets only after all creditors and preferred stockholders are paid.

**Key rights of common stockholders:**
• Voting rights (typically one vote per share)
• Right to receive dividends (if declared by the board — NOT guaranteed)
• Preemptive rights — the right to maintain proportionate ownership when new shares are issued (anti-dilution)
• Right to inspect books and records
• Residual claim on assets in liquidation (last in line)

**Important distinctions:**
• Par value is an arbitrary accounting value — it does NOT equal market price
• Market capitalization = share price × shares outstanding
• Book value per share = (total assets − total liabilities − preferred equity) ÷ common shares outstanding
• Shareholders elect the Board of Directors, who then appoint officers (CEO, CFO, etc.)

**Voting methods:**
• Statutory (straight) voting — cast one vote per share for each seat (favors majority shareholders)
• Cumulative voting — total votes = shares × seats, can allocate freely (protects minority shareholders)

**Exam tip:** The exam loves to test that dividends on common stock are NOT guaranteed and NOT a liability until declared.`
          },
          {
            heading: "Preferred Stock",
            body: `Preferred stock is a hybrid security with characteristics of both equity and debt. It pays a fixed dividend (like bond interest) but represents ownership (like common stock).

**Types of preferred stock (know all of these):**
• **Straight (non-cumulative)** — pays fixed dividend; missed dividends are gone forever
• **Cumulative** — missed dividends accumulate as "dividends in arrears" and MUST be paid before any common dividends. Most common and most testable type.
• **Participating** — can receive additional dividends beyond the stated rate if the company does well
• **Convertible** — can be exchanged for a fixed number of common shares. Conversion ratio = par value ÷ conversion price
• **Callable** — issuer can buy it back at a specified price (benefits the issuer, not the investor)
• **Adjustable-rate** — dividend rate tied to a benchmark (like T-bill rate)

**Key differences from common stock:**
• Preferred has priority over common for dividends AND liquidation
• Preferred typically has NO voting rights
• Preferred dividends are usually fixed → behaves like a bond in response to interest rate changes
• When interest rates rise, preferred stock prices fall (inverse relationship, just like bonds)

**Exam tip:** Cumulative preferred is the #1 tested type. Remember: dividends in arrears must be paid before common stockholders get anything.`
          },
          {
            heading: "Equity Valuation Concepts",
            body: `You need to understand these valuation approaches conceptually and know the basic formulas:

**Current yield (for stocks):**
Current Yield = Annual Dividend ÷ Current Market Price

**Dividend Discount Model (DDM / Gordon Growth Model):**
Value = D₁ ÷ (r − g)
• D₁ = next expected annual dividend
• r = required rate of return
• g = dividend growth rate
• (r − g) must be positive for the formula to work
→ Used for mature, stable, dividend-paying companies

**Price-to-Earnings (P/E) Ratio:**
P/E = Market Price per Share ÷ EPS
• High P/E → growth stock
• Low P/E → value stock or potentially troubled company

**Earnings Per Share (EPS):**
EPS = (Net Income − Preferred Dividends) ÷ Common Shares Outstanding

**Fundamental analysis** examines financial statements, ratios, industry conditions
**Technical analysis** examines price patterns, volume, charts (does NOT care about financials)

**Exam tip:** Know DDM formula cold. Also know that technical analysts use charts and patterns, fundamental analysts use financial statements.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Equity Securities", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+equity+securities", type: "video" },
          { label: "The Geek & The Guru — Episode 1: Investment Vehicles", url: "https://www.youtube.com/results?search_query=geek+guru+series+65+podcast+investment+vehicles", type: "podcast" },
          { label: "Test Geek — Stocks Overview", url: "https://www.youtube.com/results?search_query=test+geek+series+65+equity+securities", type: "video" },
        ]
      },
      {
        id: "1.2",
        title: "Special Types of Equity Securities",
        los: [
          { code: "1.d", title: "Describe how incentive stock options differ from nonqualified stock options" },
          { code: "1.e", title: "Contrast restricted stock and nonrestricted stock" },
        ],
        content: [
          {
            heading: "Stock Options — ISOs vs. NQSOs",
            body: `Stock options give employees the right to buy company stock at a set price (the exercise/strike price).

**Incentive Stock Options (ISOs):**
• Available ONLY to employees
• Favorable tax treatment — no tax at grant or exercise (if holding period met)
• Must hold shares ≥2 years from grant date AND ≥1 year from exercise date for LTCG treatment
• If holding period not met → "disqualifying disposition" → taxed as ordinary income
• May trigger Alternative Minimum Tax (AMT) at exercise

**Nonqualified Stock Options (NQSOs):**
• Can be granted to employees, directors, consultants, anyone
• Taxed as ordinary income at exercise on the "bargain element" (market price − exercise price)
• Less favorable tax treatment but more flexible
• No AMT concerns
• Employer gets a tax deduction (unlike ISOs)

**Exam tip:** The key distinction is WHO can receive them (ISOs = employees only) and WHEN taxed (ISOs = potentially deferred; NQSOs = taxed at exercise).`
          },
          {
            heading: "Restricted vs. Nonrestricted Stock",
            body: `**Restricted stock:**
• Shares granted to employees with conditions (vesting schedule, performance targets)
• Cannot be sold until restrictions lapse
• Subject to forfeiture if employee leaves before vesting
• Typically includes SEC Rule 144 restrictions (holding period, volume limits, filing requirements)
• Rule 144: insiders and affiliates must hold restricted stock for at least 6 months before selling, file Form 144, and are subject to volume limitations

**Control (affiliate) stock:**
• Stock held by officers, directors, or 10%+ shareholders
• NOT necessarily restricted, but subject to Rule 144 volume and filing requirements

**Nonrestricted stock:**
• Freely tradeable on the open market
• No vesting or holding period requirements

**Exam tip:** Don't confuse restricted stock (has conditions) with control stock (held by insiders). They can overlap but are different concepts.`
          }
        ],
        resources: [
          { label: "Achievable — ISOs vs NQSOs Explained", url: "https://www.youtube.com/results?search_query=achievable+series+65+stock+options+ISO+NQSO", type: "video" },
        ]
      },
      {
        id: "1.3",
        title: "Foreign Equity Securities",
        los: [
          { code: "1.f", title: "Identify the unique features of ADRs and the risks of investing in foreign securities" },
        ],
        content: [
          {
            heading: "American Depositary Receipts (ADRs)",
            body: `ADRs allow U.S. investors to own shares in foreign companies without dealing with foreign exchanges or currencies directly.

**How ADRs work:**
• A U.S. bank buys shares of a foreign company and holds them in custody
• The bank then issues receipts (ADRs) that trade on U.S. exchanges in USD
• Each ADR may represent one or more underlying foreign shares
• Dividends are paid in USD (bank converts from foreign currency)

**Types:**
• **Sponsored ADRs** — foreign company is directly involved, provides financial info, trades on major U.S. exchanges (NYSE, NASDAQ)
• **Unsponsored ADRs** — created by a bank without the company's involvement, trade OTC, less transparent

**Risks specific to foreign investing:**
• **Currency (exchange rate) risk** — the #1 additional risk. If the foreign currency weakens vs. USD, returns decrease even if the stock price rises locally
• **Political/sovereign risk** — instability, nationalization, policy changes
• **Liquidity risk** — foreign markets may be less liquid
• **Information risk** — different accounting standards, less disclosure

**Exam tip:** ADRs eliminate the need to transact in foreign currencies, but they do NOT eliminate currency risk. The bank converts dividends, but the underlying value still fluctuates with exchange rates.`
          }
        ],
        resources: [
          { label: "Kaplan — ADRs and Foreign Securities", url: "https://www.youtube.com/results?search_query=kaplan+series+65+ADR+foreign+securities", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 2 — FIXED INCOME (BONDS)
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit2",
    number: 2,
    title: "Types and Characteristics of Fixed Income Securities",
    examQuestions: "~5 questions",
    lessons: [
      {
        id: "2.1",
        title: "Bonds as Fixed Income Securities",
        los: [
          { code: "2.a", title: "Recognize the characteristics common to most bonds" },
          { code: "2.b", title: "Identify the relevance of a bond's rating" },
        ],
        content: [
          {
            heading: "Bond Fundamentals",
            body: `A bond is a debt instrument — the issuer borrows money from the bondholder and promises to pay interest and return principal.

**Core terminology:**
• **Par (face) value** — typically $1,000; the amount repaid at maturity
• **Coupon rate** — the stated annual interest rate (fixed for most bonds)
• **Maturity date** — when principal is returned
• **Current market price** — what the bond trades for now (can be above or below par)

**Pricing conventions:**
• Par = 100% of face value ($1,000)
• Premium = above par (price > $1,000) → coupon rate > market rate
• Discount = below par (price < $1,000) → coupon rate < market rate

**The inverse relationship (CRITICAL):**
When interest rates ↑ → bond prices ↓
When interest rates ↓ → bond prices ↑

**Duration and interest rate sensitivity:**
• Longer maturity → MORE sensitive to rate changes
• Lower coupon → MORE sensitive to rate changes
• Zero-coupon bonds have the HIGHEST duration/sensitivity

**Bond risks:**
• **Interest rate (market) risk** — prices fall when rates rise
• **Credit (default) risk** — issuer may not pay
• **Call risk** — issuer redeems early when rates fall
• **Reinvestment risk** — coupon payments reinvested at lower rates
• **Inflation (purchasing power) risk** — fixed payments lose real value

**Exam tip:** Interest rate risk and reinvestment risk are inversely related. Long-term bonds have high interest rate risk but low reinvestment risk.`
          },
          {
            heading: "Bond Ratings",
            body: `Bond ratings assess credit quality — the likelihood the issuer will meet its obligations.

**Rating agencies:** Moody's, S&P, Fitch

**Investment grade:**
• S&P: AAA, AA, A, BBB
• Moody's: Aaa, Aa, A, Baa

**Non-investment grade (high yield / "junk"):**
• S&P: BB and below
• Moody's: Ba and below

**Key principles:**
• Higher rating = lower yield (less risk = less compensation)
• Lower rating = higher yield (more risk = more compensation)
• The difference between yields = **credit spread**
• Credit spreads widen during economic downturns
• BBB/Baa is the critical boundary between investment grade and junk

**Exam tip:** BBB/Baa is the critical boundary. Many institutional investors can only hold investment-grade bonds.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Bond Basics", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+bonds", type: "video" },
          { label: "Test Geek — Bonds Simplified", url: "https://www.youtube.com/results?search_query=test+geek+series+65+bonds", type: "video" },
        ]
      },
      {
        id: "2.2",
        title: "Bond Math",
        los: [
          { code: "2.c", title: "Calculate the price of a bond" },
          { code: "2.d", title: "Calculate the parity price of a convertible bond" },
          { code: "2.e", title: "Compare current yield, yield to maturity, and yield to call" },
        ],
        content: [
          {
            heading: "The Yield Hierarchy — The Bond Seesaw",
            body: `This is one of the MOST TESTED concepts. Know the relationships cold.

**Four yields to know:**

1. **Nominal Yield (Coupon Rate)** = Annual Coupon ÷ Par Value
→ Fixed at issuance, never changes

2. **Current Yield (CY)** = Annual Coupon ÷ Current Market Price
→ Changes when market price moves

3. **Yield to Maturity (YTM)** = total annualized return if held to maturity
→ Most comprehensive yield measure

4. **Yield to Call (YTC)** = total annualized return if called at earliest call date
→ Only relevant for callable bonds

**For DISCOUNT bonds (price < par):**
Coupon < CY < YTM < YTC

**For PREMIUM bonds (price > par):**
Coupon > CY > YTM > YTC

**For PAR bonds:**
Coupon = CY = YTM (all equal)

**The Seesaw Rule:**
Price ↑ → Yields ↓ | Price ↓ → Yields ↑

**CY Example:** $1,000 par, 5% coupon, trading at $900
CY = $50 ÷ $900 = 5.56%

**Exam tip:** You probably won't calculate YTM or YTC — just know the ORDER for discount and premium bonds.`
          },
          {
            heading: "Convertible Bond Parity",
            body: `A convertible bond can be exchanged for a fixed number of common shares.

**Conversion Ratio** = Par Value ÷ Conversion Price
Example: $1,000 ÷ $50 = 20 shares per bond

**Parity Price of the Stock** = Bond Market Price ÷ Conversion Ratio
Example: $1,100 ÷ 20 = $55 per share

**Parity Price of the Bond** = Stock Price × Conversion Ratio
Example: $60 × 20 = $1,200

**When stock price > parity:** bond trades based on stock value (equity feature dominates)
**When stock price < parity:** bond trades based on yield (debt feature dominates)

**Exam tip:** Convertible bonds always have LOWER coupon rates than comparable non-convertible bonds because the conversion feature has value.`
          }
        ],
        resources: [
          { label: "Series 65 Guru — Bond Seesaw", url: "https://www.youtube.com/results?search_query=series+65+guru+bond+seesaw+yield", type: "video" },
        ]
      },
      {
        id: "2.3",
        title: "Government and Corporate Debt",
        los: [
          { code: "2.f", title: "Recognize the unique features of U.S. government and agency issues" },
          { code: "2.g", title: "Differentiate between secured and unsecured corporate debt" },
        ],
        content: [
          {
            heading: "U.S. Government Securities",
            body: `Government bonds are backed by the full faith and credit of the U.S. government.

**Treasury Bills (T-Bills):** 4-52 week maturities, sold at discount, no coupons, most liquid money market instrument
**Treasury Notes (T-Notes):** 2-10 year maturities, semiannual coupons, quoted in 32nds
**Treasury Bonds (T-Bonds):** 20-30 year maturities, semiannual coupons

**TIPS (Treasury Inflation-Protected Securities):**
• Principal adjusts with CPI
• Coupon rate is fixed but applied to adjusted principal
• TIPS Interest = Fixed Coupon Rate × Adjusted Principal
• Protects against inflation risk
• "Phantom income" — taxable annually even though principal adjustment received at maturity

**Agency Securities:**
• **GNMA (Ginnie Mae)** — ONLY agency backed by full faith and credit of U.S. government
• **FNMA (Fannie Mae) and FHLMC (Freddie Mac)** — GSEs, NOT directly backed
• All deal in mortgage-backed securities, subject to prepayment risk

**Exam tip:** GNMA = full government backing. Fannie/Freddie = NO explicit backing. All treasuries exempt from state/local taxes (but NOT federal).`
          },
          {
            heading: "Corporate Bonds — Secured vs. Unsecured",
            body: `**Secured bonds (backed by specific collateral):**
• **Mortgage bonds** — backed by real estate
• **Collateral trust bonds** — backed by securities held in trust
• **Equipment trust certificates** — backed by equipment

**Unsecured bonds (backed only by issuer's creditworthiness):**
• **Debentures** — most common corporate bond type
• **Subordinated debentures** — junior to other debt in liquidation
• **Income bonds** — pay interest ONLY if company earns sufficient income (most risky)

**Liquidation priority (top = paid first):**
1. Secured creditors
2. Unsecured creditors (debenture holders)
3. Subordinated debenture holders
4. Preferred stockholders
5. Common stockholders

**Special features:**
• **Callable** — issuer redeems early (benefits issuer when rates fall)
• **Puttable** — investor sells back early (benefits investor when rates rise)
• **Zero-coupon** — sold at deep discount, no periodic interest, "phantom income"

**Exam tip:** Know the liquidation order cold. Zero-coupon bonds create phantom income — taxed annually on imputed interest.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Treasuries & Agencies", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+treasury+securities", type: "video" },
        ]
      },
      {
        id: "2.4",
        title: "Municipal Bonds & Foreign Debt",
        los: [
          { code: "2.h", title: "Recall the unique features of municipal bonds including the calculation of tax-equivalent yield" },
          { code: "2.i", title: "Identify the advantages and disadvantages of investing in foreign debt securities" },
        ],
        content: [
          {
            heading: "Municipal Bonds",
            body: `Municipal bonds ("munis") are issued by state and local governments. Interest is EXEMPT from federal income tax. If from your own state, potentially triple tax-free.

**General Obligation (GO) bonds:**
• Backed by taxing power (full faith and credit)
• Repaid through taxes
• Require voter approval, considered safer

**Revenue bonds:**
• Backed ONLY by revenue from the specific project (toll road, hospital, airport)
• NOT backed by taxing power, do NOT require voter approval
• Riskier than GO bonds → higher yields

**Tax-Equivalent Yield (TEY) — MUST KNOW:**
TEY = Muni Yield ÷ (1 − Tax Bracket)

Example: 4% muni, 32% tax bracket
TEY = 0.04 ÷ (1 − 0.32) = 0.04 ÷ 0.68 = 5.88%
→ You'd need a 5.88% taxable bond to match this muni's after-tax return

**When are munis most beneficial?** For investors in HIGH tax brackets.

**Exam tip:** TEY is one of the most tested calculations on the entire exam. Capital gains on munis ARE taxable — only the interest is exempt.`
          },
          {
            heading: "Foreign Debt & Debt Repayment",
            body: `**Foreign bond types:**
• **Eurobonds** — bonds issued in a currency different from the country where sold (NOT necessarily European)
• **Yankee bonds** — foreign issuer, denominated in USD, sold in the U.S. (eliminates currency risk for U.S. investors)
• **Sovereign debt** — bonds issued by foreign governments

**Debt repayment methods:**
• **Call provisions** — issuer redeems early when rates fall (bad for investors — reinvestment risk)
• **Sinking fund** — issuer sets aside money periodically to retire bonds (reduces credit risk)
• **Pre-refunding** — issuer borrows at lower rates, buys Treasuries in escrow to pay off original bonds
• **Tender offer** — issuer offers to buy back bonds (voluntary for holders)

**Exam tip:** Yankee bonds = no currency risk for U.S. investors. Pre-refunded bonds become essentially AAA (backed by escrowed Treasuries).`
          }
        ],
        resources: [
          { label: "Test Geek — Muni Bonds & TEY", url: "https://www.youtube.com/results?search_query=test+geek+series+65+municipal+bonds+tax+equivalent+yield", type: "video" },
        ]
      },
      {
        id: "2.5",
        title: "Money Market Instruments",
        los: [
          { code: "2.j", title: "Recall the methods of repayment of principal" },
          { code: "2.k", title: "Identify the special characteristics of money market instruments" },
        ],
        content: [
          {
            heading: "Money Market Instruments",
            body: `Money market instruments are short-term (≤1 year), highly liquid, low-risk debt securities — the closest thing to cash.

**T-Bills:** U.S. government, up to 52 weeks, sold at discount, safest
**Commercial Paper:** Unsecured corporate IOUs, 1-270 days (≤270 days to avoid SEC registration)
**Negotiable CDs (Jumbo CDs):** $100,000+, bank-issued, tradeable, FDIC insured up to $250K
**Banker's Acceptances:** Used in international trade, bank-guaranteed
**Repos:** Short-term borrowing — dealer sells securities and agrees to buy back at higher price
**Fed Funds:** Overnight loans between banks to meet reserve requirements

**Characteristics:** High liquidity, low risk, low return. Used for parking cash and preserving capital.

**Exam tip:** Know the 270-day limit for commercial paper. Money market FUNDS (mutual funds) are different from money market INSTRUMENTS (individual securities).`
          }
        ],
        resources: [
          { label: "Achievable — Money Markets", url: "https://www.youtube.com/results?search_query=achievable+series+65+money+market+instruments", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 3 — POOLED INVESTMENTS
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit3",
    number: 3,
    title: "Pooled Investments",
    examQuestions: "~6 questions",
    lessons: [
      {
        id: "3.1",
        title: "Investment Companies",
        los: [
          { code: "3.a", title: "Identify the legal requirements of investment companies" },
          { code: "3.b", title: "Compare capitalization and pricing of open-end and closed-end companies" },
          { code: "3.c", title: "Contrast mutual fund share classes and the different types of loads" },
        ],
        content: [
          {
            heading: "Investment Company Act of 1940",
            body: `The Investment Company Act of 1940 regulates pooled investment vehicles. Three types:

**Face-amount certificate companies** — rarely tested, nearly extinct
**Unit Investment Trusts (UITs)** — covered separately
**Management investment companies** — the big category, split into open-end and closed-end

**Legal requirements for investment companies:**
• Must register with the SEC
• Board of directors — at least 40% must be non-interested (outside/independent) directors
• Must have clearly stated investment objectives
• Can only change fundamental policies with majority shareholder vote
• Must distribute at least 90% of net investment income to maintain tax-advantaged status (pass-through taxation)
• Cannot purchase securities on margin or participate in short sales

**Exam tip:** The 40% non-interested director requirement and the 90% distribution rule are frequently tested.`
          },
          {
            heading: "Open-End vs. Closed-End Funds",
            body: `**Open-End Funds (Mutual Funds):**
• Continuously issue and redeem shares
• Priced at NAV (Net Asset Value), calculated once daily after market close (forward pricing)
• NAV = (Total Assets − Total Liabilities) ÷ Shares Outstanding
• Investors buy at NAV + sales charge (POP), redeem at NAV
• Offering Price = NAV ÷ (1 − Sales Load %)
• Cannot be purchased on margin or sold short
• No trading on exchanges (bought/sold through the fund)

**Closed-End Funds:**
• Issue a FIXED number of shares through an IPO
• Trade on exchanges like stocks (can be bought on margin, sold short)
• Priced by supply and demand — can trade at a premium or discount to NAV
• Frequently trade at a DISCOUNT to NAV
• Can use leverage (borrow money to invest)

**Key distinction:**
Open-end = always trades at NAV | Closed-end = trades at market price (can differ from NAV)

**Exam tip:** If asked about a fund trading at a discount or premium, it's a closed-end fund. Open-end funds always transact at NAV.`
          },
          {
            heading: "Mutual Fund Share Classes & Loads",
            body: `**Class A shares:**
• Front-end load (sales charge paid when you buy, max 8.5%)
• Lower ongoing expenses (12b-1 fees)
• Breakpoints — volume discounts for large purchases
• Letter of intent — pledge to invest enough for breakpoint within 13 months
• Rights of accumulation — current holdings count toward breakpoints
• Best for long-term investors with large investments

**Class B shares:**
• Back-end load (CDSC — contingent deferred sales charge, paid when you sell)
• CDSC typically declines over 6-8 years, then converts to Class A
• Higher 12b-1 fees than Class A
• No breakpoints available
• Being phased out by many fund companies

**Class C shares:**
• Level load — small ongoing charge (typically 1% 12b-1 fee annually)
• May have small CDSC (usually 1% in first year)
• No conversion to Class A
• Best for short-term investors (1-3 years)

**No-Load Funds:**
• No sales charge
• May still charge 12b-1 fees up to 0.25%
• If 12b-1 fee > 0.25%, cannot call itself "no-load"

**12b-1 fees:** Marketing and distribution fees, max 0.75% (plus 0.25% service fee = 1.00% total max)

**Exam tip:** Breakpoint selling (selling just below a breakpoint to earn a higher commission) is a violation and PROHIBITED.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Mutual Funds & Investment Companies", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+mutual+funds", type: "video" },
          { label: "The Geek & The Guru — Pooled Investments", url: "https://www.youtube.com/results?search_query=geek+guru+series+65+podcast+pooled+investments", type: "podcast" },
        ]
      },
      {
        id: "3.2",
        title: "Private Funds, Hedge Funds & Venture Capital",
        los: [
          { code: "3.d", title: "Identify the characteristics of private funds and venture capital funds" },
          { code: "3.e", title: "Identify the structure and suitability requirements of a hedge fund" },
        ],
        content: [
          {
            heading: "Private Funds & Venture Capital",
            body: `**Private funds** are pooled investment vehicles not registered under the Investment Company Act of 1940. They rely on exemptions.

**Section 3(c)(1) funds:** Limited to 100 investors (accredited investors)
**Section 3(c)(7) funds:** Unlimited investors, but all must be "qualified purchasers" ($5 million+ in investments)

**Venture Capital Funds:**
• Invest in early-stage, startup companies
• Very high risk, potentially very high reward
• Long lock-up periods (investors cannot withdraw easily)
• Illiquid — no secondary market for the fund interests
• Typically organized as limited partnerships
• VC fund advisers exempt from full SEC registration (venture capital fund adviser exemption)

**Private Equity Funds:**
• Buy established companies, restructure, and sell for profit (leveraged buyouts, etc.)
• Also long lock-up periods and illiquid
• Use significant leverage

**Exam tip:** Private funds avoid registration by limiting the number or type of investors, not by registering with the SEC.`
          },
          {
            heading: "Hedge Funds",
            body: `Hedge funds are private investment pools for sophisticated/wealthy investors. They use aggressive strategies.

**Key characteristics:**
• Typically organized as limited partnerships or LLCs
• Available only to accredited investors or qualified purchasers
• Lightly regulated — not registered under the Investment Company Act of 1940
• Use leverage, short selling, derivatives, concentrated positions
• May invest in any asset class

**Compensation — "2 and 20":**
• 2% management fee (on total assets)
• 20% performance fee (incentive allocation on profits)
• High-water mark — performance fee only charged on NEW profits above previous peak

**Fund of Funds:**
• A fund that invests in multiple hedge funds
• Provides diversification but adds a layer of fees ("fees on fees")

**Risks:**
• Illiquidity — lock-up periods restrict withdrawals
• Leverage amplifies losses
• Limited transparency
• Manager risk — heavy dependence on manager skill

**Exam tip:** Hedge funds are known for their "2 and 20" fee structure. The high-water mark protects investors from paying performance fees on recovered losses.`
          }
        ],
        resources: [
          { label: "Test Geek — Hedge Funds & Private Funds", url: "https://www.youtube.com/results?search_query=test+geek+series+65+hedge+funds+private+funds", type: "video" },
        ]
      },
      {
        id: "3.3",
        title: "UITs, ETFs, and REITs",
        los: [
          { code: "3.f", title: "Recall the special features of unit investment trusts" },
          { code: "3.g", title: "Identify the distinguishing characteristics of ETFs" },
          { code: "3.h", title: "Identify the unique features of REITs" },
          { code: "3.i", title: "Explain the benefits and risks of pooled investments" },
        ],
        content: [
          {
            heading: "Unit Investment Trusts (UITs)",
            body: `UITs are investment companies with a FIXED portfolio — no active management.

**Key features:**
• Fixed portfolio — securities are selected at creation and generally not changed
• Self-liquidating — has a termination date when assets are distributed
• No board of directors (no management decisions needed)
• Shares redeemable with the trust (not traded on exchanges)
• Investors receive their proportionate share of income
• Sales charge but NO management fee (no active management)

**Two types:**
• **Fixed UITs** — hold bonds, distribute interest income
• **Equity UITs** — hold stocks, typically for a set period

**Exam tip:** The key to UITs is the FIXED, unmanaged portfolio and the termination date. No active management = no management fee.`
          },
          {
            heading: "Exchange-Traded Funds (ETFs)",
            body: `ETFs combine features of mutual funds and individual stocks.

**Key features:**
• Trade on exchanges throughout the day (unlike mutual funds which price once daily)
• Most are passively managed (track an index)
• Can be bought on margin, sold short
• Very tax-efficient — use "in-kind" redemption process to minimize capital gains distributions
• Lower expense ratios than most mutual funds
• No minimum investment (buy as little as one share)
• Prices can differ slightly from NAV (premiums/discounts, usually very small)

**ETFs vs. Mutual Funds:**
• ETFs trade intraday; mutual funds at end-of-day NAV
• ETFs generally more tax-efficient
• ETFs may have brokerage commissions; mutual funds may have loads
• ETFs usually passively managed; mutual funds can be active or passive

**Exam tip:** ETFs are more tax-efficient than mutual funds because of the in-kind creation/redemption mechanism. Know that ETFs trade like stocks — intraday, on margin, short sales allowed.`
          },
          {
            heading: "Real Estate Investment Trusts (REITs)",
            body: `REITs allow investors to invest in real estate without directly owning property.

**Types:**
• **Equity REITs** — own and operate real estate properties (most common)
• **Mortgage REITs** — invest in mortgages and mortgage-backed securities
• **Hybrid REITs** — combine both equity and mortgage strategies

**Key requirements:**
• Must distribute at least 90% of taxable income to shareholders (like investment companies)
• At least 75% of assets must be in real estate, cash, or government securities
• At least 75% of gross income from real estate-related sources
• Must have at least 100 shareholders
• No more than 50% owned by 5 or fewer individuals (5/50 rule)

**Tax treatment:**
• Dividends to shareholders are generally taxed as ordinary income (NOT qualified dividends)
• The REIT itself avoids corporate-level taxation if it meets distribution requirements

**Benefits:** Diversification, liquidity (if publicly traded), income, inflation hedge
**Risks:** Interest rate sensitivity, real estate market risk, lack of diversification within sector

**Exam tip:** REIT dividends are taxed as ordinary income, NOT as qualified dividends. The 90% distribution requirement mirrors mutual fund requirements.`
          }
        ],
        resources: [
          { label: "Dean Tinney — ETFs vs Mutual Funds", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+ETFs+mutual+funds", type: "video" },
          { label: "Test Geek — REITs Explained", url: "https://www.youtube.com/results?search_query=test+geek+series+65+REITs", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 4 — DERIVATIVES
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit4",
    number: 4,
    title: "Options and Other Derivatives",
    examQuestions: "~5 questions",
    lessons: [
      {
        id: "4.1",
        title: "Options Basics",
        los: [
          { code: "4.a", title: "Recognize the common characteristics of all derivatives" },
          { code: "4.b", title: "Identify the difference between a put and a call option and their strategies" },
          { code: "4.c", title: "Contrast calls, rights, and warrants" },
        ],
        content: [
          {
            heading: "Options Fundamentals",
            body: `A derivative derives its value from an underlying asset (stock, bond, index, currency, commodity).

**Call Option:** The RIGHT to BUY the underlying asset at the strike price before expiration
**Put Option:** The RIGHT to SELL the underlying asset at the strike price before expiration

**Key terms:**
• **Premium** — price paid by the buyer to the seller (writer) for the option
• **Strike (exercise) price** — the price at which the underlying can be bought/sold
• **Expiration date** — last day the option can be exercised
• **In-the-money** — option has intrinsic value (would profit if exercised now)
• **Out-of-the-money** — option has no intrinsic value
• **At-the-money** — strike price equals current market price

**Buyers vs. Writers (Sellers):**
• Buyers pay premium, have RIGHTS, have LIMITED risk (premium paid)
• Writers receive premium, have OBLIGATIONS, have potentially UNLIMITED risk (for naked calls)

**Call intrinsic value** = Market Price − Strike Price (if positive)
**Put intrinsic value** = Strike Price − Market Price (if positive)

**Basic strategies:**
• **Buy calls** — bullish (expect price to rise). Max loss = premium paid.
• **Sell (write) calls** — bearish/neutral. Max gain = premium received. Naked call = UNLIMITED risk.
• **Buy puts** — bearish (expect price to fall). Max loss = premium paid.
• **Sell (write) puts** — bullish/neutral. Max gain = premium received. Max loss = strike price − premium.

**Exam tip:** Buyers have rights, sellers have obligations. Call buyers are bullish, put buyers are bearish. Naked call writing has UNLIMITED risk.`
          },
          {
            heading: "Calls, Rights, and Warrants",
            body: `All three give the holder the right to buy stock at a set price, but they differ in important ways.

**Calls:**
• Created by individual investors (options market)
• Standard expiration (typically months)
• Exercise price may be above, at, or below market price
• Not issued by the underlying company

**Stock Rights (Preemptive Rights):**
• Issued by the corporation to existing shareholders
• Short-term (typically 30-90 days)
• Allow purchase at a subscription price BELOW current market price
• Protect against dilution when new shares are issued
• Trade on exchanges during their life
• Each share gets one right; it may take multiple rights to buy one new share

**Warrants:**
• Issued by the corporation, typically attached to bonds or preferred stock as a "sweetener"
• Long-term (often 2-10 years, sometimes perpetual)
• Exercise price set ABOVE current market price at time of issuance
• Trade independently on exchanges
• Dilutive — when exercised, new shares are created

**Exam tip:** Rights = short-term, below market price, protect shareholders. Warrants = long-term, above market price, issued as sweeteners. Both are dilutive when exercised.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Options for Series 65", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+options", type: "video" },
          { label: "The Geek & The Guru — Derivatives Episode", url: "https://www.youtube.com/results?search_query=geek+guru+series+65+podcast+derivatives", type: "podcast" },
        ]
      },
      {
        id: "4.2",
        title: "Futures, Forwards & Derivative Risks",
        los: [
          { code: "4.d", title: "Describe the difference between futures and forwards contracts" },
          { code: "4.e", title: "Identify the costs, benefits, and risks of derivative securities" },
        ],
        content: [
          {
            heading: "Futures vs. Forwards",
            body: `Both are contracts to buy/sell an asset at a future date at a specified price, but they differ structurally.

**Futures Contracts:**
• Standardized (exchange-traded)
• Daily settlement (mark-to-market)
• Margin required
• Clearinghouse guarantees performance (reduces counterparty risk)
• Highly liquid — can be offset before delivery
• Used for commodities, currencies, interest rates, indices

**Forward Contracts:**
• Customized (OTC — over-the-counter)
• Settled at expiration only
• No margin or daily settlement
• No clearinghouse — direct counterparty risk
• Illiquid — difficult to exit before expiration
• Used primarily by institutional investors and for hedging

**Key distinction:** Futures = standardized + exchange-traded + low counterparty risk. Forwards = customized + OTC + counterparty risk.

**Both futures and forwards create an OBLIGATION (not a right) to perform.**

**Exam tip:** The biggest risk difference is counterparty risk — futures have almost none (clearinghouse), forwards have significant counterparty risk.`
          },
          {
            heading: "Derivative Costs, Benefits & Risks",
            body: `**Benefits of derivatives:**
• Hedging — reduce portfolio risk (e.g., buy puts to protect stock positions)
• Leverage — control large positions with small investment
• Income generation — writing covered calls generates premium income
• Speculation — profit from price movements with limited capital

**Costs:**
• Premium paid (for options)
• Transaction costs
• Margin requirements (for futures)
• Complexity — require expertise

**Risks:**
• **Leverage risk** — amplifies both gains AND losses
• **Time decay** — options lose value as expiration approaches
• **Counterparty risk** — especially for OTC derivatives (forwards, swaps)
• **Liquidity risk** — some derivatives may be hard to exit
• **Unlimited loss potential** — for naked call writers and futures positions

**Exam tip:** Derivatives are NOT suitable for all investors. They require knowledge, risk tolerance, and adequate capital. The exam often tests suitability in the context of conservative vs. aggressive portfolios.`
          }
        ],
        resources: [
          { label: "Test Geek — Futures & Forwards", url: "https://www.youtube.com/results?search_query=test+geek+series+65+futures+forwards", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 5 — ALTERNATIVE INVESTMENTS
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit5",
    number: 5,
    title: "Alternative Investments and Direct Participation Programs",
    examQuestions: "~4 questions",
    lessons: [
      {
        id: "5.1",
        title: "Direct Participation Programs (DPPs)",
        los: [
          { code: "5.a", title: "Identify the concept of flow-through of passive income and loss as it applies to DPPs" },
          { code: "5.b", title: "Differentiate between the roles of the general partner(s) and the limited partner(s)" },
        ],
        content: [
          {
            heading: "DPP Structure & Tax Treatment",
            body: `Direct Participation Programs (DPPs) are typically limited partnerships that pass through income, losses, and tax benefits directly to investors.

**Flow-through taxation:**
• Income and losses "flow through" to partners' individual tax returns
• No taxation at the entity level (unlike corporations)
• Passive income/loss — DPP losses can only offset OTHER passive income
• Cannot offset active income (salary) or portfolio income (dividends, interest)
• Form K-1 reports each partner's share of income/loss

**General Partner (GP):**
• Manages the partnership day-to-day
• Has UNLIMITED liability for partnership debts
• Makes all operational decisions
• Has a fiduciary duty to limited partners
• Must have at least one GP

**Limited Partner (LP):**
• Passive investor — contributes capital but does NOT manage
• Has LIMITED liability — can only lose their investment
• If LP participates in management, they LOSE limited liability protection
• Cannot bind the partnership or make management decisions

**Common DPP types:**
• Real estate partnerships
• Oil and gas programs (exploratory, developmental, income)
• Equipment leasing programs

**Exam tip:** The critical rule — limited partners must remain PASSIVE. If they participate in management, they become general partners with unlimited liability.`
          }
        ],
        resources: [
          { label: "Dean Tinney — DPPs and Limited Partnerships", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+DPP+limited+partnership", type: "video" },
        ]
      },
      {
        id: "5.2",
        title: "Alternative Investments",
        los: [
          { code: "5.c", title: "Recognize the characteristics of pooled investment vehicles that are alternative investments" },
          { code: "5.f", title: "Identify different types of commodities and precious metals" },
          { code: "5.g", title: "Explain the benefits and risks of alternative investments" },
          { code: "5.h", title: "Identify the characteristics of digital assets (NEW)" },
        ],
        content: [
          {
            heading: "Alternative Investment Types",
            body: `Alternative investments fall outside traditional stocks, bonds, and cash. They include:

**Digital Assets (NEW EXAM TOPIC):**
• Includes cryptocurrencies (Bitcoin, Ethereum), NFTs (non-fungible tokens), and digital tokens
• May be classified as securities (using Howey Test), currencies, or assets — classification determines regulation
• NFTs are known for their NON-FUNGIBILITY (each is unique, unlike cryptocurrency which is fungible)
• Highly volatile, largely unregulated, subject to cyber theft risk
• Not backed by any government or asset
• May be treated as property for tax purposes (capital gains on sale)

**SPACs — Special Purpose Acquisition Companies (NEW EXAM TOPIC):**
• Also called "blank check companies" or "blind pools"
• Shell companies that raise capital through an IPO to acquire an existing company
• Investors don't know what company the SPAC will acquire at time of investment
• SPAC sponsor/founder makes the initial acquisition decision
• After acquisition, the combined entity becomes a publicly traded company
• Risks: unknown target, dilution, sponsor conflicts of interest

**Commodities & Precious Metals:**
• Include gold, silver, oil, natural gas, agricultural products
• Serve as inflation hedge (especially gold)
• Traded via futures contracts, ETFs, or physical ownership
• Gold is considered a "store of value" and safe haven
• High price volatility

**Other alternatives:** Collectibles (art, wine, coins), timber, farmland, cryptocurrency

**Benefits:** Portfolio diversification, low correlation to traditional assets, inflation protection
**Risks:** Illiquidity, complexity, lack of transparency, higher fees, limited regulation

**Exam tip:** The primary benefit of alternatives is DIVERSIFICATION (low correlation to stocks/bonds). The primary risk is ILLIQUIDITY.`
          }
        ],
        resources: [
          { label: "Test Geek — Alternative Investments", url: "https://www.youtube.com/results?search_query=test+geek+series+65+alternative+investments", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 6 — ECONOMIC FACTORS
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit6",
    number: 6,
    title: "Economic Factors and Business Information",
    examQuestions: "~6 questions",
    lessons: [
      {
        id: "6.1",
        title: "Business Cycle & Yield Curves",
        los: [
          { code: "6.a", title: "Analyze the four stages of the business cycle" },
          { code: "6.b", title: "Identify the three types of yield curves and how they reflect interest rates" },
        ],
        content: [
          {
            heading: "The Business Cycle",
            body: `The economy moves through four recurring phases:

**1. Expansion (Recovery):**
• GDP rising, unemployment falling, consumer confidence growing
• Corporate earnings increase, stock prices generally rise
• Interest rates begin to rise as demand for capital increases
• Appropriate investments: stocks, cyclical industries

**2. Peak:**
• Economy at maximum output
• Inflation concerns rise, Fed may tighten monetary policy
• Interest rates at or near highest levels
• Leading indicators begin to flatten or decline

**3. Contraction (Recession):**
• GDP declining for 2+ consecutive quarters = recession
• Unemployment rising, consumer spending falling
• Corporate earnings decline, stock prices generally fall
• Interest rates typically decline as Fed eases policy
• Appropriate investments: defensive stocks, bonds, money market

**4. Trough:**
• Economy at its lowest point before recovery begins
• Maximum unemployment, low consumer confidence
• Interest rates typically at their lowest
• Opportunistic buying — stocks are cheapest

**Exam tip:** The NBER (National Bureau of Economic Research) officially declares recessions and recoveries. A recession is technically 2+ consecutive quarters of declining GDP.`
          },
          {
            heading: "Yield Curves",
            body: `A yield curve plots interest rates (yields) across different maturities for similar-quality bonds (typically Treasuries).

**Normal (ascending) yield curve:**
• Short-term rates < long-term rates
• Most common shape
• Investors demand higher yield for longer commitments (time risk premium)
• Indicates expectations of economic growth and rising interest rates

**Inverted (descending) yield curve:**
• Short-term rates > long-term rates
• Historically a reliable predictor of recession
• Suggests investors expect rates to FALL (flight to long-term safety)
• The Fed may be keeping short-term rates high to fight inflation

**Flat yield curve:**
• Short-term and long-term rates are approximately equal
• Transitional — often occurs between normal and inverted
• Suggests economic uncertainty

**Exam tip:** An inverted yield curve is the most tested because it's a recession predictor. The exam loves to ask "what does an inverted yield curve signal?"— answer: economic slowdown/recession expected.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Economics for Series 65", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+economics+business+cycle", type: "video" },
          { label: "The Geek & The Guru — Economic Factors", url: "https://www.youtube.com/results?search_query=geek+guru+series+65+podcast+economics", type: "podcast" },
        ]
      },
      {
        id: "6.2",
        title: "Monetary Policy, Fiscal Policy & Economic Indicators",
        los: [
          { code: "6.c", title: "Identify fundamental economic principles including the difference between monetary and fiscal policy" },
          { code: "6.d", title: "Differentiate between inflation and deflation and how they are affected by major economic indicators" },
        ],
        content: [
          {
            heading: "Monetary vs. Fiscal Policy",
            body: `**Monetary Policy (Federal Reserve — "the Fed"):**
Controls the money supply and interest rates. Tools:

• **Open Market Operations** — the Fed's primary tool
  → Buying securities = injects money = expansionary = rates ↓
  → Selling securities = removes money = contractionary = rates ↑
• **Discount Rate** — rate the Fed charges banks for short-term loans
  → Raising = tighter money = contractionary
  → Lowering = easier money = expansionary
• **Reserve Requirements** — percentage of deposits banks must hold
  → Raising = less lending = contractionary
  → Lowering = more lending = expansionary
• **Federal Funds Rate** — rate banks charge each other for overnight loans (the Fed's TARGET rate)

**Fiscal Policy (Congress & the President):**
Controls government spending and taxation.
• Increase spending / cut taxes = expansionary (stimulates economy)
• Decrease spending / raise taxes = contractionary (cools economy)
• Deficit spending = government spends more than it collects in taxes

**Key distinction:** Monetary policy = Fed (independent). Fiscal policy = government (political).

**Exam tip:** Open market operations is the Fed's MOST USED tool. Know the expansionary vs. contractionary effects of each tool.`
          },
          {
            heading: "Inflation, Deflation & Economic Indicators",
            body: `**Inflation:** Sustained increase in the general price level. Erodes purchasing power.
• Measured by CPI (Consumer Price Index) and PPI (Producer Price Index)
• Hurts fixed-income investors (real returns decline)
• TIPS and real estate serve as inflation hedges
• Demand-pull inflation: too much money chasing too few goods
• Cost-push inflation: rising production costs push prices up

**Deflation:** Sustained decrease in general price levels. Increases purchasing power.
• Hurts borrowers (debt becomes more expensive in real terms)
• Benefits fixed-income investors
• Often associated with severe recessions/depressions

**Economic Indicators:**
**Leading indicators** (predict future economic activity):
• Stock market performance, building permits, new orders for durable goods, money supply (M2), consumer expectations, initial jobless claims
→ These CHANGE BEFORE the economy does

**Coincident indicators** (move with the economy):
• GDP, personal income, industrial production, retail sales

**Lagging indicators** (confirm trends after they occur):
• Unemployment rate, CPI, prime rate, average duration of unemployment, corporate profits

**Key interest rates:**
• **Federal Funds Rate** — most important short-term rate
• **Prime Rate** — rate banks charge their best customers (lagging indicator)
• **Discount Rate** — rate Fed charges banks
• **SOFR (Secured Overnight Financing Rate)** — replaced LIBOR as the benchmark for short-term loans (effective Jan 2022). Based on overnight Treasury repo transactions.

**Exam tip:** The stock market is a LEADING indicator. Unemployment is a LAGGING indicator. Know the difference — the exam tests this frequently.`
          }
        ],
        resources: [
          { label: "Test Geek — Monetary vs Fiscal Policy", url: "https://www.youtube.com/results?search_query=test+geek+series+65+monetary+fiscal+policy", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 7 — FINANCIAL REPORTING
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit7",
    number: 7,
    title: "Financial Reporting and Analysis",
    examQuestions: "~4 questions",
    lessons: [
      {
        id: "7.1",
        title: "Financial Statements",
        los: [
          { code: "7.a", title: "Recognize the relationship between assets, liabilities, and owners' equity" },
          { code: "7.b", title: "Identify the effects to the balance sheet from certain corporate actions" },
          { code: "7.c", title: "Recognize income statement items" },
          { code: "7.d", title: "Identify the use of the statement of cash flows" },
        ],
        content: [
          {
            heading: "The Balance Sheet",
            body: `The balance sheet is a snapshot of a company's financial position at a specific point in time.

**The fundamental equation:**
Assets = Liabilities + Shareholders' Equity

**Assets (what the company owns):**
• Current assets: cash, accounts receivable, inventory (convertible to cash within 1 year)
• Fixed assets: property, plant, equipment (long-term)
• Intangible assets: goodwill, patents, trademarks

**Liabilities (what the company owes):**
• Current liabilities: accounts payable, short-term debt (due within 1 year)
• Long-term liabilities: bonds payable, long-term loans

**Shareholders' Equity (book value / net worth):**
• Common stock (par value), additional paid-in capital, retained earnings
• Retained earnings = cumulative net income minus cumulative dividends

**Corporate actions and balance sheet effects:**
• **Stock dividend** — increases shares outstanding, no change to total equity (just shifts from retained earnings to common stock)
• **Cash dividend** — reduces cash (asset) and retained earnings (equity)
• **Stock split** — increases shares, decreases par value per share, no change to total equity
• **Share buyback (treasury stock)** — reduces cash and equity

**Working Capital** = Current Assets − Current Liabilities

**Exam tip:** The accounting equation ALWAYS balances. Stock dividends and stock splits do NOT change total shareholders' equity.`
          },
          {
            heading: "Income Statement & Cash Flows",
            body: `**Income Statement (Profit & Loss):** Shows revenue and expenses over a PERIOD of time.

Revenue (sales)
− Cost of Goods Sold (COGS)
= Gross Profit
− Operating Expenses (SGA, depreciation)
= Operating Income (EBIT)
− Interest Expense
= Pre-tax Income (EBT)
− Taxes
= Net Income

**Key items:**
• Revenue = total sales
• EBIT = earnings before interest and taxes
• Net Income = "bottom line" — what's available to shareholders
• EPS = Net Income ÷ Shares Outstanding (after preferred dividends)
• Depreciation is a non-cash expense (reduces taxes without cash outflow)

**Statement of Cash Flows:** Shows how cash moves in and out.
**Three sections:**
1. **Operating activities** — day-to-day business (most important section)
2. **Investing activities** — buying/selling assets, acquisitions
3. **Financing activities** — issuing stock, paying dividends, borrowing/repaying debt

**Exam tip:** Depreciation is added back in operating cash flows because it's non-cash. The income statement shows profitability; cash flow shows actual cash generation.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Financial Statements", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+financial+statements", type: "video" },
        ]
      },
      {
        id: "7.2",
        title: "SEC Reporting",
        los: [
          { code: "7.e", title: "Distinguish between the different forms used in SEC reporting" },
        ],
        content: [
          {
            heading: "SEC Filing Requirements",
            body: `Publicly traded companies must file regular reports with the SEC.

**Key SEC forms:**
• **10-K** — Annual report (audited financial statements). Most comprehensive. Filed within 60 days (large accelerated filers) to 90 days of fiscal year end.
• **10-Q** — Quarterly report (unaudited). Filed within 40-45 days of quarter end. Three per year (Q1, Q2, Q3; 10-K covers Q4).
• **8-K** — Current report for MATERIAL events (unscheduled). Must file within 4 business days. Examples: bankruptcy, merger, change of auditor, director resignation.
• **Proxy statement (DEF 14A)** — sent to shareholders before annual meeting. Contains info on board elections, executive compensation, shareholder proposals.
• **Form 144** — filed by insiders/affiliates before selling restricted or control stock.
• **Schedule 13D** — filed when acquiring >5% of a company's shares (beneficial ownership report). Filed within 10 days.

**Insider reporting (Section 16):**
• Officers, directors, and 10%+ shareholders are "insiders"
• Must report transactions on Form 4 within 2 business days
• Short-swing profits rule — profits from buy/sell (or sell/buy) within 6 months must be returned to the company

**Exam tip:** Know the difference between 10-K (annual/audited), 10-Q (quarterly/unaudited), and 8-K (material events/immediate). The short-swing profit rule applies to insiders with a 6-month window.`
          }
        ],
        resources: [
          { label: "Test Geek — SEC Filings Explained", url: "https://www.youtube.com/results?search_query=test+geek+series+65+SEC+filings+10K+10Q", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 8 — SECURITIES REGULATION
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit8",
    number: 8,
    title: "Regulation of Securities and Issuers",
    examQuestions: "~2 questions",
    lessons: [
      {
        id: "8.1",
        title: "Securities Definition & Exempt Securities",
        los: [
          { code: "8.a", title: "Identify instruments defined as securities under the Uniform Securities Act" },
          { code: "8.b", title: "Identify those who issue securities" },
          { code: "8.c", title: "Recognize securities exempt from registration under the USA and Securities Act of 1933" },
          { code: "8.d", title: "Recall exempt transactions under the USA and Securities Act of 1933" },
        ],
        content: [
          {
            heading: "What Is a Security?",
            body: `The Uniform Securities Act (USA) uses a broad definition. A security includes: stocks, bonds, debentures, notes, warrants, options, investment contracts, limited partnership interests, variable annuities.

**NOT securities:** Fixed annuities, whole life insurance, term life insurance, bank CDs, collectibles, commodities (the physical asset), precious metals (physical), real estate (direct ownership)

**The Howey Test (investment contracts):**
An instrument is a security if there is:
1. Investment of money
2. In a common enterprise
3. With expectation of profits
4. Derived primarily from the efforts of others

**Issuers:** Any person (company, government, municipality) that issues or proposes to issue securities.
• The issuer in an IPO is the company selling shares
• An issuer is NEVER a broker-dealer for its own securities

**Exempt securities (exempt from state registration, NOT from antifraud provisions):**
• U.S. government and agency securities
• Municipal bonds
• Bank and S&L securities
• Securities of regulated public utilities
• Securities listed on national exchanges (federal covered)
• Investment company securities registered under 1940 Act (federal covered)

**Exam tip:** Exempt from registration does NOT mean exempt from fraud provisions. Antifraud rules apply to ALL securities.`
          },
          {
            heading: "Exempt Transactions & Registration Methods",
            body: `**Exempt transactions (the transaction is exempt, not the security):**
• Isolated non-issuer transactions (ordinary secondary market trades)
• Transactions between issuers and underwriters
• Unsolicited orders (customer initiates without any solicitation)
• Private placements (limited offers to ≤10 non-institutional offerees in 12 months, no commissions, no general solicitation)
• Fiduciary transactions (by executors, administrators, trustees)
• Institutional investor transactions

**Federal exempt transactions (Securities Act of 1933):**
• Regulation D — private placements (Rule 504, 506(b), 506(c))
  → Rule 506(b): unlimited $ raised, up to 35 non-accredited (must be sophisticated), no general solicitation
  → Rule 506(c): unlimited $ raised, ALL investors must be accredited, general solicitation allowed
• Regulation A (Reg A+) — "mini-registration" for smaller offerings up to $75 million
• Rule 147 — intrastate offering exemption (offered and sold to residents of one state only)

**State registration methods (under USA):**
• **Coordination** — filed simultaneously with SEC registration (most common for IPOs)
• **Qualification** — state-only registration (most extensive review). Administrator can require escrow of proceeds.
• **Notice filing** — federal covered securities just file notice and pay fee to state (no state review)

**Exam tip:** Private placements under Rule 506(b) allow up to 35 non-accredited investors. Under 506(c), ALL must be accredited but general solicitation is permitted.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Securities Regulation", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+securities+regulation+USA", type: "video" },
          { label: "The Geek & The Guru — Laws & Regulations", url: "https://www.youtube.com/results?search_query=geek+guru+series+65+podcast+laws+regulations", type: "podcast" },
        ]
      },
      {
        id: "8.2",
        title: "Registration & Antifraud",
        los: [
          { code: "8.e", title: "Recollect the procedures for registering nonexempt securities under the Securities Act of 1933" },
          { code: "8.f", title: "Recollect the procedures for registering nonexempt securities under the USA" },
          { code: "8.g", title: "Identify the methods of state registration including antifraud provisions" },
        ],
        content: [
          {
            heading: "Federal & State Registration of Securities",
            body: `**Federal registration (Securities Act of 1933):**
• New issues must file a registration statement with the SEC
• Includes a prospectus — must be delivered to buyers BEFORE or AT time of sale
• 20-day cooling-off period after filing (SEC reviews)
• During cooling-off: preliminary prospectus ("red herring") may be distributed — NO sales, NO orders accepted
• SEC does NOT approve or disapprove the merits of the offering
• SEC only ensures adequate disclosure

**State registration methods:**
**Coordination** — used when also registering with SEC
• Effective when federal registration becomes effective
• Must file copies of federal registration with state

**Qualification** — state-only review
• Most detailed — Administrator reviews merits
• Administrator may impose conditions (escrow of proceeds, impound)
• Used for offerings not registered federally

**Notice filing** — for federal covered securities
• Just file notice and pay fee — no substantive state review
• Applies to: NYSE/NASDAQ-listed securities, investment company securities

**Antifraud provisions of the USA:**
• Apply to ALL securities (exempt or not) and ALL transactions (exempt or not)
• It is unlawful to:
  → Make untrue statements of material fact
  → Omit material facts that make statements misleading
  → Engage in any practice that operates as a fraud or deceit
• There are NO exemptions from antifraud provisions

**Exam tip:** The antifraud provisions are UNIVERSAL — they apply even to exempt securities and exempt transactions. The SEC does NOT approve or disapprove securities — only reviews disclosure.`
          }
        ],
        resources: [
          { label: "Test Geek — Registration Methods", url: "https://www.youtube.com/results?search_query=test+geek+series+65+registration+coordination+qualification", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 9 — INVESTMENT ADVISERS
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit9",
    number: 9,
    title: "Regulation of Investment Advisers",
    examQuestions: "~6 questions",
    lessons: [
      {
        id: "9.1",
        title: "Investment Adviser Definition & Registration",
        los: [
          { code: "9.a", title: "Define investment adviser, including SEC Release IA-1092" },
          { code: "9.b", title: "Identify exclusions and exemptions under the IAA of 1940 and the USA" },
          { code: "9.c", title: "Identify exempt reporting adviser and private fund adviser exemptions" },
          { code: "9.d", title: "Recall the effects of the Dodd-Frank Act on registration" },
        ],
        content: [
          {
            heading: "Who Is an Investment Adviser?",
            body: `Under the USA and the Investment Advisers Act of 1940, a person is an investment adviser if they meet the ABC test:

**A** — provides **Advice** about securities
**B** — is in the **Business** of providing such advice (not just occasional)
**C** — receives **Compensation** (any economic benefit, not just fees)

If ALL THREE elements are present → must register as an IA (unless excluded or exempt).

**SEC Release IA-1092:** Clarified that financial planners, pension consultants, and sports/entertainment managers who provide investment advice are IAs and must register. Even if advice is incidental to their main business, if they hold themselves out as providing investment advice AND receive compensation, they are IAs.

**Exclusions from IA definition (NOT investment advisers):**
• Banks and bank holding companies (but NOT bank subsidiaries)
• Lawyers, accountants, teachers, engineers — IF advice is incidental to their profession and they receive no special compensation for it ("LATE" exclusion)
• Broker-dealers — IF advice is solely incidental to their brokerage business and they receive no special compensation
• Publishers of general circulation publications (bona fide)
• Federal covered advisers (excluded from STATE definition, but registered federally)

**Exam tip:** The LATE exclusion (lawyers, accountants, teachers, engineers) only applies if advice is truly INCIDENTAL. Once they hold themselves out as IAs or charge separately for advice, the exclusion is lost.`
          },
          {
            heading: "Registration & Dodd-Frank Thresholds",
            body: `**Dodd-Frank Act registration thresholds (AUM-based):**
• Under $100 million AUM → register with the STATE
• $100-110 million AUM → may register with STATE or SEC (no-man's land)
• Over $110 million AUM → must register with the SEC ("federal covered adviser")

**Exceptions — must register with SEC regardless of AUM:**
• Advisers to registered investment companies
• Advisers with clients in 15+ states (multi-state adviser)
• Pension consultants with $200M+ AUM
• Internet advisers (operate exclusively through the internet)

**Exempt Reporting Advisers (ERAs):**
• Venture capital fund advisers
• Private fund advisers with <$150 million AUM in the U.S.
• Subject to SEC reporting requirements but NOT full registration
• Must file abbreviated Form ADV with the SEC

**Form ADV — the registration form:**
• **Part 1** — organizational info, business practices, disciplinary history. Filed by state-registered advisers only (via IARD).
• **Part 2A** — the "brochure" (narrative disclosure to clients). Filed by BOTH state- and SEC-registered advisers. Must be delivered to clients within 120 days of fiscal year end (or a brochure summary showing material changes).
• **Part 2B** — the "brochure supplement" (info about specific advisory personnel). State-registered advisers file both Parts 2A and 2B; SEC-registered advisers file only Part 2A and keep Part 2B readily available in their files.
• Filed through the Investment Adviser Registration Depository (IARD)
• Note: Must use full term "investment adviser" — never abbreviate to "RIA" on business cards

**Exam tip:** The $100M/$110M thresholds from Dodd-Frank are heavily tested. Remember: $100M = minimum for SEC consideration; $110M = mandatory SEC registration.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Investment Adviser Registration", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+investment+adviser+registration", type: "video" },
          { label: "The Geek & The Guru — IA Regulation", url: "https://www.youtube.com/results?search_query=geek+guru+series+65+podcast+investment+adviser", type: "podcast" },
        ]
      },
      {
        id: "9.2",
        title: "IA Financial Requirements, Records & Supervision",
        los: [
          { code: "9.e", title: "Identify the registration process for an investment adviser" },
          { code: "9.f", title: "Recognize the financial requirements to register as an investment adviser" },
          { code: "9.g", title: "Recall investment adviser books and recordkeeping requirements" },
          { code: "9.h", title: "Recognize that IARs must be adequately supervised" },
        ],
        content: [
          {
            heading: "Financial Requirements & Recordkeeping",
            body: `**Financial requirements for state-registered IAs:**
• **Custody of client funds/securities** → minimum net worth of $35,000
• **Discretionary authority (no custody)** → minimum net worth of $10,000
• **No custody, no discretion** → no minimum net worth
• If net worth falls below minimum → must notify the Administrator
• Posting a surety bond is an ALTERNATIVE to meeting net worth requirements

**Net capital for federal IAs:**
• IAs with custody → must maintain minimum net worth and comply with surprise audit requirements
• Qualified custodian must hold client assets

**Recordkeeping requirements:**
• All books and records must be maintained for 5 years
• First 2 years must be in the principal office
• Records include: client agreements, advertising, correspondence, trade records
• Subject to inspection by the Administrator or SEC
• Electronic records are acceptable

**Supervision of IARs:**
• IAs must establish, maintain, and enforce written supervisory procedures
• Designated supervisor must be competent and knowledgeable
• IA is responsible for the actions of its IARs
• Must have compliance officer
• Annual review of policies and procedures

**Exam tip:** Custody = $35K net worth. Discretion = $10K. The 5-year recordkeeping rule with 2 years in principal office is frequently tested.`
          }
        ],
        resources: [
          { label: "Test Geek — IA Net Worth Requirements", url: "https://www.youtube.com/results?search_query=test+geek+series+65+investment+adviser+net+worth+requirements", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 10 — INVESTMENT ADVISER REPRESENTATIVES
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit10",
    number: 10,
    title: "Regulation of Investment Adviser Representatives",
    examQuestions: "~4 questions",
    lessons: [
      {
        id: "10.1",
        title: "IAR Definition, Registration & Activities",
        los: [
          { code: "10.a", title: "Define an investment adviser representative" },
          { code: "10.b", title: "Identify exclusions and exemptions from IAR definition under the USA" },
          { code: "10.c", title: "Describe the IAR registration process and business activities" },
        ],
        content: [
          {
            heading: "Investment Adviser Representatives (IARs)",
            body: `An IAR is any individual who, on behalf of an investment adviser:
• Makes investment recommendations or gives investment advice
• Manages client accounts or portfolios
• Determines which recommendation or advice should be given
• Solicits or refers potential advisory clients (for compensation)
• Supervises employees who do any of the above

**Who is NOT an IAR:**
• Individuals who perform only clerical or ministerial functions
• Persons who provide advice solely about securities that are NOT securities (e.g., real estate, insurance products that are not securities)

**IAR Registration:**
• IARs register in the STATE where they have an office or where clients are located
• IARs of federal covered advisers register in the state where they have a PLACE OF BUSINESS
• If an IAR of a federal covered IA has no place of business in a state, they generally don't need to register there (de minimis: serving ≤5 clients in 12 months without a place of business)
• Registration is through the IARD (Investment Adviser Registration Depository)
• Form U4 — used for IAR registration
• Must pass qualifying exam (Series 65 or Series 66 + Series 7)

**Post-registration requirements:**
• Annual renewal (December 31 expiration)
• Form U5 — filed when IAR terminates employment
• Must update Form U4 promptly (within 30 days for most changes)

**IAR Continuing Education (NEW REQUIREMENT):**
• 12 hours of CE credit required annually
• 6 hours — products and practices
• 6 hours — ethics and professional responsibility
• FINRA CE Regulatory Element may satisfy products/practices requirement
• Professional designations (CFP, ChFC, CFA, PFS, CIC) may satisfy ethics requirement
• Must use NASAA-approved course providers
• Reporting fee: $3 per credit hour ($36/year max)

**Exam tip:** IARs always register with the STATE, even if their IA is federally registered. The de minimis exemption (5 or fewer clients, no place of business in the state) is a key exception.`
          }
        ],
        resources: [
          { label: "Dean Tinney — IARs Explained", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+investment+adviser+representative", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 11 — BROKER-DEALERS AND AGENTS
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit11",
    number: 11,
    title: "Regulation of Broker-Dealers and Agents",
    examQuestions: "~4 questions",
    lessons: [
      {
        id: "11.1",
        title: "Broker-Dealers & Agents",
        los: [
          { code: "11.a", title: "Define a broker-dealer" },
          { code: "11.b", title: "Identify BD exclusions and exemptions under the 1934 Act and the USA" },
          { code: "11.c", title: "Define an agent" },
          { code: "11.d", title: "Identify agent exclusions and exemptions under the USA" },
          { code: "11.e", title: "Describe BD registration requirements" },
          { code: "11.f", title: "Describe agent registration requirements" },
        ],
        content: [
          {
            heading: "Broker-Dealers",
            body: `A **broker-dealer (BD)** is any person in the business of effecting securities transactions for others (broker) or for its own account (dealer).

**BD Exclusions (NOT broker-dealers under the USA):**
• Agents (individuals) acting on behalf of a BD
• Issuers (unless regularly engaged in the business)
• Banks, savings institutions, trust companies (but NOT their employees who sell securities)

**BD Exemptions from state registration:**
• BDs with no office in the state that deal exclusively with other BDs or institutional clients
• BDs with no office in the state whose only clients are existing customers who are temporarily in the state
• BDs registered in Canada that limit activities to Canadian clients temporarily in the state

**BD Registration:**
• Must register in every state where they have an office or conduct business
• File through CRD (Central Registration Depository)
• Must designate a principal or supervisor
• Registration effective until December 31 of the year
• Cannot be registered simultaneously as an agent`
          },
          {
            heading: "Agents",
            body: `An **agent** is any individual (natural person) who represents a broker-dealer or issuer in effecting or attempting to effect securities transactions.

**Who is NOT an agent:**
• An individual representing an issuer in transactions involving exempt securities (e.g., government bonds)
• An individual representing an issuer in exempt transactions
• An individual who represents an issuer in transactions with employees (employee benefit plans), IF no commissions are paid
• Individuals performing only clerical or administrative functions

**Agent Registration:**
• An agent CANNOT register independently — must be associated with a BD or issuer
• Registers through Form U4 via CRD
• Can only represent ONE broker-dealer at a time (exception: private securities transactions with written permission)
• Registration effective until December 31
• When agent terminates from a BD, both must notify the Administrator

**Key rules for agents:**
• Cannot share commissions with non-registered persons
• Cannot borrow from or lend to clients
• Cannot have discretionary authority without written authorization
• Subject to supervision by the BD

**Exam tip:** Agents are always INDIVIDUALS (natural persons), never firms. A BD is the firm. An agent can only represent one BD at a time.`
          }
        ],
        resources: [
          { label: "Dean Tinney — BDs and Agents", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+broker+dealer+agent", type: "video" },
          { label: "Test Geek — Registration Requirements", url: "https://www.youtube.com/results?search_query=test+geek+series+65+broker+dealer+registration", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 12 — THE ADMINISTRATOR
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit12",
    number: 12,
    title: "The State Securities Administrator",
    examQuestions: "~2 questions",
    lessons: [
      {
        id: "12.1",
        title: "Administrator Powers & Remedies",
        los: [
          { code: "12.a", title: "Recognize the jurisdiction and authority of the state securities Administrator" },
          { code: "12.b", title: "Identify administrative actions that may be taken" },
          { code: "12.c", title: "Recall reasons to deny, suspend, revoke, or cancel registrations" },
          { code: "12.d", title: "Describe civil rights of recovery" },
          { code: "12.e", title: "Identify civil and criminal liability and penalties" },
        ],
        content: [
          {
            heading: "Administrator Authority",
            body: `The state securities Administrator enforces state securities laws (the Uniform Securities Act).

**Jurisdiction:**
• Over any securities transaction where an offer originates in OR is directed to the state
• An offer is made in the state if it ORIGINATES from or is RECEIVED in the state
• The Administrator CANNOT issue an injunction — must go to court for that
• The Administrator CAN issue cease and desist orders without a hearing (summary orders)

**Administrative actions:**
• **Deny** — refuse initial registration
• **Suspend** — temporarily halt a registration
• **Revoke** — permanently terminate a registration
• **Cancel** — terminate because person can't be found, is deceased, or is mentally incompetent, or the firm has ceased to exist
• **Withdraw** — voluntary (initiated by the registrant, not the Administrator). Becomes effective 30 days after filing.

**Grounds for denial/suspension/revocation:**
• Conviction of a felony (securities or money-related) in last 10 years
• Willful violations of the USA
• Being subject to SEC or SRO order
• Insolvency (not just temporary financial difficulty)
• Lack of qualification or training
• Filing incomplete or misleading registration documents
• NOT being charged with a crime (must be convicted)
• NOT: lack of experience alone (for agents and IARs)

**Exam tip:** The Administrator can CANCEL (administrative clean-up) or REVOKE (punishment). Cancellation is not punitive — it's for things like death or disappearance.`
          },
          {
            heading: "Civil & Criminal Liability",
            body: `**Civil liability (private right of action):**
• A person who buys a security in violation of the USA can sue to recover:
  → Purchase price + interest + court costs + attorney fees, MINUS any income received on the security
• Statute of limitations: earlier of 3 years from sale OR 2 years from discovery of the violation
• Persons who sell unregistered, nonexempt securities are liable
• Persons who violate antifraud provisions are liable
• Control persons (supervisors) are jointly and severally liable unless they can prove they didn't know and couldn't reasonably have known

**Criminal penalties:**
• Fine up to $5,000 and/or imprisonment up to 3 years (per violation)
• Statute of limitations: 5 years from the violation
• The Administrator does NOT bring criminal charges — refers to the state attorney general or local prosecutor
• "No person may be imprisoned for a violation if they prove they had no knowledge of the rule or order"

**Exam tip:** Civil = 3 years from sale or 2 years from discovery. Criminal = 5 years, max $5,000 fine and/or 3 years imprisonment. The Administrator CANNOT bring criminal charges — only the attorney general can.`
          }
        ],
        resources: [
          { label: "Dean Tinney — The Administrator", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+administrator+powers", type: "video" },
          { label: "The Geek & The Guru — Regulatory Powers", url: "https://www.youtube.com/results?search_query=geek+guru+series+65+podcast+administrator", type: "podcast" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 13 — COMMUNICATION WITH CLIENTS & PROSPECTS
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit13",
    number: 13,
    title: "Communication with Clients and Prospects",
    examQuestions: "~10 questions",
    lessons: [
      {
        id: "13.1",
        title: "Disclosure Requirements",
        los: [
          { code: "13.a", title: "Identify disclosures to clients and prospects by BDs and IAs" },
          { code: "13.b", title: "Recognize general disclosure requirements" },
          { code: "13.c", title: "Indicate unlawful representations concerning registrations" },
          { code: "13.d", title: "Recall restrictions on performance guarantees" },
        ],
        content: [
          {
            heading: "Disclosure & Prohibited Representations",
            body: `**General disclosure requirements:**
• Must disclose ALL material facts (anything a reasonable investor would want to know)
• Must disclose conflicts of interest
• Must disclose compensation arrangements
• Must disclose disciplinary history
• Cannot omit material information that makes other statements misleading

**Unlawful representations about registration:**
• CANNOT imply that registration means the Administrator has approved, recommended, or endorsed the person or the security
• Registration means ONLY that the person has met the legal requirements — it does NOT indicate competence or approval
• Saying "I'm state-approved" or "the Administrator recommends me" is a VIOLATION

**Performance guarantees are PROHIBITED:**
• Cannot guarantee against loss
• Cannot promise specific returns
• Cannot guarantee performance outcomes
• EXCEPTION: Guaranteeing the return of a fixed income security at maturity is NOT a performance guarantee (it's a feature of the bond)

**Regulation Best Interest (Reg BI) — applies to broker-dealers (NEW EXAM FOCUS):**
• When making a recommendation to a retail customer, BDs must act in the customer's BEST INTEREST
• Four core obligations: Disclosure, Care, Conflicts of Interest, Compliance
• Form CRS — 2-page relationship summary required for all retail customers
• Retail customer = natural person using recommendations for personal purposes
• BDs cannot prioritize firm interests over customer interests
• Note: IAs follow a FIDUCIARY standard (higher than Reg BI)

**What must be disclosed to advisory clients:**
• Compensation method and conflicts of interest
• Disciplinary events
• Other business activities that might create conflicts
• Financial condition issues that might impair ability to meet obligations
• Participation or interest in client transactions
• Agency cross transactions

**Exam tip:** This is the HIGHEST-WEIGHTED unit on the exam (~10 questions). Focus on what must be disclosed and what representations are prohibited. Registration ≠ approval.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Disclosures & Communications", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+disclosure+requirements", type: "video" },
          { label: "The Geek & The Guru — Ethics Episode", url: "https://www.youtube.com/results?search_query=geek+guru+series+65+podcast+ethics+compliance", type: "podcast" },
        ]
      },
      {
        id: "13.2",
        title: "Advisory Contracts, Brochures & Advertising",
        los: [
          { code: "13.e", title: "Identify the required elements of the investment advisory contract" },
          { code: "13.f", title: "Recall the contents of the investment adviser's brochure including wrap fees" },
          { code: "13.g", title: "Compare state and federal brochure delivery requirements" },
          { code: "13.h", title: "Describe proper use of social media" },
          { code: "13.i", title: "Recognize differences between BD and IA advertising" },
        ],
        content: [
          {
            heading: "Advisory Contracts",
            body: `**Required elements of an advisory contract:**
• Description of services to be provided
• Compensation method and amount
• Duration of the agreement and termination provisions
• No assignment without client consent
• Statement that IA will not be compensated based on capital gains (performance fees prohibited for most clients)
• Disclosure of conflicts of interest

**Performance-based fees (performance fees):**
• Generally prohibited for retail clients
• EXCEPTION: Allowed for "qualified clients" — net worth >$2.2 million OR >$1.1 million under management
• Must use a fulcrum fee (symmetrical — fee increases and decreases equally around a benchmark)

**Advisory contract cannot:**
• Waive compliance with the USA or federal law
• Include provisions that limit liability for willful violations`
          },
          {
            heading: "Brochure Delivery & Advertising",
            body: `**Brochure (Form ADV Part 2A) delivery requirements:**
• Must be delivered to prospective clients NOT LESS than 48 hours before entering into the advisory contract, OR at the time of entering the contract IF client has 5 business days to terminate without penalty
• Annual: must deliver updated brochure or summary of material changes within 120 days of fiscal year-end
• Must offer to deliver the brochure annually

**Wrap fee programs:**
• Clients pay a single fee for advice + brokerage services combined
• Separate brochure (Appendix 1 of Form ADV Part 2A) required
• Must disclose that the wrapped fee may cost more than paying separately

**Social media rules:**
• Same rules apply to social media as other communications
• Must be fair, balanced, and not misleading
• Testimonials: SEC Marketing Rule now permits testimonials and endorsements WITH required disclosures
• Must be archived and retained

**BD vs. IA advertising:**
• BDs regulated by FINRA rules
• IAs regulated by SEC Marketing Rule (or state equivalent)
• Both: must be truthful, not misleading, fair and balanced
• IAs: can now use testimonials, endorsements, and third-party ratings with proper disclosures
• BDs: subject to FINRA pre-approval for certain communications

**Exam tip:** The 48-hour rule vs. 5-day rescission is critical. Performance fees are only for qualified clients. Wrap fee programs need their own brochure.`
          }
        ],
        resources: [
          { label: "Test Geek — Advisory Contracts & Brochures", url: "https://www.youtube.com/results?search_query=test+geek+series+65+advisory+contract+brochure+ADV", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 14 — ETHICAL PRACTICES & FIDUCIARY OBLIGATIONS
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit14",
    number: 14,
    title: "Ethical Practices and Fiduciary Obligations",
    examQuestions: "~11 questions",
    lessons: [
      {
        id: "14.1",
        title: "Fiduciary Duty & Prudent Investor Rule",
        los: [
          { code: "14.a", title: "Identify important fiduciary responsibilities" },
          { code: "14.b", title: "Describe how the Prudent Investor Rule applies" },
          { code: "14.c", title: "Recall what constitutes IA compensation including solicitors" },
          { code: "14.d", title: "Recognize how brokerage relationships affect compensation" },
        ],
        content: [
          {
            heading: "Fiduciary Duty",
            body: `Investment advisers owe a FIDUCIARY duty to their clients — the highest standard of care.

**Core fiduciary obligations:**
• **Duty of loyalty** — put client interests first, avoid conflicts or fully disclose them
• **Duty of care** — provide advice that is suitable and in the client's best interest
• **Duty of good faith** — act honestly, no deception
• Must disclose all material conflicts of interest
• Cannot favor one client over another (must treat all fairly)

**Prudent Investor Rule (modern standard):**
• Evaluate the ENTIRE PORTFOLIO, not each investment in isolation
• Diversification is required unless there are special circumstances
• Risk and return should be evaluated together
• The standard is what a prudent INVESTOR (not a prudent person) would do
• No investment is per se imprudent — context matters
• Delegation to qualified professionals is permitted (must monitor)

**IA Compensation:**
• Fees (asset-based, hourly, flat, performance-based for qualified clients)
• Commissions (if also registered as BD)
• Any economic benefit = compensation (soft dollars, referral fees, etc.)

**Solicitors:**
• Third parties paid to refer clients to the IA
• Must have a written solicitor agreement
• Solicitor must give client: IA brochure + separate solicitor disclosure document
• Solicitor cannot have disciplinary history
• The IA is responsible for the solicitor's activities

**Exam tip:** This is the HIGHEST-WEIGHTED unit. The fiduciary duty applies to ALL investment advisers and IARs. Know the prudent investor rule — it's about the whole portfolio, not individual investments.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Fiduciary Duty", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+fiduciary+duty+ethics", type: "video" },
          { label: "The Geek & The Guru — Ethics Deep Dive", url: "https://www.youtube.com/results?search_query=geek+guru+series+65+podcast+fiduciary+ethics", type: "podcast" },
        ]
      },
      {
        id: "14.2",
        title: "Custody, Discretion & Unethical Practices",
        los: [
          { code: "14.e", title: "Identify requirements for keeping custody of client funds" },
          { code: "14.f", title: "Recall rules on maintaining discretion and BSA compliance" },
          { code: "14.g", title: "Identify NASAA Model Rule on Unethical Business Practices" },
          { code: "14.h", title: "Identify reporting required of investment advisers" },
          { code: "14.i", title: "Recognize NASAA Statement on Dishonest Practices of BDs and Agents" },
        ],
        content: [
          {
            heading: "Custody & Discretion",
            body: `**Custody (holding client assets):**
• IA has custody if it holds, directly or indirectly, client funds or securities
• OR has any authority to obtain possession of client assets
• Custody includes: possession of client login credentials, authority to withdraw fees directly from accounts, acting as trustee

**Custody requirements:**
• Must use a qualified custodian (bank, BD, trust company)
• Must notify the Administrator that it has custody
• Client must receive account statements from the qualified custodian at least quarterly
• Annual surprise examination by an independent public accountant
• Minimum net worth of $35,000 (state-registered IAs)

**Discretion:**
• IA has discretion when it can decide WHAT to buy/sell, HOW MUCH, and WHEN — without getting prior client approval for each trade
• Requires written authorization from the client (limited power of attorney)
• IA choosing only the PRICE or TIME of execution is NOT discretion (if client specified the security and amount)
• Minimum net worth of $10,000 (state-registered IAs with no custody)

**Bank Secrecy Act (BSA) compliance:**
• Anti-money laundering (AML) requirements
• Customer Identification Program (CIP)
• Suspicious Activity Reports (SARs) — file if suspicious activity >$5,000
• Currency Transaction Reports (CTRs) — file for cash transactions >$10,000

**Exam tip:** Discretion over WHAT to buy = discretion requiring written authorization. Discretion over only WHEN or at what PRICE = NOT discretion for registration purposes.`
          },
          {
            heading: "Unethical Practices & Criminal Activity",
            body: `**NASAA Model Rule — Unethical IA/IAR practices include:**
• Recommending securities without reasonable basis (unsuitable)
• Exercising discretion without written authorization
• Charging unreasonable fees
• Failing to disclose conflicts of interest
• Guaranteeing against loss
• Borrowing from or lending to clients
• Misrepresenting qualifications
• Failing to maintain proper records
• Churning accounts (excessive trading for commissions)
• Front-running (trading ahead of client orders)
• Cherry-picking (allocating profitable trades to favored accounts)

**NASAA Statement on BD/Agent dishonest practices:**
• Trading in excessive size or frequency (churning)
• Recommending unsuitable securities
• Selling away (private securities transactions without BD approval)
• Sharing in client accounts improperly
• Unauthorized transactions
• Making guarantees
• Failing to follow customer instructions

**Criminal activities applicable to all securities professionals:**
• Insider trading
• Market manipulation
• Ponzi schemes
• Front-running
• Money laundering
• Embezzlement

**Business continuity plan (BCP):**
• All IAs and BDs must maintain an adequate BCP
• Must address: data backup, alternate communication, critical systems, regulatory reporting
• Must be reviewed and updated regularly

**Protection of Vulnerable Adults (NEW EXAM TOPIC):**
• Securities professionals may disclose suspected mental decline to regulatory authority or Adult Protective Services (APS)
• CANNOT disclose to family, lawyer, or accountant without prior trusted contact designation
• Temporary hold on disbursements: 15 business days (extendable to 25 if APS/state requests)
• Trusted contact person CANNOT trade in the account (not the same as power of attorney)

**Cybersecurity:**
• Must protect client PII (personally identifiable information)
• Written cybersecurity policies required
• Must address: data encryption, access controls, incident response, employee training

**Exam tip:** Borrowing from or lending to clients is ALWAYS unethical. Churning, front-running, and cherry-picking are the three most commonly tested unethical trading practices.`
          }
        ],
        resources: [
          { label: "Test Geek — Custody & Discretion Rules", url: "https://www.youtube.com/results?search_query=test+geek+series+65+custody+discretion+ethics", type: "video" },
        ]
      },
      {
        id: "14.3",
        title: "Financial Institutions & Selling Practices",
        los: [
          { code: "14.j", title: "Identify requirements when selling securities on premises of financial institutions" },
          { code: "14.k", title: "Recognize potential criminal activities" },
          { code: "14.l", title: "Recognize cybersecurity, privacy, and data protection requirements" },
          { code: "14.m", title: "Recall what constitutes an adequate business continuity plan" },
        ],
        content: [
          {
            heading: "Sales on Bank Premises & Compliance",
            body: `**Selling securities on bank premises:**
• Must clearly separate securities activities from banking activities
• Must disclose that securities are:
  → NOT insured by FDIC
  → NOT deposits or obligations of the bank
  → NOT guaranteed by the bank
  → Subject to investment risk including loss of principal
• Must use separate physical location or clear signage
• Must ensure customers understand they're dealing with the BD, not the bank

**Reporting requirements for IAs:**
• Must file Form ADV amendments promptly (within 30 days for most changes)
• Annual updating amendment due within 90 days of fiscal year end
• Must deliver updated brochure or summary of material changes to clients within 120 days of fiscal year end
• Must report financial condition changes that might impair ability to meet obligations
• Privacy notices required under Regulation S-P (Gramm-Leach-Bliley)

**Regulation S-P (Privacy):**
• Must provide initial privacy notice to new clients at account opening
• Must provide annual privacy notice if sharing info with non-affiliated third parties
• Client can opt out of sharing with non-affiliated third parties
• Sharing with affiliates: different rules (client can opt out under Fair Credit Reporting Act)

**Exam tip:** The four-part disclosure for bank premise sales is frequently tested. FDIC does NOT cover securities — this is the key point the customer must understand.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Compliance & Ethics", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+compliance+bank+premises", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 15 — INCOME TAX CONSIDERATIONS
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit15",
    number: 15,
    title: "Income Tax Considerations",
    examQuestions: "~2 questions",
    lessons: [
      {
        id: "15.1",
        title: "Tax Fundamentals",
        los: [
          { code: "15.a", title: "Recognize income tax fundamentals for individuals" },
          { code: "15.b", title: "Identify the different sources of income and loss" },
          { code: "15.c", title: "Distinguish between income and capital gains and how they are taxed" },
          { code: "15.d", title: "Recall preference items included in the AMT computation" },
        ],
        content: [
          {
            heading: "Income Types & Taxation",
            body: `**Three categories of income/loss:**
1. **Active (earned) income** — wages, salaries, tips, self-employment income
2. **Passive income** — rental income, limited partnership income (DPPs)
3. **Portfolio income** — dividends, interest, capital gains

**Critical rule:** Passive losses can ONLY offset passive income. They CANNOT offset active or portfolio income.

**Capital gains taxation:**
• **Short-term capital gains** — assets held ≤1 year, taxed as ordinary income (highest rate)
• **Long-term capital gains** — assets held >1 year, taxed at preferential rates (0%, 15%, or 20% depending on tax bracket)
• **Wash sale rule** — if you sell a security at a loss and buy a substantially identical security within 30 days before or after, the loss is disallowed
• Net capital losses can offset up to $3,000 of ordinary income per year; excess carries forward

**Dividend taxation:**
• **Qualified dividends** — taxed at LTCG rates (0%, 15%, 20%). Must meet holding period (>60 days around ex-dividend date). Most common stock dividends qualify.
• **Nonqualified (ordinary) dividends** — taxed as ordinary income. Includes REIT dividends.

**Cost basis methods:**
• FIFO (First In, First Out) — default method
• Specific identification — choose which shares to sell (for tax optimization)
• Average cost — common for mutual funds

**Alternative Minimum Tax (AMT):**
Parallel tax system to ensure high-income taxpayers pay a minimum level of tax.
**AMT preference items include:**
• Exercising incentive stock options (ISOs) — the bargain element
• Tax-exempt interest from private activity municipal bonds
• Accelerated depreciation differences
• Percentage depletion

**Exam tip:** The wash sale rule (30 days) and the $3,000 capital loss deduction are highly testable. Know that LTCG rates are preferential and that the AMT catches ISO exercises.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Tax Considerations for Series 65", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+taxes+capital+gains", type: "video" },
          { label: "Test Geek — AMT and Tax Rules", url: "https://www.youtube.com/results?search_query=test+geek+series+65+alternative+minimum+tax+AMT", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 16 — CLIENT & BUSINESS ENTITIES
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit16",
    number: 16,
    title: "Clients, Business Entities, and Account Types",
    examQuestions: "~6 questions",
    lessons: [
      {
        id: "16.1",
        title: "Account Types & Business Entities",
        los: [
          { code: "16.a", title: "Recognize different types of clients, ownership categories, and legal documentation" },
          { code: "16.b", title: "Distinguish between different kinds of business entities" },
          { code: "16.c", title: "Identify the different types of business taxation" },
        ],
        content: [
          {
            heading: "Account Types & Ownership",
            body: `**Individual accounts:** Single owner, sole control

**Joint accounts:**
• **Joint Tenants with Rights of Survivorship (JTWROS)** — when one owner dies, assets pass directly to surviving owner(s). NOT part of the deceased's estate. Most common for married couples. Eligible for Transfer on Death (TOD) designation.
• **Tenants in Common (TIC)** — when one owner dies, their share goes to their estate (NOT to the other owner). Each owner can have unequal shares.
• **Community property** — only in certain states. Each spouse owns 50% of marital assets.

**Business entities:**

**Sole Proprietorship:** Single owner, unlimited liability, income on personal return (Schedule C)

**General Partnership:** All partners have unlimited liability, flow-through taxation (K-1)

**Limited Partnership:** GP has unlimited liability, LPs have limited liability, flow-through taxation

**Limited Liability Company (LLC):** Limited liability for all members, flexible taxation (can elect to be taxed as sole proprietorship, partnership, S-corp, or C-corp)

**S Corporation:** Limited liability, flow-through taxation (no double taxation), max 100 shareholders, one class of stock, all shareholders must be U.S. individuals

**C Corporation:** Limited liability, double taxation (corporate level + dividend level), unlimited shareholders, multiple classes of stock

**Exam tip:** JTWROS = survivorship (bypasses estate). TIC = goes to estate. S-corps have flow-through taxation; C-corps have double taxation.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Account Types & Entities", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+account+types+business+entities", type: "video" },
        ]
      },
      {
        id: "16.2",
        title: "Fiduciary Accounts, Trusts & Estate Planning",
        los: [
          { code: "16.d", title: "Classify special requirements for fiduciary accounts including trusts and estates" },
          { code: "16.e", title: "Describe the fundamentals of insurance and trust taxation" },
          { code: "16.f", title: "Identify estate-planning options" },
          { code: "16.g", title: "Recognize the difference between taxation of estates and gifts" },
        ],
        content: [
          {
            heading: "Trusts & Fiduciary Accounts",
            body: `**Trust basics:**
• **Grantor (settlor/trustor)** — creates the trust and transfers assets to it
• **Trustee** — manages the trust assets (fiduciary duty to beneficiaries)
• **Beneficiary** — person(s) who receive the benefits

**Types of trusts:**
• **Revocable (living) trust** — grantor can change or cancel at any time. Assets remain in grantor's estate for tax purposes. Income taxed to grantor. Avoids probate.
• **Irrevocable trust** — cannot be changed or cancelled. Assets removed from grantor's estate. Trust pays its own taxes. Provides estate tax benefits.
• **Testamentary trust** — created by a will (takes effect at death). Goes through probate.

**UGMA/UTMA (custodial accounts):**
• Uniform Gifts/Transfers to Minors Act
• Adult custodian manages assets for a minor
• Assets belong to the minor (irrevocable gift)
• Income taxed to the minor (kiddie tax may apply)
• UGMA: covers financial assets (stocks, bonds, cash)
• UTMA: broader — covers financial assets + real estate, patents, etc.
• Custodian can be removed but must be replaced
• One custodian per account, one minor per account

**Estate planning & taxation:**
• **Gift tax annual exclusion** — $19,000 per recipient per year (2026, adjusted for inflation)
• Gifts above the exclusion count against lifetime exemption
• **Estate tax** — applies to transfers at death above the lifetime exemption
• **Step-up in basis** — inherited assets receive a basis equal to FMV at date of death (eliminates unrealized gains)
• **Carry-over basis** — gifted assets retain the donor's original cost basis

**Donor Advised Funds (DAFs) — NEW EXAM TOPIC:**
• Charitable giving vehicle managed by a sponsoring organization (like a community foundation or financial institution)
• Donor gets immediate tax deduction when contributing
• Donor advises (but does not control) how funds are distributed to charities
• Irrevocable — once donated, assets belong to the sponsoring organization
• Popular for bunching charitable deductions in high-income years

**Exam tip:** Step-up in basis at death vs. carry-over basis for gifts is heavily tested. Irrevocable trusts remove assets from the estate; revocable trusts do NOT.`
          }
        ],
        resources: [
          { label: "Test Geek — Trusts & Estate Planning", url: "https://www.youtube.com/results?search_query=test+geek+series+65+trusts+estate+planning+UGMA+UTMA", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 17 — CLIENT INVESTMENT PROFILES
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit17",
    number: 17,
    title: "Client Investment Recommendations and Strategies",
    examQuestions: "~7 questions",
    lessons: [
      {
        id: "17.1",
        title: "Client Data Gathering & Suitability",
        los: [
          { code: "17.a", title: "Evaluate methods of client data gathering" },
          { code: "17.b", title: "Discover the client's risk tolerance" },
          { code: "17.c", title: "Distinguish between investment objectives and investment constraints" },
          { code: "17.d", title: "Analyze a client's financial goals for suitable recommendations" },
        ],
        content: [
          {
            heading: "Know Your Client (KYC)",
            body: `**Financial considerations:**
• Income (current and expected)
• Net worth and liquid net worth
• Tax status and bracket
• Current portfolio holdings
• Insurance coverage
• Existing liabilities (mortgage, loans, etc.)

**Nonfinancial considerations:**
• Risk tolerance (ability AND willingness to take risk)
• Time horizon (investment timeframe)
• Liquidity needs (need for quick access to cash)
• Legal restrictions (insiders, ERISA, etc.)
• Age and life stage
• Unique circumstances (concentrations, ethical preferences, etc.)

**Investment objectives (in order of risk, low to high):**
1. **Capital preservation** — protect principal (T-bills, money market, short-term bonds)
2. **Income** — generate regular cash flow (bonds, dividend stocks, REITs)
3. **Growth and income** — balanced approach (blue-chip stocks, balanced funds)
4. **Growth** — capital appreciation (growth stocks, equity funds)
5. **Aggressive growth / Speculation** — maximum return, maximum risk (options, futures, penny stocks, venture capital)

**Investment constraints:**
• **Time horizon** — longer = more risk capacity
• **Liquidity** — need for cash limits aggressive investing
• **Tax situation** — high bracket → favor munis, tax-deferred, LTCG
• **Legal/regulatory** — ERISA rules, insider trading restrictions
• **Unique needs** — ESG/SRI preferences, religious criteria, concentrated positions, government benefit implications (income-related monthly adjustment amounts for Medicare)

**ESG & Values-Based Investing (NEW EXAM FOCUS):**
• ESG = Environmental, Social, Governance factors
• SRI = Socially Responsible Investing
• Impact investing = investments targeting specific social/environmental outcomes
• Must be documented as part of the client's investment policy statement
• Religious criteria may also guide investment decisions

**Exam tip:** Risk tolerance has TWO components — ability (financial capacity) AND willingness (emotional comfort). An advisor must respect the more conservative of the two.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Suitability & Client Profiles", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+suitability+client+profile", type: "video" },
          { label: "The Geek & The Guru — Client Strategies", url: "https://www.youtube.com/results?search_query=geek+guru+series+65+podcast+client+recommendations", type: "podcast" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 18 — RETIREMENT PLANS
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit18",
    number: 18,
    title: "Retirement Plans and Education Savings",
    examQuestions: "~7 questions",
    lessons: [
      {
        id: "18.1",
        title: "IRAs and Employer Plans",
        los: [
          { code: "18.a", title: "Recall features of traditional, Roth, and SEP IRAs" },
          { code: "18.b", title: "Recognize tax treatment of distributions from IRAs" },
          { code: "18.c", title: "Differentiate between employer-sponsored qualified retirement plans" },
          { code: "18.d", title: "Identify characteristics of a 403(b) plan" },
          { code: "18.e", title: "Contrast qualified and nonqualified retirement plans" },
        ],
        content: [
          {
            heading: "Individual Retirement Accounts (IRAs)",
            body: `**Traditional IRA:**
• Contributions may be tax-deductible (depends on income and access to employer plan)
• Earnings grow tax-deferred
• Distributions taxed as ordinary income
• Required Minimum Distributions (RMDs) start at age 73 (SECURE 2.0); age 75 effective 2033
• 10% early withdrawal penalty before age 59½
• SECURE 2.0 penalty-free exceptions include: disability, first home ($10K), qualified education, substantially equal periodic payments, medical expenses, birth/adoption ($5K each spouse), terminal illness (84 months life expectancy), emergency withdrawals ($1K/year, repayable in 3 years), domestic abuse (lesser of $10K or 50% of account)
• 2026 contribution limit: $7,500 (+$1,100 catch-up for age 50+)

**Roth IRA:**
• Contributions are NOT tax-deductible (made with after-tax dollars)
• Earnings grow TAX-FREE
• Qualified distributions are completely TAX-FREE (must be 59½+ AND account open 5+ years)
• NO Required Minimum Distributions during owner's lifetime
• Income limits: phase-out $153K-$168K (single), $242K-$252K (joint) for 2026
• Can contribute at any age (if earned income exists)
• 2026 contribution limit: $7,500 (+$1,100 catch-up for age 50+)

**SEP IRA (Simplified Employee Pension):**
• For self-employed and businesses of ANY size (no employee limit)
• ONLY employer contributions (up to 25% of compensation; SEP minimum pay threshold $800 for 2026)
• Easy to set up and administer
• Same tax treatment as traditional IRA (tax-deferred)
• Employer contributions must cover ALL eligible employees (same percentage)

**SIMPLE IRA:**
• For small businesses with ≤100 employees
• Employee AND employer contributions
• Lower contribution limits than 401(k)
• 25% early withdrawal penalty in first 2 years (not the usual 10%)

**Exam tip:** Roth = tax-free distributions + no RMDs. Traditional = tax-deductible + taxable distributions + RMDs at 73. The 5-year rule for Roth qualified distributions is frequently tested.`
          },
          {
            heading: "Employer-Sponsored Plans",
            body: `**401(k) plans (private sector):**
• Employee salary deferrals + optional employer match
• Pre-tax contributions (traditional) or after-tax (Roth 401(k))
• Vesting schedules may apply to employer contributions
• Loans permitted (up to lesser of 50% of vested balance or $50,000)
• RMDs at age 73 (age 75 effective 2033)
• Roth 401(k), Roth 403(b), Roth 457(b) NO LONGER require RMDs (SECURE 2.0, effective 2024)
• Employer catch-up contribution: $8,000 for 2026

**403(b) plans (public schools, nonprofits, religious organizations):**
• Similar to 401(k) but for specific employers
• Investments limited to mutual funds and annuities
• Salary deferrals + employer contributions
• Same contribution limits as 401(k)

**Defined Benefit Plans (pensions):**
• Employer promises a specific retirement benefit (formula-based)
• All investment risk is on the EMPLOYER
• Formula usually based on salary × years of service
• Employer bears obligation to fund the plan adequately
• Becoming less common in private sector

**Defined Contribution Plans (401(k), profit-sharing, etc.):**
• Contribution amounts are defined, NOT the benefit
• All investment risk is on the EMPLOYEE
• Retirement benefit depends on contributions + investment performance
• More common and growing

**Qualified vs. Nonqualified plans:**
• **Qualified:** IRS-approved, tax-deductible contributions, ERISA-covered, nondiscrimination requirements. Examples: 401(k), defined benefit, profit-sharing.
• **Nonqualified:** Do NOT meet IRS requirements, employer contributions not immediately deductible, can discriminate (offer only to select employees). Examples: deferred compensation, stock options, executive bonus plans.

**Exam tip:** Defined benefit = employer risk (promises a benefit). Defined contribution = employee risk (benefit depends on performance). Know the difference cold.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Retirement Plans", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+retirement+plans+IRA+401k", type: "video" },
          { label: "Test Geek — IRAs Explained", url: "https://www.youtube.com/results?search_query=test+geek+series+65+traditional+roth+IRA", type: "video" },
        ]
      },
      {
        id: "18.2",
        title: "ERISA, Education Savings & HSAs",
        los: [
          { code: "18.f", title: "Identify tax treatment of distributions from qualified plans" },
          { code: "18.g", title: "Identify the purpose of ERISA and the Uniform Prudent Investor Act" },
          { code: "18.h", title: "Compare the two major types of education funding programs" },
          { code: "18.i", title: "Contrast UGMA and UTMA accounts" },
          { code: "18.j", title: "Recall when HSAs may be used" },
        ],
        content: [
          {
            heading: "ERISA & Plan Distributions",
            body: `**ERISA (Employee Retirement Income Security Act of 1974):**
• Sets minimum standards for private employer retirement plans
• Requires plan fiduciaries to act in participants' best interest
• Requires diversification of plan assets
• Provides for plan participant protections (vesting schedules, reporting, funding)
• Does NOT require employers to offer plans — only governs those that do
• Does NOT cover government or church plans

**Uniform Prudent Investor Act (UPIA):**
• Governs how fiduciaries manage trust and retirement assets
• Must consider the portfolio as a WHOLE (total return approach)
• Diversification required unless special circumstances
• Delegation to investment professionals is permitted (must monitor)
• Standard: what a prudent INVESTOR (not prudent person) would do

**Distributions from qualified plans:**
• Taxed as ordinary income (pre-tax contributions + earnings)
• 10% early withdrawal penalty before 59½ (exceptions apply)
• RMDs begin at age 73 (age 75 effective 2033)
• Failure to take RMD → 25% excise tax on the shortfall (SECURE 2.0 reduced from 50%; further reduced to 10% if corrected timely)
• Rollovers: 60-day window for indirect rollover; direct trustee-to-trustee transfer is better (no tax withholding)

**Exam tip:** ERISA covers private plans only — NOT government or church plans. The 60-day rollover rule and RMD penalties are frequently tested.`
          },
          {
            heading: "Education Savings & HSAs",
            body: `**529 Plans (Qualified Tuition Programs):**
• State-sponsored education savings
• Contributions with after-tax dollars (may get state tax deduction)
• Earnings grow tax-free
• Tax-free withdrawals for qualified education expenses (tuition, books, room/board, K-12 up to $10,000/year)
• High contribution limits (set by state, often $300,000+)
• Donor maintains control of the account
• Can change beneficiary to family member
• Counts as gift for tax purposes (can superfund 5 years' worth at once)
• Unused funds can be rolled to Roth IRA (SECURE 2.0, effective 2024): 529 must be open 15+ years, subject to annual Roth contribution limits, lifetime max $35,000, contributions in last 5 years excluded

**Coverdell ESA (Education Savings Account):**
• Max $2,000 contribution per beneficiary per year
• After-tax contributions, tax-free growth and withdrawals for education
• Can be used for K-12 expenses (broader than 529 originally)
• Income limits for contributors
• Must be used by age 30 (or rolled to family member)
• Lower limits and more restrictions than 529s

**UGMA/UTMA** — covered in Unit 16 (custodial accounts for minors)

**Health Savings Accounts (HSAs):**
• Must be enrolled in a High-Deductible Health Plan (HDHP)
• TRIPLE tax advantage:
  1. Contributions are tax-deductible (or pre-tax through payroll)
  2. Earnings grow tax-free
  3. Withdrawals are tax-free if used for qualified medical expenses
• Contributions roll over year to year (no "use it or lose it")
• Portable — belongs to the individual, not the employer
• After age 65: can use for any purpose (taxed as income, but no penalty)
• Annual contribution limits apply

**Exam tip:** HSAs are the ONLY account with a triple tax benefit (deductible contributions + tax-free growth + tax-free withdrawals). 529 plans are the go-to for education savings — know the tax-free qualified withdrawals.`
          }
        ],
        resources: [
          { label: "Test Geek — 529 Plans & HSAs", url: "https://www.youtube.com/results?search_query=test+geek+series+65+529+plans+HSA+education+savings", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 19 — TYPES OF RISK
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit19",
    number: 19,
    title: "Types of Investment Risk",
    examQuestions: "~6 questions",
    lessons: [
      {
        id: "19.1",
        title: "Systematic & Unsystematic Risk",
        los: [
          { code: "19.a", title: "Identify the different systematic risks" },
          { code: "19.b", title: "Identify the different unsystematic risks" },
          { code: "19.c", title: "Identify opportunity cost" },
          { code: "19.d", title: "Recall the sequence of priority of claims in corporate liquidation" },
        ],
        content: [
          {
            heading: "Systematic Risk (Market Risk)",
            body: `Systematic risk affects the ENTIRE market — it CANNOT be diversified away. Measured by beta.

**Types of systematic risk:**
• **Market risk** — overall market declines affect all securities
• **Interest rate risk** — changes in rates affect bond prices (inverse) and equity valuations
• **Inflation (purchasing power) risk** — rising prices erode real returns. Especially damaging to fixed-income investors.
• **Currency (exchange rate) risk** — changes in foreign exchange rates affect international investments
• **Political/legislative risk** — government actions, regulations, taxes affect markets
• **Reinvestment risk** — inability to reinvest cash flows at the same rate (especially when rates fall)

**Remember: Systematic = "System-wide" = Cannot diversify away = Beta measures it**`
          },
          {
            heading: "Unsystematic Risk & Priority of Claims",
            body: `Unsystematic risk is specific to a company, industry, or sector — CAN be diversified away.

**Types of unsystematic risk:**
• **Business risk** — risk of the company's operations failing (management, competition, products)
• **Financial (credit/default) risk** — risk the issuer cannot pay obligations
• **Liquidity risk** — risk of not being able to sell quickly at a fair price
• **Regulatory risk** — industry-specific regulation changes
• **Concentration risk** — too much invested in one security or sector

**Remember: Unsystematic = "Unique" = CAN diversify away = Alpha measures excess return**

**Opportunity cost:**
The return you give up by choosing one investment over another. If you invest in bonds earning 4% instead of stocks that earned 8%, your opportunity cost is 4%.

**Priority of claims in corporate liquidation (MUST KNOW ORDER):**
1. **Secured creditors** (mortgage bonds, equipment trust certificates)
2. **Unsecured creditors / general creditors** (debentures)
3. **Subordinated debentures**
4. **Preferred stockholders**
5. **Common stockholders** (last — residual claim)

**IRS and employees have priority ABOVE all of the above.**

**Exam tip:** Systematic = beta = can't diversify. Unsystematic = can diversify. Know the liquidation priority — common stockholders are ALWAYS last. The key to reducing unsystematic risk is DIVERSIFICATION.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Types of Risk", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+systematic+unsystematic+risk", type: "video" },
          { label: "Test Geek — Risk Concepts", url: "https://www.youtube.com/results?search_query=test+geek+series+65+investment+risk+types", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 20 — QUANTITATIVE METHODS
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit20",
    number: 20,
    title: "Quantitative Methods and Analytical Tools",
    examQuestions: "~7 questions",
    lessons: [
      {
        id: "20.1",
        title: "Time Value of Money & Duration",
        los: [
          { code: "20.a", title: "Describe time value concepts including Rule of 72" },
          { code: "20.b", title: "Evaluate the effect of a bond's duration on its market price" },
          { code: "20.c", title: "Describe how DCF is used to estimate investment value" },
        ],
        content: [
          {
            heading: "Time Value of Money",
            body: `Money today is worth more than the same amount in the future (because it can be invested).

**Rule of 72:** Quick estimate of how long it takes to double your money
Years to Double = 72 ÷ Annual Rate of Return
Example: 8% return → 72 ÷ 8 = 9 years to double

**Future Value:** FV = PV × (1 + r)ⁿ
What a present sum will be worth in the future.

**Present Value:** PV = FV ÷ (1 + r)ⁿ
What a future sum is worth today. Used in bond pricing and investment valuation.

**Discounted Cash Flow (DCF):**
• Estimates an investment's value by discounting all expected future cash flows to present value
• Higher discount rate → lower present value
• Used in bond pricing (discount coupons + par value) and stock valuation
• Net Present Value (NPV) = sum of all discounted cash flows − initial investment
  → NPV > 0: invest | NPV < 0: don't invest
• Internal Rate of Return (IRR) = the discount rate that makes NPV = 0

**Exam tip:** Rule of 72 is almost certainly on your exam. Know it cold. Also know that higher discount rates = lower present values.`
          },
          {
            heading: "Bond Duration",
            body: `Duration measures a bond's sensitivity to interest rate changes (in years).

**Key duration concepts:**
• Duration = weighted average time to receive all cash flows from a bond
• Higher duration = MORE sensitive to rate changes
• For every 1% change in rates, a bond's price changes by approximately its duration percentage
  → Example: Duration of 5 years → if rates rise 1%, bond price falls ~5%

**What increases duration:**
• Longer maturity → higher duration
• Lower coupon → higher duration
• Zero-coupon bonds have the HIGHEST duration (duration = maturity)

**What decreases duration:**
• Shorter maturity
• Higher coupon (more cash flows earlier)
• Higher yield

**Duration vs. Maturity:**
• Maturity = when the bond matures
• Duration = sensitivity measure (always ≤ maturity, except for zeros where duration = maturity)

**Exam tip:** Zero-coupon bonds have the highest duration and are most sensitive to rate changes. Duration is the best measure of interest rate risk.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Time Value of Money", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+time+value+money+rule+72", type: "video" },
          { label: "The Geek & The Guru — Quantitative Methods", url: "https://www.youtube.com/results?search_query=geek+guru+series+65+podcast+quantitative+analysis", type: "podcast" },
        ]
      },
      {
        id: "20.2",
        title: "Statistical Measures & Ratios",
        los: [
          { code: "20.d", title: "Select the proper measure of central tendency" },
          { code: "20.e", title: "Identify alpha and beta" },
          { code: "20.f", title: "Recall how standard deviation relates to volatility" },
          { code: "20.g", title: "Recognize the relationship between correlation and diversification" },
          { code: "20.h", title: "Calculate liquidity and valuation ratios" },
        ],
        content: [
          {
            heading: "Statistical Concepts",
            body: `**Measures of central tendency:**
• **Mean (average)** — sum ÷ count. Most common. Affected by outliers.
• **Median** — middle value when sorted. BEST when data has outliers or is skewed.
• **Mode** — most frequently occurring value. Useful for categorical data.

**When to use which:** If income data has a few very high earners → median is better than mean (not distorted by outliers).

**Skewed distributions:**
• Left-skewed (negative skew): mean is LOWER than median (tail extends left)
• Right-skewed (positive skew): mean is HIGHER than median (tail extends right)
• Normal distribution: mean = median = mode

**Alpha:**
• Excess return compared to what was expected given the risk (beta)
• Alpha = Actual Return − Expected Return (from CAPM)
• Positive alpha → manager outperformed expectations (skill)
• Negative alpha → manager underperformed
• Measures MANAGER SKILL

**Beta:**
• Measures systematic risk (volatility relative to the market)
• Market beta = 1.0
• Beta > 1.0 → more volatile than market (aggressive)
• Beta < 1.0 → less volatile than market (defensive)
• Beta = 0 → no correlation to market (T-bills)
• Negative beta → moves opposite to market (rare, e.g., gold sometimes)

**Standard Deviation:**
• Measures TOTAL risk (both systematic + unsystematic)
• Higher SD = more volatile = more risky
• In a normal distribution:
  → 68% of returns fall within ±1 SD
  → 95% within ±2 SD
  → 99% within ±3 SD

**Correlation:**
• Measures how two assets move together (−1 to +1)
• +1.0 = perfect positive correlation (move together exactly)
• 0 = no correlation
• −1.0 = perfect negative correlation (move exactly opposite)
• For maximum diversification benefit, combine assets with LOW or NEGATIVE correlation
• You CANNOT eliminate all risk through diversification (systematic risk remains)

**Exam tip:** Beta = systematic risk only. Standard deviation = total risk. For diversification, low or negative correlation is key. Median is best for skewed data.`
          },
          {
            heading: "Financial Ratios",
            body: `**Liquidity ratios (can the company pay short-term obligations?):**
• **Current Ratio** = Current Assets ÷ Current Liabilities
  → Higher = more liquid. Generally, >1.0 is acceptable.
• **Quick Ratio (Acid Test)** = (Current Assets − Inventory) ÷ Current Liabilities
  → More conservative (excludes inventory which may be hard to liquidate)

**Valuation ratios:**
• **P/E Ratio** = Market Price ÷ EPS
  → High P/E = growth stock | Low P/E = value stock
• **P/B Ratio** = Market Price ÷ Book Value per Share
  → >1 = market values company above book | <1 = potentially undervalued
• **Dividend Payout Ratio** = Dividends per Share ÷ EPS
  → What portion of earnings are paid as dividends
• **Dividend Yield** = Annual Dividend ÷ Market Price

**Profitability ratios:**
• **Return on Equity (ROE)** = Net Income ÷ Shareholders' Equity
• **Return on Assets (ROA)** = Net Income ÷ Total Assets
• **Profit Margin** = Net Income ÷ Revenue

**Debt ratios:**
• **Debt-to-Equity** = Total Debt ÷ Total Equity
  → Higher = more leveraged = more financial risk

**Exam tip:** Current ratio and quick ratio are the most tested liquidity measures. Know that quick ratio removes inventory. P/E ratio is the most tested valuation ratio.`
          }
        ],
        resources: [
          { label: "Test Geek — Alpha, Beta & Standard Deviation", url: "https://www.youtube.com/results?search_query=test+geek+series+65+alpha+beta+standard+deviation", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 21 — PORTFOLIO MANAGEMENT
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit21",
    number: 21,
    title: "Portfolio Management Strategies and Techniques",
    examQuestions: "~9 questions",
    lessons: [
      {
        id: "21.1",
        title: "Asset Allocation & Management Styles",
        los: [
          { code: "21.a", title: "Discriminate between major asset classes" },
          { code: "21.b", title: "Identify risk reduction benefits of diversification" },
          { code: "21.c", title: "Describe the difference between active and passive management" },
          { code: "21.d", title: "Evaluate methods used to determine equity value" },
          { code: "21.e", title: "Contrast different portfolio management strategies" },
        ],
        content: [
          {
            heading: "Asset Classes & Diversification",
            body: `**Major asset classes:**
• **Cash equivalents** — T-bills, money markets, CDs. Lowest risk/return. Preserve capital.
• **Fixed income (bonds)** — intermediate risk/return. Income generation.
• **Equities (stocks)** — higher risk/return. Growth and capital appreciation.
• **Real estate** — inflation hedge, income, diversification
• **Alternatives** — hedge funds, PE, commodities. Highest risk, lowest correlation.

**Asset allocation** = how you divide your portfolio among these classes. It is the SINGLE MOST IMPORTANT factor in determining portfolio return (per academic research).

**Diversification benefits:**
• Reduces unsystematic (company-specific) risk
• Cannot eliminate systematic (market) risk
• Maximum benefit from assets with LOW or NEGATIVE correlation
• Beyond 20-25 well-diversified stocks, additional diversification provides diminishing marginal benefit

**Active vs. Passive Management:**
• **Active** — manager tries to outperform a benchmark through security selection and market timing. Higher fees. Generates more taxable events.
• **Passive (indexing)** — replicates a benchmark index. Lower fees. More tax-efficient. Based on efficient market hypothesis.

**Equity valuation methods:**
• **Fundamental analysis** — intrinsic value based on financial statements, earnings, dividends
  → Top-down: economy → sector → company
  → Bottom-up: company first, then macro factors
• **Technical analysis** — charts, patterns, volume, momentum. Ignores fundamentals.
• **Quantitative analysis** — mathematical models, algorithms

**Exam tip:** Asset allocation is the #1 determinant of portfolio return (not security selection or market timing). This is a heavily tested concept.`
          },
          {
            heading: "Portfolio Strategies & Bond Management",
            body: `**Portfolio management strategies:**
• **Strategic asset allocation** — long-term target allocation. Rebalance periodically to maintain targets.
• **Tactical asset allocation** — short-term adjustments to exploit market conditions. More active.
• **Buy and hold** — simplest passive strategy. Low costs.
• **Constant dollar plan** — maintain a fixed dollar amount in stocks; rest in bonds. Sell stocks when they rise, buy when they fall.
• **Constant ratio plan** — maintain a fixed percentage in stocks vs. bonds.

**Bond management techniques for interest rate risk:**
• **Laddering** — buy bonds with staggered maturities (e.g., 1, 3, 5, 7, 10 years). As each matures, reinvest at the long end. Reduces both interest rate risk and reinvestment risk.
• **Barbelling** — concentrate in short-term and long-term bonds, skip intermediate. More aggressive.
• **Bullet strategy** — all bonds mature at the same time. Used when you know exactly when you need the money. Highest interest rate risk.

**Dollar Cost Averaging (DCA):**
• Invest a FIXED dollar amount at regular intervals regardless of price
• Result: buy MORE shares when prices are low, FEWER when prices are high
• Average cost per share is ALWAYS less than the average PRICE per share
• Does NOT guarantee a profit or protect against loss
• Works best in volatile, generally rising markets

**Exam tip:** In DCA, average cost per share < average price per share. This is ALWAYS true and frequently tested. Laddering is the most commonly recommended bond strategy for reducing both interest rate and reinvestment risk.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Portfolio Management", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+portfolio+management+strategies", type: "video" },
          { label: "The Geek & The Guru — Strategies Episode", url: "https://www.youtube.com/results?search_query=geek+guru+series+65+podcast+portfolio+strategies", type: "podcast" },
        ]
      },
      {
        id: "21.2",
        title: "Capital Market Theory & Hedging",
        los: [
          { code: "21.f", title: "Compare techniques for minimizing interest rate risk" },
          { code: "21.g", title: "Identify components of capital market theory" },
          { code: "21.h", title: "Calculate expected return using the security market line" },
          { code: "21.i", title: "Identify the three forms of the efficient market hypothesis" },
          { code: "21.j", title: "Illustrate how dollar cost averaging lowers average cost" },
          { code: "21.k", title: "Describe the use of put and call options to hedge" },
        ],
        content: [
          {
            heading: "Capital Market Theory & CAPM",
            body: `**Modern Portfolio Theory (MPT) — Markowitz:**
• Investors should focus on the portfolio's risk and return, not individual securities
• Efficient frontier — set of portfolios offering maximum return for a given level of risk
• Diversification reduces risk without proportionally reducing return

**Capital Asset Pricing Model (CAPM):**
Expected Return = Rf + β(Rm − Rf)
• Rf = risk-free rate (typically T-bill rate)
• β = beta of the security
• Rm = expected market return
• (Rm − Rf) = market risk premium (equity risk premium)

Example: Rf = 3%, β = 1.5, Rm = 10%
Expected Return = 3% + 1.5(10% − 3%) = 3% + 10.5% = 13.5%

**Security Market Line (SML):**
• Graphical representation of CAPM
• X-axis = beta | Y-axis = expected return
• All correctly priced securities should fall ON the SML
• Securities ABOVE the SML → undervalued (buy)
• Securities BELOW the SML → overvalued (sell)

**Capital Market Line (CML):**
• Similar concept but uses standard deviation (total risk) on x-axis
• Only efficient portfolios fall on the CML
• SML uses beta (systematic risk) and applies to all securities

**Exam tip:** CAPM formula is heavily tested. Know how to calculate expected return. Securities above the SML have positive alpha and are considered undervalued.`
          },
          {
            heading: "Efficient Market Hypothesis & Hedging with Options",
            body: `**Efficient Market Hypothesis (EMH):**

**Weak form:** Current prices reflect all PAST market data (historical prices, volume). Technical analysis does NOT work. Fundamental analysis CAN work.

**Semi-strong form:** Current prices reflect all PUBLIC information (past data + public financial statements, news). Neither technical NOR fundamental analysis works. Only insider information provides an edge.

**Strong form:** Prices reflect ALL information (public + private/insider). NO analysis works, not even insider info. Most academics consider this too extreme.

**The implication:** If markets are efficient, passive investing (indexing) is the best strategy.

**Hedging with options:**

**Protective put (married put) — insurance for a long stock position:**
• Own stock + buy put on same stock
• If stock falls below strike → exercise put to limit losses
• Max loss = (stock price − put strike) + premium paid
• Unlimited upside (minus premium paid)
→ Most common hedging strategy on the exam

**Covered call — income generation:**
• Own stock + sell (write) call on same stock
• If stock stays flat or declines slightly → keep premium income
• Caps upside at strike price + premium received
• Does NOT fully protect against downside (only reduces loss by premium amount)
→ Best for: investors who want income and are willing to cap upside

**Collar:**
• Own stock + buy put + sell call
• Put provides downside protection, call premium offsets put cost
• Limits both upside AND downside

**Exam tip:** Protective put = bearish hedge for a long position. Covered call = income strategy that caps upside. Know that a protective put protects against unlimited downside, but a covered call only provides limited downside cushion.`
          }
        ],
        resources: [
          { label: "Test Geek — CAPM & EMH", url: "https://www.youtube.com/results?search_query=test+geek+series+65+CAPM+efficient+market+hypothesis", type: "video" },
          { label: "Dean Tinney — Hedging with Options", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+hedging+options+protective+put", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 22 — RETURNS & BENCHMARKS
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit22",
    number: 22,
    title: "Returns and Performance Benchmarks",
    examQuestions: "~4 questions",
    lessons: [
      {
        id: "22.1",
        title: "Investment Returns & Benchmarks",
        los: [
          { code: "22.a", title: "Calculate the investment return measurements most commonly found on the exam" },
          { code: "22.b", title: "Match the appropriate benchmarks for various portfolios" },
        ],
        content: [
          {
            heading: "Return Measurements",
            body: `**Total Return:** Most comprehensive measure
Total Return = (Income + Capital Gains) ÷ Initial Investment
Includes: dividends, interest, realized gains, unrealized gains

**Holding Period Return:**
HPR = (Ending Value − Beginning Value + Income) ÷ Beginning Value
NOT annualized — just the return over the holding period

**Annualized Return:**
Converts holding period returns into an annual figure for comparison.

**Real Return (inflation-adjusted):**
Real Return ≈ Nominal Return − Inflation Rate
More precise: (1 + Nominal) ÷ (1 + Inflation) − 1

**After-Tax Return:**
After-Tax Return = Pre-Tax Return × (1 − Tax Rate)

**Risk-Adjusted Returns:**

**Sharpe Ratio** = (Portfolio Return − Risk-Free Rate) ÷ Standard Deviation
• Measures return per unit of TOTAL risk
• Higher = better
• Uses standard deviation (total risk)

**Treynor Ratio** = (Portfolio Return − Risk-Free Rate) ÷ Beta
• Measures return per unit of SYSTEMATIC risk
• Uses beta (systematic risk only)
• Better for well-diversified portfolios

**Alpha** = Actual Return − Expected Return (from CAPM)
• Positive = outperformance
• Negative = underperformance

**Exam tip:** Sharpe uses standard deviation (total risk). Treynor uses beta (systematic risk). Use Sharpe for standalone portfolios, Treynor for well-diversified portfolios.`
          },
          {
            heading: "Performance Benchmarks",
            body: `**Match the benchmark to the portfolio:**

**Large-cap U.S. stocks** → S&P 500 (cap-weighted, 500 large companies)
**Total U.S. stock market** → Wilshire 5000 (broadest U.S. index)
**Small-cap stocks** → Russell 2000
**Blue-chip / large industrial** → Dow Jones Industrial Average (30 stocks, price-weighted)
**International developed markets** → MSCI EAFE (Europe, Australasia, Far East)
**Emerging markets** → MSCI Emerging Markets
**Bonds** → Bloomberg Barclays Aggregate Bond Index
**Technology** → NASDAQ Composite

**Index weighting methods:**
• **Price-weighted** — higher-priced stocks have more influence (DJIA)
• **Market cap-weighted** — larger companies have more influence (S&P 500, most modern indices)
• **Equal-weighted** — all stocks have equal influence

**Time-weighted vs. Dollar-weighted returns:**
• **Time-weighted return** — eliminates the impact of external cash flows (deposits/withdrawals). PREFERRED for evaluating MANAGER performance. GIPS-compliant.
• **Dollar-weighted (money-weighted) return** — accounts for timing and size of cash flows. Reflects INVESTOR experience (actual return the investor earned).

**Exam tip:** Time-weighted is for evaluating the MANAGER. Dollar-weighted is for evaluating the INVESTOR'S experience. The exam will present scenarios where you need to choose which is appropriate.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Returns & Benchmarks", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+returns+benchmarks+sharpe+treynor", type: "video" },
          { label: "Test Geek — Performance Measurement", url: "https://www.youtube.com/results?search_query=test+geek+series+65+performance+measurement+returns", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 23 — TRADING SECURITIES
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit23",
    number: 23,
    title: "Trading Securities",
    examQuestions: "~4 questions",
    lessons: [
      {
        id: "23.1",
        title: "Accounts, Margin & Order Types",
        los: [
          { code: "23.a", title: "Compare cash and margin accounts" },
          { code: "23.b", title: "Compute margin account calculations" },
          { code: "23.c", title: "Contrast stock exchanges and the OTC market" },
          { code: "23.d", title: "Identify the difference between broker and dealer" },
          { code: "23.e", title: "Describe the costs of trading securities" },
          { code: "23.f", title: "Identify features and uses of market, stop, and limit orders and short sales" },
          { code: "23.g", title: "Describe payment for order flow and introducing vs. clearing BDs" },
        ],
        content: [
          {
            heading: "Accounts & Margin",
            body: `**Cash account:** Must pay in full by settlement date. No borrowing.

**Margin account:** Borrow money from BD to buy securities.
• Regulation T: initial margin = 50% (must deposit 50% of purchase price)
• Maintenance margin: minimum equity that must be maintained (typically 25% for long, 30% for short)
• Margin call: triggered when equity falls below maintenance level — must deposit more funds or securities

**Key margin formulas:**
• **Long account equity** = Market Value − Debit Balance (loan)
• **Margin call price (long)** = Loan Amount ÷ (1 − Maintenance %)
  → At 25% maintenance: Call price = Debit ÷ 0.75

**Short selling:**
• Sell borrowed shares hoping to buy back at lower price
• Unlimited risk (stock can rise indefinitely)
• Must have margin account
• Subject to "locate" requirement (must find shares to borrow)
• Proceeds stay in the account as collateral

**Exam tip:** Reg T = 50% initial margin. Know how to calculate when a margin call occurs. Short selling has UNLIMITED risk.`
          },
          {
            heading: "Markets, Orders & Trading",
            body: `**Exchanges vs. OTC:**
• **Exchanges** (NYSE, NASDAQ): centralized, listed securities, auction market
• **OTC (over-the-counter)**: decentralized, dealer market, unlisted securities trade here
• NYSE uses specialists/designated market makers (DMMs)
• NASDAQ uses multiple market makers competing for order flow

**Broker vs. Dealer:**
• **Broker (agent)**: acts on behalf of the client, earns commission, doesn't own the securities
• **Dealer (principal)**: trades for own account, earns markup/markdown, takes risk
• A firm can act as both — but NOT both in the same transaction

**Order types:**
• **Market order** — execute immediately at best available price. Guaranteed execution, NOT guaranteed price.
• **Limit order** — execute at specified price or better.
  → Buy limit: below market (sets maximum purchase price)
  → Sell limit: above market (sets minimum sale price)
• **Stop order (stop-loss)** — becomes a market order when the stop price is reached.
  → Sell stop: below market (protect gains or limit losses)
  → Buy stop: above market (protect short position or enter momentum trade)
• **Stop-limit** — becomes a limit order (not market) when stop price is reached. Risk: may not execute.

**Settlement (T+1 effective May 28, 2024):**
• Regular way: T+1 (trade date + 1 business day) for most securities
• Ex-dividend date is now the SAME DAY as the record date (changed from T-1 under old T+2 rules)
• Reg T payment deadline: T+3 (was T+4 under old rules)
• T-bills: same day or next day
• Options exercise: shares deliver next business day

**Payment for Order Flow (PFOF) — NEW EXAM TOPIC:**
• Practice where BDs receive compensation for routing client orders to specific market makers
• Creates potential conflict of interest (BD incentivized to route to highest-paying market maker, not best execution)
• Must be disclosed to clients

**Introducing vs. Clearing Broker-Dealers:**
• **Introducing BD** — accepts customer orders but does NOT hold customer funds/securities. Sends orders to a clearing firm.
• **Clearing BD** — holds customer assets, processes trades, sends confirmations, maintains records.

**Exam tip:** Buy limits go BELOW market; sell limits go ABOVE market. Stop orders become market orders when triggered. Settlement is T+1 for most securities.`
          }
        ],
        resources: [
          { label: "Dean Tinney — Trading & Order Types", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+trading+order+types+margin", type: "video" },
          { label: "Test Geek — Margin Calculations", url: "https://www.youtube.com/results?search_query=test+geek+series+65+margin+accounts+calculations", type: "video" },
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // UNIT 24 — INSURANCE & ANNUITIES
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "unit24",
    number: 24,
    title: "Insurance-Based Products and Annuities",
    examQuestions: "~2 questions",
    lessons: [
      {
        id: "24.1",
        title: "Annuities",
        los: [
          { code: "24.a", title: "Contrast fixed and variable annuities" },
          { code: "24.b", title: "Compare variable annuities and mutual funds" },
          { code: "24.c", title: "Calculate the account return for an index annuity" },
          { code: "24.d", title: "Compare purchase and settlement options for annuities" },
          { code: "24.e", title: "Calculate the tax on an early withdrawal from an annuity" },
        ],
        content: [
          {
            heading: "Fixed vs. Variable Annuities",
            body: `Annuities are insurance contracts that provide income, typically in retirement.

**Fixed Annuities:**
• Guaranteed rate of return (insurance company bears investment risk)
• Payments are fixed and predictable
• Invested in the insurance company's GENERAL account
• NOT a security (no SEC registration required)
• No market risk to the investor

**Variable Annuities:**
• Returns depend on performance of underlying investments
• Invested in SEPARATE accounts (like mutual fund subaccounts)
• IS a security — regulated by SEC and state insurance
• Investment risk is on the OWNER (no guaranteed return)
• Must be sold with a prospectus
• Offers market participation but with added fees

**Index (Equity-Indexed) Annuities:**
• Returns linked to a market index (e.g., S&P 500)
• Guaranteed minimum return (floor, often 1-3%)
• Participation rate — you get a percentage of the index gain (e.g., 80%)
• Cap rate — maximum return allowed
• Account return = Index Return × Participation Rate (capped at cap rate)
• Example: Index gains 12%, participation rate 80%, cap 10%
  → 12% × 80% = 9.6% (under cap, so investor gets 9.6%)
• Generally NOT considered securities (unless variable components)

**Exam tip:** Fixed annuity = general account = NOT a security. Variable annuity = separate account = IS a security. Know the difference cold.`
          },
          {
            heading: "Annuity Taxation & Purchase Options",
            body: `**Tax treatment:**
• Contributions with after-tax dollars (nonqualified annuity) — earnings grow tax-deferred
• Withdrawals: earnings come out FIRST (LIFO) — taxed as ordinary income
• After all earnings withdrawn, return of basis (cost) is tax-free
• 10% penalty for withdrawals before age 59½ (applies to earnings only)

**Early withdrawal tax calculation:**
Tax = (Withdrawal Amount or Earnings, whichever is less) × Tax Rate + 10% Penalty

Example: $100,000 contributed, account worth $150,000, withdraw $20,000 at age 55, 25% bracket
Earnings = $50,000. Withdrawal ($20,000) < Earnings → all taxable
Tax = $20,000 × 25% + $20,000 × 10% = $5,000 + $2,000 = $7,000

**Purchase options:**
• Single premium — one lump sum payment
• Periodic payments — installments over time
• Immediate annuity — payments begin within one year of purchase (single premium only)
• Deferred annuity — accumulation phase before payments begin

**Settlement (payout) options:**
• **Life only** — payments for life, nothing to beneficiaries at death (highest periodic payment)
• **Life with period certain** — payments for life OR a minimum period (e.g., 10 years), whichever is longer
• **Joint and last survivor** — pays over two lifetimes (e.g., spouses). Lowest periodic payment.
• **Fixed period** — payments for a specified number of years
• **Fixed amount** — fixed dollar amount until account is exhausted

**Exam tip:** Life only = highest payment per period (no death benefit). Joint life = lowest payment (covers two lives). Withdrawals follow LIFO (earnings first = taxable first).`
          }
        ],
        resources: [
          { label: "Dean Tinney — Annuities for Series 65", url: "https://www.youtube.com/results?search_query=dean+tinney+series+65+annuities+fixed+variable", type: "video" },
          { label: "Test Geek — Annuity Taxation", url: "https://www.youtube.com/results?search_query=test+geek+series+65+annuity+taxation+withdrawals", type: "video" },
        ]
      },
      {
        id: "24.2",
        title: "Life Insurance",
        los: [
          { code: "24.f", title: "Compare the major types of life insurance" },
          { code: "24.g", title: "Recognize the special characteristics of variable life insurance" },
        ],
        content: [
          {
            heading: "Life Insurance Products",
            body: `**Term Life Insurance:**
• Pure death benefit — NO cash value
• Least expensive (initially)
• Coverage for a specified period (10, 20, 30 years)
• Premiums increase at renewal
• NOT a security
• Best for: temporary, high coverage needs on a budget

**Whole Life Insurance:**
• Permanent coverage (lifetime)
• Fixed premiums, guaranteed cash value growth
• Cash value grows tax-deferred
• Can borrow against cash value
• NOT a security
• More expensive than term

**Universal Life Insurance:**
• Flexible premiums and death benefit
• Cash value earns interest at a rate set by the insurer
• Can adjust premiums and coverage
• NOT a security
• Combines flexibility with permanent coverage

**Variable Life Insurance:**
• Death benefit and cash value vary based on separate account performance
• IS a security — regulated by SEC
• Must be sold with a prospectus
• Minimum guaranteed death benefit (but NOT cash value)
• Higher risk/higher potential reward than whole life
• Requires securities license to sell

**Variable Universal Life (VUL):**
• Combines variable life (separate accounts) with universal life (flexible premiums)
• IS a security
• Most flexible — variable investment + adjustable premiums
• Highest risk among insurance products

**Life insurance taxation:**
• Death benefit is generally income tax-free to beneficiary
• Cash value grows tax-deferred
• Loans against cash value are generally not taxable
• If policy is surrendered: gain (cash value − premiums paid) is taxable as ordinary income

**Exam tip:** Variable life and VUL = securities (separate accounts). All other life insurance = NOT securities. Death benefits are income tax-free.`
          }
        ],
        resources: [
          { label: "Test Geek — Life Insurance Types", url: "https://www.youtube.com/results?search_query=test+geek+series+65+life+insurance+variable+life", type: "video" },
        ]
      }
    ]
  },
];

// ─── FORMULA DATA BY SECTION ────────────────────────────────────────────────

const formulasBySection = {
  vehicles: [
    { name: "Current Yield (Stock)", formula: "Annual Dividend ÷ Market Price", vars: "Dividend = $/share/yr · Price = current trading price" },
    { name: "Dividend Discount Model", formula: "D₁ ÷ (r − g)", vars: "D₁ = next year's dividend · r = required return · g = growth rate" },
    { name: "P/E Ratio", formula: "Market Price ÷ EPS", vars: "High P/E = growth · Low P/E = value" },
    { name: "EPS", formula: "(Net Income − Pref Div) ÷ Shares Out", vars: "Earnings available to common shareholders" },
    { name: "Book Value/Share", formula: "(Assets − Liab − Pref Eq) ÷ Shares", vars: "From the balance sheet" },
    { name: "Current Yield (Bond)", formula: "Annual Coupon ÷ Market Price", vars: "Coupon = rate × par · Price = current bond price" },
    { name: "Conversion Ratio", formula: "Par Value ÷ Conversion Price", vars: "Result = shares per bond" },
    { name: "Parity Price (Stock)", formula: "Bond Price ÷ Conversion Ratio", vars: "Break-even stock price for conversion" },
    { name: "Parity Price (Bond)", formula: "Stock Price × Conversion Ratio", vars: "Bond value based on stock conversion" },
    { name: "Tax-Equivalent Yield", formula: "Muni Yield ÷ (1 − Tax Bracket)", vars: "Taxable yield needed to match muni after-tax" },
    { name: "TIPS Interest", formula: "Coupon Rate × Adjusted Principal", vars: "Adj Principal = Par × (Current CPI ÷ Base CPI)" },
    { name: "NAV", formula: "(Total Assets − Total Liabilities) ÷ Shares Outstanding", vars: "For mutual funds" },
    { name: "Offering Price (POP)", formula: "NAV ÷ (1 − Sales Load %)", vars: "What investors pay for mutual fund shares" },
    { name: "Option Intrinsic (Call)", formula: "Market Price − Strike Price", vars: "If positive; otherwise zero" },
    { name: "Option Intrinsic (Put)", formula: "Strike Price − Market Price", vars: "If positive; otherwise zero" },
  ],
  economics: [
    { name: "Working Capital", formula: "Current Assets − Current Liabilities", vars: "Short-term financial health" },
    { name: "Current Ratio", formula: "Current Assets ÷ Current Liabilities", vars: "> 1.0 generally acceptable" },
    { name: "Quick Ratio", formula: "(Current Assets − Inventory) ÷ Current Liab", vars: "More conservative liquidity measure" },
    { name: "Debt-to-Equity", formula: "Total Debt ÷ Total Equity", vars: "Leverage / financial risk" },
    { name: "ROE", formula: "Net Income ÷ Shareholders' Equity", vars: "Return on equity invested" },
    { name: "Profit Margin", formula: "Net Income ÷ Revenue", vars: "Profitability per dollar of sales" },
  ],
  strategies: [
    { name: "Rule of 72", formula: "72 ÷ Rate of Return", vars: "Approximate years to double" },
    { name: "CAPM", formula: "Rf + β(Rm − Rf)", vars: "Rf = risk-free rate · β = beta · Rm = market return" },
    { name: "Sharpe Ratio", formula: "(Rp − Rf) ÷ σp", vars: "Return per unit of total risk (std dev)" },
    { name: "Treynor Ratio", formula: "(Rp − Rf) ÷ βp", vars: "Return per unit of systematic risk (beta)" },
    { name: "Alpha", formula: "Actual Return − Expected Return", vars: "Manager skill: + = outperformed, − = underperformed" },
    { name: "Total Return", formula: "(Income + Cap Gains) ÷ Initial Investment", vars: "Most comprehensive return measure" },
    { name: "Real Return", formula: "Nominal Return − Inflation Rate", vars: "Purchasing power adjusted return" },
    { name: "After-Tax Return", formula: "Pre-Tax Return × (1 − Tax Rate)", vars: "What you actually keep" },
    { name: "Holding Period Return", formula: "(End − Begin + Income) ÷ Begin", vars: "Not annualized" },
    { name: "Margin Call (Long)", formula: "Debit Balance ÷ (1 − Maintenance %)", vars: "Price triggering margin call" },
  ],
  regulations: [
    { name: "Civil Statute of Limitations", formula: "Earlier of 3 yrs from sale OR 2 yrs from discovery", vars: "For USA violations" },
    { name: "Criminal Penalties", formula: "Up to $5,000 fine and/or 3 yrs imprisonment", vars: "5-year statute of limitations" },
    { name: "IA Net Worth (Custody)", formula: "$35,000 minimum", vars: "Required when IA has custody of client assets" },
    { name: "IA Net Worth (Discretion)", formula: "$10,000 minimum", vars: "Required when IA has discretion, no custody" },
  ],
  clients: [
    { name: "Gift Tax Exclusion", formula: "$19,000/recipient/year (2026)", vars: "Indexed for inflation; lifetime exemption $15M (2026)" },
    { name: "Capital Loss Deduction", formula: "Up to $3,000/year vs ordinary income", vars: "Excess carries forward indefinitely" },
    { name: "Wash Sale Window", formula: "30 days before or after sale", vars: "Loss disallowed if substantially identical security" },
  ],
};

// ─── KEY YIELD ORDER & CRITICAL RULES ────────────────────────────────────────

const criticalRules = [
  { title: "Bond Yield Order", content: "Discount: Coupon < CY < YTM < YTC\nPremium: Coupon > CY > YTM > YTC\nPar: Coupon = CY = YTM" },
  { title: "Liquidation Priority", content: "1. IRS / Employees\n2. Secured creditors\n3. Unsecured creditors (debentures)\n4. Subordinated debentures\n5. Preferred stockholders\n6. Common stockholders (LAST)" },
  { title: "IA Registration Thresholds", content: "Under $100M AUM → State\n$100-110M AUM → State or SEC\nOver $110M AUM → SEC (federal covered)" },
  { title: "Antifraud = UNIVERSAL", content: "Antifraud provisions apply to ALL securities\n(exempt or not) and ALL transactions (exempt or not).\nThere are NO exemptions from antifraud." },
  { title: "DCA Rule", content: "Average COST per share is ALWAYS less than\naverage PRICE per share." },
  { title: "Risk Types", content: "Systematic (Beta) = CANNOT diversify away\nUnsystematic = CAN diversify away\nStd Dev = Total risk (both)" },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────

const colors = {
  bg: "#0f1117",
  surface: "#181b24",
  surface2: "#1e2230",
  border: "#2a2e3b",
  text: "#e2e4e9",
  textMuted: "#8b8fa3",
  accent: "#4f8ff7",
  accentSoft: "rgba(79,143,247,0.12)",
  green: "#34d399",
  greenSoft: "rgba(52,211,153,0.12)",
  orange: "#f59e0b",
  orangeSoft: "rgba(245,158,11,0.12)",
  red: "#ef4444",
  redSoft: "rgba(239,68,68,0.12)",
  purple: "#a78bfa",
  purpleSoft: "rgba(167,139,250,0.12)",
  pink: "#f472b6",
  pinkSoft: "rgba(244,114,182,0.12)",
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function ContentBlock({ heading, body }) {
  const [open, setOpen] = useState(false);
  const renderBody = (text) => {
    return text.split("\n").map((line, i) => {
      const boldParts = line.split(/(\*\*.*?\*\*)/).map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j} style={{ color: colors.text, fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      if (line.startsWith("•")) {
        return <div key={i} style={{ paddingLeft: 16, marginBottom: 4, lineHeight: 1.7, position: "relative" }}>
          <span style={{ position: "absolute", left: 0, color: colors.accent }}>•</span>
          <span>{boldParts}</span>
        </div>;
      }
      if (line.trim() === "") return <div key={i} style={{ height: 8 }} />;
      if (line.startsWith("→")) {
        return <div key={i} style={{ paddingLeft: 16, color: colors.green, marginBottom: 4, lineHeight: 1.7 }}>{line}</div>;
      }
      return <div key={i} style={{ marginBottom: 4, lineHeight: 1.7 }}>{boldParts}</div>;
    });
  };
  return (
    <div style={{ background: colors.surface2, borderRadius: 10, marginBottom: 8, border: `1px solid ${open ? colors.accent + "44" : colors.border}`, transition: "border-color 0.2s" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", color: colors.text, cursor: "pointer", fontSize: 15, fontWeight: 600, fontFamily: "inherit", textAlign: "left" }}>
        <span>{heading}</span>
        <span style={{ transform: open ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s", fontSize: 18, color: colors.textMuted, flexShrink: 0, marginLeft: 8 }}>▸</span>
      </button>
      {open && <div style={{ padding: "0 16px 16px", fontSize: 14, color: colors.textMuted, lineHeight: 1.7 }}>{renderBody(body)}</div>}
    </div>
  );
}

function NotePad({ storageKey, notes, setNote }) {
  const [saving, setSaving] = useState(false);
  const timeoutRef = useRef(null);
  const handleChange = (val) => {
    setNote(storageKey, val);
    setSaving(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setSaving(false), 1200);
  };
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: colors.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Your Notes</span>
        {saving && <span style={{ fontSize: 11, color: colors.orange }}>saving...</span>}
      </div>
      <textarea
        value={notes[storageKey] || ""}
        onChange={e => handleChange(e.target.value)}
        placeholder="Add your notes, questions, or mnemonics here..."
        style={{ width: "100%", minHeight: 80, padding: 12, fontSize: 14, lineHeight: 1.6, background: colors.bg, color: colors.text, border: `1px solid ${colors.border}`, borderRadius: 8, resize: "vertical", fontFamily: "'IBM Plex Mono', monospace", outline: "none", boxSizing: "border-box" }}
        onFocus={e => e.target.style.borderColor = colors.accent}
        onBlur={e => e.target.style.borderColor = colors.border}
      />
    </div>
  );
}

function LessonCard({ lesson, notes, setNote }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: colors.surface, borderRadius: 12, marginBottom: 12, border: `1px solid ${colors.border}`, overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "16px 18px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", background: "none", border: "none", color: colors.text, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
        <div>
          <div style={{ fontSize: 11, color: colors.accent, fontWeight: 700, letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>Lesson {lesson.id}</div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>{lesson.title}</div>
          <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 6 }}>{lesson.los.map(lo => lo.code).join(" · ")}</div>
        </div>
        <span style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", fontSize: 20, color: colors.textMuted, marginTop: 4, flexShrink: 0 }}>⌄</span>
      </button>
      {open && (
        <div style={{ padding: "0 18px 18px" }}>
          <div style={{ background: colors.accentSoft, borderRadius: 8, padding: 14, marginBottom: 14, border: `1px solid ${colors.accent}33` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: colors.accent, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Learning Objectives</div>
            {lesson.los.map(lo => (
              <div key={lo.code} style={{ fontSize: 13, color: colors.text, marginBottom: 4, lineHeight: 1.6 }}>
                <span style={{ color: colors.accent, fontWeight: 600 }}>{lo.code}</span> — {lo.title}
              </div>
            ))}
          </div>
          {lesson.content.map((c, i) => <ContentBlock key={i} heading={c.heading} body={c.body} />)}
          {lesson.resources && lesson.resources.length > 0 && (
            <div style={{ background: colors.greenSoft, borderRadius: 8, padding: 14, marginTop: 10, border: `1px solid ${colors.green}33` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: colors.green, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Community Resources</div>
              {lesson.resources.map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.green, textDecoration: "none", marginBottom: 4, lineHeight: 1.5 }}>
                  <span style={{ fontSize: 14 }}>{r.type === "video" ? "▶" : r.type === "podcast" ? "🎧" : "→"}</span>
                  {r.label}
                </a>
              ))}
            </div>
          )}
          <NotePad storageKey={`notes-${lesson.id}`} notes={notes} setNote={setNote} />
        </div>
      )}
    </div>
  );
}

function FormulaSheet({ sectionId, sectionColor }) {
  const [open, setOpen] = useState(false);
  const formulas = formulasBySection[sectionId] || [];
  if (formulas.length === 0) return null;
  return (
    <div style={{ background: colors.surface, borderRadius: 12, marginBottom: 20, border: `1px solid ${sectionColor}44`, overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", background: `${sectionColor}11`, border: "none", color: colors.text, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
        <div>
          <div style={{ fontSize: 11, color: sectionColor, fontWeight: 700, letterSpacing: 1, marginBottom: 2, textTransform: "uppercase" }}>Quick Reference</div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Formula Sheet</div>
        </div>
        <span style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", fontSize: 20, color: sectionColor, flexShrink: 0 }}>⌄</span>
      </button>
      {open && (
        <div style={{ padding: "12px 18px 18px" }}>
          {formulas.map((f, i) => (
            <div key={i} style={{ padding: "10px 0", borderBottom: i < formulas.length - 1 ? `1px solid ${colors.border}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: colors.text, fontWeight: 600, minWidth: 140 }}>{f.name}</span>
                <span style={{ fontSize: 13, color: sectionColor, fontFamily: "'IBM Plex Mono', monospace" }}>{f.formula}</span>
              </div>
              {f.vars && <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 3, lineHeight: 1.5, paddingLeft: 2 }}>{f.vars}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CriticalRulesPanel() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: colors.surface, borderRadius: 12, marginBottom: 20, border: `1px solid ${colors.red}44`, overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", background: colors.redSoft, border: "none", color: colors.text, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
        <div>
          <div style={{ fontSize: 11, color: colors.red, fontWeight: 700, letterSpacing: 1, marginBottom: 2, textTransform: "uppercase" }}>Must Know</div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Critical Rules & Hierarchies</div>
        </div>
        <span style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", fontSize: 20, color: colors.red, flexShrink: 0 }}>⌄</span>
      </button>
      {open && (
        <div style={{ padding: "12px 18px 18px" }}>
          {criticalRules.map((r, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.red, marginBottom: 6 }}>{r.title}</div>
              <div style={{ fontSize: 13, color: colors.text, lineHeight: 1.8, fontFamily: "'IBM Plex Mono', monospace", whiteSpace: "pre-line", padding: "8px 12px", background: colors.bg, borderRadius: 8 }}>{r.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const { notes, setNote, user, signIn, signOutUser, loading, mode } = useNotes();
  const [activeSection, setActiveSection] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUnits = useMemo(() => {
    let filtered = units;
    if (activeSection !== "all") {
      const sec = sections.find(s => s.id === activeSection);
      if (sec) filtered = units.filter(u => sec.unitIds.includes(u.id));
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(u =>
        u.title.toLowerCase().includes(term) ||
        u.lessons.some(l =>
          l.title.toLowerCase().includes(term) ||
          l.los.some(lo => lo.title.toLowerCase().includes(term) || lo.code.toLowerCase().includes(term)) ||
          l.content.some(c => c.heading.toLowerCase().includes(term) || c.body.toLowerCase().includes(term))
        )
      );
    }
    return filtered;
  }, [activeSection, searchTerm]);

  const totalLOs = units.reduce((sum, u) => sum + u.lessons.reduce((s2, l) => s2 + l.los.length, 0), 0);
  const noteCount = Object.values(notes).filter(v => v && v.trim()).length;

  const currentSection = sections.find(s => s.id === activeSection);
  const sectionColor = currentSection ? currentSection.color : colors.accent;

  if (loading) {
    return (
      <div style={{ background: colors.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: colors.textMuted, fontFamily: "'IBM Plex Sans', sans-serif" }}>
        Loading your study companion...
      </div>
    );
  }

  return (
    <div style={{ background: colors.bg, minHeight: "100vh", color: colors.text, fontFamily: "'IBM Plex Sans', -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: colors.bg, borderBottom: `1px solid ${colors.border}`, padding: "16px 16px 12px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 11, color: colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 }}>Series 65 Study Companion</div>
            <h1 style={{ fontSize: 20, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>Complete Exam Prep — All 24 Units</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {noteCount > 0 && (
              <span style={{ fontSize: 11, color: colors.textMuted, background: colors.surface, padding: "4px 10px", borderRadius: 20 }}>
                {noteCount} note{noteCount !== 1 ? "s" : ""}
              </span>
            )}
            {/* Auth button */}
            {mode === "firebase" ? (
              user ? (
                <button
                  onClick={signOutUser}
                  style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, border: `1px solid ${colors.green}44`, background: colors.greenSoft, color: colors.green, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}
                  title={`Signed in as ${user.email} — notes sync across devices`}
                >
                  <span style={{ width: 6, height: 6, borderRadius: 3, background: colors.green, display: "inline-block" }} />
                  Synced
                </button>
              ) : (
                <button
                  onClick={signIn}
                  style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, border: `1px solid ${colors.orange}44`, background: colors.orangeSoft, color: colors.orange, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}
                >
                  Sign in to sync
                </button>
              )
            ) : (
              <span style={{ fontSize: 10, color: colors.textMuted, background: colors.surface, padding: "4px 8px", borderRadius: 20 }}>local</span>
            )}
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search topics, formulas, concepts..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: "100%", padding: "10px 14px", fontSize: 14, background: colors.surface, color: colors.text, border: `1px solid ${colors.border}`, borderRadius: 8, outline: "none", fontFamily: "inherit", boxSizing: "border-box", marginBottom: 10 }}
          onFocus={e => e.target.style.borderColor = colors.accent}
          onBlur={e => e.target.style.borderColor = colors.border}
        />

        {/* Section tabs */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <button
            onClick={() => setActiveSection("all")}
            style={{ padding: "6px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, border: `1px solid ${activeSection === "all" ? colors.accent : colors.border}`, background: activeSection === "all" ? colors.accentSoft : "transparent", color: activeSection === "all" ? colors.accent : colors.textMuted, cursor: "pointer", fontFamily: "inherit" }}
          >All Units</button>
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              style={{ padding: "6px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, border: `1px solid ${activeSection === sec.id ? sec.color : colors.border}`, background: activeSection === sec.id ? sec.color + "1a" : "transparent", color: activeSection === sec.id ? sec.color : colors.textMuted, cursor: "pointer", fontFamily: "inherit" }}
            >{sec.label}</button>
          ))}
        </div>

        {/* Section weight badge */}
        {currentSection && (
          <div style={{ marginTop: 8, fontSize: 11, color: sectionColor, fontWeight: 600 }}>
            {currentSection.examWeight}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "20px 16px 60px", maxWidth: 740, margin: "0 auto" }}>
        {/* Critical Rules (show in "all" or strategies) */}
        {(activeSection === "all" || activeSection === "strategies") && <CriticalRulesPanel />}

        {/* Formula sheet for current section */}
        {activeSection !== "all" && <FormulaSheet sectionId={activeSection} sectionColor={sectionColor} />}
        {activeSection === "all" && sections.map(sec => (
          <FormulaSheet key={sec.id} sectionId={sec.id} sectionColor={sec.color} />
        ))}

        {/* Units */}
        {filteredUnits.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: colors.textMuted }}>No matching topics found.</div>
        )}

        {filteredUnits.map(unit => (
          <div key={unit.id} style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Unit {unit.number}: {unit.title}</h2>
              <span style={{ fontSize: 11, fontWeight: 700, color: sectionColor, background: sectionColor + "1a", padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>{unit.examQuestions}</span>
            </div>
            {unit.lessons.map(lesson => (
              <LessonCard key={lesson.id} lesson={lesson} notes={notes} setNote={setNote} />
            ))}
            {/* Unit-level notes */}
            <div style={{ background: colors.surface, borderRadius: 12, padding: 18, marginTop: 8, border: `1px solid ${colors.border}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 4 }}>
                Unit {unit.number} — General Notes
              </div>
              <NotePad storageKey={`notes-unit${unit.number}-general`} notes={notes} setNote={setNote} />
            </div>
          </div>
        ))}

        {/* Footer */}
        <div style={{ marginTop: 32, padding: 20, background: colors.surface, borderRadius: 12, border: `1px solid ${colors.border}`, textAlign: "center" }}>
          <div style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.7 }}>
            Content aligned to Kaplan Series 65 License Exam Manual (12th Ed), Units 1–24.
            <br />Updated with SECURE 2.0, T+1 settlement, LIBOR→SOFR, digital assets, 2026 tax numbers.
            <br />Sources: Kaplan, NASAA Study Guide, Achievable, Dean Tinney, Test Geek, The Geek & The Guru Podcast.
            <br />140 questions · 130 scored · 92 correct to pass · 180 minutes
            <br /><span style={{ fontSize: 11, color: colors.textMuted }}>Notes saved {mode === "firebase" && user ? "to cloud (synced across devices)" : "locally on this device"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
