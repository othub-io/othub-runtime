function sidebar (admin_key) {
  sidebar_html = `<a href="#" style="margin-left:-10%;"><img src="https://img.icons8.com/ios/50/000000/safe.png"/>Assets</a>
  <a href="#" style="margin-left:-10%;"><img src="https://img.icons8.com/ios/50/000000/server.png"/>Nodes</a>
  <div class="dropdown">
    <a href="#" style="margin-left:1%;"><img src="https://img.icons8.com/ios/50/000000/star.png"/>My Nodes</a>
    <div class="dropdown-content">
      <a href="#">Dashboard</a>
      <a href="/myNodes/settings?admin_key=${admin_key}" onclick="showLoadingCircle()">Settings</a>
    </div>
  </div>
  <div class="dropdown">
    <a href="#" style="margin-left:-8%;"><img src="https://img.icons8.com/ios/50/000000/handshake.png"/>Alliance</a>
    <div class="dropdown-content">
      <a href="/alliance/members" onclick="showLoadingCircle()">Members</a>
      <a href="#">Vote</a>
    </div>
  </div>
  <div class="dropdown">
    <a href="#" style="margin-left:-8%;"><img src="https://img.icons8.com/ios/50/000000/line-chart.png"/>Reports</a>
    <div class="dropdown-content">
      <a href="#">Epochs</a>
      <a href="#">KB Size</a>
    </div>
  </div>
  <div class="dropdown">
    <a href="#" style="margin-left:2%;"><img src="https://img.icons8.com/ios/50/000000/settings.png"/>DKG Tools</a>
    <div class="dropdown-content">
      <a href="#">UAL Lookup</a>
      <a href="#">Publish</a>
      <a href="#">Update</a>
    </div>
  </div>
  <div class="dropdown">
    <a href="#" style="margin-left:-10%;"><img src="https://img.icons8.com/ios/50/000000/map.png"/>Guides</a>
    <div class="dropdown-content">
      <a href="#">Wallet Mapping</a>
      <a href="#">Node Install</a>
    </div>
  </div>
  <div class="dropdown">
    <a href="#" style="margin-left:3%;"><img src="https://img.icons8.com/ios/50/000000/api.png"/>otnode API</a>
    <div class="dropdown-content">
      <a href="/api?admin_key=${admin_key}" onclick="showLoadingCircle()">Generate Keys</a>
      <a href="#">Docs</a>
    </div>
  </div>`
  $('#sidebar').append(sidebar_html)
}

function logout () {
  document.getElementById('navbar').innerHTML = ''
  document.getElementById('main').innerHTML = ''
  localStorage.removeItem('admin_key')
  localStorage.removeItem('chain_id')
  localStorage.removeItem('api_key')
  element = `
  <h1>otnode.com</h1>
  <button class="connectWalletButton" id="connect-btn" onclick="getAccount('a')">Connect</button>
  `
  $('#navbar').append(element)

  element = `
    <div style="margin-top:10%;width:50%;border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem; display:block;margin-left:auto;margin-right:auto;font-family: OCR A Std, monospace;">     
        <h4 class="title" style="text-align:center;color:#6168ed;margin-left:auto;margin-right:auto;">Please connect your admin wallet to view your nodes.</h4>
    </div>`

  $('#main').append(element)
}

function loggedIn (admin_key, chain_id) {
  document.getElementById('navbar').innerHTML = ''
  front_admin_key = admin_key.substring(0, 6)
  back_admin_key = admin_key.substring(admin_key.length - 6)
  addr = ` - ${front_admin_key}...${back_admin_key}`
  let color
  let margin
  color = '#13B785'
  margin = `-54%`

  if (chain_id == 'error') {
    chain_id = `Unsupported Chain`
    color = `red`
    addr = ``
    margin = `-70.25%`
  }

  if (chain_id == 'Origintrail Parachain Testnet') {
    chain_id = `Origintrail Parachain Testnet`
    color = `#13B785`
    margin = `-52.75%`
  }

  if (chain_id == 'Origintrail Parachain Mainnet') {
    chain_id = `Origintrail Parachain Mainnet`
    color = `#13B785`
    margin = `-52.85%`
  }

  element = `
  <h1><a href="/" style="color: #6168ED;text-decoration:none;">otnode.com</a></h1>
  <p style="color:${color};font-size:20px;font-family: OCR A Std, monospace;margin-left:${margin};"> | ${chain_id}${addr}</p>
  <button  id="connect-btn" onclick="logout()">Disconnect</button>
  <button class="connectWalletButton" style="display:none;"></button>
  `
  $('#navbar').append(element)
}

function renderPage (nodeRecords, operatorRecord, chain_id, admin_key) {
  nodeRecords = JSON.parse(nodeRecords)
  operatorRecord = JSON.parse(operatorRecord)
  telegramID = operatorRecord[0].telegramID
  botToken = operatorRecord[0].botToken
  nodeGroup = operatorRecord[0].nodeGroup
  access = 'Basic'
  graphic = `<form id="joinAlliance" action="/myNodes/settings" method="POST" style="margin-top:-5%;">
              <input type="text" name="admin_key" id="admin_key" style="display:none;" value="${admin_key}"></input>
              <input id="chain_id" name="chain_id" style="display:none;" value="${chain_id}"></input>
              <input name="joinAlliance" id="joinAlliance" style="display:none;" value="Alliance"></input>
              <br>
              <button class="settings-btn" id="join-alliance-btn" style="margin-left:15%;"><b>Join Alliance</b></button>
            </form>`
  leave_btn_margin = '0%'

  if (!telegramID) {
    telegramID = 'Not Set'
  }

  if (!botToken) {
    botToken = 'Not Set'
  }

  if (nodeGroup === 'Alliance') {
    access = 'Premium'
    graphic = `<div class="star" style="margin-top: -5%;margin-left:-24.75%;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <polygon fill="gold" points="256,8 314.395,195.472 503.526,186.513 354.931,301.528 413.326,489 256,396.542 98.674,489 157.069,301.528 8.474,186.513 197.605,195.472"/>
                  </svg>
                </div>`
    leave_btn_margin = '15%'
  }

  element = `
    <p style="margin-left:10%;margin-top:1%;color: #6168ED;">My Node Settings</p>
    <div id="alliance_main">
      <div style="width:50%;height:50%;">
        <h4 style="color:#6168ed;padding-top:3%;margin-left:3%;text-decoration: underline;">Account Management</h4>
        </svg>
        <span style="color: #6168ED;margin-left:5%;"><b>Access:</b></span>
        <br>
        <span style="color: #6168ED;margin-left:5%;">${access}</span>
        <br>
        <br>
        <span style="color: #6168ED;margin-left:5%;"><b>Telegram ID:</b> <button onclick="openPopup2()"><img width=15 height=15 style="border:none;" src="https://img.icons8.com/material-rounded/24/000000/pencil.png"/></button></span>
        <br>
        <span style="color: #6168ED;margin-left:5%;">${telegramID}</span><br>
        <div id="overlay2"></div>
        <div id="popup2">
            <button id='generate-key-btn' onclick="closePopup2()" style="float:right;margin-right:-1%;">X</button>
          <h2>Enter your Telegram ID</h2>
          <p>Add your telegram ID to recieve notifications!<br> Visit this <a href="https://diyusthad.com/2022/03/how-to-get-your-telegram-chat-id.html" target=_blank>link</a> to learn how to find your telegram ID.</p>
          <form id="addTelegramID" action="/myNodes/settings" method="POST">
            <input type="text" name="admin_key" id="admin_key" style="display:none;" value="${admin_key}"></input>
            <input id="chain_id" name="chain_id" style="display:none;" value="${chain_id}"></input>
              <input type="text" name="telegramID" id="telegramID" placeholder="Telegram ID" style="width:50%;margin-left:25%;margin-top:5%;" maxlength="30"></input>
              <br>
              <button id='generate-key-btn' style="margin-left:30%;margin-right:30%;margin-top:5%;width:40%">Submit</button>
            </form>
        </div>
        <br>
        <span style="color: #6168ED;margin-left:5%;"><b>Bot Token:</b><button onclick="openPopup()"><img width=15 height=15 style="border:none;" src="https://img.icons8.com/material-rounded/24/000000/pencil.png"/></button></span>
        <br>
        <span style="color: #6168ED;margin-left:5%;">${botToken}</span><br>
        <div id="overlay"></div>
        <div id="popup">
        <button id='generate-key-btn' onclick="closePopup()" style="float:right;margin-right:-1%;">X</button>
        <h2>Enter a Telegram bot token</h2>
        <p>Add a bot token that will deliver messages on otnode.com's behalf.<br>
        Message @Botfather on telegram to create a bot token.</p>
        <form id="addBottoken" action="/myNodes/settings" method="POST">
            <input type="text" name="admin_key" id="admin_key" style="display:none;" value="${admin_key}"></input>
            <input id="chain_id" name="chain_id" style="display:none;" value="${chain_id}"></input>
            <input type="text" name="botToken" id="botToken" placeholder="Bot Token" style="width:50%;margin-left:25%;margin-top:5%;" maxlength="30"></input>
            <br>
            <button id='generate-key-btn' style="margin-left:30%;margin-right:30%;margin-top:5%;width:40%">Submit</button>
          </form>
        </div>
        ${graphic}
          <form id="leaveAlliance" action="/myNodes/settings" method="POST" style="margin-top:${leave_btn_margin};">
            <input type="text" name="admin_key" id="admin_key" style="display:none;" value="${admin_key}"></input>
            <input id="chain_id" name="chain_id" style="display:none;" value="${chain_id}"></input>
            <input name="joinAlliance" id="joinAlliance" style="display:none;" value="Solo"></input>
            <br>
            <button style="margin-left:18.5%;font-size:11px;">Leave Alliance</button>
          </form>
      </div>
      <div style="width:25%;margin-left:1%;">
        <h4 style="color:#6168ed;margin-left:1.5%;text-decoration: underline;">OTNode Alliance Benefits:</h4>
        <ul style="color: #6168ED;margin-left:2.5%;word-wrap: break-word;">
          <li>Exclusive OTNode Telegram access</li>
          <li>Public and private Telegram bot alerts</li>
          <li>Increased API rate limits</li>
          <li>Exclusive reports</li>
          <li>NFT giveaways</li>
        </ul>
      </div>
      <div style="width:25%;margin-left:1%;padding-top:5px;">
        <h4 style="color:#6168ed;margin-left:1.5%;text-decoration: underline;">OTNode Alliance Requirements:</h4>
        <ul style="color: #6168ED;margin-left:2.5%;word-wrap: break-word;">
          <li>Origintrail v6 <b>mainnet</b> node</li>
          <li>Minimum ask >= Alliance minimum ask</li>
        </ul>
      </div>
      <div style="width:70%;height:95%;float:right;margin-right:2%;margin-top:-49%;" class=scrollable>
          <table >
          <thead>
          <tr>
              <th>Network ID</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Payouts</th>
              <th>Future Payouts</th>
              <th>Group</th>
              <th>Ask</th>
          </tr>
          </thead>
          <tbody id="node_rows">
          </tbody>
      </table>
      </div>
    </div>
    `

  $('#main').append(element)

  rows = ``
  for (i = 0; i < nodeRecords.length; ++i) {
    nodeRecord = nodeRecords[i]
    rows =
      rows +
      `
      <tr>
        <td>${nodeRecord.networkId}</td>
        <td>${nodeRecord.tokenName}</td>
        <td>${nodeRecord.tokenSymbol}</td>
        <td>${nodeRecord.cumulativePayouts.toFixed(2)}</td>
        <td>${nodeRecord.cumulativeEstimatedEarnings.toFixed(2)}</td>
        <td>${nodeGroup}</td>
        <td>${nodeRecord.Ask}</td>
      </tr>
    `
  }

  $('#node_rows').append(rows)
}

function notConnected () {
  element = `
    <div style="margin-top:10%;width:50%;border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem; display:block;margin-left:auto;margin-right:auto;font-family: OCR A Std, monospace;">     
        <h4 class="title" style="text-align:center;color:#6168ed;margin-left:auto;margin-right:auto;">Please connect your admin wallet to view your nodes.</h4>
    </div>`

  $('#main').append(element)
}
