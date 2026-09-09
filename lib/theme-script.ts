export const THEME_STORAGE_KEY = "usegrokbot:theme";

export const themeBootScript = `(function(){try{var p=location.pathname||"";var grok47=/\\/grok-4-7(?:\\/|$)/.test(p);var t=grok47?"dark":(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark"?"dark":"light");document.documentElement.setAttribute("data-theme",t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.setAttribute("data-theme","light");document.documentElement.style.colorScheme="light";}})();`;
