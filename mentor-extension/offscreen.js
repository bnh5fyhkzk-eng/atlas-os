let rec, chunks=[], clientName='Call';
chrome.runtime.onMessage.addListener(async(msg)=>{
  if(msg.type==='start-record'){
    clientName=msg.client||'Call';
    const stream=await navigator.mediaDevices.getUserMedia({audio:{mandatory:{chromeMediaSource:'tab',chromeMediaSourceId:msg.streamId}}});
    // keep tab audio audible to the user
    const ctx=new AudioContext(); ctx.createMediaStreamSource(stream).connect(ctx.destination);
    chunks=[]; rec=new MediaRecorder(stream,{mimeType:'audio/webm'});
    rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
    rec.start();
  }
  if(msg.type==='stop-record' && rec){
    rec.onstop=async()=>{
      const blob=new Blob(chunks,{type:'audio/webm'});
      // server URL is configurable (localhost for local engine, or the hosted upliftai URL) + optional account token
      const cfg=await chrome.storage.local.get(['serverUrl','token']);
      const base=cfg.serverUrl||'http://localhost:8077';
      const auth=cfg.token?('&token='+encodeURIComponent(cfg.token)):'';
      try{
        const r=await fetch(base+'/report?name=meeting.webm&client='+encodeURIComponent(clientName)+auth,{method:'POST',body:blob});
        const url=r.headers.get('X-Report-Url');
        if(url) chrome.runtime.sendMessage({type:'report-url',url});
      }catch(e){ console.error('mentor post failed',e); }
    };
    rec.stop(); rec.stream.getTracks().forEach(t=>t.stop());
  }
});
