function nav (owner_address, chain_id) {
  explore = `
        <form action="/explore" method="GET" style="padding-right:40px;">
        <button id="connectWalletButton">Explore</button>
        <button class="connectWalletButton" style="display:none;"></button>
        <button class="connectWalletButton" style="display:none;"></button>
        </form>
        `
  $('#explore').append(explore)

  trim_owner_address = owner_address.substring(0, 10)
  element = `<p style="color:#13B785;margin-right:80px;font-size:18px;font-family: OCR A Std, monospace;padding-top:1rem;"><i class="ri-check-double-line" style="color:#13B785;padding-right:3px;"></i>${chain_id} | ${trim_owner_address}..</p>`
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
  action
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

  if (action == 'query') {
    x.style.display = 'none'
    y.style.display = 'none'
    z.style.display = 'none'
  }

  document.getElementById('txn_id').value = txn_id
  document.getElementById('_txn_id').value = txn_id
  document.getElementById('keywords').value = keywords
  document.getElementById('trac_fee').value = trac_fee
  document.getElementById('epochs').value = epochs
  document.getElementById('_ual').value = ual

  data = JSON.stringify(data)
  $('#txn_data').empty()
  $('#txn_data').append(`<span style="word-wrap: break-word;">${data}</span>`)
  document.getElementById('txn_data').value = data
}

function body (owner_address, chain_id) {
  row1 = `
          <div class="col-lg-3 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem;display:block;margin-right:10px;margin-left: 80px;">
            <div class="icon-box" style="height:100%;font-family: OCR A Std, monospace;">
              <h4 class="title" style="text-align:center;color:#6168ed;font-size: 16px;font-family: OCR A Std, monospace;">Balances</h4>
              <div style="height:100%;">
                <div class="skill_tile" style="padding-top:3px;height:4rem;width:12rem;float:right;margin-right:10%;color:#6168ed;">
                    <p class="title" style="text-align:center;font-size:16px;margin-bottom:-.15rem;">Credits</p>
                    <p class="title" style="text-align:center;font-size:16px;">14.56 USD</p>
                </div>
                <div class="skill_tile" style="padding-top:3px;height:4rem;width:8rem;margin-top:.5rem;margin-left:10%;color:#6168ed;">
                    <p class="title" style="text-align:center;font-size:16px;margin-bottom:-.15rem;">Trac</p>
                    <p class="title" style="text-align:center;font-size:16px;">189.243</p>
                </div>
                </div>
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
                                    <th width="60">OTP Fee</th>
                                    <th width="60">Trac Fee</th>
                                    <th width="70">Epochs</th>
                                  </tr>
                                </thead>
                                <tbody id="api_txn_table">
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
                          <textarea type="text" name="txn_data" id="txn_data" style="width:100%;border: 1px solid #6168ed;height:16rem;border-radius: 5px;word-wrap: break-word;" value=""></textarea>
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
                        <input type="text" name="blockchain" id="blockchain" style="font-family: OCR A Std, monospace;width:20%;margin-right:60%;float:right;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" value="otp::testnet"></input>
                        <br>
                        <br>
                        <span style="width:20%;margin-left:1.5%;color:#6168ed;">Keywords:</span>
                        <input type="text" name="keywords" id="keywords" style="font-family: OCR A Std, monospace;width:20%;margin-right:60%;float:right;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" placeholder="Keywords here" value=""></input>

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
              <h4 class="title" style="text-align:center;color:#6168ed;font-family: OCR A Std, monospace;">Api Settings</h4>
              <div class="col-lg-12 col-md-12 mt-12 mb-lg-12" style="height:6rem;margin-right:auto;margin-left:auto;>
                <div style="height:100%;">
                  <p class="title" style="text-align:left;color:#6168ed;margin-bottom:-1px;font-size: 14px;margin-left:2%;margin-right:2%;font-family: OCR A Std, monospace;">You must generate an API Key to use the otnode.com api. Requests will be queued here to be approved and signed.<br><br>Only Origintrail Parachain Testnet support at this time. <br><br>Please reference the <a href="/api/docs" target="_blank">api documentation</a> when using the api.</p>
                  <br>
                  <p style="text-align:center;color:#6168ed;font-size: 20px;margin-left:2%;margin-right:2%;font-family: OCR A Std, monospace;">-Api Key-</p>
                </div>
                <form id="generateKey" action="/generateKey" method="POST" style="padding-top:11.5rem;">
                    <input type="text" name="owner_address" id="owner_address" style="display:none;" value="${owner_address}"></input>
                    <input type="text" name="chain_id" id="chain_id" style="display:none;" value="${chain_id}"></input>
                    <button type="submit" class="menu_tile" style="padding-top:.5rem;height:3rem;width:80%;margin-left:10%;margin-right:10%;margin-top:1rem;">
                    <p class="title" style="text-align:center;font-size:22px;font-family: OCR A Std, monospace;" onclick="hide_generateKey()">Generate Api Key</p>
                    </button>
                </form>
                <div id="api_key_created"></div>
                <div id="dev_docs">
                <form action="/api/docs" method="GET">
                    <button type="submit" class="menu_tile" style="height:3rem;width:80%;margin-left:10%;margin-right:10%;margin-top:1rem;">
                    <p class="title" style="text-align:center;font-size:22px;font-family: OCR A Std, monospace;padding-top:.25rem;" onclick="">Developer Docs</p>
                    </button>
                </form>
                </div>
              </div>
            </div>
          `

  $('#row1').append(row1)
  $('#row2').append(row2)
}

function build_api_txns (api_txns, api_data) {
  api_txns = JSON.parse(api_txns)
  api_data = JSON.parse(api_data)

  for (i = 0; i < api_txns.length; ++i) {
    api_txn = api_txns[i]
    txn_data = api_data[i]

    txn_id = !api_txn.txn_id ? 'null' : api_txn.txn_id
    owner_address = api_txn.owner_address ? 'null' : api_txn.owner_address
    action = !api_txn.action ? 'null' : api_txn.action
    type = !api_txn.type ? 'null' : api_txn.type
    timestamp = !api_txn.timestamp
      ? 'null'
      : new Date(api_txn.timestamp).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        })
    ual = !api_txn.ual ? '' : api_txn.ual
    keywords = !api_txn.keywords ? '' : api_txn.keywords
    otp_fee = !api_txn.otp_fee ? '' : api_txn.otp_fee
    trac_fee = !api_txn.trac_fee ? '' : api_txn.trac_fee
    epochs = !api_txn.epochs ? '' : api_txn.epochs
    assertionId = !api_txn.assertionId ? 'null' : api_txn.assertionId
    operationId = !api_txn.operationId ? 'null' : api_txn.operationId
    txn_status = !api_txn.status ? 'null' : api_txn.status
    data = !txn_data ? 'null' : txn_data.data

    row_element = `
        <tr>
        <td style="overflow:hidden;">${txn_id}</td>
        <td style="overflow:hidden;">${timestamp}</td>
        <td style="overflow:hidden;">${action}</td>
        <td style="overflow:hidden;">${txn_status}</td>
        <td style="overflow:hidden;"><a href="https://www.otnode.com/lookup?ual=${ual}" target="_blank">${ual}</a></td>
        <td style="overflow:hidden;">${otp_fee}</td>
        <td style="overflow:hidden;">${trac_fee}</td>
        <td style="overflow:hidden;">${epochs}</td>
        <td style="overflow:hidden;">
            <div class="menu_tile" id="viewButton" style="padding-top:3px;height:2rem;width:4rem;margin-top:.5rem;">
                <p class="title" style="text-align:center;font-size:16px;" onclick='show_transaction("${txn_id}",${JSON.stringify(
      data
    )},"${keywords}","${trac_fee}","${epochs}","${txn_status}","${ual}","${action}")'>View</p>
            </div>
        </td>
        </tr>
        `
    $('#api_txn_table').append(row_element)
  }
}
