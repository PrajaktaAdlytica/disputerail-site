// Local event adapter: no external analytics provider is connected.
// Actual lead/consent/qualification events belong to a future confirmed server receipt.
const allowed=new Set(['landing_view','offer_20_selected','demo_open','evidence_view','override_view','price_view','inquiry_draft_created']);
const observed=new Set();
const sources=new Set(['linkedin','cuso','integrator','consultant','bank_ops','direct']);
const campaigns=new Set(['concept20','reg-e-replay','supervised-pilot']);
export function track(event,props={}){
 if(!allowed.has(event))return;
 if(['landing_view','price_view'].includes(event)){if(observed.has(event))return;observed.add(event)}
 const safe=Object.fromEntries(Object.entries(props).filter(([key])=>['selected_offer_id','placement','entry_point','fixture_version','evidence_type','override_type','price_variant_id','hypothesis','demo'].includes(key)));
 const params=new URLSearchParams(location.search);const source=params.get('utm_source');const campaign=params.get('utm_campaign');
 safe.utm_source=source?(sources.has(source)?source:'other'):'direct';
 safe.utm_campaign=campaign?(campaigns.has(campaign)?campaign:'other'):'none';
 window.dispatchEvent(new CustomEvent('disputerail:analytics',{detail:{event,properties:safe}}));
}
