function get_account () {
  $('#connectWalletButton').hide()
  getAccount()
  //document.getElementById("connectloading").style.display = "block";
  //$('.table_button').hide();
}

function logout () {
  $('#logoutButton').remove()
  localStorage.removeItem('owner_address')
  localStorage.removeItem('chain_id')
  localStorage.removeItem('api_key')
  document.getElementById('MM').innerHTML = ''
  document.getElementById('hero').innerHTML = ''
  element = `<form><button class="connectWalletButton" id="connectWalletButton" onclick="get_account()" style="margin-right:40px;">Connect Wallet</button>`
  $('#MM').append(element)

  row1 = `
    <div class="col-lg-5 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem; display:block;margin-left:auto;margin-right:auto;font-family: OCR A Std, monospace;">
        <div class="icon-box" style="height:100%;">
        <h4 class="title" style="text-align:center;color:#6168ed;margin-left:auto;margin-right:auto;">Please connect your wallet to regiser nodes!</h4>
        </div>
    </div>`

  $('#row1').append(row1)
}

function loggedIn (owner_address, chain_id) {
  if (chain_id == 'Unsupported chain!') {
    chain_id = ''
  }

  trim_owner_address = owner_address.substring(0, 10)
  element = `<p style="color:#13B785;margin-right:80px;font-size:18px;font-family: OCR A Std, monospace;padding-top:1rem;"><i class="ri-check-double-line" style="color:#13B785;padding-right:3px;"></i>${chain_id} | ${trim_owner_address}..</p>`
  log_out = `
        <form style="padding-right:40px;">
        <button id="connectWalletButton" onclick="logout()">Disconnect</button>
        <button class="connectWalletButton" style="display:none;"></button>
        <button class="sendButton" style="display:none;"></button>
        </form>
        `

  row1 = `
          <div class="col-lg-3 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem;display:block;margin-right:10px;margin-left: 80px;">
            <div class="icon-box" style="height:100%;font-family: OCR A Std, monospace;">
              <h4 class="title" style="text-align:center;color:#6168ed;font-size: 16px;font-family: OCR A Std, monospace;">Registry Info</h4>
              <div style="height:100%;">
                <p class="title" style="text-align:center;color:#6168ed;margin-bottom:-1px;font-size:14px;">Input Telegram name and Mainnet Node peer id to register!</p>
                <p class="title" style="text-align:center;color:#6168ed;margin-bottom:-1px;font-size:14px;">Change your ask to match the verification ask afterwards!</p>
                <p class="title" style="text-align:center;color:#6168ed;margin-bottom:-1px;font-size:14px;">You are ok to change your verification back to the Alliance range after verification.</p>
              </div>
            </div>
          </div>

          
          <div class="col-lg-8 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:50rem;display:block;font-family:OCR A Std, monospace;">
            <div class="icon-box" style="height:100%;font-family: OCR A Std, monospace;">
              <h4 class="title" style="text-align:center;color:#6168ed;font-size: 34px;font-family: OCR A Std, monospace;margin-top:2rem;">Register Node</h4>
              <form action="/alliance/register" method="POST">
                <input name="tg_id" id="tg_id" rows="4" placeholder="Telegram id" style="width:40%;margin-left:30%;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;margin-bottom:1rem;" required ></input>
                <input name="node_id" id="node_id" rows="4" placeholder="Node peer id" style="width:40%;margin-left:30%;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" required ></input>
                <input name="node_owner" id="node_owner" rows="4" style="display:none;" value="${owner_address}" required ></input>
                <button type="submit" class="menu_tile" style="padding-top:.5rem;height:3rem;width:20%;margin-left:40%;margin-right:10%;margin-top:2rem;">
                    <p class="title" style="text-align:center;font-size:22px;font-family: OCR A Std, monospace;" onclick="">Register</p>
                    </button>
              </form>
              <h4 class="title" style="text-align:center;margin-left:20%;margin-top:2rem;color:#6168ed;font-size: 34px;font-family: OCR A Std, monospace;width:60%;">STOP!- MAKE SURE YOU ARE CONNECTED WITH YOUR <u>EVM MANAGEMENT WALLET</u> IF YOU WANT ADDITONAL TOOLING FROM THE ALLIANCE!</h4>
              <p style="margin-left:30%;margin-top:2rem;"><a href="https://diyusthad.com/2022/03/how-to-get-your-telegram-chat-id.html" target=_blank>How do I find my telegram id?</a></p>
              <p style="margin-left:30%;margin-top:2rem;">How do I find my node id? <br>A- Restart your node and then look at your logs. <br>Your Node ID will be called out.</p>
            </div>
          </div>
          `

  row2 = `
          <div class="col-lg-3 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:41.3rem; display:block;margin-right:10px;margin-left: 80px;margin-top:-44.3rem;font-family:OCR A Std, monospace;">
            <div class="icon-box" style="height:100%;">
                    <form action="/alliance" method="GET">
                      <button type="submit" class="menu_tile" style="padding-top:.5rem;height:3rem;width:90%;margin-left:5%;margin-right:1.5%;margin-top:1rem;">
                      <p class="title" style="text-align:center;font-size:20px;">Alliance</p>
                      </button>
                    </form>
                    <form action="/alliance/mydashboard" method="GET">
                      <button type="submit" class="menu_tile" style="padding-top:.5rem;height:3rem;width:90%;margin-left:5%;margin-right:1.5%;margin-top:1rem;">
                        <input type="text" name="node_owner" id="node_owner" style="display:none;" value="${owner_address}"></input>
                      <p class="title" style="text-align:center;font-size:20px;">My Dashboard</p>
                      </button>
                    </form>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 mt-12 mb-lg-12" style="height:6rem;margin-right:auto;margin-left:auto;>
                <div style="height:100%;">
                  <p class="title" style="text-align:center;color:#6168ed;margin-bottom:-1px;"></p>
                  <p style="text-align:center;color:#6168ed;font-size: 24px;"></p>
                </div>
              </div>
            </div>
          `

  // if (chain_id == 'Unsupported chain!') {
  //   row1 = `
  //           <div class="col-lg-5 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:10rem; display:block;margin-left:auto;margin-right:auto;font-family: OCR A Std, monospace;">
  //           <div class="icon-box" style="height:100%;">
  //               <h4 class="title" style="text-align:center;color:#6168ed;">This network is not supported.</h4>
  //               <br>
  //               <h4 class="title" style="text-align:center;color:#6168ed;">Supported Networks:</h4>
  //               <h4 class="title" style="text-align:center;color:#6168ed;">Origintrail Parachain Testnet</h4>
  //           </div>
  //           </div>`
  //   row2 = ``

  //   element = `<p style="font-size:18px;color:#990e19;margin-right:80px;padding-top:1rem;font-family: OCR A Std, monospace;">${chain_id}</p>`
  //   log_out = `
  //           <form style="padding-right:40px;">
  //           <button id="connectWalletButton" onclick="logout()">Disconnect</button>
  //           <button class="connectWalletButton" style="display:none;"></button>
  //           <button class="sendButton" style="display:none;"></button>
  //           </form>
  //           `
  // }

  $('#logout').append(log_out)
  $('#MM').append(element)
  $('#row1').append(row1)
  $('#row2').append(row2)
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

function info_popup (menu_item) {
  lookup_desc = `<p class="title" style="color:#6168ed;font-size: 16px;">The UAL Lookup allows you to quickly get asset data based on the asset's UAL(Universal Asset Locator). Every asset on the DKG has a UAL. As long as its public, you can find the asset by its UAL!</p>`
  publish_desc = `<p class="title" style="color:#6168ed;font-size: 16px;">Mint an asset based on schema.org standards. Build your own data without the need to write json!</p>`
  update_desc = `<p class="title" style="color:#6168ed;font-size: 16px;">Update a previously minted asset with new data or more epochs! You will need the UAL of the asset before you can update it and youl will also need to be the original minter. Coming Soon.</p>`
  search_desc = `<p class="title" style="color:#6168ed;font-size: 16px;">Find assets on the DKG based only on keywords! Keywords are determined at the time of publishing/updating. Coming Soon.</p>`
  query_desc = `<p class="title" style="color:#6168ed;font-size: 16px;">Write your own SPARQL queries to retrieve data from the DKG.</p>`
  dashboard_desc = `<p class="title" style="color:#6168ed;font-size: 16px;">A dashboard to view all of your transaction acitivty including api, game, and web transactions! View your activity trends and more. Coming Soon.</p>`
  isok_desc = `<p class="title" style="color:#6168ed;font-size: 16px;">A discord text game where you mint and own your own profile and game assets! Explore and Trek through different areas to earn rare and unique items. Use those items to discover books of knowledge to gain experience and skill levels! Mint your funny or clever stories to share with friends!</p><br>
  <p class="title" style="color:#6168ed;font-size: 16px;">Join the Discord Here: <a href="https://discord.gg/RJJkjVPgXP">In Search of Knowledge</a> and create your account with /createaccount</p>
  `

  if (menu_item == 'lookup') {
    desc = lookup_desc
  }

  if (menu_item == 'publish') {
    desc = publish_desc
  }

  if (menu_item == 'update') {
    desc = update_desc
  }

  if (menu_item == 'search') {
    desc = search_desc
  }

  if (menu_item == 'query') {
    desc = query_desc
  }

  if (menu_item == 'dashboard') {
    desc = dashboard_desc
  }

  if (menu_item == 'isok') {
    desc = isok_desc
  }

  if (desc) {
    $('#menuInfo').empty()
    $('#menuInfo').append(desc)
  }
}
