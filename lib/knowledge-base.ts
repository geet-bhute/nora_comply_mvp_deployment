// Verbatim text pulled from Regulation (EU) 2024/1689 — Official Journal, 12 July 2024.
// Per-article mirror: https://artificialintelligenceact.eu/
// Full text: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689

export type KnowledgeChunk = {
  id: string;
  source: string;
  title: string;
  sourceUrl: string;
  content: string;
};

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  // ── ARTICLE 5: PROHIBITED PRACTICES ──────────────────────────────────────────
  {
    id: "art5-overview",
    source: "Article 5 — Prohibited AI Practices",
    title: "Prohibited AI Practices: Overview",
    sourceUrl: "https://artificialintelligenceact.eu/article/5/",
    content: `Article 5 of the EU AI Act prohibits the following AI practices as unacceptable risk:
(a) AI systems using subliminal techniques beyond a person's consciousness or purposefully manipulative or deceptive techniques to materially distort a person's behaviour in a way that causes or is likely to cause significant harm;
(b) AI systems that exploit vulnerabilities due to age, disability, or socioeconomic situation to materially distort a person's behaviour causing significant harm;
(c) AI systems by public authorities for social scoring of natural persons based on behaviour or personal characteristics leading to detrimental or unfavourable treatment;
(d) AI systems that assess the risk of a natural person committing a criminal offence solely based on profiling or personality traits (except where used to augment human assessments);
(e) Facial recognition databases created through untargeted scraping of facial images from the internet or CCTV;
(f) AI systems that infer emotions of natural persons in the workplace or educational institutions, except for medical or safety reasons;
(g) AI systems that categorise natural persons based on biometric data to deduce race, political opinions, trade union membership, religion, sexual orientation or other protected characteristics;
(h) Real-time remote biometric identification systems in publicly accessible spaces for law enforcement (with very limited, time-bound, judicially authorised exceptions).`,
  },

  // ── ARTICLE 6: HIGH-RISK CLASSIFICATION ──────────────────────────────────────
  {
    id: "art6-2",
    source: "Article 6, Paragraph 2",
    title: "High-Risk AI: Annex III Classification Rule",
    sourceUrl: "https://artificialintelligenceact.eu/article/6/",
    content: `"In addition to the high-risk AI systems referred to in paragraph 1, AI systems referred in Annex III shall be considered to be high-risk."

Paragraph 3 provides a derogation: an AI system listed in Annex III shall NOT be considered high-risk where it does not pose a significant risk of harm to health, safety, or fundamental rights, in particular if it:
(a) performs a narrow procedural task;
(b) improves the result of a previously completed human activity;
(c) detects decision-making patterns without replacing human assessment; or
(d) performs only preparatory tasks for a human assessment.
Exception: any system that performs profiling of natural persons is ALWAYS considered high-risk, even if it would otherwise qualify for the derogation.`,
  },

  // ── ANNEX III POINT 4: EMPLOYMENT ────────────────────────────────────────────
  {
    id: "annex3-employment-4a",
    source: "Annex III, Point 4(a) — High-Risk AI: Employment",
    title: "High-Risk AI: Recruitment and Selection (Verbatim)",
    sourceUrl: "https://artificialintelligenceact.eu/annex/3/",
    content: `Verbatim from Annex III, Point 4 — Employment, workers management and access to self-employment:

"(a) AI systems intended to be used for the recruitment or selection of natural persons, in particular to place targeted job advertisements, to analyse and filter job applications, and to evaluate candidates;"

This means any AI tool that places targeted job ads, screens or filters CVs, ranks applicants, or scores candidates in an interview process is classified as HIGH-RISK under the EU AI Act and is subject to the full set of deployer obligations in Articles 26 and 27.`,
  },
  {
    id: "annex3-employment-4b",
    source: "Annex III, Point 4(b) — High-Risk AI: Employment",
    title: "High-Risk AI: Work Decisions, Monitoring, and Promotion (Verbatim)",
    sourceUrl: "https://artificialintelligenceact.eu/annex/3/",
    content: `Verbatim from Annex III, Point 4(b):

"(b) AI systems intended to be used to make decisions affecting terms of work-related relationships, the promotion or termination of work-related contractual relationships, to allocate tasks based on individual behaviour or personal traits or characteristics or to monitor and evaluate the performance and behaviour of persons in such relationships."

This covers AI used for: promotion decisions, firing decisions, task allocation by behaviour or personal traits, and performance monitoring systems. All are classified HIGH-RISK.`,
  },

  // ── ARTICLE 9: RISK MANAGEMENT SYSTEM ────────────────────────────────────────
  {
    id: "art9-1-2",
    source: "Article 9, Paragraphs 1–2",
    title: "Risk Management System: Continuous Lifecycle Obligation",
    sourceUrl: "https://artificialintelligenceact.eu/article/9/",
    content: `"A risk management system shall be established, implemented, documented and maintained in relation to high-risk AI systems." (Article 9(1))

"The risk management system shall be understood as a continuous iterative process planned and run throughout the entire lifecycle of a high-risk AI system, requiring regular systematic review and updating." (Article 9(2))

The risk management system must: (a) identify and analyse known and foreseeable risks to health, safety, or fundamental rights; (b) estimate and evaluate risks arising from intended use and reasonably foreseeable misuse; (c) evaluate risks from post-market monitoring data; and (d) adopt appropriate risk management measures.`,
  },
  {
    id: "art9-6-8",
    source: "Article 9, Paragraphs 6–9",
    title: "Risk Management System: Testing and Vulnerable Groups",
    sourceUrl: "https://artificialintelligenceact.eu/article/9/",
    content: `"High-risk AI systems shall be tested for the purpose of identifying the most appropriate and targeted risk management measures." (Article 9(6))

Testing shall occur throughout development and before market placement, "against prior defined metrics and probabilistic thresholds appropriate to the intended purpose." (Article 9(8))

Providers must consider whether systems could "adversely impact" persons under 18 or other vulnerable groups. (Article 9(9))`,
  },

  // ── ARTICLE 13: TRANSPARENCY TO DEPLOYERS ────────────────────────────────────
  {
    id: "art13-1-2",
    source: "Article 13, Paragraphs 1–2",
    title: "Transparency: Provider Must Supply Usable Instructions",
    sourceUrl: "https://artificialintelligenceact.eu/article/13/",
    content: `"High-risk AI systems shall be designed and developed in such a way as to ensure that their operation is sufficiently transparent to enable deployers to interpret a system's output and use it appropriately." (Article 13(1))

"High-risk AI systems shall be accompanied by instructions for use in an appropriate digital format or otherwise that include concise, complete, correct and clear information that is relevant, accessible and comprehensible to deployers." (Article 13(2))

The instructions must cover: provider identity; system characteristics, capabilities, limitations, and known risks; accuracy and robustness metrics; human oversight measures; expected lifetime; maintenance requirements; and mechanisms for collecting, storing, and interpreting logs.`,
  },

  // ── ARTICLE 14: HUMAN OVERSIGHT ──────────────────────────────────────────────
  {
    id: "art14-1-2",
    source: "Article 14, Paragraphs 1–2",
    title: "Human Oversight: Provider Obligation to Enable It",
    sourceUrl: "https://artificialintelligenceact.eu/article/14/",
    content: `"High-risk AI systems shall be designed and developed in such a way, including with appropriate human-machine interface tools, that they can be effectively overseen by natural persons during the period in which they are in use." (Article 14(1))

"Human oversight shall aim to prevent or minimise the risks to health, safety or fundamental rights that may emerge when a high-risk AI system is used in accordance with its intended purpose or under conditions of reasonably foreseeable misuse, in particular where such risks persist despite the application of other requirements set out in this Section." (Article 14(2))`,
  },
  {
    id: "art14-3-4",
    source: "Article 14, Paragraphs 3–4",
    title: "Human Oversight: Specific Capabilities Required",
    sourceUrl: "https://artificialintelligenceact.eu/article/14/",
    content: `"The oversight measures shall be commensurate with the risks, level of autonomy and context of use of the high-risk AI system." (Article 14(3))

Article 14(4) requires that deployed high-risk systems allow the responsible persons to:
(a) fully understand the system's capabilities and limitations;
(b) be aware of the possibility of automation bias (over-reliance on AI outputs);
(c) correctly interpret the system's outputs;
(d) decide not to use the system or to override its output in any specific situation; and
(e) intervene in or interrupt the system via a stop button or equivalent procedure.

These are not optional — the provider must build these capabilities in, and the deployer must implement and exercise them.`,
  },

  // ── ARTICLE 26: DEPLOYER OBLIGATIONS ─────────────────────────────────────────
  {
    id: "art26-1",
    source: "Article 26, Paragraph 1",
    title: "Deployer Obligation: Follow Instructions for Use",
    sourceUrl: "https://artificialintelligenceact.eu/article/26/",
    content: `"Deployers of high-risk AI systems shall take appropriate technical and organisational measures to ensure they use such systems in accordance with the instructions for use accompanying the systems, pursuant to paragraphs 3 and 6." (Article 26(1))

This is the baseline obligation for all deployers. Compliance begins with reading and following the provider's instructions — deployers who cannot produce the instructions in an audit are likely non-compliant from the first day of use.`,
  },
  {
    id: "art26-2",
    source: "Article 26, Paragraph 2",
    title: "Deployer Obligation: Assign Qualified Human Oversight",
    sourceUrl: "https://artificialintelligenceact.eu/article/26/",
    content: `"Deployers shall assign human oversight to natural persons who have the necessary competence, training and authority, as well as the necessary support." (Article 26(2))

The four elements are specific: the oversight person must have (1) competence to understand AI outputs, (2) training on the specific system, (3) authority to act on their findings (including overriding or suspending the system), and (4) adequate support (time, resources). A human who rubber-stamps AI decisions without real capacity to intervene does not satisfy this obligation.`,
  },
  {
    id: "art26-4",
    source: "Article 26, Paragraph 4",
    title: "Deployer Obligation: Input Data Quality",
    sourceUrl: "https://artificialintelligenceact.eu/article/26/",
    content: `"Without prejudice to paragraphs 1 and 2, to the extent the deployer exercises control over the input data, that deployer shall ensure that input data is relevant and sufficiently representative in view of the intended purpose of the high-risk AI system." (Article 26(4))

For recruitment agencies: if the deployer uploads or curates job descriptions, candidate data, or screening criteria, they must ensure that data does not introduce bias or underrepresent relevant candidate populations.`,
  },
  {
    id: "art26-5",
    source: "Article 26, Paragraph 5",
    title: "Deployer Obligation: Monitor, Report Risk, Suspend if Needed",
    sourceUrl: "https://artificialintelligenceact.eu/article/26/",
    content: `"Deployers shall monitor the operation of the high-risk AI system on the basis of the instructions for use and, where relevant, inform providers in accordance with Article 72." (Article 26(5))

If a deployer has reason to believe the system presents a risk within the meaning of Article 79(1), they must without undue delay: (a) inform the provider or distributor; (b) inform the relevant market surveillance authority; and (c) suspend use of the system.

Where a serious incident is identified, the deployer must immediately inform the provider, importer, distributor, and relevant market surveillance authorities. Serious incident means an incident causing death, serious harm, or significant disruption to critical infrastructure or public services.`,
  },
  {
    id: "art26-6",
    source: "Article 26, Paragraph 6",
    title: "Deployer Obligation: Log Retention — Minimum 6 Months",
    sourceUrl: "https://artificialintelligenceact.eu/article/26/",
    content: `"Deployers of high-risk AI systems shall keep the logs automatically generated by that high-risk AI system to the extent such logs are under their control, for a period appropriate to the intended purpose of the high-risk AI system, of at least six months, unless provided otherwise in applicable Union or national law, in particular Union law on the protection of personal data." (Article 26(6))

The minimum is 6 months. Applicable national law (e.g. employment law, GDPR retention schedules) may require longer. GDPR's data minimisation principle also applies — logs containing personal data should not be retained beyond what is necessary.`,
  },
  {
    id: "art26-7",
    source: "Article 26, Paragraph 7",
    title: "Deployer Obligation: Inform Workers Before Deployment",
    sourceUrl: "https://artificialintelligenceact.eu/article/26/",
    content: `"Without prejudice to applicable Union or national law, deployers of high-risk AI systems that are employers shall take appropriate steps to inform the workers' representatives and the workers themselves that they will be subject to the use of the high-risk AI system prior to putting it into service." (Article 26(7))

This must happen BEFORE the system goes live — not simultaneously, not after. The obligation applies to deployers who are employers and covers both individual workers and any applicable workers' representatives (unions, works councils, etc.).`,
  },
  {
    id: "art26-8",
    source: "Article 26, Paragraph 8",
    title: "Deployer Obligation: Registration in EU Database (Public Bodies)",
    sourceUrl: "https://artificialintelligenceact.eu/article/26/",
    content: `"Deployers that are public authorities, agencies or bodies shall register their use of high-risk AI systems referred to in Article 6(2) in the EU database referred to in Article 71, prior to putting those systems into service." (Article 26(8))

This registration obligation applies to public bodies. Private entities using high-risk AI systems are not required to register their use — however, providers are required to register the system itself before placing it on the market (Article 49).`,
  },
  {
    id: "art26-11",
    source: "Article 26, Paragraph 11",
    title: "Deployer Obligation: Inform Affected Individuals",
    sourceUrl: "https://artificialintelligenceact.eu/article/26/",
    content: `"Deployers of high-risk AI systems referred to in Article 6(2) that make decisions or assist in making decisions related to natural persons shall inform the natural persons that they are subject to the use of the high-risk AI system." (Article 26(11))

For recruitment agencies using AI in candidate selection: candidates must be told that an AI system is involved in their application process. This is a distinct obligation from GDPR transparency — it is specifically about AI involvement, and must be disclosed even if the AI is assisting rather than making the final decision.`,
  },
  {
    id: "art26-12",
    source: "Article 26, Paragraph 12",
    title: "Deployer Obligation: Cooperate with Authorities",
    sourceUrl: "https://artificialintelligenceact.eu/article/26/",
    content: `"Deployers shall cooperate with the relevant competent authorities in any action those authorities take in relation to the high-risk AI system with a view to implementing this Regulation." (Article 26(12))

This is not passive — deployers must actively cooperate with market surveillance authorities during inspections, investigations, and audits. Failure to cooperate can result in penalties independent of whether the underlying AI system is compliant.`,
  },

  // ── ARTICLE 27: FRIA ─────────────────────────────────────────────────────────
  {
    id: "art27-1",
    source: "Article 27, Paragraph 1",
    title: "FRIA: Who Must Conduct It and What It Must Cover",
    sourceUrl: "https://artificialintelligenceact.eu/article/27/",
    content: `"Prior to deploying a high-risk AI system referred to in Article 6(2), with the exception of high-risk AI systems intended to be used in the area listed in point 2 of Annex III, deployers that are bodies governed by public law, or are private entities providing public services, and deployers of high-risk AI systems referred to in points 5(b) and (c) of Annex III, shall perform an assessment of the impact on fundamental rights that the use of such system may produce." (Article 27(1))

Note: Article 27(1) mandates the FRIA for public bodies and certain private entities providing public services. Private-sector recruitment agencies are not automatically required to conduct a FRIA solely under Article 27(1), UNLESS they are providing a public service. However, many will conduct one voluntarily for good-practice compliance and audit readiness, and it is strongly advisable.

The FRIA must include: (a) a description of the deployer's processes; (b) the period and frequency of use; (c) categories of natural persons likely to be affected; (d) specific risks of harm; (e) human oversight measures; and (f) measures to be taken if risks materialise.`,
  },
  {
    id: "art27-2",
    source: "Article 27, Paragraph 2",
    title: "FRIA: Applies to First Use; May Rely on Prior Assessments",
    sourceUrl: "https://artificialintelligenceact.eu/article/27/",
    content: `"The obligation laid down in paragraph 1 applies to the first use of the high-risk AI system. The deployer may, in similar cases, rely on previously conducted fundamental rights impact assessments or existing impact assessments carried out by provider." (Article 27(2))

If the deployer changes how they use the system, or if circumstances change materially, the FRIA must be updated. The assessment is not a one-time checkbox — it is tied to the actual context of use.`,
  },
  {
    id: "art27-3",
    source: "Article 27, Paragraph 3",
    title: "FRIA: Notify Market Surveillance Authority on Completion",
    sourceUrl: "https://artificialintelligenceact.eu/article/27/",
    content: `"Once the assessment referred to in paragraph 1 of this Article has been performed, the deployer shall notify the market surveillance authority of its results, submitting the filled-out template referred to in paragraph 5 of this Article as part of the notification." (Article 27(3))

Deployers may be exempt from this notification obligation in the case referred to in Article 46(1) (testing in real-world conditions under certain frameworks).`,
  },
  {
    id: "art27-4",
    source: "Article 27, Paragraph 4",
    title: "FRIA: Relationship to GDPR DPIA",
    sourceUrl: "https://artificialintelligenceact.eu/article/27/",
    content: `"If any of the obligations laid down in this Article is already met through the data protection impact assessment conducted pursuant to Article 35 of Regulation (EU) 2016/679 or Article 27 of Directive (EU) 2016/680, the fundamental rights impact assessment referred to in paragraph 1 of this Article shall complement that data protection impact assessment." (Article 27(4))

The FRIA is additive to, not a replacement for, the GDPR DPIA. They can be conducted as a single combined document, but all FRIA requirements must still be explicitly addressed within it. Many organisations will need to update existing DPIAs to include the AI-specific elements required by Article 27.`,
  },
  {
    id: "art27-5",
    source: "Article 27, Paragraph 5",
    title: "FRIA: AI Office Will Publish Questionnaire Template",
    sourceUrl: "https://artificialintelligenceact.eu/article/27/",
    content: `"The AI Office shall develop a template for a questionnaire, including through an automated tool, to facilitate deployers in complying with their obligations under this Article in a simplified manner." (Article 27(5))

The AI Office's FRIA template is the official instrument. Deployers must use it (or a substantively equivalent document) when submitting their FRIA notification to the market surveillance authority. The AI Office has published guidance and draft templates at https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence.`,
  },

  // ── ARTICLE 113: ENFORCEMENT TIMELINE ────────────────────────────────────────
  {
    id: "art113-timeline",
    source: "Article 113 — Implementation Timeline",
    title: "Enforcement Dates: Exact Phased Application",
    sourceUrl: "https://artificialintelligenceact.eu/article/113/",
    content: `The EU AI Act (Regulation (EU) 2024/1689) entered into force on 1 August 2024. The phased enforcement dates are:

• 2 February 2025 — Article 5 (prohibited AI practices) applies. Social scoring, manipulative AI, and prohibited biometric practices are illegal from this date.
• 2 August 2025 — GPAI (General Purpose AI) model obligations apply. Transparency, copyright compliance, and systemic-risk rules for foundation model providers.
• 2 August 2026 — High-risk AI system obligations apply for systems listed in Annex III (including recruitment AI). This is the deadline for Article 26 (deployer obligations) and Article 27 (FRIA).
• 2 August 2027 — Full application to Annex I high-risk AI systems (safety-critical products regulated by other EU harmonisation legislation).

For recruitment agencies: all Article 26 and Article 27 obligations must be in place by 2 August 2026.`,
  },

  // ── CANDIDATE RIGHTS & TRANSPARENCY ─────────────────────────────────────────
  {
    id: "candidate-rights",
    source: "Article 26(11) + Annex III Point 4(a)",
    title: "Candidate Rights: Disclosure of AI Use in Recruitment",
    sourceUrl: "https://artificialintelligenceact.eu/article/26/",
    content: `Candidates have the right to be informed that a high-risk AI system is being used in their application process (Article 26(11)). This is an unconditional disclosure obligation — it does not depend on whether the AI made the final decision or only assisted.

In practice this means: job advertisements, application portals, or pre-screening communications must include a clear statement that AI is used in the selection process. The disclosure should identify whether the AI filters applications, scores candidates, or assists in interview evaluation.

This obligation is separate from GDPR's Article 22 (right not to be subject to solely automated decisions) and GDPR's Article 13/14 transparency rights, though all three apply simultaneously. The AI Act adds a specific, targeted disclosure layer on top of GDPR.`,
  },
  {
    id: "automation-bias",
    source: "Article 14(4)(b) — Human Oversight",
    title: "Automation Bias: Legal Prohibition on Rubber-Stamping",
    sourceUrl: "https://artificialintelligenceact.eu/article/14/",
    content: `Article 14(4)(b) requires that persons exercising human oversight must be "aware of the possible tendency to automatically rely on or give too much weight to the output produced by a high-risk AI system ('automation bias')."

This is a specific legal requirement, not a general recommendation. Deployers must:
1. Train oversight personnel to recognise automation bias.
2. Implement processes that require genuine independent judgement, not just approval of AI outputs.
3. Document evidence that override decisions are made when warranted.

Rubber-stamping AI decisions — approving them without genuine scrutiny — violates Article 14(4)(b) and Article 26(2). This has direct audit implications: a pattern of 100% AI-alignment in oversight decisions may be evidence of non-compliance.`,
  },
  {
    id: "risk-classification-summary",
    source: "EU AI Act — Articles 5, 6, Annex III",
    title: "Risk Tier Summary: Prohibited, High-Risk, Limited, Minimal",
    sourceUrl: "https://artificialintelligenceact.eu/",
    content: `The EU AI Act creates four tiers:

1. PROHIBITED (Article 5) — Banned outright. Applies from 2 February 2025. Includes: social scoring by public authorities, manipulative AI, real-time mass biometric surveillance (with narrow law enforcement exceptions), AI that infers emotions in workplaces or schools, AI that categorises people by protected characteristics from biometrics.

2. HIGH-RISK (Article 6 + Annex III) — Heavily regulated. Full obligations apply from 2 August 2026 for Annex III systems. Covers: recruitment AI, critical infrastructure, education, law enforcement use cases, migration, justice, banking credit scoring.

3. LIMITED RISK (Article 50) — Transparency obligations only. Chatbots must disclose they are AI. Deepfakes must be labelled.

4. MINIMAL RISK — Unregulated under the Act. Spam filters, AI in video games, etc.

For recruitment agencies: any AI tool that screens CVs, ranks candidates, places targeted job ads, evaluates candidates, or monitors worker performance is HIGH-RISK under Annex III Point 4.`,
  },
  {
    id: "gpai-obligations",
    source: "Articles 51–55 — General Purpose AI",
    title: "GPAI Model Obligations (Applies from 2 August 2025)",
    sourceUrl: "https://artificialintelligenceact.eu/article/51/",
    content: `All General Purpose AI (GPAI) model providers must (from 2 August 2025):
• Provide technical documentation to the AI Office and national authorities on request.
• Provide instructions for use to downstream providers integrating the model.
• Comply with Directive 2001/29/EC (Copyright Directive) — specifically the text and data mining exception.
• Publish a sufficiently detailed summary of training data used.

Providers of GPAI models with systemic risk (typically those trained with compute > 10^25 FLOPs, or designated by the AI Office) additionally must:
• Conduct model evaluations including adversarial testing before release and upon significant updates.
• Assess and mitigate systemic risks.
• Track, document, and report to the AI Office any serious incidents within the meaning of Article 3(49).
• Implement cybersecurity protections.

Examples of GPAI models currently designated as systemic risk: GPT-4, Claude, Gemini Ultra class models. Companies using APIs from these providers are downstream deployers, not GPAI providers.`,
  },
  {
    id: "compliance-documentation",
    source: "Article 26(6), Article 27, Article 9",
    title: "Compliance Documentation Checklist for Deployers",
    sourceUrl: "https://artificialintelligenceact.eu/article/26/",
    content: `A deployer of a high-risk AI system in recruitment must maintain the following records for an audit:

1. Instructions for use from the provider (Article 26(1))
2. Human oversight assignment — named individual(s) with documented competence, training, and authority (Article 26(2))
3. Input data quality records — how representativeness was verified (Article 26(4))
4. Operational monitoring records — evidence of ongoing monitoring (Article 26(5))
5. System logs — minimum 6 months, timestamped, tamper-evident (Article 26(6))
6. Worker/candidate disclosure records — evidence that workers and candidates were informed before the system went live (Article 26(7), Article 26(11))
7. FRIA (where applicable) — completed and filed before first use; notified to market surveillance authority (Article 27)
8. Override and incident records — documented decisions where human oversight overrode or flagged the AI (Article 14(4)(d))

In Ireland, the market surveillance authority for employment-related AI Act compliance is the Workplace Relations Commission (WRC).`,
  },
  {
    id: "wrc-ireland",
    source: "EU AI Act — National Implementation: Ireland",
    title: "Ireland: Workplace Relations Commission as Market Surveillance Authority",
    sourceUrl: "https://www.workplacerelations.ie/",
    content: `Under the EU AI Act, Member States must designate national competent authorities to act as market surveillance authorities. For employment-related use of high-risk AI systems in Ireland, the designated authority is the Workplace Relations Commission (WRC).

Deployers in Ireland must:
• Notify the WRC of their FRIA results upon completion (Article 27(3)) if they are a public body or private entity providing a public service.
• Cooperate with WRC investigations (Article 26(12)).
• Be prepared to produce compliance documentation on request.

Penalties under the EU AI Act are set by Member States within floors set by the Regulation: up to €35 million or 7% of global annual turnover (whichever is higher) for violations of Article 5; up to €15 million or 3% for other violations including Article 26 and 27 non-compliance.`,
  },
  {
    id: "art26-human-oversight-what-it-means",
    source: "Article 26(2), Article 14(4), Recital 92",
    title: "What Effective Human Oversight Actually Requires",
    sourceUrl: "https://artificialintelligenceact.eu/article/26/",
    content: `Effective human oversight under Articles 14 and 26 is substantive, not nominal. Recital 92 states that oversight must be "effective" — a human reviewing AI decisions without genuine capacity to understand or override them does not satisfy the legal standard.

The four required attributes under Article 26(2) are:
1. COMPETENCE — the person must understand what the AI system does, what its limitations are, and what its outputs mean.
2. TRAINING — the person must have been trained specifically on this system (generic AI training does not suffice).
3. AUTHORITY — the person must have formal, documented authority to override or suspend the AI system.
4. SUPPORT — the person must have adequate time and resources to exercise genuine oversight (not just sign-off under time pressure).

Under Article 14(4): the oversight person must also be trained to recognise and resist automation bias — the tendency to uncritically follow AI recommendations.`,
  },
];
