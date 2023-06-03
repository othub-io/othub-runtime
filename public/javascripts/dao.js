function nav (owner_address, chain_id) {
  explore = `
          <form action="/alliance" method="GET" style="padding-right:40px;">
          <button id="connectWalletButton">Home</button>
          <button class="connectWalletButton" style="display:none;"></button>
          </form>
          `
  $('#explore').append(explore)

  trim_owner_address = owner_address.substring(0, 10)
  element = `<p style="color:#13B785;margin-right:80px;font-size:18px;font-family: OCR A Std, monospace;padding-top:1rem;"><i class="ri-check-double-line" style="color:#13B785;padding-right:3px;"></i>${chain_id} | ${trim_owner_address}..</p>`
  $('#MM').append(element)
}

function blank_page () {
  row1 = `
              <div class="col-lg-3 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem;display:block;margin-right:10px;margin-left: 80px;">
                <div class="icon-box" style="height:100%;">
                  <h4 class="title" style="text-align:center;color:#6168ed;">Account Look up</h4>
                  <div style="height:100%;">
                    <form action="/account" method="GET">
                        <input name="ual" id="ual" rows="4" placeholder="  Search a UAL..." style="width:70%;margin-left:25%;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" required ></input>
                        <div style="margin-top:-1.75rem;margin-left:5%;width:20%;"><button class="lookup_button" type="submit" id="search_button" onclick="">Search</button></div>
                      </form>
                    </div>
                </div>
              </div>
    
              
              <div class="col-lg-8 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:50rem;display:block;">
                <div class="icon-box" style="height:100%;">
                  <h4 class="title" style="text-align:center;color:#6168ed;font-size: 20px;font-family: OCR A Std, monospace;">Sign in with metamask to view the DAO</h4>
                  
                </div>
              </div>
              `

  row2 = `
              <div class="col-lg-3 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:41.3rem; display:block;margin-right:10px;margin-left: 80px;margin-top:-44.3rem;">
                <div class="icon-box" style="height:100%;">
                <div style="height:100%;">
                <p class="title" style="text-align:center;color:#6168ed;margin-bottom:-1px;">Pre-Alpha V0.01 in Development!</p>
                <br>
                <p class="title" style="text-align:center;color:#6168ed;margin-bottom:-1px;font-size: 16px;">Join the Discord Here: <a href="https://discord.gg/RJJkjVPgXP">In Search of Knowledge</a> and create your account with /createaccount</p>
                <br>
                <p class="title" style="text-align:center;color:#6168ed;margin-bottom:-1px;font-size: 16px;">Find rare items! Mint and trade items as NFTs! Earn Books of Knowledge and gain xp to level up your skills!</p>
                <br>
                <p style="text-align:center;color:#6168ed;font-size: 24px;">Thanks for playing!</p>
              </div>
                  <div class="col-lg-6 col-md-6 mt-12 mb-lg-12" style="height:6rem;margin-right:auto;margin-left:auto;>
                    <div style="height:100%;">
                      <p class="title" style="text-align:center;color:#6168ed;margin-bottom:-1px;"></p>
                      <p style="text-align:center;color:#6168ed;font-size: 24px;"></p>
                    </div>
                  </div>
                </div>
              `
  $('#row1').append(row1)
  $('#row2').append(row2)
}

function render_page () {
  row1 = `
            <div class="col-lg-3 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem; display:block;margin-right:10px;margin-left: 80px;">
              <div class="icon-box" style="height:100%;">
                <h4 class="title" style="text-align:center;color:#6168ed;">Find a Proposal</h4>
                <div style="height:100%;">
                    <form action="/lookup?ual=${$('#ual')}" method="GET">
                      <input name="ual" id="ual" rows="4" placeholder="  Search a proposal UAL..." style="width:70%;margin-left:25%;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" required ></input>
                      <div style="margin-top:-1.75rem;margin-left:5%;width:20%;"><button class="lookup_button" type="submit" id="search_button" onclick="">Search</button></div>
                    </form>
                  </div>
              </div>
            </div>
  
            
            <div class="col-lg-8 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:50rem;display:block;">
              <div class="icon-box" style="height:100%;">
                <h4 class="title" style="text-align:center;color:#6168ed;font-size: 24px;">otnode.com Alliance</h4>
                <div class="col-lg-6 col-md-6 mt-12 mb-lg-3" style="border: 2px solid #6168ed;border-radius:10px 10px 10px 10px;margin-top:1.5rem;margin-left:1%;height:45rem;width:65%;>
                  <div style="height:10rem;border-radius:10px 10px 10px 10px;">
                    <div style="height:100%;">
                        <p class="title" style="text-align:center;color:#6168ed;font-size: 20px;">Proposals</p>
                        <div class="select" style="margin-left:5%;font-size:15px;width:8rem;">
                        <select id="standard-select-prop-filter" onchange="build_proposal_filter()"  style="height:1.3rem;" single>
                            <option>Type</option>
                            <option id="ask_change">Ask Change</option>
                            <option id="generic">Generic</option>
                        </select>
                        <span class="single_focus" style="font-size:12px;"></span>
                        </div>
                        <div style="margin-left:40rem;margin-top:-3.5%;border:none;">
                            <form>
                                <div class="php-email-form" style="background-color:none;" id="owner_buttons"></div>
                                <br>
                                <input type="radio" id="host" name="owner_type" value="host" style="accent-color: #6168ED;display: none;" checked="checked"/>
                                <input type="radio" id="self" name="owner_type" value="self" style="accent-color: #6168ED;display: none;"/>
                            </form>
                        </div>
                        <div class="scrollbar" id="style-default" style="width:97%;height:83%;">
                            <div id="proposal_elements" style="width:99%;height:90%;" >
                                
                            </div>
                        </div>
                    </div>
                  </div>
  
                  <div style="height:25rem;width:35%;margin-left:auto;margin-top:-47rem;>
                    <div style="height:100%;">
                      <div class="select" style="margin-left:35.5%;font-size:15px;margin-top:2rem;">
                        <select id="standard-select-form-filter" onchange="build_form_filter()" style="height:1.3rem;" single>
                            <option>Chose a Proposal Type</option>
                            <option value="ask_change">Ask Change</option>
                            <option value="generic">Generic</option>
                        </select>
                        <span class="single_focus" style="font-size:12px;"></span>
                        </div>
                      <div id="proposal_form" style="height:22rem;width:90%;margin-left:7.5%;margin-top:.5rem;margin-bottom:-1rem;">
                        
                      </div>
                      <p class="title" style="text-align:left;color:#6168ed;font-size:12px;margin-bottom:.2rem;margin-left:7.5%;">Your Voting History</p>
                      <div style="background-color: #ffffff;border-radius: 10px;border: 1px solid #6168ED;height:20.3rem;width:90%;margin-left:7.5%;">
                        <div class="scrollbar" id="style-default" style="width:97%;height:96%;margin-top:1%;">
                            <div id="vote_history" style="width:95%;height:95%;" >
                                
                            </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `
  $('#row1').append(row1)
}

function proposal_focus (focus_item) {
  focus_item = JSON.parse(focus_item)
  console.log(focus_item)
  row2 = `
                <div class="col-lg-3 col-md-6 mt-12 mb-5 mb-lg-12" style="height:41.3rem; display:block;margin-right:10px;margin-left: 80px;margin-top:-44.3rem;border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;">
                  <div class="icon-box" style="height:100%;">
                    <h4 class="title" style="text-align:center;color:#6168ed;font-size: 20px;">Item Viewer</h4>
                    <div style="height:6rem;margin-bottom:.5rem;box-shadow:#FFFFFF;">
                      <div style="height:14rem;background-color:#EAE6E6;width:80%;margin-left: 10%;">
                          <h4 style="color:#6168ed;font-size: 16px;margin-right:auto;margin-left:5%;text-align:center;padding-top:5rem;"><b>Item Images Coming Soon!</b></h4>
                      </div>
                    </div>
                    <div class="icon-box" id="view_item_elements" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:18rem;width:90%;margin-left:5%;margin-top:30%;">  
                      <h4 class="title" style="text-align:center;color:#6168ed;">${focus_item.name}</h4>
                      <div style="height:18rem;width:90%;">
                        <p style="text-align:left;color:#6168ed;margin-top:-3rem;">${focus_item.rarity}</p>
                        <p style="text-align:left;color:#6168ed;margin-left: 10%;height:5rem;">${focus_item.description}</p>
                        <p style="text-align:left;color:#6168ed;margin-left: 10%;height:4rem;margin-top:-.5rem;"><b>EFFECT:</b> ${focus_item.effect}</p>
                        <p style="text-align:left;color:#6168ed;margin-left: 10%;width:30%;"><b>BOOST:</b> ${focus_item.boost}</p>
                        <p style="text-align:left;color:#6168ed;margin-left: 50%;margin-top:-2.5rem;"><b>KNOWLEDGE:</b> ${focus_item.knowledge}</p>
                        <p style="text-align:right;color:#6168ed;margin-right: auto;"><b>Qty.</b> ${focus_item.quantity}</p>
                      </div> 
                    </div>
                    <div id="vote_area">
                      <h4 style="color:#6168ed;font-size: 12px;margin-top:1rem;text-align:center;"><b>${focus_item.ual}</b></h4>
                    </div>
                  </div>
                </div>
                `

  $('#row2').append(row2)
}

function proposal_view () {
  row2 = `
            <div class="col-lg-3 col-md-6 mt-12 mb-5 mb-lg-12" style="height:41.3rem; display:block;margin-right:10px;margin-left: 80px;margin-top:-44.3rem;border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;">
              <div class="icon-box" style="height:100%;">
                <h4 class="title" style="text-align:left;color:#6168ed;font-size: 13px;">Proposal Viewer</h4>
                <div style="height:6rem;margin-bottom:.5rem;box-shadow:#FFFFFF;">
                <div id="view_proposal_elements" style="height:25rem;width:95%;margin-left:2.5%;margin-top:2%;margin-bottom:-2rem;">  
                  <h4 style="color:#6168ed;font-size: 16px;margin-right:auto;margin-left:5%;text-align:center;padding-top:1rem;"><b>Select a proposal to vote!</b></h4>
                </div>
                 <div id="vote_area" style="padding-top:1rem;">
                 </div>
              </div>
            </div>
            `

  $('#row2').append(row2)
}

function vote_list (vote_header) {
  vote_header = JSON.parse(vote_header)
  votes = ``
  for (i = 0; i < vote_header.length; ++i) {
    vote = vote_header[i]

    vote_ual = vote.vote_ual
    secondSlashIndex = vote_ual.indexOf('/', vote_ual.indexOf('/') + 1)
    vote_ual = vote_ual.substring(secondSlashIndex + 1)

    proposal_ual = proposal.proposal_ual
    secondSlashIndex = proposal_ual.indexOf('/', proposal_ual.indexOf('/') + 1)
    proposal_ual = proposal_ual.substring(secondSlashIndex + 1)

    votes =
      votes +
      `         
    <div class="vote_tile" style="height:100%;padding-top:1rem;height:4rem;width:100%;float:right;margin-left:5%;margin-bottom:1%;">
    <p style="color:#6168ed;float:right;margin-top:-1.1rem;margin-bottom:.75rem;font-size: 14px;width:100%;margin-left:5%;"><b>Proposal Asset: ${proposal_ual}</b></p>
    <p style="color:#6168ed;margin-bottom:-1px;font-size:13px;word-wrap: break-word;width:100%;margin-left:5%;"><b>Vote Asset: ${vote_ual}</b></p>
    </div>
    `
  }

  $('#vote_history').empty()
  $('#vote_history').append(votes)
}

function build_active_proposals (proposal_header) {
  proposal_header = JSON.parse(proposal_header)
  active_proposal_elements = ''
  for (i = 0; i < proposal_header.length; ++i) {
    proposal = proposal_header[i]
    console.log('here1')
    console.log(proposal)

    if (proposal.active == '1') {
      console.log('here2')
      ual = proposal.proposal_ual
      secondSlashIndex = ual.indexOf('/', ual.indexOf('/') + 1)
      ual = ual.substring(secondSlashIndex + 1)

      if (proposal.proposal_type == 'ask_change_proposal') {
        details = proposal.details.substring(0, 60)

        active_proposal_elements =
          active_proposal_elements +
          `       
                  <div class="skill_tile" onclick='load_proposal(${JSON.stringify(
                    proposal.proposal_ual
                  )})' style="height:100%;padding-top:1rem;height:10rem;width:30%;float:right;margin-left:2.5%;margin-bottom:2%;">
                  <p style="text-align:center;color:#6168ed;float:right;margin-top:-1.1rem;margin-bottom:.75rem;margin-right:1rem;font-size: 14px;"><b>${ual}</b></p>
                  <p style="color:#6168ed;margin-bottom:-15px;font-size:18px;margin-left:.5rem;margin-top:.5rem;white-space: nowrap;"><b>Proposed Ask: ${proposal.ask}</b></p>
                  <br>
                  <p style="color:#6168ed;font-size:18px;word-wrap: break-word;margin-left:1rem;">
                  <b>Yes: </b><span style="color:green;">${
                    proposal.yes_vote
                  }</span>
                  <br>
                  <b>No:  </b><span style="color:red;"> ${
                    proposal.no_vote
                  }</span>
                  </p>
                  <p style="color:#6168ed;margin-bottom:-15px;font-size:15px;word-wrap: break-word;padding-left:.5rem;padding-top:5px;">
                  <b><span style="">Proposed by:</b> ${proposal.proposer.substring(
                    0,
                    10
                  )}</span>
                  </p>
                  </div>
                  
                  `
      }

      if (proposal.proposal_type == 'generic_proposal') {
        active_proposal_elements =
          active_proposal_elements +
          `        
                    <div class="skill_tile" onclick='load_proposal(${JSON.stringify(
                      proposal.proposal_ual
                    )})' style="height:100%;padding-top:1rem;height:10rem;width:30%;float:right;margin-left:2.5%;margin-bottom:2%;">
                    <p style="text-align:center;color:#6168ed;float:right;margin-top:-1.1rem;margin-bottom:.75rem;margin-right:1rem;font-size: 14px;"><b>${ual}</b></p>
                    <p style="color:#6168ed;margin-bottom:-15px;font-size:15px;word-wrap: break-word;padding-left:.5rem;"><b>${proposal.details.substring(
                      0,
                      60
                    )}</b></p>
                    <br>
                    <p style="color:#6168ed;font-size:13px;word-wrap: break-word;margin-left:1rem;">
                    <b>Yes: </b><span style="color:green;">${
                      proposal.yes_vote
                    }</span>
                    <br>
                    <b>No:  </b><span style="color:red;padding-bottom:-8px;">${
                      proposal.no_vote
                    }</span>
                    <br>
                    <b><span style="margin-left:-.5rem;">Proposed by:</b> ${proposal.proposer.substring(
                      0,
                      10
                    )}</span>
                    </p>
                    </div>
                    
                    `
      }
    }
  }
  $('#proposal_elements').empty()
  $('#proposal_elements').append(active_proposal_elements)
}

function build_closed_proposals (proposal_header) {
  proposal_header = JSON.parse(proposal_header)
  closed_proposal_elements = ''
  for (i = 0; i < proposal_header.length; ++i) {
    proposal = proposal_header[i]

    if (proposal.active == 0) {
      ual = proposal.proposal_ual
      secondSlashIndex = ual.indexOf('/', ual.indexOf('/') + 1)
      ual = ual.substring(secondSlashIndex + 1)

      if (proposal.proposal_type == 'ask_change_proposal') {
        closed_proposal_elements =
          closed_proposal_elements +
          `       
                  <div class="skill_tile" onclick='load_proposal(${JSON.stringify(
                    proposal.proposal_ual
                  )})' style="height:100%;padding-top:1rem;height:10rem;width:30%;float:right;margin-left:2.5%;margin-bottom:2%;">
                  <p style="text-align:center;color:#6168ed;float:right;margin-top:-1.1rem;margin-bottom:.75rem;margin-right:1rem;font-size: 14px;"><b>${ual}</b></p>
                  <p style="color:#6168ed;margin-bottom:-15px;font-size:18px;margin-left:.5rem;margin-top:.5rem;white-space: nowrap;"><b>Proposed Ask: ${proposal.ask}</b></p>
                  <br>
                  <p style="color:#6168ed;font-size:18px;word-wrap: break-word;margin-left:1rem;">
                  <b>Yes: </b><span style="color:green;">${
                    proposal.yes_vote
                  }</span>
                  <br>
                  <b>No:  </b><span style="color:red;"> ${
                    proposal.no_vote
                  }</span>
                  </p>
                  <p style="color:#6168ed;margin-bottom:-15px;font-size:15px;word-wrap: break-word;padding-left:.5rem;padding-top:5px;">
                  <b><span style="">Proposed by:</b> ${proposal.proposer.substring(
                    0,
                    10
                  )}</span>
                  </p>
                  </div>
                  
                  `
      }

      if (proposal.proposal_type == 'generic_proposal') {
        closed_proposal_elements =
          closed_proposal_elements +
          `
                
                <div class="skill_tile" onclick='load_proposal(${JSON.stringify(
                  proposal.proposal_ual
                )})' style="height:100%;padding-top:1rem;height:10rem;width:30%;float:right;margin-left:2.5%;margin-bottom:2%;">
                <p style="text-align:center;color:#6168ed;float:right;margin-top:-1.1rem;margin-bottom:.75rem;margin-right:1rem;font-size: 14px;"><b>${ual}</b></p>
                <p style="color:#6168ed;margin-bottom:-15px;font-size:15px;word-wrap: break-word;padding-left:.5rem;"><b>${proposal.details.substring(
                  0,
                  60
                )}</b></p>
                <br>
                <p style="color:#6168ed;font-size:13px;word-wrap: break-word;margin-left:1rem;">
                <b>Yes: </b><span style="color:green;">${
                  proposal.yes_vote
                }</span>
                <br>
                <b>No:  </b><span style="color:red;padding-bottom:-8px;">${
                  proposal.no_vote
                }</span>
                <br>
                <b><span style="margin-left:-.5rem;">Proposed by:</b> ${proposal.proposer.substring(
                  0,
                  10
                )}</span>
                </p>
                </div>
                
                `
      }
    }
  }
  $('#proposal_elements').empty()
  $('#proposal_elements').append(closed_proposal_elements)
}

function build_form_filter () {
  form = ``

  console.log(document.getElementById('ask_change').selected)
  if (
    document.getElementById('standard-select-form-filter').value ===
    'ask_change'
  ) {
    form = `
        <p style="color:#6168ed;font-size:12px;font-family: OCR A Std, monospace;margin-bottom:-1.5rem;line-height: 1.1;"><b>The Dao updates the Perpetual Ask Asset(PAA) every new epoch(90 days). The ask proposal most voted yes at the end of the 90 days represent the new ask that will be updated to the PAA. Maximum of 15% deviation from the current ask. Please provide reasoning and calculations when proposing a new ask.</b></p>
            <input type="text" name="proposal_type" id="proposal_type" style="display:none;" value="ask_change_proposal"></input>
            <br>
            <br>
             <span style="width:20%;margin-left:5%;color:#6168ed;font-family: OCR A Std, monospace;"><b>Proposed ask:</b></span>
             <input name="proposed_ask" id="proposed_ask" rows="4" placeholder="$TRAC" style="font-family: OCR A Std, monospace;float:right;width:20%;margin-right:40%;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" value="" pattern="[0-9]*\.?[0-9]*" maxlength="18" maxlength="1" required></input>
             <br>
             <span style="width:20%;margin-left:5%;color:#6168ed;font-family: OCR A Std, monospace;margin-top:-2rem;"><b>Reasoning:</b></span>
             <br>
             <textarea name="reason" id="reason" rows="4" placeholder="200 characters or less" style="font-family: OCR A Std, monospace;float:right;width:90%;margin-right:5%;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;resize: none;" value="" maxlength="200" maxlength="1" required></textarea>
             <span style="font-weight: 400;margin-bottom:-1.4rem;margin-left:21.5%;font-size:22px;font-family: OCR A Std, monospace;display:none;font-size:12px;color:red;" id="invalid_json">Invalid JSON</span>
             <span style="font-weight: 400;margin-bottom:-1.4rem;margin-left:21.5%;font-size:22px;font-family: OCR A Std, monospace;display:none;font-size:12px;color:red;" id="invalid_chain">Invalid Chain</span>
             <div type="submit" class="mint_button" id="proposalButton" style="margin-left:22.5%;margin-top:7%;font-family: OCR A Std, monospace;width:55%;height:2.5rem;padding-top:6px;padding-left:12px;" onclick="sendProposal()">
                 <p class="title" style="margin-left:15%;font-size:15px;font-family: OCR A Std, monospace;">Submit Proposal</p>
             </div>`
  }

  if (
    document.getElementById('standard-select-form-filter').value === 'generic'
  ) {
    form = `
    <p style="color:#6168ed;font-size:12px;font-family: OCR A Std, monospace;margin-bottom:-1.5rem;line-height: 1.1;"><b>The generic proposal should be used for all non-ask related proposals. Examples: New features, member promotions, treasurey decisions, etc</b></p>
        <input type="text" name="proposal_type" id="proposal_type" style="display:none;" value="generic_proposal"></input>
        <br>
        <br>
         <span style="width:20%;margin-left:5%;color:#6168ed;font-family: OCR A Std, monospace;"><b>Title/Question:</b></span>
         <br>
         <input name="title" id="title" rows="4" placeholder="proposal title/question" style="font-family: OCR A Std, monospace;float:right;width:90%;margin-right:5%;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" value="" ></input>
         <br>
         <br>
         <span style="width:20%;margin-left:5%;color:#6168ed;font-family: OCR A Std, monospace;margin-top:-2rem;"><b>Details:</b></span>
         <br>
         <textarea name="details" id="details" rows="4" placeholder="1000 characters or less" style="font-family: OCR A Std, monospace;float:right;width:90%;margin-right:5%;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;resize: none;" value="" maxlength="1000" rows="25" cols="50"></textarea>
         <span style="font-weight: 400;margin-bottom:-1.4rem;margin-left:21.5%;font-size:22px;font-family: OCR A Std, monospace;display:none;font-size:12px;color:red;" id="invalid_json">Invalid JSON</span>
         <span style="font-weight: 400;margin-bottom:-1.4rem;margin-left:21.5%;font-size:22px;font-family: OCR A Std, monospace;display:none;font-size:12px;color:red;" id="invalid_chain">Invalid Chain</span>
         <div type="submit" class="mint_button" id="proposalButton" style="margin-left:22.5%;margin-top:5%;font-family: OCR A Std, monospace;width:55%;height:2.5rem;padding-top:6px;padding-left:12px;" onclick="sendProposal()">
             <p class="title" style="margin-left:15%;font-size:15px;font-family: OCR A Std, monospace;">Submit Proposal</p>
         </div>`
  }

  $('#proposal_form').empty()
  $('#proposal_form').append(form)
}
