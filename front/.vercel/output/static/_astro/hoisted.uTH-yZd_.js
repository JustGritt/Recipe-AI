import"./hoisted.LcnWjRTo.js";import"./hoisted.Ku6fhyJE.js";const x=document.getElementById("search"),v=async a=>{const i={role:"user",content:`Provide a recipe for ${a} in a valid json object and nothing else.
            You have to strictly follow the following format and make sure to use double quotes and not single quote: 

            {
                "name": "...",
                "difficulty": "...",
                "time": "... minutes",
                "calories": "... calories",
                "ingredients":[
                    "...",
                    "...",
                    "..."
                ],
                "instructions":[
                    "...",
                    "...",
                    "..."
                ],
                "tags":[
                    "...",
                    "...",
                    "..."
                ]
            }`},s=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer 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"},body:JSON.stringify({model:"gpt-4",messages:[{role:"system",content:"You are now to act as an expert chef with 10 years of experience. You are to provide a recipe asked by the user and nothing else."},i],max_tokens:5e3,stop:["[DONE]"]})});document.createElement("div").classList.add("flex","gap-4","my-4");const l=(await s.json()).choices[0].message.content.replaceAll("'s","s").replaceAll("'",'"').replaceAll('""',"");return console.log(l),l};x.addEventListener("click",async()=>{const a=document.getElementById("recipe-searchbar"),i=document.getElementById("recipe"),s=a.value,n=document.getElementById("search");if(n.disabled=!0,n.innerHTML=`
<svg aria-hidden="true" role="status" class="inline w-5 h-5 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg>`,s&&s!==""){const c=await(await fetch(`http://localhost:3000/api/recipes/name/${s}`)).json();c.recipes.length>0&&(window.location.href=`/recipe/${c.recipes[0]._id}`);const l=await v(s);try{const e=JSON.parse(l),m=document.getElementById("recipe-name"),t=document.getElementById("recipe-difficulty"),u=document.getElementById("recipe-time"),g=document.getElementById("recipe-calories"),d=document.getElementById("recipe-tags"),f=document.getElementById("ingredients"),y=document.getElementById("instructions");e.name?m.innerText=e.name:m.innerText="No name provided",e.difficulty?t.innerText=e.difficulty:t.innerText="No difficulty provided",e.time?u.innerText=e.time:u.innerText="No time provided",e.calories?g.innerText=e.calories:g.innerText="No calories provided",e.tags?d.innerHTML=e.tags.map(o=>`<span class="bg-gray-200 text-black rounded-full px-4 py-2 capitalize">${o}</span>`).join(""):d.innerHTML='<span class="text-slate-900 bg-slate-100 rounded-lg px-2 py-1">No tags provided</span>',e.ingredients?f.innerHTML=e.ingredients.map(o=>`<li class="text-slate-900">${o}</li>`).join(""):f.innerHTML='<li class="text-slate-900">No ingredients provided</li>',e.instructions?y.innerHTML=e.instructions.map(o=>`<div class="flex gap-4"><span class="text-slate-900 font-bold">${e.instructions.indexOf(o)+1})</span><span class="text-slate-900">${o}</span></div>`).join(""):y.innerHTML='<div class="flex gap-4 my-4"><span class="text-slate-900 font-bold">No instructions provided</span></div>',i.classList.remove("hidden"),n.disabled=!1,n.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>`;const w=JSON.stringify({name:e.name,difficulty:e.difficulty,time:e.time,calories:e.calories,ingredients:e.ingredients,instructions:e.instructions,tags:e.tags});await fetch("http://localhost:3000/api/recipes",{method:"POST",headers:{"Content-Type":"application/json"},body:w})}catch(e){console.log(e),i.classList.remove("hidden"),i.innerHTML=`<div class="flex gap-4 my-4"><span class="text-red-700 font-bold">Seems like there was an issue while generating a recipe for ${s}, try again in a few seconds</span></div>`}}});const p=document.getElementById("recoButton"),C=document.getElementById("instructionSection"),h=document.getElementById("recoContainer"),T=async()=>{if(h.childElementCount>0){console.log("Quick exit"),h.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"});return}p.disabled=!0,p.classList.add("opacity-50","cursor-not-allowed");const a=Array.from(C.querySelectorAll("li")).map(r=>({role:"user",content:r.innerText})),s=(await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer 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"},body:JSON.stringify({model:"gpt-3.5-turbo",messages:[{role:"system",content:"You are now to act as an expert chef with 10 years of experience. Your goal is to help me pair my current recipe with a selection of wine, cheese or dessert that would fit the best. Suggest a low calorie and vegan alternative if and recommend seasonal products if possible."},...a],max_tokens:1e3,temperature:.9,top_p:1,presence_penalty:.6,frequency_penalty:.6,stop:["[DONE]"],stream:!0})})).body?.getReader(),n=document.createElement("div");for(n.classList.add("flex","gap-4","my-4");;){const{done:r,value:c}=await s?.read();if(r)break;const m=new TextDecoder("utf-8").decode(c).split(`
`).map(t=>t.replace(/data: /,"").trim()).filter(t=>t.length>0&&!t.includes("[DONE]")).map(t=>JSON.parse(t));for(const t of m){const{choices:u}=t,{delta:g}=u[0],{content:d}=g;d&&(n.innerText+=d,h.appendChild(n))}}return p.disabled=!1,p.classList.remove("opacity-50","cursor-not-allowed"),n};p?.addEventListener("click",()=>{T()});
