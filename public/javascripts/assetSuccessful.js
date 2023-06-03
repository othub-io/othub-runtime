function nav(owner_address,chain_id){
    if(!owner_address){
        explore=`
        <form action="/alliance/dao" method="GET" style="padding-right:40px;">
        <button id="connectWalletButton">DAO</button>
        <button class="connectWalletButton" style="display:none;"></button>
        <button class="connectWalletButton" style="display:none;"></button>
        </form>
        `
      element = ``

    }else{
        explore=`
        <form action="/alliance/dao" method="GET" style="padding-right:40px;">
        <button id="connectWalletButton">DAO</button>
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

function body(assetData,action,ual){
    try{
    assetData = JSON.parse(assetData)
    action = JSON.parse(action)

    if(action === "propose"){
        action = "Proposal"
    }

    if(action === "vote"){
        action = "Vote"
    }

    if(assetData.operation.publicGet.status === "COMPLETED" && action === "Proposal"){
        asset = [];

        console.log(`ASSERTIONS: ${assetData.public.assertion.length}`);

            for (i = 0; i < assetData.public.assertion.length; ++i) {
                current_assertion = assetData.public.assertion[i];
                if (current_assertion["@type"]) {
                console.log(`CURRENT ASSERTION: ${current_assertion["@type"][0]}`);

                if (current_assertion["@type"][0] == "http://schema.org/Proposal") {
                    console.log(current_assertion);
                    asset.push(current_assertion["@id"]);
                }
                }
            }

            console.log(`Proposal Assertion Index: ${asset}`);

            for (x = 0; x < assetData.public.assertion.length; ++x) {
                current_assertion = assetData.public.assertion[x];

                if (asset.includes(current_assertion["@id"], 0)) {
                    description = current_assertion["http://schema.org/description"][0]["@value"];
                    prop_name = current_assertion["http://schema.org/name"][0]["@value"];
                    proposedAsk = current_assertion["http://schema.org/proposedAsk"][0]["@value"];
                    proposedBy = current_assertion["http://schema.org/proposedBy"][0]["@value"];
                    proposedTo = current_assertion["http://schema.org/proposedTo"][0]["@value"];
                    reason = current_assertion["http://schema.org/reason"][0]["@value"];
                    subjectOf = current_assertion["http://schema.org/subjectOf"][0]["@value"];
                    url = current_assertion["http://schema.org/url"][0]["@value"];
                }
            }

            console.log(proposedAsk)
            proposed_ask = ``
            if(proposedAsk != ''){
                proposed_ask = `<li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;color:#6168ED;font-family: OCR A Std, monospace;"><b>Proposed ask:</b> ${proposedAsk}</li>`
            }

            console.log(description)
            console.log(prop_name)
            console.log(proposedAsk)
            console.log(proposedBy)
            console.log(proposedTo)
            console.log(reason)
            console.log(subjectOf)
            console.log(ual)
            console.log(proposed_ask)
            console.log(assetData.public.assertionId,proposed_ask)
        console.log(assetData)

        section =`
        <section id="faq" class="faq section-bg" style="background-color:#FFFFFF;">
            <div class="container" >
                <section id="contact" class="contact" style="padding:30px 0px;">
                    <div class="container" >
                    <div class="section-title">
                        <h2 style="color:#6168ED">${action} Submission Successful!</h2></div>
                    </div>
                </section>
                <div class="faq-list">
                    <ul>
                        <li style="padding-left:5px;border: 1px solid #6168ED;">
                            <a id="faq-list-1" class="collapse" data-bs-toggle="collapse" data-bs-target="#faq-list-2" style="word-wrap: break-word;color:#6168ED;">
                            ${assetData.operation.publicGet.status} | Operation ID: ${assetData.operation.publicGet.operationId}<i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i>
                            </a>
                            <div>
                                <ul>
                                    <li style="padding-top:5px;padding-bottom:0px;word-wrap: break-word;">
                                        <ul style="border-left: 5px solid #6168ED;background-color: #f1f1f1;list-style-type: none;padding: 10px 20px;">
                                            <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;color:#6168ED;font-family: OCR A Std, monospace;"><b>Assertion:</b> ${assetData.public.assertionId}</li>
                                            <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;color:#6168ED;font-family: OCR A Std, monospace;"><b>UAL:</b> ${JSON.parse(ual)}</li>
                                            <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;color:#6168ED;font-family: OCR A Std, monospace;"><b>Title:</b> ${prop_name}</li>
                                            <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;color:#6168ED;font-family: OCR A Std, monospace;"><b>Description:</b> ${description}</li>
                                            ${proposed_ask}
                                            <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;color:#6168ED;font-family: OCR A Std, monospace;"><b>Reason:</b> ${reason}</li>
                                            <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;color:#6168ED;font-family: OCR A Std, monospace;"><b>Proposed by:</b> ${proposedBy}</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        `
    }

    if(assetData.operation.publicGet.status === "COMPLETED" && action === "Vote"){
        asset = [];

        console.log(`ASSERTIONS: ${assetData.public.assertion.length}`);

            for (i = 0; i < assetData.public.assertion.length; ++i) {
                current_assertion = assetData.public.assertion[i];
                if (current_assertion["@type"]) {
                console.log(`CURRENT ASSERTION: ${current_assertion["@type"][0]}`);

                if (current_assertion["@type"][0] == "http://schema.org/VoteAction") {
                    console.log(current_assertion);
                    asset.push(current_assertion["@id"]);
                }
                }
            }

            console.log(`Vote Assertion Index: ${asset}`);

            voteList = [];
            for (x = 0; x < assetData.public.assertion.length; ++x) {
                current_assertion = assetData.public.assertion[x];

                if (asset.includes(current_assertion["@id"], 0)) {
                    voter = current_assertion["http://schema.org/voter"][0]["@value"];
                    proposal = current_assertion["http://schema.org/proposal"][0]["@value"];
                    subjectOf = current_assertion["http://schema.org/subjectOf"][0]["@value"];
                    url = current_assertion["http://schema.org/url"][0]["@value"];

                    for (i = 0; i < current_assertion["http://schema.org/votes"].length;++i) {
                        vote = current_assertion["http://schema.org/votes"][i]["@id"];
                        voteList.push(vote);
                    }
                }
            }

            console.log(`Vote result Index: ${voteList}`);

            for (x = 0; x < assetData.public.assertion.length; ++x) {
                current_assertion = assetData.public.assertion[x];

                if (voteList.includes(current_assertion["@id"], 0)) {
                    yes_vote = current_assertion["http://schema.org/yes"][0]["@value"];
                    no_vote = current_assertion["http://schema.org/no"][0]["@value"];
                }
            }

        section =`
        <section id="faq" class="faq section-bg" style="background-color:#FFFFFF;">
            <div class="container" >
                <section id="contact" class="contact" style="padding:30px 0px;">
                    <div class="container" >
                    <div class="section-title">
                        <h2 style="color:#6168ED">${action} Submission Successful!</h2></div>
                    </div>
                </section>
                <div class="faq-list">
                    <ul>
                        <li style="padding-left:5px;border: 1px solid #6168ED;">
                        <a id="faq-list-1" data-bs-toggle="collapse" class="collapse" data-bs-target="#faq-list-1" style="word-wrap: break-word;color:#6168ED;">
                        ${assetData.operation.publicGet.status} | Operation ID: ${assetData.operation.publicGet.operationId}<i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i>
                        </a>
                        <div>
                        <ul>
                            <li style="padding-top:5px;padding-bottom:0px;word-wrap: break-word;">
                                <ul style="border-left: 5px solid #6168ED;background-color: #f1f1f1;list-style-type: none;padding: 10px 20px;">
                                    <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;color:#6168ED;font-family: OCR A Std, monospace;"><b>Assertion:</b> ${assetData.public.assertionId}</li>
                                    <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;color:#6168ED;font-family: OCR A Std, monospace;"><b>UAL:</b> ${JSON.parse(ual)}</li>
                                    <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;color:#6168ED;font-family: OCR A Std, monospace;"><b>Proposal UAL:</b> ${proposal}</li>
                                    <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;color:#6168ED;font-family: OCR A Std, monospace;"><b>Voter:</b> ${voter}</li>
                                    <br>
                                    <ul style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;color:#6168ED;font-family: OCR A Std, monospace;"><b>Votes:</b>
                                        <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;color:#6168ED;font-family: OCR A Std, monospace;"><b>Yes:</b> ${yes_vote}</li>
                                        <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;color:#6168ED;font-family: OCR A Std, monospace;"><b>No:</b> ${no_vote}</li>
                                    </ul>
                                </ul>
                            </li>
                        </ul>
                    </ul>
                </div>
            </div>
        </section>
        `
    }

    if(assetData.operation.publicGet.status != "COMPLETED"){
        section = `
        <section id="faq" class="faq section-bg">
            <div class="container" >
                <section id="contact" class="contact" style="padding:30px 0px;">
                    <div class="container" >
                        <div class="section-title">
                            <h2 style="color:#6168ED">${assetData.operation.publicGet.status}</h2>
                        </div>
                    </div>
                </section>
                <div class="faq-list">
                    <ul>
                        <li style="padding-left:5px;border: 1px solid #6168ED;">
                        <a id="faq-list-1" data-bs-toggle="collapse" class="collapse" data-bs-target="#faq-list-1" style="word-wrap: break-word;color:#880808;">
                        ${assetData.operation.publicGet.status} | Operation ID: ${assetData.operation.publicGet.operationId}<i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i>
                        </a>
                        <div id="faq-list-1" class="collapse" data-bs-parent=".faq-list">
                        <ul>
                            <li style="padding-top:5px;padding-bottom:0px;word-wrap: break-word;">
                                <ul style="border-left: 5px solid #880808;background-color: #f1f1f1;list-style-type: none;padding: 10px 20px;">
                                    <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;">Assertion: ${assetData.public.assertionId}</li>
                                </ul>
                                <ul style="border-left: 5px solid #880808;background-color: #f1f1f1;list-style-type: none;padding: 10px 20px;">
                                    <li style="padding-top:0px;padding-bottom:0px;word-wrap: break-word;background:none;">${assetData.operation.errorMessage}</li>
                                </ul>
                            </li>
                        </ul>
                    </ul>
                </div>
            </div>
        </section>
        `
    }

        $('#main').append(section);
    }catch(e){
        console.log(e)
    }
}