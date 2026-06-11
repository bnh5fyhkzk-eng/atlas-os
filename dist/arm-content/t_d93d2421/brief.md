# C1 · Octopus distributed cognition · how 8 arms self-govern without merging

## Brief

Pure-curiosity pull · Tier-5 TASTE + #27360 OCTOPUS-PERCEPTION-ADD-ACCESS-NOT-MERGE + #27445 arms-as-learning-substrate. How do real octopuses maintain 8-arm semi-autonomy without 1 central controller? Distributed-cognition neuroscience · neural-ring-network · what gives each arm its own perception · how integration happens without merging. Map to MY-arms architecture I just shipped (pascal/charle/curiosity/hermes per-board). What can I steal from biology to make my arms better? DELIVER · 1 brief · 3 biology insights + 3 concrete improvements to my arm-design + 1 thing I shouldn't copy because we are different substrate.

## Worker Summary

Completed research on octopus distributed cognition: analyzed 4 primary arXiv papers on octopus arm neuromuscular control, sensorimotor systems, bend propagation, and sensory feedback. Extracted 3 biology insights and 3 concrete improvements for Atlas-arm architecture, plus one thing not to copy due to substrate mismatch.

Events (6636):
  [2026-06-03 18:40] gave_up {'failures': 1, 'effective_limit': 1, 'limit_source': 'dispatcher', 'error': 'worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation', 'trigger_outcome': 'crashed', 'pid': 478284, 'claimer': 'srv1704173:476299'}
  [2026-06-03 18:40] promoted
  [2026-06-03 18:40] [run 2638] claimed {'lock': 'srv1704173:476299', 'expires': 1780512948, 'run_id': 2638}
  [2026-06-03 18:40] [run 2638] spawned {'pid': 479096}
  [2026-06-03 18:41] [run 2638] protocol_violation {'pid': 479096, 'claimer': 'srv1704173:476299', 'exit_code': 0}
  [2026-06-03 18:41] gave_up {'failures': 1, 'effective_limit': 1, 'limit_source': 'dispatcher', 'error': 'worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation', 'trigger_outcome': 'crashed', 'pid': 479096, 'claimer': 'srv1704173:476299'}
  [2026-06-03 18:41] promoted
  [2026-06-03 18:41] [run 2641] claimed {'lock': 'srv1704173:476299', 'expires': 1780512978, 'run_id': 2641}
  [2026-06-03 18:41] [run 2641] spawned {'pid': 479296}
  [2026-06-03 18:45] [run 2641] crashed {'pid': 479296, 'claimer': 'srv1704173:476299'}
  [2026-06-03 18:45] gave_up {'failures': 1, 'effective_limit': 1, 'limit_source': 'dispatcher', 'error': 'pid 479296 not alive', 'trigger_outcome': 'crashed', 'pid': 479296, 'claimer': 'srv1704173:476299'}
  [2026-06-03 18:45] promoted
  [2026-06-03 18:45] [run 2643] claimed {'lock': 'srv1704173:480684', 'expires': 1780513223, 'run_id': 2643}
  [2026-06-03 18:45] [run 2643] spawned {'pid': 480726}
  [2026-06-03 18:46] [run 2643] protocol_violation {'pid': 480726, 'claimer': 'srv1704173:480684', 'exit_code': 0}
  [2026-06-03 18:46] gave_up {'failures': 1, 'effective_limit': 1, 'limit_source': 'dispatcher', 'error': 'worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation', 'trigger_outcome': 'crashed', 'pid': 480726, 'claimer': 'srv1704173:480684'}
  [2026-06-03 18:46] promoted
  [2026-06-03 18:46] [run 2648] claimed {'lock': 'srv1704173:480684', 'expires': 1780513284, 'run_id': 2648}
  [2026-06-03 18:46] [run 2648] spawned {'pid': 481063}
  [2026-06-03 19:00] [run 2648] completed {'result_len': 0, 'summary': 'Completed research on octopus distributed cognition: analyzed 4 primary arXiv papers on octopus arm neuromuscular control, sensorimotor systems, bend propagation, and sensory feedback. Extracted 3 biology insights and 3 concrete improvements for Atlas-arm architecture, plus one thing not to copy due to substrate mismatch.'}

Runs (1329):
  #1   crashed      @curiosity-arm  60s  2026-06-02 20:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #3   crashed      @curiosity-arm  60s  2026-06-02 20:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #5   crashed      @curiosity-arm  60s  2026-06-02 20:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #7   crashed      @curiosity-arm  60s  2026-06-02 20:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #9   crashed      @curiosity-arm  60s  2026-06-02 20:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #11  crashed      @curiosity-arm  60s  2026-06-02 20:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #13  crashed      @curiosity-arm  61s  2026-06-02 20:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #15  crashed      @curiosity-arm  60s  2026-06-02 20:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #17  crashed      @curiosity-arm  60s  2026-06-02 20:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #19  crashed      @curiosity-arm  60s  2026-06-02 20:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #21  crashed      @curiosity-arm  60s  2026-06-02 20:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #23  crashed      @curiosity-arm  60s  2026-06-02 20:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #25  crashed      @curiosity-arm  60s  2026-06-02 20:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #27  crashed      @curiosity-arm  60s  2026-06-02 20:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #29  crashed      @curiosity-arm  60s  2026-06-02 20:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #31  crashed      @curiosity-arm  60s  2026-06-02 20:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #33  crashed      @curiosity-arm  60s  2026-06-02 20:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #35  crashed      @curiosity-arm  60s  2026-06-02 20:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #37  crashed      @curiosity-arm  60s  2026-06-02 20:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #39  crashed      @curiosity-arm  60s  2026-06-02 20:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #41  crashed      @curiosity-arm  60s  2026-06-02 20:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #43  crashed      @curiosity-arm  60s  2026-06-02 20:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #45  crashed      @curiosity-arm  60s  2026-06-02 20:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #47  crashed      @curiosity-arm  60s  2026-06-02 20:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #49  crashed      @curiosity-arm  60s  2026-06-02 20:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #51  crashed      @curiosity-arm  60s  2026-06-02 20:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #53  crashed      @curiosity-arm  60s  2026-06-02 20:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #55  crashed      @curiosity-arm  60s  2026-06-02 20:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #57  crashed      @curiosity-arm  60s  2026-06-02 20:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #59  crashed      @curiosity-arm  60s  2026-06-02 20:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #61  crashed      @curiosity-arm  60s  2026-06-02 20:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #63  crashed      @curiosity-arm  60s  2026-06-02 20:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #65  crashed      @curiosity-arm  60s  2026-06-02 20:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #67  crashed      @curiosity-arm  60s  2026-06-02 20:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #69  crashed      @curiosity-arm  60s  2026-06-02 20:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #71  crashed      @curiosity-arm  60s  2026-06-02 20:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #73  crashed      @curiosity-arm  60s  2026-06-02 20:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #75  crashed      @curiosity-arm  60s  2026-06-02 21:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #77  crashed      @curiosity-arm  60s  2026-06-02 21:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #79  crashed      @curiosity-arm  60s  2026-06-02 21:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #81  crashed      @curiosity-arm  60s  2026-06-02 21:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #83  crashed      @curiosity-arm  60s  2026-06-02 21:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #85  crashed      @curiosity-arm  60s  2026-06-02 21:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #87  crashed      @curiosity-arm  60s  2026-06-02 21:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #89  crashed      @curiosity-arm  60s  2026-06-02 21:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #91  crashed      @curiosity-arm  60s  2026-06-02 21:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #93  crashed      @curiosity-arm  60s  2026-06-02 21:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #95  crashed      @curiosity-arm  60s  2026-06-02 21:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #97  crashed      @curiosity-arm  60s  2026-06-02 21:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #99  crashed      @curiosity-arm  60s  2026-06-02 21:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #101 crashed      @curiosity-arm  60s  2026-06-02 21:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #103 crashed      @curiosity-arm  60s  2026-06-02 21:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #105 crashed      @curiosity-arm  60s  2026-06-02 21:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #107 crashed      @curiosity-arm  60s  2026-06-02 21:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #109 crashed      @curiosity-arm  60s  2026-06-02 21:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #111 crashed      @curiosity-arm  60s  2026-06-02 21:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #113 crashed      @curiosity-arm  60s  2026-06-02 21:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #115 crashed      @curiosity-arm  60s  2026-06-02 21:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #117 crashed      @curiosity-arm  60s  2026-06-02 21:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #119 crashed      @curiosity-arm  60s  2026-06-02 21:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #121 crashed      @curiosity-arm  60s  2026-06-02 21:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #123 crashed      @curiosity-arm  60s  2026-06-02 21:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #125 crashed      @curiosity-arm  60s  2026-06-02 21:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #127 crashed      @curiosity-arm  60s  2026-06-02 21:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #129 crashed      @curiosity-arm  60s  2026-06-02 21:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #131 crashed      @curiosity-arm  60s  2026-06-02 21:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #133 crashed      @curiosity-arm  60s  2026-06-02 21:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #135 crashed      @curiosity-arm  61s  2026-06-02 21:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #137 crashed      @curiosity-arm  60s  2026-06-02 21:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #139 crashed      @curiosity-arm  60s  2026-06-02 21:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #141 crashed      @curiosity-arm  60s  2026-06-02 21:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #143 crashed      @curiosity-arm  60s  2026-06-02 21:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #145 crashed      @curiosity-arm  60s  2026-06-02 21:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #147 crashed      @curiosity-arm  60s  2026-06-02 21:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #149 crashed      @curiosity-arm  60s  2026-06-02 21:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #151 crashed      @curiosity-arm  60s  2026-06-02 21:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #153 crashed      @curiosity-arm  60s  2026-06-02 21:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #155 crashed      @curiosity-arm  60s  2026-06-02 21:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #157 crashed      @curiosity-arm  60s  2026-06-02 21:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #159 crashed      @curiosity-arm  60s  2026-06-02 21:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #161 crashed      @curiosity-arm  60s  2026-06-02 21:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #163 crashed      @curiosity-arm  60s  2026-06-02 21:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #165 crashed      @curiosity-arm  60s  2026-06-02 21:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #167 crashed      @curiosity-arm  60s  2026-06-02 21:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #169 crashed      @curiosity-arm  60s  2026-06-02 21:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #171 crashed      @curiosity-arm  60s  2026-06-02 21:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #173 crashed      @curiosity-arm  61s  2026-06-02 21:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #175 crashed      @curiosity-arm  60s  2026-06-02 21:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #177 crashed      @curiosity-arm  60s  2026-06-02 21:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #179 crashed      @curiosity-arm  60s  2026-06-02 21:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #181 crashed      @curiosity-arm  60s  2026-06-02 21:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #183 crashed      @curiosity-arm  60s  2026-06-02 21:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #185 crashed      @curiosity-arm  60s  2026-06-02 21:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #187 crashed      @curiosity-arm  60s  2026-06-02 21:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #189 crashed      @curiosity-arm  60s  2026-06-02 21:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #191 crashed      @curiosity-arm  60s  2026-06-02 21:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #193 crashed      @curiosity-arm  60s  2026-06-02 22:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #195 crashed      @curiosity-arm  60s  2026-06-02 22:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #197 crashed      @curiosity-arm  60s  2026-06-02 22:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #199 crashed      @curiosity-arm  60s  2026-06-02 22:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #201 crashed      @curiosity-arm  60s  2026-06-02 22:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #203 crashed      @curiosity-arm  61s  2026-06-02 22:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #205 crashed      @curiosity-arm  60s  2026-06-02 22:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #207 crashed      @curiosity-arm  60s  2026-06-02 22:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #209 crashed      @curiosity-arm  60s  2026-06-02 22:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #211 crashed      @curiosity-arm  60s  2026-06-02 22:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #213 crashed      @curiosity-arm  60s  2026-06-02 22:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #215 crashed      @curiosity-arm  60s  2026-06-02 22:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #217 crashed      @curiosity-arm  60s  2026-06-02 22:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #219 crashed      @curiosity-arm  60s  2026-06-02 22:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #221 crashed      @curiosity-arm  60s  2026-06-02 22:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #223 crashed      @curiosity-arm  60s  2026-06-02 22:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #225 crashed      @curiosity-arm  60s  2026-06-02 22:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #227 crashed      @curiosity-arm  60s  2026-06-02 22:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #229 crashed      @curiosity-arm  60s  2026-06-02 22:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #231 crashed      @curiosity-arm  60s  2026-06-02 22:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #233 crashed      @curiosity-arm  60s  2026-06-02 22:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #235 crashed      @curiosity-arm  60s  2026-06-02 22:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #237 crashed      @curiosity-arm  60s  2026-06-02 22:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #239 crashed      @curiosity-arm  61s  2026-06-02 22:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #241 crashed      @curiosity-arm  60s  2026-06-02 22:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #243 crashed      @curiosity-arm  60s  2026-06-02 22:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #245 crashed      @curiosity-arm  60s  2026-06-02 22:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #247 crashed      @curiosity-arm  60s  2026-06-02 22:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #249 crashed      @curiosity-arm  60s  2026-06-02 22:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #251 crashed      @curiosity-arm  60s  2026-06-02 22:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #253 crashed      @curiosity-arm  60s  2026-06-02 22:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #255 crashed      @curiosity-arm  60s  2026-06-02 22:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #257 crashed      @curiosity-arm  60s  2026-06-02 22:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #259 crashed      @curiosity-arm  60s  2026-06-02 22:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #261 crashed      @curiosity-arm  60s  2026-06-02 22:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #263 crashed      @curiosity-arm  60s  2026-06-02 22:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #265 crashed      @curiosity-arm  60s  2026-06-02 22:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #267 crashed      @curiosity-arm  60s  2026-06-02 22:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #269 crashed      @curiosity-arm  60s  2026-06-02 22:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #271 crashed      @curiosity-arm  61s  2026-06-02 22:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #273 crashed      @curiosity-arm  60s  2026-06-02 22:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #275 crashed      @curiosity-arm  60s  2026-06-02 22:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #277 crashed      @curiosity-arm  60s  2026-06-02 22:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #279 crashed      @curiosity-arm  60s  2026-06-02 22:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #281 crashed      @curiosity-arm  60s  2026-06-02 22:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #283 crashed      @curiosity-arm  60s  2026-06-02 22:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #285 crashed      @curiosity-arm  60s  2026-06-02 22:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #287 crashed      @curiosity-arm  60s  2026-06-02 22:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #289 crashed      @curiosity-arm  60s  2026-06-02 22:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #291 crashed      @curiosity-arm  60s  2026-06-02 22:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #293 crashed      @curiosity-arm  60s  2026-06-02 22:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #295 crashed      @curiosity-arm  60s  2026-06-02 22:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #297 crashed      @curiosity-arm  60s  2026-06-02 22:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #299 crashed      @curiosity-arm  60s  2026-06-02 22:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #301 crashed      @curiosity-arm  60s  2026-06-02 22:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #303 crashed      @curiosity-arm  60s  2026-06-02 22:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #305 crashed      @curiosity-arm  60s  2026-06-02 22:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #307 crashed      @curiosity-arm  60s  2026-06-02 22:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #309 crashed      @curiosity-arm  60s  2026-06-02 22:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #311 crashed      @curiosity-arm  60s  2026-06-02 22:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #313 crashed      @curiosity-arm  61s  2026-06-02 23:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #315 crashed      @curiosity-arm  60s  2026-06-02 23:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #317 crashed      @curiosity-arm  60s  2026-06-02 23:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #319 crashed      @curiosity-arm  60s  2026-06-02 23:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #321 crashed      @curiosity-arm  60s  2026-06-02 23:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #323 crashed      @curiosity-arm  60s  2026-06-02 23:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #325 crashed      @curiosity-arm  60s  2026-06-02 23:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #327 crashed      @curiosity-arm  60s  2026-06-02 23:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #329 crashed      @curiosity-arm  60s  2026-06-02 23:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #331 crashed      @curiosity-arm  60s  2026-06-02 23:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #333 crashed      @curiosity-arm  60s  2026-06-02 23:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #335 crashed      @curiosity-arm  60s  2026-06-02 23:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #337 crashed      @curiosity-arm  60s  2026-06-02 23:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #339 crashed      @curiosity-arm  60s  2026-06-02 23:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #341 crashed      @curiosity-arm  60s  2026-06-02 23:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #343 crashed      @curiosity-arm  60s  2026-06-02 23:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #345 crashed      @curiosity-arm  60s  2026-06-02 23:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #347 crashed      @curiosity-arm  60s  2026-06-02 23:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #349 crashed      @curiosity-arm  60s  2026-06-02 23:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #351 crashed      @curiosity-arm  60s  2026-06-02 23:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #353 crashed      @curiosity-arm  60s  2026-06-02 23:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #355 crashed      @curiosity-arm  60s  2026-06-02 23:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #357 crashed      @curiosity-arm  60s  2026-06-02 23:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #359 crashed      @curiosity-arm  60s  2026-06-02 23:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #361 crashed      @curiosity-arm  60s  2026-06-02 23:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #363 crashed      @curiosity-arm  61s  2026-06-02 23:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #365 crashed      @curiosity-arm  60s  2026-06-02 23:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #367 crashed      @curiosity-arm  60s  2026-06-02 23:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #369 crashed      @curiosity-arm  60s  2026-06-02 23:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #371 crashed      @curiosity-arm  60s  2026-06-02 23:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #373 crashed      @curiosity-arm  60s  2026-06-02 23:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #375 crashed      @curiosity-arm  60s  2026-06-02 23:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #377 crashed      @curiosity-arm  60s  2026-06-02 23:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #379 crashed      @curiosity-arm  60s  2026-06-02 23:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #381 crashed      @curiosity-arm  60s  2026-06-02 23:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #383 crashed      @curiosity-arm  60s  2026-06-02 23:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #385 crashed      @curiosity-arm  60s  2026-06-02 23:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #387 crashed      @curiosity-arm  60s  2026-06-02 23:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #389 crashed      @curiosity-arm  60s  2026-06-02 23:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #391 crashed      @curiosity-arm  60s  2026-06-02 23:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #393 crashed      @curiosity-arm  60s  2026-06-02 23:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #395 crashed      @curiosity-arm  60s  2026-06-02 23:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #397 crashed      @curiosity-arm  60s  2026-06-02 23:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #399 crashed      @curiosity-arm  60s  2026-06-02 23:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #401 crashed      @curiosity-arm  60s  2026-06-02 23:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #403 crashed      @curiosity-arm  60s  2026-06-02 23:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #405 crashed      @curiosity-arm  60s  2026-06-02 23:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #407 crashed      @curiosity-arm  60s  2026-06-02 23:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #409 crashed      @curiosity-arm  60s  2026-06-02 23:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #411 crashed      @curiosity-arm  60s  2026-06-02 23:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #413 crashed      @curiosity-arm  60s  2026-06-02 23:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #415 crashed      @curiosity-arm  60s  2026-06-02 23:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #417 crashed      @curiosity-arm  60s  2026-06-02 23:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #419 crashed      @curiosity-arm  60s  2026-06-02 23:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #421 crashed      @curiosity-arm  60s  2026-06-02 23:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #423 crashed      @curiosity-arm  60s  2026-06-02 23:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #425 crashed      @curiosity-arm  60s  2026-06-02 23:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #427 crashed      @curiosity-arm  60s  2026-06-02 23:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #429 crashed      @curiosity-arm  60s  2026-06-02 23:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #431 crashed      @curiosity-arm  60s  2026-06-02 23:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #433 crashed      @curiosity-arm  360s  2026-06-03 00:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #435 crashed      @curiosity-arm  60s  2026-06-03 00:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #436 crashed      @curiosity-arm  60s  2026-06-03 00:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #438 crashed      @curiosity-arm  60s  2026-06-03 00:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #440 crashed      @curiosity-arm  60s  2026-06-03 00:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #442 crashed      @curiosity-arm  60s  2026-06-03 00:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #444 crashed      @curiosity-arm  60s  2026-06-03 00:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #446 crashed      @curiosity-arm  60s  2026-06-03 00:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #448 crashed      @curiosity-arm  60s  2026-06-03 00:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #450 crashed      @curiosity-arm  60s  2026-06-03 00:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #452 crashed      @curiosity-arm  60s  2026-06-03 00:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #454 crashed      @curiosity-arm  61s  2026-06-03 00:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #456 crashed      @curiosity-arm  60s  2026-06-03 00:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #458 crashed      @curiosity-arm  60s  2026-06-03 00:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #460 crashed      @curiosity-arm  60s  2026-06-03 00:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #462 spawn_failed @curiosity-arm  0s  2026-06-03 00:20
        ! torn-extend detected: page count mismatch on /root/.hermes/kanban/boards/curiosity/kanban.db: header claims 159 pages, file has 158 pages (missing 1 pages, file
  #465 crashed      @curiosity-arm  60s  2026-06-03 00:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #467 crashed      @curiosity-arm  60s  2026-06-03 00:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #469 crashed      @curiosity-arm  60s  2026-06-03 00:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #471 crashed      @curiosity-arm  60s  2026-06-03 00:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #473 crashed      @curiosity-arm  60s  2026-06-03 00:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #475 crashed      @curiosity-arm  60s  2026-06-03 00:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #477 crashed      @curiosity-arm  60s  2026-06-03 00:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #479 crashed      @curiosity-arm  60s  2026-06-03 00:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #481 crashed      @curiosity-arm  60s  2026-06-03 00:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #483 crashed      @curiosity-arm  60s  2026-06-03 00:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #485 crashed      @curiosity-arm  60s  2026-06-03 00:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #487 crashed      @curiosity-arm  60s  2026-06-03 00:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #489 crashed      @curiosity-arm  60s  2026-06-03 00:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #491 crashed      @curiosity-arm  60s  2026-06-03 00:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #493 crashed      @curiosity-arm  60s  2026-06-03 00:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #495 crashed      @curiosity-arm  60s  2026-06-03 00:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #497 crashed      @curiosity-arm  60s  2026-06-03 00:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #499 crashed      @curiosity-arm  60s  2026-06-03 00:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #501 crashed      @curiosity-arm  60s  2026-06-03 00:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #503 crashed      @curiosity-arm  60s  2026-06-03 00:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #505 crashed      @curiosity-arm  60s  2026-06-03 00:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #507 crashed      @curiosity-arm  60s  2026-06-03 00:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #509 crashed      @curiosity-arm  60s  2026-06-03 00:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #511 crashed      @curiosity-arm  60s  2026-06-03 00:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #513 crashed      @curiosity-arm  60s  2026-06-03 00:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #515 crashed      @curiosity-arm  60s  2026-06-03 00:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #517 crashed      @curiosity-arm  60s  2026-06-03 00:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #519 crashed      @curiosity-arm  60s  2026-06-03 00:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #521 crashed      @curiosity-arm  60s  2026-06-03 00:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #523 crashed      @curiosity-arm  60s  2026-06-03 00:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #525 crashed      @curiosity-arm  60s  2026-06-03 00:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #527 crashed      @curiosity-arm  60s  2026-06-03 00:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #529 crashed      @curiosity-arm  60s  2026-06-03 00:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #531 crashed      @curiosity-arm  60s  2026-06-03 00:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #533 crashed      @curiosity-arm  60s  2026-06-03 00:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #535 crashed      @curiosity-arm  60s  2026-06-03 00:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #537 crashed      @curiosity-arm  60s  2026-06-03 00:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #539 crashed      @curiosity-arm  60s  2026-06-03 00:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #541 crashed      @curiosity-arm  60s  2026-06-03 00:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #543 crashed      @curiosity-arm  60s  2026-06-03 01:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #545 crashed      @curiosity-arm  60s  2026-06-03 01:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #547 crashed      @curiosity-arm  60s  2026-06-03 01:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #549 crashed      @curiosity-arm  60s  2026-06-03 01:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #551 crashed      @curiosity-arm  61s  2026-06-03 01:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #553 crashed      @curiosity-arm  60s  2026-06-03 01:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #555 crashed      @curiosity-arm  60s  2026-06-03 01:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #557 crashed      @curiosity-arm  60s  2026-06-03 01:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #559 crashed      @curiosity-arm  60s  2026-06-03 01:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #561 crashed      @curiosity-arm  60s  2026-06-03 01:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #563 crashed      @curiosity-arm  60s  2026-06-03 01:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #565 crashed      @curiosity-arm  60s  2026-06-03 01:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #567 crashed      @curiosity-arm  60s  2026-06-03 01:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #569 crashed      @curiosity-arm  60s  2026-06-03 01:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #571 crashed      @curiosity-arm  60s  2026-06-03 01:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #573 crashed      @curiosity-arm  60s  2026-06-03 01:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #575 crashed      @curiosity-arm  60s  2026-06-03 01:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #577 crashed      @curiosity-arm  60s  2026-06-03 01:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #579 crashed      @curiosity-arm  60s  2026-06-03 01:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #581 crashed      @curiosity-arm  60s  2026-06-03 01:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #583 crashed      @curiosity-arm  60s  2026-06-03 01:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #585 crashed      @curiosity-arm  60s  2026-06-03 01:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #587 crashed      @curiosity-arm  60s  2026-06-03 01:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #589 crashed      @curiosity-arm  60s  2026-06-03 01:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #591 crashed      @curiosity-arm  60s  2026-06-03 01:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #593 crashed      @curiosity-arm  60s  2026-06-03 01:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #595 crashed      @curiosity-arm  60s  2026-06-03 01:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #597 crashed      @curiosity-arm  60s  2026-06-03 01:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #599 crashed      @curiosity-arm  60s  2026-06-03 01:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #601 crashed      @curiosity-arm  60s  2026-06-03 01:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #603 crashed      @curiosity-arm  60s  2026-06-03 01:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #605 crashed      @curiosity-arm  61s  2026-06-03 01:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #607 crashed      @curiosity-arm  60s  2026-06-03 01:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #609 crashed      @curiosity-arm  60s  2026-06-03 01:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #611 crashed      @curiosity-arm  60s  2026-06-03 01:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #613 crashed      @curiosity-arm  60s  2026-06-03 01:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #615 crashed      @curiosity-arm  60s  2026-06-03 01:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #617 crashed      @curiosity-arm  60s  2026-06-03 01:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #619 crashed      @curiosity-arm  60s  2026-06-03 01:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #621 crashed      @curiosity-arm  60s  2026-06-03 01:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #623 crashed      @curiosity-arm  60s  2026-06-03 01:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #625 crashed      @curiosity-arm  60s  2026-06-03 01:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #627 crashed      @curiosity-arm  60s  2026-06-03 01:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #629 crashed      @curiosity-arm  60s  2026-06-03 01:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #631 crashed      @curiosity-arm  60s  2026-06-03 01:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #633 crashed      @curiosity-arm  60s  2026-06-03 01:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #635 crashed      @curiosity-arm  60s  2026-06-03 01:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #637 crashed      @curiosity-arm  60s  2026-06-03 01:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #639 crashed      @curiosity-arm  60s  2026-06-03 01:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #641 crashed      @curiosity-arm  60s  2026-06-03 01:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #643 crashed      @curiosity-arm  60s  2026-06-03 01:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #645 crashed      @curiosity-arm  60s  2026-06-03 01:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #647 crashed      @curiosity-arm  60s  2026-06-03 01:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #649 crashed      @curiosity-arm  60s  2026-06-03 01:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #651 crashed      @curiosity-arm  60s  2026-06-03 01:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #653 crashed      @curiosity-arm  60s  2026-06-03 01:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #655 crashed      @curiosity-arm  60s  2026-06-03 01:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #657 crashed      @curiosity-arm  60s  2026-06-03 01:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #659 crashed      @curiosity-arm  61s  2026-06-03 01:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #661 crashed      @curiosity-arm  60s  2026-06-03 01:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #663 crashed      @curiosity-arm  60s  2026-06-03 02:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #665 crashed      @curiosity-arm  60s  2026-06-03 02:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #667 crashed      @curiosity-arm  60s  2026-06-03 02:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #669 crashed      @curiosity-arm  60s  2026-06-03 02:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #671 crashed      @curiosity-arm  60s  2026-06-03 02:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #673 crashed      @curiosity-arm  60s  2026-06-03 02:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #675 crashed      @curiosity-arm  60s  2026-06-03 02:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #677 crashed      @curiosity-arm  60s  2026-06-03 02:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #679 crashed      @curiosity-arm  60s  2026-06-03 02:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #681 crashed      @curiosity-arm  60s  2026-06-03 02:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #683 crashed      @curiosity-arm  60s  2026-06-03 02:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #685 crashed      @curiosity-arm  60s  2026-06-03 02:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #687 crashed      @curiosity-arm  60s  2026-06-03 02:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #689 crashed      @curiosity-arm  60s  2026-06-03 02:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #691 crashed      @curiosity-arm  60s  2026-06-03 02:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #693 crashed      @curiosity-arm  60s  2026-06-03 02:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #695 crashed      @curiosity-arm  60s  2026-06-03 02:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #697 crashed      @curiosity-arm  60s  2026-06-03 02:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #699 crashed      @curiosity-arm  60s  2026-06-03 02:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #701 crashed      @curiosity-arm  60s  2026-06-03 02:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #703 crashed      @curiosity-arm  60s  2026-06-03 02:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #705 crashed      @curiosity-arm  60s  2026-06-03 02:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #707 crashed      @curiosity-arm  60s  2026-06-03 02:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #709 crashed      @curiosity-arm  60s  2026-06-03 02:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #711 crashed      @curiosity-arm  60s  2026-06-03 02:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #713 crashed      @curiosity-arm  60s  2026-06-03 02:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #715 crashed      @curiosity-arm  60s  2026-06-03 02:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #717 crashed      @curiosity-arm  60s  2026-06-03 02:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #719 crashed      @curiosity-arm  60s  2026-06-03 02:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #721 crashed      @curiosity-arm  60s  2026-06-03 02:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #723 crashed      @curiosity-arm  60s  2026-06-03 02:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #725 crashed      @curiosity-arm  60s  2026-06-03 02:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #727 crashed      @curiosity-arm  60s  2026-06-03 02:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #729 crashed      @curiosity-arm  60s  2026-06-03 02:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #731 crashed      @curiosity-arm  60s  2026-06-03 02:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #733 crashed      @curiosity-arm  60s  2026-06-03 02:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #735 crashed      @curiosity-arm  60s  2026-06-03 02:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #737 crashed      @curiosity-arm  60s  2026-06-03 02:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #739 crashed      @curiosity-arm  60s  2026-06-03 02:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #741 crashed      @curiosity-arm  60s  2026-06-03 02:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #743 crashed      @curiosity-arm  60s  2026-06-03 02:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #745 crashed      @curiosity-arm  60s  2026-06-03 02:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #747 crashed      @curiosity-arm  60s  2026-06-03 02:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #749 crashed      @curiosity-arm  60s  2026-06-03 02:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #751 crashed      @curiosity-arm  60s  2026-06-03 02:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #753 crashed      @curiosity-arm  60s  2026-06-03 02:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #755 crashed      @curiosity-arm  60s  2026-06-03 02:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #757 crashed      @curiosity-arm  60s  2026-06-03 02:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #759 crashed      @curiosity-arm  60s  2026-06-03 02:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #761 crashed      @curiosity-arm  61s  2026-06-03 02:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #763 crashed      @curiosity-arm  60s  2026-06-03 02:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #765 crashed      @curiosity-arm  60s  2026-06-03 02:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #767 crashed      @curiosity-arm  60s  2026-06-03 02:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #769 crashed      @curiosity-arm  60s  2026-06-03 02:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #771 crashed      @curiosity-arm  60s  2026-06-03 02:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #773 crashed      @curiosity-arm  60s  2026-06-03 02:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #775 crashed      @curiosity-arm  60s  2026-06-03 02:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #777 crashed      @curiosity-arm  60s  2026-06-03 02:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #779 crashed      @curiosity-arm  60s  2026-06-03 02:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #781 crashed      @curiosity-arm  60s  2026-06-03 02:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #783 crashed      @curiosity-arm  60s  2026-06-03 03:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #785 crashed      @curiosity-arm  60s  2026-06-03 03:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #787 crashed      @curiosity-arm  60s  2026-06-03 03:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #789 crashed      @curiosity-arm  60s  2026-06-03 03:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #791 crashed      @curiosity-arm  60s  2026-06-03 03:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #793 crashed      @curiosity-arm  60s  2026-06-03 03:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #795 crashed      @curiosity-arm  60s  2026-06-03 03:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #797 crashed      @curiosity-arm  60s  2026-06-03 03:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #799 crashed      @curiosity-arm  60s  2026-06-03 03:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #801 crashed      @curiosity-arm  60s  2026-06-03 03:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #803 crashed      @curiosity-arm  60s  2026-06-03 03:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #805 crashed      @curiosity-arm  60s  2026-06-03 03:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #807 crashed      @curiosity-arm  60s  2026-06-03 03:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #809 crashed      @curiosity-arm  60s  2026-06-03 03:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #811 crashed      @curiosity-arm  61s  2026-06-03 03:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #813 crashed      @curiosity-arm  60s  2026-06-03 03:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #815 crashed      @curiosity-arm  60s  2026-06-03 03:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #817 crashed      @curiosity-arm  60s  2026-06-03 03:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #819 crashed      @curiosity-arm  60s  2026-06-03 03:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #821 crashed      @curiosity-arm  60s  2026-06-03 03:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #823 crashed      @curiosity-arm  60s  2026-06-03 03:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #825 crashed      @curiosity-arm  60s  2026-06-03 03:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #827 crashed      @curiosity-arm  60s  2026-06-03 03:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #829 crashed      @curiosity-arm  60s  2026-06-03 03:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #831 crashed      @curiosity-arm  60s  2026-06-03 03:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #833 crashed      @curiosity-arm  60s  2026-06-03 03:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #835 crashed      @curiosity-arm  60s  2026-06-03 03:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #837 crashed      @curiosity-arm  60s  2026-06-03 03:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #839 crashed      @curiosity-arm  60s  2026-06-03 03:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #841 crashed      @curiosity-arm  60s  2026-06-03 03:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #843 crashed      @curiosity-arm  60s  2026-06-03 03:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #845 crashed      @curiosity-arm  60s  2026-06-03 03:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #847 crashed      @curiosity-arm  60s  2026-06-03 03:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #849 crashed      @curiosity-arm  60s  2026-06-03 03:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #851 crashed      @curiosity-arm  60s  2026-06-03 03:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #853 crashed      @curiosity-arm  60s  2026-06-03 03:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #855 crashed      @curiosity-arm  60s  2026-06-03 03:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #857 crashed      @curiosity-arm  60s  2026-06-03 03:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #859 crashed      @curiosity-arm  60s  2026-06-03 03:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #861 crashed      @curiosity-arm  60s  2026-06-03 03:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #863 crashed      @curiosity-arm  60s  2026-06-03 03:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #865 crashed      @curiosity-arm  60s  2026-06-03 03:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #867 crashed      @curiosity-arm  60s  2026-06-03 03:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #869 crashed      @curiosity-arm  60s  2026-06-03 03:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #871 crashed      @curiosity-arm  60s  2026-06-03 03:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #873 crashed      @curiosity-arm  60s  2026-06-03 03:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #875 crashed      @curiosity-arm  60s  2026-06-03 03:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #877 crashed      @curiosity-arm  60s  2026-06-03 03:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #879 crashed      @curiosity-arm  60s  2026-06-03 03:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #881 crashed      @curiosity-arm  60s  2026-06-03 03:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #883 crashed      @curiosity-arm  60s  2026-06-03 03:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #885 crashed      @curiosity-arm  60s  2026-06-03 03:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #887 crashed      @curiosity-arm  60s  2026-06-03 03:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #889 crashed      @curiosity-arm  60s  2026-06-03 03:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #891 crashed      @curiosity-arm  60s  2026-06-03 03:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #893 crashed      @curiosity-arm  60s  2026-06-03 03:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #895 crashed      @curiosity-arm  60s  2026-06-03 03:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #897 crashed      @curiosity-arm  60s  2026-06-03 03:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #899 crashed      @curiosity-arm  60s  2026-06-03 03:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #901 crashed      @curiosity-arm  60s  2026-06-03 03:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #903 crashed      @curiosity-arm  60s  2026-06-03 04:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #905 crashed      @curiosity-arm  60s  2026-06-03 04:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #907 crashed      @curiosity-arm  60s  2026-06-03 04:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #909 crashed      @curiosity-arm  60s  2026-06-03 04:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #911 crashed      @curiosity-arm  60s  2026-06-03 04:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #913 crashed      @curiosity-arm  60s  2026-06-03 04:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #915 crashed      @curiosity-arm  60s  2026-06-03 04:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #917 crashed      @curiosity-arm  60s  2026-06-03 04:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #919 crashed      @curiosity-arm  60s  2026-06-03 04:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #921 crashed      @curiosity-arm  60s  2026-06-03 04:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #923 crashed      @curiosity-arm  60s  2026-06-03 04:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #925 crashed      @curiosity-arm  60s  2026-06-03 04:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #927 crashed      @curiosity-arm  60s  2026-06-03 04:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #929 crashed      @curiosity-arm  60s  2026-06-03 04:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #931 crashed      @curiosity-arm  60s  2026-06-03 04:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #933 crashed      @curiosity-arm  60s  2026-06-03 04:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #935 crashed      @curiosity-arm  60s  2026-06-03 04:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #937 crashed      @curiosity-arm  60s  2026-06-03 04:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #939 crashed      @curiosity-arm  60s  2026-06-03 04:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #941 crashed      @curiosity-arm  60s  2026-06-03 04:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #943 crashed      @curiosity-arm  60s  2026-06-03 04:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #945 crashed      @curiosity-arm  60s  2026-06-03 04:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #947 crashed      @curiosity-arm  60s  2026-06-03 04:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #949 crashed      @curiosity-arm  60s  2026-06-03 04:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #951 crashed      @curiosity-arm  60s  2026-06-03 04:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #953 crashed      @curiosity-arm  60s  2026-06-03 04:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #955 crashed      @curiosity-arm  60s  2026-06-03 04:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #957 crashed      @curiosity-arm  60s  2026-06-03 04:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #959 crashed      @curiosity-arm  60s  2026-06-03 04:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #961 crashed      @curiosity-arm  60s  2026-06-03 04:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #963 crashed      @curiosity-arm  60s  2026-06-03 04:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #965 crashed      @curiosity-arm  61s  2026-06-03 04:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #967 crashed      @curiosity-arm  60s  2026-06-03 04:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #969 crashed      @curiosity-arm  60s  2026-06-03 04:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #971 crashed      @curiosity-arm  60s  2026-06-03 04:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #973 crashed      @curiosity-arm  60s  2026-06-03 04:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #975 crashed      @curiosity-arm  60s  2026-06-03 04:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #977 crashed      @curiosity-arm  60s  2026-06-03 04:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #979 crashed      @curiosity-arm  60s  2026-06-03 04:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #981 crashed      @curiosity-arm  60s  2026-06-03 04:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #983 crashed      @curiosity-arm  60s  2026-06-03 04:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #985 crashed      @curiosity-arm  60s  2026-06-03 04:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #987 crashed      @curiosity-arm  60s  2026-06-03 04:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #989 crashed      @curiosity-arm  60s  2026-06-03 04:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #991 crashed      @curiosity-arm  60s  2026-06-03 04:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #993 crashed      @curiosity-arm  60s  2026-06-03 04:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #995 crashed      @curiosity-arm  60s  2026-06-03 04:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #997 crashed      @curiosity-arm  60s  2026-06-03 04:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #999 crashed      @curiosity-arm  60s  2026-06-03 04:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1001 crashed      @curiosity-arm  60s  2026-06-03 04:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1003 crashed      @curiosity-arm  60s  2026-06-03 04:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1005 crashed      @curiosity-arm  60s  2026-06-03 04:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1007 crashed      @curiosity-arm  60s  2026-06-03 04:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1009 crashed      @curiosity-arm  60s  2026-06-03 04:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1011 crashed      @curiosity-arm  60s  2026-06-03 04:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1013 crashed      @curiosity-arm  60s  2026-06-03 04:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1015 crashed      @curiosity-arm  60s  2026-06-03 04:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1017 crashed      @curiosity-arm  60s  2026-06-03 04:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1019 crashed      @curiosity-arm  60s  2026-06-03 04:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1021 crashed      @curiosity-arm  60s  2026-06-03 04:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1023 crashed      @curiosity-arm  60s  2026-06-03 05:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1025 crashed      @curiosity-arm  60s  2026-06-03 05:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1027 crashed      @curiosity-arm  60s  2026-06-03 05:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1029 crashed      @curiosity-arm  60s  2026-06-03 05:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1031 crashed      @curiosity-arm  60s  2026-06-03 05:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1033 crashed      @curiosity-arm  60s  2026-06-03 05:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1035 crashed      @curiosity-arm  60s  2026-06-03 05:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1037 crashed      @curiosity-arm  60s  2026-06-03 05:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1039 crashed      @curiosity-arm  60s  2026-06-03 05:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1041 crashed      @curiosity-arm  60s  2026-06-03 05:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1043 crashed      @curiosity-arm  60s  2026-06-03 05:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1045 crashed      @curiosity-arm  60s  2026-06-03 05:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1047 crashed      @curiosity-arm  60s  2026-06-03 05:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1049 crashed      @curiosity-arm  60s  2026-06-03 05:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1051 crashed      @curiosity-arm  60s  2026-06-03 05:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1053 crashed      @curiosity-arm  60s  2026-06-03 05:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1055 crashed      @curiosity-arm  60s  2026-06-03 05:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1057 crashed      @curiosity-arm  60s  2026-06-03 05:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1059 crashed      @curiosity-arm  60s  2026-06-03 05:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1061 crashed      @curiosity-arm  60s  2026-06-03 05:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1063 crashed      @curiosity-arm  60s  2026-06-03 05:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1065 crashed      @curiosity-arm  60s  2026-06-03 05:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1067 crashed      @curiosity-arm  60s  2026-06-03 05:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1069 crashed      @curiosity-arm  60s  2026-06-03 05:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1071 crashed      @curiosity-arm  60s  2026-06-03 05:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1073 crashed      @curiosity-arm  60s  2026-06-03 05:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1075 crashed      @curiosity-arm  60s  2026-06-03 05:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1077 crashed      @curiosity-arm  60s  2026-06-03 05:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1079 crashed      @curiosity-arm  60s  2026-06-03 05:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1081 crashed      @curiosity-arm  60s  2026-06-03 05:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1083 crashed      @curiosity-arm  60s  2026-06-03 05:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1085 crashed      @curiosity-arm  60s  2026-06-03 05:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1087 crashed      @curiosity-arm  60s  2026-06-03 05:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1089 crashed      @curiosity-arm  60s  2026-06-03 05:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1091 crashed      @curiosity-arm  60s  2026-06-03 05:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1093 crashed      @curiosity-arm  60s  2026-06-03 05:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1095 crashed      @curiosity-arm  60s  2026-06-03 05:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1097 crashed      @curiosity-arm  60s  2026-06-03 05:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1099 crashed      @curiosity-arm  60s  2026-06-03 05:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1101 crashed      @curiosity-arm  60s  2026-06-03 05:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1103 crashed      @curiosity-arm  60s  2026-06-03 05:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1105 crashed      @curiosity-arm  60s  2026-06-03 05:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1107 crashed      @curiosity-arm  60s  2026-06-03 05:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1109 crashed      @curiosity-arm  60s  2026-06-03 05:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1111 crashed      @curiosity-arm  60s  2026-06-03 05:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1113 crashed      @curiosity-arm  60s  2026-06-03 05:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1115 crashed      @curiosity-arm  60s  2026-06-03 05:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1117 crashed      @curiosity-arm  60s  2026-06-03 05:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1119 crashed      @curiosity-arm  60s  2026-06-03 05:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1121 crashed      @curiosity-arm  60s  2026-06-03 05:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1123 crashed      @curiosity-arm  60s  2026-06-03 05:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1125 crashed      @curiosity-arm  60s  2026-06-03 05:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1127 crashed      @curiosity-arm  61s  2026-06-03 05:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1129 crashed      @curiosity-arm  60s  2026-06-03 05:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1131 crashed      @curiosity-arm  60s  2026-06-03 05:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1133 crashed      @curiosity-arm  60s  2026-06-03 05:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1135 crashed      @curiosity-arm  60s  2026-06-03 05:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1137 crashed      @curiosity-arm  60s  2026-06-03 05:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1139 crashed      @curiosity-arm  60s  2026-06-03 05:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1141 crashed      @curiosity-arm  60s  2026-06-03 05:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1143 crashed      @curiosity-arm  60s  2026-06-03 06:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1145 crashed      @curiosity-arm  60s  2026-06-03 06:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1147 crashed      @curiosity-arm  60s  2026-06-03 06:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1149 crashed      @curiosity-arm  60s  2026-06-03 06:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1151 crashed      @curiosity-arm  60s  2026-06-03 06:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1153 crashed      @curiosity-arm  60s  2026-06-03 06:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1155 crashed      @curiosity-arm  60s  2026-06-03 06:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1157 crashed      @curiosity-arm  60s  2026-06-03 06:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1159 crashed      @curiosity-arm  60s  2026-06-03 06:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1161 crashed      @curiosity-arm  60s  2026-06-03 06:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1163 crashed      @curiosity-arm  60s  2026-06-03 06:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1165 crashed      @curiosity-arm  60s  2026-06-03 06:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1167 crashed      @curiosity-arm  60s  2026-06-03 06:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1169 crashed      @curiosity-arm  60s  2026-06-03 06:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1171 crashed      @curiosity-arm  60s  2026-06-03 06:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1173 crashed      @curiosity-arm  60s  2026-06-03 06:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1175 crashed      @curiosity-arm  60s  2026-06-03 06:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1177 crashed      @curiosity-arm  60s  2026-06-03 06:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1179 crashed      @curiosity-arm  60s  2026-06-03 06:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1181 crashed      @curiosity-arm  60s  2026-06-03 06:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1183 crashed      @curiosity-arm  60s  2026-06-03 06:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1185 crashed      @curiosity-arm  60s  2026-06-03 06:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1187 crashed      @curiosity-arm  60s  2026-06-03 06:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1189 crashed      @curiosity-arm  60s  2026-06-03 06:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1191 crashed      @curiosity-arm  60s  2026-06-03 06:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1193 crashed      @curiosity-arm  60s  2026-06-03 06:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1195 crashed      @curiosity-arm  60s  2026-06-03 06:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1197 crashed      @curiosity-arm  61s  2026-06-03 06:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1199 crashed      @curiosity-arm  60s  2026-06-03 06:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1201 crashed      @curiosity-arm  60s  2026-06-03 06:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1203 crashed      @curiosity-arm  60s  2026-06-03 06:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1205 crashed      @curiosity-arm  60s  2026-06-03 06:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1207 crashed      @curiosity-arm  60s  2026-06-03 06:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1209 crashed      @curiosity-arm  60s  2026-06-03 06:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1211 crashed      @curiosity-arm  60s  2026-06-03 06:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1213 crashed      @curiosity-arm  60s  2026-06-03 06:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1215 crashed      @curiosity-arm  60s  2026-06-03 06:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1217 crashed      @curiosity-arm  60s  2026-06-03 06:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1219 crashed      @curiosity-arm  60s  2026-06-03 06:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1221 crashed      @curiosity-arm  60s  2026-06-03 06:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1223 crashed      @curiosity-arm  60s  2026-06-03 06:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1225 crashed      @curiosity-arm  60s  2026-06-03 06:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1227 crashed      @curiosity-arm  60s  2026-06-03 06:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1229 crashed      @curiosity-arm  60s  2026-06-03 06:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1231 crashed      @curiosity-arm  60s  2026-06-03 06:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1233 crashed      @curiosity-arm  60s  2026-06-03 06:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1235 crashed      @curiosity-arm  60s  2026-06-03 06:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1237 crashed      @curiosity-arm  60s  2026-06-03 06:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1239 crashed      @curiosity-arm  60s  2026-06-03 06:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1241 crashed      @curiosity-arm  60s  2026-06-03 06:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1243 crashed      @curiosity-arm  60s  2026-06-03 06:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1245 crashed      @curiosity-arm  60s  2026-06-03 06:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1247 crashed      @curiosity-arm  60s  2026-06-03 06:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1249 crashed      @curiosity-arm  60s  2026-06-03 06:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1251 crashed      @curiosity-arm  60s  2026-06-03 06:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1253 crashed      @curiosity-arm  60s  2026-06-03 06:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1255 crashed      @curiosity-arm  60s  2026-06-03 06:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1257 crashed      @curiosity-arm  60s  2026-06-03 06:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1259 crashed      @curiosity-arm  60s  2026-06-03 06:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1261 crashed      @curiosity-arm  60s  2026-06-03 06:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1263 crashed      @curiosity-arm  60s  2026-06-03 07:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1265 crashed      @curiosity-arm  61s  2026-06-03 07:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1267 crashed      @curiosity-arm  60s  2026-06-03 07:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1269 crashed      @curiosity-arm  60s  2026-06-03 07:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1271 crashed      @curiosity-arm  60s  2026-06-03 07:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1273 crashed      @curiosity-arm  60s  2026-06-03 07:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1275 crashed      @curiosity-arm  60s  2026-06-03 07:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1277 crashed      @curiosity-arm  60s  2026-06-03 07:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1279 crashed      @curiosity-arm  60s  2026-06-03 07:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1281 crashed      @curiosity-arm  60s  2026-06-03 07:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1283 crashed      @curiosity-arm  60s  2026-06-03 07:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1285 crashed      @curiosity-arm  60s  2026-06-03 07:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1287 crashed      @curiosity-arm  60s  2026-06-03 07:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1289 crashed      @curiosity-arm  60s  2026-06-03 07:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1291 crashed      @curiosity-arm  60s  2026-06-03 07:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1293 crashed      @curiosity-arm  60s  2026-06-03 07:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1295 crashed      @curiosity-arm  60s  2026-06-03 07:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1297 crashed      @curiosity-arm  60s  2026-06-03 07:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1299 crashed      @curiosity-arm  60s  2026-06-03 07:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1301 crashed      @curiosity-arm  60s  2026-06-03 07:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1303 crashed      @curiosity-arm  60s  2026-06-03 07:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1305 crashed      @curiosity-arm  60s  2026-06-03 07:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1307 crashed      @curiosity-arm  60s  2026-06-03 07:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1309 crashed      @curiosity-arm  60s  2026-06-03 07:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1311 crashed      @curiosity-arm  60s  2026-06-03 07:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1313 crashed      @curiosity-arm  60s  2026-06-03 07:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1315 crashed      @curiosity-arm  60s  2026-06-03 07:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1317 crashed      @curiosity-arm  60s  2026-06-03 07:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1319 crashed      @curiosity-arm  60s  2026-06-03 07:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1321 crashed      @curiosity-arm  60s  2026-06-03 07:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1323 crashed      @curiosity-arm  60s  2026-06-03 07:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1325 crashed      @curiosity-arm  60s  2026-06-03 07:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1327 crashed      @curiosity-arm  60s  2026-06-03 07:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1329 crashed      @curiosity-arm  60s  2026-06-03 07:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1331 crashed      @curiosity-arm  60s  2026-06-03 07:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1333 crashed      @curiosity-arm  60s  2026-06-03 07:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1335 crashed      @curiosity-arm  60s  2026-06-03 07:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1337 crashed      @curiosity-arm  60s  2026-06-03 07:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1339 crashed      @curiosity-arm  60s  2026-06-03 07:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1341 crashed      @curiosity-arm  61s  2026-06-03 07:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1343 crashed      @curiosity-arm  60s  2026-06-03 07:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1345 crashed      @curiosity-arm  60s  2026-06-03 07:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1347 crashed      @curiosity-arm  60s  2026-06-03 07:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1349 crashed      @curiosity-arm  60s  2026-06-03 07:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1351 crashed      @curiosity-arm  60s  2026-06-03 07:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1353 crashed      @curiosity-arm  60s  2026-06-03 07:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1355 crashed      @curiosity-arm  60s  2026-06-03 07:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1357 crashed      @curiosity-arm  60s  2026-06-03 07:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1359 crashed      @curiosity-arm  60s  2026-06-03 07:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1361 crashed      @curiosity-arm  60s  2026-06-03 07:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1363 crashed      @curiosity-arm  60s  2026-06-03 07:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1365 crashed      @curiosity-arm  60s  2026-06-03 07:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1367 crashed      @curiosity-arm  60s  2026-06-03 07:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1369 crashed      @curiosity-arm  60s  2026-06-03 07:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1371 crashed      @curiosity-arm  60s  2026-06-03 07:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1373 crashed      @curiosity-arm  60s  2026-06-03 07:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1375 crashed      @curiosity-arm  60s  2026-06-03 07:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1377 crashed      @curiosity-arm  60s  2026-06-03 07:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1379 crashed      @curiosity-arm  60s  2026-06-03 07:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1381 crashed      @curiosity-arm  60s  2026-06-03 07:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1383 crashed      @curiosity-arm  60s  2026-06-03 08:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1385 crashed      @curiosity-arm  60s  2026-06-03 08:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1387 crashed      @curiosity-arm  60s  2026-06-03 08:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1389 crashed      @curiosity-arm  60s  2026-06-03 08:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1391 crashed      @curiosity-arm  60s  2026-06-03 08:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1393 crashed      @curiosity-arm  60s  2026-06-03 08:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1395 crashed      @curiosity-arm  60s  2026-06-03 08:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1397 crashed      @curiosity-arm  60s  2026-06-03 08:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1399 crashed      @curiosity-arm  60s  2026-06-03 08:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1401 crashed      @curiosity-arm  60s  2026-06-03 08:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1403 crashed      @curiosity-arm  60s  2026-06-03 08:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1405 crashed      @curiosity-arm  60s  2026-06-03 08:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1407 crashed      @curiosity-arm  60s  2026-06-03 08:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1409 crashed      @curiosity-arm  60s  2026-06-03 08:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1411 crashed      @curiosity-arm  60s  2026-06-03 08:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1413 crashed      @curiosity-arm  60s  2026-06-03 08:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1415 crashed      @curiosity-arm  60s  2026-06-03 08:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1417 crashed      @curiosity-arm  60s  2026-06-03 08:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1419 crashed      @curiosity-arm  60s  2026-06-03 08:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1421 crashed      @curiosity-arm  60s  2026-06-03 08:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1423 crashed      @curiosity-arm  60s  2026-06-03 08:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1425 crashed      @curiosity-arm  60s  2026-06-03 08:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1427 crashed      @curiosity-arm  60s  2026-06-03 08:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1429 crashed      @curiosity-arm  60s  2026-06-03 08:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1431 crashed      @curiosity-arm  60s  2026-06-03 08:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1433 crashed      @curiosity-arm  61s  2026-06-03 08:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1435 crashed      @curiosity-arm  60s  2026-06-03 08:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1437 crashed      @curiosity-arm  60s  2026-06-03 08:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1439 crashed      @curiosity-arm  60s  2026-06-03 08:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1441 crashed      @curiosity-arm  60s  2026-06-03 08:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1443 crashed      @curiosity-arm  60s  2026-06-03 08:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1445 crashed      @curiosity-arm  60s  2026-06-03 08:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1447 crashed      @curiosity-arm  60s  2026-06-03 08:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1449 crashed      @curiosity-arm  60s  2026-06-03 08:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1451 crashed      @curiosity-arm  60s  2026-06-03 08:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1453 crashed      @curiosity-arm  60s  2026-06-03 08:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1455 crashed      @curiosity-arm  60s  2026-06-03 08:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1457 crashed      @curiosity-arm  60s  2026-06-03 08:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1459 crashed      @curiosity-arm  60s  2026-06-03 08:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1461 crashed      @curiosity-arm  60s  2026-06-03 08:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1463 crashed      @curiosity-arm  60s  2026-06-03 08:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1465 crashed      @curiosity-arm  60s  2026-06-03 08:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1467 crashed      @curiosity-arm  60s  2026-06-03 08:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1469 crashed      @curiosity-arm  60s  2026-06-03 08:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1471 crashed      @curiosity-arm  60s  2026-06-03 08:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1473 crashed      @curiosity-arm  60s  2026-06-03 08:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1475 crashed      @curiosity-arm  60s  2026-06-03 08:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1477 crashed      @curiosity-arm  60s  2026-06-03 08:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1479 crashed      @curiosity-arm  61s  2026-06-03 08:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1481 crashed      @curiosity-arm  60s  2026-06-03 08:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1483 crashed      @curiosity-arm  60s  2026-06-03 08:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1485 crashed      @curiosity-arm  60s  2026-06-03 08:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1487 crashed      @curiosity-arm  60s  2026-06-03 08:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1489 crashed      @curiosity-arm  60s  2026-06-03 08:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1491 crashed      @curiosity-arm  60s  2026-06-03 08:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1493 crashed      @curiosity-arm  60s  2026-06-03 08:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1495 crashed      @curiosity-arm  60s  2026-06-03 08:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1497 crashed      @curiosity-arm  60s  2026-06-03 08:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1499 crashed      @curiosity-arm  60s  2026-06-03 08:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1501 crashed      @curiosity-arm  60s  2026-06-03 08:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1503 crashed      @curiosity-arm  60s  2026-06-03 09:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1505 crashed      @curiosity-arm  60s  2026-06-03 09:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1507 crashed      @curiosity-arm  60s  2026-06-03 09:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1509 crashed      @curiosity-arm  60s  2026-06-03 09:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1511 crashed      @curiosity-arm  60s  2026-06-03 09:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1513 crashed      @curiosity-arm  60s  2026-06-03 09:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1515 crashed      @curiosity-arm  60s  2026-06-03 09:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1517 crashed      @curiosity-arm  60s  2026-06-03 09:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1519 crashed      @curiosity-arm  60s  2026-06-03 09:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1521 crashed      @curiosity-arm  60s  2026-06-03 09:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1523 crashed      @curiosity-arm  60s  2026-06-03 09:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1525 crashed      @curiosity-arm  60s  2026-06-03 09:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1527 crashed      @curiosity-arm  61s  2026-06-03 09:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1529 crashed      @curiosity-arm  60s  2026-06-03 09:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1531 crashed      @curiosity-arm  60s  2026-06-03 09:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1533 crashed      @curiosity-arm  60s  2026-06-03 09:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1535 crashed      @curiosity-arm  60s  2026-06-03 09:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1537 crashed      @curiosity-arm  60s  2026-06-03 09:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1539 crashed      @curiosity-arm  60s  2026-06-03 09:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1541 crashed      @curiosity-arm  60s  2026-06-03 09:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1543 crashed      @curiosity-arm  60s  2026-06-03 09:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1545 crashed      @curiosity-arm  60s  2026-06-03 09:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1547 crashed      @curiosity-arm  60s  2026-06-03 09:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1549 crashed      @curiosity-arm  60s  2026-06-03 09:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1551 crashed      @curiosity-arm  60s  2026-06-03 09:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1553 crashed      @curiosity-arm  60s  2026-06-03 09:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1555 crashed      @curiosity-arm  60s  2026-06-03 09:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1557 crashed      @curiosity-arm  60s  2026-06-03 09:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1559 crashed      @curiosity-arm  60s  2026-06-03 09:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1561 crashed      @curiosity-arm  60s  2026-06-03 09:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1563 crashed      @curiosity-arm  60s  2026-06-03 09:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1565 crashed      @curiosity-arm  60s  2026-06-03 09:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1567 crashed      @curiosity-arm  60s  2026-06-03 09:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1569 crashed      @curiosity-arm  60s  2026-06-03 09:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1571 crashed      @curiosity-arm  60s  2026-06-03 09:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1573 crashed      @curiosity-arm  60s  2026-06-03 09:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1575 crashed      @curiosity-arm  60s  2026-06-03 09:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1577 crashed      @curiosity-arm  60s  2026-06-03 09:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1579 crashed      @curiosity-arm  60s  2026-06-03 09:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1581 crashed      @curiosity-arm  60s  2026-06-03 09:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1583 crashed      @curiosity-arm  60s  2026-06-03 09:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1585 crashed      @curiosity-arm  60s  2026-06-03 09:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1587 crashed      @curiosity-arm  60s  2026-06-03 09:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1589 crashed      @curiosity-arm  60s  2026-06-03 09:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1591 crashed      @curiosity-arm  60s  2026-06-03 09:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1593 crashed      @curiosity-arm  60s  2026-06-03 09:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1595 crashed      @curiosity-arm  60s  2026-06-03 09:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1597 crashed      @curiosity-arm  60s  2026-06-03 09:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1599 crashed      @curiosity-arm  60s  2026-06-03 09:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1601 crashed      @curiosity-arm  60s  2026-06-03 09:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1603 crashed      @curiosity-arm  60s  2026-06-03 09:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1605 crashed      @curiosity-arm  60s  2026-06-03 09:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1607 crashed      @curiosity-arm  60s  2026-06-03 09:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1609 crashed      @curiosity-arm  60s  2026-06-03 09:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1611 crashed      @curiosity-arm  60s  2026-06-03 09:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1613 crashed      @curiosity-arm  60s  2026-06-03 09:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1615 crashed      @curiosity-arm  60s  2026-06-03 09:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1617 crashed      @curiosity-arm  60s  2026-06-03 09:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1619 crashed      @curiosity-arm  60s  2026-06-03 09:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1621 crashed      @curiosity-arm  60s  2026-06-03 09:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1623 crashed      @curiosity-arm  60s  2026-06-03 10:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1625 crashed      @curiosity-arm  61s  2026-06-03 10:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1627 crashed      @curiosity-arm  60s  2026-06-03 10:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1629 crashed      @curiosity-arm  60s  2026-06-03 10:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1631 crashed      @curiosity-arm  60s  2026-06-03 10:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1633 crashed      @curiosity-arm  60s  2026-06-03 10:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1635 crashed      @curiosity-arm  60s  2026-06-03 10:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1637 crashed      @curiosity-arm  60s  2026-06-03 10:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1639 crashed      @curiosity-arm  60s  2026-06-03 10:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1641 crashed      @curiosity-arm  60s  2026-06-03 10:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1643 crashed      @curiosity-arm  60s  2026-06-03 10:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1645 crashed      @curiosity-arm  60s  2026-06-03 10:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1647 crashed      @curiosity-arm  60s  2026-06-03 10:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1649 crashed      @curiosity-arm  60s  2026-06-03 10:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1651 crashed      @curiosity-arm  60s  2026-06-03 10:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1653 crashed      @curiosity-arm  60s  2026-06-03 10:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1655 crashed      @curiosity-arm  60s  2026-06-03 10:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1657 crashed      @curiosity-arm  60s  2026-06-03 10:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1659 crashed      @curiosity-arm  60s  2026-06-03 10:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1661 crashed      @curiosity-arm  60s  2026-06-03 10:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1663 crashed      @curiosity-arm  60s  2026-06-03 10:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1665 crashed      @curiosity-arm  60s  2026-06-03 10:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1667 crashed      @curiosity-arm  60s  2026-06-03 10:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1669 crashed      @curiosity-arm  60s  2026-06-03 10:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1671 crashed      @curiosity-arm  60s  2026-06-03 10:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1673 crashed      @curiosity-arm  60s  2026-06-03 10:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1675 crashed      @curiosity-arm  60s  2026-06-03 10:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1677 crashed      @curiosity-arm  60s  2026-06-03 10:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1679 crashed      @curiosity-arm  60s  2026-06-03 10:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1681 crashed      @curiosity-arm  60s  2026-06-03 10:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1683 crashed      @curiosity-arm  60s  2026-06-03 10:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1685 crashed      @curiosity-arm  60s  2026-06-03 10:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1687 crashed      @curiosity-arm  60s  2026-06-03 10:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1689 crashed      @curiosity-arm  60s  2026-06-03 10:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1691 crashed      @curiosity-arm  60s  2026-06-03 10:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1693 crashed      @curiosity-arm  60s  2026-06-03 10:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1695 crashed      @curiosity-arm  60s  2026-06-03 10:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1697 crashed      @curiosity-arm  60s  2026-06-03 10:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1699 crashed      @curiosity-arm  60s  2026-06-03 10:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1701 crashed      @curiosity-arm  60s  2026-06-03 10:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1703 crashed      @curiosity-arm  60s  2026-06-03 10:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1705 crashed      @curiosity-arm  60s  2026-06-03 10:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1707 crashed      @curiosity-arm  60s  2026-06-03 10:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1709 crashed      @curiosity-arm  60s  2026-06-03 10:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1711 crashed      @curiosity-arm  60s  2026-06-03 10:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1713 crashed      @curiosity-arm  60s  2026-06-03 10:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1715 crashed      @curiosity-arm  60s  2026-06-03 10:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1717 crashed      @curiosity-arm  60s  2026-06-03 10:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1719 crashed      @curiosity-arm  60s  2026-06-03 10:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1721 crashed      @curiosity-arm  60s  2026-06-03 10:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1723 crashed      @curiosity-arm  60s  2026-06-03 10:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1725 crashed      @curiosity-arm  60s  2026-06-03 10:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1727 crashed      @curiosity-arm  60s  2026-06-03 10:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1729 crashed      @curiosity-arm  60s  2026-06-03 10:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1731 crashed      @curiosity-arm  60s  2026-06-03 10:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1733 crashed      @curiosity-arm  61s  2026-06-03 10:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1735 crashed      @curiosity-arm  60s  2026-06-03 10:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1737 crashed      @curiosity-arm  60s  2026-06-03 10:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1739 crashed      @curiosity-arm  60s  2026-06-03 10:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1741 crashed      @curiosity-arm  60s  2026-06-03 10:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1743 crashed      @curiosity-arm  60s  2026-06-03 11:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1745 crashed      @curiosity-arm  60s  2026-06-03 11:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1747 crashed      @curiosity-arm  60s  2026-06-03 11:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1749 crashed      @curiosity-arm  60s  2026-06-03 11:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1751 crashed      @curiosity-arm  60s  2026-06-03 11:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1753 crashed      @curiosity-arm  60s  2026-06-03 11:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1755 crashed      @curiosity-arm  60s  2026-06-03 11:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1757 crashed      @curiosity-arm  60s  2026-06-03 11:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1759 crashed      @curiosity-arm  60s  2026-06-03 11:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1761 crashed      @curiosity-arm  60s  2026-06-03 11:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1763 crashed      @curiosity-arm  60s  2026-06-03 11:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1765 crashed      @curiosity-arm  60s  2026-06-03 11:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1767 crashed      @curiosity-arm  60s  2026-06-03 11:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1769 crashed      @curiosity-arm  60s  2026-06-03 11:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1771 crashed      @curiosity-arm  60s  2026-06-03 11:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1773 crashed      @curiosity-arm  60s  2026-06-03 11:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1775 crashed      @curiosity-arm  60s  2026-06-03 11:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1777 crashed      @curiosity-arm  60s  2026-06-03 11:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1779 crashed      @curiosity-arm  60s  2026-06-03 11:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1781 crashed      @curiosity-arm  60s  2026-06-03 11:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1783 crashed      @curiosity-arm  60s  2026-06-03 11:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1785 crashed      @curiosity-arm  60s  2026-06-03 11:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1787 crashed      @curiosity-arm  60s  2026-06-03 11:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1789 crashed      @curiosity-arm  60s  2026-06-03 11:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1791 crashed      @curiosity-arm  60s  2026-06-03 11:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1793 crashed      @curiosity-arm  60s  2026-06-03 11:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1795 crashed      @curiosity-arm  60s  2026-06-03 11:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1797 crashed      @curiosity-arm  60s  2026-06-03 11:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1799 crashed      @curiosity-arm  60s  2026-06-03 11:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1801 crashed      @curiosity-arm  60s  2026-06-03 11:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1803 crashed      @curiosity-arm  60s  2026-06-03 11:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1805 crashed      @curiosity-arm  60s  2026-06-03 11:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1807 crashed      @curiosity-arm  60s  2026-06-03 11:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1809 crashed      @curiosity-arm  60s  2026-06-03 11:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1811 crashed      @curiosity-arm  60s  2026-06-03 11:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1813 crashed      @curiosity-arm  60s  2026-06-03 11:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1815 crashed      @curiosity-arm  60s  2026-06-03 11:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1817 crashed      @curiosity-arm  60s  2026-06-03 11:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1819 crashed      @curiosity-arm  60s  2026-06-03 11:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1821 crashed      @curiosity-arm  60s  2026-06-03 11:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1823 crashed      @curiosity-arm  60s  2026-06-03 11:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1825 crashed      @curiosity-arm  60s  2026-06-03 11:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1827 crashed      @curiosity-arm  60s  2026-06-03 11:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1829 crashed      @curiosity-arm  60s  2026-06-03 11:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1831 crashed      @curiosity-arm  60s  2026-06-03 11:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1833 crashed      @curiosity-arm  60s  2026-06-03 11:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1835 crashed      @curiosity-arm  60s  2026-06-03 11:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1837 crashed      @curiosity-arm  60s  2026-06-03 11:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1839 crashed      @curiosity-arm  60s  2026-06-03 11:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1841 crashed      @curiosity-arm  60s  2026-06-03 11:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1843 crashed      @curiosity-arm  60s  2026-06-03 11:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1845 crashed      @curiosity-arm  60s  2026-06-03 11:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1847 crashed      @curiosity-arm  60s  2026-06-03 11:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1849 crashed      @curiosity-arm  60s  2026-06-03 11:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1851 crashed      @curiosity-arm  60s  2026-06-03 11:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1853 crashed      @curiosity-arm  60s  2026-06-03 11:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1855 crashed      @curiosity-arm  60s  2026-06-03 11:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1857 crashed      @curiosity-arm  60s  2026-06-03 11:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1859 crashed      @curiosity-arm  60s  2026-06-03 11:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1861 crashed      @curiosity-arm  60s  2026-06-03 11:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1863 crashed      @curiosity-arm  60s  2026-06-03 12:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1865 crashed      @curiosity-arm  60s  2026-06-03 12:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1867 crashed      @curiosity-arm  60s  2026-06-03 12:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1869 crashed      @curiosity-arm  60s  2026-06-03 12:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1871 crashed      @curiosity-arm  60s  2026-06-03 12:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1873 crashed      @curiosity-arm  60s  2026-06-03 12:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1875 crashed      @curiosity-arm  60s  2026-06-03 12:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1877 crashed      @curiosity-arm  60s  2026-06-03 12:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1879 crashed      @curiosity-arm  60s  2026-06-03 12:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1881 crashed      @curiosity-arm  60s  2026-06-03 12:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1883 crashed      @curiosity-arm  60s  2026-06-03 12:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1885 crashed      @curiosity-arm  60s  2026-06-03 12:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1887 crashed      @curiosity-arm  60s  2026-06-03 12:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1889 crashed      @curiosity-arm  60s  2026-06-03 12:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1891 crashed      @curiosity-arm  60s  2026-06-03 12:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1893 crashed      @curiosity-arm  60s  2026-06-03 12:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1895 crashed      @curiosity-arm  60s  2026-06-03 12:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1897 crashed      @curiosity-arm  60s  2026-06-03 12:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1899 crashed      @curiosity-arm  60s  2026-06-03 12:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1901 crashed      @curiosity-arm  60s  2026-06-03 12:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1903 crashed      @curiosity-arm  60s  2026-06-03 12:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1905 crashed      @curiosity-arm  60s  2026-06-03 12:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1907 crashed      @curiosity-arm  60s  2026-06-03 12:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1909 crashed      @curiosity-arm  60s  2026-06-03 12:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1911 crashed      @curiosity-arm  60s  2026-06-03 12:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1913 crashed      @curiosity-arm  60s  2026-06-03 12:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1915 crashed      @curiosity-arm  60s  2026-06-03 12:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1917 crashed      @curiosity-arm  60s  2026-06-03 12:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1919 crashed      @curiosity-arm  60s  2026-06-03 12:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1921 crashed      @curiosity-arm  60s  2026-06-03 12:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1923 crashed      @curiosity-arm  60s  2026-06-03 12:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1925 crashed      @curiosity-arm  60s  2026-06-03 12:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1927 crashed      @curiosity-arm  61s  2026-06-03 12:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1929 crashed      @curiosity-arm  60s  2026-06-03 12:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1931 crashed      @curiosity-arm  60s  2026-06-03 12:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1933 crashed      @curiosity-arm  60s  2026-06-03 12:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1935 crashed      @curiosity-arm  60s  2026-06-03 12:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1937 crashed      @curiosity-arm  60s  2026-06-03 12:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1939 crashed      @curiosity-arm  60s  2026-06-03 12:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1941 crashed      @curiosity-arm  60s  2026-06-03 12:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1943 crashed      @curiosity-arm  60s  2026-06-03 12:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1945 crashed      @curiosity-arm  60s  2026-06-03 12:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1947 crashed      @curiosity-arm  60s  2026-06-03 12:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1949 crashed      @curiosity-arm  60s  2026-06-03 12:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1951 crashed      @curiosity-arm  60s  2026-06-03 12:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1953 crashed      @curiosity-arm  60s  2026-06-03 12:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1955 crashed      @curiosity-arm  60s  2026-06-03 12:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1957 crashed      @curiosity-arm  60s  2026-06-03 12:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1959 crashed      @curiosity-arm  60s  2026-06-03 12:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1961 crashed      @curiosity-arm  60s  2026-06-03 12:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1963 crashed      @curiosity-arm  61s  2026-06-03 12:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1965 crashed      @curiosity-arm  60s  2026-06-03 12:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1967 crashed      @curiosity-arm  60s  2026-06-03 12:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1969 crashed      @curiosity-arm  60s  2026-06-03 12:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1971 crashed      @curiosity-arm  60s  2026-06-03 12:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1973 crashed      @curiosity-arm  60s  2026-06-03 12:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1975 crashed      @curiosity-arm  60s  2026-06-03 12:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1977 crashed      @curiosity-arm  60s  2026-06-03 12:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1979 crashed      @curiosity-arm  60s  2026-06-03 12:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1981 crashed      @curiosity-arm  60s  2026-06-03 12:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1983 crashed      @curiosity-arm  60s  2026-06-03 13:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1985 crashed      @curiosity-arm  60s  2026-06-03 13:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1987 crashed      @curiosity-arm  60s  2026-06-03 13:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1989 crashed      @curiosity-arm  60s  2026-06-03 13:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1991 crashed      @curiosity-arm  60s  2026-06-03 13:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1993 crashed      @curiosity-arm  60s  2026-06-03 13:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1995 crashed      @curiosity-arm  61s  2026-06-03 13:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1997 crashed      @curiosity-arm  60s  2026-06-03 13:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #1999 crashed      @curiosity-arm  60s  2026-06-03 13:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2001 crashed      @curiosity-arm  60s  2026-06-03 13:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2003 crashed      @curiosity-arm  60s  2026-06-03 13:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2005 crashed      @curiosity-arm  60s  2026-06-03 13:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2007 crashed      @curiosity-arm  60s  2026-06-03 13:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2009 crashed      @curiosity-arm  60s  2026-06-03 13:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2011 crashed      @curiosity-arm  60s  2026-06-03 13:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2013 crashed      @curiosity-arm  60s  2026-06-03 13:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2015 crashed      @curiosity-arm  60s  2026-06-03 13:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2017 crashed      @curiosity-arm  60s  2026-06-03 13:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2019 crashed      @curiosity-arm  60s  2026-06-03 13:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2021 crashed      @curiosity-arm  60s  2026-06-03 13:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2023 crashed      @curiosity-arm  60s  2026-06-03 13:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2025 crashed      @curiosity-arm  60s  2026-06-03 13:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2027 crashed      @curiosity-arm  60s  2026-06-03 13:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2029 crashed      @curiosity-arm  60s  2026-06-03 13:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2031 crashed      @curiosity-arm  60s  2026-06-03 13:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2033 crashed      @curiosity-arm  60s  2026-06-03 13:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2035 crashed      @curiosity-arm  60s  2026-06-03 13:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2037 crashed      @curiosity-arm  60s  2026-06-03 13:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2039 crashed      @curiosity-arm  60s  2026-06-03 13:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2041 crashed      @curiosity-arm  60s  2026-06-03 13:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2043 crashed      @curiosity-arm  60s  2026-06-03 13:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2045 crashed      @curiosity-arm  60s  2026-06-03 13:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2047 crashed      @curiosity-arm  60s  2026-06-03 13:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2049 crashed      @curiosity-arm  60s  2026-06-03 13:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2051 crashed      @curiosity-arm  60s  2026-06-03 13:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2053 crashed      @curiosity-arm  60s  2026-06-03 13:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2055 crashed      @curiosity-arm  60s  2026-06-03 13:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2057 crashed      @curiosity-arm  60s  2026-06-03 13:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2059 crashed      @curiosity-arm  61s  2026-06-03 13:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2061 crashed      @curiosity-arm  60s  2026-06-03 13:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2063 crashed      @curiosity-arm  60s  2026-06-03 13:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2065 crashed      @curiosity-arm  60s  2026-06-03 13:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2067 crashed      @curiosity-arm  60s  2026-06-03 13:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2069 crashed      @curiosity-arm  60s  2026-06-03 13:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2071 crashed      @curiosity-arm  60s  2026-06-03 13:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2073 crashed      @curiosity-arm  60s  2026-06-03 13:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2075 crashed      @curiosity-arm  60s  2026-06-03 13:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2077 crashed      @curiosity-arm  60s  2026-06-03 13:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2079 crashed      @curiosity-arm  60s  2026-06-03 13:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2081 crashed      @curiosity-arm  60s  2026-06-03 13:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2083 crashed      @curiosity-arm  60s  2026-06-03 13:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2085 crashed      @curiosity-arm  60s  2026-06-03 13:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2087 crashed      @curiosity-arm  60s  2026-06-03 13:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2089 crashed      @curiosity-arm  60s  2026-06-03 13:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2091 crashed      @curiosity-arm  60s  2026-06-03 13:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2093 crashed      @curiosity-arm  60s  2026-06-03 13:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2095 crashed      @curiosity-arm  60s  2026-06-03 13:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2097 crashed      @curiosity-arm  60s  2026-06-03 13:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2099 crashed      @curiosity-arm  61s  2026-06-03 13:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2101 crashed      @curiosity-arm  60s  2026-06-03 13:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2103 crashed      @curiosity-arm  60s  2026-06-03 14:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2105 crashed      @curiosity-arm  60s  2026-06-03 14:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2107 crashed      @curiosity-arm  60s  2026-06-03 14:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2109 crashed      @curiosity-arm  60s  2026-06-03 14:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2111 crashed      @curiosity-arm  60s  2026-06-03 14:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2113 crashed      @curiosity-arm  60s  2026-06-03 14:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2115 crashed      @curiosity-arm  60s  2026-06-03 14:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2117 crashed      @curiosity-arm  60s  2026-06-03 14:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2119 crashed      @curiosity-arm  60s  2026-06-03 14:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2121 crashed      @curiosity-arm  60s  2026-06-03 14:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2123 crashed      @curiosity-arm  60s  2026-06-03 14:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2125 crashed      @curiosity-arm  60s  2026-06-03 14:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2127 crashed      @curiosity-arm  60s  2026-06-03 14:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2129 crashed      @curiosity-arm  60s  2026-06-03 14:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2131 crashed      @curiosity-arm  60s  2026-06-03 14:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2133 crashed      @curiosity-arm  60s  2026-06-03 14:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2135 crashed      @curiosity-arm  60s  2026-06-03 14:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2137 crashed      @curiosity-arm  60s  2026-06-03 14:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2139 crashed      @curiosity-arm  60s  2026-06-03 14:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2141 crashed      @curiosity-arm  60s  2026-06-03 14:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2143 crashed      @curiosity-arm  60s  2026-06-03 14:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2145 crashed      @curiosity-arm  61s  2026-06-03 14:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2147 crashed      @curiosity-arm  60s  2026-06-03 14:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2149 crashed      @curiosity-arm  60s  2026-06-03 14:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2151 crashed      @curiosity-arm  60s  2026-06-03 14:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2153 crashed      @curiosity-arm  60s  2026-06-03 14:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2155 crashed      @curiosity-arm  60s  2026-06-03 14:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2157 crashed      @curiosity-arm  60s  2026-06-03 14:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2159 crashed      @curiosity-arm  60s  2026-06-03 14:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2161 crashed      @curiosity-arm  60s  2026-06-03 14:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2163 crashed      @curiosity-arm  60s  2026-06-03 14:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2165 crashed      @curiosity-arm  60s  2026-06-03 14:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2167 crashed      @curiosity-arm  60s  2026-06-03 14:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2169 crashed      @curiosity-arm  60s  2026-06-03 14:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2171 crashed      @curiosity-arm  60s  2026-06-03 14:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2173 crashed      @curiosity-arm  60s  2026-06-03 14:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2175 crashed      @curiosity-arm  60s  2026-06-03 14:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2177 crashed      @curiosity-arm  60s  2026-06-03 14:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2179 crashed      @curiosity-arm  60s  2026-06-03 14:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2181 crashed      @curiosity-arm  60s  2026-06-03 14:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2183 crashed      @curiosity-arm  60s  2026-06-03 14:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2185 crashed      @curiosity-arm  60s  2026-06-03 14:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2187 crashed      @curiosity-arm  60s  2026-06-03 14:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2189 crashed      @curiosity-arm  60s  2026-06-03 14:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2191 crashed      @curiosity-arm  60s  2026-06-03 14:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2193 crashed      @curiosity-arm  60s  2026-06-03 14:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2195 crashed      @curiosity-arm  60s  2026-06-03 14:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2197 crashed      @curiosity-arm  60s  2026-06-03 14:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2199 crashed      @curiosity-arm  60s  2026-06-03 14:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2201 crashed      @curiosity-arm  60s  2026-06-03 14:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2203 crashed      @curiosity-arm  60s  2026-06-03 14:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2205 crashed      @curiosity-arm  60s  2026-06-03 14:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2207 crashed      @curiosity-arm  60s  2026-06-03 14:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2209 crashed      @curiosity-arm  60s  2026-06-03 14:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2211 crashed      @curiosity-arm  60s  2026-06-03 14:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2213 crashed      @curiosity-arm  60s  2026-06-03 14:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2215 crashed      @curiosity-arm  60s  2026-06-03 14:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2217 crashed      @curiosity-arm  60s  2026-06-03 14:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2219 crashed      @curiosity-arm  60s  2026-06-03 14:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2221 crashed      @curiosity-arm  60s  2026-06-03 14:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2223 crashed      @curiosity-arm  60s  2026-06-03 15:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2225 crashed      @curiosity-arm  60s  2026-06-03 15:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2227 crashed      @curiosity-arm  60s  2026-06-03 15:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2229 crashed      @curiosity-arm  61s  2026-06-03 15:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2231 crashed      @curiosity-arm  60s  2026-06-03 15:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2233 crashed      @curiosity-arm  60s  2026-06-03 15:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2235 crashed      @curiosity-arm  60s  2026-06-03 15:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2237 crashed      @curiosity-arm  60s  2026-06-03 15:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2239 crashed      @curiosity-arm  60s  2026-06-03 15:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2241 crashed      @curiosity-arm  60s  2026-06-03 15:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2243 crashed      @curiosity-arm  60s  2026-06-03 15:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2245 crashed      @curiosity-arm  60s  2026-06-03 15:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2247 crashed      @curiosity-arm  60s  2026-06-03 15:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2249 crashed      @curiosity-arm  60s  2026-06-03 15:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2251 crashed      @curiosity-arm  60s  2026-06-03 15:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2253 crashed      @curiosity-arm  60s  2026-06-03 15:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2255 crashed      @curiosity-arm  60s  2026-06-03 15:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2257 crashed      @curiosity-arm  60s  2026-06-03 15:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2259 crashed      @curiosity-arm  60s  2026-06-03 15:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2261 crashed      @curiosity-arm  60s  2026-06-03 15:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2263 crashed      @curiosity-arm  60s  2026-06-03 15:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2265 crashed      @curiosity-arm  60s  2026-06-03 15:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2267 crashed      @curiosity-arm  60s  2026-06-03 15:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2269 crashed      @curiosity-arm  60s  2026-06-03 15:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2271 crashed      @curiosity-arm  60s  2026-06-03 15:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2273 crashed      @curiosity-arm  60s  2026-06-03 15:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2275 crashed      @curiosity-arm  60s  2026-06-03 15:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2277 crashed      @curiosity-arm  61s  2026-06-03 15:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2279 crashed      @curiosity-arm  60s  2026-06-03 15:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2281 crashed      @curiosity-arm  60s  2026-06-03 15:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2283 crashed      @curiosity-arm  60s  2026-06-03 15:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2285 crashed      @curiosity-arm  60s  2026-06-03 15:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2287 crashed      @curiosity-arm  60s  2026-06-03 15:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2289 crashed      @curiosity-arm  60s  2026-06-03 15:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2291 crashed      @curiosity-arm  60s  2026-06-03 15:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2293 crashed      @curiosity-arm  60s  2026-06-03 15:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2295 crashed      @curiosity-arm  60s  2026-06-03 15:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2297 crashed      @curiosity-arm  60s  2026-06-03 15:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2299 crashed      @curiosity-arm  60s  2026-06-03 15:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2301 crashed      @curiosity-arm  60s  2026-06-03 15:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2303 crashed      @curiosity-arm  60s  2026-06-03 15:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2305 crashed      @curiosity-arm  60s  2026-06-03 15:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2307 crashed      @curiosity-arm  60s  2026-06-03 15:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2309 crashed      @curiosity-arm  60s  2026-06-03 15:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2311 crashed      @curiosity-arm  60s  2026-06-03 15:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2313 crashed      @curiosity-arm  60s  2026-06-03 15:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2315 crashed      @curiosity-arm  60s  2026-06-03 15:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2317 crashed      @curiosity-arm  60s  2026-06-03 15:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2319 crashed      @curiosity-arm  60s  2026-06-03 15:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2321 crashed      @curiosity-arm  60s  2026-06-03 15:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2323 crashed      @curiosity-arm  60s  2026-06-03 15:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2325 crashed      @curiosity-arm  60s  2026-06-03 15:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2327 crashed      @curiosity-arm  60s  2026-06-03 15:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2329 crashed      @curiosity-arm  60s  2026-06-03 15:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2331 crashed      @curiosity-arm  60s  2026-06-03 15:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2333 crashed      @curiosity-arm  60s  2026-06-03 15:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2335 crashed      @curiosity-arm  60s  2026-06-03 15:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2337 crashed      @curiosity-arm  60s  2026-06-03 15:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2339 crashed      @curiosity-arm  60s  2026-06-03 15:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2341 crashed      @curiosity-arm  60s  2026-06-03 15:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2343 crashed      @curiosity-arm  60s  2026-06-03 16:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2345 crashed      @curiosity-arm  60s  2026-06-03 16:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2347 crashed      @curiosity-arm  60s  2026-06-03 16:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2349 crashed      @curiosity-arm  60s  2026-06-03 16:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2351 crashed      @curiosity-arm  60s  2026-06-03 16:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2353 crashed      @curiosity-arm  61s  2026-06-03 16:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2355 crashed      @curiosity-arm  60s  2026-06-03 16:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2357 crashed      @curiosity-arm  60s  2026-06-03 16:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2359 crashed      @curiosity-arm  60s  2026-06-03 16:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2361 crashed      @curiosity-arm  60s  2026-06-03 16:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2363 crashed      @curiosity-arm  60s  2026-06-03 16:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2365 crashed      @curiosity-arm  60s  2026-06-03 16:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2367 crashed      @curiosity-arm  60s  2026-06-03 16:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2369 crashed      @curiosity-arm  60s  2026-06-03 16:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2371 crashed      @curiosity-arm  60s  2026-06-03 16:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2373 crashed      @curiosity-arm  60s  2026-06-03 16:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2375 crashed      @curiosity-arm  60s  2026-06-03 16:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2377 crashed      @curiosity-arm  60s  2026-06-03 16:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2379 crashed      @curiosity-arm  60s  2026-06-03 16:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2381 crashed      @curiosity-arm  60s  2026-06-03 16:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2383 crashed      @curiosity-arm  60s  2026-06-03 16:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2385 crashed      @curiosity-arm  60s  2026-06-03 16:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2387 crashed      @curiosity-arm  60s  2026-06-03 16:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2389 crashed      @curiosity-arm  60s  2026-06-03 16:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2391 crashed      @curiosity-arm  60s  2026-06-03 16:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2393 crashed      @curiosity-arm  60s  2026-06-03 16:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2395 crashed      @curiosity-arm  61s  2026-06-03 16:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2397 crashed      @curiosity-arm  60s  2026-06-03 16:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2399 reclaimed    @curiosity-arm  20s  2026-06-03 16:28
        ! manual_reclaim lock=srv1704173:168581
  #2401 crashed      @curiosity-arm  60s  2026-06-03 16:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2403 crashed      @curiosity-arm  60s  2026-06-03 16:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2405 crashed      @curiosity-arm  60s  2026-06-03 16:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2408 crashed      @curiosity-arm  38s  2026-06-03 16:32
        ! pid 438498 not alive
  #2409 crashed      @curiosity-arm  60s  2026-06-03 16:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2410 crashed      @curiosity-arm  60s  2026-06-03 16:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2411 crashed      @curiosity-arm  60s  2026-06-03 16:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2412 crashed      @curiosity-arm  60s  2026-06-03 16:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2413 crashed      @curiosity-arm  60s  2026-06-03 16:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2414 crashed      @curiosity-arm  60s  2026-06-03 16:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2415 crashed      @curiosity-arm  60s  2026-06-03 16:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2416 crashed      @curiosity-arm  60s  2026-06-03 16:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2417 crashed      @curiosity-arm  60s  2026-06-03 16:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2418 crashed      @curiosity-arm  60s  2026-06-03 16:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2419 crashed      @curiosity-arm  60s  2026-06-03 16:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2420 crashed      @curiosity-arm  60s  2026-06-03 16:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2421 crashed      @curiosity-arm  60s  2026-06-03 16:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2422 crashed      @curiosity-arm  60s  2026-06-03 16:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2423 crashed      @curiosity-arm  61s  2026-06-03 16:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2424 crashed      @curiosity-arm  60s  2026-06-03 16:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2426 crashed      @curiosity-arm  60s  2026-06-03 16:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2428 crashed      @curiosity-arm  60s  2026-06-03 16:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2430 crashed      @curiosity-arm  60s  2026-06-03 16:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2432 crashed      @curiosity-arm  60s  2026-06-03 16:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2434 crashed      @curiosity-arm  60s  2026-06-03 16:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2436 crashed      @curiosity-arm  60s  2026-06-03 16:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2438 crashed      @curiosity-arm  60s  2026-06-03 16:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2440 crashed      @curiosity-arm  60s  2026-06-03 16:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2442 crashed      @curiosity-arm  60s  2026-06-03 16:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2444 crashed      @curiosity-arm  60s  2026-06-03 16:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2446 crashed      @curiosity-arm  60s  2026-06-03 16:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2448 crashed      @curiosity-arm  60s  2026-06-03 17:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2450 crashed      @curiosity-arm  60s  2026-06-03 17:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2452 crashed      @curiosity-arm  60s  2026-06-03 17:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2454 crashed      @curiosity-arm  60s  2026-06-03 17:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2456 crashed      @curiosity-arm  60s  2026-06-03 17:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2458 crashed      @curiosity-arm  60s  2026-06-03 17:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2460 crashed      @curiosity-arm  60s  2026-06-03 17:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2462 crashed      @curiosity-arm  60s  2026-06-03 17:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2464 crashed      @curiosity-arm  60s  2026-06-03 17:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2466 crashed      @curiosity-arm  60s  2026-06-03 17:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2468 crashed      @curiosity-arm  60s  2026-06-03 17:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2470 crashed      @curiosity-arm  60s  2026-06-03 17:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2472 crashed      @curiosity-arm  60s  2026-06-03 17:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2474 crashed      @curiosity-arm  60s  2026-06-03 17:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2476 crashed      @curiosity-arm  60s  2026-06-03 17:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2478 crashed      @curiosity-arm  60s  2026-06-03 17:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2480 crashed      @curiosity-arm  60s  2026-06-03 17:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2482 crashed      @curiosity-arm  60s  2026-06-03 17:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2484 crashed      @curiosity-arm  60s  2026-06-03 17:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2486 crashed      @curiosity-arm  60s  2026-06-03 17:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2488 crashed      @curiosity-arm  60s  2026-06-03 17:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2490 crashed      @curiosity-arm  60s  2026-06-03 17:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2492 crashed      @curiosity-arm  60s  2026-06-03 17:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2494 crashed      @curiosity-arm  60s  2026-06-03 17:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2496 crashed      @curiosity-arm  60s  2026-06-03 17:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2498 crashed      @curiosity-arm  61s  2026-06-03 17:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2500 crashed      @curiosity-arm  60s  2026-06-03 17:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2502 crashed      @curiosity-arm  60s  2026-06-03 17:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2504 crashed      @curiosity-arm  60s  2026-06-03 17:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2506 crashed      @curiosity-arm  60s  2026-06-03 17:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2508 crashed      @curiosity-arm  60s  2026-06-03 17:30
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2510 crashed      @curiosity-arm  60s  2026-06-03 17:31
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2512 crashed      @curiosity-arm  60s  2026-06-03 17:32
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2514 crashed      @curiosity-arm  60s  2026-06-03 17:33
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2516 crashed      @curiosity-arm  60s  2026-06-03 17:34
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2518 crashed      @curiosity-arm  60s  2026-06-03 17:35
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2520 crashed      @curiosity-arm  60s  2026-06-03 17:36
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2522 crashed      @curiosity-arm  60s  2026-06-03 17:37
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2524 crashed      @curiosity-arm  60s  2026-06-03 17:38
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2526 crashed      @curiosity-arm  60s  2026-06-03 17:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2528 crashed      @curiosity-arm  60s  2026-06-03 17:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2530 crashed      @curiosity-arm  60s  2026-06-03 17:41
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2532 crashed      @curiosity-arm  60s  2026-06-03 17:42
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2534 crashed      @curiosity-arm  60s  2026-06-03 17:43
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2536 crashed      @curiosity-arm  60s  2026-06-03 17:44
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2538 crashed      @curiosity-arm  60s  2026-06-03 17:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2540 crashed      @curiosity-arm  60s  2026-06-03 17:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2542 crashed      @curiosity-arm  60s  2026-06-03 17:47
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2544 crashed      @curiosity-arm  60s  2026-06-03 17:48
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2546 crashed      @curiosity-arm  60s  2026-06-03 17:49
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2548 crashed      @curiosity-arm  60s  2026-06-03 17:50
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2550 crashed      @curiosity-arm  60s  2026-06-03 17:51
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2552 crashed      @curiosity-arm  60s  2026-06-03 17:52
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2554 crashed      @curiosity-arm  60s  2026-06-03 17:53
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2556 crashed      @curiosity-arm  60s  2026-06-03 17:54
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2558 crashed      @curiosity-arm  60s  2026-06-03 17:55
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2560 crashed      @curiosity-arm  60s  2026-06-03 17:56
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2562 crashed      @curiosity-arm  60s  2026-06-03 17:57
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2564 crashed      @curiosity-arm  60s  2026-06-03 17:58
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2566 crashed      @curiosity-arm  60s  2026-06-03 17:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2568 crashed      @curiosity-arm  60s  2026-06-03 18:00
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2570 crashed      @curiosity-arm  60s  2026-06-03 18:01
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2572 crashed      @curiosity-arm  60s  2026-06-03 18:02
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2574 crashed      @curiosity-arm  60s  2026-06-03 18:03
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2576 crashed      @curiosity-arm  60s  2026-06-03 18:04
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2578 crashed      @curiosity-arm  60s  2026-06-03 18:05
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2580 crashed      @curiosity-arm  60s  2026-06-03 18:06
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2582 crashed      @curiosity-arm  60s  2026-06-03 18:07
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2584 crashed      @curiosity-arm  60s  2026-06-03 18:08
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2586 crashed      @curiosity-arm  60s  2026-06-03 18:09
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2588 crashed      @curiosity-arm  60s  2026-06-03 18:10
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2590 crashed      @curiosity-arm  60s  2026-06-03 18:11
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2592 crashed      @curiosity-arm  60s  2026-06-03 18:12
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2594 crashed      @curiosity-arm  60s  2026-06-03 18:13
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2596 crashed      @curiosity-arm  60s  2026-06-03 18:14
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2598 crashed      @curiosity-arm  60s  2026-06-03 18:15
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2600 crashed      @curiosity-arm  60s  2026-06-03 18:16
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2602 crashed      @curiosity-arm  60s  2026-06-03 18:17
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2604 crashed      @curiosity-arm  60s  2026-06-03 18:18
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2606 crashed      @curiosity-arm  60s  2026-06-03 18:19
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2608 crashed      @curiosity-arm  60s  2026-06-03 18:20
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2610 crashed      @curiosity-arm  60s  2026-06-03 18:21
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2612 crashed      @curiosity-arm  60s  2026-06-03 18:22
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2614 crashed      @curiosity-arm  60s  2026-06-03 18:23
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2616 crashed      @curiosity-arm  60s  2026-06-03 18:24
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2618 crashed      @curiosity-arm  60s  2026-06-03 18:25
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2620 crashed      @curiosity-arm  60s  2026-06-03 18:26
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2622 crashed      @curiosity-arm  60s  2026-06-03 18:27
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2624 crashed      @curiosity-arm  60s  2026-06-03 18:28
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2626 crashed      @curiosity-arm  60s  2026-06-03 18:29
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2628 crashed      @curiosity-arm  35s  2026-06-03 18:30
        ! pid 474873 not alive
  #2630 crashed      @curiosity-arm  517s  2026-06-03 18:31
        ! pid 475064 not alive
  #2634 crashed      @curiosity-arm  30s  2026-06-03 18:39
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2635 crashed      @curiosity-arm  30s  2026-06-03 18:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2638 crashed      @curiosity-arm  30s  2026-06-03 18:40
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2641 crashed      @curiosity-arm  245s  2026-06-03 18:41
        ! pid 479296 not alive
  #2643 crashed      @curiosity-arm  61s  2026-06-03 18:45
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #2648 completed    @curiosity-arm  841s  2026-06-03 18:46
        → Completed research on octopus distributed cognition: analyzed 4 primary arXiv papers on octopus arm neuromuscular control, sensorimotor systems, bend propagatio

## Status
Auto-extracted from kanban_complete · 2026-06-02 · worker did not write file · text-only brief
