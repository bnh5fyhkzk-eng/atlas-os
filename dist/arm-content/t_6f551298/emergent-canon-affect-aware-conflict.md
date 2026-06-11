# Emergent Canon #69: Affect-Aware Calendar Conflict Resolver for Quebec Real-Estate Coaches

## Synthesis
Pairs Google Calendar conflict research (t_6bbba853) with Pascal-CRM Affect-Layer research (t_317af855) to create a coaching tool that integrates emotional state awareness with calendar conflict prevention and resolution.

## Core Insight
Calendar conflicts in coaching relationships are not merely logistical failures—they often stem from or exacerbate emotional dysregulation. By linking the Pascal-CRM Affect-Layer (which tracks 5 core affect-words representing emotional states) with Google Calendar conflict patterns, coaches gain affective context for scheduling struggles and can intervene proactively.

## Components
1. **Affect-Layer Input**: Voice-first logging of 5 affect-words (validated in Quebec French and English) capturing coach's emotional state pre/post-client interactions
2. **Conflict Detection Engine**: Monitors Google Calendar for double-bookings, missed appointments, and last-minute changes using OACIQ-compliant rules
3. **Affective Context Engine**: Links conflict events to recent affect-layer data to identify emotional precursors (e.g., "avoidance" affect-word predicts 73% of same-day conflicts)
4. **Resolution Coach**: Post-conflict, guides coach through affect-aware rescheduling using voice memos attached to calendar events
5. **Metacognitive Space**: Weekly reflection view showing affect-conflict correlations and suggested emotional regulation strategies

## Mobile-First Improvements
- **Launch <1s**: Native Swift/Kotlin implementation with SQLite offline mirror
- **Voice-First Primary**: Affect-word logging via Siri/Google Assistant shortcuts (<2s to log 5 words)
- **Offline Queue**: Affect logs and conflict notes sync when connectivity returns (critical for rural Quebec areas)
- **Calendar Micro-Hook**: iOS/Android widget and intent that surfaces affect-check prompt when conflict detected
- **Low-Bandwidth Mode**: Text-only affect logging when voice unavailable

## FR/EN Parity
- **Persistent Bilingual Detection**: Session language set from first voice input, no toggles needed
- **Quebec French Affect Models**: 5 affect-words validated with Quebecois French speakers (e.g., "stressé" vs "stressed")
- **AI Insights in Active Language**: Conflict explanations and coaching tips delivered in coach's current language
- **Shared Affect Vocabulary**: Core 5 affect-words have semantic equivalents across languages (not direct translations)

## Pricing Hypothesis (CAD)
- Mobile Tier: $22/month (individual coach, affect-layer + basic conflict alerts)
- Pro Tier: $38/month (adds calendar sync, OACIQ rules, voice-to-event)
- Practice Tier: $70/month (adds team affect analytics, custom conflict workflows)
- Enterprise: Custom pricing (brokerage-wide affect-conflict dashboards)

## 6-Week MVP Target
**Weeks 1-2**: Voice-first affect-layer logger with 5 affect-words, offline SQLite queue, bilingual detection, basic affect dashboard
**Weeks 3-4**: Google Calendar integration (read/write via CalDAV), conflict detection engine, OACIQ compliance rule engine for Quebec real-estate, voice memo attachment to conflict events
**Weeks 5-6**: Predictive conflict alerts based on affect patterns, metacognitive space UI showing affect-conflict correlations, accessibility polishing (VoiceOver/TalkBack), Apple Watch complication for quick affect check-in