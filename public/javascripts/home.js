function get_account () {
  getAccount()
}

function logout () {
  document.getElementById('navbar').innerHTML = ''
  localStorage.removeItem('admin_key')
  localStorage.removeItem('chain_id')
  localStorage.removeItem('api_key')
  element = `
  <h1>otnode.com</h1>
  <button class="connectWalletButton" id="connect-btn" onclick="get_account()">Connect</button>
  `
  $('#navbar').append(element)
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

element = `
    <div style="margin-top:10%;width:50%;border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem; display:block;margin-left:auto;margin-right:auto;font-family: OCR A Std, monospace;">     
        <h4 class="title" style="text-align:center;color:#6168ed;margin-left:auto;margin-right:auto;">This page is currently in development.</h4>
    </div>`

$('#main').append(element)

function showLoadingCircle () {
  const loadingContainer = document.createElement('div')
  loadingContainer.setAttribute('id', 'loading-container')
  loadingContainer.style.display = 'flex'
  loadingContainer.style.flexDirection = 'column'
  loadingContainer.style.alignItems = 'center'
  loadingContainer.style.justifyContent = 'center'

  const loadingText = document.createElement('p')
  loadingText.textContent = 'Submitting Proposal...'
  loadingText.style.fontSize = '20px'
  loadingText.style.fontWeight = 'bold'
  loadingText.style.color = '#6168ED'
  loadingContainer.appendChild(loadingText)

  const loadingCircleContainer = document.createElement('div')
  loadingCircleContainer.style.marginTop = '20px'
  const loadingCircle = document.createElement('div')
  loadingCircle.setAttribute('id', 'loading-circle')
  loadingCircleContainer.appendChild(loadingCircle)
  loadingContainer.appendChild(loadingCircleContainer)

  document.body.appendChild(loadingContainer)
}

function hideLoadingCircle () {
  const loadingContainer = document.getElementById('loading-container')
  document.body.removeChild(loadingContainer)
}
