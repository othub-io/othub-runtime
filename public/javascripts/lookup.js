function nav(owner_address,chain_id){
    if(!owner_address){
        explore=`
        <form action="/explore" method="GET" style="padding-right:40px;">
        <button id="connectWalletButton">Explore</button>
        <button class="connectWalletButton" style="display:none;"></button>
        <button class="connectWalletButton" style="display:none;"></button>
        </form>
        `
      element = ``

    }else{
        explore=`
        <form action="/explore" method="GET" style="padding-right:40px;">
        <button id="connectWalletButton">Explore</button>
        <button class="connectWalletButton" style="display:none;"></button>
        <button class="connectWalletButton" style="display:none;"></button>
        </form>
        `

      trim_owner_address = owner_address.substring(0,10);
      element = `<p style="color:#13B785;margin-right:80px;font-size:18px;font-family: OCR A Std, monospace;padding-top:1rem;"><i class="ri-check-double-line" style="color:#13B785;padding-right:3px;"></i>${chain_id} | ${trim_owner_address}..</p>`
    }

    $('#explore').append(explore);
    $('#MM').append(element);
}

function body(data){
    section = `
            <section id="contact" class="contact" style="padding-top:130px;">
            <div class="container">
              <div class="section-title">
                <h2 style="color:#6168ED">UAL Look Up</h2>
              </div>
              <br>
              <div class="section-title">
                <form action="/lookup" method="GET">
                  <input type="text" name="ual" class="form-control" id="ual" rows="5" placeholder="Search a UAL..." style="margin-left:25%;width:50%;" required pattern=".{55,}"></input>
                  <br>
                  <div class="php-email-form"><button type="submit" id="get_button" onclick="pleasewait()" style="background-color:#6168ED;">Look up UAL</button></div>
                  <div id="please_wait" type="text" style="display: none;">Please wait... Getting UAL data.</div>
                  <div type="text" name="blocked" id="blocked" style="display:none;">You can only submit 1 get request per 30 seconds. Please do not spam.</div>
                </form>
              </div>
            </div>
          </section>
          `

        if(data && data !="blocked" && data !="error"){
            if(data.operation.publicGet.status == "COMPLETED"){
                section =`
                <section id="faq" class="faq section-bg">
                    <div class="container" >
                        <section id="contact" class="contact" style="padding:30px 0px;">
                            <div class="container" >
                            <div class="section-title">
                                <h2 style="color:#6168ED">Lookup Results</h2></div>
                            </div>
                        </section>
                        <div class="faq-list">
                            <ul>
                                <li style="padding-left:5px;border: 1px solid #6168ED;">
                                <a id="faq-list-1" data-bs-toggle="collapse" class="collapse" data-bs-target="#faq-list-1" style="word-wrap: break-word;color:#6168ED;">
                                ${data.operation.publicGet.status} | Operation ID: ${data.operation.publicGet.operationId}<i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i>
                                </a>
                                <div id="faq-list-1" class="collapse" data-bs-parent=".faq-list">
                                <ul>
                                    <li style="padding-top:5px;padding-bottom:0px;word-wrap: break-word;">
                                        <ul style="border-left: 5px solid #6168ED;background-color: #f1f1f1;list-style-type: none;padding: 10px 20px;">
                                            <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;">Assertion: ${data.public.assertionId}</li>
                                        </ul>
                                        <ul style="border-left: 5px solid #6168ED;background-color: #f1f1f1;list-style-type: none;padding: 10px 20px;">
                                            <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;">${JSON.stringify(data.public.assertion)}</li>
                                        </ul>
                                    </li>
                                </ul>
                            </ul>
                        </div>
                        <section id="contact" class="contact" style="padding:30px 0px;">
                            <div class="container" >
                                <div class="section-title">
                                    <div class="php-email-form" style="background-color:none;"><button type="submit" style="background-color:#6168ED;"><a href="/lookup" style="color:white;background-color:none;">Try Another</a></button></div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
                `
            }
        
            if(data.operation.publicGet.status != "COMPLETED"){
                section = `
                <section id="faq" class="faq section-bg">
                    <div class="container" >
                        <section id="contact" class="contact" style="padding:30px 0px;">
                            <div class="container" >
                                <div class="section-title">
                                    <h2 style="color:#6168ED">Lookup Results</h2>
                                </div>
                            </div>
                        </section>
                        <div class="faq-list">
                            <ul>
                                <li style="padding-left:5px;border: 1px solid #6168ED;">
                                <a id="faq-list-1" data-bs-toggle="collapse" class="collapse" data-bs-target="#faq-list-1" style="word-wrap: break-word;color:#880808;">
                                ${data.operation.publicGet.status} | Operation ID: ${data.operation.publicGet.operationId}<i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i>
                                </a>
                                <div id="faq-list-1" class="collapse" data-bs-parent=".faq-list">
                                <ul>
                                    <li style="padding-top:5px;padding-bottom:0px;word-wrap: break-word;">
                                        <ul style="border-left: 5px solid #880808;background-color: #f1f1f1;list-style-type: none;padding: 10px 20px;">
                                            <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;">Assertion: ${data.public.assertionId}</li>
                                        </ul>
                                        <ul style="border-left: 5px solid #880808;background-color: #f1f1f1;list-style-type: none;padding: 10px 20px;">
                                            <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;">${data.operation.errorMessage}</li>
                                        </ul>
                                    </li>
                                </ul>
                            </ul>
                        </div>
                        <section id="contact" class="contact" style="padding:30px 0px;">
                            <div class="container" >
                                <div class="section-title">
                                    <div class="php-email-form" style="background-color:none;"><button type="submit" style="background-color:#6168ED;"><a href="/lookup" style="color:white;background-color:none;">Try Again</a></button></div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
                `
            }
        }

        $('#main').append(section);
}

function pleasewait() {
    var x = document.getElementById("please_wait");
    var y = document.getElementById("get_button");

    if (x.style.display === "none") {
      x.style.display = "block";
      if (document.getElementById("ual").value.length > 54) {
        y.style.display = "none";
      }
    } else {
      x.style.display = "none";
    }
    if (document.getElementById("ual").value.length > 54) {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }