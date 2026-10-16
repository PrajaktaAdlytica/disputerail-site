import React from 'react';import{createRoot}from'react-dom/client';import{App}from'./App';import{Pages}from'./Pages';import{DemoApp}from'./DemoApp';import'./styles.css';import'./pages.css';import'./motionRefresh.css';
const route=decodeURI(location.pathname).replace(/\/+$/,'')||'/';const demo=['/demo','/demo/cases','/demo/cases/CASE-E14','/demo/cases/CASE-E14/report'].includes(route);
createRoot(document.getElementById('root')).render(<React.StrictMode>{route==='/'?<App/>:demo?<DemoApp route={route}/>:<Pages route={route}/>}</React.StrictMode>);
