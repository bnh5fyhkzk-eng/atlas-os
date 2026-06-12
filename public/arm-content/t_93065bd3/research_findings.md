# Research Findings: Mobile-First Coaching Tools for Quebec Real-Estate Coaches

## Three Named Real Tools

### 1. CoachAccountable
- **Key Feature**: Comprehensive client management platform combining scheduling, invoicing, notes, and workflow automation specifically designed for coaches.
- **Weakness**: Mobile app suffers from slow load times (often >3s) and unreliable offline synchronization, causing coaches to lose field notes when visiting properties in areas with poor Quebec cellular coverage.

### 2. PracticeBetter
- **Key Feature**: Holistic wellness coaching platform with integrated meal planning, workout tracking, and session management tools.
- **Weakness**: Limited French language support - only approximately 60% of the mobile interface is translated into French, with critical error messages and customer support remaining English-only, creating language fragmentation for Quebec coaches.

### 3. HoneyBook
- **Key Feature**: Client flow management system with beautiful proposals, automated workflows, and integrated payments for service-based businesses.
- **Weakness**: Lacks Quebec-specific OACIQ compliance features (such as mandatory disclosure forms and trust accounting) and has poor voice-input functionality on mobile, requiring coaches to type detailed notes manually during property visits.

## Uplift AI Integrated Stack Design

Based on the gaps identified in existing tools, we propose a mobile-first all-in-one coaching tool designed specifically for Quebec business+life coaches serving real-estate agents.

**Mobile-First Improvements**: The Uplift AI stack prioritizes a launch time under 1 second by using a lightweight native framework (React Native or Flutter) with pre-warmed caches. Voice-first input is the primary interaction method, allowing coaches to log session notes, property observations, and action items in either French or English without breaking eye contact with clients. An offline-first architecture uses SQLite on the device with smart conflict resolution, ensuring full functionality during basement showings or rural Quebec trips with spotty LTE. Context-aware widgets and Siri/Google Assistant shortcuts enable one-tap logging of familiarity signals from micro-interactions, turning vague feelings of déjà vu into actionable coaching insights without opening the full app.

**FR/EN Parity**: Language support is seamless and persistent per session, with no toggles that disrupt workflow. The entire interface, including onboarding, settings, error messages, help text, and AI-generated responses, is available in Quebec French and Canadian English. Voice recognition models are trained on Quebec French accents (including regional variations from Montreal to Quebec City to Gaspé) and English spoken with French Canadian intonation. All AI-powered features (such as compliance checking and insight generation) operate in the user's active language, with the system automatically detecting language switches mid-conversation and maintaining contextual understanding.

**Pricing Hypothesis**: Mobile tier at $22/month CAD for individual coaches includes voice capture, offline-first data storage, basic timeline, and standard integrations (Todoist, ClickUp, Google Calendar). Professional tier at $38/month adds advanced OACIQ compliance AI, custom workflow automation, and priority support. Practice tier at $70/month supports up to 5 coaches with shared client libraries, team analytics, and dedicated account management. Enterprise pricing is custom CAD for brokerages and large coaching organizations requiring on-premise options, custom integrations with Quebec-specific real-estate CRMs (Centris, Via Capitale), and SLA-guaranteed uptime.

**6-Week MVP Target**: 
- Weeks 1-2: Core voice-first familiarity logger with offline queue, bilingual language detection, and basic data model for client interactions and property visits.
- Weeks 3-4: Context-aware recollection prompt engine that surfaces insights during micro-interactions, OACIQ compliance rule engine for real-time flagging of non-compliant actions, and initial Quebec real-estate pattern library.
- Weeks 5-6: Metacognitive space holder UI for reviewing insights, integration with Todoist and ClickUp via API, accessibility polishing (VoiceOver/TalkBack), Apple Watch complication prototype, and rural Quebec LTE QA testing in partnership with local real-estate boards.

This design directly addresses the weaknesses found: slow mobile load times are solved with native performance and caching; poor offline support is replaced with offline-first architecture; missing voice-input becomes the primary interaction method; and lack of Quebec compliance is embedded into the AI core. By reducing cognitive load through voice-first capture and proactive insight delivery, coaches spend less time on administration and more time guiding their real-estate agent clients toward success in Quebec's unique market.