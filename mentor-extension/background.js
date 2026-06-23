let creating;
async function ensureOffscreen(){
  if(await chrome.offscreen.hasDocument?.()) return;
  if(creating) { await creating; return; }
  creating = chrome.offscreen.createDocument({url:'offscreen.html',reasons:['USER_MEDIA'],justification:'Record meeting tab audio for on-device coaching.'});
  await creating; creating=null;
}
chrome.runtime.onMessage.addListener((msg,sender,reply)=>{
  if(msg.action==='start'){
    chrome.tabs.query({active:true,currentWindow:true},async(tabs)=>{
      const tab=tabs[0]; if(!tab){reply({ok:false,error:'no tab'});return;}
      chrome.tabCapture.getMediaStreamId({targetTabId:tab.id},async(streamId)=>{
        if(chrome.runtime.lastError||!streamId){reply({ok:false,error:(chrome.runtime.lastError||{}).message||'capture denied'});return;}
        await ensureOffscreen();
        const client=(tab.title||'Call').replace(/ [-–|].*$/,'').replace(/zoom|meet|google meet|teams/ig,'').trim()||'Call';
        chrome.runtime.sendMessage({type:'start-record',streamId,client});
        chrome.storage.local.set({recording:true,client});
        reply({ok:true});
      });
    });
    return true;
  }
  if(msg.action==='stop'){ chrome.runtime.sendMessage({type:'stop-record'}); chrome.storage.local.set({recording:false}); reply({ok:true}); return true; }
  if(msg.type==='report-url'){ chrome.storage.local.get(['serverUrl'],c=>chrome.tabs.create({url:(c.serverUrl||'http://localhost:8077')+msg.url})); }
});
