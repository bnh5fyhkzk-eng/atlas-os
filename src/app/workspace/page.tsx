// /workspace · brother + Atlas chat-stream with arms
// Per brother direct VERBATIM 2026-06-07 23:13 EDT · "should it be like chathing with you in terminal where we see what each arms are doing"
// Backend · Mac mini atlas-api at atlas-api.upliftai.app · /public/arms + /public/dispatch + /public/feed + /public/chat
// Per #27083 BUILD-ON-TOP existing atlas-api (was disabled · revived as Atlas-self substrate)

import WorkspaceChatClient from "./WorkspaceChatClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Workspace · brother + Atlas + arms" };

export default function WorkspacePage() {
  return <WorkspaceChatClient />;
}
