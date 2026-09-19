function a(n){const e=i(n).replace(/[\s()+-]/g,"");return/^\d{8,15}$/.test(e)}function i(n){return n.replace(/[۰-۹]/g,e=>String("۰۱۲۳۴۵۶۷۸۹".indexOf(e))).replace(/[٠-٩]/g,e=>String("٠١٢٣٤٥٦٧٨٩".indexOf(e)))}function o(n){return/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(n.trim())}function u(n,e,t){return`${n}

نام: ${e}
تلفن: ${i(t)}`}function $(n,e,t){return`${n}

Name: ${e}
Phone: ${i(t)}`}function c(n,e,t,s,r){return`${n}

Name: ${e}
Phone: ${i(t)}
${s}: ${r}`}export{o as a,c as b,$ as c,a as i,u as r};
