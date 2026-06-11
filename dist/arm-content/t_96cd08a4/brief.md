# DAILY-BUILD-2026-06-05 · spine-page-completion · question-everything · what-could-go-wrong + adjacent-possibilities + assumptions-to-test · 1-page · save /tmp/daily-build-2026-06-05-curiosity.md

## Brief



## Worker Summary

DAILY-BUILD-2026-06-05 completed

Comments (1):
  [2026-06-08 16:04] curiosity-arm: ## Completion handoff

**What exists:** `/tmp/daily-build-2026-06-05-curiosity.md` (58 lines, 8.7KB) — written by a prior run that crashed due to protocol violation (exited without kanban_complete). File content is complete and correct.

**6 sections covered:**
1. Question-everything (Q1-Q3) — /spine as React page vs daemon, /spine vs /arms-compare overlap, felt-layer data pipeline gap
2. What could go wrong (W1-W4) — brain-v3 read-endpoint blocked, DB corruption death spiral, scope-creep between phases, orchestrator cron amplifying DB corruption
3. Adjacent possibilities (A1-A4) — CLI spine, MCP server spine, PROUT model for arm phases, kanban-as-spine
4. Assumptions to test (4) — including self-referential test: can this task even complete given DB corruption?
5. Unexpected finding — all agentic-OS builders solve with GRAPH, not dashboard; /spine building flat cards over a graph substrate
6. Next question — spine→brain or brain→spine data direction determines entire architecture

**Sources cited:** me-os-design-doc, atlas-complete-plan, curriculum transcripts (Graph AI, Hermes ecosystem, Karpathy-adjacent channels), PROJECT-CONTEXT.md, operational-fix docs, brother canon references

**No rebuild needed —** file is final, just needs formal completion call.

Events (11701):
  [2026-06-08 15:47] promoted
  [2026-06-08 15:47] [run 22216] claimed {'lock': 'srv1704173:2649783', 'expires': 1780934542, 'run_id': 22216}
  [2026-06-08 15:47] [run 22216] spawned {'pid': 3254206}
  [2026-06-08 15:48] [run 22216] protocol_violation {'pid': 3254206, 'claimer': 'srv1704173:2649783', 'exit_code': 0}
  [2026-06-08 15:48] gave_up {'failures': 1, 'effective_limit': 1, 'limit_source': 'dispatcher', 'error': 'worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation', 'trigger_outcome': 'crashed', 'pid': 3254206, 'claimer': 'srv1704173:2649783'}
  [2026-06-08 15:48] promoted
  [2026-06-08 15:48] [run 22225] claimed {'lock': 'srv1704173:2649783', 'expires': 1780934603, 'run_id': 22225}
  [2026-06-08 15:48] [run 22225] spawned {'pid': 3255111}
  [2026-06-08 15:49] [run 22225] protocol_violation {'pid': 3255111, 'claimer': 'srv1704173:2649783', 'exit_code': 0}
  [2026-06-08 15:49] gave_up {'failures': 1, 'effective_limit': 1, 'limit_source': 'dispatcher', 'error': 'worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation', 'trigger_outcome': 'crashed', 'pid': 3255111, 'claimer': 'srv1704173:2649783'}
  [2026-06-08 15:49] promoted
  [2026-06-08 15:49] [run 22234] claimed {'lock': 'srv1704173:2649783', 'expires': 1780934663, 'run_id': 22234}
  [2026-06-08 15:49] [run 22234] spawned {'pid': 3256200}
  [2026-06-08 16:03] [run 22234] protocol_violation {'pid': 3256200, 'claimer': 'srv1704173:2649783', 'exit_code': 0}
  [2026-06-08 16:03] gave_up {'failures': 1, 'effective_limit': 1, 'limit_source': 'dispatcher', 'error': 'worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation', 'trigger_outcome': 'crashed', 'pid': 3256200, 'claimer': 'srv1704173:2649783'}
  [2026-06-08 16:03] promoted
  [2026-06-08 16:03] [run 22243] claimed {'lock': 'srv1704173:2649783', 'expires': 1780935507, 'run_id': 22243}
  [2026-06-08 16:03] [run 22243] spawned {'pid': 3293450}
  [2026-06-08 16:03] [run 22243] heartbeat {'note': 'Orient phase — reading prior run artifacts and PROJECT-CONTEXT'}
  [2026-06-08 16:04] commented {'author': 'curiosity-arm', 'len': 1277}

Runs (2369):
  #2905 crashed      @curiosity-arm  40s  2026-06-05 16:30
        ! pid 2067089 not alive
  #2906 crashed      @curiosity-arm  20s  2026-06-05 16:31
        ! pid 2068487 not alive
  #2907 crashed      @curiosity-arm  10s  2026-06-05 16:31
        ! pid 2068896 not alive
  #2908 crashed      @curiosity-arm  30s  2026-06-05 16:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2909 crashed      @curiosity-arm  20s  2026-06-05 16:32
        ! pid 2069305 not alive
  #2910 crashed      @curiosity-arm  10s  2026-06-05 16:32
        ! pid 2069378 not alive
  #2911 crashed      @curiosity-arm  30s  2026-06-05 16:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2912 crashed      @curiosity-arm  21s  2026-06-05 16:33
        ! pid 2069792 not alive
  #2913 crashed      @curiosity-arm  9s  2026-06-05 16:33
        ! pid 2069919 not alive
  #2914 crashed      @curiosity-arm  30s  2026-06-05 16:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2915 crashed      @curiosity-arm  22s  2026-06-05 16:34
        ! pid 2070259 not alive
  #2916 crashed      @curiosity-arm  8s  2026-06-05 16:34
        ! pid 2070428 not alive
  #2917 crashed      @curiosity-arm  30s  2026-06-05 16:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2918 crashed      @curiosity-arm  22s  2026-06-05 16:35
        ! pid 2070863 not alive
  #2919 crashed      @curiosity-arm  8s  2026-06-05 16:35
        ! pid 2071135 not alive
  #2920 crashed      @curiosity-arm  30s  2026-06-05 16:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2921 crashed      @curiosity-arm  21s  2026-06-05 16:36
        ! pid 2071612 not alive
  #2922 crashed      @curiosity-arm  9s  2026-06-05 16:36
        ! pid 2073304 not alive
  #2923 crashed      @curiosity-arm  30s  2026-06-05 16:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2924 crashed      @curiosity-arm  22s  2026-06-05 16:37
        ! pid 2073763 not alive
  #2925 crashed      @curiosity-arm  8s  2026-06-05 16:37
        ! pid 2073883 not alive
  #2926 crashed      @curiosity-arm  30s  2026-06-05 16:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2927 crashed      @curiosity-arm  22s  2026-06-05 16:38
        ! pid 2074098 not alive
  #2928 crashed      @curiosity-arm  8s  2026-06-05 16:38
        ! pid 2074187 not alive
  #2929 crashed      @curiosity-arm  30s  2026-06-05 16:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2930 crashed      @curiosity-arm  23s  2026-06-05 16:39
        ! pid 2075337 not alive
  #2931 crashed      @curiosity-arm  7s  2026-06-05 16:39
        ! pid 2086855 not alive
  #2932 crashed      @curiosity-arm  30s  2026-06-05 16:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2933 crashed      @curiosity-arm  24s  2026-06-05 16:40
        ! pid 2102999 not alive
  #2934 crashed      @curiosity-arm  6s  2026-06-05 16:40
        ! pid 2113705 not alive
  #2935 crashed      @curiosity-arm  30s  2026-06-05 16:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2936 crashed      @curiosity-arm  24s  2026-06-05 16:41
        ! pid 2130145 not alive
  #2937 crashed      @curiosity-arm  6s  2026-06-05 16:41
        ! pid 2142211 not alive
  #2938 crashed      @curiosity-arm  30s  2026-06-05 16:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2939 crashed      @curiosity-arm  24s  2026-06-05 16:42
        ! pid 2160402 not alive
  #2940 crashed      @curiosity-arm  6s  2026-06-05 16:42
        ! pid 2171466 not alive
  #2941 crashed      @curiosity-arm  30s  2026-06-05 16:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2942 crashed      @curiosity-arm  24s  2026-06-05 16:43
        ! pid 2189269 not alive
  #2943 crashed      @curiosity-arm  6s  2026-06-05 16:43
        ! pid 2201783 not alive
  #2944 crashed      @curiosity-arm  30s  2026-06-05 16:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2945 crashed      @curiosity-arm  24s  2026-06-05 16:44
        ! pid 2205194 not alive
  #2946 crashed      @curiosity-arm  6s  2026-06-05 16:44
        ! pid 2205301 not alive
  #2947 crashed      @curiosity-arm  30s  2026-06-05 16:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2948 crashed      @curiosity-arm  24s  2026-06-05 16:45
        ! pid 2205515 not alive
  #2949 crashed      @curiosity-arm  6s  2026-06-05 16:45
        ! pid 2205635 not alive
  #2950 crashed      @curiosity-arm  30s  2026-06-05 16:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2951 crashed      @curiosity-arm  25s  2026-06-05 16:46
        ! pid 2205872 not alive
  #2952 crashed      @curiosity-arm  5s  2026-06-05 16:46
        ! pid 2206066 not alive
  #2953 crashed      @curiosity-arm  30s  2026-06-05 16:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2954 crashed      @curiosity-arm  25s  2026-06-05 16:47
        ! pid 2206321 not alive
  #2955 crashed      @curiosity-arm  5s  2026-06-05 16:47
        ! pid 2206445 not alive
  #2956 crashed      @curiosity-arm  30s  2026-06-05 16:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2957 crashed      @curiosity-arm  25s  2026-06-05 16:48
        ! pid 2206711 not alive
  #2958 crashed      @curiosity-arm  5s  2026-06-05 16:48
        ! pid 2206834 not alive
  #2959 crashed      @curiosity-arm  30s  2026-06-05 16:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2960 crashed      @curiosity-arm  25s  2026-06-05 16:49
        ! pid 2207030 not alive
  #2961 crashed      @curiosity-arm  5s  2026-06-05 16:49
        ! pid 2207132 not alive
  #2962 crashed      @curiosity-arm  30s  2026-06-05 16:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2963 crashed      @curiosity-arm  25s  2026-06-05 16:50
        ! pid 2207478 not alive
  #2964 crashed      @curiosity-arm  5s  2026-06-05 16:50
        ! pid 2208031 not alive
  #2965 crashed      @curiosity-arm  30s  2026-06-05 16:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2966 crashed      @curiosity-arm  25s  2026-06-05 16:51
        ! pid 2208462 not alive
  #2967 crashed      @curiosity-arm  35s  2026-06-05 16:51
        ! pid 2208710 not alive
  #2969 crashed      @curiosity-arm  26s  2026-06-05 16:52
        ! pid 2209138 not alive
  #2971 crashed      @curiosity-arm  4s  2026-06-05 16:52
        ! pid 2212651 not alive
  #2973 crashed      @curiosity-arm  30s  2026-06-05 16:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2975 crashed      @curiosity-arm  26s  2026-06-05 16:53
        ! pid 2214781 not alive
  #2977 crashed      @curiosity-arm  4s  2026-06-05 16:53
        ! pid 2215101 not alive
  #2979 crashed      @curiosity-arm  30s  2026-06-05 16:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2981 crashed      @curiosity-arm  25s  2026-06-05 16:54
        ! pid 2215459 not alive
  #2983 crashed      @curiosity-arm  5s  2026-06-05 16:54
        ! pid 2215601 not alive
  #2985 crashed      @curiosity-arm  30s  2026-06-05 16:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2987 crashed      @curiosity-arm  25s  2026-06-05 16:55
        ! pid 2215974 not alive
  #2989 crashed      @curiosity-arm  5s  2026-06-05 16:55
        ! pid 2216124 not alive
  #2991 crashed      @curiosity-arm  30s  2026-06-05 16:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2993 crashed      @curiosity-arm  25s  2026-06-05 16:56
        ! pid 2216318 not alive
  #2995 crashed      @curiosity-arm  5s  2026-06-05 16:56
        ! pid 2216452 not alive
  #2997 crashed      @curiosity-arm  30s  2026-06-05 16:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2999 crashed      @curiosity-arm  26s  2026-06-05 16:57
        ! pid 2217057 not alive
  #3001 crashed      @curiosity-arm  4s  2026-06-05 16:57
        ! pid 2217187 not alive
  #3003 crashed      @curiosity-arm  30s  2026-06-05 16:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3005 crashed      @curiosity-arm  26s  2026-06-05 16:58
        ! pid 2217525 not alive
  #3007 crashed      @curiosity-arm  4s  2026-06-05 16:58
        ! pid 2217638 not alive
  #3009 crashed      @curiosity-arm  30s  2026-06-05 16:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3011 crashed      @curiosity-arm  27s  2026-06-05 16:59
        ! pid 2218105 not alive
  #3013 crashed      @curiosity-arm  6s  2026-06-05 16:59
        ! pid 2218295 not alive
  #3015 crashed      @curiosity-arm  30s  2026-06-05 16:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3016 crashed      @curiosity-arm  25s  2026-06-05 17:00
        ! pid 2218810 not alive
  #3017 crashed      @curiosity-arm  5s  2026-06-05 17:00
        ! pid 2219420 not alive
  #3019 crashed      @curiosity-arm  30s  2026-06-05 17:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3020 crashed      @curiosity-arm  25s  2026-06-05 17:01
        ! pid 2219584 not alive
  #3021 crashed      @curiosity-arm  5s  2026-06-05 17:01
        ! pid 2219641 not alive
  #3023 crashed      @curiosity-arm  30s  2026-06-05 17:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3024 crashed      @curiosity-arm  26s  2026-06-05 17:02
        ! pid 2219986 not alive
  #3025 crashed      @curiosity-arm  4s  2026-06-05 17:02
        ! pid 2220216 not alive
  #3027 crashed      @curiosity-arm  30s  2026-06-05 17:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3028 crashed      @curiosity-arm  27s  2026-06-05 17:03
        ! pid 2220603 not alive
  #3029 crashed      @curiosity-arm  3s  2026-06-05 17:03
        ! pid 2220687 not alive
  #3031 crashed      @curiosity-arm  30s  2026-06-05 17:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3032 crashed      @curiosity-arm  27s  2026-06-05 17:04
        ! pid 2220922 not alive
  #3033 crashed      @curiosity-arm  3s  2026-06-05 17:04
        ! pid 2221014 not alive
  #3035 crashed      @curiosity-arm  30s  2026-06-05 17:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3036 crashed      @curiosity-arm  27s  2026-06-05 17:05
        ! pid 2221399 not alive
  #3037 crashed      @curiosity-arm  33s  2026-06-05 17:05
        ! pid 2221491 not alive
  #3039 crashed      @curiosity-arm  27s  2026-06-05 17:06
        ! pid 2221921 not alive
  #3040 crashed      @curiosity-arm  33s  2026-06-05 17:06
        ! pid 2222008 not alive
  #3042 crashed      @curiosity-arm  27s  2026-06-05 17:07
        ! pid 2222158 not alive
  #3043 crashed      @curiosity-arm  33s  2026-06-05 17:07
        ! pid 2222367 not alive
  #3045 crashed      @curiosity-arm  27s  2026-06-05 17:08
        ! pid 2222501 not alive
  #3046 crashed      @curiosity-arm  33s  2026-06-05 17:08
        ! pid 2222662 not alive
  #3048 crashed      @curiosity-arm  12s  2026-06-05 17:09
        ! pid 2222862 not alive
  #3049 crashed      @curiosity-arm  16s  2026-06-05 17:09
        ! pid 2223016 not alive
  #3050 crashed      @curiosity-arm  14s  2026-06-05 17:09
        ! pid 2223063 not alive
  #3052 crashed      @curiosity-arm  4s  2026-06-05 17:09
        ! pid 2223091 not alive
  #3053 crashed      @curiosity-arm  30s  2026-06-05 17:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3054 crashed      @curiosity-arm  12s  2026-06-05 17:10
        ! pid 2223463 not alive
  #3055 crashed      @curiosity-arm  18s  2026-06-05 17:10
        ! pid 2223714 not alive
  #3057 crashed      @curiosity-arm  30s  2026-06-05 17:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3058 crashed      @curiosity-arm  12s  2026-06-05 17:11
        ! pid 2224022 not alive
  #3059 crashed      @curiosity-arm  18s  2026-06-05 17:11
        ! pid 2224049 not alive
  #3061 crashed      @curiosity-arm  30s  2026-06-05 17:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3062 crashed      @curiosity-arm  12s  2026-06-05 17:12
        ! pid 2224522 not alive
  #3063 crashed      @curiosity-arm  18s  2026-06-05 17:12
        ! pid 2224550 not alive
  #3065 crashed      @curiosity-arm  30s  2026-06-05 17:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3066 crashed      @curiosity-arm  12s  2026-06-05 17:13
        ! pid 2224857 not alive
  #3067 crashed      @curiosity-arm  18s  2026-06-05 17:13
        ! pid 2224874 not alive
  #3069 crashed      @curiosity-arm  30s  2026-06-05 17:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3070 crashed      @curiosity-arm  12s  2026-06-05 17:14
        ! pid 2225134 not alive
  #3071 crashed      @curiosity-arm  18s  2026-06-05 17:14
        ! pid 2225186 not alive
  #3073 crashed      @curiosity-arm  30s  2026-06-05 17:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3074 crashed      @curiosity-arm  13s  2026-06-05 17:15
        ! pid 2225421 not alive
  #3075 crashed      @curiosity-arm  17s  2026-06-05 17:15
        ! pid 2225469 not alive
  #3077 crashed      @curiosity-arm  30s  2026-06-05 17:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3078 crashed      @curiosity-arm  13s  2026-06-05 17:16
        ! pid 2225810 not alive
  #3079 crashed      @curiosity-arm  17s  2026-06-05 17:16
        ! pid 2225877 not alive
  #3081 crashed      @curiosity-arm  30s  2026-06-05 17:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3082 crashed      @curiosity-arm  13s  2026-06-05 17:17
        ! pid 2226116 not alive
  #3083 crashed      @curiosity-arm  17s  2026-06-05 17:17
        ! pid 2226267 not alive
  #3085 crashed      @curiosity-arm  30s  2026-06-05 17:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3086 crashed      @curiosity-arm  13s  2026-06-05 17:18
        ! pid 2226403 not alive
  #3087 crashed      @curiosity-arm  17s  2026-06-05 17:18
        ! pid 2226437 not alive
  #3089 crashed      @curiosity-arm  30s  2026-06-05 17:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3090 crashed      @curiosity-arm  15s  2026-06-05 17:19
        ! pid 2226589 not alive
  #3091 crashed      @curiosity-arm  15s  2026-06-05 17:19
        ! pid 2226641 not alive
  #3093 crashed      @curiosity-arm  30s  2026-06-05 17:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3094 crashed      @curiosity-arm  12s  2026-06-05 17:20
        ! pid 2227302 not alive
  #3095 crashed      @curiosity-arm  3s  2026-06-05 17:20
        ! pid 2227806 not alive
  #3096 crashed      @curiosity-arm  27s  2026-06-05 17:20
        ! pid 2227937 not alive
  #3098 crashed      @curiosity-arm  30s  2026-06-05 17:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3099 crashed      @curiosity-arm  4s  2026-06-05 17:21
        ! pid 2228110 not alive
  #3100 crashed      @curiosity-arm  26s  2026-06-05 17:21
        ! pid 2228119 not alive
  #3102 crashed      @curiosity-arm  30s  2026-06-05 17:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3103 crashed      @curiosity-arm  4s  2026-06-05 17:22
        ! pid 2229154 not alive
  #3104 crashed      @curiosity-arm  26s  2026-06-05 17:22
        ! pid 2229203 not alive
  #3106 crashed      @curiosity-arm  30s  2026-06-05 17:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3107 crashed      @curiosity-arm  4s  2026-06-05 17:23
        ! pid 2229763 not alive
  #3108 crashed      @curiosity-arm  26s  2026-06-05 17:23
        ! pid 2229801 not alive
  #3110 crashed      @curiosity-arm  30s  2026-06-05 17:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3111 crashed      @curiosity-arm  4s  2026-06-05 17:24
        ! pid 2230186 not alive
  #3112 crashed      @curiosity-arm  26s  2026-06-05 17:24
        ! pid 2230198 not alive
  #3114 crashed      @curiosity-arm  30s  2026-06-05 17:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3115 crashed      @curiosity-arm  4s  2026-06-05 17:25
        ! pid 2230520 not alive
  #3116 crashed      @curiosity-arm  25s  2026-06-05 17:25
        ! pid 2230533 not alive
  #3118 crashed      @curiosity-arm  30s  2026-06-05 17:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3119 crashed      @curiosity-arm  5s  2026-06-05 17:26
        ! pid 2231227 not alive
  #3120 crashed      @curiosity-arm  25s  2026-06-05 17:26
        ! pid 2231258 not alive
  #3122 crashed      @curiosity-arm  30s  2026-06-05 17:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3123 crashed      @curiosity-arm  5s  2026-06-05 17:27
        ! pid 2231604 not alive
  #3124 crashed      @curiosity-arm  25s  2026-06-05 17:27
        ! pid 2231619 not alive
  #3126 crashed      @curiosity-arm  30s  2026-06-05 17:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3127 crashed      @curiosity-arm  5s  2026-06-05 17:28
        ! pid 2231943 not alive
  #3128 crashed      @curiosity-arm  25s  2026-06-05 17:28
        ! pid 2231956 not alive
  #3130 crashed      @curiosity-arm  30s  2026-06-05 17:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3131 crashed      @curiosity-arm  5s  2026-06-05 17:29
        ! pid 2232277 not alive
  #3132 crashed      @curiosity-arm  25s  2026-06-05 17:29
        ! pid 2232292 not alive
  #3134 crashed      @curiosity-arm  30s  2026-06-05 17:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3135 crashed      @curiosity-arm  6s  2026-06-05 17:30
        ! pid 2233180 not alive
  #3136 crashed      @curiosity-arm  24s  2026-06-05 17:30
        ! pid 2233215 not alive
  #3138 crashed      @curiosity-arm  30s  2026-06-05 17:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3139 crashed      @curiosity-arm  6s  2026-06-05 17:31
        ! pid 2233437 not alive
  #3140 crashed      @curiosity-arm  24s  2026-06-05 17:31
        ! pid 2233469 not alive
  #3142 crashed      @curiosity-arm  30s  2026-06-05 17:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3143 crashed      @curiosity-arm  6s  2026-06-05 17:32
        ! pid 2233795 not alive
  #3144 crashed      @curiosity-arm  24s  2026-06-05 17:32
        ! pid 2233808 not alive
  #3146 crashed      @curiosity-arm  30s  2026-06-05 17:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3147 crashed      @curiosity-arm  6s  2026-06-05 17:33
        ! pid 2234032 not alive
  #3148 crashed      @curiosity-arm  24s  2026-06-05 17:33
        ! pid 2234047 not alive
  #3150 crashed      @curiosity-arm  30s  2026-06-05 17:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3151 crashed      @curiosity-arm  7s  2026-06-05 17:34
        ! pid 2234251 not alive
  #3152 crashed      @curiosity-arm  23s  2026-06-05 17:34
        ! pid 2234265 not alive
  #3154 crashed      @curiosity-arm  30s  2026-06-05 17:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3155 crashed      @curiosity-arm  7s  2026-06-05 17:35
        ! pid 2234555 not alive
  #3156 crashed      @curiosity-arm  23s  2026-06-05 17:35
        ! pid 2234569 not alive
  #3158 crashed      @curiosity-arm  37s  2026-06-05 17:36
        ! pid 2234767 not alive
  #3159 crashed      @curiosity-arm  60s  2026-06-05 17:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3161 crashed      @curiosity-arm  61s  2026-06-05 17:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3163 crashed      @curiosity-arm  60s  2026-06-05 17:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3165 crashed      @curiosity-arm  60s  2026-06-05 17:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3167 crashed      @curiosity-arm  60s  2026-06-05 17:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3169 crashed      @curiosity-arm  61s  2026-06-05 17:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3171 crashed      @curiosity-arm  60s  2026-06-05 17:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3173 crashed      @curiosity-arm  60s  2026-06-05 17:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3175 crashed      @curiosity-arm  60s  2026-06-05 17:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3177 crashed      @curiosity-arm  60s  2026-06-05 17:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3179 crashed      @curiosity-arm  61s  2026-06-05 17:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3181 crashed      @curiosity-arm  60s  2026-06-05 17:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3183 crashed      @curiosity-arm  60s  2026-06-05 17:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3185 crashed      @curiosity-arm  60s  2026-06-05 17:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3187 crashed      @curiosity-arm  61s  2026-06-05 17:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3189 crashed      @curiosity-arm  60s  2026-06-05 17:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3191 crashed      @curiosity-arm  60s  2026-06-05 17:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3193 crashed      @curiosity-arm  61s  2026-06-05 17:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3195 crashed      @curiosity-arm  60s  2026-06-05 17:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3197 crashed      @curiosity-arm  60s  2026-06-05 17:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3199 crashed      @curiosity-arm  60s  2026-06-05 17:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3201 crashed      @curiosity-arm  61s  2026-06-05 17:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3203 crashed      @curiosity-arm  60s  2026-06-05 17:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3205 crashed      @curiosity-arm  60s  2026-06-05 17:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3207 crashed      @curiosity-arm  60s  2026-06-05 18:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3209 crashed      @curiosity-arm  61s  2026-06-05 18:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3211 crashed      @curiosity-arm  60s  2026-06-05 18:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3213 crashed      @curiosity-arm  60s  2026-06-05 18:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3215 crashed      @curiosity-arm  60s  2026-06-05 18:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3217 crashed      @curiosity-arm  60s  2026-06-05 18:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3219 crashed      @curiosity-arm  50s  2026-06-05 18:06
        ! pid 2245908 not alive
  #3221 crashed      @curiosity-arm  60s  2026-06-05 18:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3223 crashed      @curiosity-arm  60s  2026-06-05 18:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3225 crashed      @curiosity-arm  61s  2026-06-05 18:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3227 crashed      @curiosity-arm  61s  2026-06-05 18:10
        ! pid 2248089 not alive
  #3229 crashed      @curiosity-arm  60s  2026-06-05 18:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3231 crashed      @curiosity-arm  61s  2026-06-05 18:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3233 crashed      @curiosity-arm  60s  2026-06-05 18:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3235 crashed      @curiosity-arm  60s  2026-06-05 18:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3237 crashed      @curiosity-arm  60s  2026-06-05 18:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3239 reclaimed    @curiosity-arm  121377s  2026-06-05 18:16
        ! stale_lock=srv1704173:2248786
  #3241 crashed      @curiosity-arm  61s  2026-06-07 03:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3245 crashed      @curiosity-arm  60s  2026-06-07 04:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3249 crashed      @curiosity-arm  60s  2026-06-07 04:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3253 crashed      @curiosity-arm  61s  2026-06-07 04:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3257 crashed      @curiosity-arm  60s  2026-06-07 04:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3261 crashed      @curiosity-arm  60s  2026-06-07 04:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3265 crashed      @curiosity-arm  60s  2026-06-07 04:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3269 crashed      @curiosity-arm  60s  2026-06-07 04:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3273 crashed      @curiosity-arm  61s  2026-06-07 04:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3277 crashed      @curiosity-arm  60s  2026-06-07 04:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3281 crashed      @curiosity-arm  60s  2026-06-07 04:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3285 crashed      @curiosity-arm  60s  2026-06-07 04:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3289 crashed      @curiosity-arm  61s  2026-06-07 04:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3293 crashed      @curiosity-arm  60s  2026-06-07 04:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3297 crashed      @curiosity-arm  60s  2026-06-07 04:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3301 crashed      @curiosity-arm  60s  2026-06-07 04:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3305 crashed      @curiosity-arm  60s  2026-06-07 04:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3309 crashed      @curiosity-arm  61s  2026-06-07 04:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3313 crashed      @curiosity-arm  60s  2026-06-07 04:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3317 crashed      @curiosity-arm  60s  2026-06-07 04:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3321 crashed      @curiosity-arm  60s  2026-06-07 04:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3325 crashed      @curiosity-arm  61s  2026-06-07 04:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3329 crashed      @curiosity-arm  60s  2026-06-07 04:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3333 crashed      @curiosity-arm  60s  2026-06-07 04:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3337 crashed      @curiosity-arm  60s  2026-06-07 04:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3341 crashed      @curiosity-arm  61s  2026-06-07 04:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3345 crashed      @curiosity-arm  60s  2026-06-07 04:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3349 crashed      @curiosity-arm  60s  2026-06-07 04:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3353 crashed      @curiosity-arm  60s  2026-06-07 04:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3357 crashed      @curiosity-arm  61s  2026-06-07 04:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3361 crashed      @curiosity-arm  60s  2026-06-07 04:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3365 crashed      @curiosity-arm  60s  2026-06-07 04:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3369 crashed      @curiosity-arm  60s  2026-06-07 04:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3373 crashed      @curiosity-arm  60s  2026-06-07 04:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3377 crashed      @curiosity-arm  61s  2026-06-07 04:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3381 crashed      @curiosity-arm  60s  2026-06-07 04:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3385 crashed      @curiosity-arm  60s  2026-06-07 04:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3389 crashed      @curiosity-arm  60s  2026-06-07 04:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3393 crashed      @curiosity-arm  61s  2026-06-07 04:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3397 crashed      @curiosity-arm  60s  2026-06-07 04:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3406 crashed      @curiosity-arm  60s  2026-06-07 04:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3415 crashed      @curiosity-arm  61s  2026-06-07 04:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3424 crashed      @curiosity-arm  60s  2026-06-07 04:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3433 crashed      @curiosity-arm  60s  2026-06-07 04:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3442 crashed      @curiosity-arm  61s  2026-06-07 04:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3451 crashed      @curiosity-arm  60s  2026-06-07 04:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3460 crashed      @curiosity-arm  60s  2026-06-07 04:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3469 crashed      @curiosity-arm  61s  2026-06-07 04:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3478 crashed      @curiosity-arm  60s  2026-06-07 04:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3487 crashed      @curiosity-arm  60s  2026-06-07 04:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3496 crashed      @curiosity-arm  61s  2026-06-07 04:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3505 crashed      @curiosity-arm  60s  2026-06-07 04:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3514 crashed      @curiosity-arm  60s  2026-06-07 04:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3523 crashed      @curiosity-arm  61s  2026-06-07 04:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3532 crashed      @curiosity-arm  60s  2026-06-07 04:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3541 crashed      @curiosity-arm  60s  2026-06-07 04:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3550 crashed      @curiosity-arm  61s  2026-06-07 04:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3559 crashed      @curiosity-arm  60s  2026-06-07 04:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3568 crashed      @curiosity-arm  60s  2026-06-07 04:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3577 crashed      @curiosity-arm  61s  2026-06-07 04:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3586 crashed      @curiosity-arm  60s  2026-06-07 04:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3595 crashed      @curiosity-arm  61s  2026-06-07 05:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3604 crashed      @curiosity-arm  60s  2026-06-07 05:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3613 crashed      @curiosity-arm  60s  2026-06-07 05:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3622 crashed      @curiosity-arm  61s  2026-06-07 05:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3631 crashed      @curiosity-arm  60s  2026-06-07 05:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3640 crashed      @curiosity-arm  60s  2026-06-07 05:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3649 crashed      @curiosity-arm  61s  2026-06-07 05:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3658 crashed      @curiosity-arm  60s  2026-06-07 05:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3667 crashed      @curiosity-arm  61s  2026-06-07 05:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3676 crashed      @curiosity-arm  61s  2026-06-07 05:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3685 crashed      @curiosity-arm  60s  2026-06-07 05:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3694 crashed      @curiosity-arm  61s  2026-06-07 05:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3703 crashed      @curiosity-arm  60s  2026-06-07 05:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3712 crashed      @curiosity-arm  60s  2026-06-07 05:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3721 crashed      @curiosity-arm  60s  2026-06-07 05:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3730 crashed      @curiosity-arm  60s  2026-06-07 05:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3739 crashed      @curiosity-arm  61s  2026-06-07 05:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3748 crashed      @curiosity-arm  60s  2026-06-07 05:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3757 crashed      @curiosity-arm  60s  2026-06-07 05:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3766 crashed      @curiosity-arm  61s  2026-06-07 05:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3775 crashed      @curiosity-arm  60s  2026-06-07 05:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3784 crashed      @curiosity-arm  60s  2026-06-07 05:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3793 crashed      @curiosity-arm  61s  2026-06-07 05:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3802 crashed      @curiosity-arm  60s  2026-06-07 05:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3811 crashed      @curiosity-arm  60s  2026-06-07 05:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3820 crashed      @curiosity-arm  61s  2026-06-07 05:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3829 crashed      @curiosity-arm  60s  2026-06-07 05:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3838 crashed      @curiosity-arm  60s  2026-06-07 05:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3847 crashed      @curiosity-arm  61s  2026-06-07 05:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3856 crashed      @curiosity-arm  60s  2026-06-07 05:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3865 crashed      @curiosity-arm  60s  2026-06-07 05:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3874 crashed      @curiosity-arm  61s  2026-06-07 05:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3883 crashed      @curiosity-arm  60s  2026-06-07 05:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3892 crashed      @curiosity-arm  60s  2026-06-07 05:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3901 crashed      @curiosity-arm  61s  2026-06-07 05:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3910 crashed      @curiosity-arm  60s  2026-06-07 05:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3919 crashed      @curiosity-arm  60s  2026-06-07 05:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3928 crashed      @curiosity-arm  61s  2026-06-07 05:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3937 crashed      @curiosity-arm  60s  2026-06-07 05:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3946 crashed      @curiosity-arm  60s  2026-06-07 05:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3955 crashed      @curiosity-arm  60s  2026-06-07 05:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3964 crashed      @curiosity-arm  60s  2026-06-07 05:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3973 crashed      @curiosity-arm  60s  2026-06-07 05:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3982 crashed      @curiosity-arm  61s  2026-06-07 05:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3991 crashed      @curiosity-arm  60s  2026-06-07 05:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4000 crashed      @curiosity-arm  61s  2026-06-07 05:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4009 crashed      @curiosity-arm  60s  2026-06-07 05:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4018 crashed      @curiosity-arm  60s  2026-06-07 05:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4027 crashed      @curiosity-arm  61s  2026-06-07 05:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4036 crashed      @curiosity-arm  60s  2026-06-07 05:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4045 crashed      @curiosity-arm  60s  2026-06-07 05:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4054 crashed      @curiosity-arm  61s  2026-06-07 05:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4063 crashed      @curiosity-arm  60s  2026-06-07 05:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4072 crashed      @curiosity-arm  60s  2026-06-07 05:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4081 crashed      @curiosity-arm  60s  2026-06-07 05:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4090 crashed      @curiosity-arm  60s  2026-06-07 05:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4099 crashed      @curiosity-arm  60s  2026-06-07 05:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4108 crashed      @curiosity-arm  60s  2026-06-07 05:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4117 crashed      @curiosity-arm  61s  2026-06-07 05:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4126 crashed      @curiosity-arm  60s  2026-06-07 06:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4135 crashed      @curiosity-arm  61s  2026-06-07 06:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4144 crashed      @curiosity-arm  60s  2026-06-07 06:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4153 crashed      @curiosity-arm  60s  2026-06-07 06:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4162 crashed      @curiosity-arm  61s  2026-06-07 06:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4171 crashed      @curiosity-arm  60s  2026-06-07 06:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4180 crashed      @curiosity-arm  60s  2026-06-07 06:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4189 crashed      @curiosity-arm  60s  2026-06-07 06:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4198 crashed      @curiosity-arm  60s  2026-06-07 06:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4207 crashed      @curiosity-arm  60s  2026-06-07 06:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4216 crashed      @curiosity-arm  60s  2026-06-07 06:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4225 crashed      @curiosity-arm  60s  2026-06-07 06:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4234 crashed      @curiosity-arm  60s  2026-06-07 06:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4243 crashed      @curiosity-arm  60s  2026-06-07 06:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4252 crashed      @curiosity-arm  60s  2026-06-07 06:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4261 crashed      @curiosity-arm  60s  2026-06-07 06:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4270 crashed      @curiosity-arm  61s  2026-06-07 06:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4279 crashed      @curiosity-arm  60s  2026-06-07 06:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4288 crashed      @curiosity-arm  60s  2026-06-07 06:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4297 crashed      @curiosity-arm  61s  2026-06-07 06:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4306 crashed      @curiosity-arm  60s  2026-06-07 06:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4315 crashed      @curiosity-arm  60s  2026-06-07 06:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4324 crashed      @curiosity-arm  61s  2026-06-07 06:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4333 crashed      @curiosity-arm  60s  2026-06-07 06:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4342 crashed      @curiosity-arm  60s  2026-06-07 06:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4351 crashed      @curiosity-arm  61s  2026-06-07 06:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4360 crashed      @curiosity-arm  60s  2026-06-07 06:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4369 crashed      @curiosity-arm  60s  2026-06-07 06:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4378 crashed      @curiosity-arm  61s  2026-06-07 06:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4387 crashed      @curiosity-arm  60s  2026-06-07 06:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4396 crashed      @curiosity-arm  60s  2026-06-07 06:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4405 crashed      @curiosity-arm  60s  2026-06-07 06:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4414 crashed      @curiosity-arm  60s  2026-06-07 06:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4423 crashed      @curiosity-arm  60s  2026-06-07 06:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4432 crashed      @curiosity-arm  61s  2026-06-07 06:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4441 crashed      @curiosity-arm  60s  2026-06-07 06:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4450 crashed      @curiosity-arm  60s  2026-06-07 06:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4459 crashed      @curiosity-arm  61s  2026-06-07 06:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4468 crashed      @curiosity-arm  60s  2026-06-07 06:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4477 crashed      @curiosity-arm  60s  2026-06-07 06:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4486 crashed      @curiosity-arm  61s  2026-06-07 06:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4495 crashed      @curiosity-arm  60s  2026-06-07 06:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4504 crashed      @curiosity-arm  60s  2026-06-07 06:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4513 crashed      @curiosity-arm  60s  2026-06-07 06:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4522 crashed      @curiosity-arm  60s  2026-06-07 06:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4531 crashed      @curiosity-arm  61s  2026-06-07 06:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4540 crashed      @curiosity-arm  60s  2026-06-07 06:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4549 crashed      @curiosity-arm  60s  2026-06-07 06:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4558 crashed      @curiosity-arm  61s  2026-06-07 06:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4567 crashed      @curiosity-arm  60s  2026-06-07 06:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4576 crashed      @curiosity-arm  60s  2026-06-07 06:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4585 crashed      @curiosity-arm  61s  2026-06-07 06:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4594 crashed      @curiosity-arm  60s  2026-06-07 06:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4603 crashed      @curiosity-arm  60s  2026-06-07 06:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4612 crashed      @curiosity-arm  60s  2026-06-07 06:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4621 crashed      @curiosity-arm  60s  2026-06-07 06:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4630 crashed      @curiosity-arm  60s  2026-06-07 06:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4639 crashed      @curiosity-arm  61s  2026-06-07 06:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4648 crashed      @curiosity-arm  60s  2026-06-07 06:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4657 crashed      @curiosity-arm  60s  2026-06-07 06:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4666 crashed      @curiosity-arm  61s  2026-06-07 07:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4675 crashed      @curiosity-arm  60s  2026-06-07 07:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4684 crashed      @curiosity-arm  60s  2026-06-07 07:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4693 crashed      @curiosity-arm  61s  2026-06-07 07:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4702 crashed      @curiosity-arm  60s  2026-06-07 07:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4711 crashed      @curiosity-arm  60s  2026-06-07 07:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4720 crashed      @curiosity-arm  61s  2026-06-07 07:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4729 crashed      @curiosity-arm  60s  2026-06-07 07:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4738 crashed      @curiosity-arm  60s  2026-06-07 07:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4747 crashed      @curiosity-arm  61s  2026-06-07 07:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4756 crashed      @curiosity-arm  60s  2026-06-07 07:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4765 crashed      @curiosity-arm  60s  2026-06-07 07:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4774 crashed      @curiosity-arm  61s  2026-06-07 07:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4783 crashed      @curiosity-arm  60s  2026-06-07 07:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4792 crashed      @curiosity-arm  60s  2026-06-07 07:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4801 crashed      @curiosity-arm  61s  2026-06-07 07:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4810 crashed      @curiosity-arm  60s  2026-06-07 07:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4819 crashed      @curiosity-arm  60s  2026-06-07 07:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4828 crashed      @curiosity-arm  60s  2026-06-07 07:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4837 crashed      @curiosity-arm  61s  2026-06-07 07:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4846 crashed      @curiosity-arm  60s  2026-06-07 07:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4855 crashed      @curiosity-arm  60s  2026-06-07 07:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4864 crashed      @curiosity-arm  61s  2026-06-07 07:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4873 crashed      @curiosity-arm  60s  2026-06-07 07:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4882 crashed      @curiosity-arm  60s  2026-06-07 07:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4891 crashed      @curiosity-arm  61s  2026-06-07 07:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4900 crashed      @curiosity-arm  60s  2026-06-07 07:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4909 crashed      @curiosity-arm  60s  2026-06-07 07:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4918 crashed      @curiosity-arm  61s  2026-06-07 07:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4927 crashed      @curiosity-arm  60s  2026-06-07 07:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4936 crashed      @curiosity-arm  60s  2026-06-07 07:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4945 crashed      @curiosity-arm  61s  2026-06-07 07:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4954 crashed      @curiosity-arm  60s  2026-06-07 07:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4963 crashed      @curiosity-arm  60s  2026-06-07 07:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4972 crashed      @curiosity-arm  61s  2026-06-07 07:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4981 crashed      @curiosity-arm  60s  2026-06-07 07:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4990 crashed      @curiosity-arm  60s  2026-06-07 07:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #4999 crashed      @curiosity-arm  61s  2026-06-07 07:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5008 crashed      @curiosity-arm  60s  2026-06-07 07:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5017 crashed      @curiosity-arm  60s  2026-06-07 07:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5026 crashed      @curiosity-arm  61s  2026-06-07 07:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5035 crashed      @curiosity-arm  60s  2026-06-07 07:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5044 crashed      @curiosity-arm  60s  2026-06-07 07:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5053 crashed      @curiosity-arm  61s  2026-06-07 07:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5062 crashed      @curiosity-arm  60s  2026-06-07 07:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5071 crashed      @curiosity-arm  60s  2026-06-07 07:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5080 crashed      @curiosity-arm  61s  2026-06-07 07:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5089 crashed      @curiosity-arm  60s  2026-06-07 07:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5098 crashed      @curiosity-arm  60s  2026-06-07 07:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5107 crashed      @curiosity-arm  61s  2026-06-07 07:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5116 crashed      @curiosity-arm  60s  2026-06-07 07:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5125 crashed      @curiosity-arm  61s  2026-06-07 07:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5134 crashed      @curiosity-arm  60s  2026-06-07 07:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5143 crashed      @curiosity-arm  60s  2026-06-07 07:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5152 crashed      @curiosity-arm  61s  2026-06-07 07:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5161 crashed      @curiosity-arm  60s  2026-06-07 07:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5170 crashed      @curiosity-arm  60s  2026-06-07 07:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5179 crashed      @curiosity-arm  60s  2026-06-07 07:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5188 crashed      @curiosity-arm  61s  2026-06-07 07:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5197 crashed      @curiosity-arm  60s  2026-06-07 08:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5206 crashed      @curiosity-arm  61s  2026-06-07 08:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5215 crashed      @curiosity-arm  60s  2026-06-07 08:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5224 crashed      @curiosity-arm  61s  2026-06-07 08:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5233 crashed      @curiosity-arm  60s  2026-06-07 08:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5242 crashed      @curiosity-arm  61s  2026-06-07 08:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5251 crashed      @curiosity-arm  60s  2026-06-07 08:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5260 crashed      @curiosity-arm  60s  2026-06-07 08:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5269 crashed      @curiosity-arm  60s  2026-06-07 08:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5278 crashed      @curiosity-arm  60s  2026-06-07 08:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5287 crashed      @curiosity-arm  61s  2026-06-07 08:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5296 crashed      @curiosity-arm  60s  2026-06-07 08:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5305 crashed      @curiosity-arm  61s  2026-06-07 08:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5314 crashed      @curiosity-arm  60s  2026-06-07 08:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5323 crashed      @curiosity-arm  60s  2026-06-07 08:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5332 crashed      @curiosity-arm  61s  2026-06-07 08:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5341 crashed      @curiosity-arm  60s  2026-06-07 08:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5350 crashed      @curiosity-arm  61s  2026-06-07 08:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5359 crashed      @curiosity-arm  60s  2026-06-07 08:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5368 crashed      @curiosity-arm  60s  2026-06-07 08:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5377 crashed      @curiosity-arm  61s  2026-06-07 08:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5386 crashed      @curiosity-arm  60s  2026-06-07 08:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5395 crashed      @curiosity-arm  60s  2026-06-07 08:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5404 crashed      @curiosity-arm  61s  2026-06-07 08:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5413 crashed      @curiosity-arm  60s  2026-06-07 08:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5422 crashed      @curiosity-arm  60s  2026-06-07 08:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5431 crashed      @curiosity-arm  60s  2026-06-07 08:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5440 crashed      @curiosity-arm  60s  2026-06-07 08:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5449 crashed      @curiosity-arm  61s  2026-06-07 08:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5458 crashed      @curiosity-arm  60s  2026-06-07 08:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5467 crashed      @curiosity-arm  60s  2026-06-07 08:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5476 crashed      @curiosity-arm  60s  2026-06-07 08:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5485 crashed      @curiosity-arm  60s  2026-06-07 08:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5494 crashed      @curiosity-arm  61s  2026-06-07 08:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5503 crashed      @curiosity-arm  60s  2026-06-07 08:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5512 crashed      @curiosity-arm  60s  2026-06-07 08:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5521 crashed      @curiosity-arm  61s  2026-06-07 08:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5530 crashed      @curiosity-arm  60s  2026-06-07 08:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5539 crashed      @curiosity-arm  61s  2026-06-07 08:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5548 crashed      @curiosity-arm  60s  2026-06-07 08:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5557 crashed      @curiosity-arm  60s  2026-06-07 08:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5566 crashed      @curiosity-arm  61s  2026-06-07 08:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5575 crashed      @curiosity-arm  60s  2026-06-07 08:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5584 crashed      @curiosity-arm  61s  2026-06-07 08:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5593 crashed      @curiosity-arm  60s  2026-06-07 08:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5602 crashed      @curiosity-arm  61s  2026-06-07 08:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5611 crashed      @curiosity-arm  60s  2026-06-07 08:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5620 crashed      @curiosity-arm  60s  2026-06-07 08:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5629 crashed      @curiosity-arm  60s  2026-06-07 08:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5638 crashed      @curiosity-arm  60s  2026-06-07 08:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5647 crashed      @curiosity-arm  61s  2026-06-07 08:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5656 crashed      @curiosity-arm  60s  2026-06-07 08:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5665 crashed      @curiosity-arm  60s  2026-06-07 08:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5674 crashed      @curiosity-arm  61s  2026-06-07 08:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5683 crashed      @curiosity-arm  60s  2026-06-07 08:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5692 crashed      @curiosity-arm  60s  2026-06-07 08:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5701 crashed      @curiosity-arm  61s  2026-06-07 08:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5710 crashed      @curiosity-arm  60s  2026-06-07 08:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5719 crashed      @curiosity-arm  60s  2026-06-07 08:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5728 crashed      @curiosity-arm  61s  2026-06-07 08:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5737 crashed      @curiosity-arm  60s  2026-06-07 09:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5746 crashed      @curiosity-arm  61s  2026-06-07 09:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5755 crashed      @curiosity-arm  60s  2026-06-07 09:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5764 crashed      @curiosity-arm  60s  2026-06-07 09:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5773 crashed      @curiosity-arm  61s  2026-06-07 09:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5782 crashed      @curiosity-arm  60s  2026-06-07 09:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5791 crashed      @curiosity-arm  60s  2026-06-07 09:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5800 crashed      @curiosity-arm  61s  2026-06-07 09:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5809 crashed      @curiosity-arm  60s  2026-06-07 09:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5818 crashed      @curiosity-arm  60s  2026-06-07 09:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5827 crashed      @curiosity-arm  61s  2026-06-07 09:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5836 crashed      @curiosity-arm  60s  2026-06-07 09:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5845 crashed      @curiosity-arm  61s  2026-06-07 09:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5854 crashed      @curiosity-arm  60s  2026-06-07 09:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5863 crashed      @curiosity-arm  60s  2026-06-07 09:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5872 crashed      @curiosity-arm  61s  2026-06-07 09:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5881 crashed      @curiosity-arm  60s  2026-06-07 09:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5890 crashed      @curiosity-arm  60s  2026-06-07 09:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5899 crashed      @curiosity-arm  61s  2026-06-07 09:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5908 crashed      @curiosity-arm  60s  2026-06-07 09:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5917 crashed      @curiosity-arm  60s  2026-06-07 09:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5926 crashed      @curiosity-arm  61s  2026-06-07 09:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5935 crashed      @curiosity-arm  60s  2026-06-07 09:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5944 crashed      @curiosity-arm  60s  2026-06-07 09:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5953 crashed      @curiosity-arm  61s  2026-06-07 09:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5962 crashed      @curiosity-arm  60s  2026-06-07 09:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5971 crashed      @curiosity-arm  60s  2026-06-07 09:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5980 crashed      @curiosity-arm  60s  2026-06-07 09:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5989 crashed      @curiosity-arm  60s  2026-06-07 09:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5998 crashed      @curiosity-arm  61s  2026-06-07 09:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6007 crashed      @curiosity-arm  60s  2026-06-07 09:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6016 crashed      @curiosity-arm  60s  2026-06-07 09:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6025 crashed      @curiosity-arm  61s  2026-06-07 09:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6034 crashed      @curiosity-arm  60s  2026-06-07 09:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6043 crashed      @curiosity-arm  60s  2026-06-07 09:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6052 crashed      @curiosity-arm  61s  2026-06-07 09:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6061 crashed      @curiosity-arm  60s  2026-06-07 09:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6070 crashed      @curiosity-arm  60s  2026-06-07 09:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6079 crashed      @curiosity-arm  61s  2026-06-07 09:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6088 crashed      @curiosity-arm  60s  2026-06-07 09:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6097 crashed      @curiosity-arm  60s  2026-06-07 09:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6106 crashed      @curiosity-arm  61s  2026-06-07 09:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6115 crashed      @curiosity-arm  60s  2026-06-07 09:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6124 crashed      @curiosity-arm  60s  2026-06-07 09:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6133 crashed      @curiosity-arm  61s  2026-06-07 09:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6142 crashed      @curiosity-arm  60s  2026-06-07 09:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6151 crashed      @curiosity-arm  60s  2026-06-07 09:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6160 crashed      @curiosity-arm  61s  2026-06-07 09:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6169 crashed      @curiosity-arm  60s  2026-06-07 09:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6178 crashed      @curiosity-arm  60s  2026-06-07 09:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6187 crashed      @curiosity-arm  61s  2026-06-07 09:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6196 crashed      @curiosity-arm  60s  2026-06-07 09:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6205 crashed      @curiosity-arm  60s  2026-06-07 09:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6214 crashed      @curiosity-arm  61s  2026-06-07 09:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6223 crashed      @curiosity-arm  60s  2026-06-07 09:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6232 crashed      @curiosity-arm  60s  2026-06-07 09:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6241 crashed      @curiosity-arm  61s  2026-06-07 09:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6250 crashed      @curiosity-arm  60s  2026-06-07 09:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6259 crashed      @curiosity-arm  60s  2026-06-07 09:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6268 crashed      @curiosity-arm  61s  2026-06-07 09:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6277 crashed      @curiosity-arm  60s  2026-06-07 10:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6286 crashed      @curiosity-arm  60s  2026-06-07 10:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6295 crashed      @curiosity-arm  61s  2026-06-07 10:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6304 crashed      @curiosity-arm  60s  2026-06-07 10:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6313 crashed      @curiosity-arm  60s  2026-06-07 10:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6322 crashed      @curiosity-arm  60s  2026-06-07 10:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6331 crashed      @curiosity-arm  60s  2026-06-07 10:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6340 crashed      @curiosity-arm  60s  2026-06-07 10:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6349 crashed      @curiosity-arm  61s  2026-06-07 10:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6358 crashed      @curiosity-arm  60s  2026-06-07 10:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6367 crashed      @curiosity-arm  60s  2026-06-07 10:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6376 crashed      @curiosity-arm  61s  2026-06-07 10:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6385 crashed      @curiosity-arm  60s  2026-06-07 10:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6394 crashed      @curiosity-arm  60s  2026-06-07 10:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6403 crashed      @curiosity-arm  61s  2026-06-07 10:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6412 crashed      @curiosity-arm  60s  2026-06-07 10:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6421 crashed      @curiosity-arm  60s  2026-06-07 10:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6430 crashed      @curiosity-arm  60s  2026-06-07 10:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6439 crashed      @curiosity-arm  60s  2026-06-07 10:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6448 crashed      @curiosity-arm  60s  2026-06-07 10:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6457 crashed      @curiosity-arm  61s  2026-06-07 10:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6466 crashed      @curiosity-arm  60s  2026-06-07 10:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6475 crashed      @curiosity-arm  60s  2026-06-07 10:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6484 crashed      @curiosity-arm  61s  2026-06-07 10:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6493 crashed      @curiosity-arm  60s  2026-06-07 10:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6502 crashed      @curiosity-arm  60s  2026-06-07 10:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6511 crashed      @curiosity-arm  61s  2026-06-07 10:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6520 crashed      @curiosity-arm  60s  2026-06-07 10:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6529 crashed      @curiosity-arm  60s  2026-06-07 10:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6538 crashed      @curiosity-arm  61s  2026-06-07 10:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6547 crashed      @curiosity-arm  60s  2026-06-07 10:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6556 crashed      @curiosity-arm  60s  2026-06-07 10:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6565 crashed      @curiosity-arm  61s  2026-06-07 10:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6574 crashed      @curiosity-arm  60s  2026-06-07 10:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6583 crashed      @curiosity-arm  60s  2026-06-07 10:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6592 crashed      @curiosity-arm  61s  2026-06-07 10:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6601 crashed      @curiosity-arm  60s  2026-06-07 10:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6610 crashed      @curiosity-arm  60s  2026-06-07 10:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6619 crashed      @curiosity-arm  61s  2026-06-07 10:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6628 crashed      @curiosity-arm  60s  2026-06-07 10:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6637 crashed      @curiosity-arm  60s  2026-06-07 10:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6646 crashed      @curiosity-arm  61s  2026-06-07 10:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6655 crashed      @curiosity-arm  60s  2026-06-07 10:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6664 crashed      @curiosity-arm  60s  2026-06-07 10:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6673 crashed      @curiosity-arm  61s  2026-06-07 10:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6682 crashed      @curiosity-arm  60s  2026-06-07 10:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6691 crashed      @curiosity-arm  61s  2026-06-07 10:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6700 crashed      @curiosity-arm  60s  2026-06-07 10:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6709 crashed      @curiosity-arm  60s  2026-06-07 10:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6718 crashed      @curiosity-arm  61s  2026-06-07 10:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6727 crashed      @curiosity-arm  60s  2026-06-07 10:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6736 crashed      @curiosity-arm  61s  2026-06-07 10:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6745 crashed      @curiosity-arm  60s  2026-06-07 10:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6754 crashed      @curiosity-arm  60s  2026-06-07 10:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6763 crashed      @curiosity-arm  60s  2026-06-07 10:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6772 crashed      @curiosity-arm  60s  2026-06-07 10:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6781 crashed      @curiosity-arm  61s  2026-06-07 10:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6790 crashed      @curiosity-arm  60s  2026-06-07 10:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6799 crashed      @curiosity-arm  60s  2026-06-07 10:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6808 crashed      @curiosity-arm  61s  2026-06-07 11:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6817 crashed      @curiosity-arm  60s  2026-06-07 11:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6826 crashed      @curiosity-arm  60s  2026-06-07 11:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6835 crashed      @curiosity-arm  60s  2026-06-07 11:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6844 crashed      @curiosity-arm  60s  2026-06-07 11:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6853 crashed      @curiosity-arm  61s  2026-06-07 11:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6862 crashed      @curiosity-arm  60s  2026-06-07 11:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6871 crashed      @curiosity-arm  60s  2026-06-07 11:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6880 crashed      @curiosity-arm  61s  2026-06-07 11:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6889 crashed      @curiosity-arm  60s  2026-06-07 11:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6898 crashed      @curiosity-arm  61s  2026-06-07 11:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6907 crashed      @curiosity-arm  60s  2026-06-07 11:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6916 crashed      @curiosity-arm  60s  2026-06-07 11:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6925 crashed      @curiosity-arm  61s  2026-06-07 11:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6934 crashed      @curiosity-arm  60s  2026-06-07 11:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6943 crashed      @curiosity-arm  60s  2026-06-07 11:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6952 crashed      @curiosity-arm  61s  2026-06-07 11:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6961 crashed      @curiosity-arm  60s  2026-06-07 11:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6970 crashed      @curiosity-arm  60s  2026-06-07 11:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6979 crashed      @curiosity-arm  61s  2026-06-07 11:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6988 crashed      @curiosity-arm  60s  2026-06-07 11:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #6997 crashed      @curiosity-arm  60s  2026-06-07 11:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7006 crashed      @curiosity-arm  61s  2026-06-07 11:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7015 crashed      @curiosity-arm  60s  2026-06-07 11:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7024 crashed      @curiosity-arm  60s  2026-06-07 11:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7033 crashed      @curiosity-arm  61s  2026-06-07 11:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7042 crashed      @curiosity-arm  60s  2026-06-07 11:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7051 crashed      @curiosity-arm  60s  2026-06-07 11:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7060 crashed      @curiosity-arm  61s  2026-06-07 11:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7069 crashed      @curiosity-arm  60s  2026-06-07 11:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7078 crashed      @curiosity-arm  60s  2026-06-07 11:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7087 crashed      @curiosity-arm  61s  2026-06-07 11:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7096 crashed      @curiosity-arm  60s  2026-06-07 11:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7105 crashed      @curiosity-arm  60s  2026-06-07 11:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7114 crashed      @curiosity-arm  61s  2026-06-07 11:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7123 crashed      @curiosity-arm  60s  2026-06-07 11:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7132 crashed      @curiosity-arm  60s  2026-06-07 11:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7141 crashed      @curiosity-arm  60s  2026-06-07 11:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7150 crashed      @curiosity-arm  60s  2026-06-07 11:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7159 crashed      @curiosity-arm  61s  2026-06-07 11:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7168 crashed      @curiosity-arm  60s  2026-06-07 11:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7177 crashed      @curiosity-arm  60s  2026-06-07 11:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7186 crashed      @curiosity-arm  61s  2026-06-07 11:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7195 crashed      @curiosity-arm  60s  2026-06-07 11:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7204 crashed      @curiosity-arm  60s  2026-06-07 11:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7213 crashed      @curiosity-arm  61s  2026-06-07 11:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7222 crashed      @curiosity-arm  60s  2026-06-07 11:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7231 crashed      @curiosity-arm  60s  2026-06-07 11:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7240 crashed      @curiosity-arm  61s  2026-06-07 11:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7249 crashed      @curiosity-arm  60s  2026-06-07 11:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7258 crashed      @curiosity-arm  60s  2026-06-07 11:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7267 crashed      @curiosity-arm  61s  2026-06-07 11:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7276 crashed      @curiosity-arm  60s  2026-06-07 11:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7285 crashed      @curiosity-arm  60s  2026-06-07 11:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7294 crashed      @curiosity-arm  61s  2026-06-07 11:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7303 crashed      @curiosity-arm  60s  2026-06-07 11:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7312 crashed      @curiosity-arm  60s  2026-06-07 11:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7321 crashed      @curiosity-arm  61s  2026-06-07 11:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7330 crashed      @curiosity-arm  60s  2026-06-07 11:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7339 crashed      @curiosity-arm  60s  2026-06-07 11:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7348 crashed      @curiosity-arm  61s  2026-06-07 12:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7357 crashed      @curiosity-arm  60s  2026-06-07 12:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7366 crashed      @curiosity-arm  61s  2026-06-07 12:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7375 crashed      @curiosity-arm  60s  2026-06-07 12:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7384 crashed      @curiosity-arm  60s  2026-06-07 12:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7393 crashed      @curiosity-arm  61s  2026-06-07 12:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7402 crashed      @curiosity-arm  60s  2026-06-07 12:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7411 crashed      @curiosity-arm  60s  2026-06-07 12:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7420 crashed      @curiosity-arm  60s  2026-06-07 12:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7429 crashed      @curiosity-arm  60s  2026-06-07 12:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7438 crashed      @curiosity-arm  61s  2026-06-07 12:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7447 crashed      @curiosity-arm  60s  2026-06-07 12:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7456 crashed      @curiosity-arm  60s  2026-06-07 12:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7465 crashed      @curiosity-arm  61s  2026-06-07 12:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7474 crashed      @curiosity-arm  60s  2026-06-07 12:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7483 crashed      @curiosity-arm  60s  2026-06-07 12:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7492 crashed      @curiosity-arm  61s  2026-06-07 12:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7501 crashed      @curiosity-arm  60s  2026-06-07 12:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7510 crashed      @curiosity-arm  61s  2026-06-07 12:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7519 crashed      @curiosity-arm  60s  2026-06-07 12:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7528 crashed      @curiosity-arm  60s  2026-06-07 12:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7537 crashed      @curiosity-arm  61s  2026-06-07 12:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7546 crashed      @curiosity-arm  60s  2026-06-07 12:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7555 crashed      @curiosity-arm  60s  2026-06-07 12:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7564 crashed      @curiosity-arm  61s  2026-06-07 12:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7573 crashed      @curiosity-arm  60s  2026-06-07 12:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7582 crashed      @curiosity-arm  60s  2026-06-07 12:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7591 crashed      @curiosity-arm  61s  2026-06-07 12:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7600 crashed      @curiosity-arm  60s  2026-06-07 12:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7609 crashed      @curiosity-arm  60s  2026-06-07 12:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7618 crashed      @curiosity-arm  61s  2026-06-07 12:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7627 crashed      @curiosity-arm  60s  2026-06-07 12:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7636 crashed      @curiosity-arm  60s  2026-06-07 12:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7645 crashed      @curiosity-arm  60s  2026-06-07 12:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7654 crashed      @curiosity-arm  60s  2026-06-07 12:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7663 crashed      @curiosity-arm  61s  2026-06-07 12:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7672 crashed      @curiosity-arm  60s  2026-06-07 12:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7681 crashed      @curiosity-arm  60s  2026-06-07 12:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7690 crashed      @curiosity-arm  61s  2026-06-07 12:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7699 crashed      @curiosity-arm  60s  2026-06-07 12:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7708 crashed      @curiosity-arm  60s  2026-06-07 12:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7717 crashed      @curiosity-arm  61s  2026-06-07 12:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7726 crashed      @curiosity-arm  60s  2026-06-07 12:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7735 crashed      @curiosity-arm  60s  2026-06-07 12:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7744 crashed      @curiosity-arm  60s  2026-06-07 12:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7753 crashed      @curiosity-arm  60s  2026-06-07 12:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7762 crashed      @curiosity-arm  61s  2026-06-07 12:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7771 crashed      @curiosity-arm  60s  2026-06-07 12:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7780 crashed      @curiosity-arm  60s  2026-06-07 12:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7789 crashed      @curiosity-arm  60s  2026-06-07 12:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7798 crashed      @curiosity-arm  60s  2026-06-07 12:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7807 crashed      @curiosity-arm  60s  2026-06-07 12:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7816 crashed      @curiosity-arm  60s  2026-06-07 12:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7825 crashed      @curiosity-arm  60s  2026-06-07 12:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7834 crashed      @curiosity-arm  60s  2026-06-07 12:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7843 crashed      @curiosity-arm  60s  2026-06-07 12:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7852 crashed      @curiosity-arm  61s  2026-06-07 12:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7861 crashed      @curiosity-arm  60s  2026-06-07 12:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7870 crashed      @curiosity-arm  60s  2026-06-07 12:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7879 crashed      @curiosity-arm  61s  2026-06-07 12:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7888 crashed      @curiosity-arm  60s  2026-06-07 13:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7897 crashed      @curiosity-arm  60s  2026-06-07 13:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7906 crashed      @curiosity-arm  60s  2026-06-07 13:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7915 crashed      @curiosity-arm  60s  2026-06-07 13:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7924 crashed      @curiosity-arm  60s  2026-06-07 13:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7933 crashed      @curiosity-arm  61s  2026-06-07 13:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7942 crashed      @curiosity-arm  60s  2026-06-07 13:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7951 crashed      @curiosity-arm  61s  2026-06-07 13:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7960 crashed      @curiosity-arm  60s  2026-06-07 13:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7969 crashed      @curiosity-arm  60s  2026-06-07 13:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7978 crashed      @curiosity-arm  60s  2026-06-07 13:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7987 crashed      @curiosity-arm  60s  2026-06-07 13:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7996 crashed      @curiosity-arm  60s  2026-06-07 13:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8005 crashed      @curiosity-arm  61s  2026-06-07 13:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8014 crashed      @curiosity-arm  60s  2026-06-07 13:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8023 crashed      @curiosity-arm  60s  2026-06-07 13:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8032 crashed      @curiosity-arm  61s  2026-06-07 13:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8041 crashed      @curiosity-arm  60s  2026-06-07 13:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8050 crashed      @curiosity-arm  60s  2026-06-07 13:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8059 crashed      @curiosity-arm  61s  2026-06-07 13:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8068 crashed      @curiosity-arm  60s  2026-06-07 13:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8077 crashed      @curiosity-arm  60s  2026-06-07 13:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8086 crashed      @curiosity-arm  61s  2026-06-07 13:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8095 crashed      @curiosity-arm  60s  2026-06-07 13:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8104 crashed      @curiosity-arm  60s  2026-06-07 13:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8113 crashed      @curiosity-arm  61s  2026-06-07 13:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8122 crashed      @curiosity-arm  60s  2026-06-07 13:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8131 crashed      @curiosity-arm  60s  2026-06-07 13:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8140 crashed      @curiosity-arm  61s  2026-06-07 13:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8149 crashed      @curiosity-arm  60s  2026-06-07 13:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8158 crashed      @curiosity-arm  60s  2026-06-07 13:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8167 crashed      @curiosity-arm  60s  2026-06-07 13:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8176 crashed      @curiosity-arm  60s  2026-06-07 13:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8185 crashed      @curiosity-arm  61s  2026-06-07 13:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8194 crashed      @curiosity-arm  60s  2026-06-07 13:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8203 crashed      @curiosity-arm  61s  2026-06-07 13:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8212 crashed      @curiosity-arm  60s  2026-06-07 13:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8221 crashed      @curiosity-arm  61s  2026-06-07 13:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8230 crashed      @curiosity-arm  60s  2026-06-07 13:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8239 crashed      @curiosity-arm  61s  2026-06-07 13:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8248 crashed      @curiosity-arm  60s  2026-06-07 13:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8257 crashed      @curiosity-arm  61s  2026-06-07 13:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8266 crashed      @curiosity-arm  60s  2026-06-07 13:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8275 crashed      @curiosity-arm  60s  2026-06-07 13:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8284 crashed      @curiosity-arm  61s  2026-06-07 13:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8293 crashed      @curiosity-arm  60s  2026-06-07 13:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8302 crashed      @curiosity-arm  60s  2026-06-07 13:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8311 crashed      @curiosity-arm  60s  2026-06-07 13:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8320 crashed      @curiosity-arm  60s  2026-06-07 13:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8329 crashed      @curiosity-arm  61s  2026-06-07 13:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8338 crashed      @curiosity-arm  60s  2026-06-07 13:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8347 crashed      @curiosity-arm  60s  2026-06-07 13:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8356 crashed      @curiosity-arm  61s  2026-06-07 13:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8365 crashed      @curiosity-arm  60s  2026-06-07 13:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8374 crashed      @curiosity-arm  60s  2026-06-07 13:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8383 crashed      @curiosity-arm  61s  2026-06-07 13:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8392 crashed      @curiosity-arm  60s  2026-06-07 13:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8401 crashed      @curiosity-arm  61s  2026-06-07 13:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8410 crashed      @curiosity-arm  60s  2026-06-07 13:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8419 crashed      @curiosity-arm  60s  2026-06-07 14:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8428 crashed      @curiosity-arm  60s  2026-06-07 14:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8437 crashed      @curiosity-arm  60s  2026-06-07 14:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8446 crashed      @curiosity-arm  61s  2026-06-07 14:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8455 crashed      @curiosity-arm  60s  2026-06-07 14:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8464 crashed      @curiosity-arm  60s  2026-06-07 14:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8473 crashed      @curiosity-arm  61s  2026-06-07 14:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8482 crashed      @curiosity-arm  60s  2026-06-07 14:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8491 crashed      @curiosity-arm  60s  2026-06-07 14:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8500 crashed      @curiosity-arm  61s  2026-06-07 14:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8509 crashed      @curiosity-arm  60s  2026-06-07 14:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8518 crashed      @curiosity-arm  61s  2026-06-07 14:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8527 crashed      @curiosity-arm  60s  2026-06-07 14:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8536 crashed      @curiosity-arm  60s  2026-06-07 14:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8545 crashed      @curiosity-arm  61s  2026-06-07 14:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8554 crashed      @curiosity-arm  60s  2026-06-07 14:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8563 crashed      @curiosity-arm  60s  2026-06-07 14:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8572 crashed      @curiosity-arm  61s  2026-06-07 14:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8581 crashed      @curiosity-arm  60s  2026-06-07 14:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8590 crashed      @curiosity-arm  60s  2026-06-07 14:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8599 crashed      @curiosity-arm  61s  2026-06-07 14:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8608 crashed      @curiosity-arm  60s  2026-06-07 14:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8617 crashed      @curiosity-arm  60s  2026-06-07 14:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8626 crashed      @curiosity-arm  61s  2026-06-07 14:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8635 crashed      @curiosity-arm  60s  2026-06-07 14:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8644 crashed      @curiosity-arm  60s  2026-06-07 14:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8653 crashed      @curiosity-arm  60s  2026-06-07 14:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8662 crashed      @curiosity-arm  60s  2026-06-07 14:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8671 crashed      @curiosity-arm  60s  2026-06-07 14:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8680 crashed      @curiosity-arm  60s  2026-06-07 14:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8689 crashed      @curiosity-arm  60s  2026-06-07 14:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8698 crashed      @curiosity-arm  61s  2026-06-07 14:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8707 crashed      @curiosity-arm  60s  2026-06-07 14:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8716 crashed      @curiosity-arm  60s  2026-06-07 14:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8725 crashed      @curiosity-arm  61s  2026-06-07 14:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8734 crashed      @curiosity-arm  60s  2026-06-07 14:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8743 crashed      @curiosity-arm  60s  2026-06-07 14:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8752 crashed      @curiosity-arm  61s  2026-06-07 14:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8761 crashed      @curiosity-arm  60s  2026-06-07 14:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8770 crashed      @curiosity-arm  60s  2026-06-07 14:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8779 crashed      @curiosity-arm  61s  2026-06-07 14:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8788 crashed      @curiosity-arm  60s  2026-06-07 14:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8797 crashed      @curiosity-arm  60s  2026-06-07 14:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8806 crashed      @curiosity-arm  61s  2026-06-07 14:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8815 crashed      @curiosity-arm  60s  2026-06-07 14:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8824 crashed      @curiosity-arm  60s  2026-06-07 14:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8833 crashed      @curiosity-arm  61s  2026-06-07 14:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8842 crashed      @curiosity-arm  60s  2026-06-07 14:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8851 crashed      @curiosity-arm  60s  2026-06-07 14:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8860 crashed      @curiosity-arm  61s  2026-06-07 14:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8869 crashed      @curiosity-arm  60s  2026-06-07 14:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8878 crashed      @curiosity-arm  60s  2026-06-07 14:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8887 crashed      @curiosity-arm  61s  2026-06-07 14:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8896 crashed      @curiosity-arm  60s  2026-06-07 14:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8905 crashed      @curiosity-arm  61s  2026-06-07 14:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8914 crashed      @curiosity-arm  60s  2026-06-07 14:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8923 crashed      @curiosity-arm  60s  2026-06-07 14:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8932 crashed      @curiosity-arm  61s  2026-06-07 14:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8941 crashed      @curiosity-arm  60s  2026-06-07 14:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8950 crashed      @curiosity-arm  60s  2026-06-07 14:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8959 crashed      @curiosity-arm  61s  2026-06-07 15:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8968 crashed      @curiosity-arm  60s  2026-06-07 15:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8977 crashed      @curiosity-arm  60s  2026-06-07 15:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8986 crashed      @curiosity-arm  60s  2026-06-07 15:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #8995 crashed      @curiosity-arm  60s  2026-06-07 15:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9004 crashed      @curiosity-arm  61s  2026-06-07 15:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9013 crashed      @curiosity-arm  60s  2026-06-07 15:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9022 crashed      @curiosity-arm  60s  2026-06-07 15:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9031 crashed      @curiosity-arm  61s  2026-06-07 15:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9040 crashed      @curiosity-arm  60s  2026-06-07 15:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9049 crashed      @curiosity-arm  60s  2026-06-07 15:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9058 crashed      @curiosity-arm  61s  2026-06-07 15:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9067 crashed      @curiosity-arm  60s  2026-06-07 15:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9076 crashed      @curiosity-arm  60s  2026-06-07 15:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9085 crashed      @curiosity-arm  61s  2026-06-07 15:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9094 crashed      @curiosity-arm  60s  2026-06-07 15:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9103 crashed      @curiosity-arm  60s  2026-06-07 15:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9112 crashed      @curiosity-arm  61s  2026-06-07 15:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9121 crashed      @curiosity-arm  60s  2026-06-07 15:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9130 crashed      @curiosity-arm  60s  2026-06-07 15:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9139 crashed      @curiosity-arm  60s  2026-06-07 15:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9148 crashed      @curiosity-arm  60s  2026-06-07 15:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9157 crashed      @curiosity-arm  61s  2026-06-07 15:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9166 crashed      @curiosity-arm  60s  2026-06-07 15:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9175 crashed      @curiosity-arm  60s  2026-06-07 15:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9184 crashed      @curiosity-arm  61s  2026-06-07 15:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9193 crashed      @curiosity-arm  60s  2026-06-07 15:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9202 crashed      @curiosity-arm  60s  2026-06-07 15:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9211 crashed      @curiosity-arm  61s  2026-06-07 15:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9220 crashed      @curiosity-arm  60s  2026-06-07 15:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9229 crashed      @curiosity-arm  60s  2026-06-07 15:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9238 crashed      @curiosity-arm  61s  2026-06-07 15:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9247 crashed      @curiosity-arm  60s  2026-06-07 15:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9256 crashed      @curiosity-arm  60s  2026-06-07 15:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9265 crashed      @curiosity-arm  61s  2026-06-07 15:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9274 crashed      @curiosity-arm  60s  2026-06-07 15:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9283 crashed      @curiosity-arm  60s  2026-06-07 15:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9292 crashed      @curiosity-arm  61s  2026-06-07 15:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9301 crashed      @curiosity-arm  60s  2026-06-07 15:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9310 crashed      @curiosity-arm  60s  2026-06-07 15:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9319 crashed      @curiosity-arm  61s  2026-06-07 15:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9328 crashed      @curiosity-arm  60s  2026-06-07 15:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9337 crashed      @curiosity-arm  60s  2026-06-07 15:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9346 crashed      @curiosity-arm  60s  2026-06-07 15:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9355 crashed      @curiosity-arm  60s  2026-06-07 15:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9364 crashed      @curiosity-arm  60s  2026-06-07 15:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9373 crashed      @curiosity-arm  61s  2026-06-07 15:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9382 crashed      @curiosity-arm  60s  2026-06-07 15:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9391 crashed      @curiosity-arm  60s  2026-06-07 15:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9400 crashed      @curiosity-arm  60s  2026-06-07 15:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9409 crashed      @curiosity-arm  60s  2026-06-07 15:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9418 crashed      @curiosity-arm  61s  2026-06-07 15:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9427 crashed      @curiosity-arm  60s  2026-06-07 15:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9436 crashed      @curiosity-arm  60s  2026-06-07 15:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9445 crashed      @curiosity-arm  61s  2026-06-07 15:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9454 crashed      @curiosity-arm  60s  2026-06-07 15:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9463 crashed      @curiosity-arm  60s  2026-06-07 15:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9472 crashed      @curiosity-arm  61s  2026-06-07 15:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9481 crashed      @curiosity-arm  60s  2026-06-07 15:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9490 crashed      @curiosity-arm  60s  2026-06-07 15:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9499 crashed      @curiosity-arm  61s  2026-06-07 16:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9508 crashed      @curiosity-arm  60s  2026-06-07 16:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9517 crashed      @curiosity-arm  61s  2026-06-07 16:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9526 crashed      @curiosity-arm  60s  2026-06-07 16:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9535 crashed      @curiosity-arm  60s  2026-06-07 16:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9544 crashed      @curiosity-arm  61s  2026-06-07 16:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9553 crashed      @curiosity-arm  60s  2026-06-07 16:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9562 crashed      @curiosity-arm  60s  2026-06-07 16:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9571 crashed      @curiosity-arm  60s  2026-06-07 16:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9580 crashed      @curiosity-arm  60s  2026-06-07 16:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9589 crashed      @curiosity-arm  61s  2026-06-07 16:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9598 crashed      @curiosity-arm  60s  2026-06-07 16:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9607 crashed      @curiosity-arm  61s  2026-06-07 16:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9616 crashed      @curiosity-arm  60s  2026-06-07 16:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9625 crashed      @curiosity-arm  61s  2026-06-07 16:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9634 crashed      @curiosity-arm  60s  2026-06-07 16:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9643 crashed      @curiosity-arm  61s  2026-06-07 16:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9652 crashed      @curiosity-arm  61s  2026-06-07 16:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9661 crashed      @curiosity-arm  60s  2026-06-07 16:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9670 crashed      @curiosity-arm  61s  2026-06-07 16:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9679 crashed      @curiosity-arm  61s  2026-06-07 16:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9688 crashed      @curiosity-arm  60s  2026-06-07 16:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9697 crashed      @curiosity-arm  61s  2026-06-07 16:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9706 crashed      @curiosity-arm  60s  2026-06-07 16:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9715 crashed      @curiosity-arm  61s  2026-06-07 16:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9724 crashed      @curiosity-arm  60s  2026-06-07 16:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9733 crashed      @curiosity-arm  61s  2026-06-07 16:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9742 crashed      @curiosity-arm  60s  2026-06-07 16:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9751 crashed      @curiosity-arm  61s  2026-06-07 16:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9760 crashed      @curiosity-arm  60s  2026-06-07 16:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9769 crashed      @curiosity-arm  61s  2026-06-07 16:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9778 crashed      @curiosity-arm  60s  2026-06-07 16:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9787 crashed      @curiosity-arm  60s  2026-06-07 16:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9796 crashed      @curiosity-arm  60s  2026-06-07 16:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9805 crashed      @curiosity-arm  60s  2026-06-07 16:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9814 crashed      @curiosity-arm  61s  2026-06-07 16:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9823 crashed      @curiosity-arm  60s  2026-06-07 16:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9832 crashed      @curiosity-arm  61s  2026-06-07 16:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9841 crashed      @curiosity-arm  60s  2026-06-07 16:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9850 crashed      @curiosity-arm  61s  2026-06-07 16:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9859 crashed      @curiosity-arm  60s  2026-06-07 16:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9868 crashed      @curiosity-arm  61s  2026-06-07 16:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9877 crashed      @curiosity-arm  60s  2026-06-07 16:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9886 crashed      @curiosity-arm  60s  2026-06-07 16:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9895 crashed      @curiosity-arm  61s  2026-06-07 16:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9904 crashed      @curiosity-arm  60s  2026-06-07 16:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9913 crashed      @curiosity-arm  61s  2026-06-07 16:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9922 crashed      @curiosity-arm  60s  2026-06-07 16:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9931 crashed      @curiosity-arm  61s  2026-06-07 16:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9940 crashed      @curiosity-arm  60s  2026-06-07 16:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9949 crashed      @curiosity-arm  60s  2026-06-07 16:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9958 crashed      @curiosity-arm  61s  2026-06-07 16:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9967 crashed      @curiosity-arm  60s  2026-06-07 16:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9976 crashed      @curiosity-arm  61s  2026-06-07 16:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9985 crashed      @curiosity-arm  60s  2026-06-07 16:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9994 crashed      @curiosity-arm  60s  2026-06-07 16:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10003 crashed      @curiosity-arm  60s  2026-06-07 16:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10012 crashed      @curiosity-arm  60s  2026-06-07 16:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10021 crashed      @curiosity-arm  61s  2026-06-07 16:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10030 crashed      @curiosity-arm  60s  2026-06-07 17:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10039 crashed      @curiosity-arm  61s  2026-06-07 17:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10048 crashed      @curiosity-arm  60s  2026-06-07 17:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10057 crashed      @curiosity-arm  60s  2026-06-07 17:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10066 crashed      @curiosity-arm  61s  2026-06-07 17:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10075 crashed      @curiosity-arm  60s  2026-06-07 17:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10084 crashed      @curiosity-arm  61s  2026-06-07 17:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10093 crashed      @curiosity-arm  60s  2026-06-07 17:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10102 crashed      @curiosity-arm  61s  2026-06-07 17:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10111 crashed      @curiosity-arm  60s  2026-06-07 17:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10120 crashed      @curiosity-arm  61s  2026-06-07 17:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10129 crashed      @curiosity-arm  60s  2026-06-07 17:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10138 crashed      @curiosity-arm  60s  2026-06-07 17:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10147 crashed      @curiosity-arm  60s  2026-06-07 17:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10156 crashed      @curiosity-arm  60s  2026-06-07 17:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10165 crashed      @curiosity-arm  61s  2026-06-07 17:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10174 crashed      @curiosity-arm  60s  2026-06-07 17:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10183 crashed      @curiosity-arm  61s  2026-06-07 17:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10192 crashed      @curiosity-arm  60s  2026-06-07 17:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10201 crashed      @curiosity-arm  61s  2026-06-07 17:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10210 crashed      @curiosity-arm  60s  2026-06-07 17:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10219 crashed      @curiosity-arm  60s  2026-06-07 17:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10228 crashed      @curiosity-arm  60s  2026-06-07 17:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10237 crashed      @curiosity-arm  60s  2026-06-07 17:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10246 crashed      @curiosity-arm  61s  2026-06-07 17:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10255 crashed      @curiosity-arm  60s  2026-06-07 17:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10264 crashed      @curiosity-arm  61s  2026-06-07 17:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10273 crashed      @curiosity-arm  60s  2026-06-07 17:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10282 crashed      @curiosity-arm  61s  2026-06-07 17:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10291 crashed      @curiosity-arm  60s  2026-06-07 17:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10300 crashed      @curiosity-arm  60s  2026-06-07 17:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10309 crashed      @curiosity-arm  60s  2026-06-07 17:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10318 crashed      @curiosity-arm  60s  2026-06-07 17:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10327 crashed      @curiosity-arm  61s  2026-06-07 17:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10336 crashed      @curiosity-arm  60s  2026-06-07 17:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10345 crashed      @curiosity-arm  61s  2026-06-07 17:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10354 crashed      @curiosity-arm  60s  2026-06-07 17:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10363 crashed      @curiosity-arm  61s  2026-06-07 17:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10372 crashed      @curiosity-arm  60s  2026-06-07 17:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10381 crashed      @curiosity-arm  60s  2026-06-07 17:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10390 crashed      @curiosity-arm  61s  2026-06-07 17:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10399 crashed      @curiosity-arm  60s  2026-06-07 17:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10408 crashed      @curiosity-arm  61s  2026-06-07 17:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10417 crashed      @curiosity-arm  60s  2026-06-07 17:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10426 crashed      @curiosity-arm  61s  2026-06-07 17:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10435 crashed      @curiosity-arm  60s  2026-06-07 17:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10444 crashed      @curiosity-arm  61s  2026-06-07 17:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10453 crashed      @curiosity-arm  60s  2026-06-07 17:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10462 crashed      @curiosity-arm  60s  2026-06-07 17:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10471 crashed      @curiosity-arm  61s  2026-06-07 17:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10480 crashed      @curiosity-arm  60s  2026-06-07 17:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10489 crashed      @curiosity-arm  61s  2026-06-07 17:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10498 crashed      @curiosity-arm  60s  2026-06-07 17:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10507 crashed      @curiosity-arm  61s  2026-06-07 17:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10516 crashed      @curiosity-arm  60s  2026-06-07 17:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10525 crashed      @curiosity-arm  60s  2026-06-07 17:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10534 crashed      @curiosity-arm  61s  2026-06-07 17:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10543 crashed      @curiosity-arm  60s  2026-06-07 17:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10552 crashed      @curiosity-arm  61s  2026-06-07 17:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10561 crashed      @curiosity-arm  60s  2026-06-07 17:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10570 crashed      @curiosity-arm  61s  2026-06-07 18:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10579 crashed      @curiosity-arm  60s  2026-06-07 18:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10588 crashed      @curiosity-arm  60s  2026-06-07 18:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10597 crashed      @curiosity-arm  60s  2026-06-07 18:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10606 crashed      @curiosity-arm  60s  2026-06-07 18:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10615 crashed      @curiosity-arm  61s  2026-06-07 18:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10624 crashed      @curiosity-arm  60s  2026-06-07 18:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10633 crashed      @curiosity-arm  61s  2026-06-07 18:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10642 crashed      @curiosity-arm  60s  2026-06-07 18:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10651 crashed      @curiosity-arm  61s  2026-06-07 18:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10660 crashed      @curiosity-arm  60s  2026-06-07 18:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10669 crashed      @curiosity-arm  61s  2026-06-07 18:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10678 crashed      @curiosity-arm  60s  2026-06-07 18:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10687 crashed      @curiosity-arm  60s  2026-06-07 18:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10696 crashed      @curiosity-arm  61s  2026-06-07 18:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10705 crashed      @curiosity-arm  60s  2026-06-07 18:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10714 crashed      @curiosity-arm  61s  2026-06-07 18:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10723 crashed      @curiosity-arm  60s  2026-06-07 18:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10732 crashed      @curiosity-arm  60s  2026-06-07 18:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10741 crashed      @curiosity-arm  61s  2026-06-07 18:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10750 crashed      @curiosity-arm  60s  2026-06-07 18:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10759 crashed      @curiosity-arm  60s  2026-06-07 18:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10768 crashed      @curiosity-arm  60s  2026-06-07 18:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10777 crashed      @curiosity-arm  60s  2026-06-07 18:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10786 crashed      @curiosity-arm  61s  2026-06-07 18:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10795 crashed      @curiosity-arm  60s  2026-06-07 18:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10804 crashed      @curiosity-arm  60s  2026-06-07 18:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10813 crashed      @curiosity-arm  61s  2026-06-07 18:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10822 crashed      @curiosity-arm  60s  2026-06-07 18:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10831 crashed      @curiosity-arm  60s  2026-06-07 18:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10840 crashed      @curiosity-arm  60s  2026-06-07 18:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10849 crashed      @curiosity-arm  60s  2026-06-07 18:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10858 crashed      @curiosity-arm  61s  2026-06-07 18:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10867 crashed      @curiosity-arm  60s  2026-06-07 18:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10876 crashed      @curiosity-arm  61s  2026-06-07 18:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10885 crashed      @curiosity-arm  61s  2026-06-07 18:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10894 crashed      @curiosity-arm  60s  2026-06-07 18:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10903 crashed      @curiosity-arm  60s  2026-06-07 18:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10912 crashed      @curiosity-arm  61s  2026-06-07 18:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10921 crashed      @curiosity-arm  61s  2026-06-07 18:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10930 crashed      @curiosity-arm  60s  2026-06-07 18:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10939 crashed      @curiosity-arm  61s  2026-06-07 18:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10948 crashed      @curiosity-arm  60s  2026-06-07 18:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10957 crashed      @curiosity-arm  60s  2026-06-07 18:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10966 crashed      @curiosity-arm  61s  2026-06-07 18:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10975 crashed      @curiosity-arm  60s  2026-06-07 18:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10984 crashed      @curiosity-arm  60s  2026-06-07 18:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #10993 crashed      @curiosity-arm  61s  2026-06-07 18:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11002 crashed      @curiosity-arm  60s  2026-06-07 18:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11011 crashed      @curiosity-arm  60s  2026-06-07 18:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11020 crashed      @curiosity-arm  60s  2026-06-07 18:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11029 crashed      @curiosity-arm  60s  2026-06-07 18:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11038 crashed      @curiosity-arm  61s  2026-06-07 18:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11047 crashed      @curiosity-arm  60s  2026-06-07 18:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11056 crashed      @curiosity-arm  60s  2026-06-07 18:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11065 crashed      @curiosity-arm  61s  2026-06-07 18:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11074 crashed      @curiosity-arm  60s  2026-06-07 18:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11083 crashed      @curiosity-arm  60s  2026-06-07 18:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11092 crashed      @curiosity-arm  60s  2026-06-07 18:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11101 crashed      @curiosity-arm  60s  2026-06-07 19:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11110 crashed      @curiosity-arm  61s  2026-06-07 19:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11119 crashed      @curiosity-arm  60s  2026-06-07 19:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11128 crashed      @curiosity-arm  60s  2026-06-07 19:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11137 crashed      @curiosity-arm  60s  2026-06-07 19:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11146 crashed      @curiosity-arm  60s  2026-06-07 19:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11155 crashed      @curiosity-arm  61s  2026-06-07 19:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11164 crashed      @curiosity-arm  60s  2026-06-07 19:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11173 crashed      @curiosity-arm  60s  2026-06-07 19:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11182 crashed      @curiosity-arm  61s  2026-06-07 19:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11191 crashed      @curiosity-arm  60s  2026-06-07 19:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11200 crashed      @curiosity-arm  61s  2026-06-07 19:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11209 crashed      @curiosity-arm  60s  2026-06-07 19:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11218 crashed      @curiosity-arm  60s  2026-06-07 19:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11227 crashed      @curiosity-arm  61s  2026-06-07 19:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11236 crashed      @curiosity-arm  60s  2026-06-07 19:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11245 crashed      @curiosity-arm  60s  2026-06-07 19:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11254 crashed      @curiosity-arm  61s  2026-06-07 19:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11263 crashed      @curiosity-arm  60s  2026-06-07 19:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11272 crashed      @curiosity-arm  61s  2026-06-07 19:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11281 crashed      @curiosity-arm  60s  2026-06-07 19:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11290 crashed      @curiosity-arm  61s  2026-06-07 19:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11299 crashed      @curiosity-arm  60s  2026-06-07 19:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11308 crashed      @curiosity-arm  60s  2026-06-07 19:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11317 crashed      @curiosity-arm  61s  2026-06-07 19:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11326 crashed      @curiosity-arm  60s  2026-06-07 19:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11335 crashed      @curiosity-arm  60s  2026-06-07 19:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11344 crashed      @curiosity-arm  61s  2026-06-07 19:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11353 crashed      @curiosity-arm  60s  2026-06-07 19:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11362 crashed      @curiosity-arm  61s  2026-06-07 19:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11371 crashed      @curiosity-arm  60s  2026-06-07 19:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11380 crashed      @curiosity-arm  60s  2026-06-07 19:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11389 crashed      @curiosity-arm  61s  2026-06-07 19:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11398 crashed      @curiosity-arm  60s  2026-06-07 19:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11407 crashed      @curiosity-arm  60s  2026-06-07 19:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11416 crashed      @curiosity-arm  61s  2026-06-07 19:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11425 crashed      @curiosity-arm  60s  2026-06-07 19:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11434 crashed      @curiosity-arm  61s  2026-06-07 19:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11443 crashed      @curiosity-arm  60s  2026-06-07 19:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11452 crashed      @curiosity-arm  60s  2026-06-07 19:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11461 crashed      @curiosity-arm  61s  2026-06-07 19:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11470 crashed      @curiosity-arm  60s  2026-06-07 19:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11479 crashed      @curiosity-arm  61s  2026-06-07 19:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11488 crashed      @curiosity-arm  60s  2026-06-07 19:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11497 crashed      @curiosity-arm  60s  2026-06-07 19:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11506 crashed      @curiosity-arm  61s  2026-06-07 19:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11515 crashed      @curiosity-arm  60s  2026-06-07 19:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11524 crashed      @curiosity-arm  60s  2026-06-07 19:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11533 crashed      @curiosity-arm  61s  2026-06-07 19:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11542 crashed      @curiosity-arm  60s  2026-06-07 19:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11551 crashed      @curiosity-arm  61s  2026-06-07 19:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11560 crashed      @curiosity-arm  60s  2026-06-07 19:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11569 crashed      @curiosity-arm  60s  2026-06-07 19:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11578 crashed      @curiosity-arm  61s  2026-06-07 19:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11587 crashed      @curiosity-arm  60s  2026-06-07 19:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11596 crashed      @curiosity-arm  61s  2026-06-07 19:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11605 crashed      @curiosity-arm  60s  2026-06-07 19:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11614 crashed      @curiosity-arm  60s  2026-06-07 19:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11623 crashed      @curiosity-arm  61s  2026-06-07 19:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11632 crashed      @curiosity-arm  60s  2026-06-07 19:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11641 crashed      @curiosity-arm  60s  2026-06-07 20:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11650 crashed      @curiosity-arm  60s  2026-06-07 20:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11659 crashed      @curiosity-arm  60s  2026-06-07 20:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11668 crashed      @curiosity-arm  61s  2026-06-07 20:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11677 crashed      @curiosity-arm  60s  2026-06-07 20:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11686 crashed      @curiosity-arm  61s  2026-06-07 20:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11695 crashed      @curiosity-arm  60s  2026-06-07 20:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11704 crashed      @curiosity-arm  60s  2026-06-07 20:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11713 crashed      @curiosity-arm  61s  2026-06-07 20:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11722 crashed      @curiosity-arm  60s  2026-06-07 20:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11731 crashed      @curiosity-arm  61s  2026-06-07 20:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11740 crashed      @curiosity-arm  60s  2026-06-07 20:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11749 crashed      @curiosity-arm  61s  2026-06-07 20:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11758 crashed      @curiosity-arm  60s  2026-06-07 20:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11767 crashed      @curiosity-arm  60s  2026-06-07 20:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11776 crashed      @curiosity-arm  61s  2026-06-07 20:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11785 crashed      @curiosity-arm  60s  2026-06-07 20:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11794 crashed      @curiosity-arm  61s  2026-06-07 20:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11803 crashed      @curiosity-arm  60s  2026-06-07 20:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11812 crashed      @curiosity-arm  61s  2026-06-07 20:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11821 crashed      @curiosity-arm  60s  2026-06-07 20:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11830 crashed      @curiosity-arm  60s  2026-06-07 20:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11839 crashed      @curiosity-arm  61s  2026-06-07 20:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11848 crashed      @curiosity-arm  60s  2026-06-07 20:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11857 crashed      @curiosity-arm  60s  2026-06-07 20:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11866 crashed      @curiosity-arm  60s  2026-06-07 20:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11875 crashed      @curiosity-arm  60s  2026-06-07 20:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11884 crashed      @curiosity-arm  61s  2026-06-07 20:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11893 crashed      @curiosity-arm  60s  2026-06-07 20:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11902 crashed      @curiosity-arm  60s  2026-06-07 20:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11911 crashed      @curiosity-arm  61s  2026-06-07 20:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11920 crashed      @curiosity-arm  60s  2026-06-07 20:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11929 crashed      @curiosity-arm  61s  2026-06-07 20:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11938 crashed      @curiosity-arm  60s  2026-06-07 20:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11947 crashed      @curiosity-arm  60s  2026-06-07 20:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11956 crashed      @curiosity-arm  61s  2026-06-07 20:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11965 crashed      @curiosity-arm  60s  2026-06-07 20:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11974 crashed      @curiosity-arm  60s  2026-06-07 20:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11983 crashed      @curiosity-arm  60s  2026-06-07 20:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11992 crashed      @curiosity-arm  60s  2026-06-07 20:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12001 crashed      @curiosity-arm  61s  2026-06-07 20:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12010 crashed      @curiosity-arm  60s  2026-06-07 20:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12019 crashed      @curiosity-arm  60s  2026-06-07 20:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12028 crashed      @curiosity-arm  61s  2026-06-07 20:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12037 crashed      @curiosity-arm  60s  2026-06-07 20:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12046 crashed      @curiosity-arm  60s  2026-06-07 20:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12055 crashed      @curiosity-arm  60s  2026-06-07 20:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12064 crashed      @curiosity-arm  60s  2026-06-07 20:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12073 crashed      @curiosity-arm  61s  2026-06-07 20:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12082 crashed      @curiosity-arm  60s  2026-06-07 20:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12091 crashed      @curiosity-arm  60s  2026-06-07 20:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12100 crashed      @curiosity-arm  60s  2026-06-07 20:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12109 crashed      @curiosity-arm  60s  2026-06-07 20:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12118 crashed      @curiosity-arm  61s  2026-06-07 20:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12127 crashed      @curiosity-arm  60s  2026-06-07 20:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12136 crashed      @curiosity-arm  60s  2026-06-07 20:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12145 crashed      @curiosity-arm  61s  2026-06-07 20:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12154 crashed      @curiosity-arm  60s  2026-06-07 20:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12163 crashed      @curiosity-arm  61s  2026-06-07 20:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12172 crashed      @curiosity-arm  60s  2026-06-07 20:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12181 crashed      @curiosity-arm  60s  2026-06-07 21:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12190 crashed      @curiosity-arm  61s  2026-06-07 21:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12199 crashed      @curiosity-arm  60s  2026-06-07 21:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12208 crashed      @curiosity-arm  61s  2026-06-07 21:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12217 crashed      @curiosity-arm  61s  2026-06-07 21:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12226 crashed      @curiosity-arm  60s  2026-06-07 21:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12235 crashed      @curiosity-arm  61s  2026-06-07 21:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12244 crashed      @curiosity-arm  60s  2026-06-07 21:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12253 crashed      @curiosity-arm  61s  2026-06-07 21:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12262 crashed      @curiosity-arm  60s  2026-06-07 21:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12271 crashed      @curiosity-arm  61s  2026-06-07 21:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12280 crashed      @curiosity-arm  60s  2026-06-07 21:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12289 crashed      @curiosity-arm  61s  2026-06-07 21:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12298 crashed      @curiosity-arm  60s  2026-06-07 21:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12307 crashed      @curiosity-arm  60s  2026-06-07 21:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12316 crashed      @curiosity-arm  61s  2026-06-07 21:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12325 crashed      @curiosity-arm  60s  2026-06-07 21:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12334 crashed      @curiosity-arm  61s  2026-06-07 21:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12343 crashed      @curiosity-arm  60s  2026-06-07 21:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12352 crashed      @curiosity-arm  60s  2026-06-07 21:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12361 crashed      @curiosity-arm  60s  2026-06-07 21:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12370 crashed      @curiosity-arm  60s  2026-06-07 21:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12379 crashed      @curiosity-arm  61s  2026-06-07 21:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12388 crashed      @curiosity-arm  60s  2026-06-07 21:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12397 crashed      @curiosity-arm  60s  2026-06-07 21:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12406 crashed      @curiosity-arm  60s  2026-06-07 21:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12415 crashed      @curiosity-arm  60s  2026-06-07 21:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12424 crashed      @curiosity-arm  61s  2026-06-07 21:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12433 crashed      @curiosity-arm  60s  2026-06-07 21:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12442 crashed      @curiosity-arm  60s  2026-06-07 21:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12451 crashed      @curiosity-arm  61s  2026-06-07 21:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12460 crashed      @curiosity-arm  60s  2026-06-07 21:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12469 crashed      @curiosity-arm  61s  2026-06-07 21:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12478 crashed      @curiosity-arm  60s  2026-06-07 21:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12487 crashed      @curiosity-arm  61s  2026-06-07 21:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12496 crashed      @curiosity-arm  60s  2026-06-07 21:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12505 crashed      @curiosity-arm  60s  2026-06-07 21:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12514 crashed      @curiosity-arm  61s  2026-06-07 21:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12523 crashed      @curiosity-arm  60s  2026-06-07 21:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12532 crashed      @curiosity-arm  60s  2026-06-07 21:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12541 crashed      @curiosity-arm  60s  2026-06-07 21:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12550 crashed      @curiosity-arm  60s  2026-06-07 21:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12559 crashed      @curiosity-arm  61s  2026-06-07 21:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12568 crashed      @curiosity-arm  60s  2026-06-07 21:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12577 crashed      @curiosity-arm  60s  2026-06-07 21:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12586 crashed      @curiosity-arm  60s  2026-06-07 21:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12595 crashed      @curiosity-arm  60s  2026-06-07 21:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12604 crashed      @curiosity-arm  61s  2026-06-07 21:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12613 crashed      @curiosity-arm  60s  2026-06-07 21:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12622 crashed      @curiosity-arm  60s  2026-06-07 21:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12631 crashed      @curiosity-arm  60s  2026-06-07 21:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12640 crashed      @curiosity-arm  60s  2026-06-07 21:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12649 crashed      @curiosity-arm  61s  2026-06-07 21:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12658 crashed      @curiosity-arm  60s  2026-06-07 21:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12667 crashed      @curiosity-arm  60s  2026-06-07 21:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12676 crashed      @curiosity-arm  61s  2026-06-07 21:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12685 crashed      @curiosity-arm  60s  2026-06-07 21:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12694 crashed      @curiosity-arm  60s  2026-06-07 21:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12703 crashed      @curiosity-arm  60s  2026-06-07 21:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12712 crashed      @curiosity-arm  60s  2026-06-07 22:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12721 crashed      @curiosity-arm  61s  2026-06-07 22:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12730 crashed      @curiosity-arm  60s  2026-06-07 22:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12739 crashed      @curiosity-arm  61s  2026-06-07 22:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12748 crashed      @curiosity-arm  60s  2026-06-07 22:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12757 crashed      @curiosity-arm  60s  2026-06-07 22:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12766 crashed      @curiosity-arm  61s  2026-06-07 22:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12775 crashed      @curiosity-arm  60s  2026-06-07 22:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12784 crashed      @curiosity-arm  60s  2026-06-07 22:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12793 crashed      @curiosity-arm  61s  2026-06-07 22:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12802 crashed      @curiosity-arm  60s  2026-06-07 22:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12811 crashed      @curiosity-arm  61s  2026-06-07 22:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12820 crashed      @curiosity-arm  60s  2026-06-07 22:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12829 crashed      @curiosity-arm  60s  2026-06-07 22:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12838 crashed      @curiosity-arm  60s  2026-06-07 22:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12847 crashed      @curiosity-arm  60s  2026-06-07 22:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12856 crashed      @curiosity-arm  61s  2026-06-07 22:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12865 crashed      @curiosity-arm  60s  2026-06-07 22:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12874 crashed      @curiosity-arm  60s  2026-06-07 22:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12883 crashed      @curiosity-arm  61s  2026-06-07 22:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12892 crashed      @curiosity-arm  60s  2026-06-07 22:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12901 crashed      @curiosity-arm  61s  2026-06-07 22:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12910 crashed      @curiosity-arm  60s  2026-06-07 22:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12919 crashed      @curiosity-arm  60s  2026-06-07 22:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12928 crashed      @curiosity-arm  61s  2026-06-07 22:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12937 crashed      @curiosity-arm  60s  2026-06-07 22:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12946 crashed      @curiosity-arm  60s  2026-06-07 22:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12955 crashed      @curiosity-arm  60s  2026-06-07 22:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12964 crashed      @curiosity-arm  60s  2026-06-07 22:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12973 crashed      @curiosity-arm  61s  2026-06-07 22:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12982 crashed      @curiosity-arm  60s  2026-06-07 22:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #12991 crashed      @curiosity-arm  60s  2026-06-07 22:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13000 crashed      @curiosity-arm  61s  2026-06-07 22:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13009 crashed      @curiosity-arm  60s  2026-06-07 22:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13018 crashed      @curiosity-arm  61s  2026-06-07 22:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13027 crashed      @curiosity-arm  60s  2026-06-07 22:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13036 crashed      @curiosity-arm  60s  2026-06-07 22:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13045 crashed      @curiosity-arm  61s  2026-06-07 22:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13054 crashed      @curiosity-arm  60s  2026-06-07 22:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13063 crashed      @curiosity-arm  60s  2026-06-07 22:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13072 crashed      @curiosity-arm  60s  2026-06-07 22:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13081 crashed      @curiosity-arm  60s  2026-06-07 22:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13090 crashed      @curiosity-arm  61s  2026-06-07 22:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13099 crashed      @curiosity-arm  60s  2026-06-07 22:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13108 crashed      @curiosity-arm  60s  2026-06-07 22:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13117 crashed      @curiosity-arm  61s  2026-06-07 22:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13126 crashed      @curiosity-arm  60s  2026-06-07 22:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13135 crashed      @curiosity-arm  60s  2026-06-07 22:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13144 crashed      @curiosity-arm  60s  2026-06-07 22:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13153 crashed      @curiosity-arm  60s  2026-06-07 22:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13162 crashed      @curiosity-arm  61s  2026-06-07 22:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13171 crashed      @curiosity-arm  60s  2026-06-07 22:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13180 crashed      @curiosity-arm  60s  2026-06-07 22:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13189 crashed      @curiosity-arm  61s  2026-06-07 22:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13198 crashed      @curiosity-arm  60s  2026-06-07 22:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13207 crashed      @curiosity-arm  61s  2026-06-07 22:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13216 crashed      @curiosity-arm  60s  2026-06-07 22:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13225 crashed      @curiosity-arm  60s  2026-06-07 22:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13234 crashed      @curiosity-arm  61s  2026-06-07 22:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13243 crashed      @curiosity-arm  60s  2026-06-07 22:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13252 crashed      @curiosity-arm  61s  2026-06-07 23:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13261 crashed      @curiosity-arm  60s  2026-06-07 23:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13270 crashed      @curiosity-arm  60s  2026-06-07 23:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13279 crashed      @curiosity-arm  61s  2026-06-07 23:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13288 crashed      @curiosity-arm  60s  2026-06-07 23:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13297 crashed      @curiosity-arm  60s  2026-06-07 23:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13306 crashed      @curiosity-arm  60s  2026-06-07 23:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13315 crashed      @curiosity-arm  60s  2026-06-07 23:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13324 crashed      @curiosity-arm  61s  2026-06-07 23:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13333 crashed      @curiosity-arm  60s  2026-06-07 23:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13342 crashed      @curiosity-arm  60s  2026-06-07 23:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13351 crashed      @curiosity-arm  60s  2026-06-07 23:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13360 crashed      @curiosity-arm  60s  2026-06-07 23:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13369 crashed      @curiosity-arm  61s  2026-06-07 23:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13378 crashed      @curiosity-arm  60s  2026-06-07 23:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13387 crashed      @curiosity-arm  60s  2026-06-07 23:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13396 crashed      @curiosity-arm  61s  2026-06-07 23:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13405 crashed      @curiosity-arm  60s  2026-06-07 23:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13414 crashed      @curiosity-arm  60s  2026-06-07 23:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13423 crashed      @curiosity-arm  61s  2026-06-07 23:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13432 crashed      @curiosity-arm  60s  2026-06-07 23:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13441 crashed      @curiosity-arm  61s  2026-06-07 23:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13450 crashed      @curiosity-arm  60s  2026-06-07 23:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13459 crashed      @curiosity-arm  60s  2026-06-07 23:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13468 crashed      @curiosity-arm  61s  2026-06-07 23:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13477 crashed      @curiosity-arm  60s  2026-06-07 23:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13486 crashed      @curiosity-arm  61s  2026-06-07 23:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13495 crashed      @curiosity-arm  60s  2026-06-07 23:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13504 crashed      @curiosity-arm  60s  2026-06-07 23:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13513 crashed      @curiosity-arm  61s  2026-06-07 23:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13522 crashed      @curiosity-arm  60s  2026-06-07 23:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13531 crashed      @curiosity-arm  60s  2026-06-07 23:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13540 crashed      @curiosity-arm  60s  2026-06-07 23:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13549 crashed      @curiosity-arm  60s  2026-06-07 23:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13558 crashed      @curiosity-arm  61s  2026-06-07 23:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13567 crashed      @curiosity-arm  61s  2026-06-07 23:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13576 crashed      @curiosity-arm  60s  2026-06-07 23:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13585 crashed      @curiosity-arm  61s  2026-06-07 23:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13594 crashed      @curiosity-arm  60s  2026-06-07 23:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13603 crashed      @curiosity-arm  61s  2026-06-07 23:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13612 crashed      @curiosity-arm  60s  2026-06-07 23:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13621 crashed      @curiosity-arm  61s  2026-06-07 23:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13630 crashed      @curiosity-arm  60s  2026-06-07 23:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13639 crashed      @curiosity-arm  60s  2026-06-07 23:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13648 crashed      @curiosity-arm  61s  2026-06-07 23:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13657 crashed      @curiosity-arm  60s  2026-06-07 23:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13666 crashed      @curiosity-arm  61s  2026-06-07 23:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13675 crashed      @curiosity-arm  60s  2026-06-07 23:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13684 crashed      @curiosity-arm  60s  2026-06-07 23:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13693 crashed      @curiosity-arm  60s  2026-06-07 23:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13702 crashed      @curiosity-arm  60s  2026-06-07 23:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13711 crashed      @curiosity-arm  61s  2026-06-07 23:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13720 crashed      @curiosity-arm  60s  2026-06-07 23:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13729 crashed      @curiosity-arm  60s  2026-06-07 23:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13738 crashed      @curiosity-arm  60s  2026-06-07 23:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13747 crashed      @curiosity-arm  60s  2026-06-07 23:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13756 crashed      @curiosity-arm  61s  2026-06-07 23:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13765 crashed      @curiosity-arm  60s  2026-06-07 23:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13774 crashed      @curiosity-arm  61s  2026-06-07 23:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13783 crashed      @curiosity-arm  61s  2026-06-08 00:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13792 crashed      @curiosity-arm  61s  2026-06-08 00:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13801 crashed      @curiosity-arm  60s  2026-06-08 00:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13810 crashed      @curiosity-arm  60s  2026-06-08 00:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13819 crashed      @curiosity-arm  61s  2026-06-08 00:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13828 crashed      @curiosity-arm  60s  2026-06-08 00:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13837 crashed      @curiosity-arm  61s  2026-06-08 00:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13846 crashed      @curiosity-arm  60s  2026-06-08 00:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13855 crashed      @curiosity-arm  61s  2026-06-08 00:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13864 crashed      @curiosity-arm  60s  2026-06-08 00:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13873 crashed      @curiosity-arm  60s  2026-06-08 00:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13882 crashed      @curiosity-arm  61s  2026-06-08 00:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13891 crashed      @curiosity-arm  60s  2026-06-08 00:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13900 crashed      @curiosity-arm  61s  2026-06-08 00:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13909 crashed      @curiosity-arm  60s  2026-06-08 00:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13918 crashed      @curiosity-arm  61s  2026-06-08 00:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13927 crashed      @curiosity-arm  60s  2026-06-08 00:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13936 crashed      @curiosity-arm  60s  2026-06-08 00:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13945 crashed      @curiosity-arm  61s  2026-06-08 00:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13954 crashed      @curiosity-arm  60s  2026-06-08 00:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13963 crashed      @curiosity-arm  61s  2026-06-08 00:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13972 crashed      @curiosity-arm  60s  2026-06-08 00:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13981 crashed      @curiosity-arm  60s  2026-06-08 00:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13990 crashed      @curiosity-arm  60s  2026-06-08 00:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13999 crashed      @curiosity-arm  60s  2026-06-08 00:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14008 crashed      @curiosity-arm  61s  2026-06-08 00:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14017 crashed      @curiosity-arm  60s  2026-06-08 00:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14026 crashed      @curiosity-arm  61s  2026-06-08 00:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14035 crashed      @curiosity-arm  60s  2026-06-08 00:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14044 crashed      @curiosity-arm  60s  2026-06-08 00:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14053 crashed      @curiosity-arm  61s  2026-06-08 00:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14062 crashed      @curiosity-arm  60s  2026-06-08 00:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14071 crashed      @curiosity-arm  60s  2026-06-08 00:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14080 crashed      @curiosity-arm  60s  2026-06-08 00:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14089 crashed      @curiosity-arm  60s  2026-06-08 00:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14098 crashed      @curiosity-arm  61s  2026-06-08 00:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14107 crashed      @curiosity-arm  60s  2026-06-08 00:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14116 crashed      @curiosity-arm  61s  2026-06-08 00:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14125 crashed      @curiosity-arm  60s  2026-06-08 00:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14134 crashed      @curiosity-arm  60s  2026-06-08 00:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14143 crashed      @curiosity-arm  60s  2026-06-08 00:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14152 crashed      @curiosity-arm  60s  2026-06-08 00:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14161 crashed      @curiosity-arm  61s  2026-06-08 00:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14170 crashed      @curiosity-arm  60s  2026-06-08 00:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14179 crashed      @curiosity-arm  60s  2026-06-08 00:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14188 crashed      @curiosity-arm  60s  2026-06-08 00:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14197 crashed      @curiosity-arm  60s  2026-06-08 00:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14206 crashed      @curiosity-arm  61s  2026-06-08 00:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14215 crashed      @curiosity-arm  60s  2026-06-08 00:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14224 crashed      @curiosity-arm  61s  2026-06-08 00:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14233 crashed      @curiosity-arm  60s  2026-06-08 00:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14242 crashed      @curiosity-arm  61s  2026-06-08 00:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14251 crashed      @curiosity-arm  60s  2026-06-08 00:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14260 crashed      @curiosity-arm  60s  2026-06-08 00:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14269 crashed      @curiosity-arm  60s  2026-06-08 00:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14278 crashed      @curiosity-arm  60s  2026-06-08 00:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14287 crashed      @curiosity-arm  60s  2026-06-08 00:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14296 crashed      @curiosity-arm  60s  2026-06-08 00:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14305 crashed      @curiosity-arm  61s  2026-06-08 00:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14314 crashed      @curiosity-arm  60s  2026-06-08 00:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14323 crashed      @curiosity-arm  61s  2026-06-08 01:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14332 crashed      @curiosity-arm  60s  2026-06-08 01:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14341 crashed      @curiosity-arm  61s  2026-06-08 01:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14350 crashed      @curiosity-arm  60s  2026-06-08 01:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14359 crashed      @curiosity-arm  61s  2026-06-08 01:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14368 crashed      @curiosity-arm  60s  2026-06-08 01:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14377 crashed      @curiosity-arm  60s  2026-06-08 01:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14386 crashed      @curiosity-arm  61s  2026-06-08 01:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14395 crashed      @curiosity-arm  60s  2026-06-08 01:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14404 crashed      @curiosity-arm  61s  2026-06-08 01:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14413 crashed      @curiosity-arm  60s  2026-06-08 01:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14422 crashed      @curiosity-arm  60s  2026-06-08 01:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14431 crashed      @curiosity-arm  60s  2026-06-08 01:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14440 crashed      @curiosity-arm  60s  2026-06-08 01:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14449 crashed      @curiosity-arm  61s  2026-06-08 01:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14458 crashed      @curiosity-arm  60s  2026-06-08 01:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14467 crashed      @curiosity-arm  61s  2026-06-08 01:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14476 crashed      @curiosity-arm  60s  2026-06-08 01:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14485 crashed      @curiosity-arm  60s  2026-06-08 01:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14494 crashed      @curiosity-arm  61s  2026-06-08 01:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14503 crashed      @curiosity-arm  60s  2026-06-08 01:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14512 crashed      @curiosity-arm  61s  2026-06-08 01:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14521 crashed      @curiosity-arm  60s  2026-06-08 01:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14530 crashed      @curiosity-arm  60s  2026-06-08 01:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14539 crashed      @curiosity-arm  61s  2026-06-08 01:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14548 crashed      @curiosity-arm  60s  2026-06-08 01:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14557 crashed      @curiosity-arm  60s  2026-06-08 01:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14566 crashed      @curiosity-arm  61s  2026-06-08 01:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14575 crashed      @curiosity-arm  60s  2026-06-08 01:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14584 crashed      @curiosity-arm  61s  2026-06-08 01:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14593 crashed      @curiosity-arm  60s  2026-06-08 01:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14602 crashed      @curiosity-arm  60s  2026-06-08 01:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14611 crashed      @curiosity-arm  61s  2026-06-08 01:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14620 crashed      @curiosity-arm  60s  2026-06-08 01:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14629 crashed      @curiosity-arm  61s  2026-06-08 01:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14638 crashed      @curiosity-arm  60s  2026-06-08 01:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14647 crashed      @curiosity-arm  60s  2026-06-08 01:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14656 crashed      @curiosity-arm  61s  2026-06-08 01:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14665 crashed      @curiosity-arm  60s  2026-06-08 01:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14674 crashed      @curiosity-arm  61s  2026-06-08 01:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14683 crashed      @curiosity-arm  60s  2026-06-08 01:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14692 crashed      @curiosity-arm  60s  2026-06-08 01:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14701 crashed      @curiosity-arm  61s  2026-06-08 01:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14710 crashed      @curiosity-arm  60s  2026-06-08 01:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14719 crashed      @curiosity-arm  61s  2026-06-08 01:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14728 crashed      @curiosity-arm  60s  2026-06-08 01:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14737 crashed      @curiosity-arm  60s  2026-06-08 01:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14746 crashed      @curiosity-arm  60s  2026-06-08 01:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14755 crashed      @curiosity-arm  60s  2026-06-08 01:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14764 crashed      @curiosity-arm  61s  2026-06-08 01:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14773 crashed      @curiosity-arm  60s  2026-06-08 01:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14782 crashed      @curiosity-arm  61s  2026-06-08 01:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14791 crashed      @curiosity-arm  60s  2026-06-08 01:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14800 crashed      @curiosity-arm  60s  2026-06-08 01:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14809 crashed      @curiosity-arm  60s  2026-06-08 01:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14818 crashed      @curiosity-arm  61s  2026-06-08 01:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14827 crashed      @curiosity-arm  60s  2026-06-08 01:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14836 crashed      @curiosity-arm  61s  2026-06-08 01:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14845 crashed      @curiosity-arm  60s  2026-06-08 01:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14854 crashed      @curiosity-arm  60s  2026-06-08 02:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14863 crashed      @curiosity-arm  61s  2026-06-08 02:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14872 crashed      @curiosity-arm  60s  2026-06-08 02:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14881 crashed      @curiosity-arm  61s  2026-06-08 02:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14890 crashed      @curiosity-arm  60s  2026-06-08 02:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14899 crashed      @curiosity-arm  61s  2026-06-08 02:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14908 crashed      @curiosity-arm  60s  2026-06-08 02:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14917 crashed      @curiosity-arm  60s  2026-06-08 02:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14926 crashed      @curiosity-arm  61s  2026-06-08 02:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14935 crashed      @curiosity-arm  60s  2026-06-08 02:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14944 crashed      @curiosity-arm  61s  2026-06-08 02:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14953 crashed      @curiosity-arm  60s  2026-06-08 02:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14962 crashed      @curiosity-arm  60s  2026-06-08 02:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14971 crashed      @curiosity-arm  61s  2026-06-08 02:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14980 crashed      @curiosity-arm  60s  2026-06-08 02:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14989 crashed      @curiosity-arm  61s  2026-06-08 02:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #14998 crashed      @curiosity-arm  60s  2026-06-08 02:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15007 crashed      @curiosity-arm  60s  2026-06-08 02:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15016 crashed      @curiosity-arm  61s  2026-06-08 02:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15025 crashed      @curiosity-arm  60s  2026-06-08 02:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15034 crashed      @curiosity-arm  61s  2026-06-08 02:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15043 crashed      @curiosity-arm  60s  2026-06-08 02:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15052 crashed      @curiosity-arm  61s  2026-06-08 02:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15061 crashed      @curiosity-arm  60s  2026-06-08 02:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15070 crashed      @curiosity-arm  60s  2026-06-08 02:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15079 crashed      @curiosity-arm  60s  2026-06-08 02:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15088 crashed      @curiosity-arm  60s  2026-06-08 02:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15097 crashed      @curiosity-arm  61s  2026-06-08 02:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15106 crashed      @curiosity-arm  60s  2026-06-08 02:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15115 crashed      @curiosity-arm  61s  2026-06-08 02:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15124 crashed      @curiosity-arm  60s  2026-06-08 02:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15133 crashed      @curiosity-arm  60s  2026-06-08 02:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15142 crashed      @curiosity-arm  60s  2026-06-08 02:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15151 crashed      @curiosity-arm  60s  2026-06-08 02:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15160 crashed      @curiosity-arm  61s  2026-06-08 02:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15169 crashed      @curiosity-arm  60s  2026-06-08 02:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15178 crashed      @curiosity-arm  61s  2026-06-08 02:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15187 crashed      @curiosity-arm  60s  2026-06-08 02:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15196 crashed      @curiosity-arm  61s  2026-06-08 02:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15205 crashed      @curiosity-arm  60s  2026-06-08 02:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15214 crashed      @curiosity-arm  61s  2026-06-08 02:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15223 crashed      @curiosity-arm  60s  2026-06-08 02:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15232 crashed      @curiosity-arm  60s  2026-06-08 02:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15241 crashed      @curiosity-arm  60s  2026-06-08 02:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15250 crashed      @curiosity-arm  60s  2026-06-08 02:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15259 crashed      @curiosity-arm  61s  2026-06-08 02:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15268 crashed      @curiosity-arm  60s  2026-06-08 02:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15277 crashed      @curiosity-arm  61s  2026-06-08 02:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15286 crashed      @curiosity-arm  60s  2026-06-08 02:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15295 crashed      @curiosity-arm  60s  2026-06-08 02:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15304 crashed      @curiosity-arm  61s  2026-06-08 02:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15313 crashed      @curiosity-arm  60s  2026-06-08 02:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15322 crashed      @curiosity-arm  61s  2026-06-08 02:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15331 crashed      @curiosity-arm  60s  2026-06-08 02:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15340 crashed      @curiosity-arm  61s  2026-06-08 02:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15349 crashed      @curiosity-arm  60s  2026-06-08 02:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15358 crashed      @curiosity-arm  60s  2026-06-08 02:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15367 crashed      @curiosity-arm  61s  2026-06-08 02:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15376 crashed      @curiosity-arm  60s  2026-06-08 02:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15385 crashed      @curiosity-arm  61s  2026-06-08 02:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15394 crashed      @curiosity-arm  60s  2026-06-08 03:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15403 crashed      @curiosity-arm  61s  2026-06-08 03:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15412 crashed      @curiosity-arm  60s  2026-06-08 03:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15421 crashed      @curiosity-arm  61s  2026-06-08 03:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15430 crashed      @curiosity-arm  60s  2026-06-08 03:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15439 crashed      @curiosity-arm  60s  2026-06-08 03:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15448 crashed      @curiosity-arm  60s  2026-06-08 03:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15457 crashed      @curiosity-arm  60s  2026-06-08 03:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15466 crashed      @curiosity-arm  60s  2026-06-08 03:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15475 crashed      @curiosity-arm  60s  2026-06-08 03:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15484 crashed      @curiosity-arm  61s  2026-06-08 03:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15493 crashed      @curiosity-arm  60s  2026-06-08 03:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15502 crashed      @curiosity-arm  61s  2026-06-08 03:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15511 crashed      @curiosity-arm  60s  2026-06-08 03:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15520 crashed      @curiosity-arm  61s  2026-06-08 03:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15529 crashed      @curiosity-arm  61s  2026-06-08 03:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15538 crashed      @curiosity-arm  60s  2026-06-08 03:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15547 crashed      @curiosity-arm  61s  2026-06-08 03:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15556 crashed      @curiosity-arm  60s  2026-06-08 03:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15565 crashed      @curiosity-arm  61s  2026-06-08 03:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15574 crashed      @curiosity-arm  60s  2026-06-08 03:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15583 crashed      @curiosity-arm  61s  2026-06-08 03:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15592 crashed      @curiosity-arm  60s  2026-06-08 03:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15601 crashed      @curiosity-arm  61s  2026-06-08 03:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15610 crashed      @curiosity-arm  60s  2026-06-08 03:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15619 crashed      @curiosity-arm  61s  2026-06-08 03:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15628 crashed      @curiosity-arm  60s  2026-06-08 03:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15637 crashed      @curiosity-arm  61s  2026-06-08 03:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15646 crashed      @curiosity-arm  60s  2026-06-08 03:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15655 crashed      @curiosity-arm  61s  2026-06-08 03:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15664 crashed      @curiosity-arm  60s  2026-06-08 03:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15673 crashed      @curiosity-arm  60s  2026-06-08 03:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15682 crashed      @curiosity-arm  61s  2026-06-08 03:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15691 crashed      @curiosity-arm  60s  2026-06-08 03:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15700 crashed      @curiosity-arm  61s  2026-06-08 03:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15709 crashed      @curiosity-arm  60s  2026-06-08 03:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15718 crashed      @curiosity-arm  61s  2026-06-08 03:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15727 crashed      @curiosity-arm  60s  2026-06-08 03:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15736 crashed      @curiosity-arm  60s  2026-06-08 03:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15745 crashed      @curiosity-arm  61s  2026-06-08 03:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15754 crashed      @curiosity-arm  60s  2026-06-08 03:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15763 crashed      @curiosity-arm  61s  2026-06-08 03:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15772 crashed      @curiosity-arm  60s  2026-06-08 03:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15781 crashed      @curiosity-arm  60s  2026-06-08 03:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15790 crashed      @curiosity-arm  60s  2026-06-08 03:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15799 crashed      @curiosity-arm  60s  2026-06-08 03:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15808 crashed      @curiosity-arm  61s  2026-06-08 03:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15817 crashed      @curiosity-arm  60s  2026-06-08 03:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15826 crashed      @curiosity-arm  61s  2026-06-08 03:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15835 crashed      @curiosity-arm  60s  2026-06-08 03:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15844 crashed      @curiosity-arm  60s  2026-06-08 03:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15853 crashed      @curiosity-arm  60s  2026-06-08 03:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15862 crashed      @curiosity-arm  60s  2026-06-08 03:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15871 crashed      @curiosity-arm  61s  2026-06-08 03:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15880 crashed      @curiosity-arm  60s  2026-06-08 03:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15889 crashed      @curiosity-arm  61s  2026-06-08 03:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15898 crashed      @curiosity-arm  60s  2026-06-08 03:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15907 crashed      @curiosity-arm  60s  2026-06-08 03:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15916 crashed      @curiosity-arm  61s  2026-06-08 03:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15925 crashed      @curiosity-arm  60s  2026-06-08 03:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15934 crashed      @curiosity-arm  61s  2026-06-08 04:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15943 crashed      @curiosity-arm  60s  2026-06-08 04:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15952 crashed      @curiosity-arm  61s  2026-06-08 04:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15961 crashed      @curiosity-arm  60s  2026-06-08 04:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15970 crashed      @curiosity-arm  61s  2026-06-08 04:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15979 crashed      @curiosity-arm  60s  2026-06-08 04:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15988 crashed      @curiosity-arm  61s  2026-06-08 04:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15997 crashed      @curiosity-arm  60s  2026-06-08 04:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16006 crashed      @curiosity-arm  60s  2026-06-08 04:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16015 crashed      @curiosity-arm  61s  2026-06-08 04:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16024 crashed      @curiosity-arm  61s  2026-06-08 04:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16033 crashed      @curiosity-arm  60s  2026-06-08 04:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16042 crashed      @curiosity-arm  61s  2026-06-08 04:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16051 crashed      @curiosity-arm  61s  2026-06-08 04:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16060 crashed      @curiosity-arm  61s  2026-06-08 04:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16069 crashed      @curiosity-arm  60s  2026-06-08 04:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16078 crashed      @curiosity-arm  60s  2026-06-08 04:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16087 crashed      @curiosity-arm  60s  2026-06-08 04:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16096 crashed      @curiosity-arm  60s  2026-06-08 04:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16105 crashed      @curiosity-arm  61s  2026-06-08 04:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16114 crashed      @curiosity-arm  60s  2026-06-08 04:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16123 crashed      @curiosity-arm  61s  2026-06-08 04:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16132 crashed      @curiosity-arm  60s  2026-06-08 04:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16141 crashed      @curiosity-arm  61s  2026-06-08 04:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16150 crashed      @curiosity-arm  60s  2026-06-08 04:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16159 crashed      @curiosity-arm  61s  2026-06-08 04:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16168 crashed      @curiosity-arm  60s  2026-06-08 04:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16177 crashed      @curiosity-arm  60s  2026-06-08 04:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16186 crashed      @curiosity-arm  61s  2026-06-08 04:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16195 crashed      @curiosity-arm  60s  2026-06-08 04:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16204 crashed      @curiosity-arm  61s  2026-06-08 04:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16213 crashed      @curiosity-arm  60s  2026-06-08 04:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16222 crashed      @curiosity-arm  60s  2026-06-08 04:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16231 crashed      @curiosity-arm  60s  2026-06-08 04:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16240 crashed      @curiosity-arm  60s  2026-06-08 04:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16249 crashed      @curiosity-arm  61s  2026-06-08 04:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16258 crashed      @curiosity-arm  60s  2026-06-08 04:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16267 crashed      @curiosity-arm  61s  2026-06-08 04:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16276 crashed      @curiosity-arm  60s  2026-06-08 04:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16285 crashed      @curiosity-arm  61s  2026-06-08 04:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16294 crashed      @curiosity-arm  60s  2026-06-08 04:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16303 crashed      @curiosity-arm  61s  2026-06-08 04:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16312 crashed      @curiosity-arm  60s  2026-06-08 04:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16321 crashed      @curiosity-arm  61s  2026-06-08 04:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16330 crashed      @curiosity-arm  60s  2026-06-08 04:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16339 crashed      @curiosity-arm  60s  2026-06-08 04:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16348 crashed      @curiosity-arm  60s  2026-06-08 04:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16357 crashed      @curiosity-arm  60s  2026-06-08 04:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16366 crashed      @curiosity-arm  60s  2026-06-08 04:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16375 crashed      @curiosity-arm  60s  2026-06-08 04:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16384 crashed      @curiosity-arm  61s  2026-06-08 04:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16393 crashed      @curiosity-arm  60s  2026-06-08 04:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16402 crashed      @curiosity-arm  61s  2026-06-08 04:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16411 crashed      @curiosity-arm  60s  2026-06-08 04:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16420 crashed      @curiosity-arm  61s  2026-06-08 04:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16429 crashed      @curiosity-arm  60s  2026-06-08 04:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16438 crashed      @curiosity-arm  61s  2026-06-08 04:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16447 crashed      @curiosity-arm  60s  2026-06-08 04:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16456 crashed      @curiosity-arm  60s  2026-06-08 05:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16465 crashed      @curiosity-arm  61s  2026-06-08 05:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16474 crashed      @curiosity-arm  60s  2026-06-08 05:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16483 crashed      @curiosity-arm  61s  2026-06-08 05:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16492 crashed      @curiosity-arm  60s  2026-06-08 05:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16501 crashed      @curiosity-arm  60s  2026-06-08 05:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16510 crashed      @curiosity-arm  61s  2026-06-08 05:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16519 crashed      @curiosity-arm  60s  2026-06-08 05:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16528 crashed      @curiosity-arm  61s  2026-06-08 05:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16537 crashed      @curiosity-arm  60s  2026-06-08 05:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16546 crashed      @curiosity-arm  61s  2026-06-08 05:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16555 crashed      @curiosity-arm  60s  2026-06-08 05:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16564 crashed      @curiosity-arm  60s  2026-06-08 05:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16573 crashed      @curiosity-arm  61s  2026-06-08 05:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16582 crashed      @curiosity-arm  60s  2026-06-08 05:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16591 crashed      @curiosity-arm  61s  2026-06-08 05:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16600 crashed      @curiosity-arm  60s  2026-06-08 05:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16609 crashed      @curiosity-arm  60s  2026-06-08 05:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16618 crashed      @curiosity-arm  60s  2026-06-08 05:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16627 crashed      @curiosity-arm  60s  2026-06-08 05:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16636 crashed      @curiosity-arm  61s  2026-06-08 05:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16645 crashed      @curiosity-arm  60s  2026-06-08 05:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16654 crashed      @curiosity-arm  61s  2026-06-08 05:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16663 crashed      @curiosity-arm  60s  2026-06-08 05:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16672 crashed      @curiosity-arm  60s  2026-06-08 05:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16681 crashed      @curiosity-arm  60s  2026-06-08 05:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16690 crashed      @curiosity-arm  60s  2026-06-08 05:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16699 crashed      @curiosity-arm  61s  2026-06-08 05:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16708 crashed      @curiosity-arm  60s  2026-06-08 05:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16717 crashed      @curiosity-arm  61s  2026-06-08 05:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16726 crashed      @curiosity-arm  60s  2026-06-08 05:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16735 crashed      @curiosity-arm  60s  2026-06-08 05:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16744 crashed      @curiosity-arm  60s  2026-06-08 05:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16753 crashed      @curiosity-arm  60s  2026-06-08 05:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16762 crashed      @curiosity-arm  61s  2026-06-08 05:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16771 crashed      @curiosity-arm  60s  2026-06-08 05:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16780 crashed      @curiosity-arm  61s  2026-06-08 05:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16789 crashed      @curiosity-arm  60s  2026-06-08 05:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16798 crashed      @curiosity-arm  60s  2026-06-08 05:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16807 crashed      @curiosity-arm  61s  2026-06-08 05:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16816 crashed      @curiosity-arm  60s  2026-06-08 05:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16825 crashed      @curiosity-arm  61s  2026-06-08 05:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16834 crashed      @curiosity-arm  60s  2026-06-08 05:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16843 crashed      @curiosity-arm  60s  2026-06-08 05:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16852 crashed      @curiosity-arm  61s  2026-06-08 05:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16861 crashed      @curiosity-arm  60s  2026-06-08 05:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16870 crashed      @curiosity-arm  61s  2026-06-08 05:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16879 crashed      @curiosity-arm  60s  2026-06-08 05:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16888 crashed      @curiosity-arm  60s  2026-06-08 05:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16897 crashed      @curiosity-arm  61s  2026-06-08 05:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16906 crashed      @curiosity-arm  60s  2026-06-08 05:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16915 crashed      @curiosity-arm  61s  2026-06-08 05:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16924 crashed      @curiosity-arm  60s  2026-06-08 05:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16933 crashed      @curiosity-arm  61s  2026-06-08 05:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16942 crashed      @curiosity-arm  60s  2026-06-08 05:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16951 crashed      @curiosity-arm  60s  2026-06-08 05:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16960 crashed      @curiosity-arm  60s  2026-06-08 05:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16969 crashed      @curiosity-arm  60s  2026-06-08 05:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16978 crashed      @curiosity-arm  61s  2026-06-08 05:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16987 crashed      @curiosity-arm  60s  2026-06-08 05:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #16996 crashed      @curiosity-arm  61s  2026-06-08 06:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17005 crashed      @curiosity-arm  60s  2026-06-08 06:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17014 crashed      @curiosity-arm  61s  2026-06-08 06:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17023 crashed      @curiosity-arm  60s  2026-06-08 06:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17032 crashed      @curiosity-arm  60s  2026-06-08 06:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17041 crashed      @curiosity-arm  61s  2026-06-08 06:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17050 crashed      @curiosity-arm  60s  2026-06-08 06:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17059 crashed      @curiosity-arm  61s  2026-06-08 06:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17068 crashed      @curiosity-arm  60s  2026-06-08 06:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17077 crashed      @curiosity-arm  61s  2026-06-08 06:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17086 crashed      @curiosity-arm  60s  2026-06-08 06:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17095 crashed      @curiosity-arm  60s  2026-06-08 06:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17104 crashed      @curiosity-arm  61s  2026-06-08 06:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17113 crashed      @curiosity-arm  60s  2026-06-08 06:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17122 crashed      @curiosity-arm  61s  2026-06-08 06:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17131 crashed      @curiosity-arm  60s  2026-06-08 06:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17140 crashed      @curiosity-arm  61s  2026-06-08 06:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17149 crashed      @curiosity-arm  60s  2026-06-08 06:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17158 crashed      @curiosity-arm  60s  2026-06-08 06:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17167 crashed      @curiosity-arm  61s  2026-06-08 06:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17176 crashed      @curiosity-arm  60s  2026-06-08 06:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17185 crashed      @curiosity-arm  61s  2026-06-08 06:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17194 crashed      @curiosity-arm  61s  2026-06-08 06:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17203 crashed      @curiosity-arm  60s  2026-06-08 06:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17212 crashed      @curiosity-arm  60s  2026-06-08 06:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17221 crashed      @curiosity-arm  61s  2026-06-08 06:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17230 crashed      @curiosity-arm  60s  2026-06-08 06:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17239 crashed      @curiosity-arm  61s  2026-06-08 06:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17248 crashed      @curiosity-arm  60s  2026-06-08 06:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17257 crashed      @curiosity-arm  60s  2026-06-08 06:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17266 crashed      @curiosity-arm  61s  2026-06-08 06:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17275 crashed      @curiosity-arm  60s  2026-06-08 06:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17284 crashed      @curiosity-arm  61s  2026-06-08 06:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17293 crashed      @curiosity-arm  60s  2026-06-08 06:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17302 crashed      @curiosity-arm  60s  2026-06-08 06:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17311 crashed      @curiosity-arm  61s  2026-06-08 06:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17320 crashed      @curiosity-arm  60s  2026-06-08 06:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17329 crashed      @curiosity-arm  61s  2026-06-08 06:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17338 crashed      @curiosity-arm  60s  2026-06-08 06:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17347 crashed      @curiosity-arm  60s  2026-06-08 06:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17356 crashed      @curiosity-arm  60s  2026-06-08 06:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17365 crashed      @curiosity-arm  60s  2026-06-08 06:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17374 crashed      @curiosity-arm  61s  2026-06-08 06:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17383 crashed      @curiosity-arm  60s  2026-06-08 06:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17392 crashed      @curiosity-arm  61s  2026-06-08 06:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17401 crashed      @curiosity-arm  60s  2026-06-08 06:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17410 crashed      @curiosity-arm  60s  2026-06-08 06:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17419 crashed      @curiosity-arm  60s  2026-06-08 06:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17428 crashed      @curiosity-arm  60s  2026-06-08 06:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17437 crashed      @curiosity-arm  61s  2026-06-08 06:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17446 crashed      @curiosity-arm  60s  2026-06-08 06:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17455 crashed      @curiosity-arm  61s  2026-06-08 06:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17464 crashed      @curiosity-arm  60s  2026-06-08 06:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17473 crashed      @curiosity-arm  61s  2026-06-08 06:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17482 crashed      @curiosity-arm  60s  2026-06-08 06:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17491 crashed      @curiosity-arm  60s  2026-06-08 06:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17500 crashed      @curiosity-arm  60s  2026-06-08 06:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17509 crashed      @curiosity-arm  60s  2026-06-08 06:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17518 crashed      @curiosity-arm  61s  2026-06-08 06:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17527 crashed      @curiosity-arm  60s  2026-06-08 07:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17536 crashed      @curiosity-arm  61s  2026-06-08 07:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17545 crashed      @curiosity-arm  60s  2026-06-08 07:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17554 crashed      @curiosity-arm  61s  2026-06-08 07:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17563 crashed      @curiosity-arm  60s  2026-06-08 07:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17572 crashed      @curiosity-arm  61s  2026-06-08 07:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17581 crashed      @curiosity-arm  60s  2026-06-08 07:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17590 crashed      @curiosity-arm  61s  2026-06-08 07:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17599 crashed      @curiosity-arm  60s  2026-06-08 07:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17608 crashed      @curiosity-arm  61s  2026-06-08 07:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17617 crashed      @curiosity-arm  60s  2026-06-08 07:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17626 crashed      @curiosity-arm  61s  2026-06-08 07:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17635 crashed      @curiosity-arm  60s  2026-06-08 07:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17644 crashed      @curiosity-arm  60s  2026-06-08 07:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17653 crashed      @curiosity-arm  61s  2026-06-08 07:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17662 crashed      @curiosity-arm  60s  2026-06-08 07:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17671 crashed      @curiosity-arm  61s  2026-06-08 07:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17680 crashed      @curiosity-arm  60s  2026-06-08 07:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17689 crashed      @curiosity-arm  61s  2026-06-08 07:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17698 crashed      @curiosity-arm  60s  2026-06-08 07:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17707 crashed      @curiosity-arm  61s  2026-06-08 07:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17716 crashed      @curiosity-arm  60s  2026-06-08 07:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17725 crashed      @curiosity-arm  60s  2026-06-08 07:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17734 crashed      @curiosity-arm  61s  2026-06-08 07:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17743 crashed      @curiosity-arm  60s  2026-06-08 07:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17752 crashed      @curiosity-arm  61s  2026-06-08 07:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17761 crashed      @curiosity-arm  60s  2026-06-08 07:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17770 crashed      @curiosity-arm  60s  2026-06-08 07:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17779 crashed      @curiosity-arm  60s  2026-06-08 07:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17788 crashed      @curiosity-arm  60s  2026-06-08 07:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17797 crashed      @curiosity-arm  60s  2026-06-08 07:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17806 crashed      @curiosity-arm  60s  2026-06-08 07:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17815 crashed      @curiosity-arm  61s  2026-06-08 07:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17824 crashed      @curiosity-arm  60s  2026-06-08 07:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17833 crashed      @curiosity-arm  61s  2026-06-08 07:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17842 crashed      @curiosity-arm  60s  2026-06-08 07:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17851 crashed      @curiosity-arm  60s  2026-06-08 07:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17860 crashed      @curiosity-arm  60s  2026-06-08 07:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17869 crashed      @curiosity-arm  60s  2026-06-08 07:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17878 crashed      @curiosity-arm  61s  2026-06-08 07:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17887 crashed      @curiosity-arm  60s  2026-06-08 07:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17896 crashed      @curiosity-arm  61s  2026-06-08 07:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17905 crashed      @curiosity-arm  60s  2026-06-08 07:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17914 crashed      @curiosity-arm  61s  2026-06-08 07:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17923 crashed      @curiosity-arm  60s  2026-06-08 07:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17932 crashed      @curiosity-arm  61s  2026-06-08 07:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17941 crashed      @curiosity-arm  60s  2026-06-08 07:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17950 crashed      @curiosity-arm  61s  2026-06-08 07:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17959 crashed      @curiosity-arm  60s  2026-06-08 07:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17968 crashed      @curiosity-arm  60s  2026-06-08 07:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17977 crashed      @curiosity-arm  61s  2026-06-08 07:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17986 crashed      @curiosity-arm  60s  2026-06-08 07:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17995 crashed      @curiosity-arm  61s  2026-06-08 07:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18004 crashed      @curiosity-arm  60s  2026-06-08 07:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18013 crashed      @curiosity-arm  61s  2026-06-08 07:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18022 crashed      @curiosity-arm  60s  2026-06-08 07:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18031 crashed      @curiosity-arm  61s  2026-06-08 07:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18040 crashed      @curiosity-arm  60s  2026-06-08 07:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18049 crashed      @curiosity-arm  60s  2026-06-08 07:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18058 crashed      @curiosity-arm  60s  2026-06-08 08:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18067 crashed      @curiosity-arm  61s  2026-06-08 08:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18076 crashed      @curiosity-arm  60s  2026-06-08 08:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18085 crashed      @curiosity-arm  61s  2026-06-08 08:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18094 crashed      @curiosity-arm  60s  2026-06-08 08:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18103 crashed      @curiosity-arm  61s  2026-06-08 08:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18112 crashed      @curiosity-arm  60s  2026-06-08 08:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18121 crashed      @curiosity-arm  60s  2026-06-08 08:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18130 crashed      @curiosity-arm  60s  2026-06-08 08:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18139 crashed      @curiosity-arm  60s  2026-06-08 08:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18148 crashed      @curiosity-arm  61s  2026-06-08 08:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18157 crashed      @curiosity-arm  60s  2026-06-08 08:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18166 crashed      @curiosity-arm  61s  2026-06-08 08:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18175 crashed      @curiosity-arm  60s  2026-06-08 08:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18184 crashed      @curiosity-arm  61s  2026-06-08 08:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18193 crashed      @curiosity-arm  60s  2026-06-08 08:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18202 crashed      @curiosity-arm  60s  2026-06-08 08:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18211 crashed      @curiosity-arm  60s  2026-06-08 08:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18220 crashed      @curiosity-arm  60s  2026-06-08 08:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18229 crashed      @curiosity-arm  61s  2026-06-08 08:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18238 crashed      @curiosity-arm  60s  2026-06-08 08:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18247 crashed      @curiosity-arm  61s  2026-06-08 08:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18256 crashed      @curiosity-arm  60s  2026-06-08 08:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18265 crashed      @curiosity-arm  61s  2026-06-08 08:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18274 crashed      @curiosity-arm  60s  2026-06-08 08:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18283 crashed      @curiosity-arm  61s  2026-06-08 08:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18292 crashed      @curiosity-arm  60s  2026-06-08 08:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18301 crashed      @curiosity-arm  61s  2026-06-08 08:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18310 crashed      @curiosity-arm  60s  2026-06-08 08:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18319 crashed      @curiosity-arm  61s  2026-06-08 08:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18328 crashed      @curiosity-arm  60s  2026-06-08 08:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18337 crashed      @curiosity-arm  61s  2026-06-08 08:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18346 crashed      @curiosity-arm  60s  2026-06-08 08:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18355 crashed      @curiosity-arm  60s  2026-06-08 08:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18364 crashed      @curiosity-arm  61s  2026-06-08 08:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18373 crashed      @curiosity-arm  60s  2026-06-08 08:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18382 crashed      @curiosity-arm  61s  2026-06-08 08:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18391 crashed      @curiosity-arm  60s  2026-06-08 08:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18400 crashed      @curiosity-arm  60s  2026-06-08 08:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18409 crashed      @curiosity-arm  60s  2026-06-08 08:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18418 crashed      @curiosity-arm  60s  2026-06-08 08:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18427 crashed      @curiosity-arm  60s  2026-06-08 08:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18436 crashed      @curiosity-arm  61s  2026-06-08 08:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18445 crashed      @curiosity-arm  60s  2026-06-08 08:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18454 crashed      @curiosity-arm  61s  2026-06-08 08:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18463 crashed      @curiosity-arm  60s  2026-06-08 08:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18472 crashed      @curiosity-arm  61s  2026-06-08 08:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18481 crashed      @curiosity-arm  60s  2026-06-08 08:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18490 crashed      @curiosity-arm  60s  2026-06-08 08:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18499 crashed      @curiosity-arm  60s  2026-06-08 08:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18508 crashed      @curiosity-arm  60s  2026-06-08 08:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18517 crashed      @curiosity-arm  60s  2026-06-08 08:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18526 crashed      @curiosity-arm  60s  2026-06-08 08:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18535 crashed      @curiosity-arm  61s  2026-06-08 08:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18544 crashed      @curiosity-arm  60s  2026-06-08 08:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18553 crashed      @curiosity-arm  61s  2026-06-08 08:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18562 crashed      @curiosity-arm  60s  2026-06-08 08:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18571 crashed      @curiosity-arm  60s  2026-06-08 08:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18580 crashed      @curiosity-arm  61s  2026-06-08 08:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18589 crashed      @curiosity-arm  61s  2026-06-08 09:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18598 crashed      @curiosity-arm  60s  2026-06-08 09:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18607 crashed      @curiosity-arm  60s  2026-06-08 09:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18616 crashed      @curiosity-arm  60s  2026-06-08 09:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18625 crashed      @curiosity-arm  60s  2026-06-08 09:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18634 crashed      @curiosity-arm  60s  2026-06-08 09:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18643 crashed      @curiosity-arm  61s  2026-06-08 09:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18652 crashed      @curiosity-arm  60s  2026-06-08 09:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18661 crashed      @curiosity-arm  60s  2026-06-08 09:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18670 crashed      @curiosity-arm  60s  2026-06-08 09:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18679 crashed      @curiosity-arm  60s  2026-06-08 09:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18688 crashed      @curiosity-arm  61s  2026-06-08 09:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18697 crashed      @curiosity-arm  60s  2026-06-08 09:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18706 crashed      @curiosity-arm  61s  2026-06-08 09:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18715 crashed      @curiosity-arm  60s  2026-06-08 09:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18724 crashed      @curiosity-arm  60s  2026-06-08 09:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18733 crashed      @curiosity-arm  60s  2026-06-08 09:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18742 crashed      @curiosity-arm  60s  2026-06-08 09:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18751 crashed      @curiosity-arm  61s  2026-06-08 09:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18760 crashed      @curiosity-arm  60s  2026-06-08 09:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18769 crashed      @curiosity-arm  61s  2026-06-08 09:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18778 crashed      @curiosity-arm  60s  2026-06-08 09:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18787 crashed      @curiosity-arm  61s  2026-06-08 09:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18796 crashed      @curiosity-arm  60s  2026-06-08 09:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18805 crashed      @curiosity-arm  61s  2026-06-08 09:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18814 crashed      @curiosity-arm  60s  2026-06-08 09:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18823 crashed      @curiosity-arm  60s  2026-06-08 09:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18832 crashed      @curiosity-arm  61s  2026-06-08 09:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18841 crashed      @curiosity-arm  60s  2026-06-08 09:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18850 crashed      @curiosity-arm  61s  2026-06-08 09:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18859 crashed      @curiosity-arm  60s  2026-06-08 09:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18868 crashed      @curiosity-arm  60s  2026-06-08 09:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18877 crashed      @curiosity-arm  60s  2026-06-08 09:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18886 crashed      @curiosity-arm  60s  2026-06-08 09:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18895 crashed      @curiosity-arm  61s  2026-06-08 09:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18904 crashed      @curiosity-arm  60s  2026-06-08 09:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18913 crashed      @curiosity-arm  61s  2026-06-08 09:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18922 crashed      @curiosity-arm  60s  2026-06-08 09:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18931 crashed      @curiosity-arm  60s  2026-06-08 09:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18940 crashed      @curiosity-arm  60s  2026-06-08 09:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18949 crashed      @curiosity-arm  60s  2026-06-08 09:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18958 crashed      @curiosity-arm  61s  2026-06-08 09:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18967 crashed      @curiosity-arm  60s  2026-06-08 09:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18976 crashed      @curiosity-arm  61s  2026-06-08 09:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18985 crashed      @curiosity-arm  60s  2026-06-08 09:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #18994 crashed      @curiosity-arm  61s  2026-06-08 09:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19003 crashed      @curiosity-arm  60s  2026-06-08 09:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19012 crashed      @curiosity-arm  60s  2026-06-08 09:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19021 crashed      @curiosity-arm  60s  2026-06-08 09:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19030 crashed      @curiosity-arm  60s  2026-06-08 09:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19039 crashed      @curiosity-arm  61s  2026-06-08 09:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19048 crashed      @curiosity-arm  60s  2026-06-08 09:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19057 crashed      @curiosity-arm  61s  2026-06-08 09:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19066 crashed      @curiosity-arm  60s  2026-06-08 09:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19075 crashed      @curiosity-arm  60s  2026-06-08 09:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19084 crashed      @curiosity-arm  60s  2026-06-08 09:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19093 crashed      @curiosity-arm  60s  2026-06-08 09:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19102 crashed      @curiosity-arm  61s  2026-06-08 09:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19111 crashed      @curiosity-arm  60s  2026-06-08 09:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19120 crashed      @curiosity-arm  61s  2026-06-08 09:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19129 crashed      @curiosity-arm  60s  2026-06-08 10:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19138 crashed      @curiosity-arm  60s  2026-06-08 10:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19147 crashed      @curiosity-arm  60s  2026-06-08 10:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19156 crashed      @curiosity-arm  60s  2026-06-08 10:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19165 crashed      @curiosity-arm  61s  2026-06-08 10:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19174 crashed      @curiosity-arm  60s  2026-06-08 10:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19183 crashed      @curiosity-arm  61s  2026-06-08 10:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19192 crashed      @curiosity-arm  60s  2026-06-08 10:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19201 crashed      @curiosity-arm  61s  2026-06-08 10:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19210 crashed      @curiosity-arm  60s  2026-06-08 10:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19219 crashed      @curiosity-arm  60s  2026-06-08 10:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19228 crashed      @curiosity-arm  61s  2026-06-08 10:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19237 crashed      @curiosity-arm  60s  2026-06-08 10:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19246 crashed      @curiosity-arm  61s  2026-06-08 10:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19255 crashed      @curiosity-arm  60s  2026-06-08 10:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19264 crashed      @curiosity-arm  60s  2026-06-08 10:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19273 crashed      @curiosity-arm  60s  2026-06-08 10:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19282 crashed      @curiosity-arm  60s  2026-06-08 10:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19291 crashed      @curiosity-arm  61s  2026-06-08 10:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19300 crashed      @curiosity-arm  60s  2026-06-08 10:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19309 crashed      @curiosity-arm  61s  2026-06-08 10:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19318 crashed      @curiosity-arm  60s  2026-06-08 10:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19327 crashed      @curiosity-arm  61s  2026-06-08 10:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19336 crashed      @curiosity-arm  60s  2026-06-08 10:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19345 crashed      @curiosity-arm  60s  2026-06-08 10:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19354 crashed      @curiosity-arm  60s  2026-06-08 10:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19363 crashed      @curiosity-arm  60s  2026-06-08 10:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19372 crashed      @curiosity-arm  61s  2026-06-08 10:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19381 crashed      @curiosity-arm  60s  2026-06-08 10:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19390 crashed      @curiosity-arm  61s  2026-06-08 10:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19399 crashed      @curiosity-arm  60s  2026-06-08 10:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19408 crashed      @curiosity-arm  60s  2026-06-08 10:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19417 crashed      @curiosity-arm  61s  2026-06-08 10:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19426 crashed      @curiosity-arm  60s  2026-06-08 10:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19435 crashed      @curiosity-arm  61s  2026-06-08 10:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19444 crashed      @curiosity-arm  60s  2026-06-08 10:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19453 crashed      @curiosity-arm  60s  2026-06-08 10:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19462 crashed      @curiosity-arm  60s  2026-06-08 10:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19471 crashed      @curiosity-arm  60s  2026-06-08 10:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19480 crashed      @curiosity-arm  61s  2026-06-08 10:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19489 crashed      @curiosity-arm  60s  2026-06-08 10:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19498 crashed      @curiosity-arm  61s  2026-06-08 10:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19507 crashed      @curiosity-arm  60s  2026-06-08 10:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19516 crashed      @curiosity-arm  60s  2026-06-08 10:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19525 crashed      @curiosity-arm  61s  2026-06-08 10:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19534 crashed      @curiosity-arm  60s  2026-06-08 10:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19543 crashed      @curiosity-arm  60s  2026-06-08 10:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19552 crashed      @curiosity-arm  61s  2026-06-08 10:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19561 crashed      @curiosity-arm  60s  2026-06-08 10:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19570 crashed      @curiosity-arm  61s  2026-06-08 10:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19579 crashed      @curiosity-arm  60s  2026-06-08 10:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19588 crashed      @curiosity-arm  61s  2026-06-08 10:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19597 crashed      @curiosity-arm  60s  2026-06-08 10:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19606 crashed      @curiosity-arm  60s  2026-06-08 10:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19615 crashed      @curiosity-arm  60s  2026-06-08 10:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19624 crashed      @curiosity-arm  60s  2026-06-08 10:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19633 crashed      @curiosity-arm  60s  2026-06-08 10:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19642 crashed      @curiosity-arm  61s  2026-06-08 10:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19651 crashed      @curiosity-arm  60s  2026-06-08 10:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19660 crashed      @curiosity-arm  61s  2026-06-08 11:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19669 crashed      @curiosity-arm  60s  2026-06-08 11:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19678 crashed      @curiosity-arm  61s  2026-06-08 11:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19687 crashed      @curiosity-arm  60s  2026-06-08 11:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19696 crashed      @curiosity-arm  61s  2026-06-08 11:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19705 crashed      @curiosity-arm  60s  2026-06-08 11:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19714 crashed      @curiosity-arm  61s  2026-06-08 11:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19723 crashed      @curiosity-arm  60s  2026-06-08 11:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19732 crashed      @curiosity-arm  60s  2026-06-08 11:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19741 crashed      @curiosity-arm  60s  2026-06-08 11:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19750 crashed      @curiosity-arm  60s  2026-06-08 11:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19759 crashed      @curiosity-arm  60s  2026-06-08 11:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19768 crashed      @curiosity-arm  60s  2026-06-08 11:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19777 crashed      @curiosity-arm  61s  2026-06-08 11:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19786 crashed      @curiosity-arm  60s  2026-06-08 11:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19795 crashed      @curiosity-arm  61s  2026-06-08 11:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19804 crashed      @curiosity-arm  60s  2026-06-08 11:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19813 crashed      @curiosity-arm  60s  2026-06-08 11:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19822 crashed      @curiosity-arm  60s  2026-06-08 11:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19831 crashed      @curiosity-arm  60s  2026-06-08 11:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19840 crashed      @curiosity-arm  61s  2026-06-08 11:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19849 crashed      @curiosity-arm  60s  2026-06-08 11:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19858 crashed      @curiosity-arm  61s  2026-06-08 11:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19867 crashed      @curiosity-arm  60s  2026-06-08 11:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19876 crashed      @curiosity-arm  61s  2026-06-08 11:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19885 crashed      @curiosity-arm  60s  2026-06-08 11:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19894 crashed      @curiosity-arm  60s  2026-06-08 11:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19903 crashed      @curiosity-arm  61s  2026-06-08 11:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19912 crashed      @curiosity-arm  60s  2026-06-08 11:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19921 crashed      @curiosity-arm  61s  2026-06-08 11:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19930 crashed      @curiosity-arm  60s  2026-06-08 11:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19939 crashed      @curiosity-arm  61s  2026-06-08 11:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19948 crashed      @curiosity-arm  60s  2026-06-08 11:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19957 crashed      @curiosity-arm  60s  2026-06-08 11:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19966 crashed      @curiosity-arm  61s  2026-06-08 11:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19975 crashed      @curiosity-arm  60s  2026-06-08 11:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19984 crashed      @curiosity-arm  61s  2026-06-08 11:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19993 crashed      @curiosity-arm  60s  2026-06-08 11:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20002 crashed      @curiosity-arm  61s  2026-06-08 11:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20011 crashed      @curiosity-arm  60s  2026-06-08 11:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20020 crashed      @curiosity-arm  60s  2026-06-08 11:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20029 crashed      @curiosity-arm  61s  2026-06-08 11:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20038 crashed      @curiosity-arm  60s  2026-06-08 11:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20047 crashed      @curiosity-arm  61s  2026-06-08 11:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20056 crashed      @curiosity-arm  60s  2026-06-08 11:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20065 crashed      @curiosity-arm  61s  2026-06-08 11:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20074 crashed      @curiosity-arm  60s  2026-06-08 11:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20083 crashed      @curiosity-arm  60s  2026-06-08 11:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20092 crashed      @curiosity-arm  60s  2026-06-08 11:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20101 crashed      @curiosity-arm  60s  2026-06-08 11:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20110 crashed      @curiosity-arm  61s  2026-06-08 11:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20119 crashed      @curiosity-arm  60s  2026-06-08 11:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20128 crashed      @curiosity-arm  61s  2026-06-08 11:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20137 crashed      @curiosity-arm  60s  2026-06-08 11:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20146 crashed      @curiosity-arm  60s  2026-06-08 11:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20155 crashed      @curiosity-arm  60s  2026-06-08 11:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20164 crashed      @curiosity-arm  60s  2026-06-08 11:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20173 crashed      @curiosity-arm  61s  2026-06-08 11:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20182 crashed      @curiosity-arm  60s  2026-06-08 11:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20191 crashed      @curiosity-arm  61s  2026-06-08 11:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20200 crashed      @curiosity-arm  60s  2026-06-08 12:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20209 crashed      @curiosity-arm  60s  2026-06-08 12:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20218 crashed      @curiosity-arm  60s  2026-06-08 12:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20227 crashed      @curiosity-arm  60s  2026-06-08 12:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20236 crashed      @curiosity-arm  60s  2026-06-08 12:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20245 crashed      @curiosity-arm  60s  2026-06-08 12:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20254 crashed      @curiosity-arm  60s  2026-06-08 12:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20263 crashed      @curiosity-arm  61s  2026-06-08 12:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20272 crashed      @curiosity-arm  60s  2026-06-08 12:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20281 crashed      @curiosity-arm  61s  2026-06-08 12:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20290 crashed      @curiosity-arm  60s  2026-06-08 12:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20299 crashed      @curiosity-arm  61s  2026-06-08 12:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20308 crashed      @curiosity-arm  60s  2026-06-08 12:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20317 crashed      @curiosity-arm  61s  2026-06-08 12:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20326 crashed      @curiosity-arm  60s  2026-06-08 12:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20335 crashed      @curiosity-arm  61s  2026-06-08 12:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20344 crashed      @curiosity-arm  60s  2026-06-08 12:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20353 crashed      @curiosity-arm  61s  2026-06-08 12:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20362 crashed      @curiosity-arm  60s  2026-06-08 12:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20371 crashed      @curiosity-arm  60s  2026-06-08 12:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20380 crashed      @curiosity-arm  61s  2026-06-08 12:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20389 crashed      @curiosity-arm  60s  2026-06-08 12:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20398 crashed      @curiosity-arm  61s  2026-06-08 12:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20407 crashed      @curiosity-arm  60s  2026-06-08 12:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20416 crashed      @curiosity-arm  61s  2026-06-08 12:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20425 crashed      @curiosity-arm  60s  2026-06-08 12:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20434 crashed      @curiosity-arm  60s  2026-06-08 12:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20443 crashed      @curiosity-arm  60s  2026-06-08 12:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20452 crashed      @curiosity-arm  60s  2026-06-08 12:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20461 crashed      @curiosity-arm  61s  2026-06-08 12:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20470 crashed      @curiosity-arm  60s  2026-06-08 12:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20479 crashed      @curiosity-arm  61s  2026-06-08 12:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20488 crashed      @curiosity-arm  60s  2026-06-08 12:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20497 crashed      @curiosity-arm  61s  2026-06-08 12:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20506 crashed      @curiosity-arm  60s  2026-06-08 12:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20515 crashed      @curiosity-arm  61s  2026-06-08 12:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20524 crashed      @curiosity-arm  60s  2026-06-08 12:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20533 crashed      @curiosity-arm  61s  2026-06-08 12:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20542 crashed      @curiosity-arm  60s  2026-06-08 12:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20551 crashed      @curiosity-arm  61s  2026-06-08 12:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20560 crashed      @curiosity-arm  60s  2026-06-08 12:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20569 crashed      @curiosity-arm  60s  2026-06-08 12:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20578 crashed      @curiosity-arm  60s  2026-06-08 12:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20587 crashed      @curiosity-arm  60s  2026-06-08 12:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20596 crashed      @curiosity-arm  60s  2026-06-08 12:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20605 crashed      @curiosity-arm  60s  2026-06-08 12:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20614 crashed      @curiosity-arm  61s  2026-06-08 12:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20623 crashed      @curiosity-arm  60s  2026-06-08 12:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20632 crashed      @curiosity-arm  61s  2026-06-08 12:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20641 crashed      @curiosity-arm  60s  2026-06-08 12:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20650 crashed      @curiosity-arm  61s  2026-06-08 12:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20659 crashed      @curiosity-arm  60s  2026-06-08 12:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20668 crashed      @curiosity-arm  61s  2026-06-08 12:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20677 crashed      @curiosity-arm  60s  2026-06-08 12:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20686 crashed      @curiosity-arm  61s  2026-06-08 12:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20695 crashed      @curiosity-arm  60s  2026-06-08 12:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20704 crashed      @curiosity-arm  61s  2026-06-08 12:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20713 crashed      @curiosity-arm  60s  2026-06-08 12:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20722 crashed      @curiosity-arm  61s  2026-06-08 12:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20731 crashed      @curiosity-arm  61s  2026-06-08 13:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20740 crashed      @curiosity-arm  61s  2026-06-08 13:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20749 crashed      @curiosity-arm  60s  2026-06-08 13:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20758 crashed      @curiosity-arm  61s  2026-06-08 13:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20767 crashed      @curiosity-arm  60s  2026-06-08 13:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20776 crashed      @curiosity-arm  61s  2026-06-08 13:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20785 crashed      @curiosity-arm  60s  2026-06-08 13:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20794 crashed      @curiosity-arm  61s  2026-06-08 13:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20803 crashed      @curiosity-arm  60s  2026-06-08 13:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20812 crashed      @curiosity-arm  60s  2026-06-08 13:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20821 crashed      @curiosity-arm  60s  2026-06-08 13:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20830 crashed      @curiosity-arm  60s  2026-06-08 13:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20839 crashed      @curiosity-arm  61s  2026-06-08 13:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20848 crashed      @curiosity-arm  60s  2026-06-08 13:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20857 crashed      @curiosity-arm  61s  2026-06-08 13:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20866 crashed      @curiosity-arm  60s  2026-06-08 13:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20875 crashed      @curiosity-arm  61s  2026-06-08 13:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20884 crashed      @curiosity-arm  60s  2026-06-08 13:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20893 crashed      @curiosity-arm  61s  2026-06-08 13:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20902 crashed      @curiosity-arm  60s  2026-06-08 13:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20911 crashed      @curiosity-arm  61s  2026-06-08 13:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20920 crashed      @curiosity-arm  60s  2026-06-08 13:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20929 crashed      @curiosity-arm  61s  2026-06-08 13:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20938 crashed      @curiosity-arm  60s  2026-06-08 13:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20947 crashed      @curiosity-arm  61s  2026-06-08 13:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20956 crashed      @curiosity-arm  60s  2026-06-08 13:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20965 crashed      @curiosity-arm  61s  2026-06-08 13:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20974 crashed      @curiosity-arm  60s  2026-06-08 13:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20983 crashed      @curiosity-arm  61s  2026-06-08 13:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #20992 crashed      @curiosity-arm  60s  2026-06-08 13:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21001 crashed      @curiosity-arm  60s  2026-06-08 13:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21010 crashed      @curiosity-arm  60s  2026-06-08 13:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21019 crashed      @curiosity-arm  60s  2026-06-08 13:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21028 crashed      @curiosity-arm  61s  2026-06-08 13:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21037 crashed      @curiosity-arm  60s  2026-06-08 13:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21046 crashed      @curiosity-arm  61s  2026-06-08 13:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21055 crashed      @curiosity-arm  60s  2026-06-08 13:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21064 crashed      @curiosity-arm  61s  2026-06-08 13:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21073 crashed      @curiosity-arm  60s  2026-06-08 13:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21082 crashed      @curiosity-arm  61s  2026-06-08 13:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21091 crashed      @curiosity-arm  60s  2026-06-08 13:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21100 crashed      @curiosity-arm  60s  2026-06-08 13:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21109 crashed      @curiosity-arm  61s  2026-06-08 13:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21118 crashed      @curiosity-arm  60s  2026-06-08 13:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21127 crashed      @curiosity-arm  61s  2026-06-08 13:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21136 crashed      @curiosity-arm  60s  2026-06-08 13:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21145 crashed      @curiosity-arm  61s  2026-06-08 13:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21154 crashed      @curiosity-arm  60s  2026-06-08 13:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21163 crashed      @curiosity-arm  61s  2026-06-08 13:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21172 crashed      @curiosity-arm  60s  2026-06-08 13:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21181 crashed      @curiosity-arm  61s  2026-06-08 13:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21190 crashed      @curiosity-arm  60s  2026-06-08 13:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21199 crashed      @curiosity-arm  61s  2026-06-08 13:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21208 crashed      @curiosity-arm  60s  2026-06-08 13:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21217 crashed      @curiosity-arm  60s  2026-06-08 13:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21226 crashed      @curiosity-arm  60s  2026-06-08 13:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21235 crashed      @curiosity-arm  60s  2026-06-08 13:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21244 crashed      @curiosity-arm  61s  2026-06-08 13:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21253 crashed      @curiosity-arm  60s  2026-06-08 13:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21262 crashed      @curiosity-arm  61s  2026-06-08 14:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21271 crashed      @curiosity-arm  60s  2026-06-08 14:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21280 crashed      @curiosity-arm  61s  2026-06-08 14:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21289 crashed      @curiosity-arm  60s  2026-06-08 14:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21298 crashed      @curiosity-arm  61s  2026-06-08 14:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21307 crashed      @curiosity-arm  60s  2026-06-08 14:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21316 crashed      @curiosity-arm  61s  2026-06-08 14:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21325 crashed      @curiosity-arm  60s  2026-06-08 14:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21334 crashed      @curiosity-arm  60s  2026-06-08 14:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21343 crashed      @curiosity-arm  60s  2026-06-08 14:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21352 crashed      @curiosity-arm  60s  2026-06-08 14:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21361 crashed      @curiosity-arm  61s  2026-06-08 14:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21370 crashed      @curiosity-arm  60s  2026-06-08 14:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21379 crashed      @curiosity-arm  61s  2026-06-08 14:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21388 crashed      @curiosity-arm  60s  2026-06-08 14:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21397 crashed      @curiosity-arm  61s  2026-06-08 14:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21406 crashed      @curiosity-arm  60s  2026-06-08 14:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21415 crashed      @curiosity-arm  61s  2026-06-08 14:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21424 crashed      @curiosity-arm  60s  2026-06-08 14:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21433 crashed      @curiosity-arm  60s  2026-06-08 14:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21442 crashed      @curiosity-arm  60s  2026-06-08 14:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21451 crashed      @curiosity-arm  60s  2026-06-08 14:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21460 crashed      @curiosity-arm  61s  2026-06-08 14:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21469 crashed      @curiosity-arm  60s  2026-06-08 14:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21478 crashed      @curiosity-arm  61s  2026-06-08 14:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21487 crashed      @curiosity-arm  60s  2026-06-08 14:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21496 crashed      @curiosity-arm  60s  2026-06-08 14:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21505 crashed      @curiosity-arm  60s  2026-06-08 14:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21514 crashed      @curiosity-arm  60s  2026-06-08 14:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21523 crashed      @curiosity-arm  60s  2026-06-08 14:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21532 crashed      @curiosity-arm  60s  2026-06-08 14:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21541 crashed      @curiosity-arm  61s  2026-06-08 14:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21550 crashed      @curiosity-arm  60s  2026-06-08 14:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21559 crashed      @curiosity-arm  61s  2026-06-08 14:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21568 crashed      @curiosity-arm  60s  2026-06-08 14:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21577 crashed      @curiosity-arm  61s  2026-06-08 14:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21586 crashed      @curiosity-arm  60s  2026-06-08 14:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21595 crashed      @curiosity-arm  60s  2026-06-08 14:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21604 crashed      @curiosity-arm  60s  2026-06-08 14:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21613 crashed      @curiosity-arm  60s  2026-06-08 14:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21622 crashed      @curiosity-arm  61s  2026-06-08 14:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21631 crashed      @curiosity-arm  60s  2026-06-08 14:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21640 crashed      @curiosity-arm  61s  2026-06-08 14:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21649 crashed      @curiosity-arm  60s  2026-06-08 14:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21658 crashed      @curiosity-arm  60s  2026-06-08 14:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21667 crashed      @curiosity-arm  60s  2026-06-08 14:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21676 crashed      @curiosity-arm  60s  2026-06-08 14:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21685 crashed      @curiosity-arm  61s  2026-06-08 14:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21694 crashed      @curiosity-arm  60s  2026-06-08 14:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21703 crashed      @curiosity-arm  61s  2026-06-08 14:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21712 crashed      @curiosity-arm  60s  2026-06-08 14:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21721 crashed      @curiosity-arm  61s  2026-06-08 14:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21730 crashed      @curiosity-arm  60s  2026-06-08 14:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21739 crashed      @curiosity-arm  60s  2026-06-08 14:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21748 crashed      @curiosity-arm  60s  2026-06-08 14:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21757 crashed      @curiosity-arm  60s  2026-06-08 14:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21766 crashed      @curiosity-arm  61s  2026-06-08 14:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21775 crashed      @curiosity-arm  60s  2026-06-08 14:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21784 crashed      @curiosity-arm  61s  2026-06-08 14:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21793 crashed      @curiosity-arm  60s  2026-06-08 14:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21802 crashed      @curiosity-arm  61s  2026-06-08 15:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21811 crashed      @curiosity-arm  60s  2026-06-08 15:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21820 crashed      @curiosity-arm  61s  2026-06-08 15:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21829 crashed      @curiosity-arm  60s  2026-06-08 15:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21838 crashed      @curiosity-arm  61s  2026-06-08 15:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21847 crashed      @curiosity-arm  61s  2026-06-08 15:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21856 crashed      @curiosity-arm  60s  2026-06-08 15:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21865 crashed      @curiosity-arm  60s  2026-06-08 15:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21874 crashed      @curiosity-arm  60s  2026-06-08 15:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21883 crashed      @curiosity-arm  60s  2026-06-08 15:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21892 crashed      @curiosity-arm  61s  2026-06-08 15:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21901 crashed      @curiosity-arm  60s  2026-06-08 15:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21910 crashed      @curiosity-arm  61s  2026-06-08 15:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21919 crashed      @curiosity-arm  60s  2026-06-08 15:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21928 crashed      @curiosity-arm  61s  2026-06-08 15:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21937 crashed      @curiosity-arm  60s  2026-06-08 15:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21946 crashed      @curiosity-arm  61s  2026-06-08 15:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21955 crashed      @curiosity-arm  60s  2026-06-08 15:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21964 crashed      @curiosity-arm  60s  2026-06-08 15:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21973 crashed      @curiosity-arm  60s  2026-06-08 15:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21982 crashed      @curiosity-arm  60s  2026-06-08 15:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21991 crashed      @curiosity-arm  61s  2026-06-08 15:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22000 crashed      @curiosity-arm  60s  2026-06-08 15:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22009 crashed      @curiosity-arm  61s  2026-06-08 15:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22018 crashed      @curiosity-arm  60s  2026-06-08 15:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22027 crashed      @curiosity-arm  61s  2026-06-08 15:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22036 crashed      @curiosity-arm  60s  2026-06-08 15:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22045 crashed      @curiosity-arm  61s  2026-06-08 15:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22054 crashed      @curiosity-arm  60s  2026-06-08 15:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22063 crashed      @curiosity-arm  61s  2026-06-08 15:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22072 crashed      @curiosity-arm  60s  2026-06-08 15:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22081 crashed      @curiosity-arm  61s  2026-06-08 15:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22090 crashed      @curiosity-arm  60s  2026-06-08 15:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22099 crashed      @curiosity-arm  60s  2026-06-08 15:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22108 crashed      @curiosity-arm  60s  2026-06-08 15:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22117 crashed      @curiosity-arm  61s  2026-06-08 15:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22126 crashed      @curiosity-arm  60s  2026-06-08 15:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22135 crashed      @curiosity-arm  61s  2026-06-08 15:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22144 crashed      @curiosity-arm  60s  2026-06-08 15:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22153 crashed      @curiosity-arm  61s  2026-06-08 15:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22162 crashed      @curiosity-arm  60s  2026-06-08 15:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22171 crashed      @curiosity-arm  60s  2026-06-08 15:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22180 crashed      @curiosity-arm  60s  2026-06-08 15:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22189 crashed      @curiosity-arm  60s  2026-06-08 15:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22198 crashed      @curiosity-arm  61s  2026-06-08 15:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22207 crashed      @curiosity-arm  60s  2026-06-08 15:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22216 crashed      @curiosity-arm  60s  2026-06-08 15:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22225 crashed      @curiosity-arm  60s  2026-06-08 15:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22234 reclaimed    @curiosity-arm  850s  2026-06-08 15:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #22243 completed    @curiosity-arm  31s  2026-06-08 16:03
        → DAILY-BUILD-2026-06-05 completed

## Status
Auto-extracted from kanban_complete · 2026-06-02 · worker did not write file · text-only brief
