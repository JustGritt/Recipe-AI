import"./DarkModeToggle.astro_astro_type_script_index_0_lang.LcnWjRTo.js";import"./hoisted.8y_q3anB.js";const o=localStorage.getItem("jwt");if(o){const t=await fetch("http://localhost:3000/api/verify",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer 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"},body:JSON.stringify({token:o})});console.log(await t.json())}else window.location.href="/login",console.log("User is not logged in");
