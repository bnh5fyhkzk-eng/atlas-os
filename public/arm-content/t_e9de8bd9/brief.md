# C1 · Cal.com OSS white-label architecture · subdomain routing · multi-tenant Postgres patterns · cite repo + 2026 forks

## Brief



## Worker Summary

Researched Cal.com OSS white-label architecture, subdomain routing, and multi-tenant Postgres patterns. Found that subdomain routing is handled via Next.js rewrites (apps/web/next.config.ts) using organization slugs. Multi-tenancy is implemented via Team (organization) model in Prisma schema with data scoped by teamId/userId. White-labeling features (custom logos, colors) are part of Organizations functionality. The repository (cal.com) has 13,861 forks as of 2026.

Events (15):
  [2026-06-03 16:46] created {'assignee': 'charle-arm', 'status': 'ready', 'parents': [], 'tenant': None, 'branch_name': None, 'skills': None}
  [2026-06-03 16:46] [run 48] claimed {'lock': 'srv1704173:437226', 'expires': 1780506113, 'run_id': 48}
  [2026-06-03 16:46] [run 48] spawned {'pid': 441829}
  [2026-06-03 16:59] [run 48] protocol_violation {'pid': 441829, 'claimer': 'srv1704173:437226', 'exit_code': 0}
  [2026-06-03 16:59] gave_up {'failures': 1, 'effective_limit': 1, 'limit_source': 'dispatcher', 'error': 'worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation', 'trigger_outcome': 'crashed', 'pid': 441829, 'claimer': 'srv1704173:437226'}
  [2026-06-03 16:59] promoted
  [2026-06-03 16:59] [run 56] claimed {'lock': 'srv1704173:437226', 'expires': 1780506893, 'run_id': 56}
  [2026-06-03 16:59] [run 56] spawned {'pid': 445931}
  [2026-06-03 17:00] [run 56] protocol_violation {'pid': 445931, 'claimer': 'srv1704173:437226', 'exit_code': 0}
  [2026-06-03 17:00] gave_up {'failures': 1, 'effective_limit': 1, 'limit_source': 'dispatcher', 'error': 'worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation', 'trigger_outcome': 'crashed', 'pid': 445931, 'claimer': 'srv1704173:437226'}
  [2026-06-03 17:00] promoted
  [2026-06-03 17:00] [run 59] claimed {'lock': 'srv1704173:437226', 'expires': 1780506954, 'run_id': 59}
  [2026-06-03 17:00] [run 59] spawned {'pid': 446519}
  [2026-06-03 17:16] [run 59] claim_extended {'reason': 'pid_alive', 'worker_pid': 446519, 'claim_lock': 'srv1704173:437226', 'claim_expires_was': 1780506954, 'claim_expires_now': 1780507914, 'last_heartbeat_at': None}
  [2026-06-03 17:30] [run 59] completed {'result_len': 0, 'summary': 'Researched Cal.com OSS white-label architecture, subdomain routing, and multi-tenant Postgres patterns. Found that subdomain routing is handled via Next.js rewrites (apps/web/next.config.ts) using organization slugs. Multi-tenancy is implemented via Team (organization) model in Prisma schema with data scoped by teamId/userId. White-labeling features (custom logos, colors) are part of Organizations'}

Runs (3):
  #48  crashed      @charle-arm  780s  2026-06-03 16:46
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #56  crashed      @charle-arm  61s  2026-06-03 16:59
        ! worker exited cleanly (rc=0) without calling kanban_complete or kanban_block — protocol violation
  #59  completed    @charle-arm  1802s  2026-06-03 17:00
        → Researched Cal.com OSS white-label architecture, subdomain routing, and multi-tenant Postgres patterns. Found that subdomain routing is handled via Next.js rewr

## Status
Auto-extracted from kanban_complete · 2026-06-02 · worker did not write file · text-only brief
