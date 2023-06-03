function nav (owner_address, chain_id) {
  if (!owner_address) {
    explore = `
        <form action="/explore" method="GET" style="padding-right:40px;">
        <button id="connectWalletButton">Explore</button>
        <button class="connectWalletButton" style="display:none;"></button>
        <button class="connectWalletButton" style="display:none;"></button>
        </form>
        `
    element = ``
  } else {
    explore = `
        <form action="/explore" method="GET" style="padding-right:40px;">
        <button id="connectWalletButton">Explore</button>
        <button class="connectWalletButton" style="display:none;"></button>
        <button class="connectWalletButton" style="display:none;"></button>
        </form>
        `

    trim_owner_address = owner_address.substring(0, 10)
    element = `<p style="color:#13B785;margin-right:80px;font-size:18px;font-family: OCR A Std, monospace;padding-top:1rem;"><i class="ri-check-double-line" style="color:#13B785;padding-right:3px;"></i>${chain_id} | ${trim_owner_address}..</p>`
  }

  $('#explore').append(explore)
  $('#MM').append(element)
}

function body (data, owner_address) {
  section = `
      <section id="contact" class="contact" style="vertical-align:middle;padding-top:80px;">
              <div class="container" style="vertical-align:middle;">
                <div class="section-title" syle="margin-bottom: 10px;">
                  <h2 style="color:#6168ED;font-size:68px;margin-bottom:-5px;font-family: OCR A Std, monospace;">otnode.com</h2>
                  <p>Search the OriginTrail Decentralized Knowledge Graph</p>
                </div>
                <br>
                <div class="section-title">
                  <form action="/search" method="GET">
                    <div class="php-email-form" style="background-color:none;" id="type_buttons"></div>
                    <br>
                    <input type="radio" id="assertions" name="result_type" value="assertions" style="accent-color: #6168ED;display: none;" checked="checked"/>
                    <input type="radio" id="entities" name="result_type" value="entities" placeholder="Search for..." style="accent-color: #6168ED;display: none;"/>
                    <input type="text" name="keywords" class="form-control" id="keywords" rows="5" placeholder="SEARCHING IS DISABLED AND WILL BE ENABLED SOON" style="margin-left:25%;width:50%;" required ></input>
                    <br>
                    <input type="text" name="owner_address" id="owner_address" style="display:none;" value="${owner_address}"></input>
                    <div class="php-email-form"><button type="submit" id="search_button" onclick="pleasewait()" style="background-color:#6168ED;">Search</button></div>
                    <div id="please_wait" type="text" style="display: none;">Please wait... Searching the DKG.</div>
                    <div type="text" id="blocked" style="display:none;">You can only submit 1 search request per 30 seconds. Please do not spam.</div>
                  </form>
                </div>
              </div>
            </section>
            `

  // if(data.itemListElement.length = 0){
  //     section =`
  //     <section id="contact" class="contact" style="padding-top:130px;">
  //             <div class="container" >
  //               <div class="section-title">
  //                 <h2 style="color:#6168ED">(${data.itemCount}) Search Results</h2>
  //                 <div class="php-email-form"><button type="submit" style="background-color:#6168ED;"><a href="/search" style="color:white;">Search Again</a></button></div>
  //               </div>
  //             </div>
  //           </section>
  //           `
  //   }

  //   if(locals.result_type == 'assertions'){
  //     section =`<section id="faq" class="faq section-bg" style="background-color:#ffffff;">
  //             <div class="container" >
  //               <section id="contact" class="contact" style="padding:30px 0px;">
  //                 <div class="container" >
  //                   <div class="section-title">
  //                     <h2 style="color:#6168ED">(<%= data.itemCount %>) Assertion Search Results</h2>
  //                     <div class="php-email-form"><button type="submit" style="background-color:#6168ED;"><a href="/search" style="color:white;">Search Again</a></button></div>
  //                   </div>
  //                 </div>
  //               </section>
  //               <div class="faq-list">
  //                 <ul>
  //                   <% for(i=0; i < locals.data.itemListElement.length; i++) { %>
  //                     <li data-aos="fade-up" data-aos-delay="100" style="padding-left:5px;border: 1px solid #6168ED;">
  //                     <% clist_element = Object.entries(locals.data.itemListElement)[i] %>
  //                     <% clist_element = clist_element[1] %>
  //                     <% result = clist_element.result %>
  //                     <a id="faq-list-1" data-bs-toggle="collapse" class="collapse" data-bs-target="#faq-list-1" style="word-wrap: break-word;color:#6168ED;">
  //                       <script>
  //                         //aindex = <%= i+1 %>
  //                         bindex = <%= i+1 %>
  //                         document.getElementById("faq-list-1").setAttribute("id", "faq-list-"+bindex);
  //                         document.getElementById("faq-list-"+bindex).setAttribute("data-bs-target", "#faq-list-"+bindex);
  //                       </script>
  //                       <!--ITEM DATA HERE -->
  //                       Result Score:<%= clist_element.resultScore %> | ID: <%= result['@id'] %><i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i>
  //                     </a>
  //                     <div id="faq-list-1" class="collapse" data-bs-parent=".faq-list">
  //                       <script>
  //                         cindex = <%= i+1 %>
  //                         document.getElementById("faq-list-1").setAttribute("id", "faq-list-"+cindex);
  //                       </script>
  //                       <!--ON CLICK TEXT HERE -->
  //                       <section id="contact" class="contact" style="padding:0px 0px;">
  //                         <div class="container" >
  //                           <div class="section-title">
  //                             <form  class="resolve" id="resolve_form" action="/resolve" method="POST">
  //                               <input type="text" name="resolve_ids" id="idz" style="display:none;" value=""></input>
  //                               <div class="php-email-form"><button type="submit" style="float: right;padding:3px 10px;background-color:#6168ED;" onclick="resolvewait()" class ="resolve_button" id="resolve_button">Resolve</button></div>
  //                               <script>
  //                                 dindex = <%= i+1 %>
  //                                 document.getElementById("idz").setAttribute("id","id"+dindex);
  //                                 document.getElementById("id"+dindex).setAttribute("value", <%- JSON.stringify(result['@id']) %>);
  //                               </script>
  //                             </form>
  //                           </div>
  //                         </div>
  //                       </section>
  //                       <p style="padding-left:20px;word-wrap: break-word;">Published: <%= result.metadata.timestamp %></P>
  //                       <ul>
  //                         <li style="padding-top:5px;padding-bottom:0px;word-wrap: break-word;">
  //                           Metadata:
  //                           <ul style="border-left: 5px solid #4655C4;background-color: #f1f1f1;list-style-type: none;padding: 10px 20px;">
  //                             <li style="padding-top:0px;padding-left:5px;padding-bottom:0px;background:none;word-wrap: break-word;">Type: <%= result.metadata['type'] %></li>
  //                             <li style="padding-top:0px;padding-left:5px;padding-bottom:0px;background:none;word-wrap: break-word;">Visibility: <%= result.metadata.visibility %></li>
  //                             <li style="padding-top:0px;padding-left:5px;padding-bottom:0px;background:none;word-wrap: break-word;">Data hash: <%= result.metadata.dataHash %></li>
  //                             <li style="padding-top:0px;padding-left:5px;padding-bottom:0px;background:none;word-wrap: break-word;">Issuer: <%= result.metadata.issuer %></li>
  //                             <li style="padding-top:0px;padding-left:5px;padding-bottom:0px;background:none;word-wrap: break-word;">Signature: <%= result.signature %></li>
  //                           </ul>
  //                         </li>
  //                         <li style="padding-top:5px;padding-bottom:0px;word-wrap: break-word;">
  //                           Keywords:
  //                           <ul style="border-left: 5px solid #C446A7;background-color: #f1f1f1;list-style-type: none;padding: 10px 20px;">
  //                             <% for(x=0; x < result.metadata.keywords.length; x++) { %>
  //                               <% a = Object.entries(result.metadata.keywords)[x] %>
  //                               <li style="padding-top:0px;padding-left:5px;padding-bottom:0px;background:none;word-wrap: break-word;"><%= a[1] %></li>
  //                             <% } %>
  //                           </ul>
  //                         </li>
  //                         <% if(result.metadata.UALs ) { %>
  //                           <li style="padding-top:5px;padding-bottom:0px;word-wrap: break-word;">
  //                             UALs:
  //                             <ul style="border-left: 5px solid #35D0AF;background-color: #f1f1f1;list-style-type: none;padding: 10px 20px;">
  //                               <% for(y=0; y < result.metadata.UALs.length; y++) { %>
  //                                 <% b = Object.entries(result.metadata.UALs)[y] %>
  //                                 <li style="padding-top:0px;padding-left:5px;padding-bottom:0px;background:none;word-wrap: break-word;">
  //                                   <% if(result.metadata.type != 'default'){ %>
  //                                     <section id="contact" class="contact" style="padding:0px 0px;">
  //                                       <div class="container" >
  //                                         <div class="section-title">
  //                                           <form  class="update" id="update_form" action="/update_ual" method="POST">
  //                                             <input type="text" name="ual_ids" id="aidz" style="display:none;" value=""></input>
  //                                             <input type="text" name="type" id="tidz" style="display:none;" value=""></input>
  //                                             <div class="php-email-form"><button type="submit" style="float: right;padding:3px 10px;background-color:#6168ED;" onclick="updatewait()" class ="update_button" id="update_button">Update</button></div>
  //                                             <script>
  //                                               findex = <%= i+1 %>
  //                                               document.getElementById("aidz").setAttribute("id","aid"+findex);
  //                                               document.getElementById("aid"+findex).setAttribute("value", <%- JSON.stringify(b[1]) %>);
  //                                               document.getElementById("tidz").setAttribute("id","tid"+findex);
  //                                               document.getElementById("tid"+findex).setAttribute("value", <%- JSON.stringify(result.metadata.type) %>);
  //                                             </script>
  //                                           </form>
  //                                         </div>
  //                                       </div>
  //                                     </section>
  //                                     <% } %>
  //                                    <%= b[1] %></li>
  //                               <% } %>
  //                             </ul>
  //                           </li>
  //                         <% } %>
  //                         <li style="padding-top:5px;padding-bottom:0px;word-wrap: break-word;">
  //                           Nodes ids:
  //                           <ul style="border-left: 5px solid #CE572A;background-color: #f1f1f1;list-style-type: none;padding: 10px 20px;">
  //                             <% for(z=0; z < clist_element.nodes.length; z++) { %>
  //                               <% c = Object.entries(clist_element.nodes)[z] %>
  //                               <li style="padding-top:0px;padding-left:5px;padding-bottom:0px;background:none;word-wrap: break-word;"><%= c[1] %></li>
  //                             <% } %>
  //                           </ul>
  //                         </li>
  //                       </ul>
  //                     </div>
  //                   </li>
  //                   <% } %>
  //                 </ul>
  //               </div>
  //             </div>
  //           </section>
  //           `
  //   }

  //   if(locals.result_type == 'entities'){
  //     section = `
  //     <section id="faq" class="faq section-bg">
  //             <div class="container" >
  //               <section id="contact" class="contact" style="padding:30px 0px;">
  //                 <div class="container" >
  //                   <div class="section-title">
  //                     <h2 style="color:#6168ED">(<%= data.itemCount %>) Entity Search Results</h2>
  //                     <div class="php-email-form" style="background-color:none;"><button type="submit" style="background-color:#6168ED;"><a style="color:white;" href="/search">Search Again</a></button></div>
  //                   </div>
  //                 </div>
  //               </section>
  //               <div class="faq-list">
  //                 <ul>
  //                   <% for(i=0; i < locals.data.itemListElement.length; i++) { %>
  //                     <li data-aos="fade-up" data-aos-delay="100" style="border-width:thin;border-color:#2C0552;padding-left:5px;">
  //                     <% clist_element = Object.entries(locals.data.itemListElement)[i] %>
  //                     <% clist_element = clist_element[1] %>
  //                     <% result = clist_element.result %>
  //                     <a id="faq-list-1" data-bs-toggle="collapse" class="collapse" data-bs-target="#faq-list-1" style="word-wrap: break-word;color:#6168ED">
  //                       <script>
  //                         aindex = <%= i+1 %>
  //                         document.getElementById("faq-list-1").setAttribute("id", "faq-list-"+aindex);
  //                         document.getElementById("faq-list-"+aindex).setAttribute("data-bs-target", "#faq-list-"+aindex);
  //                       </script>
  //                       <!--ITEM DATA HERE -->
  //                       Result Score:<%= clist_element.resultScore %> | ID: <%= result['@id'] %><i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i>
  //                     </a>
  //                     <div id="faq-list-1" class="collapse" data-bs-parent=".faq-list">
  //                       <script>
  //                         index = <%= i+1 %>
  //                         document.getElementById("faq-list-1").setAttribute("id", "faq-list-"+index);
  //                       </script>
  //                       <!--ON CLICK TEXT HERE -->
  //                       <section id="contact" class="contact" style="padding:0px 0px;">
  //                         <div class="container" >
  //                           <div class="section-title">
  //                             <form  class="resolve" id="resolve_form" action="/resolve" method="POST">
  //                               <input type="text" name="resolve_ids" id="idz" style="display:none;" value=""></input>
  //                               <div class="php-email-form" style="background-color:none;"><button type="submit" style="float: right;padding:3px 10px;background-color:#6168ED;" onclick="resolvewait()" class="resolve_button" id="resolve_button">Resolve</button></div>
  //                               <script>
  //                                 bindex = <%= i+1 %>
  //                                 document.getElementById("idz").setAttribute("id","id"+bindex);
  //                                 document.getElementById("id"+bindex).setAttribute("value", <%- JSON.stringify(result['@id']) %>);
  //                               </script>
  //                             </form>
  //                           </div>
  //                         </div>
  //                       </section>
  //                       <p style="padding-left:20px;word-wrap: break-word;">Published: <%= result.timestamp %></P>
  //                       <ul>
  //                         <li style="padding-top:5px;padding-bottom:0px;">
  //                           Issuers:
  //                           <ul style="border-left: 5px solid #4655C4;background-color: #f1f1f1;list-style-type: none;padding: 10px 20px;">
  //                             <% for(x=0; x < clist_element.issuers.length; x++) { %>
  //                               <% a = Object.entries(clist_element.issuers)[x] %>
  //                               <li style="padding-top:5px;padding-left:5px;padding-bottom:5px;background:none;word-wrap: break-word;"><%= a[1] %></li>
  //                             <% } %>
  //                           </ul>
  //                         </li>
  //                         <li style="padding-top:5px;padding-bottom:0px;">
  //                           Assertion ids:
  //                           <ul style="border-left: 5px solid #C446A7;background-color: #f1f1f1;list-style-type: none;padding: 10px 20px;">
  //                             <% for(y=0; y < clist_element.assertions.length; y++) { %>
  //                               <% b = Object.entries(clist_element.assertions)[y] %>
  //                               <li style="padding-top:5px;padding-left:5px;padding-bottom:5px;background:none;word-wrap: break-word;"><%= b[1] %></li>
  //                             <% } %>
  //                           </ul>
  //                         </li>
  //                         <li style="padding-top:5px;padding-bottom:0px;">
  //                           Node ids:
  //                           <ul style="border-left: 5px solid #CE572A;background-color: #f1f1f1;list-style-type: none;padding: 10px 20px;">
  //                             <% for(z=0; z < clist_element.nodes.length; z++) { %>
  //                               <% c = Object.entries(clist_element.nodes)[z] %>
  //                               <li style="padding-top:5px;padding-left:5px;padding-bottom:5px;background:none;word-wrap: break-word;"><%= c[1] %></li>
  //                             <% } %>
  //                           </ul>
  //                         </li>
  //                       </ul>
  //                     </div>
  //                   </li>
  //                   <% } %>
  //                 </ul>
  //               </div>
  //             </div>
  //           </section>
  //           `
  //   }

  $('#main').append(section)
}
