(function(C,t,I,l,N,D,T,m,R){"use strict";const{FormRow:M,FormSwitch:B,FormSwitchRow:G,FormSection:V,FormDivider:b,FormInput:O}=D.Forms,{ScrollView:k,View:h,Text:u}=D.General,o=t.stylesheet.createThemedStyleSheet({text:{color:T.semanticColors.HEADER_SECONDARY,paddingLeft:"5.5%",paddingRight:10,marginBottom:10,letterSpacing:.25,fontFamily:t.constants.Fonts.PRIMARY_BOLD,fontSize:16},subText:{color:T.semanticColors.TEXT_POSITIVE,paddingLeft:"6%",paddingRight:10,marginBottom:10,letterSpacing:.25,fontFamily:t.constants.Fonts.DISPLAY_NORMAL,fontSize:12}});let S=function(e){return e.toUpperCase()},F=[{id:"deletedMessageColor",title:"Customize Deleted Message Color ( DO NOT INCLUDE # )",type:"default",placeholder:"E40303"},{id:"deletedMessage",title:"Customize Deleted Message",type:"default",placeholder:"This message is deleted"},{id:"editedMessage",title:"Customize Edited Separator",type:"default",placeholder:"`[ EDITED ]`"},{id:"deletedMessageColorBackground",title:"Customize Deleted Background Message Color ( DO NOT INCLUDE # )",type:"default",placeholder:"FF2C2F"}];const v=[{id:"useBackgroundColor",default:!1,label:"Enable Background Color",subLabel:"Background Color for Deleted Message, similiar to Mention but Customizeable"}];let L=[{version:"v0.0.8",patch:["Added Customizeable Text Color for Deleted Messages.","Changed Deleted Message Patch to use Discord Built-in.","Removed Option to use DELETED, NormalEphemeral, DefaultAutomodEphemeral","Removed Ephemeral Custom Settings.","Removed Ephemeral Patch."]}];function P(){return I.useProxy(l.storage),t.React.createElement(k,null,t.React.createElement(h,{style:{marginTop:20}},t.React.createElement(h,{style:{marginTop:10}},t.React.createElement(u,{style:[o.text,o.optionText]},S("Customize")),t.React.createElement(h,{style:[o.subText]},F.map(function(e,s){return t.React.createElement(t.React.Fragment,null,t.React.createElement(O,{title:e.title,keyboardType:e.type,placeholder:e.placeholder,value:l.storage[e.id]??e.placeholder,onChange:function(r){return l.storage[e.id]=r.toString()}}),s!==F.length-1&&t.React.createElement(b,null))})),t.React.createElement(h,{style:[o.subText]},v.map(function(e,s){return t.React.createElement(t.React.Fragment,null,t.React.createElement(M,{label:e.label,subLabel:e.subLabel,leading:e.icon&&t.React.createElement(M.Icon,{source:N.getAssetIDByName(e.icon)}),trailing:"id"in e?t.React.createElement(B,{value:l.storage[e.id]??e.default,onValueChange:function(r){return l.storage[e.id]=r}}):void 0}),s!==v.length-1&&t.React.createElement(b,null))})),t.React.createElement(u,{style:[o.subText,o.optionText]},S("Reload the Plugin to Apply Color Change")),t.React.createElement(u,{style:[o.text,o.optionText]},"Changes"),L.map(function(e,s){return t.React.createElement(t.React.Fragment,null,t.React.createElement(u,{style:[o.text]},e.version||"Dev Version"),e.patch?.map(function(r){return t.React.createElement(t.React.Fragment,null,t.React.createElement(u,{style:[o.subText]},`- ${r}`))}))}))))}const $=R.findByProps("startEditMessage"),w=R.findByProps("getMessage","getMessages"),_=R.findByProps("getChannel","getDMFromUserId"),{DCDChatManager:z}=t.ReactNative.NativeModules;let x=[];const U={onLoad(){this.self=m.before("startEditMessage",$,function(e){let s=l.storage.editedMessage||"`[ EDITED ]`";s=s+`

`;const[r,n,i]=e,a=i.split(s);return e[2]=a[a.length-1],e}),this.messageLogger=m.before("dispatch",t.FluxDispatcher,function(e){const[s]=e;let r=s.type;const n=w.getMessage(s?.channelId,s?.id);if(r==="MESSAGE_DELETE")return e[0]={type:"MESSAGE_UPDATE",channelId:n?.channel_id,message:{...n,content:`${n?.content} `,channel_id:n?.channel_id,guild_id:_?.getChannel(n?.channel_id)?.guild_id,timestamp:`${new Date().toJSON()}`,state:"SENT"},optimistic:!1,sendMessageOptions:{},isPushNotification:!1},x.push(s?.id),e;if(r==="MESSAGE_UPDATE"){let i=l.storage.editedMessage||"`[ EDITED ]`";if(i=i+`

`,e[0].message?.author?.bot||n?.author?.bot||!n?.author?.id||!n?.author?.username||!n?.content&&n?.attachments?.length==0&&n?.embeds?.length==0||s?.message?.content==n.content)return e;let a=s?.message??n;return e[0]={type:"MESSAGE_UPDATE",message:{...a,content:`${n?.content}  ${i}${s?.message?.content??""}`,guild_id:_.getChannel(n?.channel_id)?.guild_id,edited_timestamp:"invalid_timestamp"}},e}}),this.colorText=m.before("updateRows",z,function(e){let s=JSON.parse(e[1]),r=l.storage.deletedMessageColor||"E40303",n=/[0-9A-Fa-f]{6}/;r.match(n)||(r="E40303");function i(a){const E=["text","heading","s","u","em","strong","list","blockQuote"];if(Array.isArray(a))return a.map(i);if(typeof a=="object"&&a!==null){const{content:d,type:c,target:p,context:J,items:f}=a;if(!E.includes(c))return a;if(c==="text"&&d&&d.length>=1)return{content:[{content:d,type:"text"}],target:"usernameOnClick",type:"link",context:{username:1,medium:!0,usernameOnClick:{action:"0",userId:"0",linkColor:t.ReactNative.processColor(`#${r.toString()}`),messageChannelId:"0"}}};const y=i(d),A=f?f.map(i):void 0;if(y!==d||A!==f||!E.includes(c)){const g={...a,content:y};return c==="blockQuote"&&p&&(g.content=y,g.target=p),c==="list"&&g.hasOwnProperty("content")&&delete g.content,f&&(g.items=A),g}}return a}s.forEach(function(a){if(a.type!=1)return;if(!x.includes(a?.message?.id))return a;let E=i(a?.message?.content);a.message.content=E,a.message.edited=l.storage.deletedMessage||"This message is deleted";let d=l.storage.deletedMessageColorBackground||"FF2C2F";d.match(n)||(d="FF2C2F");let c=`#${d.toString()}33`,p=`#${d.toString()}CC`;return Boolean(l.storage.useBackgroundColor)&&(a.backgroundHighlight={backgroundColor:t.ReactNative.processColor(c),gutterColor:t.ReactNative.processColor(p)}),a}),e[1]=JSON.stringify(s)})},onUnload(){this.self?.(),this.colorText?.(),this.messageLogger?.()},settings:P};return C.default=U,Object.defineProperty(C,"__esModule",{value:!0}),C})({},vendetta.metro.common,vendetta.storage,vendetta.plugin,vendetta.ui.assets,vendetta.ui.components,vendetta.ui,vendetta.patcher,vendetta.metro);
