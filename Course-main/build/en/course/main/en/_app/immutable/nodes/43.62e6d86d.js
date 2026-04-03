import{s as Ye,d as Le,u as He,g as De,e as Pe,c as Ke,b as Ie,o as ze,a as Oe,n as Gl}from"../chunks/scheduler.893fe8c9.js";import{S as _e,i as Fe,e as w,s as o,a as h,f as Kl,d as e,b as i,k as Wl,m as t,t as d,o as C,y as lt,q as k,r as R,l as de,w as et,D as tt,c as g,h as st,g as B,j as f,n as G,p as Z}from"../chunks/index.b1df2166.js";import{T as be}from"../chunks/Tip.385bb05f.js";import{C as nt,H as wl}from"../chunks/MermaidChart.svelte_svelte_type_style_lang.5842b8c4.js";import{C as V}from"../chunks/CodeBlock.188561d0.js";import{e as Re}from"../chunks/each.e59479a4.js";import{s as he}from"../chunks/stores.db603902.js";function at(A,y){const r=new URL(window.location.href),U=new URLSearchParams(r.search);U.set(A,y),r.search=U.toString(),history.replaceState(null,"",r.toString())}function Mt(A){const y=new URL(window.location.href);return new URLSearchParams(y.search).get(A)}function xe(A,y,r){const U=A.slice();return U[7]=y[r],U}function qe(A){let y,r=A[7]+"",U,J,j,c,m;function I(){return A[6](A[7])}return{c(){y=w("div"),U=k(r),J=o(),this.h()},l(s){y=h(s,"DIV",{class:!0});var p=Kl(y);U=R(p,r),J=i(p),p.forEach(e),this.h()},h(){Wl(y,"class",j="flex items-center border rounded-lg px-1.5 py-1 leading-none select-none text-smd "+(A[2][A[0]]===A[7]?"border-gray-800 bg-black dark:bg-gray-700 text-white":"text-gray-500 cursor-pointer opacity-90 hover:text-gray-700 dark:hover:text-gray-200 hover:shadow-sm"))},m(s,p){t(s,y,p),de(y,U),de(y,J),c||(m=et(y,"click",I),c=!0)},p(s,p){A=s,p&2&&r!==(r=A[7]+"")&&tt(U,r),p&7&&j!==(j="flex items-center border rounded-lg px-1.5 py-1 leading-none select-none text-smd "+(A[2][A[0]]===A[7]?"border-gray-800 bg-black dark:bg-gray-700 text-white":"text-gray-500 cursor-pointer opacity-90 hover:text-gray-700 dark:hover:text-gray-200 hover:shadow-sm"))&&Wl(y,"class",j)},d(s){s&&e(y),c=!1,m()}}}function pt(A){let y,r,U,J,j=Re(A[1]),c=[];for(let s=0;s<j.length;s+=1)c[s]=qe(xe(A,j,s));const m=A[5].default,I=Le(m,A,A[4],null);return{c(){y=w("div");for(let s=0;s<c.length;s+=1)c[s].c();r=o(),U=w("div"),I&&I.c(),this.h()},l(s){y=h(s,"DIV",{class:!0});var p=Kl(y);for(let T=0;T<c.length;T+=1)c[T].l(p);p.forEach(e),r=i(s),U=h(s,"DIV",{class:!0});var Q=Kl(U);I&&I.l(Q),Q.forEach(e),this.h()},h(){Wl(y,"class","flex space-x-2 items-center my-1.5 mr-8 h-7 !pl-0 -mx-3 md:mx-0"),Wl(U,"class","language-select")},m(s,p){t(s,y,p);for(let Q=0;Q<c.length;Q+=1)c[Q]&&c[Q].m(y,null);t(s,r,p),t(s,U,p),I&&I.m(U,null),J=!0},p(s,[p]){if(p&15){j=Re(s[1]);let Q;for(Q=0;Q<j.length;Q+=1){const T=xe(s,j,Q);c[Q]?c[Q].p(T,p):(c[Q]=qe(T),c[Q].c(),c[Q].m(y,null))}for(;Q<c.length;Q+=1)c[Q].d(1);c.length=j.length}I&&I.p&&(!J||p&16)&&He(I,m,s,s[4],J?Pe(m,s[4],p,null):De(s[4]),null)},i(s){J||(d(I,s),J=!0)},o(s){C(I,s),J=!1},d(s){s&&(e(y),e(r),e(U)),lt(c,s),I&&I.d(s)}}}function ot(A,y,r){let U;Ke(A,he,p=>r(2,U=p));let{$$slots:J={},$$scope:j}=y,{id:c}=y,{options:m}=y;Ie(he,U[c]=m[0],U);function I(p){Ie(he,U[c]=p,U),at(c,p)}ze(()=>{const p=Mt(c);p&&m.includes(p)&&Ie(he,U[c]=p,U)});const s=p=>I(p);return A.$$set=p=>{"id"in p&&r(0,c=p.id),"options"in p&&r(1,m=p.options),"$$scope"in p&&r(4,j=p.$$scope)},[c,m,U,I,j,J,s]}class Hl extends _e{constructor(y){super(),Fe(this,y,ot,pt,Ye,{id:0,options:1})}}function it(A){let y,r='Flash Attention is a technique that optimizes the attention mechanism in transformer models by addressing memory bandwidth bottlenecks. As discussed earlier in <a href="/course/chapter1/8">Chapter 1.8</a>, the attention mechanism has quadratic complexity and memory usage, making it inefficient for long sequences.',U,J,j="The key innovation is in how it manages memory transfers between High Bandwidth Memory (HBM) and faster SRAM cache. Traditional attention repeatedly transfers data between HBM and SRAM, creating bottlenecks by leaving the GPU idle. Flash Attention loads data once into SRAM and performs all calculations there, minimizing expensive memory transfers.",c,m,I="While the benefits are most significant during training, Flash Attention’s reduced VRAM usage and improved efficiency make it valuable for inference as well, enabling faster and more scalable LLM serving.";return{c(){y=w("p"),y.innerHTML=r,U=o(),J=w("p"),J.textContent=j,c=o(),m=w("p"),m.textContent=I},l(s){y=h(s,"P",{"data-svelte-h":!0}),f(y)!=="svelte-1rkqssk"&&(y.innerHTML=r),U=i(s),J=h(s,"P",{"data-svelte-h":!0}),f(J)!=="svelte-jnwo3v"&&(J.textContent=j),c=i(s),m=h(s,"P",{"data-svelte-h":!0}),f(m)!=="svelte-9afbfq"&&(m.textContent=I)},m(s,p){t(s,y,p),t(s,U,p),t(s,J,p),t(s,c,p),t(s,m,p)},p:Gl,d(s){s&&(e(y),e(U),e(J),e(c),e(m))}}}function yt(A){let y,r='PagedAttention is a technique that addresses another critical bottleneck in LLM inference: KV cache memory management. As discussed in <a href="/course/chapter1/8">Chapter 1.8</a>, during text generation, the model stores attention keys and values (KV cache) for each generated token to reduce redundant computations. The KV cache can become enormous, especially with long sequences or multiple concurrent requests.',U,J,j="vLLM’s key innovation lies in how it manages this cache:",c,m,I="<li><strong>Memory Paging</strong>: Instead of treating the KV cache as one large block, it’s divided into fixed-size “pages” (similar to virtual memory in operating systems).</li> <li><strong>Non-contiguous Storage</strong>: Pages don’t need to be stored contiguously in GPU memory, allowing for more flexible memory allocation.</li> <li><strong>Page Table Management</strong>: A page table tracks which pages belong to which sequence, enabling efficient lookup and access.</li> <li><strong>Memory Sharing</strong>: For operations like parallel sampling, pages storing the KV cache for the prompt can be shared across multiple sequences.</li>",s,p,Q='The PagedAttention approach can lead to up to 24x higher throughput compared to traditional methods, making it a game-changer for production LLM deployments. If you want to go really deep into how PagedAttention works, you can read the <a href="https://docs.vllm.ai/en/latest/design/kernel/paged_attention.html" rel="nofollow">the guide from the vLLM documentation</a>.';return{c(){y=w("p"),y.innerHTML=r,U=o(),J=w("p"),J.textContent=j,c=o(),m=w("ol"),m.innerHTML=I,s=o(),p=w("p"),p.innerHTML=Q},l(T){y=h(T,"P",{"data-svelte-h":!0}),f(y)!=="svelte-121sini"&&(y.innerHTML=r),U=i(T),J=h(T,"P",{"data-svelte-h":!0}),f(J)!=="svelte-1dh20ya"&&(J.textContent=j),c=i(T),m=h(T,"OL",{"data-svelte-h":!0}),f(m)!=="svelte-af7t9r"&&(m.innerHTML=I),s=i(T),p=h(T,"P",{"data-svelte-h":!0}),f(p)!=="svelte-15futu5"&&(p.innerHTML=Q)},m(T,W){t(T,y,W),t(T,U,W),t(T,J,W),t(T,c,W),t(T,m,W),t(T,s,W),t(T,p,W)},p:Gl,d(T){T&&(e(y),e(U),e(J),e(c),e(m),e(s),e(p))}}}function ct(A){let y,r="Quantization in llama.cpp reduces the precision of model weights from 32-bit or 16-bit floating point to lower precision formats like 8-bit integers (INT8), 4-bit, or even lower. This significantly reduces memory usage and improves inference speed with minimal quality loss.",U,J,j="Key quantization features in llama.cpp include:",c,m,I="<li><strong>Multiple Quantization Levels</strong>: Supports 8-bit, 4-bit, 3-bit, and even 2-bit quantization</li> <li><strong>GGML/GGUF Format</strong>: Uses custom tensor formats optimized for quantized inference</li> <li><strong>Mixed Precision</strong>: Can apply different quantization levels to different parts of the model</li> <li><strong>Hardware-Specific Optimizations</strong>: Includes optimized code paths for various CPU architectures (AVX2, AVX-512, NEON)</li>",s,p,Q="This approach enables running billion-parameter models on consumer hardware with limited memory, making it perfect for local deployments and edge devices.";return{c(){y=w("p"),y.textContent=r,U=o(),J=w("p"),J.textContent=j,c=o(),m=w("ol"),m.innerHTML=I,s=o(),p=w("p"),p.textContent=Q},l(T){y=h(T,"P",{"data-svelte-h":!0}),f(y)!=="svelte-7sflxc"&&(y.textContent=r),U=i(T),J=h(T,"P",{"data-svelte-h":!0}),f(J)!=="svelte-wl8vzm"&&(J.textContent=j),c=i(T),m=h(T,"OL",{"data-svelte-h":!0}),f(m)!=="svelte-m0ejls"&&(m.innerHTML=I),s=i(T),p=h(T,"P",{"data-svelte-h":!0}),f(p)!=="svelte-gau5ug"&&(p.textContent=Q)},m(T,W){t(T,y,W),t(T,U,W),t(T,J,W),t(T,c,W),t(T,m,W),t(T,s,W),t(T,p,W)},p:Gl,d(T){T&&(e(y),e(U),e(J),e(c),e(m),e(s),e(p))}}}function rt(A){let y,r,U="TGI is easy to install and use, with deep integration into the Hugging Face ecosystem.",J,j,c="First, launch the TGI server using Docker:",m,I,s,p,Q="Then interact with it using Hugging Face’s InferenceClient:",T,W,H,S,ll="Alternatively, you can use the OpenAI client:",N,pl,D,E,el="llama.cpp is easy to install and use, requiring minimal dependencies and supporting both CPU and GPU inference.",X,u,$="First, install and build llama.cpp:",x,ol,tl,P,hl="Then, launch the server (with OpenAI API compatibility):",q,il,sl,K,Il="Interact with the server using Hugging Face’s InferenceClient:",Y,yl,nl,O,bl="Alternatively, you can use the OpenAI client:",z,al,_,jl,dl="vLLM is easy to install and use, with both OpenAI API compatibility and a native Python interface.",F,cl,rl="First, launch the vLLM OpenAI-compatible server:",Jl,ml,Ml,L,Cl="Then interact with it using Hugging Face’s InferenceClient:",a,b,fl,Ul,Dl="Alternatively, you can use the OpenAI client:",gl,Tl,Bl,ul;return I=new V({props:{code:"ZG9ja2VyJTIwcnVuJTIwLS1ncHVzJTIwYWxsJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1zaG0tc2l6ZSUyMDFnJTIwJTVDJTBBJTIwJTIwJTIwJTIwLXAlMjA4MDgwJTNBODAlMjAlNUMlMEElMjAlMjAlMjAlMjAtdiUyMH4lMkYuY2FjaGUlMkZodWdnaW5nZmFjZSUzQSUyRmRhdGElMjAlNUMlMEElMjAlMjAlMjAlMjBnaGNyLmlvJTJGaHVnZ2luZ2ZhY2UlMkZ0ZXh0LWdlbmVyYXRpb24taW5mZXJlbmNlJTNBbGF0ZXN0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1tb2RlbC1pZCUyMEh1Z2dpbmdGYWNlVEIlMkZTbW9sTE0yLTM2ME0tSW5zdHJ1Y3Q=",highlighted:`docker run --gpus all \\
    --shm-size 1g \\
    -p 8080:80 \\
    -v ~/.cache/huggingface:/data \\
    ghcr.io/huggingface/text-generation-inference:latest \\
    --model-id HuggingFaceTB/SmolLM2-360M-Instruct`,wrap:!1}}),W=new V({props:{code:"ZnJvbSUyMGh1Z2dpbmdmYWNlX2h1YiUyMGltcG9ydCUyMEluZmVyZW5jZUNsaWVudCUwQSUwQSUyMyUyMEluaXRpYWxpemUlMjBjbGllbnQlMjBwb2ludGluZyUyMHRvJTIwVEdJJTIwZW5kcG9pbnQlMEFjbGllbnQlMjAlM0QlMjBJbmZlcmVuY2VDbGllbnQoJTBBJTIwJTIwJTIwJTIwbW9kZWwlM0QlMjJodHRwJTNBJTJGJTJGbG9jYWxob3N0JTNBODA4MCUyMiUyQyUyMCUyMCUyMyUyMFVSTCUyMHRvJTIwdGhlJTIwVEdJJTIwc2VydmVyJTBBKSUwQSUwQSUyMyUyMFRleHQlMjBnZW5lcmF0aW9uJTBBcmVzcG9uc2UlMjAlM0QlMjBjbGllbnQudGV4dF9nZW5lcmF0aW9uKCUwQSUyMCUyMCUyMCUyMCUyMlRlbGwlMjBtZSUyMGElMjBzdG9yeSUyMiUyQyUwQSUyMCUyMCUyMCUyMG1heF9uZXdfdG9rZW5zJTNEMTAwJTJDJTBBJTIwJTIwJTIwJTIwdGVtcGVyYXR1cmUlM0QwLjclMkMlMEElMjAlMjAlMjAlMjB0b3BfcCUzRDAuOTUlMkMlMEElMjAlMjAlMjAlMjBkZXRhaWxzJTNEVHJ1ZSUyQyUwQSUyMCUyMCUyMCUyMHN0b3Bfc2VxdWVuY2VzJTNEJTVCJTVEJTJDJTBBKSUwQXByaW50KHJlc3BvbnNlLmdlbmVyYXRlZF90ZXh0KSUwQSUwQSUyMyUyMEZvciUyMGNoYXQlMjBmb3JtYXQlMEFyZXNwb25zZSUyMCUzRCUyMGNsaWVudC5jaGF0X2NvbXBsZXRpb24oJTBBJTIwJTIwJTIwJTIwbWVzc2FnZXMlM0QlNUIlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0IlMjJyb2xlJTIyJTNBJTIwJTIyc3lzdGVtJTIyJTJDJTIwJTIyY29udGVudCUyMiUzQSUyMCUyMllvdSUyMGFyZSUyMGElMjBoZWxwZnVsJTIwYXNzaXN0YW50LiUyMiU3RCUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3QiUyMnJvbGUlMjIlM0ElMjAlMjJ1c2VyJTIyJTJDJTIwJTIyY29udGVudCUyMiUzQSUyMCUyMlRlbGwlMjBtZSUyMGElMjBzdG9yeSUyMiU3RCUyQyUwQSUyMCUyMCUyMCUyMCU1RCUyQyUwQSUyMCUyMCUyMCUyMG1heF90b2tlbnMlM0QxMDAlMkMlMEElMjAlMjAlMjAlMjB0ZW1wZXJhdHVyZSUzRDAuNyUyQyUwQSUyMCUyMCUyMCUyMHRvcF9wJTNEMC45NSUyQyUwQSklMEFwcmludChyZXNwb25zZS5jaG9pY2VzJTVCMCU1RC5tZXNzYWdlLmNvbnRlbnQp",highlighted:`<span class="hljs-keyword">from</span> huggingface_hub <span class="hljs-keyword">import</span> InferenceClient

<span class="hljs-comment"># Initialize client pointing to TGI endpoint</span>
client = InferenceClient(
    model=<span class="hljs-string">&quot;http://localhost:8080&quot;</span>,  <span class="hljs-comment"># URL to the TGI server</span>
)

<span class="hljs-comment"># Text generation</span>
response = client.text_generation(
    <span class="hljs-string">&quot;Tell me a story&quot;</span>,
    max_new_tokens=<span class="hljs-number">100</span>,
    temperature=<span class="hljs-number">0.7</span>,
    top_p=<span class="hljs-number">0.95</span>,
    details=<span class="hljs-literal">True</span>,
    stop_sequences=[],
)
<span class="hljs-built_in">print</span>(response.generated_text)

<span class="hljs-comment"># For chat format</span>
response = client.chat_completion(
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;You are a helpful assistant.&quot;</span>},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Tell me a story&quot;</span>},
    ],
    max_tokens=<span class="hljs-number">100</span>,
    temperature=<span class="hljs-number">0.7</span>,
    top_p=<span class="hljs-number">0.95</span>,
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)`,wrap:!1}}),pl=new V({props:{code:"ZnJvbSUyMG9wZW5haSUyMGltcG9ydCUyME9wZW5BSSUwQSUwQSUyMyUyMEluaXRpYWxpemUlMjBjbGllbnQlMjBwb2ludGluZyUyMHRvJTIwVEdJJTIwZW5kcG9pbnQlMEFjbGllbnQlMjAlM0QlMjBPcGVuQUkoJTBBJTIwJTIwJTIwJTIwYmFzZV91cmwlM0QlMjJodHRwJTNBJTJGJTJGbG9jYWxob3N0JTNBODA4MCUyRnYxJTIyJTJDJTIwJTIwJTIzJTIwTWFrZSUyMHN1cmUlMjB0byUyMGluY2x1ZGUlMjAlMkZ2MSUwQSUyMCUyMCUyMCUyMGFwaV9rZXklM0QlMjJub3QtbmVlZGVkJTIyJTJDJTIwJTIwJTIzJTIwVEdJJTIwZG9lc24ndCUyMHJlcXVpcmUlMjBhbiUyMEFQSSUyMGtleSUyMGJ5JTIwZGVmYXVsdCUwQSklMEElMEElMjMlMjBDaGF0JTIwY29tcGxldGlvbiUwQXJlc3BvbnNlJTIwJTNEJTIwY2xpZW50LmNoYXQuY29tcGxldGlvbnMuY3JlYXRlKCUwQSUyMCUyMCUyMCUyMG1vZGVsJTNEJTIySHVnZ2luZ0ZhY2VUQiUyRlNtb2xMTTItMzYwTS1JbnN0cnVjdCUyMiUyQyUwQSUyMCUyMCUyMCUyMG1lc3NhZ2VzJTNEJTVCJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTdCJTIycm9sZSUyMiUzQSUyMCUyMnN5c3RlbSUyMiUyQyUyMCUyMmNvbnRlbnQlMjIlM0ElMjAlMjJZb3UlMjBhcmUlMjBhJTIwaGVscGZ1bCUyMGFzc2lzdGFudC4lMjIlN0QlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0IlMjJyb2xlJTIyJTNBJTIwJTIydXNlciUyMiUyQyUyMCUyMmNvbnRlbnQlMjIlM0ElMjAlMjJUZWxsJTIwbWUlMjBhJTIwc3RvcnklMjIlN0QlMkMlMEElMjAlMjAlMjAlMjAlNUQlMkMlMEElMjAlMjAlMjAlMjBtYXhfdG9rZW5zJTNEMTAwJTJDJTBBJTIwJTIwJTIwJTIwdGVtcGVyYXR1cmUlM0QwLjclMkMlMEElMjAlMjAlMjAlMjB0b3BfcCUzRDAuOTUlMkMlMEEpJTBBcHJpbnQocmVzcG9uc2UuY2hvaWNlcyU1QjAlNUQubWVzc2FnZS5jb250ZW50KQ==",highlighted:`<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

<span class="hljs-comment"># Initialize client pointing to TGI endpoint</span>
client = OpenAI(
    base_url=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>,  <span class="hljs-comment"># Make sure to include /v1</span>
    api_key=<span class="hljs-string">&quot;not-needed&quot;</span>,  <span class="hljs-comment"># TGI doesn&#x27;t require an API key by default</span>
)

<span class="hljs-comment"># Chat completion</span>
response = client.chat.completions.create(
    model=<span class="hljs-string">&quot;HuggingFaceTB/SmolLM2-360M-Instruct&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;You are a helpful assistant.&quot;</span>},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Tell me a story&quot;</span>},
    ],
    max_tokens=<span class="hljs-number">100</span>,
    temperature=<span class="hljs-number">0.7</span>,
    top_p=<span class="hljs-number">0.95</span>,
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)`,wrap:!1}}),ol=new V({props:{code:"JTIzJTIwQ2xvbmUlMjB0aGUlMjByZXBvc2l0b3J5JTBBZ2l0JTIwY2xvbmUlMjBodHRwcyUzQSUyRiUyRmdpdGh1Yi5jb20lMkZnZ2VyZ2Fub3YlMkZsbGFtYS5jcHAlMEFjZCUyMGxsYW1hLmNwcCUwQSUwQSUyMyUyMEJ1aWxkJTIwdGhlJTIwcHJvamVjdCUwQW1ha2UlMEElMEElMjMlMjBEb3dubG9hZCUyMHRoZSUyMFNtb2xMTTItMS43Qi1JbnN0cnVjdC1HR1VGJTIwbW9kZWwlMEFjdXJsJTIwLUwlMjAtTyUyMGh0dHBzJTNBJTJGJTJGaHVnZ2luZ2ZhY2UuY28lMkZIdWdnaW5nRmFjZVRCJTJGU21vbExNMi0xLjdCLUluc3RydWN0LUdHVUYlMkZyZXNvbHZlJTJGbWFpbiUyRnNtb2xsbTItMS43Yi1pbnN0cnVjdC5RNF9LX00uZ2d1Zg==",highlighted:`<span class="hljs-comment"># Clone the repository</span>
git <span class="hljs-built_in">clone</span> https://github.com/ggerganov/llama.cpp
<span class="hljs-built_in">cd</span> llama.cpp

<span class="hljs-comment"># Build the project</span>
make

<span class="hljs-comment"># Download the SmolLM2-1.7B-Instruct-GGUF model</span>
curl -L -O https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct-GGUF/resolve/main/smollm2-1.7b-instruct.Q4_K_M.gguf`,wrap:!1}}),il=new V({props:{code:"JTIzJTIwU3RhcnQlMjB0aGUlMjBzZXJ2ZXIlMEEuJTJGc2VydmVyJTIwJTVDJTBBJTIwJTIwJTIwJTIwLW0lMjBzbW9sbG0yLTEuN2ItaW5zdHJ1Y3QuUTRfS19NLmdndWYlMjAlNUMlMEElMjAlMjAlMjAlMjAtLWhvc3QlMjAwLjAuMC4wJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1wb3J0JTIwODA4MCUyMCU1QyUwQSUyMCUyMCUyMCUyMC1jJTIwNDA5NiUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tbi1ncHUtbGF5ZXJzJTIwMCUyMCUyMCUyMyUyMFNldCUyMHRvJTIwYSUyMGhpZ2hlciUyMG51bWJlciUyMHRvJTIwdXNlJTIwR1BV",highlighted:`<span class="hljs-comment"># Start the server</span>
./server \\
    -m smollm2-1.7b-instruct.Q4_K_M.gguf \\
    --host 0.0.0.0 \\
    --port 8080 \\
    -c 4096 \\
    --n-gpu-layers 0  <span class="hljs-comment"># Set to a higher number to use GPU</span>`,wrap:!1}}),yl=new V({props:{code:"ZnJvbSUyMGh1Z2dpbmdmYWNlX2h1YiUyMGltcG9ydCUyMEluZmVyZW5jZUNsaWVudCUwQSUwQSUyMyUyMEluaXRpYWxpemUlMjBjbGllbnQlMjBwb2ludGluZyUyMHRvJTIwbGxhbWEuY3BwJTIwc2VydmVyJTBBY2xpZW50JTIwJTNEJTIwSW5mZXJlbmNlQ2xpZW50KCUwQSUyMCUyMCUyMCUyMG1vZGVsJTNEJTIyaHR0cCUzQSUyRiUyRmxvY2FsaG9zdCUzQTgwODAlMkZ2MSUyMiUyQyUyMCUyMCUyMyUyMFVSTCUyMHRvJTIwdGhlJTIwbGxhbWEuY3BwJTIwc2VydmVyJTBBJTIwJTIwJTIwJTIwdG9rZW4lM0QlMjJzay1uby1rZXktcmVxdWlyZWQlMjIlMkMlMjAlMjAlMjMlMjBsbGFtYS5jcHAlMjBzZXJ2ZXIlMjByZXF1aXJlcyUyMHRoaXMlMjBwbGFjZWhvbGRlciUwQSklMEElMEElMjMlMjBUZXh0JTIwZ2VuZXJhdGlvbiUwQXJlc3BvbnNlJTIwJTNEJTIwY2xpZW50LnRleHRfZ2VuZXJhdGlvbiglMEElMjAlMjAlMjAlMjAlMjJUZWxsJTIwbWUlMjBhJTIwc3RvcnklMjIlMkMlMEElMjAlMjAlMjAlMjBtYXhfbmV3X3Rva2VucyUzRDEwMCUyQyUwQSUyMCUyMCUyMCUyMHRlbXBlcmF0dXJlJTNEMC43JTJDJTBBJTIwJTIwJTIwJTIwdG9wX3AlM0QwLjk1JTJDJTBBJTIwJTIwJTIwJTIwZGV0YWlscyUzRFRydWUlMkMlMEEpJTBBcHJpbnQocmVzcG9uc2UuZ2VuZXJhdGVkX3RleHQpJTBBJTBBJTIzJTIwRm9yJTIwY2hhdCUyMGZvcm1hdCUwQXJlc3BvbnNlJTIwJTNEJTIwY2xpZW50LmNoYXRfY29tcGxldGlvbiglMEElMjAlMjAlMjAlMjBtZXNzYWdlcyUzRCU1QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3QiUyMnJvbGUlMjIlM0ElMjAlMjJzeXN0ZW0lMjIlMkMlMjAlMjJjb250ZW50JTIyJTNBJTIwJTIyWW91JTIwYXJlJTIwYSUyMGhlbHBmdWwlMjBhc3Npc3RhbnQuJTIyJTdEJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTdCJTIycm9sZSUyMiUzQSUyMCUyMnVzZXIlMjIlMkMlMjAlMjJjb250ZW50JTIyJTNBJTIwJTIyVGVsbCUyMG1lJTIwYSUyMHN0b3J5JTIyJTdEJTJDJTBBJTIwJTIwJTIwJTIwJTVEJTJDJTBBJTIwJTIwJTIwJTIwbWF4X3Rva2VucyUzRDEwMCUyQyUwQSUyMCUyMCUyMCUyMHRlbXBlcmF0dXJlJTNEMC43JTJDJTBBJTIwJTIwJTIwJTIwdG9wX3AlM0QwLjk1JTJDJTBBKSUwQXByaW50KHJlc3BvbnNlLmNob2ljZXMlNUIwJTVELm1lc3NhZ2UuY29udGVudCk=",highlighted:`<span class="hljs-keyword">from</span> huggingface_hub <span class="hljs-keyword">import</span> InferenceClient

<span class="hljs-comment"># Initialize client pointing to llama.cpp server</span>
client = InferenceClient(
    model=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>,  <span class="hljs-comment"># URL to the llama.cpp server</span>
    token=<span class="hljs-string">&quot;sk-no-key-required&quot;</span>,  <span class="hljs-comment"># llama.cpp server requires this placeholder</span>
)

<span class="hljs-comment"># Text generation</span>
response = client.text_generation(
    <span class="hljs-string">&quot;Tell me a story&quot;</span>,
    max_new_tokens=<span class="hljs-number">100</span>,
    temperature=<span class="hljs-number">0.7</span>,
    top_p=<span class="hljs-number">0.95</span>,
    details=<span class="hljs-literal">True</span>,
)
<span class="hljs-built_in">print</span>(response.generated_text)

<span class="hljs-comment"># For chat format</span>
response = client.chat_completion(
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;You are a helpful assistant.&quot;</span>},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Tell me a story&quot;</span>},
    ],
    max_tokens=<span class="hljs-number">100</span>,
    temperature=<span class="hljs-number">0.7</span>,
    top_p=<span class="hljs-number">0.95</span>,
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)`,wrap:!1}}),al=new V({props:{code:"ZnJvbSUyMG9wZW5haSUyMGltcG9ydCUyME9wZW5BSSUwQSUwQSUyMyUyMEluaXRpYWxpemUlMjBjbGllbnQlMjBwb2ludGluZyUyMHRvJTIwbGxhbWEuY3BwJTIwc2VydmVyJTBBY2xpZW50JTIwJTNEJTIwT3BlbkFJKCUwQSUyMCUyMCUyMCUyMGJhc2VfdXJsJTNEJTIyaHR0cCUzQSUyRiUyRmxvY2FsaG9zdCUzQTgwODAlMkZ2MSUyMiUyQyUwQSUyMCUyMCUyMCUyMGFwaV9rZXklM0QlMjJzay1uby1rZXktcmVxdWlyZWQlMjIlMkMlMjAlMjAlMjMlMjBsbGFtYS5jcHAlMjBzZXJ2ZXIlMjByZXF1aXJlcyUyMHRoaXMlMjBwbGFjZWhvbGRlciUwQSklMEElMEElMjMlMjBDaGF0JTIwY29tcGxldGlvbiUwQXJlc3BvbnNlJTIwJTNEJTIwY2xpZW50LmNoYXQuY29tcGxldGlvbnMuY3JlYXRlKCUwQSUyMCUyMCUyMCUyMG1vZGVsJTNEJTIyc21vbGxtMi0xLjdiLWluc3RydWN0JTIyJTJDJTIwJTIwJTIzJTIwTW9kZWwlMjBpZGVudGlmaWVyJTIwY2FuJTIwYmUlMjBhbnl0aGluZyUyMGFzJTIwc2VydmVyJTIwb25seSUyMGxvYWRzJTIwb25lJTIwbW9kZWwlMEElMjAlMjAlMjAlMjBtZXNzYWdlcyUzRCU1QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3QiUyMnJvbGUlMjIlM0ElMjAlMjJzeXN0ZW0lMjIlMkMlMjAlMjJjb250ZW50JTIyJTNBJTIwJTIyWW91JTIwYXJlJTIwYSUyMGhlbHBmdWwlMjBhc3Npc3RhbnQuJTIyJTdEJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTdCJTIycm9sZSUyMiUzQSUyMCUyMnVzZXIlMjIlMkMlMjAlMjJjb250ZW50JTIyJTNBJTIwJTIyVGVsbCUyMG1lJTIwYSUyMHN0b3J5JTIyJTdEJTJDJTBBJTIwJTIwJTIwJTIwJTVEJTJDJTBBJTIwJTIwJTIwJTIwbWF4X3Rva2VucyUzRDEwMCUyQyUwQSUyMCUyMCUyMCUyMHRlbXBlcmF0dXJlJTNEMC43JTJDJTBBJTIwJTIwJTIwJTIwdG9wX3AlM0QwLjk1JTJDJTBBKSUwQXByaW50KHJlc3BvbnNlLmNob2ljZXMlNUIwJTVELm1lc3NhZ2UuY29udGVudCk=",highlighted:`<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

<span class="hljs-comment"># Initialize client pointing to llama.cpp server</span>
client = OpenAI(
    base_url=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>,
    api_key=<span class="hljs-string">&quot;sk-no-key-required&quot;</span>,  <span class="hljs-comment"># llama.cpp server requires this placeholder</span>
)

<span class="hljs-comment"># Chat completion</span>
response = client.chat.completions.create(
    model=<span class="hljs-string">&quot;smollm2-1.7b-instruct&quot;</span>,  <span class="hljs-comment"># Model identifier can be anything as server only loads one model</span>
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;You are a helpful assistant.&quot;</span>},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Tell me a story&quot;</span>},
    ],
    max_tokens=<span class="hljs-number">100</span>,
    temperature=<span class="hljs-number">0.7</span>,
    top_p=<span class="hljs-number">0.95</span>,
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)`,wrap:!1}}),ml=new V({props:{code:"cHl0aG9uJTIwLW0lMjB2bGxtLmVudHJ5cG9pbnRzLm9wZW5haS5hcGlfc2VydmVyJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1tb2RlbCUyMEh1Z2dpbmdGYWNlVEIlMkZTbW9sTE0yLTM2ME0tSW5zdHJ1Y3QlMjAlNUMlMEElMjAlMjAlMjAlMjAtLWhvc3QlMjAwLjAuMC4wJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1wb3J0JTIwODAwMA==",highlighted:`python -m vllm.entrypoints.openai.api_server \\
    --model HuggingFaceTB/SmolLM2-360M-Instruct \\
    --host 0.0.0.0 \\
    --port 8000`,wrap:!1}}),b=new V({props:{code:"ZnJvbSUyMGh1Z2dpbmdmYWNlX2h1YiUyMGltcG9ydCUyMEluZmVyZW5jZUNsaWVudCUwQSUwQSUyMyUyMEluaXRpYWxpemUlMjBjbGllbnQlMjBwb2ludGluZyUyMHRvJTIwdkxMTSUyMGVuZHBvaW50JTBBY2xpZW50JTIwJTNEJTIwSW5mZXJlbmNlQ2xpZW50KCUwQSUyMCUyMCUyMCUyMG1vZGVsJTNEJTIyaHR0cCUzQSUyRiUyRmxvY2FsaG9zdCUzQTgwMDAlMkZ2MSUyMiUyQyUyMCUyMCUyMyUyMFVSTCUyMHRvJTIwdGhlJTIwdkxMTSUyMHNlcnZlciUwQSklMEElMEElMjMlMjBUZXh0JTIwZ2VuZXJhdGlvbiUwQXJlc3BvbnNlJTIwJTNEJTIwY2xpZW50LnRleHRfZ2VuZXJhdGlvbiglMEElMjAlMjAlMjAlMjAlMjJUZWxsJTIwbWUlMjBhJTIwc3RvcnklMjIlMkMlMEElMjAlMjAlMjAlMjBtYXhfbmV3X3Rva2VucyUzRDEwMCUyQyUwQSUyMCUyMCUyMCUyMHRlbXBlcmF0dXJlJTNEMC43JTJDJTBBJTIwJTIwJTIwJTIwdG9wX3AlM0QwLjk1JTJDJTBBJTIwJTIwJTIwJTIwZGV0YWlscyUzRFRydWUlMkMlMEEpJTBBcHJpbnQocmVzcG9uc2UuZ2VuZXJhdGVkX3RleHQpJTBBJTBBJTIzJTIwRm9yJTIwY2hhdCUyMGZvcm1hdCUwQXJlc3BvbnNlJTIwJTNEJTIwY2xpZW50LmNoYXRfY29tcGxldGlvbiglMEElMjAlMjAlMjAlMjBtZXNzYWdlcyUzRCU1QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3QiUyMnJvbGUlMjIlM0ElMjAlMjJzeXN0ZW0lMjIlMkMlMjAlMjJjb250ZW50JTIyJTNBJTIwJTIyWW91JTIwYXJlJTIwYSUyMGhlbHBmdWwlMjBhc3Npc3RhbnQuJTIyJTdEJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTdCJTIycm9sZSUyMiUzQSUyMCUyMnVzZXIlMjIlMkMlMjAlMjJjb250ZW50JTIyJTNBJTIwJTIyVGVsbCUyMG1lJTIwYSUyMHN0b3J5JTIyJTdEJTJDJTBBJTIwJTIwJTIwJTIwJTVEJTJDJTBBJTIwJTIwJTIwJTIwbWF4X3Rva2VucyUzRDEwMCUyQyUwQSUyMCUyMCUyMCUyMHRlbXBlcmF0dXJlJTNEMC43JTJDJTBBJTIwJTIwJTIwJTIwdG9wX3AlM0QwLjk1JTJDJTBBKSUwQXByaW50KHJlc3BvbnNlLmNob2ljZXMlNUIwJTVELm1lc3NhZ2UuY29udGVudCk=",highlighted:`<span class="hljs-keyword">from</span> huggingface_hub <span class="hljs-keyword">import</span> InferenceClient

<span class="hljs-comment"># Initialize client pointing to vLLM endpoint</span>
client = InferenceClient(
    model=<span class="hljs-string">&quot;http://localhost:8000/v1&quot;</span>,  <span class="hljs-comment"># URL to the vLLM server</span>
)

<span class="hljs-comment"># Text generation</span>
response = client.text_generation(
    <span class="hljs-string">&quot;Tell me a story&quot;</span>,
    max_new_tokens=<span class="hljs-number">100</span>,
    temperature=<span class="hljs-number">0.7</span>,
    top_p=<span class="hljs-number">0.95</span>,
    details=<span class="hljs-literal">True</span>,
)
<span class="hljs-built_in">print</span>(response.generated_text)

<span class="hljs-comment"># For chat format</span>
response = client.chat_completion(
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;You are a helpful assistant.&quot;</span>},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Tell me a story&quot;</span>},
    ],
    max_tokens=<span class="hljs-number">100</span>,
    temperature=<span class="hljs-number">0.7</span>,
    top_p=<span class="hljs-number">0.95</span>,
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)`,wrap:!1}}),Tl=new V({props:{code:"ZnJvbSUyMG9wZW5haSUyMGltcG9ydCUyME9wZW5BSSUwQSUwQSUyMyUyMEluaXRpYWxpemUlMjBjbGllbnQlMjBwb2ludGluZyUyMHRvJTIwdkxMTSUyMGVuZHBvaW50JTBBY2xpZW50JTIwJTNEJTIwT3BlbkFJKCUwQSUyMCUyMCUyMCUyMGJhc2VfdXJsJTNEJTIyaHR0cCUzQSUyRiUyRmxvY2FsaG9zdCUzQTgwMDAlMkZ2MSUyMiUyQyUwQSUyMCUyMCUyMCUyMGFwaV9rZXklM0QlMjJub3QtbmVlZGVkJTIyJTJDJTIwJTIwJTIzJTIwdkxMTSUyMGRvZXNuJ3QlMjByZXF1aXJlJTIwYW4lMjBBUEklMjBrZXklMjBieSUyMGRlZmF1bHQlMEEpJTBBJTBBJTIzJTIwQ2hhdCUyMGNvbXBsZXRpb24lMEFyZXNwb25zZSUyMCUzRCUyMGNsaWVudC5jaGF0LmNvbXBsZXRpb25zLmNyZWF0ZSglMEElMjAlMjAlMjAlMjBtb2RlbCUzRCUyMkh1Z2dpbmdGYWNlVEIlMkZTbW9sTE0yLTM2ME0tSW5zdHJ1Y3QlMjIlMkMlMEElMjAlMjAlMjAlMjBtZXNzYWdlcyUzRCU1QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3QiUyMnJvbGUlMjIlM0ElMjAlMjJzeXN0ZW0lMjIlMkMlMjAlMjJjb250ZW50JTIyJTNBJTIwJTIyWW91JTIwYXJlJTIwYSUyMGhlbHBmdWwlMjBhc3Npc3RhbnQuJTIyJTdEJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTdCJTIycm9sZSUyMiUzQSUyMCUyMnVzZXIlMjIlMkMlMjAlMjJjb250ZW50JTIyJTNBJTIwJTIyVGVsbCUyMG1lJTIwYSUyMHN0b3J5JTIyJTdEJTJDJTBBJTIwJTIwJTIwJTIwJTVEJTJDJTBBJTIwJTIwJTIwJTIwbWF4X3Rva2VucyUzRDEwMCUyQyUwQSUyMCUyMCUyMCUyMHRlbXBlcmF0dXJlJTNEMC43JTJDJTBBJTIwJTIwJTIwJTIwdG9wX3AlM0QwLjk1JTJDJTBBKSUwQXByaW50KHJlc3BvbnNlLmNob2ljZXMlNUIwJTVELm1lc3NhZ2UuY29udGVudCk=",highlighted:`<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

<span class="hljs-comment"># Initialize client pointing to vLLM endpoint</span>
client = OpenAI(
    base_url=<span class="hljs-string">&quot;http://localhost:8000/v1&quot;</span>,
    api_key=<span class="hljs-string">&quot;not-needed&quot;</span>,  <span class="hljs-comment"># vLLM doesn&#x27;t require an API key by default</span>
)

<span class="hljs-comment"># Chat completion</span>
response = client.chat.completions.create(
    model=<span class="hljs-string">&quot;HuggingFaceTB/SmolLM2-360M-Instruct&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;You are a helpful assistant.&quot;</span>},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Tell me a story&quot;</span>},
    ],
    max_tokens=<span class="hljs-number">100</span>,
    temperature=<span class="hljs-number">0.7</span>,
    top_p=<span class="hljs-number">0.95</span>,
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)`,wrap:!1}}),{c(){y=k(`<hfoption value="tgi" label="TGI">
`),r=w("p"),r.textContent=U,J=o(),j=w("p"),j.textContent=c,m=o(),g(I.$$.fragment),s=o(),p=w("p"),p.textContent=Q,T=o(),g(W.$$.fragment),H=o(),S=w("p"),S.textContent=ll,N=o(),g(pl.$$.fragment),D=k(`
</hfoption>
<hfoption value="llama.cpp" label="llama.cpp">
`),E=w("p"),E.textContent=el,X=o(),u=w("p"),u.textContent=$,x=o(),g(ol.$$.fragment),tl=o(),P=w("p"),P.textContent=hl,q=o(),g(il.$$.fragment),sl=o(),K=w("p"),K.textContent=Il,Y=o(),g(yl.$$.fragment),nl=o(),O=w("p"),O.textContent=bl,z=o(),g(al.$$.fragment),_=k(`
</hfoption>
<hfoption value="vllm" label="vLLM">
`),jl=w("p"),jl.textContent=dl,F=o(),cl=w("p"),cl.textContent=rl,Jl=o(),g(ml.$$.fragment),Ml=o(),L=w("p"),L.textContent=Cl,a=o(),g(b.$$.fragment),fl=o(),Ul=w("p"),Ul.textContent=Dl,gl=o(),g(Tl.$$.fragment),Bl=k(`
</hfoption>`)},l(n){y=R(n,`<hfoption value="tgi" label="TGI">
`),r=h(n,"P",{"data-svelte-h":!0}),f(r)!=="svelte-1xscn0n"&&(r.textContent=U),J=i(n),j=h(n,"P",{"data-svelte-h":!0}),f(j)!=="svelte-1g20rmd"&&(j.textContent=c),m=i(n),B(I.$$.fragment,n),s=i(n),p=h(n,"P",{"data-svelte-h":!0}),f(p)!=="svelte-168g8u0"&&(p.textContent=Q),T=i(n),B(W.$$.fragment,n),H=i(n),S=h(n,"P",{"data-svelte-h":!0}),f(S)!=="svelte-1vrpxju"&&(S.textContent=ll),N=i(n),B(pl.$$.fragment,n),D=R(n,`
</hfoption>
<hfoption value="llama.cpp" label="llama.cpp">
`),E=h(n,"P",{"data-svelte-h":!0}),f(E)!=="svelte-1uzfhnr"&&(E.textContent=el),X=i(n),u=h(n,"P",{"data-svelte-h":!0}),f(u)!=="svelte-1xrr3cs"&&(u.textContent=$),x=i(n),B(ol.$$.fragment,n),tl=i(n),P=h(n,"P",{"data-svelte-h":!0}),f(P)!=="svelte-9xyw1x"&&(P.textContent=hl),q=i(n),B(il.$$.fragment,n),sl=i(n),K=h(n,"P",{"data-svelte-h":!0}),f(K)!=="svelte-5g6wzi"&&(K.textContent=Il),Y=i(n),B(yl.$$.fragment,n),nl=i(n),O=h(n,"P",{"data-svelte-h":!0}),f(O)!=="svelte-1vrpxju"&&(O.textContent=bl),z=i(n),B(al.$$.fragment,n),_=R(n,`
</hfoption>
<hfoption value="vllm" label="vLLM">
`),jl=h(n,"P",{"data-svelte-h":!0}),f(jl)!=="svelte-1sx76te"&&(jl.textContent=dl),F=i(n),cl=h(n,"P",{"data-svelte-h":!0}),f(cl)!=="svelte-9ezhmp"&&(cl.textContent=rl),Jl=i(n),B(ml.$$.fragment,n),Ml=i(n),L=h(n,"P",{"data-svelte-h":!0}),f(L)!=="svelte-168g8u0"&&(L.textContent=Cl),a=i(n),B(b.$$.fragment,n),fl=i(n),Ul=h(n,"P",{"data-svelte-h":!0}),f(Ul)!=="svelte-1vrpxju"&&(Ul.textContent=Dl),gl=i(n),B(Tl.$$.fragment,n),Bl=R(n,`
</hfoption>`)},m(n,v){t(n,y,v),t(n,r,v),t(n,J,v),t(n,j,v),t(n,m,v),G(I,n,v),t(n,s,v),t(n,p,v),t(n,T,v),G(W,n,v),t(n,H,v),t(n,S,v),t(n,N,v),G(pl,n,v),t(n,D,v),t(n,E,v),t(n,X,v),t(n,u,v),t(n,x,v),G(ol,n,v),t(n,tl,v),t(n,P,v),t(n,q,v),G(il,n,v),t(n,sl,v),t(n,K,v),t(n,Y,v),G(yl,n,v),t(n,nl,v),t(n,O,v),t(n,z,v),G(al,n,v),t(n,_,v),t(n,jl,v),t(n,F,v),t(n,cl,v),t(n,Jl,v),G(ml,n,v),t(n,Ml,v),t(n,L,v),t(n,a,v),G(b,n,v),t(n,fl,v),t(n,Ul,v),t(n,gl,v),G(Tl,n,v),t(n,Bl,v),ul=!0},p:Gl,i(n){ul||(d(I.$$.fragment,n),d(W.$$.fragment,n),d(pl.$$.fragment,n),d(ol.$$.fragment,n),d(il.$$.fragment,n),d(yl.$$.fragment,n),d(al.$$.fragment,n),d(ml.$$.fragment,n),d(b.$$.fragment,n),d(Tl.$$.fragment,n),ul=!0)},o(n){C(I.$$.fragment,n),C(W.$$.fragment,n),C(pl.$$.fragment,n),C(ol.$$.fragment,n),C(il.$$.fragment,n),C(yl.$$.fragment,n),C(al.$$.fragment,n),C(ml.$$.fragment,n),C(b.$$.fragment,n),C(Tl.$$.fragment,n),ul=!1},d(n){n&&(e(y),e(r),e(J),e(j),e(m),e(s),e(p),e(T),e(H),e(S),e(N),e(D),e(E),e(X),e(u),e(x),e(tl),e(P),e(q),e(sl),e(K),e(Y),e(nl),e(O),e(z),e(_),e(jl),e(F),e(cl),e(Jl),e(Ml),e(L),e(a),e(fl),e(Ul),e(gl),e(Bl)),Z(I,n),Z(W,n),Z(pl,n),Z(ol,n),Z(il,n),Z(yl,n),Z(al,n),Z(ml,n),Z(b,n),Z(Tl,n)}}}function Jt(A){let y,r,U="First, deploy TGI with advanced parameters:",J,j,c,m,I="Use the InferenceClient for flexible text generation:",s,p,Q,T,W="Or use the OpenAI client:",H,S,ll,N,pl="For llama.cpp, you can set advanced parameters when launching the server:",D,E,el,X,u="Use the InferenceClient:",$,x,ol,tl,P="Or use the OpenAI client for generation with control over the sampling parameters:",hl,q,il,sl,K="You can also use llama.cpp’s native library for even more control:",Il,Y,yl,nl,O="For advanced usage with vLLM, you can use the InferenceClient:",bl,z,al,_,jl="You can also use the OpenAI client:",dl,F,cl,rl,Jl="vLLM also provides a native Python interface with fine-grained control:",ml,Ml,L,Cl;return j=new V({props:{code:"ZG9ja2VyJTIwcnVuJTIwLS1ncHVzJTIwYWxsJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1zaG0tc2l6ZSUyMDFnJTIwJTVDJTBBJTIwJTIwJTIwJTIwLXAlMjA4MDgwJTNBODAlMjAlNUMlMEElMjAlMjAlMjAlMjAtdiUyMH4lMkYuY2FjaGUlMkZodWdnaW5nZmFjZSUzQSUyRmRhdGElMjAlNUMlMEElMjAlMjAlMjAlMjBnaGNyLmlvJTJGaHVnZ2luZ2ZhY2UlMkZ0ZXh0LWdlbmVyYXRpb24taW5mZXJlbmNlJTNBbGF0ZXN0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1tb2RlbC1pZCUyMEh1Z2dpbmdGYWNlVEIlMkZTbW9sTE0yLTM2ME0tSW5zdHJ1Y3QlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW1heC10b3RhbC10b2tlbnMlMjA0MDk2JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1tYXgtaW5wdXQtbGVuZ3RoJTIwMzA3MiUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tbWF4LWJhdGNoLXRvdGFsLXRva2VucyUyMDgxOTIlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXdhaXRpbmctc2VydmVkLXJhdGlvJTIwMS4y",highlighted:`docker run --gpus all \\
    --shm-size 1g \\
    -p 8080:80 \\
    -v ~/.cache/huggingface:/data \\
    ghcr.io/huggingface/text-generation-inference:latest \\
    --model-id HuggingFaceTB/SmolLM2-360M-Instruct \\
    --max-total-tokens 4096 \\
    --max-input-length 3072 \\
    --max-batch-total-tokens 8192 \\
    --waiting-served-ratio 1.2`,wrap:!1}}),p=new V({props:{code:"ZnJvbSUyMGh1Z2dpbmdmYWNlX2h1YiUyMGltcG9ydCUyMEluZmVyZW5jZUNsaWVudCUwQSUwQWNsaWVudCUyMCUzRCUyMEluZmVyZW5jZUNsaWVudChtb2RlbCUzRCUyMmh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0E4MDgwJTIyKSUwQSUwQSUyMyUyMEFkdmFuY2VkJTIwcGFyYW1ldGVycyUyMGV4YW1wbGUlMEFyZXNwb25zZSUyMCUzRCUyMGNsaWVudC5jaGF0X2NvbXBsZXRpb24oJTBBJTIwJTIwJTIwJTIwbWVzc2FnZXMlM0QlNUIlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0IlMjJyb2xlJTIyJTNBJTIwJTIyc3lzdGVtJTIyJTJDJTIwJTIyY29udGVudCUyMiUzQSUyMCUyMllvdSUyMGFyZSUyMGElMjBjcmVhdGl2ZSUyMHN0b3J5dGVsbGVyLiUyMiU3RCUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3QiUyMnJvbGUlMjIlM0ElMjAlMjJ1c2VyJTIyJTJDJTIwJTIyY29udGVudCUyMiUzQSUyMCUyMldyaXRlJTIwYSUyMGNyZWF0aXZlJTIwc3RvcnklMjIlN0QlMkMlMEElMjAlMjAlMjAlMjAlNUQlMkMlMEElMjAlMjAlMjAlMjB0ZW1wZXJhdHVyZSUzRDAuOCUyQyUwQSUyMCUyMCUyMCUyMG1heF90b2tlbnMlM0QyMDAlMkMlMEElMjAlMjAlMjAlMjB0b3BfcCUzRDAuOTUlMkMlMEEpJTBBcHJpbnQocmVzcG9uc2UuY2hvaWNlcyU1QjAlNUQubWVzc2FnZS5jb250ZW50KSUwQSUwQSUyMyUyMFJhdyUyMHRleHQlMjBnZW5lcmF0aW9uJTBBcmVzcG9uc2UlMjAlM0QlMjBjbGllbnQudGV4dF9nZW5lcmF0aW9uKCUwQSUyMCUyMCUyMCUyMCUyMldyaXRlJTIwYSUyMGNyZWF0aXZlJTIwc3RvcnklMjBhYm91dCUyMHNwYWNlJTIwZXhwbG9yYXRpb24lMjIlMkMlMEElMjAlMjAlMjAlMjBtYXhfbmV3X3Rva2VucyUzRDIwMCUyQyUwQSUyMCUyMCUyMCUyMHRlbXBlcmF0dXJlJTNEMC44JTJDJTBBJTIwJTIwJTIwJTIwdG9wX3AlM0QwLjk1JTJDJTBBJTIwJTIwJTIwJTIwcmVwZXRpdGlvbl9wZW5hbHR5JTNEMS4xJTJDJTBBJTIwJTIwJTIwJTIwZG9fc2FtcGxlJTNEVHJ1ZSUyQyUwQSUyMCUyMCUyMCUyMGRldGFpbHMlM0RUcnVlJTJDJTBBKSUwQXByaW50KHJlc3BvbnNlLmdlbmVyYXRlZF90ZXh0KQ==",highlighted:`<span class="hljs-keyword">from</span> huggingface_hub <span class="hljs-keyword">import</span> InferenceClient

client = InferenceClient(model=<span class="hljs-string">&quot;http://localhost:8080&quot;</span>)

<span class="hljs-comment"># Advanced parameters example</span>
response = client.chat_completion(
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;You are a creative storyteller.&quot;</span>},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Write a creative story&quot;</span>},
    ],
    temperature=<span class="hljs-number">0.8</span>,
    max_tokens=<span class="hljs-number">200</span>,
    top_p=<span class="hljs-number">0.95</span>,
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)

<span class="hljs-comment"># Raw text generation</span>
response = client.text_generation(
    <span class="hljs-string">&quot;Write a creative story about space exploration&quot;</span>,
    max_new_tokens=<span class="hljs-number">200</span>,
    temperature=<span class="hljs-number">0.8</span>,
    top_p=<span class="hljs-number">0.95</span>,
    repetition_penalty=<span class="hljs-number">1.1</span>,
    do_sample=<span class="hljs-literal">True</span>,
    details=<span class="hljs-literal">True</span>,
)
<span class="hljs-built_in">print</span>(response.generated_text)`,wrap:!1}}),S=new V({props:{code:"ZnJvbSUyMG9wZW5haSUyMGltcG9ydCUyME9wZW5BSSUwQSUwQWNsaWVudCUyMCUzRCUyME9wZW5BSShiYXNlX3VybCUzRCUyMmh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0E4MDgwJTJGdjElMjIlMkMlMjBhcGlfa2V5JTNEJTIybm90LW5lZWRlZCUyMiklMEElMEElMjMlMjBBZHZhbmNlZCUyMHBhcmFtZXRlcnMlMjBleGFtcGxlJTBBcmVzcG9uc2UlMjAlM0QlMjBjbGllbnQuY2hhdC5jb21wbGV0aW9ucy5jcmVhdGUoJTBBJTIwJTIwJTIwJTIwbW9kZWwlM0QlMjJIdWdnaW5nRmFjZVRCJTJGU21vbExNMi0zNjBNLUluc3RydWN0JTIyJTJDJTBBJTIwJTIwJTIwJTIwbWVzc2FnZXMlM0QlNUIlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0IlMjJyb2xlJTIyJTNBJTIwJTIyc3lzdGVtJTIyJTJDJTIwJTIyY29udGVudCUyMiUzQSUyMCUyMllvdSUyMGFyZSUyMGElMjBjcmVhdGl2ZSUyMHN0b3J5dGVsbGVyLiUyMiU3RCUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3QiUyMnJvbGUlMjIlM0ElMjAlMjJ1c2VyJTIyJTJDJTIwJTIyY29udGVudCUyMiUzQSUyMCUyMldyaXRlJTIwYSUyMGNyZWF0aXZlJTIwc3RvcnklMjIlN0QlMkMlMEElMjAlMjAlMjAlMjAlNUQlMkMlMEElMjAlMjAlMjAlMjB0ZW1wZXJhdHVyZSUzRDAuOCUyQyUyMCUyMCUyMyUyMEhpZ2hlciUyMGZvciUyMG1vcmUlMjBjcmVhdGl2aXR5JTBBKSUwQXByaW50KHJlc3BvbnNlLmNob2ljZXMlNUIwJTVELm1lc3NhZ2UuY29udGVudCk=",highlighted:`<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

client = OpenAI(base_url=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>, api_key=<span class="hljs-string">&quot;not-needed&quot;</span>)

<span class="hljs-comment"># Advanced parameters example</span>
response = client.chat.completions.create(
    model=<span class="hljs-string">&quot;HuggingFaceTB/SmolLM2-360M-Instruct&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;You are a creative storyteller.&quot;</span>},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Write a creative story&quot;</span>},
    ],
    temperature=<span class="hljs-number">0.8</span>,  <span class="hljs-comment"># Higher for more creativity</span>
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)`,wrap:!1}}),E=new V({props:{code:"LiUyRnNlcnZlciUyMCU1QyUwQSUyMCUyMCUyMCUyMC1tJTIwc21vbGxtMi0xLjdiLWluc3RydWN0LlE0X0tfTS5nZ3VmJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1ob3N0JTIwMC4wLjAuMCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcG9ydCUyMDgwODAlMjAlNUMlMEElMjAlMjAlMjAlMjAtYyUyMDQwOTYlMjAlNUMlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjMlMjBDb250ZXh0JTIwc2l6ZSUwQSUyMCUyMCUyMCUyMC0tdGhyZWFkcyUyMDglMjAlNUMlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjMlMjBDUFUlMjB0aHJlYWRzJTIwdG8lMjB1c2UlMEElMjAlMjAlMjAlMjAtLWJhdGNoLXNpemUlMjA1MTIlMjAlNUMlMjAlMjAlMjAlMjMlMjBCYXRjaCUyMHNpemUlMjBmb3IlMjBwcm9tcHQlMjBldmFsdWF0aW9uJTBBJTIwJTIwJTIwJTIwLS1uLWdwdS1sYXllcnMlMjAwJTIwJTIwJTIwJTIwJTIwJTIzJTIwR1BVJTIwbGF5ZXJzJTIwKDAlMjAlM0QlMjBDUFUlMjBvbmx5KQ==",highlighted:`./server \\
    -m smollm2-1.7b-instruct.Q4_K_M.gguf \\
    --host 0.0.0.0 \\
    --port 8080 \\
    -c 4096 \\            <span class="hljs-comment"># Context size</span>
    --threads 8 \\        <span class="hljs-comment"># CPU threads to use</span>
    --batch-size 512 \\   <span class="hljs-comment"># Batch size for prompt evaluation</span>
    --n-gpu-layers 0     <span class="hljs-comment"># GPU layers (0 = CPU only)</span>`,wrap:!1}}),x=new V({props:{code:"ZnJvbSUyMGh1Z2dpbmdmYWNlX2h1YiUyMGltcG9ydCUyMEluZmVyZW5jZUNsaWVudCUwQSUwQWNsaWVudCUyMCUzRCUyMEluZmVyZW5jZUNsaWVudChtb2RlbCUzRCUyMmh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0E4MDgwJTJGdjElMjIlMkMlMjB0b2tlbiUzRCUyMnNrLW5vLWtleS1yZXF1aXJlZCUyMiklMEElMEElMjMlMjBBZHZhbmNlZCUyMHBhcmFtZXRlcnMlMjBleGFtcGxlJTBBcmVzcG9uc2UlMjAlM0QlMjBjbGllbnQuY2hhdF9jb21wbGV0aW9uKCUwQSUyMCUyMCUyMCUyMG1lc3NhZ2VzJTNEJTVCJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTdCJTIycm9sZSUyMiUzQSUyMCUyMnN5c3RlbSUyMiUyQyUyMCUyMmNvbnRlbnQlMjIlM0ElMjAlMjJZb3UlMjBhcmUlMjBhJTIwY3JlYXRpdmUlMjBzdG9yeXRlbGxlci4lMjIlN0QlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0IlMjJyb2xlJTIyJTNBJTIwJTIydXNlciUyMiUyQyUyMCUyMmNvbnRlbnQlMjIlM0ElMjAlMjJXcml0ZSUyMGElMjBjcmVhdGl2ZSUyMHN0b3J5JTIyJTdEJTJDJTBBJTIwJTIwJTIwJTIwJTVEJTJDJTBBJTIwJTIwJTIwJTIwdGVtcGVyYXR1cmUlM0QwLjglMkMlMEElMjAlMjAlMjAlMjBtYXhfdG9rZW5zJTNEMjAwJTJDJTBBJTIwJTIwJTIwJTIwdG9wX3AlM0QwLjk1JTJDJTBBKSUwQXByaW50KHJlc3BvbnNlLmNob2ljZXMlNUIwJTVELm1lc3NhZ2UuY29udGVudCklMEElMEElMjMlMjBGb3IlMjBkaXJlY3QlMjB0ZXh0JTIwZ2VuZXJhdGlvbiUwQXJlc3BvbnNlJTIwJTNEJTIwY2xpZW50LnRleHRfZ2VuZXJhdGlvbiglMEElMjAlMjAlMjAlMjAlMjJXcml0ZSUyMGElMjBjcmVhdGl2ZSUyMHN0b3J5JTIwYWJvdXQlMjBzcGFjZSUyMGV4cGxvcmF0aW9uJTIyJTJDJTBBJTIwJTIwJTIwJTIwbWF4X25ld190b2tlbnMlM0QyMDAlMkMlMEElMjAlMjAlMjAlMjB0ZW1wZXJhdHVyZSUzRDAuOCUyQyUwQSUyMCUyMCUyMCUyMHRvcF9wJTNEMC45NSUyQyUwQSUyMCUyMCUyMCUyMHJlcGV0aXRpb25fcGVuYWx0eSUzRDEuMSUyQyUwQSUyMCUyMCUyMCUyMGRldGFpbHMlM0RUcnVlJTJDJTBBKSUwQXByaW50KHJlc3BvbnNlLmdlbmVyYXRlZF90ZXh0KQ==",highlighted:`<span class="hljs-keyword">from</span> huggingface_hub <span class="hljs-keyword">import</span> InferenceClient

client = InferenceClient(model=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>, token=<span class="hljs-string">&quot;sk-no-key-required&quot;</span>)

<span class="hljs-comment"># Advanced parameters example</span>
response = client.chat_completion(
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;You are a creative storyteller.&quot;</span>},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Write a creative story&quot;</span>},
    ],
    temperature=<span class="hljs-number">0.8</span>,
    max_tokens=<span class="hljs-number">200</span>,
    top_p=<span class="hljs-number">0.95</span>,
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)

<span class="hljs-comment"># For direct text generation</span>
response = client.text_generation(
    <span class="hljs-string">&quot;Write a creative story about space exploration&quot;</span>,
    max_new_tokens=<span class="hljs-number">200</span>,
    temperature=<span class="hljs-number">0.8</span>,
    top_p=<span class="hljs-number">0.95</span>,
    repetition_penalty=<span class="hljs-number">1.1</span>,
    details=<span class="hljs-literal">True</span>,
)
<span class="hljs-built_in">print</span>(response.generated_text)`,wrap:!1}}),q=new V({props:{code:"ZnJvbSUyMG9wZW5haSUyMGltcG9ydCUyME9wZW5BSSUwQSUwQWNsaWVudCUyMCUzRCUyME9wZW5BSShiYXNlX3VybCUzRCUyMmh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0E4MDgwJTJGdjElMjIlMkMlMjBhcGlfa2V5JTNEJTIyc2stbm8ta2V5LXJlcXVpcmVkJTIyKSUwQSUwQSUyMyUyMEFkdmFuY2VkJTIwcGFyYW1ldGVycyUyMGV4YW1wbGUlMEFyZXNwb25zZSUyMCUzRCUyMGNsaWVudC5jaGF0LmNvbXBsZXRpb25zLmNyZWF0ZSglMEElMjAlMjAlMjAlMjBtb2RlbCUzRCUyMnNtb2xsbTItMS43Yi1pbnN0cnVjdCUyMiUyQyUwQSUyMCUyMCUyMCUyMG1lc3NhZ2VzJTNEJTVCJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTdCJTIycm9sZSUyMiUzQSUyMCUyMnN5c3RlbSUyMiUyQyUyMCUyMmNvbnRlbnQlMjIlM0ElMjAlMjJZb3UlMjBhcmUlMjBhJTIwY3JlYXRpdmUlMjBzdG9yeXRlbGxlci4lMjIlN0QlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0IlMjJyb2xlJTIyJTNBJTIwJTIydXNlciUyMiUyQyUyMCUyMmNvbnRlbnQlMjIlM0ElMjAlMjJXcml0ZSUyMGElMjBjcmVhdGl2ZSUyMHN0b3J5JTIyJTdEJTJDJTBBJTIwJTIwJTIwJTIwJTVEJTJDJTBBJTIwJTIwJTIwJTIwdGVtcGVyYXR1cmUlM0QwLjglMkMlMjAlMjAlMjMlMjBIaWdoZXIlMjBmb3IlMjBtb3JlJTIwY3JlYXRpdml0eSUwQSUyMCUyMCUyMCUyMHRvcF9wJTNEMC45NSUyQyUyMCUyMCUyMyUyME51Y2xldXMlMjBzYW1wbGluZyUyMHByb2JhYmlsaXR5JTBBJTIwJTIwJTIwJTIwZnJlcXVlbmN5X3BlbmFsdHklM0QwLjUlMkMlMjAlMjAlMjMlMjBSZWR1Y2UlMjByZXBldGl0aW9uJTIwb2YlMjBmcmVxdWVudCUyMHRva2VucyUwQSUyMCUyMCUyMCUyMHByZXNlbmNlX3BlbmFsdHklM0QwLjUlMkMlMjAlMjAlMjMlMjBSZWR1Y2UlMjByZXBldGl0aW9uJTIwYnklMjBwZW5hbGl6aW5nJTIwdG9rZW5zJTIwYWxyZWFkeSUyMHByZXNlbnQlMEElMjAlMjAlMjAlMjBtYXhfdG9rZW5zJTNEMjAwJTJDJTIwJTIwJTIzJTIwTWF4aW11bSUyMGdlbmVyYXRpb24lMjBsZW5ndGglMEEpJTBBcHJpbnQocmVzcG9uc2UuY2hvaWNlcyU1QjAlNUQubWVzc2FnZS5jb250ZW50KQ==",highlighted:`<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

client = OpenAI(base_url=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>, api_key=<span class="hljs-string">&quot;sk-no-key-required&quot;</span>)

<span class="hljs-comment"># Advanced parameters example</span>
response = client.chat.completions.create(
    model=<span class="hljs-string">&quot;smollm2-1.7b-instruct&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;You are a creative storyteller.&quot;</span>},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Write a creative story&quot;</span>},
    ],
    temperature=<span class="hljs-number">0.8</span>,  <span class="hljs-comment"># Higher for more creativity</span>
    top_p=<span class="hljs-number">0.95</span>,  <span class="hljs-comment"># Nucleus sampling probability</span>
    frequency_penalty=<span class="hljs-number">0.5</span>,  <span class="hljs-comment"># Reduce repetition of frequent tokens</span>
    presence_penalty=<span class="hljs-number">0.5</span>,  <span class="hljs-comment"># Reduce repetition by penalizing tokens already present</span>
    max_tokens=<span class="hljs-number">200</span>,  <span class="hljs-comment"># Maximum generation length</span>
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)`,wrap:!1}}),Y=new V({props:{code:"JTIzJTIwVXNpbmclMjBsbGFtYS1jcHAtcHl0aG9uJTIwcGFja2FnZSUyMGZvciUyMGRpcmVjdCUyMG1vZGVsJTIwYWNjZXNzJTBBZnJvbSUyMGxsYW1hX2NwcCUyMGltcG9ydCUyMExsYW1hJTBBJTBBJTIzJTIwTG9hZCUyMHRoZSUyMG1vZGVsJTBBbGxtJTIwJTNEJTIwTGxhbWEoJTBBJTIwJTIwJTIwJTIwbW9kZWxfcGF0aCUzRCUyMnNtb2xsbTItMS43Yi1pbnN0cnVjdC5RNF9LX00uZ2d1ZiUyMiUyQyUwQSUyMCUyMCUyMCUyMG5fY3R4JTNENDA5NiUyQyUyMCUyMCUyMyUyMENvbnRleHQlMjB3aW5kb3clMjBzaXplJTBBJTIwJTIwJTIwJTIwbl90aHJlYWRzJTNEOCUyQyUyMCUyMCUyMyUyMENQVSUyMHRocmVhZHMlMEElMjAlMjAlMjAlMjBuX2dwdV9sYXllcnMlM0QwJTJDJTIwJTIwJTIzJTIwR1BVJTIwbGF5ZXJzJTIwKDAlMjAlM0QlMjBDUFUlMjBvbmx5KSUwQSklMEElMEElMjMlMjBGb3JtYXQlMjBwcm9tcHQlMjBhY2NvcmRpbmclMjB0byUyMHRoZSUyMG1vZGVsJ3MlMjBleHBlY3RlZCUyMGZvcm1hdCUwQXByb21wdCUyMCUzRCUyMCUyMiUyMiUyMiUzQyU3Q2ltX3N0YXJ0JTdDJTNFc3lzdGVtJTBBWW91JTIwYXJlJTIwYSUyMGNyZWF0aXZlJTIwc3Rvcnl0ZWxsZXIuJTBBJTNDJTdDaW1fZW5kJTdDJTNFJTBBJTNDJTdDaW1fc3RhcnQlN0MlM0V1c2VyJTBBV3JpdGUlMjBhJTIwY3JlYXRpdmUlMjBzdG9yeSUwQSUzQyU3Q2ltX2VuZCU3QyUzRSUwQSUzQyU3Q2ltX3N0YXJ0JTdDJTNFYXNzaXN0YW50JTBBJTIyJTIyJTIyJTBBJTBBJTIzJTIwR2VuZXJhdGUlMjByZXNwb25zZSUyMHdpdGglMjBwcmVjaXNlJTIwcGFyYW1ldGVyJTIwY29udHJvbCUwQW91dHB1dCUyMCUzRCUyMGxsbSglMEElMjAlMjAlMjAlMjBwcm9tcHQlMkMlMEElMjAlMjAlMjAlMjBtYXhfdG9rZW5zJTNEMjAwJTJDJTBBJTIwJTIwJTIwJTIwdGVtcGVyYXR1cmUlM0QwLjglMkMlMEElMjAlMjAlMjAlMjB0b3BfcCUzRDAuOTUlMkMlMEElMjAlMjAlMjAlMjBmcmVxdWVuY3lfcGVuYWx0eSUzRDAuNSUyQyUwQSUyMCUyMCUyMCUyMHByZXNlbmNlX3BlbmFsdHklM0QwLjUlMkMlMEElMjAlMjAlMjAlMjBzdG9wJTNEJTVCJTIyJTNDJTdDaW1fZW5kJTdDJTNFJTIyJTVEJTJDJTBBKSUwQSUwQXByaW50KG91dHB1dCU1QiUyMmNob2ljZXMlMjIlNUQlNUIwJTVEJTVCJTIydGV4dCUyMiU1RCk=",highlighted:`<span class="hljs-comment"># Using llama-cpp-python package for direct model access</span>
<span class="hljs-keyword">from</span> llama_cpp <span class="hljs-keyword">import</span> Llama

<span class="hljs-comment"># Load the model</span>
llm = Llama(
    model_path=<span class="hljs-string">&quot;smollm2-1.7b-instruct.Q4_K_M.gguf&quot;</span>,
    n_ctx=<span class="hljs-number">4096</span>,  <span class="hljs-comment"># Context window size</span>
    n_threads=<span class="hljs-number">8</span>,  <span class="hljs-comment"># CPU threads</span>
    n_gpu_layers=<span class="hljs-number">0</span>,  <span class="hljs-comment"># GPU layers (0 = CPU only)</span>
)

<span class="hljs-comment"># Format prompt according to the model&#x27;s expected format</span>
prompt = <span class="hljs-string">&quot;&quot;&quot;&lt;|im_start|&gt;system
You are a creative storyteller.
&lt;|im_end|&gt;
&lt;|im_start|&gt;user
Write a creative story
&lt;|im_end|&gt;
&lt;|im_start|&gt;assistant
&quot;&quot;&quot;</span>

<span class="hljs-comment"># Generate response with precise parameter control</span>
output = llm(
    prompt,
    max_tokens=<span class="hljs-number">200</span>,
    temperature=<span class="hljs-number">0.8</span>,
    top_p=<span class="hljs-number">0.95</span>,
    frequency_penalty=<span class="hljs-number">0.5</span>,
    presence_penalty=<span class="hljs-number">0.5</span>,
    stop=[<span class="hljs-string">&quot;&lt;|im_end|&gt;&quot;</span>],
)

<span class="hljs-built_in">print</span>(output[<span class="hljs-string">&quot;choices&quot;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&quot;text&quot;</span>])`,wrap:!1}}),z=new V({props:{code:"ZnJvbSUyMGh1Z2dpbmdmYWNlX2h1YiUyMGltcG9ydCUyMEluZmVyZW5jZUNsaWVudCUwQSUwQWNsaWVudCUyMCUzRCUyMEluZmVyZW5jZUNsaWVudChtb2RlbCUzRCUyMmh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0E4MDAwJTJGdjElMjIpJTBBJTBBJTIzJTIwQWR2YW5jZWQlMjBwYXJhbWV0ZXJzJTIwZXhhbXBsZSUwQXJlc3BvbnNlJTIwJTNEJTIwY2xpZW50LmNoYXRfY29tcGxldGlvbiglMEElMjAlMjAlMjAlMjBtZXNzYWdlcyUzRCU1QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3QiUyMnJvbGUlMjIlM0ElMjAlMjJzeXN0ZW0lMjIlMkMlMjAlMjJjb250ZW50JTIyJTNBJTIwJTIyWW91JTIwYXJlJTIwYSUyMGNyZWF0aXZlJTIwc3Rvcnl0ZWxsZXIuJTIyJTdEJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTdCJTIycm9sZSUyMiUzQSUyMCUyMnVzZXIlMjIlMkMlMjAlMjJjb250ZW50JTIyJTNBJTIwJTIyV3JpdGUlMjBhJTIwY3JlYXRpdmUlMjBzdG9yeSUyMiU3RCUyQyUwQSUyMCUyMCUyMCUyMCU1RCUyQyUwQSUyMCUyMCUyMCUyMHRlbXBlcmF0dXJlJTNEMC44JTJDJTBBJTIwJTIwJTIwJTIwbWF4X3Rva2VucyUzRDIwMCUyQyUwQSUyMCUyMCUyMCUyMHRvcF9wJTNEMC45NSUyQyUwQSklMEFwcmludChyZXNwb25zZS5jaG9pY2VzJTVCMCU1RC5tZXNzYWdlLmNvbnRlbnQpJTBBJTBBJTIzJTIwRm9yJTIwZGlyZWN0JTIwdGV4dCUyMGdlbmVyYXRpb24lMEFyZXNwb25zZSUyMCUzRCUyMGNsaWVudC50ZXh0X2dlbmVyYXRpb24oJTBBJTIwJTIwJTIwJTIwJTIyV3JpdGUlMjBhJTIwY3JlYXRpdmUlMjBzdG9yeSUyMGFib3V0JTIwc3BhY2UlMjBleHBsb3JhdGlvbiUyMiUyQyUwQSUyMCUyMCUyMCUyMG1heF9uZXdfdG9rZW5zJTNEMjAwJTJDJTBBJTIwJTIwJTIwJTIwdGVtcGVyYXR1cmUlM0QwLjglMkMlMEElMjAlMjAlMjAlMjB0b3BfcCUzRDAuOTUlMkMlMEElMjAlMjAlMjAlMjBkZXRhaWxzJTNEVHJ1ZSUyQyUwQSklMEFwcmludChyZXNwb25zZS5nZW5lcmF0ZWRfdGV4dCk=",highlighted:`<span class="hljs-keyword">from</span> huggingface_hub <span class="hljs-keyword">import</span> InferenceClient

client = InferenceClient(model=<span class="hljs-string">&quot;http://localhost:8000/v1&quot;</span>)

<span class="hljs-comment"># Advanced parameters example</span>
response = client.chat_completion(
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;You are a creative storyteller.&quot;</span>},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Write a creative story&quot;</span>},
    ],
    temperature=<span class="hljs-number">0.8</span>,
    max_tokens=<span class="hljs-number">200</span>,
    top_p=<span class="hljs-number">0.95</span>,
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)

<span class="hljs-comment"># For direct text generation</span>
response = client.text_generation(
    <span class="hljs-string">&quot;Write a creative story about space exploration&quot;</span>,
    max_new_tokens=<span class="hljs-number">200</span>,
    temperature=<span class="hljs-number">0.8</span>,
    top_p=<span class="hljs-number">0.95</span>,
    details=<span class="hljs-literal">True</span>,
)
<span class="hljs-built_in">print</span>(response.generated_text)`,wrap:!1}}),F=new V({props:{code:"ZnJvbSUyMG9wZW5haSUyMGltcG9ydCUyME9wZW5BSSUwQSUwQWNsaWVudCUyMCUzRCUyME9wZW5BSShiYXNlX3VybCUzRCUyMmh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlM0E4MDAwJTJGdjElMjIlMkMlMjBhcGlfa2V5JTNEJTIybm90LW5lZWRlZCUyMiklMEElMEElMjMlMjBBZHZhbmNlZCUyMHBhcmFtZXRlcnMlMjBleGFtcGxlJTBBcmVzcG9uc2UlMjAlM0QlMjBjbGllbnQuY2hhdC5jb21wbGV0aW9ucy5jcmVhdGUoJTBBJTIwJTIwJTIwJTIwbW9kZWwlM0QlMjJIdWdnaW5nRmFjZVRCJTJGU21vbExNMi0zNjBNLUluc3RydWN0JTIyJTJDJTBBJTIwJTIwJTIwJTIwbWVzc2FnZXMlM0QlNUIlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0IlMjJyb2xlJTIyJTNBJTIwJTIyc3lzdGVtJTIyJTJDJTIwJTIyY29udGVudCUyMiUzQSUyMCUyMllvdSUyMGFyZSUyMGElMjBjcmVhdGl2ZSUyMHN0b3J5dGVsbGVyLiUyMiU3RCUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3QiUyMnJvbGUlMjIlM0ElMjAlMjJ1c2VyJTIyJTJDJTIwJTIyY29udGVudCUyMiUzQSUyMCUyMldyaXRlJTIwYSUyMGNyZWF0aXZlJTIwc3RvcnklMjIlN0QlMkMlMEElMjAlMjAlMjAlMjAlNUQlMkMlMEElMjAlMjAlMjAlMjB0ZW1wZXJhdHVyZSUzRDAuOCUyQyUwQSUyMCUyMCUyMCUyMHRvcF9wJTNEMC45NSUyQyUwQSUyMCUyMCUyMCUyMG1heF90b2tlbnMlM0QyMDAlMkMlMEEpJTBBcHJpbnQocmVzcG9uc2UuY2hvaWNlcyU1QjAlNUQubWVzc2FnZS5jb250ZW50KQ==",highlighted:`<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

client = OpenAI(base_url=<span class="hljs-string">&quot;http://localhost:8000/v1&quot;</span>, api_key=<span class="hljs-string">&quot;not-needed&quot;</span>)

<span class="hljs-comment"># Advanced parameters example</span>
response = client.chat.completions.create(
    model=<span class="hljs-string">&quot;HuggingFaceTB/SmolLM2-360M-Instruct&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;You are a creative storyteller.&quot;</span>},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Write a creative story&quot;</span>},
    ],
    temperature=<span class="hljs-number">0.8</span>,
    top_p=<span class="hljs-number">0.95</span>,
    max_tokens=<span class="hljs-number">200</span>,
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)`,wrap:!1}}),Ml=new V({props:{code:"ZnJvbSUyMHZsbG0lMjBpbXBvcnQlMjBMTE0lMkMlMjBTYW1wbGluZ1BhcmFtcyUwQSUwQSUyMyUyMEluaXRpYWxpemUlMjB0aGUlMjBtb2RlbCUyMHdpdGglMjBhZHZhbmNlZCUyMHBhcmFtZXRlcnMlMEFsbG0lMjAlM0QlMjBMTE0oJTBBJTIwJTIwJTIwJTIwbW9kZWwlM0QlMjJIdWdnaW5nRmFjZVRCJTJGU21vbExNMi0zNjBNLUluc3RydWN0JTIyJTJDJTBBJTIwJTIwJTIwJTIwZ3B1X21lbW9yeV91dGlsaXphdGlvbiUzRDAuODUlMkMlMEElMjAlMjAlMjAlMjBtYXhfbnVtX2JhdGNoZWRfdG9rZW5zJTNEODE5MiUyQyUwQSUyMCUyMCUyMCUyMG1heF9udW1fc2VxcyUzRDI1NiUyQyUwQSUyMCUyMCUyMCUyMGJsb2NrX3NpemUlM0QxNiUyQyUwQSklMEElMEElMjMlMjBDb25maWd1cmUlMjBzYW1wbGluZyUyMHBhcmFtZXRlcnMlMEFzYW1wbGluZ19wYXJhbXMlMjAlM0QlMjBTYW1wbGluZ1BhcmFtcyglMEElMjAlMjAlMjAlMjB0ZW1wZXJhdHVyZSUzRDAuOCUyQyUyMCUyMCUyMyUyMEhpZ2hlciUyMGZvciUyMG1vcmUlMjBjcmVhdGl2aXR5JTBBJTIwJTIwJTIwJTIwdG9wX3AlM0QwLjk1JTJDJTIwJTIwJTIzJTIwQ29uc2lkZXIlMjB0b3AlMjA5NSUyNSUyMHByb2JhYmlsaXR5JTIwbWFzcyUwQSUyMCUyMCUyMCUyMG1heF90b2tlbnMlM0QxMDAlMkMlMjAlMjAlMjMlMjBNYXhpbXVtJTIwbGVuZ3RoJTBBJTIwJTIwJTIwJTIwcHJlc2VuY2VfcGVuYWx0eSUzRDEuMSUyQyUyMCUyMCUyMyUyMFJlZHVjZSUyMHJlcGV0aXRpb24lMEElMjAlMjAlMjAlMjBmcmVxdWVuY3lfcGVuYWx0eSUzRDEuMSUyQyUyMCUyMCUyMyUyMFJlZHVjZSUyMHJlcGV0aXRpb24lMEElMjAlMjAlMjAlMjBzdG9wJTNEJTVCJTIyJTVDbiU1Q24lMjIlMkMlMjAlMjIlMjMlMjMlMjMlMjIlNUQlMkMlMjAlMjAlMjMlMjBTdG9wJTIwc2VxdWVuY2VzJTBBKSUwQSUwQSUyMyUyMEdlbmVyYXRlJTIwdGV4dCUwQXByb21wdCUyMCUzRCUyMCUyMldyaXRlJTIwYSUyMGNyZWF0aXZlJTIwc3RvcnklMjIlMEFvdXRwdXRzJTIwJTNEJTIwbGxtLmdlbmVyYXRlKHByb21wdCUyQyUyMHNhbXBsaW5nX3BhcmFtcyklMEFwcmludChvdXRwdXRzJTVCMCU1RC5vdXRwdXRzJTVCMCU1RC50ZXh0KSUwQSUwQSUyMyUyMEZvciUyMGNoYXQtc3R5bGUlMjBpbnRlcmFjdGlvbnMlMEFjaGF0X3Byb21wdCUyMCUzRCUyMCU1QiUwQSUyMCUyMCUyMCUyMCU3QiUyMnJvbGUlMjIlM0ElMjAlMjJzeXN0ZW0lMjIlMkMlMjAlMjJjb250ZW50JTIyJTNBJTIwJTIyWW91JTIwYXJlJTIwYSUyMGNyZWF0aXZlJTIwc3Rvcnl0ZWxsZXIuJTIyJTdEJTJDJTBBJTIwJTIwJTIwJTIwJTdCJTIycm9sZSUyMiUzQSUyMCUyMnVzZXIlMjIlMkMlMjAlMjJjb250ZW50JTIyJTNBJTIwJTIyV3JpdGUlMjBhJTIwY3JlYXRpdmUlMjBzdG9yeSUyMiU3RCUyQyUwQSU1RCUwQWZvcm1hdHRlZF9wcm9tcHQlMjAlM0QlMjBsbG0uZ2V0X2NoYXRfdGVtcGxhdGUoKShjaGF0X3Byb21wdCklMjAlMjAlMjMlMjBVc2VzJTIwbW9kZWwncyUyMGNoYXQlMjB0ZW1wbGF0ZSUwQW91dHB1dHMlMjAlM0QlMjBsbG0uZ2VuZXJhdGUoZm9ybWF0dGVkX3Byb21wdCUyQyUyMHNhbXBsaW5nX3BhcmFtcyklMEFwcmludChvdXRwdXRzJTVCMCU1RC5vdXRwdXRzJTVCMCU1RC50ZXh0KQ==",highlighted:`<span class="hljs-keyword">from</span> vllm <span class="hljs-keyword">import</span> LLM, SamplingParams

<span class="hljs-comment"># Initialize the model with advanced parameters</span>
llm = LLM(
    model=<span class="hljs-string">&quot;HuggingFaceTB/SmolLM2-360M-Instruct&quot;</span>,
    gpu_memory_utilization=<span class="hljs-number">0.85</span>,
    max_num_batched_tokens=<span class="hljs-number">8192</span>,
    max_num_seqs=<span class="hljs-number">256</span>,
    block_size=<span class="hljs-number">16</span>,
)

<span class="hljs-comment"># Configure sampling parameters</span>
sampling_params = SamplingParams(
    temperature=<span class="hljs-number">0.8</span>,  <span class="hljs-comment"># Higher for more creativity</span>
    top_p=<span class="hljs-number">0.95</span>,  <span class="hljs-comment"># Consider top 95% probability mass</span>
    max_tokens=<span class="hljs-number">100</span>,  <span class="hljs-comment"># Maximum length</span>
    presence_penalty=<span class="hljs-number">1.1</span>,  <span class="hljs-comment"># Reduce repetition</span>
    frequency_penalty=<span class="hljs-number">1.1</span>,  <span class="hljs-comment"># Reduce repetition</span>
    stop=[<span class="hljs-string">&quot;\\n\\n&quot;</span>, <span class="hljs-string">&quot;###&quot;</span>],  <span class="hljs-comment"># Stop sequences</span>
)

<span class="hljs-comment"># Generate text</span>
prompt = <span class="hljs-string">&quot;Write a creative story&quot;</span>
outputs = llm.generate(prompt, sampling_params)
<span class="hljs-built_in">print</span>(outputs[<span class="hljs-number">0</span>].outputs[<span class="hljs-number">0</span>].text)

<span class="hljs-comment"># For chat-style interactions</span>
chat_prompt = [
    {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;You are a creative storyteller.&quot;</span>},
    {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Write a creative story&quot;</span>},
]
formatted_prompt = llm.get_chat_template()(chat_prompt)  <span class="hljs-comment"># Uses model&#x27;s chat template</span>
outputs = llm.generate(formatted_prompt, sampling_params)
<span class="hljs-built_in">print</span>(outputs[<span class="hljs-number">0</span>].outputs[<span class="hljs-number">0</span>].text)`,wrap:!1}}),{c(){y=k(`<hfoption value="tgi" label="TGI">
`),r=w("p"),r.textContent=U,J=o(),g(j.$$.fragment),c=o(),m=w("p"),m.textContent=I,s=o(),g(p.$$.fragment),Q=o(),T=w("p"),T.textContent=W,H=o(),g(S.$$.fragment),ll=k(`
</hfoption>
<hfoption value="llama.cpp" label="llama.cpp">
`),N=w("p"),N.textContent=pl,D=o(),g(E.$$.fragment),el=o(),X=w("p"),X.textContent=u,$=o(),g(x.$$.fragment),ol=o(),tl=w("p"),tl.textContent=P,hl=o(),g(q.$$.fragment),il=o(),sl=w("p"),sl.textContent=K,Il=o(),g(Y.$$.fragment),yl=k(`
</hfoption>
<hfoption value="vllm" label="vLLM">
`),nl=w("p"),nl.textContent=O,bl=o(),g(z.$$.fragment),al=o(),_=w("p"),_.textContent=jl,dl=o(),g(F.$$.fragment),cl=o(),rl=w("p"),rl.textContent=Jl,ml=o(),g(Ml.$$.fragment),L=k(`
</hfoption>`)},l(a){y=R(a,`<hfoption value="tgi" label="TGI">
`),r=h(a,"P",{"data-svelte-h":!0}),f(r)!=="svelte-p4nmid"&&(r.textContent=U),J=i(a),B(j.$$.fragment,a),c=i(a),m=h(a,"P",{"data-svelte-h":!0}),f(m)!=="svelte-8cq2xt"&&(m.textContent=I),s=i(a),B(p.$$.fragment,a),Q=i(a),T=h(a,"P",{"data-svelte-h":!0}),f(T)!=="svelte-gwduza"&&(T.textContent=W),H=i(a),B(S.$$.fragment,a),ll=R(a,`
</hfoption>
<hfoption value="llama.cpp" label="llama.cpp">
`),N=h(a,"P",{"data-svelte-h":!0}),f(N)!=="svelte-b43ol"&&(N.textContent=pl),D=i(a),B(E.$$.fragment,a),el=i(a),X=h(a,"P",{"data-svelte-h":!0}),f(X)!=="svelte-u8i4ra"&&(X.textContent=u),$=i(a),B(x.$$.fragment,a),ol=i(a),tl=h(a,"P",{"data-svelte-h":!0}),f(tl)!=="svelte-1jxmijw"&&(tl.textContent=P),hl=i(a),B(q.$$.fragment,a),il=i(a),sl=h(a,"P",{"data-svelte-h":!0}),f(sl)!=="svelte-1yadfem"&&(sl.textContent=K),Il=i(a),B(Y.$$.fragment,a),yl=R(a,`
</hfoption>
<hfoption value="vllm" label="vLLM">
`),nl=h(a,"P",{"data-svelte-h":!0}),f(nl)!=="svelte-jbmhsw"&&(nl.textContent=O),bl=i(a),B(z.$$.fragment,a),al=i(a),_=h(a,"P",{"data-svelte-h":!0}),f(_)!=="svelte-m9xqnx"&&(_.textContent=jl),dl=i(a),B(F.$$.fragment,a),cl=i(a),rl=h(a,"P",{"data-svelte-h":!0}),f(rl)!=="svelte-1xs95kf"&&(rl.textContent=Jl),ml=i(a),B(Ml.$$.fragment,a),L=R(a,`
</hfoption>`)},m(a,b){t(a,y,b),t(a,r,b),t(a,J,b),G(j,a,b),t(a,c,b),t(a,m,b),t(a,s,b),G(p,a,b),t(a,Q,b),t(a,T,b),t(a,H,b),G(S,a,b),t(a,ll,b),t(a,N,b),t(a,D,b),G(E,a,b),t(a,el,b),t(a,X,b),t(a,$,b),G(x,a,b),t(a,ol,b),t(a,tl,b),t(a,hl,b),G(q,a,b),t(a,il,b),t(a,sl,b),t(a,Il,b),G(Y,a,b),t(a,yl,b),t(a,nl,b),t(a,bl,b),G(z,a,b),t(a,al,b),t(a,_,b),t(a,dl,b),G(F,a,b),t(a,cl,b),t(a,rl,b),t(a,ml,b),G(Ml,a,b),t(a,L,b),Cl=!0},p:Gl,i(a){Cl||(d(j.$$.fragment,a),d(p.$$.fragment,a),d(S.$$.fragment,a),d(E.$$.fragment,a),d(x.$$.fragment,a),d(q.$$.fragment,a),d(Y.$$.fragment,a),d(z.$$.fragment,a),d(F.$$.fragment,a),d(Ml.$$.fragment,a),Cl=!0)},o(a){C(j.$$.fragment,a),C(p.$$.fragment,a),C(S.$$.fragment,a),C(E.$$.fragment,a),C(x.$$.fragment,a),C(q.$$.fragment,a),C(Y.$$.fragment,a),C(z.$$.fragment,a),C(F.$$.fragment,a),C(Ml.$$.fragment,a),Cl=!1},d(a){a&&(e(y),e(r),e(J),e(c),e(m),e(s),e(Q),e(T),e(H),e(ll),e(N),e(D),e(el),e(X),e($),e(ol),e(tl),e(hl),e(il),e(sl),e(Il),e(yl),e(nl),e(bl),e(al),e(_),e(dl),e(cl),e(rl),e(ml),e(L)),Z(j,a),Z(p,a),Z(S,a),Z(E,a),Z(x,a),Z(q,a),Z(Y,a),Z(z,a),Z(F,a),Z(Ml,a)}}}function mt(A){let y,r,U,J,j,c,m,I;return r=new V({props:{code:"Y2xpZW50LmdlbmVyYXRlKCUwQSUyMCUyMCUyMCUyMCUyMldyaXRlJTIwYSUyMGNyZWF0aXZlJTIwc3RvcnklMjIlMkMlMEElMjAlMjAlMjAlMjB0ZW1wZXJhdHVyZSUzRDAuOCUyQyUyMCUyMCUyMyUyMEhpZ2hlciUyMGZvciUyMG1vcmUlMjBjcmVhdGl2aXR5JTBBJTIwJTIwJTIwJTIwdG9wX3AlM0QwLjk1JTJDJTIwJTIwJTIzJTIwQ29uc2lkZXIlMjB0b3AlMjA5NSUyNSUyMHByb2JhYmlsaXR5JTIwbWFzcyUwQSUyMCUyMCUyMCUyMHRvcF9rJTNENTAlMkMlMjAlMjAlMjMlMjBDb25zaWRlciUyMHRvcCUyMDUwJTIwdG9rZW5zJTBBJTIwJTIwJTIwJTIwbWF4X25ld190b2tlbnMlM0QxMDAlMkMlMjAlMjAlMjMlMjBNYXhpbXVtJTIwbGVuZ3RoJTBBJTIwJTIwJTIwJTIwcmVwZXRpdGlvbl9wZW5hbHR5JTNEMS4xJTJDJTIwJTIwJTIzJTIwUmVkdWNlJTIwcmVwZXRpdGlvbiUwQSk=",highlighted:`client.generate(
    <span class="hljs-string">&quot;Write a creative story&quot;</span>,
    temperature=<span class="hljs-number">0.8</span>,  <span class="hljs-comment"># Higher for more creativity</span>
    top_p=<span class="hljs-number">0.95</span>,  <span class="hljs-comment"># Consider top 95% probability mass</span>
    top_k=<span class="hljs-number">50</span>,  <span class="hljs-comment"># Consider top 50 tokens</span>
    max_new_tokens=<span class="hljs-number">100</span>,  <span class="hljs-comment"># Maximum length</span>
    repetition_penalty=<span class="hljs-number">1.1</span>,  <span class="hljs-comment"># Reduce repetition</span>
)`,wrap:!1}}),J=new V({props:{code:"JTIzJTIwVmlhJTIwT3BlbkFJJTIwQVBJJTIwY29tcGF0aWJpbGl0eSUwQXJlc3BvbnNlJTIwJTNEJTIwY2xpZW50LmNvbXBsZXRpb25zLmNyZWF0ZSglMEElMjAlMjAlMjAlMjBtb2RlbCUzRCUyMnNtb2xsbTItMS43Yi1pbnN0cnVjdCUyMiUyQyUyMCUyMCUyMyUyME1vZGVsJTIwbmFtZSUyMChjYW4lMjBiZSUyMGFueSUyMHN0cmluZyUyMGZvciUyMGxsYW1hLmNwcCUyMHNlcnZlciklMEElMjAlMjAlMjAlMjBwcm9tcHQlM0QlMjJXcml0ZSUyMGElMjBjcmVhdGl2ZSUyMHN0b3J5JTIyJTJDJTBBJTIwJTIwJTIwJTIwdGVtcGVyYXR1cmUlM0QwLjglMkMlMjAlMjAlMjMlMjBIaWdoZXIlMjBmb3IlMjBtb3JlJTIwY3JlYXRpdml0eSUwQSUyMCUyMCUyMCUyMHRvcF9wJTNEMC45NSUyQyUyMCUyMCUyMyUyMENvbnNpZGVyJTIwdG9wJTIwOTUlMjUlMjBwcm9iYWJpbGl0eSUyMG1hc3MlMEElMjAlMjAlMjAlMjBmcmVxdWVuY3lfcGVuYWx0eSUzRDEuMSUyQyUyMCUyMCUyMyUyMFJlZHVjZSUyMHJlcGV0aXRpb24lMEElMjAlMjAlMjAlMjBwcmVzZW5jZV9wZW5hbHR5JTNEMC4xJTJDJTIwJTIwJTIzJTIwUmVkdWNlJTIwcmVwZXRpdGlvbiUwQSUyMCUyMCUyMCUyMG1heF90b2tlbnMlM0QxMDAlMkMlMjAlMjAlMjMlMjBNYXhpbXVtJTIwbGVuZ3RoJTBBKSUwQSUwQSUyMyUyMFZpYSUyMGxsYW1hLWNwcC1weXRob24lMjBkaXJlY3QlMjBhY2Nlc3MlMEFvdXRwdXQlMjAlM0QlMjBsbG0oJTBBJTIwJTIwJTIwJTIwJTIyV3JpdGUlMjBhJTIwY3JlYXRpdmUlMjBzdG9yeSUyMiUyQyUwQSUyMCUyMCUyMCUyMHRlbXBlcmF0dXJlJTNEMC44JTJDJTBBJTIwJTIwJTIwJTIwdG9wX3AlM0QwLjk1JTJDJTBBJTIwJTIwJTIwJTIwdG9wX2slM0Q1MCUyQyUwQSUyMCUyMCUyMCUyMG1heF90b2tlbnMlM0QxMDAlMkMlMEElMjAlMjAlMjAlMjByZXBlYXRfcGVuYWx0eSUzRDEuMSUyQyUwQSk=",highlighted:`<span class="hljs-comment"># Via OpenAI API compatibility</span>
response = client.completions.create(
    model=<span class="hljs-string">&quot;smollm2-1.7b-instruct&quot;</span>,  <span class="hljs-comment"># Model name (can be any string for llama.cpp server)</span>
    prompt=<span class="hljs-string">&quot;Write a creative story&quot;</span>,
    temperature=<span class="hljs-number">0.8</span>,  <span class="hljs-comment"># Higher for more creativity</span>
    top_p=<span class="hljs-number">0.95</span>,  <span class="hljs-comment"># Consider top 95% probability mass</span>
    frequency_penalty=<span class="hljs-number">1.1</span>,  <span class="hljs-comment"># Reduce repetition</span>
    presence_penalty=<span class="hljs-number">0.1</span>,  <span class="hljs-comment"># Reduce repetition</span>
    max_tokens=<span class="hljs-number">100</span>,  <span class="hljs-comment"># Maximum length</span>
)

<span class="hljs-comment"># Via llama-cpp-python direct access</span>
output = llm(
    <span class="hljs-string">&quot;Write a creative story&quot;</span>,
    temperature=<span class="hljs-number">0.8</span>,
    top_p=<span class="hljs-number">0.95</span>,
    top_k=<span class="hljs-number">50</span>,
    max_tokens=<span class="hljs-number">100</span>,
    repeat_penalty=<span class="hljs-number">1.1</span>,
)`,wrap:!1}}),c=new V({props:{code:"cGFyYW1zJTIwJTNEJTIwU2FtcGxpbmdQYXJhbXMoJTBBJTIwJTIwJTIwJTIwdGVtcGVyYXR1cmUlM0QwLjglMkMlMjAlMjAlMjMlMjBIaWdoZXIlMjBmb3IlMjBtb3JlJTIwY3JlYXRpdml0eSUwQSUyMCUyMCUyMCUyMHRvcF9wJTNEMC45NSUyQyUyMCUyMCUyMyUyMENvbnNpZGVyJTIwdG9wJTIwOTUlMjUlMjBwcm9iYWJpbGl0eSUyMG1hc3MlMEElMjAlMjAlMjAlMjB0b3BfayUzRDUwJTJDJTIwJTIwJTIzJTIwQ29uc2lkZXIlMjB0b3AlMjA1MCUyMHRva2VucyUwQSUyMCUyMCUyMCUyMG1heF90b2tlbnMlM0QxMDAlMkMlMjAlMjAlMjMlMjBNYXhpbXVtJTIwbGVuZ3RoJTBBJTIwJTIwJTIwJTIwcHJlc2VuY2VfcGVuYWx0eSUzRDAuMSUyQyUyMCUyMCUyMyUyMFJlZHVjZSUyMHJlcGV0aXRpb24lMEEpJTBBbGxtLmdlbmVyYXRlKCUyMldyaXRlJTIwYSUyMGNyZWF0aXZlJTIwc3RvcnklMjIlMkMlMjBzYW1wbGluZ19wYXJhbXMlM0RwYXJhbXMp",highlighted:`params = SamplingParams(
    temperature=<span class="hljs-number">0.8</span>,  <span class="hljs-comment"># Higher for more creativity</span>
    top_p=<span class="hljs-number">0.95</span>,  <span class="hljs-comment"># Consider top 95% probability mass</span>
    top_k=<span class="hljs-number">50</span>,  <span class="hljs-comment"># Consider top 50 tokens</span>
    max_tokens=<span class="hljs-number">100</span>,  <span class="hljs-comment"># Maximum length</span>
    presence_penalty=<span class="hljs-number">0.1</span>,  <span class="hljs-comment"># Reduce repetition</span>
)
llm.generate(<span class="hljs-string">&quot;Write a creative story&quot;</span>, sampling_params=params)`,wrap:!1}}),{c(){y=k(`<hfoption value="tgi" label="TGI">

	`),g(r.$$.fragment),U=k(`
</hfoption>
<hfoption value="llama.cpp" label="llama.cpp">

	`),g(J.$$.fragment),j=k(`
</hfoption>
<hfoption value="vllm" label="vLLM">

	`),g(c.$$.fragment),m=k(`
</hfoption>`)},l(s){y=R(s,`<hfoption value="tgi" label="TGI">

	`),B(r.$$.fragment,s),U=R(s,`
</hfoption>
<hfoption value="llama.cpp" label="llama.cpp">

	`),B(J.$$.fragment,s),j=R(s,`
</hfoption>
<hfoption value="vllm" label="vLLM">

	`),B(c.$$.fragment,s),m=R(s,`
</hfoption>`)},m(s,p){t(s,y,p),G(r,s,p),t(s,U,p),G(J,s,p),t(s,j,p),G(c,s,p),t(s,m,p),I=!0},p:Gl,i(s){I||(d(r.$$.fragment,s),d(J.$$.fragment,s),d(c.$$.fragment,s),I=!0)},o(s){C(r.$$.fragment,s),C(J.$$.fragment,s),C(c.$$.fragment,s),I=!1},d(s){s&&(e(y),e(U),e(j),e(m)),Z(r,s),Z(J,s),Z(c,s)}}}function Ut(A){let y,r,U,J,j,c,m,I;return r=new V({props:{code:"Y2xpZW50LmdlbmVyYXRlKCUwQSUyMCUyMCUyMCUyMCUyMldyaXRlJTIwYSUyMHZhcmllZCUyMHRleHQlMjIlMkMlMEElMjAlMjAlMjAlMjByZXBldGl0aW9uX3BlbmFsdHklM0QxLjElMkMlMjAlMjAlMjMlMjBQZW5hbGl6ZSUyMHJlcGVhdGVkJTIwdG9rZW5zJTBBJTIwJTIwJTIwJTIwbm9fcmVwZWF0X25ncmFtX3NpemUlM0QzJTJDJTIwJTIwJTIzJTIwUHJldmVudCUyMDMtZ3JhbSUyMHJlcGV0aXRpb24lMEEp",highlighted:`client.generate(
    <span class="hljs-string">&quot;Write a varied text&quot;</span>,
    repetition_penalty=<span class="hljs-number">1.1</span>,  <span class="hljs-comment"># Penalize repeated tokens</span>
    no_repeat_ngram_size=<span class="hljs-number">3</span>,  <span class="hljs-comment"># Prevent 3-gram repetition</span>
)`,wrap:!1}}),J=new V({props:{code:"JTIzJTIwVmlhJTIwT3BlbkFJJTIwQVBJJTBBcmVzcG9uc2UlMjAlM0QlMjBjbGllbnQuY29tcGxldGlvbnMuY3JlYXRlKCUwQSUyMCUyMCUyMCUyMG1vZGVsJTNEJTIyc21vbGxtMi0xLjdiLWluc3RydWN0JTIyJTJDJTBBJTIwJTIwJTIwJTIwcHJvbXB0JTNEJTIyV3JpdGUlMjBhJTIwdmFyaWVkJTIwdGV4dCUyMiUyQyUwQSUyMCUyMCUyMCUyMGZyZXF1ZW5jeV9wZW5hbHR5JTNEMS4xJTJDJTIwJTIwJTIzJTIwUGVuYWxpemUlMjBmcmVxdWVudCUyMHRva2VucyUwQSUyMCUyMCUyMCUyMHByZXNlbmNlX3BlbmFsdHklM0QwLjglMkMlMjAlMjAlMjMlMjBQZW5hbGl6ZSUyMHRva2VucyUyMGFscmVhZHklMjBwcmVzZW50JTBBKSUwQSUwQSUyMyUyMFZpYSUyMGRpcmVjdCUyMGxpYnJhcnklMEFvdXRwdXQlMjAlM0QlMjBsbG0oJTBBJTIwJTIwJTIwJTIwJTIyV3JpdGUlMjBhJTIwdmFyaWVkJTIwdGV4dCUyMiUyQyUwQSUyMCUyMCUyMCUyMHJlcGVhdF9wZW5hbHR5JTNEMS4xJTJDJTIwJTIwJTIzJTIwUGVuYWxpemUlMjByZXBlYXRlZCUyMHRva2VucyUwQSUyMCUyMCUyMCUyMGZyZXF1ZW5jeV9wZW5hbHR5JTNEMC41JTJDJTIwJTIwJTIzJTIwQWRkaXRpb25hbCUyMGZyZXF1ZW5jeSUyMHBlbmFsdHklMEElMjAlMjAlMjAlMjBwcmVzZW5jZV9wZW5hbHR5JTNEMC41JTJDJTIwJTIwJTIzJTIwQWRkaXRpb25hbCUyMHByZXNlbmNlJTIwcGVuYWx0eSUwQSk=",highlighted:`<span class="hljs-comment"># Via OpenAI API</span>
response = client.completions.create(
    model=<span class="hljs-string">&quot;smollm2-1.7b-instruct&quot;</span>,
    prompt=<span class="hljs-string">&quot;Write a varied text&quot;</span>,
    frequency_penalty=<span class="hljs-number">1.1</span>,  <span class="hljs-comment"># Penalize frequent tokens</span>
    presence_penalty=<span class="hljs-number">0.8</span>,  <span class="hljs-comment"># Penalize tokens already present</span>
)

<span class="hljs-comment"># Via direct library</span>
output = llm(
    <span class="hljs-string">&quot;Write a varied text&quot;</span>,
    repeat_penalty=<span class="hljs-number">1.1</span>,  <span class="hljs-comment"># Penalize repeated tokens</span>
    frequency_penalty=<span class="hljs-number">0.5</span>,  <span class="hljs-comment"># Additional frequency penalty</span>
    presence_penalty=<span class="hljs-number">0.5</span>,  <span class="hljs-comment"># Additional presence penalty</span>
)`,wrap:!1}}),c=new V({props:{code:"cGFyYW1zJTIwJTNEJTIwU2FtcGxpbmdQYXJhbXMoJTBBJTIwJTIwJTIwJTIwcHJlc2VuY2VfcGVuYWx0eSUzRDAuMSUyQyUyMCUyMCUyMyUyMFBlbmFsaXplJTIwdG9rZW4lMjBwcmVzZW5jZSUwQSUyMCUyMCUyMCUyMGZyZXF1ZW5jeV9wZW5hbHR5JTNEMC4xJTJDJTIwJTIwJTIzJTIwUGVuYWxpemUlMjB0b2tlbiUyMGZyZXF1ZW5jeSUwQSk=",highlighted:`params = SamplingParams(
    presence_penalty=<span class="hljs-number">0.1</span>,  <span class="hljs-comment"># Penalize token presence</span>
    frequency_penalty=<span class="hljs-number">0.1</span>,  <span class="hljs-comment"># Penalize token frequency</span>
)`,wrap:!1}}),{c(){y=k(`<hfoption value="tgi" label="TGI">

	`),g(r.$$.fragment),U=k(`
</hfoption>
<hfoption value="llama.cpp" label="llama.cpp">

	`),g(J.$$.fragment),j=k(`
</hfoption>
<hfoption value="vllm" label="vLLM">

	`),g(c.$$.fragment),m=k(`
</hfoption>`)},l(s){y=R(s,`<hfoption value="tgi" label="TGI">

	`),B(r.$$.fragment,s),U=R(s,`
</hfoption>
<hfoption value="llama.cpp" label="llama.cpp">

	`),B(J.$$.fragment,s),j=R(s,`
</hfoption>
<hfoption value="vllm" label="vLLM">

	`),B(c.$$.fragment,s),m=R(s,`
</hfoption>`)},m(s,p){t(s,y,p),G(r,s,p),t(s,U,p),G(J,s,p),t(s,j,p),G(c,s,p),t(s,m,p),I=!0},p:Gl,i(s){I||(d(r.$$.fragment,s),d(J.$$.fragment,s),d(c.$$.fragment,s),I=!0)},o(s){C(r.$$.fragment,s),C(J.$$.fragment,s),C(c.$$.fragment,s),I=!1},d(s){s&&(e(y),e(U),e(j),e(m)),Z(r,s),Z(J,s),Z(c,s)}}}function Tt(A){let y,r,U,J,j,c,m,I;return r=new V({props:{code:"Y2xpZW50LmdlbmVyYXRlKCUwQSUyMCUyMCUyMCUyMCUyMkdlbmVyYXRlJTIwYSUyMHNob3J0JTIwcGFyYWdyYXBoJTIyJTJDJTBBJTIwJTIwJTIwJTIwbWF4X25ld190b2tlbnMlM0QxMDAlMkMlMEElMjAlMjAlMjAlMjBtaW5fbmV3X3Rva2VucyUzRDEwJTJDJTBBJTIwJTIwJTIwJTIwc3RvcF9zZXF1ZW5jZXMlM0QlNUIlMjIlNUNuJTVDbiUyMiUyQyUyMCUyMiUyMyUyMyUyMyUyMiU1RCUyQyUwQSk=",highlighted:`client.generate(
    <span class="hljs-string">&quot;Generate a short paragraph&quot;</span>,
    max_new_tokens=<span class="hljs-number">100</span>,
    min_new_tokens=<span class="hljs-number">10</span>,
    stop_sequences=[<span class="hljs-string">&quot;\\n\\n&quot;</span>, <span class="hljs-string">&quot;###&quot;</span>],
)`,wrap:!1}}),J=new V({props:{code:"JTIzJTIwVmlhJTIwT3BlbkFJJTIwQVBJJTBBcmVzcG9uc2UlMjAlM0QlMjBjbGllbnQuY29tcGxldGlvbnMuY3JlYXRlKCUwQSUyMCUyMCUyMCUyMG1vZGVsJTNEJTIyc21vbGxtMi0xLjdiLWluc3RydWN0JTIyJTJDJTBBJTIwJTIwJTIwJTIwcHJvbXB0JTNEJTIyR2VuZXJhdGUlMjBhJTIwc2hvcnQlMjBwYXJhZ3JhcGglMjIlMkMlMEElMjAlMjAlMjAlMjBtYXhfdG9rZW5zJTNEMTAwJTJDJTBBJTIwJTIwJTIwJTIwc3RvcCUzRCU1QiUyMiU1Q24lNUNuJTIyJTJDJTIwJTIyJTIzJTIzJTIzJTIyJTVEJTJDJTBBKSUwQSUwQSUyMyUyMFZpYSUyMGRpcmVjdCUyMGxpYnJhcnklMEFvdXRwdXQlMjAlM0QlMjBsbG0oJTIyR2VuZXJhdGUlMjBhJTIwc2hvcnQlMjBwYXJhZ3JhcGglMjIlMkMlMjBtYXhfdG9rZW5zJTNEMTAwJTJDJTIwc3RvcCUzRCU1QiUyMiU1Q24lNUNuJTIyJTJDJTIwJTIyJTIzJTIzJTIzJTIyJTVEKQ==",highlighted:`<span class="hljs-comment"># Via OpenAI API</span>
response = client.completions.create(
    model=<span class="hljs-string">&quot;smollm2-1.7b-instruct&quot;</span>,
    prompt=<span class="hljs-string">&quot;Generate a short paragraph&quot;</span>,
    max_tokens=<span class="hljs-number">100</span>,
    stop=[<span class="hljs-string">&quot;\\n\\n&quot;</span>, <span class="hljs-string">&quot;###&quot;</span>],
)

<span class="hljs-comment"># Via direct library</span>
output = llm(<span class="hljs-string">&quot;Generate a short paragraph&quot;</span>, max_tokens=<span class="hljs-number">100</span>, stop=[<span class="hljs-string">&quot;\\n\\n&quot;</span>, <span class="hljs-string">&quot;###&quot;</span>])`,wrap:!1}}),c=new V({props:{code:"cGFyYW1zJTIwJTNEJTIwU2FtcGxpbmdQYXJhbXMoJTBBJTIwJTIwJTIwJTIwbWF4X3Rva2VucyUzRDEwMCUyQyUwQSUyMCUyMCUyMCUyMG1pbl90b2tlbnMlM0QxMCUyQyUwQSUyMCUyMCUyMCUyMHN0b3AlM0QlNUIlMjIlMjMlMjMlMjMlMjIlMkMlMjAlMjIlNUNuJTVDbiUyMiU1RCUyQyUwQSUyMCUyMCUyMCUyMGlnbm9yZV9lb3MlM0RGYWxzZSUyQyUwQSUyMCUyMCUyMCUyMHNraXBfc3BlY2lhbF90b2tlbnMlM0RUcnVlJTJDJTBBKQ==",highlighted:`params = SamplingParams(
    max_tokens=<span class="hljs-number">100</span>,
    min_tokens=<span class="hljs-number">10</span>,
    stop=[<span class="hljs-string">&quot;###&quot;</span>, <span class="hljs-string">&quot;\\n\\n&quot;</span>],
    ignore_eos=<span class="hljs-literal">False</span>,
    skip_special_tokens=<span class="hljs-literal">True</span>,
)`,wrap:!1}}),{c(){y=k(`<hfoption value="tgi" label="TGI">

	`),g(r.$$.fragment),U=k(`
</hfoption>
<hfoption value="llama.cpp" label="llama.cpp">

	`),g(J.$$.fragment),j=k(`
</hfoption>
<hfoption value="vllm" label="vLLM">

	`),g(c.$$.fragment),m=k(`
</hfoption>`)},l(s){y=R(s,`<hfoption value="tgi" label="TGI">

	`),B(r.$$.fragment,s),U=R(s,`
</hfoption>
<hfoption value="llama.cpp" label="llama.cpp">

	`),B(J.$$.fragment,s),j=R(s,`
</hfoption>
<hfoption value="vllm" label="vLLM">

	`),B(c.$$.fragment,s),m=R(s,`
</hfoption>`)},m(s,p){t(s,y,p),G(r,s,p),t(s,U,p),G(J,s,p),t(s,j,p),G(c,s,p),t(s,m,p),I=!0},p:Gl,i(s){I||(d(r.$$.fragment,s),d(J.$$.fragment,s),d(c.$$.fragment,s),I=!0)},o(s){C(r.$$.fragment,s),C(J.$$.fragment,s),C(c.$$.fragment,s),I=!1},d(s){s&&(e(y),e(U),e(j),e(m)),Z(r,s),Z(J,s),Z(c,s)}}}function jt(A){let y,r,U="TGI uses Flash Attention 2 and continuous batching:",J,j,c,m,I="llama.cpp uses quantization and optimized memory layout:",s,p,Q,T,W="For models too large for your GPU, you can use CPU offloading:",H,S,ll,N,pl="vLLM uses PagedAttention for optimal memory management:",D,E,el,X;return j=new V({props:{code:"JTIzJTIwRG9ja2VyJTIwZGVwbG95bWVudCUyMHdpdGglMjBtZW1vcnklMjBvcHRpbWl6YXRpb24lMEFkb2NrZXIlMjBydW4lMjAtLWdwdXMlMjBhbGwlMjAtcCUyMDgwODAlM0E4MCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tc2htLXNpemUlMjAxZyUyMCU1QyUwQSUyMCUyMCUyMCUyMGdoY3IuaW8lMkZodWdnaW5nZmFjZSUyRnRleHQtZ2VuZXJhdGlvbi1pbmZlcmVuY2UlM0FsYXRlc3QlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW1vZGVsLWlkJTIwSHVnZ2luZ0ZhY2VUQiUyRlNtb2xMTTItMS43Qi1JbnN0cnVjdCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tbWF4LWJhdGNoLXRvdGFsLXRva2VucyUyMDgxOTIlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW1heC1pbnB1dC1sZW5ndGglMjA0MDk2",highlighted:`<span class="hljs-comment"># Docker deployment with memory optimization</span>
docker run --gpus all -p 8080:80 \\
    --shm-size 1g \\
    ghcr.io/huggingface/text-generation-inference:latest \\
    --model-id HuggingFaceTB/SmolLM2-1.7B-Instruct \\
    --max-batch-total-tokens 8192 \\
    --max-input-length 4096`,wrap:!1}}),p=new V({props:{code:"JTIzJTIwU2VydmVyJTIwd2l0aCUyMG1lbW9yeSUyMG9wdGltaXphdGlvbnMlMEEuJTJGc2VydmVyJTIwJTVDJTBBJTIwJTIwJTIwJTIwLW0lMjBzbW9sbG0yLTEuN2ItaW5zdHJ1Y3QuUTRfS19NLmdndWYlMjAlNUMlMEElMjAlMjAlMjAlMjAtLWhvc3QlMjAwLjAuMC4wJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1wb3J0JTIwODA4MCUyMCU1QyUwQSUyMCUyMCUyMCUyMC1jJTIwMjA0OCUyMCU1QyUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMyUyMENvbnRleHQlMjBzaXplJTBBJTIwJTIwJTIwJTIwLS10aHJlYWRzJTIwNCUyMCU1QyUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMyUyMENQVSUyMHRocmVhZHMlMEElMjAlMjAlMjAlMjAtLW4tZ3B1LWxheWVycyUyMDMyJTIwJTVDJTIwJTIwJTIwJTIwJTIwJTIzJTIwVXNlJTIwbW9yZSUyMEdQVSUyMGxheWVycyUyMGZvciUyMGxhcmdlciUyMG1vZGVscyUwQSUyMCUyMCUyMCUyMC0tbWxvY2slMjAlNUMlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjMlMjBMb2NrJTIwbWVtb3J5JTIwdG8lMjBwcmV2ZW50JTIwc3dhcHBpbmclMEElMjAlMjAlMjAlMjAtLWNvbnQtYmF0Y2hpbmclMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjMlMjBFbmFibGUlMjBjb250aW51b3VzJTIwYmF0Y2hpbmc=",highlighted:`<span class="hljs-comment"># Server with memory optimizations</span>
./server \\
    -m smollm2-1.7b-instruct.Q4_K_M.gguf \\
    --host 0.0.0.0 \\
    --port 8080 \\
    -c 2048 \\               <span class="hljs-comment"># Context size</span>
    --threads 4 \\           <span class="hljs-comment"># CPU threads</span>
    --n-gpu-layers 32 \\     <span class="hljs-comment"># Use more GPU layers for larger models</span>
    --mlock \\               <span class="hljs-comment"># Lock memory to prevent swapping</span>
    --cont-batching         <span class="hljs-comment"># Enable continuous batching</span>`,wrap:!1}}),S=new V({props:{code:"LiUyRnNlcnZlciUyMCU1QyUwQSUyMCUyMCUyMCUyMC1tJTIwc21vbGxtMi0xLjdiLWluc3RydWN0LlE0X0tfTS5nZ3VmJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1uLWdwdS1sYXllcnMlMjAyMCUyMCU1QyUyMCUyMCUyMCUyMCUyMCUyMyUyMEtlZXAlMjBmaXJzdCUyMDIwJTIwbGF5ZXJzJTIwb24lMjBHUFUlMEElMjAlMjAlMjAlMjAtLXRocmVhZHMlMjA4JTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIzJTIwVXNlJTIwbW9yZSUyMENQVSUyMHRocmVhZHMlMjBmb3IlMjBDUFUlMjBsYXllcnM=",highlighted:`./server \\
    -m smollm2-1.7b-instruct.Q4_K_M.gguf \\
    --n-gpu-layers 20 \\     <span class="hljs-comment"># Keep first 20 layers on GPU</span>
    --threads 8             <span class="hljs-comment"># Use more CPU threads for CPU layers</span>`,wrap:!1}}),E=new V({props:{code:"ZnJvbSUyMHZsbG0uZW5naW5lLmFyZ191dGlscyUyMGltcG9ydCUyMEFzeW5jRW5naW5lQXJncyUwQSUwQWVuZ2luZV9hcmdzJTIwJTNEJTIwQXN5bmNFbmdpbmVBcmdzKCUwQSUyMCUyMCUyMCUyMG1vZGVsJTNEJTIySHVnZ2luZ0ZhY2VUQiUyRlNtb2xMTTItMS43Qi1JbnN0cnVjdCUyMiUyQyUwQSUyMCUyMCUyMCUyMGdwdV9tZW1vcnlfdXRpbGl6YXRpb24lM0QwLjg1JTJDJTBBJTIwJTIwJTIwJTIwbWF4X251bV9iYXRjaGVkX3Rva2VucyUzRDgxOTIlMkMlMEElMjAlMjAlMjAlMjBibG9ja19zaXplJTNEMTYlMkMlMEEpJTBBJTBBbGxtJTIwJTNEJTIwTExNKGVuZ2luZV9hcmdzJTNEZW5naW5lX2FyZ3Mp",highlighted:`<span class="hljs-keyword">from</span> vllm.engine.arg_utils <span class="hljs-keyword">import</span> AsyncEngineArgs

engine_args = AsyncEngineArgs(
    model=<span class="hljs-string">&quot;HuggingFaceTB/SmolLM2-1.7B-Instruct&quot;</span>,
    gpu_memory_utilization=<span class="hljs-number">0.85</span>,
    max_num_batched_tokens=<span class="hljs-number">8192</span>,
    block_size=<span class="hljs-number">16</span>,
)

llm = LLM(engine_args=engine_args)`,wrap:!1}}),{c(){y=k(`<hfoption value="tgi" label="TGI">
`),r=w("p"),r.textContent=U,J=o(),g(j.$$.fragment),c=k(`
</hfoption>
<hfoption value="llama.cpp" label="llama.cpp">
`),m=w("p"),m.textContent=I,s=o(),g(p.$$.fragment),Q=o(),T=w("p"),T.textContent=W,H=o(),g(S.$$.fragment),ll=k(`
</hfoption>
<hfoption value="vllm" label="vLLM">
`),N=w("p"),N.textContent=pl,D=o(),g(E.$$.fragment),el=k(`
</hfoption>`)},l(u){y=R(u,`<hfoption value="tgi" label="TGI">
`),r=h(u,"P",{"data-svelte-h":!0}),f(r)!=="svelte-1uwkewc"&&(r.textContent=U),J=i(u),B(j.$$.fragment,u),c=R(u,`
</hfoption>
<hfoption value="llama.cpp" label="llama.cpp">
`),m=h(u,"P",{"data-svelte-h":!0}),f(m)!=="svelte-f66vqu"&&(m.textContent=I),s=i(u),B(p.$$.fragment,u),Q=i(u),T=h(u,"P",{"data-svelte-h":!0}),f(T)!=="svelte-1m87csn"&&(T.textContent=W),H=i(u),B(S.$$.fragment,u),ll=R(u,`
</hfoption>
<hfoption value="vllm" label="vLLM">
`),N=h(u,"P",{"data-svelte-h":!0}),f(N)!=="svelte-6lsf9z"&&(N.textContent=pl),D=i(u),B(E.$$.fragment,u),el=R(u,`
</hfoption>`)},m(u,$){t(u,y,$),t(u,r,$),t(u,J,$),G(j,u,$),t(u,c,$),t(u,m,$),t(u,s,$),G(p,u,$),t(u,Q,$),t(u,T,$),t(u,H,$),G(S,u,$),t(u,ll,$),t(u,N,$),t(u,D,$),G(E,u,$),t(u,el,$),X=!0},p:Gl,i(u){X||(d(j.$$.fragment,u),d(p.$$.fragment,u),d(S.$$.fragment,u),d(E.$$.fragment,u),X=!0)},o(u){C(j.$$.fragment,u),C(p.$$.fragment,u),C(S.$$.fragment,u),C(E.$$.fragment,u),X=!1},d(u){u&&(e(y),e(r),e(J),e(c),e(m),e(s),e(Q),e(T),e(H),e(ll),e(N),e(D),e(el)),Z(j,u),Z(p,u),Z(S,u),Z(E,u)}}}function ut(A){let y,r,U,J,j,c,m,I,s,p="In this section, we’ll explore advanced frameworks for optimizing LLM deployments: Text Generation Inference (TGI), vLLM, and llama.cpp. These applications are primarily used in production environments to serve LLMs to users. This section focuses on how to deploy these frameworks in production rather than how to use them for inference on a single machine.",Q,T,W="We’ll cover how these tools maximize inference efficiency and simplify production deployments of Large Language Models.",H,S,ll,N,pl="TGI, vLLM, and llama.cpp serve similar purposes but have distinct characteristics that make them better suited for different use cases. Let’s look at the key differences between them, focusing on performance and integration.",D,E,el,X,u="<strong>TGI</strong> is designed to be stable and predictable in production, using fixed sequence lengths to keep memory usage consistent. TGI manages memory using Flash Attention 2 and continuous batching techniques. This means it can process attention calculations very efficiently and keep the GPU busy by constantly feeding it work. The system can move parts of the model between CPU and GPU when needed, which helps handle larger models.",$,x,ol,tl,P,hl,q,il="<strong>vLLM</strong> takes a different approach by using PagedAttention. Just like how a computer manages its memory in pages, vLLM splits the model’s memory into smaller blocks. This clever system means it can handle different-sized requests more flexibly and doesn’t waste memory space. It’s particularly good at sharing memory between different requests and reduces memory fragmentation, which makes the whole system more efficient.",sl,K,Il,Y,yl="<strong>llama.cpp</strong> is a highly optimized C/C++ implementation originally designed for running LLaMA models on consumer hardware. It focuses on CPU efficiency with optional GPU acceleration and is ideal for resource-constrained environments. llama.cpp uses quantization techniques to reduce model size and memory requirements while maintaining good performance. It implements optimized kernels for various CPU architectures and supports basic KV cache management for efficient token generation.",nl,O,bl,z,al,_,jl="Let’s move on to the deployment and integration differences between the frameworks.",dl,F,cl="<strong>TGI</strong> excels in enterprise-level deployment with its production-ready features. It comes with built-in Kubernetes support and includes everything you need for running in production, like monitoring through Prometheus and Grafana, automatic scaling, and comprehensive safety features. The system also includes enterprise-grade logging and various protective measures like content filtering and rate limiting to keep your deployment secure and stable.",rl,Jl,ml="<strong>vLLM</strong> takes a more flexible, developer-friendly approach to deployment. It’s built with Python at its core and can easily replace OpenAI’s API in your existing applications. The framework focuses on delivering raw performance and can be customized to fit your specific needs. It works particularly well with Ray for managing clusters, making it a great choice when you need high performance and adaptability.",Ml,L,Cl="<strong>llama.cpp</strong> prioritizes simplicity and portability. Its server implementation is lightweight and can run on a wide range of hardware, from powerful servers to consumer laptops and even some high-end mobile devices. With minimal dependencies and a simple C/C++ core, it’s easy to deploy in environments where installing Python frameworks would be challenging. The server provides an OpenAI-compatible API while maintaining a much smaller resource footprint than other solutions.",a,b,fl,Ul,Dl="Let’s explore how to use these frameworks for deploying LLMs, starting with installation and basic setup.",gl,Tl,Bl,ul,n,v,Ol,Sl,Ce="Let’s look at examples of text generation with the frameworks:",le,Zl,ee,El,te,$l,se,Nl,fe="The process of generating text involves selecting the next token at each step. This selection process can be controlled through various parameters:",ne,Xl,ge="<li><strong>Raw Logits</strong>: The initial output probabilities for each token</li> <li><strong>Temperature</strong>: Controls randomness in selection (higher = more creative)</li> <li><strong>Top-p (Nucleus) Sampling</strong>: Filters to top tokens making up X% of probability mass</li> <li><strong>Top-k Filtering</strong>: Limits selection to k most likely tokens</li>",ae,kl,Be="Here’s how to configure these parameters:",Me,vl,pe,Rl,oe,xl,Ge="Both frameworks provide ways to prevent repetitive text generation:",ie,Al,ye,ql,ce,Yl,Ze="You can control generation length and specify when to stop:",re,Ql,Je,zl,me,_l,ve="Both frameworks implement advanced memory management techniques for efficient inference.",Ue,Vl,Te,Fl,je,Ll,Ae='<li><a href="https://huggingface.co/docs/text-generation-inference" rel="nofollow">Text Generation Inference Documentation</a></li> <li><a href="https://github.com/huggingface/text-generation-inference" rel="nofollow">TGI GitHub Repository</a></li> <li><a href="https://vllm.readthedocs.io/" rel="nofollow">vLLM Documentation</a></li> <li><a href="https://github.com/vllm-project/vllm" rel="nofollow">vLLM GitHub Repository</a></li> <li><a href="https://arxiv.org/abs/2309.06180" rel="nofollow">PagedAttention Paper</a></li> <li><a href="https://github.com/ggerganov/llama.cpp" rel="nofollow">llama.cpp GitHub Repository</a></li> <li><a href="https://github.com/abetlen/llama-cpp-python" rel="nofollow">llama-cpp-python Repository</a></li>',ue,Pl,we;return j=new nt({props:{containerStyle:"float: right; margin-left: 10px; display: inline-flex; position: relative; z-index: 10;"}}),m=new wl({props:{title:"Optimized Inference Deployment",local:"optimized-inference-deployment",headingTag:"h1"}}),S=new wl({props:{title:"Framework Selection Guide",local:"framework-selection-guide",headingTag:"h2"}}),E=new wl({props:{title:"Memory Management and Performance",local:"memory-management-and-performance",headingTag:"h3"}}),P=new be({props:{title:"How Flash Attention Works",$$slots:{default:[it]},$$scope:{ctx:A}}}),K=new be({props:{title:"How PagedAttention Works",$$slots:{default:[yt]},$$scope:{ctx:A}}}),O=new be({props:{title:"How llama.cpp Quantization Works",$$slots:{default:[ct]},$$scope:{ctx:A}}}),z=new wl({props:{title:"Deployment and Integration",local:"deployment-and-integration",headingTag:"h3"}}),b=new wl({props:{title:"Getting Started",local:"getting-started",headingTag:"h2"}}),Tl=new wl({props:{title:"Installation and Basic Setup",local:"installation-and-basic-setup",headingTag:"h3"}}),ul=new Hl({props:{id:"inference-frameworks",options:[],$$slots:{default:[rt]},$$scope:{ctx:A}}}),v=new wl({props:{title:"Basic Text Generation",local:"basic-text-generation",headingTag:"h3"}}),Zl=new Hl({props:{id:"inference-frameworks",options:[],$$slots:{default:[Jt]},$$scope:{ctx:A}}}),El=new wl({props:{title:"Advanced Generation Control",local:"advanced-generation-control",headingTag:"h2"}}),$l=new wl({props:{title:"Token Selection and Sampling",local:"token-selection-and-sampling",headingTag:"h3"}}),vl=new Hl({props:{id:"inference-frameworks",options:[],$$slots:{default:[mt]},$$scope:{ctx:A}}}),Rl=new wl({props:{title:"Controlling Repetition",local:"controlling-repetition",headingTag:"h3"}}),Al=new Hl({props:{id:"inference-frameworks",options:[],$$slots:{default:[Ut]},$$scope:{ctx:A}}}),ql=new wl({props:{title:"Length Control and Stop Sequences",local:"length-control-and-stop-sequences",headingTag:"h3"}}),Ql=new Hl({props:{id:"inference-frameworks",options:[],$$slots:{default:[Tt]},$$scope:{ctx:A}}}),zl=new wl({props:{title:"Memory Management",local:"memory-management",headingTag:"h2"}}),Vl=new Hl({props:{id:"inference-frameworks",options:[],$$slots:{default:[jt]},$$scope:{ctx:A}}}),Fl=new wl({props:{title:"Resources",local:"resources",headingTag:"h2"}}),{c(){y=w("meta"),r=o(),U=w("p"),J=o(),g(j.$$.fragment),c=o(),g(m.$$.fragment),I=o(),s=w("p"),s.textContent=p,Q=o(),T=w("p"),T.textContent=W,H=o(),g(S.$$.fragment),ll=o(),N=w("p"),N.textContent=pl,D=o(),g(E.$$.fragment),el=o(),X=w("p"),X.innerHTML=u,$=o(),x=w("img"),tl=o(),g(P.$$.fragment),hl=o(),q=w("p"),q.innerHTML=il,sl=o(),g(K.$$.fragment),Il=o(),Y=w("p"),Y.innerHTML=yl,nl=o(),g(O.$$.fragment),bl=o(),g(z.$$.fragment),al=o(),_=w("p"),_.textContent=jl,dl=o(),F=w("p"),F.innerHTML=cl,rl=o(),Jl=w("p"),Jl.innerHTML=ml,Ml=o(),L=w("p"),L.innerHTML=Cl,a=o(),g(b.$$.fragment),fl=o(),Ul=w("p"),Ul.textContent=Dl,gl=o(),g(Tl.$$.fragment),Bl=o(),g(ul.$$.fragment),n=o(),g(v.$$.fragment),Ol=o(),Sl=w("p"),Sl.textContent=Ce,le=o(),g(Zl.$$.fragment),ee=o(),g(El.$$.fragment),te=o(),g($l.$$.fragment),se=o(),Nl=w("p"),Nl.textContent=fe,ne=o(),Xl=w("ol"),Xl.innerHTML=ge,ae=o(),kl=w("p"),kl.textContent=Be,Me=o(),g(vl.$$.fragment),pe=o(),g(Rl.$$.fragment),oe=o(),xl=w("p"),xl.textContent=Ge,ie=o(),g(Al.$$.fragment),ye=o(),g(ql.$$.fragment),ce=o(),Yl=w("p"),Yl.textContent=Ze,re=o(),g(Ql.$$.fragment),Je=o(),g(zl.$$.fragment),me=o(),_l=w("p"),_l.textContent=ve,Ue=o(),g(Vl.$$.fragment),Te=o(),g(Fl.$$.fragment),je=o(),Ll=w("ul"),Ll.innerHTML=Ae,ue=o(),Pl=w("p"),this.h()},l(l){const M=st("svelte-u9bgzb",document.head);y=h(M,"META",{name:!0,content:!0}),M.forEach(e),r=i(l),U=h(l,"P",{}),Kl(U).forEach(e),J=i(l),B(j.$$.fragment,l),c=i(l),B(m.$$.fragment,l),I=i(l),s=h(l,"P",{"data-svelte-h":!0}),f(s)!=="svelte-1c3ix4n"&&(s.textContent=p),Q=i(l),T=h(l,"P",{"data-svelte-h":!0}),f(T)!=="svelte-1xh6xvz"&&(T.textContent=W),H=i(l),B(S.$$.fragment,l),ll=i(l),N=h(l,"P",{"data-svelte-h":!0}),f(N)!=="svelte-xxm0i8"&&(N.textContent=pl),D=i(l),B(E.$$.fragment,l),el=i(l),X=h(l,"P",{"data-svelte-h":!0}),f(X)!=="svelte-ms8d3b"&&(X.innerHTML=u),$=i(l),x=h(l,"IMG",{src:!0,alt:!0}),tl=i(l),B(P.$$.fragment,l),hl=i(l),q=h(l,"P",{"data-svelte-h":!0}),f(q)!=="svelte-11etipa"&&(q.innerHTML=il),sl=i(l),B(K.$$.fragment,l),Il=i(l),Y=h(l,"P",{"data-svelte-h":!0}),f(Y)!=="svelte-19a6l8z"&&(Y.innerHTML=yl),nl=i(l),B(O.$$.fragment,l),bl=i(l),B(z.$$.fragment,l),al=i(l),_=h(l,"P",{"data-svelte-h":!0}),f(_)!=="svelte-o1p1av"&&(_.textContent=jl),dl=i(l),F=h(l,"P",{"data-svelte-h":!0}),f(F)!=="svelte-l34lqu"&&(F.innerHTML=cl),rl=i(l),Jl=h(l,"P",{"data-svelte-h":!0}),f(Jl)!=="svelte-1isy26s"&&(Jl.innerHTML=ml),Ml=i(l),L=h(l,"P",{"data-svelte-h":!0}),f(L)!=="svelte-1gsq6x1"&&(L.innerHTML=Cl),a=i(l),B(b.$$.fragment,l),fl=i(l),Ul=h(l,"P",{"data-svelte-h":!0}),f(Ul)!=="svelte-1k0ewbc"&&(Ul.textContent=Dl),gl=i(l),B(Tl.$$.fragment,l),Bl=i(l),B(ul.$$.fragment,l),n=i(l),B(v.$$.fragment,l),Ol=i(l),Sl=h(l,"P",{"data-svelte-h":!0}),f(Sl)!=="svelte-yy57k8"&&(Sl.textContent=Ce),le=i(l),B(Zl.$$.fragment,l),ee=i(l),B(El.$$.fragment,l),te=i(l),B($l.$$.fragment,l),se=i(l),Nl=h(l,"P",{"data-svelte-h":!0}),f(Nl)!=="svelte-1jdaj55"&&(Nl.textContent=fe),ne=i(l),Xl=h(l,"OL",{"data-svelte-h":!0}),f(Xl)!=="svelte-1j60hyx"&&(Xl.innerHTML=ge),ae=i(l),kl=h(l,"P",{"data-svelte-h":!0}),f(kl)!=="svelte-nakymk"&&(kl.textContent=Be),Me=i(l),B(vl.$$.fragment,l),pe=i(l),B(Rl.$$.fragment,l),oe=i(l),xl=h(l,"P",{"data-svelte-h":!0}),f(xl)!=="svelte-euetng"&&(xl.textContent=Ge),ie=i(l),B(Al.$$.fragment,l),ye=i(l),B(ql.$$.fragment,l),ce=i(l),Yl=h(l,"P",{"data-svelte-h":!0}),f(Yl)!=="svelte-1ut8dfv"&&(Yl.textContent=Ze),re=i(l),B(Ql.$$.fragment,l),Je=i(l),B(zl.$$.fragment,l),me=i(l),_l=h(l,"P",{"data-svelte-h":!0}),f(_l)!=="svelte-b9x09v"&&(_l.textContent=ve),Ue=i(l),B(Vl.$$.fragment,l),Te=i(l),B(Fl.$$.fragment,l),je=i(l),Ll=h(l,"UL",{"data-svelte-h":!0}),f(Ll)!=="svelte-15h1dzu"&&(Ll.innerHTML=Ae),ue=i(l),Pl=h(l,"P",{}),Kl(Pl).forEach(e),this.h()},h(){Wl(y,"name","hf:doc:metadata"),Wl(y,"content",wt),Oe(x.src,ol="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/tgi/flash-attn.png")||Wl(x,"src",ol),Wl(x,"alt","Flash Attention")},m(l,M){de(document.head,y),t(l,r,M),t(l,U,M),t(l,J,M),G(j,l,M),t(l,c,M),G(m,l,M),t(l,I,M),t(l,s,M),t(l,Q,M),t(l,T,M),t(l,H,M),G(S,l,M),t(l,ll,M),t(l,N,M),t(l,D,M),G(E,l,M),t(l,el,M),t(l,X,M),t(l,$,M),t(l,x,M),t(l,tl,M),G(P,l,M),t(l,hl,M),t(l,q,M),t(l,sl,M),G(K,l,M),t(l,Il,M),t(l,Y,M),t(l,nl,M),G(O,l,M),t(l,bl,M),G(z,l,M),t(l,al,M),t(l,_,M),t(l,dl,M),t(l,F,M),t(l,rl,M),t(l,Jl,M),t(l,Ml,M),t(l,L,M),t(l,a,M),G(b,l,M),t(l,fl,M),t(l,Ul,M),t(l,gl,M),G(Tl,l,M),t(l,Bl,M),G(ul,l,M),t(l,n,M),G(v,l,M),t(l,Ol,M),t(l,Sl,M),t(l,le,M),G(Zl,l,M),t(l,ee,M),G(El,l,M),t(l,te,M),G($l,l,M),t(l,se,M),t(l,Nl,M),t(l,ne,M),t(l,Xl,M),t(l,ae,M),t(l,kl,M),t(l,Me,M),G(vl,l,M),t(l,pe,M),G(Rl,l,M),t(l,oe,M),t(l,xl,M),t(l,ie,M),G(Al,l,M),t(l,ye,M),G(ql,l,M),t(l,ce,M),t(l,Yl,M),t(l,re,M),G(Ql,l,M),t(l,Je,M),G(zl,l,M),t(l,me,M),t(l,_l,M),t(l,Ue,M),G(Vl,l,M),t(l,Te,M),G(Fl,l,M),t(l,je,M),t(l,Ll,M),t(l,ue,M),t(l,Pl,M),we=!0},p(l,[M]){const Qe={};M&2&&(Qe.$$scope={dirty:M,ctx:l}),P.$set(Qe);const Ve={};M&2&&(Ve.$$scope={dirty:M,ctx:l}),K.$set(Ve);const We={};M&2&&(We.$$scope={dirty:M,ctx:l}),O.$set(We);const Se={};M&2&&(Se.$$scope={dirty:M,ctx:l}),ul.$set(Se);const Ee={};M&2&&(Ee.$$scope={dirty:M,ctx:l}),Zl.$set(Ee);const $e={};M&2&&($e.$$scope={dirty:M,ctx:l}),vl.$set($e);const Ne={};M&2&&(Ne.$$scope={dirty:M,ctx:l}),Al.$set(Ne);const Xe={};M&2&&(Xe.$$scope={dirty:M,ctx:l}),Ql.$set(Xe);const ke={};M&2&&(ke.$$scope={dirty:M,ctx:l}),Vl.$set(ke)},i(l){we||(d(j.$$.fragment,l),d(m.$$.fragment,l),d(S.$$.fragment,l),d(E.$$.fragment,l),d(P.$$.fragment,l),d(K.$$.fragment,l),d(O.$$.fragment,l),d(z.$$.fragment,l),d(b.$$.fragment,l),d(Tl.$$.fragment,l),d(ul.$$.fragment,l),d(v.$$.fragment,l),d(Zl.$$.fragment,l),d(El.$$.fragment,l),d($l.$$.fragment,l),d(vl.$$.fragment,l),d(Rl.$$.fragment,l),d(Al.$$.fragment,l),d(ql.$$.fragment,l),d(Ql.$$.fragment,l),d(zl.$$.fragment,l),d(Vl.$$.fragment,l),d(Fl.$$.fragment,l),we=!0)},o(l){C(j.$$.fragment,l),C(m.$$.fragment,l),C(S.$$.fragment,l),C(E.$$.fragment,l),C(P.$$.fragment,l),C(K.$$.fragment,l),C(O.$$.fragment,l),C(z.$$.fragment,l),C(b.$$.fragment,l),C(Tl.$$.fragment,l),C(ul.$$.fragment,l),C(v.$$.fragment,l),C(Zl.$$.fragment,l),C(El.$$.fragment,l),C($l.$$.fragment,l),C(vl.$$.fragment,l),C(Rl.$$.fragment,l),C(Al.$$.fragment,l),C(ql.$$.fragment,l),C(Ql.$$.fragment,l),C(zl.$$.fragment,l),C(Vl.$$.fragment,l),C(Fl.$$.fragment,l),we=!1},d(l){l&&(e(r),e(U),e(J),e(c),e(I),e(s),e(Q),e(T),e(H),e(ll),e(N),e(D),e(el),e(X),e($),e(x),e(tl),e(hl),e(q),e(sl),e(Il),e(Y),e(nl),e(bl),e(al),e(_),e(dl),e(F),e(rl),e(Jl),e(Ml),e(L),e(a),e(fl),e(Ul),e(gl),e(Bl),e(n),e(Ol),e(Sl),e(le),e(ee),e(te),e(se),e(Nl),e(ne),e(Xl),e(ae),e(kl),e(Me),e(pe),e(oe),e(xl),e(ie),e(ye),e(ce),e(Yl),e(re),e(Je),e(me),e(_l),e(Ue),e(Te),e(je),e(Ll),e(ue),e(Pl)),e(y),Z(j,l),Z(m,l),Z(S,l),Z(E,l),Z(P,l),Z(K,l),Z(O,l),Z(z,l),Z(b,l),Z(Tl,l),Z(ul,l),Z(v,l),Z(Zl,l),Z(El,l),Z($l,l),Z(vl,l),Z(Rl,l),Z(Al,l),Z(ql,l),Z(Ql,l),Z(zl,l),Z(Vl,l),Z(Fl,l)}}}const wt='{"title":"Optimized Inference Deployment","local":"optimized-inference-deployment","sections":[{"title":"Framework Selection Guide","local":"framework-selection-guide","sections":[{"title":"Memory Management and Performance","local":"memory-management-and-performance","sections":[],"depth":3},{"title":"Deployment and Integration","local":"deployment-and-integration","sections":[],"depth":3}],"depth":2},{"title":"Getting Started","local":"getting-started","sections":[{"title":"Installation and Basic Setup","local":"installation-and-basic-setup","sections":[],"depth":3},{"title":"Basic Text Generation","local":"basic-text-generation","sections":[],"depth":3}],"depth":2},{"title":"Advanced Generation Control","local":"advanced-generation-control","sections":[{"title":"Token Selection and Sampling","local":"token-selection-and-sampling","sections":[],"depth":3},{"title":"Controlling Repetition","local":"controlling-repetition","sections":[],"depth":3},{"title":"Length Control and Stop Sequences","local":"length-control-and-stop-sequences","sections":[],"depth":3}],"depth":2},{"title":"Memory Management","local":"memory-management","sections":[],"depth":2},{"title":"Resources","local":"resources","sections":[],"depth":2}],"depth":1}';function ht(A){return ze(()=>{new URLSearchParams(window.location.search).get("fw")}),[]}class Gt extends _e{constructor(y){super(),Fe(this,y,ht,ut,Ye,{})}}export{Gt as component};
