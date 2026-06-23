const start=document.getElementById('start'),stop=document.getElementById('stop'),s=document.getElementById('s');
chrome.storage.local.get('recording',d=>{ if(d.recording){start.style.display='none';stop.style.display='block';s.textContent='Recording the call…';} });
start.onclick=async()=>{ chrome.runtime.sendMessage({action:'start'},r=>{ if(r&&r.ok){start.style.display='none';stop.style.display='block';s.textContent='Recording the call…';}else{s.textContent='Error: '+(r&&r.error||'no tab');} }); };
stop.onclick=()=>{ s.textContent='Analyzing on-device…'; chrome.runtime.sendMessage({action:'stop'},r=>{ stop.style.display='none';start.style.display='block'; s.textContent=r&&r.ok?'Report opening…':'Error: '+(r&&r.error||'fail'); }); };
