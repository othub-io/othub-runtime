function get_account () {
  getAccount()
}

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
  <button class="connectWalletButton" id="connect-btn" onclick="get_account()">Connect</button>
  `
  $('#navbar').append(element)

  element = `
    <div style="margin-top:10%;width:50%;border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem; display:block;margin-left:auto;margin-right:auto;font-family: OCR A Std, monospace;">     
        <h4 class="title" style="text-align:center;color:#6168ed;margin-left:auto;margin-right:auto;">Please connect your wallet to generate an API key.</h4>
    </div>`

  $('#main').append(element)
}

function loggedIn (admin_key, chain_id, userRecords, msg) {
  userRecords = JSON.parse(userRecords)
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
  <h1><a href=/" style="color: #6168ED;text-decoration:none;">otnode.com</a></h1>
    <p style="color:${color};font-size:20px;font-family: OCR A Std, monospace;margin-left:${margin};"> | ${chain_id}${addr}</p>
    <button  id="connect-btn" onclick="logout()">Disconnect</button>
    <button class="connectWalletButton" style="display:none;"></button>
    `
  $('#navbar').append(element)

  element = `
    <p style="margin-left:10%;margin-top:1%;color: #6168ED;">Your API Key</p>
    <div id="api_main">
      <div style="width:50%;">
        <h4 style="color:#6168ed;padding-top:3%;margin-left:3%;text-decoration: underline;">Free plan</h4>
        <span style="color: #6168ED;margin-left:3%;"><b>Info:</b></span>
        <br>
        <span style="color: #6168ED;margin-left:3%;">Rate: 1/5min</span>
        <br>
        <span style="color: #6168ED;margin-left:3%;">Up to 1 API key</span>
        <span style="color: #6168ED;float:right;margin-right:60%;margin-top:-5.5%;"><b>Access:</b></span>
        <br>
        <span style="color: #6168ED;float:right;margin-right:63.25%;margin-top:-5.5%;">Basic</span>
        <br>
        <span style="color: #6168ED;float:right;margin-right:30%;margin-top:-11%;"><b>Networks:</b></span>
        <br>
        <span style="color: #6168ED;float:right;margin-right:29%;margin-top:-11%;">OTP Testnet</span>
        <br>
        <span style="color: #6168ED;float:right;margin-right:28%;margin-top:-11%;">OTP Mainnet</span>
        <br>
      </div>
      <div>
        <h4 style="color:#6168ed;margin-top:-2%;margin-left:1.5%;text-decoration: underline;">Alliance plan</h4>
        <span style="color: #6168ED;margin-left:1.5%;"><b>Info:</b></span>
        <br>
        <span style="color: #6168ED;margin-left:1.5%;">Rate: 1/5sec</span>
        <br>
        <span style="color: #6168ED;margin-left:1.5%;">Up to 2 API keys</span>
        <span style="color: #6168ED;float:right;margin-right:79.75%;margin-top:-2.9%;"><b>Access:</b></span>
        <br>
        <span style="color: #6168ED;float:right;margin-right:79.75%;margin-top:-2.9%;">Premium</span>
        <br>
        <span style="color: #6168ED;float:right;margin-right:65%;margin-top:-5.7%;"><b>Networks:</b></span>
        <br>
        <span style="color: #6168ED;float:right;margin-right:64.6%;margin-top:-5.5%;">OTP Testnet</span>
        <br>
        <span style="color: #6168ED;float:right;margin-right:64.2%;margin-top:-5.5%;">OTP Mainnet</span>
        <br>
      </div>
      <div style="background-color:#FFFFFF;width:50%;height:90%;float:right;margin-right:2%;margin-top:-23.5%;">
        <h4 style="color:#6168ed;margin-left:3%;text-decoration: underline;">API Token</h4>
        <span style="color: #6168ED;margin-left:3%;"><b>Active Keys: </b>${
          userRecords.length
        }</span>
        <br>
        <div style="margin-top:1%;">
          <span style="color: #6168ED;margin-left:3%;"><b>${JSON.parse(
            msg
          )} </b></span>
        </div>
        <button id="dropdown-button" style="float:right;margin-top:-10%;"><img src="https://img.icons8.com/material-outlined/24/000000/visible--v1.png"/></button>
        <div style="float:right;margin-right:25%;margin-top:-20%;">
          <div style="margin-left:-10%%;margin-top:20%;margin-bottom:3%;">
            <form id="generate_key_form" action="/api" method="POST">
              <button id="generate-key-btn" style="margin-top:9%;">Generate Key</button>
              <input id="chain_id" name="chain_id" style="display:none;" value="${chain_id}"></input>
              <input id="admin_key" name="admin_key" style="display:none;" value="${admin_key}"></input>
              <input id="app_name" name="app_name" style="float:right;margin-right:7%;height:20px;margin-top:-8.5%;" placeholder="App name" required></input>
            </form>
          </div>
        </div>
        <div id="dropdown-content" style="z-index:30;width:80%;display:none;">
        <table style="margin-left:12.5%;margin-top:5%;">
          <thead>
            <tr>
              <th width="80">Application</th>
              <th width="170">API Token</th>
              <th width="50">Access</th>
              <th width="10"></th>
            </tr>
          </thead>
          <tbody id="api_rows">
          </tbody>
        </table>
        <div id="overlay"></div>
        <div id="popup">
          <h2>Are you Sure?</h2>
          <p>Your api key will be lost forever and <br>any apps using it will break!</p>
          <button id='generate-key-btn' onclick="closePopup()" style="margin-left: 6%;">Return</button>
          <form id="deleteApikey" action="/api" method="POST" style="float:right;">
            <input type="text" name="admin_key" id="admin_key" style="display:none;" value="${admin_key}"></input>
            <input id="chain_id" name="chain_id" style="display:none;" value="${chain_id}"></input>
              <input type="text" name="deleteAPIkey" id="deleteAPIkey" style="display:none;" value=""></input>
              <button id='generate-key-btn' onclick="deleteApikey()" style="margin-left: 8%;">Delete</button>
            </form>
        </div>
        </div>
      </div>
    </div>
    <div id="api_minor1">
      <h4 style="color:#6168ed;padding-top:3%;margin-left:3%;margin-bottom:-.1%;">Find a bug?</h4>
      <a href=# style="margin-left:3%;">Github issue -></a>
    </div>
    <div id="api_minor2">
      <h4 style="color:#6168ed;padding-top:0%;margin-left:3%;margin-bottom:-.1%;">Need some help?</h4>
      <a href=# style="margin-left:3%;">Join our telegram -></a>
    </div>
    `

  $('#main').append(element)

  rows = ``
  for (i = 0; i < userRecords.length; ++i) {
    userRecord = userRecords[i]
    rows =
      rows +
      `
    <tr>
      <td>${userRecord.app_name}</td>
      <td>${userRecord.api_key}</td>
      <td>${userRecord.access}</td>
      <td><button style="background-color:#FFFFFF;border-color:#FFFFFF;" onclick="openPopup('${userRecord.api_key}')"><img width=15 height=15 src="https://img.icons8.com/material-rounded/24/000000/trash.png"/></button></td>
    </tr>
  `
  }

  $('#api_rows').append(rows)
}

function notConnected () {
  element = `
    <div style="margin-top:10%;width:50%;border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem; display:block;margin-left:auto;margin-right:auto;font-family: OCR A Std, monospace;">     
        <h4 class="title" style="text-align:center;color:#6168ed;margin-left:auto;margin-right:auto;">Please connect your wallet to generate an API key.</h4>
    </div>`

  $('#main').append(element)
}
