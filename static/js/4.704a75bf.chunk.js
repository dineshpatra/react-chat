(this["webpackJsonpreact-chat"]=this["webpackJsonpreact-chat"]||[]).push([[4],{156:function(e,t,s){"use strict";s.r(t),s.d(t,"Home",(function(){return M}));var n=s(5);function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var s=0,n=new Array(t);s<t;s++)n[s]=e[s];return n}function a(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(e){if("string"===typeof e)return r(e,t);var s=Object.prototype.toString.call(e).slice(8,-1);return"Object"===s&&e.constructor&&(s=e.constructor.name),"Map"===s||"Set"===s?Array.from(e):"Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?r(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var c=s(17),i=s(51),o=s(52),u=s(25),d=s(54),l=s(53),h=s(1),f=s.n(h),m=s(8),p=s(24),b=s(30),j=s.n(b),v=s(39),g=s(55),O=function(e){Object(d.a)(s,e);var t=Object(l.a)(s);function s(e){var n;return Object(i.a)(this,s),(n=t.call(this,e)).state={users:[]},n.componentDidMount=Object(v.a)(j.a.mark((function e(){var t,s;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.b.ref("/users").once("value");case 3:t=e.sent,s=t.val(),Object.values(s).forEach((function(e){n.setState((function(t){return{users:[].concat(a(t.users),[{id:e.id,email:e.email}])}}))})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),n}return Object(o.a)(s,[{key:"render",value:function(){var e=this;return Object(n.jsx)(n.Fragment,{children:Object(n.jsx)("div",{id:"userList",children:this.state.users.map((function(t){return Object(n.jsx)("div",{className:"user",id:t.id,onClick:function(s){s.target;e.props.addNewChatWindow(t)},children:t.email})}))})})}}]),s}(f.a.Component),y=function(e){Object(d.a)(s,e);var t=Object(l.a)(s);function s(e){var n;return Object(i.a)(this,s),(n=t.call(this,e)).state={messages:[],typedMsg:""},n.printedMessages=[],n.messagesEndRef=f.a.createRef(),n.dbRef=void 0,n.scrollToBottom=function(){var e;null===(e=n.messagesEndRef.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})},console.log("@props",e),n.typedMsg=n.typedMsg.bind(Object(u.a)(n)),n.sendMessage=n.sendMessage.bind(Object(u.a)(n)),n}return Object(o.a)(s,[{key:"componentDidUpdate",value:function(){this.scrollToBottom()}},{key:"componentWillUnmount",value:function(){this.dbRef.off()}},{key:"componentDidMount",value:function(){var e=this;this.dbRef=g.b.ref("chats"),this.dbRef.on("value",(function(t){var s=t.val();Object.values(s).filter((function(t){var s;return null!==(s=(t.to==e.props.currentUser.id&&t.from==e.props.user.id||t.from==e.props.currentUser.id&&t.to==e.props.user.id)&&!e.printedMessages.includes(t.id.toString()))&&void 0!==s?s:t})).forEach((function(t){e.setState((function(s){return e.printedMessages.push(t.id.toString()),e.scrollToBottom(),Object(c.a)(Object(c.a)({},s),{},{messages:[].concat(a(s.messages),[t])})}))}))}),(function(e){console.log("The read failed: ",e)}))}},{key:"sendMessage",value:function(){var e=Object(v.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={id:(new Date).getTime(),sent:!1,status:"to-be-sent",message:this.state.typedMsg,from:this.props.currentUser.id,to:this.props.user.id},this.printedMessages.push(t.id.toString()),this.setState((function(e){return Object(c.a)(Object(c.a)({},e),{},{typedMsg:"",messages:[].concat(a(e.messages),[t])})})),e.next=5,g.b.ref("/chats").push(t);case 5:this.setState((function(e){return Object(c.a)(Object(c.a)({},e),{},{messages:a(e.messages.map((function(e){return e.status=e.id==t.id?"sent":e.status,e})))})})),console.log(this.state.messages);case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"typedMsg",value:function(e){var t=e.target;this.setState((function(e){return Object(c.a)(Object(c.a)({},e),{},{typedMsg:t.value})}))}},{key:"formattedDate",value:function(e){var t=new Date(e);return t.getFullYear()+"/"+(t.getMonth()+1)+"/"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()}},{key:"render",value:function(){var e=this;return Object(n.jsxs)("div",{className:"chatWindow",children:[Object(n.jsxs)("div",{className:"chat-header",children:[Object(n.jsx)("div",{className:"close-div",onClick:function(){e.props.removeChatWindow(e.props.user.id)},children:"\xd7"}),this.props.user.email]}),Object(n.jsxs)("div",{className:"chat-messages",children:[this.state.messages.map((function(t){return Object(n.jsx)("div",{className:"messages "+t.status+" "+(t.from==e.props.currentUser.id?"my-msg":"recieved-msg"),children:Object(n.jsxs)("div",{className:"msg-box",children:[Object(n.jsxs)("span",{className:"msg",children:[" ",t.message]}),Object(n.jsxs)("div",{className:"time",children:[" ",e.formattedDate(t.id)]})]})})})),Object(n.jsx)("div",{ref:this.messagesEndRef})]}),Object(n.jsx)("div",{className:"chat-footer",children:Object(n.jsx)("form",{onSubmit:this.sendMessage,children:Object(n.jsx)("textarea",{onKeyPress:function(t){13==(t.keyCode||t.which)&&e.sendMessage()},className:"chatInput",placeholder:"Type something",onChange:this.typedMsg,value:this.state.typedMsg})})})]})}}]),s}(f.a.Component),w=Object(p.b)((function(e){return{currentUser:e.user}}))(y),x=function(e){Object(d.a)(s,e);var t=Object(l.a)(s);function s(){return Object(i.a)(this,s),t.apply(this,arguments)}return Object(o.a)(s,[{key:"render",value:function(){var e=this;return Object(n.jsx)("div",{id:"chatWindows",children:this.props.chatUserIds.map((function(t){return Object(n.jsx)(w,{user:t,removeChatWindow:e.props.removeChatWindow})}))})}}]),s}(f.a.Component),M=function(e){Object(d.a)(s,e);var t=Object(l.a)(s);function s(e){var n;return Object(i.a)(this,s),(n=t.call(this,e)).state={chatUserIds:[]},n.addNewChatWindow=n.addNewChatWindow.bind(Object(u.a)(n)),n.removeChatWindow=n.removeChatWindow.bind(Object(u.a)(n)),n}return Object(o.a)(s,[{key:"addNewChatWindow",value:function(e){this.setState((function(t){return Object(c.a)(Object(c.a)({},t),{},{chatUserIds:a(Array.from(new Set([].concat(a(t.chatUserIds),[e]))))})}))}},{key:"removeChatWindow",value:function(e){console.log("@==",e),this.setState((function(t){return t.chatUserIds.splice(t.chatUserIds.findIndex((function(t){return t.id==e})),1),t}))}},{key:"componentWillMount",value:function(){document.title="Home"}},{key:"render",value:function(){return Object(n.jsx)("div",{className:"home-page",children:this.props.currentUser.isLoggedIn?Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(O,{addNewChatWindow:this.addNewChatWindow}),Object(n.jsx)(x,{chatUserIds:this.state.chatUserIds,removeChatWindow:this.removeChatWindow})]}):Object(n.jsx)("h6",{children:"User is not logger in "})})}}]),s}(f.a.Component);t.default=Object(p.b)((function(e){return{currentUser:e.user}}))(Object(m.g)(M))}}]);
//# sourceMappingURL=4.704a75bf.chunk.js.map