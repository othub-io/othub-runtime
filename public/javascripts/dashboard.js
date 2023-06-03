function nav (admin_key, chain_id) {
  if (chain_id == 'Unsupported chain!') {
    chain_id = ''
  }

  if (!admin_key) {
    explore = `
          <form action="/alliance" method="GET" style="padding-right:40px;">
          <button id="connectWalletButton">Alliance</button>
          <button class="connectWalletButton" style="display:none;"></button>
          <button class="connectWalletButton" style="display:none;"></button>
          </form>
          `
    element = ``
  } else {
    explore = `
          <form action="/alliance" method="GET" style="padding-right:40px;">
          <button id="connectWalletButton">Alliance</button>
          <button class="connectWalletButton" style="display:none;"></button>
          <button class="connectWalletButton" style="display:none;"></button>
          </form>
          `

    trim_admin_key = admin_key.substring(0, 10)
    element = `<p style="color:#13B785;margin-right:80px;font-size:18px;font-family: OCR A Std, monospace;padding-top:1rem;"><i class="ri-check-double-line" style="color:#13B785;padding-right:3px;"></i>${chain_id} | ${trim_admin_key}..</p>`
  }

  $('#explore').append(explore)
  $('#MM').append(element)
}

function node_table (admin_key) {
  console.log(`THIS MY OWNER ADDRESS: ${admin_key}`)
  row1 = `
            <div class="col-lg-3 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem;display:block;margin-right:10px;margin-left: 80px;">
              <div class="icon-box" style="height:100%;">
                
              </div>
            </div>
  
            
            <div class="col-lg-8 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:50rem;display:block;">
              <div class="icon-box" style="height:100%;">
                <h4 class="title" style="text-align:center;color:#6168ed;font-size: 36px;font-family: OCR A Std, monospace;">Dashboard</h4>
                <div class="scrollbar" id="style-default" style="width:97%;height:88%;font-family: OCR A Std, monospace;">
                  <div class="col-lg-12 grid-margin stretch-card">
                      <div class="card">
                            <div class="card-body" style="border:none;">
                              <div class="table-responsive">
                                <table class="table table-hover">
                                  <thead style="color:#6168ed;">
                                    <tr style="color:#6168ed">
                                      <th width="500">Node ID</th>
                                      <th width="180">Verification Ask</th>
                                      <th width="90">Verified</th>
                                      <th width="180">Telegram Bot Token</th>
                                      <th width="130"></th>
                                    </tr>
                                  </thead>
                                  <tbody id="node_table">
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                </div>
              </div>
            </div>
            `

  row2 = `
            <div class="col-lg-3 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:41.3rem; display:block;margin-right:10px;margin-left: 80px;margin-top:-44.3rem;font-family: OCR A Std, monospace;">
              <div class="icon-box" style="height:100%;">
  
                <div  style="height:6rem;;margin-right:auto;margin-left:auto;margin-bottom:10rem;box-shadow:#FFFFFF;">
                  <div style="height:100%;">
                    <p class="title" style="text-align:center;color:#6168ed;margin-bottom:-1px;">Your Alliance Nodes</p>
                    <br>
                    <p class="title" style="text-align:center;color:#6168ed;margin-bottom:-1px;font-size: 16px;">After verifying your mainnet node, you will be granted access to the Alliance <a href="https://t.me/+AO_0sqDTBqNkMjdh">Telegram</a> to collaborate with other operators.</p>
                    <br>
                    <p class="title" style="text-align:center;color:#6168ed;margin-bottom:-1px;font-size: 16px;">Keep your nodes within the Alliance's ask range or risk being removed from the alliance.</p>
                  </div>
                </div>
                <form id="alliance_button" action="/alliance" method="GET" >
                    <button type="submit" class="menu_tile" style="padding-top:.5rem;height:3rem;width:80%;margin-left:10%;margin-right:10%;margin-top:1rem;">
                    <p class="title" style="text-align:center;font-size:22px;font-family: OCR A Std, monospace;">Alliance</p>
                    </button>
                </form>
                <form id="generateKey" action="/generateKey" method="POST" style="padding-top:.5rem;">
                    <input type="text" name="owner_address" id="owner_address" style="display:none;" value="${admin_key}"></input>
                    <input type="text" name="chain_id" id="chain_id" style="display:none;" value="${chain_id}"></input>
                    <button type="submit" class="menu_tile" style="padding-top:.5rem;height:3rem;width:80%;margin-left:10%;margin-right:10%;margin-top:1rem;">
                    <p class="title" style="text-align:center;font-size:22px;font-family: OCR A Std, monospace;" onclick="hide_generateKey()">Generate Api Key</p>
                    </button>
                </form>
                <div id="api_key_created" style="text-align:center;font-size:22px;font-family: OCR A Std, monospace;color:green;">${api_key}</div>
              </div>
            `
  $('#row1').append(row1)
  $('#row2').append(row2)
}

function build_nodes (alliance_member, admin_key) {
  alliance_member = JSON.parse(alliance_member)

  console.log(alliance_member)
  console.log(admin_key)

  for (i = 0; i < alliance_member.length; ++i) {
    node = alliance_member[i]

    bot_id_button = ``
    button = `<td style="overflow:hidden;">
                <form id="verify_button" action="/alliance/mynodes" method="POST">
                    <input name="node_owner" id="node_owner" rows="4" style="display:none;" value="${admin_key}"></input>
                    <input name="node_id" id="node_id" rows="4" style="display:none;" value="${node.node_id}"></input>
                    <input name="verification_ask" id="verification_ask" rows="4" style="display:none;" value="${node.verification_ask}" ></input>
                    <button type="submit" class="menu_tile" id="verify_button" style="height:2rem;width:80%;margin-left:10%;margin-right:10%; onclick="hide_verify()"">
                    <p class="title" style="text-align:center;font-size:16px;font-family: OCR A Std, monospace;">Verify</p>
                    </button>
                </form>
                </td>
                <td style="overflow:hidden;">
                <form id="verify_button" action="/alliance/mynodes" method="POST">
                    <input name="node_owner" id="node_owner" rows="4" style="display:none;" value="${admin_key}"></input>
                    <input name="node_id" id="node_id" rows="4" style="display:none;" value="${node.node_id}"></input>
                    <input name="verification_ask" id="verification_ask" rows="4" style="display:none;" value="${node.verification_ask}"></input>
                    <input name="forget" id="forget" rows="4" style="display:none;" value="forget"></input>
                    <button type="submit" class="menu_tile" style="height:2rem;width:80%;margin-left:10%;margin-right:10%;">
                    <p class="title" style="text-align:center;font-size:16px;font-family: OCR A Std, monospace;">Forget</p>
                    </button>
                </form>
                </td>`

    if (node.verified == 1) {
      bot_id_button = `<td style="overflow:hidden;">
            <form id="botid_button" action="/alliance/mynodes" method="POST">
              <input name="node_owner" id="node_owner" rows="4" style="display:none;" value="${admin_key}"></input>
              <input name="node_id" id="node_id" rows="4" style="display:none;" value="${node.node_id}"></input>
              <input name="verification_ask" id="verification_ask" rows="4" style="display:none;" value="${node.verification_ask}" ></input>
              <input name="bot_id" id="bot_id" style="width:11rem;" value="" placeholder="${node.bot_id}"></input>
              <button type="submit" class="menu_tile" id="verify_button" style="height:2rem;width:80%;margin-left:10%;margin-right:10%;margin-top:4px;" onclick="hide_verify()">
              <p class="title" style="text-align:center;font-size:16px;font-family: OCR A Std, monospace;">Set Token</p>
              </button>
            </form>
          </td>`

      button = `
              <td style="overflow:hidden;">
                <form id="verify_button" action="/alliance/mynodes" method="POST">
                    <input name="node_owner" id="node_owner" rows="4" style="display:none;" value="${admin_key}"></input>
                    <input name="node_id" id="node_id" rows="4" style="display:none;" value="${node.node_id}"></input>
                    <input name="verification_ask" id="verification_ask" rows="4" style="display:none;" value="${node.verification_ask}"></input>
                    <input name="forget" id="forget" rows="4" style="display:none;" value="forget"></input>
                    <button type="submit" class="menu_tile" style="height:2rem;width:80%;margin-left:10%;margin-right:10%;">
                    <p class="title" style="text-align:center;font-size:16px;font-family: OCR A Std, monospace;">Forget</p>
                    </button>
                </form>
                </td>`
    }

    verified = 'yes'
    if (node.verified == 0) {
      verified = 'no'
    }

    ask = ''
    if (node.ask) {
      ask = node.ask
    }

    row_element = `
          <tr>
          <td style="overflow:hidden;">${node.node_id}</td>
          <td style="overflow:hidden;">${node.verification_ask}</td>
          <td style="overflow:hidden;">${verified}</td>
          ${bot_id_button}
          ${button}
          </tr>
          `
    $('#node_table').append(row_element)
  }
}

function loggedOut () {
  element = `<form><button class="connectWalletButton" id="connectWalletButton" style="margin-right:40px;">Connect Wallet</button></form>`
  $('#MM').append(element)

  row1 = `
        <div class="col-lg-5 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem; display:block;margin-left:auto;margin-right:auto;font-family: OCR A Std, monospace;">
          <div class="icon-box" style="height:100%;">
            <h4 class="title" style="text-align:center;color:#6168ed;">Please connect your <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target=_blank>MetaMask</a> wallet to explore.</h4>
          </div>
        </div>`

  $('#row1').append(row1)
}