function nav (owner_address, chain_id) {
  if (!owner_address) {
    explore = `
        <form action="/explore" method="GET" style="padding-right:40px;">
        <button id="connectWalletButton">Explore</button>
        <button class="connectWalletButton" style="display:none;"></button>
        <button class="connectWalletButton" style="display:none;"></button>
        </form>
        `
    element = ``
  } else {
    explore = `
        <form action="/explore" method="GET" style="padding-right:40px;">
        <button id="connectWalletButton">Explore</button>
        <button class="connectWalletButton" style="display:none;"></button>
        <button class="connectWalletButton" style="display:none;"></button>
        </form>
        `

    trim_owner_address = owner_address.substring(0, 10)
    element = `<p style="color:#13B785;margin-right:80px;font-size:18px;font-family: OCR A Std, monospace;padding-top:1rem;"><i class="ri-check-double-line" style="color:#13B785;padding-right:3px;"></i>${chain_id} | ${trim_owner_address}..</p>`
  }

  $('#explore').append(explore)
  $('#MM').append(element)
}

function leaderboard (owner_address) {
  console.log(`THIS MY OWNER ADDRESS: ${owner_address}`)
  row1 = `
          <div class="col-lg-3 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem;display:block;margin-right:10px;margin-left: 80px;">
            <div class="icon-box" style="height:100%;">
              <h4 class="title" style="text-align:center;color:#6168ed;">Account Look up</h4>
              <div style="height:100%;">
                <form action="/isok/account?ual=${$('#ual')}" method="GET">
                    <input name="ual" id="ual" rows="4" placeholder="  Search a UAL..." style="width:70%;margin-left:25%;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" required ></input>
                    <div style="margin-top:-1.75rem;margin-left:5%;width:20%;"><button class="lookup_button" type="submit" id="search_button" onclick="">Search</button></div>
                  </form>
                </div>
            </div>
          </div>

          
          <div class="col-lg-8 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:50rem;display:block;">
            <div class="icon-box" style="height:100%;">
              <h4 class="title" style="text-align:center;color:#6168ed;font-size: 36px;font-family: OCR A Std, monospace;">Leaderboard</h4>
              <div class="scrollbar" id="style-default" style="width:97%;height:88%;font-family: OCR A Std, monospace;">
                <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                          <div class="card-body" style="border:none;">
                            <div class="table-responsive">
                              <table class="table table-hover">
                                <thead style="color:#6168ed;">
                                  <tr style="color:#6168ed">
                                    <th width="80">Rank</th>
                                    <th width="180">Account Name</th>
                                    <th width="600">UAL</th>
                                    <th>Total Levels</th>
                                    <th>Total Experience</th>
                                  </tr>
                                </thead>
                                <tbody id="leaderboard_table">
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
                  <p class="title" style="text-align:center;color:#6168ed;margin-bottom:-1px;">Pre-Alpha V0.01 in Development!</p>
                  <br>
                  <p class="title" style="text-align:center;color:#6168ed;margin-bottom:-1px;font-size: 16px;">Join the Discord Here: <a href="https://discord.gg/RJJkjVPgXP">In Search of Knowledge</a> and create your account with /createaccount</p>
                  <br>
                  <p class="title" style="text-align:center;color:#6168ed;margin-bottom:-1px;font-size: 16px;">Find rare items! Mint and trade items as NFTs! Earn Books of Knowledge and gain xp to level up your skills!</p>
                  <br>
                  <p style="text-align:center;color:#6168ed;font-size: 24px;">Thanks for playing!</p>
                </div>
              </div>
              <form id="account_button" action="/isok/account" method="GET">
                    <input name="owner_address" id="owner_address" rows="4" style="display:none;" value="${owner_address}"></input>
                    <button type="submit" class="menu_tile" style="padding-top:.5rem;height:3rem;width:80%;margin-left:10%;margin-right:10%;margin-top:1rem;">
                    <p class="title" style="text-align:center;font-size:22px;font-family: OCR A Std, monospace;">My Account</p>
                    </button>
                </form>

                <form id="transactions_button" action="/isok/isokTransactions" method="GET" >
                    <input name="owner_address" id="owner_address" rows="4" style="display:none;" value="${owner_address}"></input>
                    <button type="submit" class="menu_tile" style="padding-top:.5rem;height:3rem;width:80%;margin-left:10%;margin-right:10%;margin-top:1rem;">
                    <p class="title" style="text-align:center;font-size:22px;font-family: OCR A Std, monospace;">My Game Transactions</p>
                    </button>
                </form>
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

function build_leaderboard (ual_list, username_list, knowledge_list) {
  ual_list = JSON.parse(ual_list)
  username_list = JSON.parse(username_list)
  knowledge_list = JSON.parse(knowledge_list)

  rank_list = []
  for (i = 0; i < ual_list.length; ++i) {
    ual = ual_list[i]
    username = username_list[i]
    knowledge = knowledge_list[i]
    console.log(knowledge)

    for (a = 0; a < knowledge.length; ++a) {
      cur_knowledge = knowledge[a]

      if (cur_knowledge.name == 'total') {
        total_levels = cur_knowledge.level
        total_xp = cur_knowledge.experience
      }
    }

    player_entry = {
      username: username,
      ual: ual,
      total_levels: total_levels,
      total_xp: total_xp
    }

    rank_list.push(player_entry)
  }

  console.log(JSON.stringify(rank_list))
  function dynamicSort (property) {
    var sortOrder = 1
    if (property[0] === '-') {
      sortOrder = -1
      property = property.substr(1)
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
      return result * sortOrder
    }
  }

  rank_list.sort(dynamicSort('-total_levels'))
  console.log(JSON.stringify(rank_list))
  //rank_list.sort( compare );
  //console.log(rank_list.sort((a,b) => Number(a.total_levels) - Number(b.total_levels)));
  //console.log(JSON.stringify(rank_list.sort( compare )))

  for (i = 0; i < rank_list.length; ++i) {
    player = rank_list[i]
    row_element = `
        <tr>
        <td style="overflow:hidden;" width="10">${i + 1}</td>
        <td style="overflow:hidden;">${player.username}</td>
        <td style="overflow:hidden;"><a href="https://www.otnode.com/lookup?ual=${
          player.ual
        }">${player.ual}</a></td>
        <td style="overflow:hidden;">${player.total_levels}</td>
        <td style="overflow:hidden;">${player.total_xp}</td>
        </tr>
        `
    $('#leaderboard_table').append(row_element)
  }
}
