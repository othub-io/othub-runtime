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

function loggedIn (admin_key, chain_id) {
  //allianceNodes = JSON.parse(allianceNodes)
  //v_nodes = JSON.parse(v_nodes)
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

  console.log('1')
  element = `
  <h1><a href="/" style="color: #6168ED;text-decoration:none;">otnode.com</a></h1>
    <p style="color:${color};font-size:20px;font-family: OCR A Std, monospace;margin-left:${margin};"> | ${chain_id}${addr}</p>
    <button  id="connect-btn" onclick="logout()">Disconnect</button>
    <button class="connectWalletButton" style="display:none;"></button>
    `
  $('#navbar').append(element)
}

async function renderPage (
  admin_key,
  allianceNodes,
  allianceStats,
  allianceOperators,
  v_nodes
) {
  allianceNodes = JSON.parse(allianceNodes)
  allianceStats = JSON.parse(allianceStats)
  allianceOperators = JSON.parse(allianceOperators)
  v_nodes = JSON.parse(v_nodes)

  graphic = '<div style="height:5%;"></div>'
  margin = '2.5%'
  nodeGroup = ''

  let node
  let alliance

  if (admin_key) {
    node = v_nodes.filter(obj => obj.createProfile_adminWallet === admin_key)[0]
    alliance = allianceOperators.filter(obj => obj.adminKey === admin_key)[0]
  }

  if (node) {
    graphic = `<form id="joinAlliance" action="/myNodes/settings" method="POST" style="margin-top:0%;">
            <input type="text" name="admin_key" id="admin_key" style="display:none;" value="${admin_key}"></input>
            <input id="chain_id" name="chain_id" style="display:none;" value="${chain_id}"></input>
            <input name="joinAlliance" id="joinAlliance" style="display:none;" value="Alliance"></input>
            <br>
            <button class="settings-btn" id="join-alliance-btn" style="margin-left:7.5%;margin-top:-1%;" onclick="showLoadingCircle()"><b>Join Alliance</b></button>
          </form>`
  }

  if (alliance) {
    nodeGroup = 'Alliance'
  }

  if (nodeGroup === 'Alliance') {
    access = 'Premium'
    margin = '5%'
    graphic = `<div class="star" style="margin-top: .5%;margin-left:-24.75%;margin-bottom: .5%;">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <polygon fill="gold" points="256,8 314.395,195.472 503.526,186.513 354.931,301.528 413.326,489 256,396.542 98.674,489 157.069,301.528 8.474,186.513 197.605,195.472"/>
                          </svg>
                        </div>`
  }

  rows = ``
  nodeCount = Number(allianceNodes.length)
  totalNodes = Number(v_nodes.length)

  for (i = 0; i < nodeCount; ++i) {
    allianceNode = allianceNodes[i]
    rows =
      rows +
      `
      <tr>
        <td>${allianceNode.networkId}</td>
        <td>${allianceNode.tokenName}</td>
        <td>${allianceNode.tokenSymbol}</td>
        <td>${allianceNode.nodeStake.toFixed(2)}</td>
        <td>${allianceNode.Ask}</td>
      </tr>
    `
  }

  element = `
      <p style="margin-left:10%;margin-top:1%;color: #6168ED;">Alliance Members</p>
      <div id="alliance_main">
        <div style="width:50%;">
          <h4 style="color:#6168ed;padding-top:3%;margin-left:3%;text-decoration: underline;">Alliance KPIs</h4>
          <span style="color: #6168ED;margin-left:5%;"><b>Minimum Ask</b></span>
          <br>
          <span style="color: #6168ED;margin-left:5%;font-size:40px;">0.24</span>
          <br>
          <span style="color: #6168ED;float:right;margin-right:61%;margin-top:-9.5%;"><b>Avg Ask</b></span>
          <br>
          <span style="color: #6168ED;float:right;margin-right:58.5%;margin-top:-9%;font-size:40px;">${allianceStats.avgAsk.toFixed(
            2
          )}</span>
          <br>
        </div>
        <div>
          <h4 style="color:#6168ed;margin-top:-1.5%;margin-left:1.5%;text-decoration: underline;"></h4>
          <span style="color: #6168ED;margin-left:2.5%;"><b>Nodes</b></span>
          <br>
          <span style="color: #6168ED;margin-left:2.5%;font-size:40px;">${nodeCount}</span>
          <br>
          <span style="color: #6168ED;float:right;margin-right:78%;margin-top:-4.75%;"><b>Participation</b></span>
          <br>
          <span style="color: #6168ED;float:right;margin-right:75.5%;margin-top:-4.75%;font-size:40px;">${(
            (nodeCount / totalNodes) *
            100
          ).toFixed(2)}%</span>
          <br>
        </div>
        <div>
          <h4 style="color:#6168ed;margin-top:-1.5%;margin-left:1.5%;text-decoration: underline;"></h4>
          <span style="color: #6168ED;margin-left:2.5%;"><b>Avg Stake</b></span>
          <br>
          <span style="color: #6168ED;margin-left:2.5%;font-size:40px;">${
            allianceStats.avgStake
          }</span>
          <br>
          <span style="color: #6168ED;float:right;margin-right:78.5%;margin-top:-4.75%;"><b>Total Stake</b></span>
          <br>
          <span style="color: #6168ED;float:right;margin-right:77.5%;margin-top:-4.75%;font-size:40px;">${
            allianceStats.totalStake
          }</span>
          <br>
        </div>
        ${graphic}
        <div style="width:25%;margin-left:1%;margin-top:${margin};">
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
        <div style="width:70%;height:95%;float:right;margin-right:2%;margin-top:-50%;" class=scrollable>
            <table >
            <thead>
            <tr>
                <th width="80">Network ID</th>
                <th width="170">Name</th>
                <th width="50">Symbol</th>
                <th width="100">Stake</th>
                <th width="50">Ask</th>
            </tr>
            </thead>
            <tbody id="node_rows">
            
            </tbody>
        </table>
        </div>
      </div>
      `

  $('#main').append(element)

  $('#node_rows').append(rows)
}
