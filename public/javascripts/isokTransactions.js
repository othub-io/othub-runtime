function nav (owner_address, chain_id) {
  trim_owner_address = owner_address.substring(0, 10)
  element = `<p style="color:#13B785;margin-right:80px;font-size:18px;font-family: OCR A Std, monospace;padding-top:1rem;"><i class="ri-check-double-line" style="color:#13B785;padding-right:3px;"></i>${chain_id} | ${trim_owner_address}..</p>`
  log_out = `
        <form style="padding-right:40px;">
        <button id="connectWalletButton" onclick="logout()">Disconnect</button>
        <button class="connectWalletButton" style="display:none;"></button>
        <button class="sendButton" style="display:none;"></button>
        </form>
        `

  $('#logout').append(log_out)
  $('#MM').append(element)
}

function hide_generateKey () {
  var x = document.getElementById('generateKey')
  x.style.display = 'none'
}

function show_transaction (
  txn_id,
  data,
  keywords,
  trac_fee,
  epochs,
  txn_status,
  ual,
  type
) {
  var x = document.getElementById('sendButton')
  var y = document.getElementById('rejectButton')
  var z = document.getElementById('updateButton')

  if (txn_status == 'Approved') {
    z.style.display = 'block'
    x.style.display = 'none'
    y.style.display = 'none'
  }

  if (txn_status == 'Pending') {
    x.style.display = 'block'
    y.style.display = 'block'
    z.style.display = 'none'
  }

  if (txn_status == 'Failed') {
    x.style.display = 'none'
    y.style.display = 'none'
    z.style.display = 'none'
  }

  if (txn_status == 'Rejected') {
    x.style.display = 'none'
    y.style.display = 'none'
    z.style.display = 'none'
  }

  document.getElementById('txn_id').value = txn_id
  document.getElementById('_txn_id').value = txn_id
  document.getElementById('keywords').value = keywords
  document.getElementById('trac_fee').value = trac_fee
  document.getElementById('epochs').value = epochs
  document.getElementById('type').value = type
  document.getElementById('_ual').value = ual

  data = JSON.stringify(data)
  $('#game_txn_data').empty()
  $('#game_txn_data').append(
    `<span style="word-wrap: break-word;">${data}</span>`
  )
  document.getElementById('game_txn_data').value = data
  document.getElementById('_type').value = 'isok'
  document.getElementById('_action').value = 'account creation'
}

function body () {
  row1 = `
          <div class="col-lg-3 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem;display:block;margin-right:10px;margin-left: 80px;">
          <div class="icon-box" style="height:100%;">
          <h4 class="title" style="text-align:center;color:#6168ed;">Owner Look up</h4>
            <div style="height:100%;">
                <form action="/isok/transactions?owner_address=${$(
                  '#owner_address'
                )}" method="GET">
                    <input name="owner_address" id="owner_address" rows="4" placeholder="  Search a public key..." style="width:70%;margin-left:25%;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" required ></input>
                    <div style="margin-top:-1.75rem;margin-left:5%;width:20%;"><button class="lookup_button" type="submit" id="search_button" onclick="">Search</button></div>
                </form>
                </div>
            </div>
          </div>


          <div class="col-lg-8 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:29.5rem;display:block;font-family: OCR A Std, monospace;">
            <div class="icon-box" style="height:100%;">
              <h4 class="title" style="text-align:center;color:#6168ed;font-size: 20px;font-family: OCR A Std, monospace;">Transactions</h4>
              <div class="scrollbar" id="style-default" style="width:97%;height:88%;">
                <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                          <div class="card-body" style="border:none;">
                            <div class="table-responsive">
                              <table id="table" class="table table-hover">
                                <thead style="color:#6168ed;">
                                  <tr style="color:#6168ed">
                                    <th width="70">Txn ID</th>
                                    <th width="150">Timestamp</th>
                                    <th width="100">Action</th>
                                    <th width="100">Status</th>
                                    <th width="450">UAL</th>
                                    <th width="60">Trac Fee</th>
                                    <th width="70">Epochs</th>
                                  </tr>
                                </thead>
                                <tbody id="game_txn_table">
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-8 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:20rem;display:block;margin-top:30rem;margin-left:-80rem;">
            <div class="icon-box" style="height:100%;">
                <div style="padding-top:.5rem;height:3rem;width:100%;margin-top:.5rem;height:18rem;">
                    <div id="" style="margin-bottom: -2rem;">
                        <input type="text" name="type" id="type" style="display:none;" value="api"></input>
                        <div style="width:45%;margin-left:54%;margin-right:1%;margin-top:.5rem;margin-bottom:-16rem;">
                          <textarea type="text" name="game_txn_data" id="game_txn_data" style="width:100%;border: 1px solid #6168ed;height:16rem;border-radius: 5px;word-wrap: break-word;" value="" disabled></textarea>
                        </div>
                        <input type="text" name="txn_id" id="txn_id" style="display:none;" value="1"></input>
                        <span style="width:20%;margin-left:1.5%;color:#6168ed;margin-top:-10rem;">Trac Payment:</span>
                        <input name="trac_fee" id="trac_fee" rows="4" placeholder="Pay this amount of trac..." style="font-family: OCR A Std, monospace;float:right;width:20%;margin-right:60%;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" value="" ></input>
                        <br>
                        <br>
                        <span style="width:20%;margin-left:1.5%;color:#6168ed;" data-hover="The amount of time you want to pay to keep the asset hosted">Epochs:</span>
                        <input name="epochs" id="epochs" rows="4" placeholder="For this many Epochs..." style="font-family: OCR A Std, monospace;width:20%;float:right;margin-right:60%;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" value="" required ></input>
                        <br>
                        <br>
                        <span style="width:20%;margin-left:1.5%;color:#6168ed;">Blockchain:</span>
                        <input type="text" name="blockchain" id="blockchain" style="font-family: OCR A Std, monospace;width:20%;margin-right:60%;float:right;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" value="otp::testnet" disabled></input>
                        <br>
                        <br>
                        <span style="width:20%;margin-left:1.5%;color:#6168ed;">Keywords:</span>
                        <input type="text" name="keywords" id="keywords" style="font-family: OCR A Std, monospace;width:20%;margin-right:60%;float:right;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" placeholder="Keywords here" value="" disabled></input>
                        <input type="text" name="type" id="type" style="display:none;" value=""></input>
                        <span style="font-weight: 400;margin-bottom:-1.4rem;margin-left:21.5%;font-size:22px;font-family: OCR A Std, monospace;display:none;font-size:12px;color:red;" id="invalid_json">Invalid JSON</span>
                        <span style="font-weight: 400;margin-bottom:-1.4rem;margin-left:21.5%;font-size:22px;font-family: OCR A Std, monospace;display:none;font-size:12px;color:red;" id="invalid_chain">Invalid Chain</span>
                        <div type="submit" id="sendButton" style="display:none;" onclick="sendPublish()">
                            <p class="title" style="text-align:center;font-size:22px;font-family: OCR A Std, monospace;">Approve</p>
                        </div>
                        <div type="submit" id="updateButton" style="display:none;" onclick="sendUpdate()">
                            <p class="title" style="text-align:center;font-size:22px;font-family: OCR A Std, monospace;">Update</p>
                        </div>
                        <div class="rejectButton" id="rejectButton" style="display:none;" onclick="reject()">
                            <p class="title" style="text-align:center;font-size:22px;font-family: OCR A Std, monospace;">Reject</p>
                        </div>
                    </div>
                </div>
                </div>
            </div> 
          </div>
          `

  row2 = `
          <div class="col-lg-3 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:41.3rem; display:block;margin-right:10px;margin-left: 80px;margin-top:-44.3rem;">
            <div class="icon-box" style="height:100%;">
              <h4 class="title" style="text-align:center;color:#6168ed;font-family: OCR A Std, monospace;">Menu</h4>
                <form id="" action="/isok/leaderboard" method="GET">
                    <input name="owner_address" id="owner_address" rows="4" style="display:none;" value="${owner_address}"></input>
                    <button type="submit" class="menu_tile" style="padding-top:.5rem;height:3rem;width:80%;margin-left:10%;margin-right:10%;margin-top:1rem;">
                    <p class="title" style="text-align:center;font-size:22px;font-family: OCR A Std, monospace;">Leaderboard</p>
                    </button>
                </form>
                <form id="account_button" action="/isok/account" method="GET">
                    <input name="owner_address" id="owner_address" rows="4" style="display:none;" value="${owner_address}"></input>
                    <button type="submit" class="menu_tile" style="padding-top:.5rem;height:3rem;width:80%;margin-left:10%;margin-right:10%;margin-top:1rem;">
                    <p class="title" style="text-align:center;font-size:22px;font-family: OCR A Std, monospace;">My Account</p>
                    </button>
                </form>
              </div>
            </div>
          `

  $('#row1').append(row1)
  $('#row2').append(row2)
}

function build_game_txns (game_txns, game_txn_data) {
  game_txns = JSON.parse(game_txns)
  game_txn_data = JSON.parse(game_txn_data)

  for (i = 0; i < game_txns.length; ++i) {
    game_txn = game_txns[i]
    game_data = game_txn_data[i]

    txn_id = !game_txn.txn_id ? 'null' : game_txn.txn_id
    owner_address = game_txn.owner_address ? 'null' : game_txn.owner_address
    action = !game_txn.action ? 'null' : game_txn.action
    type = !game_txn.type ? 'null' : game_txn.type
    timestamp = !game_txn.timestamp
      ? 'null'
      : new Date(game_txn.timestamp).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        })
    ual = !game_txn.ual ? ' ' : game_txn.ual
    keywords = !game_txn.keywords ? '' : game_txn.keywords
    otp_fee = !game_txn.otp_fee ? '' : game_txn.otp_fee
    trac_fee = !game_txn.trac_fee ? '' : game_txn.trac_fee
    epochs = !game_txn.epochs ? '' : game_txn.epochs
    assertionId = !game_txn.assertionId ? 'null' : game_txn.assertionId
    operationId = !game_txn.operationId ? 'null' : game_txn.operationId
    txn_status = !game_txn.status ? 'null' : game_txn.status
    data = !game_data ? 'null' : game_data.data

    row_element = `
        <tr>
        <td style="overflow:hidden;">${txn_id}</td>
        <td style="overflow:hidden;">${timestamp}</td>
        <td style="overflow:hidden;">${action}</td>
        <td style="overflow:hidden;">${txn_status}</td>
        <td style="overflow:hidden;"><a href="https://www.otnode.com/lookup?ual=${ual}" target="_blank">${ual}</a></td>
        <td style="overflow:hidden;">${trac_fee}</td>
        <td style="overflow:hidden;">${epochs}</td>
        <td style="overflow:hidden;">
            <div class="menu_tile" id="viewButton" style="padding-top:3px;height:2rem;width:4rem;margin-top:.5rem;">
                <p class="title" style="text-align:center;font-size:16px;" onclick='show_transaction("${txn_id}",${JSON.stringify(
      data
    )},"${keywords}","${trac_fee}","${epochs}","${txn_status}","${ual}","${type}")'>View</p>
            </div>
        </td>
        </tr>
        `

    // if (action == 'item creation') {
    //   row_element = `
    //               <tr>
    //               <td style="overflow:hidden;">${txn_id}</td>
    //               <td style="overflow:hidden;">${timestamp}</td>
    //               <td style="overflow:hidden;">${action}</td>
    //               <td style="overflow:hidden;">${txn_status}</td>
    //               <td style="overflow:hidden;"><a href="http://localhost:7391/isok/account?owner_address=${owner_address}&item_ual=${ual}" target="_blank">${ual}</a></td>
    //               <td style="overflow:hidden;">${trac_fee}</td>
    //               <td style="overflow:hidden;">${epochs}</td>
    //               <td style="overflow:hidden;">
    //                   <div class="menu_tile" style="padding-top:3px;height:2rem;width:4rem;margin-top:.5rem;">
    //                       <p class="title" style="text-align:center;font-size:16px;" onclick='show_transaction("${txn_id}",${JSON.stringify(
    //     data
    //   )},"${keywords}","${trac_fee}","${epochs}","${txn_status}","${ual}","${type}")'>View</p>
    //                   </div>
    //               </td>
    //               </tr>
    //               `
    // }

    $('#game_txn_table').append(row_element)
  }
}

function loggedOut () {
  element = `<form>
            <button class="connectWalletButton" id="connectWalletButton" style="margin-right:40px;display:none;" onclick="getAccountRefresh()">Connect Wallet</button>
            <button id="connectWalletButton" style="margin-right:40px;" onclick="getAccountRefresh()">Connect Wallet</button>
            </form>`

  $('#MM').append(element)

  row1 = `
        <div class="col-lg-5 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem; display:block;margin-left:auto;margin-right:auto;font-family: OCR A Std, monospace;">
          <div class="icon-box" style="height:100%;">
            <h4 class="title" style="text-align:center;color:#6168ed;">Please connect your <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target=_blank>MetaMask</a> wallet to explore.</h4>
          </div>
        </div>`

  $('#row1').append(row1)
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
        <h4 class="title" style="text-align:center;color:#6168ed;margin-left:auto;margin-right:auto;">Please connect your <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target=_blank>MetaMask</a> wallet to view your game transactions.</h4>
        </div>
    </div>`

  $('#row1').append(row1)
}
