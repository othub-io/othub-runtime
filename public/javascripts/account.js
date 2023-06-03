function nav (owner_address, chain_id) {
  explore = `
        <form action="/isok/leaderboard" method="GET" style="padding-right:40px;">
        <button id="connectWalletButton">Leaderboard</button>
        <button class="connectWalletButton" style="display:none;"></button>
        </form>
        `
  $('#explore').append(explore)

  trim_owner_address = owner_address.substring(0, 10)
  element = `<p style="color:#13B785;margin-right:80px;font-size:18px;font-family: OCR A Std, monospace;padding-top:1rem;"><i class="ri-check-double-line" style="color:#13B785;padding-right:3px;"></i>${chain_id} | ${trim_owner_address}..</p>`
  $('#MM').append(element)
}

function inventory (item_inventory, username, ual, owner_address) {
  item_inventory = JSON.parse(item_inventory)
  for (i = 0; i < item_inventory.length; ++i) {
    item = item_inventory[i]

    item_elements = `
            <div style="height:100%;border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;padding-top:1rem;height:5rem;margin-left:auto;width:14%;margin-right:2.5%;margin-top:-.5rem;">
                  <p class="title" style="text-align:center;color:#6168ed;margin-top:-1rem;font-size:14px;">Cooking</p>
                </div>`
  }
  row1 = `
          <div class="col-lg-3 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem; display:block;margin-right:10px;margin-left: 80px;">
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
              <h4 class="title" style="text-align:center;color:#6168ed;font-size: 24px;">${username}</h4>
              <div class="col-lg-6 col-md-6 mt-12 mb-lg-3" style="border: 2px solid #6168ed;border-radius:10px 10px 10px 10px;margin-top:1.5rem;margin-left:1%;height:45rem;>
                <div style="height:10rem;border-radius:10px 10px 10px 10px;">
                  <div style="height:100%;">
                    <p class="title" style="text-align:center;color:#6168ed;font-size: 20px;">Items</p>
                    <div style="margin-left:30rem;margin-top:-2.5%;width:50%;border:none;">
                        <form>
                            <div class="php-email-form" style="background-color:none;" id="owner_buttons"></div>
                            <br>
                            <input type="radio" id="host" name="owner_type" value="host" style="accent-color: #6168ED;display: none;" checked="checked"/>
                            <input type="radio" id="self" name="owner_type" value="self" style="accent-color: #6168ED;display: none;"/>
                        </form>
                    </div>
                  <div class="scrollbar" id="style-default" style="width:97%;height:88%;">
                    <div id="item_elements" style="width:90%;height:90%;" >
                        
                    </div>
                  </div>
                  </div>
                </div>

                <div style="height:25rem;width:50%;margin-left:auto;margin-top:-47rem;>
                  <div style="height:100%;">
                    <p class="title" style="text-align:center;color:#6168ed;font-size:14px;margin-bottom:-.15rem;margin-left:7.5%;">${ual}</p>
                    <div style="height:22rem;background-color:#EAE6E6;width:90%;margin-left:7.5%;">
                      <h4 style="color:#6168ed;font-size: 16px;margin-right:auto;margin-left:7.5%;text-align:center;padding-top:10rem;"><b>Avatars Coming Soon!</b></h4>
                    </div>
                    <p class="title" style="text-align:left;color:#6168ed;font-size:12px;margin-bottom:.75rem;margin-left:7.5%;">Owned by: ${owner_address}</p>
                    <div id="knowledge_elements"></div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          `
  $('#row1').append(row1)
}

function item_focus (focus_item) {
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
                  <div id="mint_area">
                    <h4 style="color:#6168ed;font-size: 12px;margin-top:2rem;text-align:center;"><b>${focus_item.ual}</b></h4>
                  </div>
                </div>
              </div>
              `

  $('#row2').append(row2)
}

function item_view () {
  row2 = `
          <div class="col-lg-3 col-md-6 mt-12 mb-5 mb-lg-12" style="height:41.3rem; display:block;margin-right:10px;margin-left: 80px;margin-top:-44.3rem;border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;">
            <div class="icon-box" style="height:100%;">
              <h4 class="title" style="text-align:center;color:#6168ed;font-size: 20px;">Item Viewer</h4>
              <div style="height:6rem;margin-bottom:.5rem;box-shadow:#FFFFFF;">
                <div style="height:14rem;background-color:#EAE6E6;width:80%;margin-left: 10%;">
                    <h4 style="color:#6168ed;font-size: 16px;margin-right:auto;margin-left:5%;text-align:center;padding-top:5rem;"><b>Item Images Coming Soon!</b></h4>
                </div>
               </div>
               <div class="icon-box" id="view_item_elements" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:12rem;width:90%;margin-left:5%;margin-top:30%;">  
                <h4 style="color:#6168ed;font-size: 16px;margin-right:auto;margin-left:5%;text-align:center;padding-top:1rem;"><b>Select an item from your inventory!</b></h4>
               </div>
               <div id="mint_area" style="padding-top:1rem;">
               </div>
            </div>
          </div>
          `

  $('#row2').append(row2)
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
              <h4 class="title" style="text-align:center;color:#6168ed;font-size: 20px;font-family: OCR A Std, monospace;">Search a UAL to find an account!</h4>
              
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

function knowledge_html (knowledge) {
  knowledge = JSON.parse(knowledge)
  for (i = 0; i < knowledge.length; ++i) {
    cur_knowledge = knowledge[i]

    if (cur_knowledge.name == 'total') {
      total_lv = cur_knowledge.level
      total_xp = cur_knowledge.experience
    }

    if (cur_knowledge.name == 'elements') {
      elements_lv = cur_knowledge.level
      elements_xp = cur_knowledge.experience
    }

    if (cur_knowledge.name == 'navigation') {
      navigation_lv = cur_knowledge.level
      navigation_xp = cur_knowledge.experience
    }

    if (cur_knowledge.name == 'arcane') {
      arcane_lv = cur_knowledge.level
      arcane_xp = cur_knowledge.experience
    }

    if (cur_knowledge.name == 'botany') {
      botany_lv = cur_knowledge.level
      botany_xp = cur_knowledge.experience
    }

    if (cur_knowledge.name == 'survival') {
      survival_lv = cur_knowledge.level
      survival_xp = cur_knowledge.experience
    }

    if (cur_knowledge.name == 'taming') {
      taming_lv = cur_knowledge.level
      taming_xp = cur_knowledge.experience
    }

    if (cur_knowledge.name == 'explosives') {
      explosives_lv = cur_knowledge.level
      explosives_xp = cur_knowledge.experience
    }
  }

  knowledge = `
    <div class="skill_tile" style="height:100%;padding-top:1rem;height:5rem;width:30%;margin-left:68%;margin-right:1.5%;margin-top:-.5rem;">
                    <p class="title" style="text-align:center;color:#6168ed;margin-top:-1rem;font-size:14px;">Total Knowledge</p>
                    <p class="title" style="text-align:left;color:#6168ed;margin-top:-.75rem;font-size:14px;margin-left:10%;">Level: ${total_lv}</p>
                    </div>
                    <div class="skill_tile" style="height:100%;padding-top:1rem;height:5rem;width:30%;margin-left:68%;margin-right:1.5%;margin-top:.5rem;">
                    <p class="title" style="text-align:center;color:#6168ed;margin-top:-1rem;font-size:14px;">Elements</p>
                    <p class="title" style="text-align:left;color:#6168ed;margin-top:-.75rem;font-size:14px;margin-left:10%;">Level: ${elements_lv}</p>
                    <p class="title" style="text-align:left;color:#6168ed;margin-top:-1rem;font-size:14px;margin-left:10%;">Exp: ${elements_xp}</p>
                    </div>
                    <div class="skill_tile" style="height:100%;padding-top:1rem;height:5rem;width:30%;margin-left:68%;margin-right:1.5%;margin-top:.5rem;">
                    <p class="title" style="text-align:center;color:#6168ed;margin-top:-1rem;font-size:14px;">Navigation</p>
                    <p class="title" style="text-align:left;color:#6168ed;margin-top:-.75rem;font-size:14px;margin-left:10%;">Level: ${navigation_lv}</p>
                    <p class="title" style="text-align:left;color:#6168ed;margin-top:-1rem;font-size:14px;margin-left:10%;">Exp: ${navigation_xp}</p>
                    </div>
                    <div class="skill_tile" style="height:100%;padding-top:1rem;height:5rem;width:30%;margin-left:68%;margin-right:1.5%;margin-top:.5rem;">
                    <p class="title" style="text-align:center;color:#6168ed;margin-top:-1rem;font-size:14px;">Arcane</p>
                    <p class="title" style="text-align:left;color:#6168ed;margin-top:-.75rem;font-size:14px;margin-left:10%;">Level: ${arcane_lv}</p>
                    <p class="title" style="text-align:left;color:#6168ed;margin-top:-1rem;font-size:14px;margin-left:10%;">Exp: ${arcane_xp}</p>
                    </div>
                    <div class="skill_tile" style="height:100%;padding-top:1rem;height:5rem;margin-left:auto;width:30%;margin-right:33%;margin-top:-21.5rem;">
                    <p class="title" style="text-align:center;color:#6168ed;margin-top:-1rem;font-size:14px;">Botany</p>
                    <p class="title" style="text-align:left;color:#6168ed;margin-top:-.75rem;font-size:14px;margin-left:10%;">Level: ${botany_lv}</p>
                    <p class="title" style="text-align:left;color:#6168ed;margin-top:-1rem;font-size:14px;margin-left:10%;">Exp: ${botany_xp}</p>
                    </div>
                    <div class="skill_tile" style="height:100%;padding-top:1rem;height:5rem;margin-left:auto;width:30%;margin-right:33%;margin-top:.5rem;">
                    <p class="title" style="text-align:center;color:#6168ed;margin-top:-1rem;font-size:14px;">Survival</p>
                    <p class="title" style="text-align:left;color:#6168ed;margin-top:-.75rem;font-size:14px;margin-left:10%;">Level: ${survival_lv}</p>
                    <p class="title" style="text-align:left;color:#6168ed;margin-top:-1rem;font-size:14px;margin-left:10%;">Exp: ${survival_xp}</p>
                    </div>
                    <div class="skill_tile" style="height:100%;padding-top:1rem;height:5rem;margin-left:auto;width:30%;margin-right:33%;margin-top:.5rem;">
                    <p class="title" style="text-align:center;color:#6168ed;margin-top:-1rem;font-size:14px;">Taming</p>
                    <p class="title" style="text-align:left;color:#6168ed;margin-top:-.75rem;font-size:14px;margin-left:10%;">Level: ${taming_lv}</p>
                    <p class="title" style="text-align:left;color:#6168ed;margin-top:-1rem;font-size:14px;margin-left:10%;">Exp: ${taming_xp}</p>
                    </div>
                    <div class="skill_tile" style="height:100%;padding-top:1rem;height:5rem;margin-left:auto;width:30%;margin-right:33%;margin-top:.5rem;">
                    <p class="title" style="text-align:center;color:#6168ed;margin-top:-1rem;font-size:14px;">Explosives</p>
                    <p class="title" style="text-align:left;color:#6168ed;margin-top:-.75rem;font-size:14px;margin-left:10%;">Level: ${explosives_lv}</p>
                    <p class="title" style="text-align:left;color:#6168ed;margin-top:-1rem;font-size:14px;margin-left:10%;">Exp: ${explosives_xp}</p>
                    </div>
                    `

  $('#knowledge_elements').empty()
  $('#knowledge_elements').append(knowledge)
}

function build_local_items (item_inventory) {
  item_inventory = JSON.parse(item_inventory)
  local_item_elements = ''
  for (i = 1; i < item_inventory.length; ++i) {
    item = item_inventory[i]

    if (!item.ual) {
      // local_item_elements = local_item_elements+`
      // <div style="height:100%;border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;padding-top:1rem;height:5rem;margin-left:auto;width:14%;margin-right:2.5%;margin-top:-.5rem;">
      //     <p class="title" style="text-align:center;color:#6168ed;margin-top:-1rem;font-size:14px;">${item.name}</p>
      //     <p class="title" style="text-align:center;color:#6168ed;margin-top:-1rem;font-size:14px;">${item.quantity}</p>
      //     </div>`

      local_item_elements =
        local_item_elements +
        `
            
            <div class="skill_tile"  onclick='load_item(${JSON.stringify(
              item
            )})' style="height:100%;padding-top:1rem;height:10rem;width:20%;float:right;margin-left:5%;margin-bottom:3%;">
            <p style="text-align:center;color:#6168ed;float:right;margin-top:-1.1rem;margin-bottom:.75rem;margin-right:.5rem;font-size: 14px;"><b>${
              item.quantity
            }</b></p>
            <div style="width:90%;height:70%;background-color:#EAE6E6;margin-left:5%;border-radius:10px 10px 10px 10px;">
            <h4 style="color:#6168ed;font-size: 10px;text-align:center;padding-top:50%;"><b>Images soon!</b></h4>
            </div>
            <p style="text-align:center;color:#6168ed;margin-bottom:-1px;font-size:13px;word-wrap: break-word;"><b>${
              item.name
            }</b></p>
            </div>
            
            `
    }
  }
  $('#item_elements').empty()
  $('#item_elements').append(local_item_elements)
}

function build_minted_items (item_inventory) {
  item_inventory = JSON.parse(item_inventory)
  minted_item_elements = ''
  for (i = 1; i < item_inventory.length; ++i) {
    item = item_inventory[i]

    if (item && item.ual) {
      minted_item_elements =
        minted_item_elements +
        `
            
            <div class="skill_tile"  onclick='load_item(${JSON.stringify(
              item
            )})' style="height:100%;padding-top:1rem;height:10rem;width:20%;float:right;margin-left:5%;margin-bottom:3%;">
            <p style="text-align:center;color:#6168ed;float:right;margin-top:-1.1rem;margin-bottom:.75rem;margin-right:.5rem;font-size: 14px;"><b>${
              item.quantity
            }</b></p>
            <div style="width:90%;height:70%;background-color:#EAE6E6;margin-left:5%;border-radius:10px 10px 10px 10px;">
            <h4 style="color:#6168ed;font-size: 10px;text-align:center;padding-top:50%;"><b>Images soon!</b></h4>
            </div>
            <p style="text-align:center;color:#6168ed;margin-bottom:-1px;font-size:13px;word-wrap: break-word;"><b>${
              item.name
            }</b></p>
            </div>`
    }
  }
  $('#item_elements').empty()
  $('#item_elements').append(minted_item_elements)
}

function load_item (item) {
  let ual
  //item = JSON.parse(item)
  item_name = item.name
  rarity = item.rarity
  description = item.description
  effect = item.effect
  boost = item.boost
  knowledge = item.knowledge
  quantity = item.quantity
  ual = item.ual
  if (ual) {
    view_item_elements = `
            <h4 class="title" style="text-align:center;color:#6168ed;font-family: OCR A Std, monospace;">(${quantity})${item_name}</h4>
            <div style="height:18rem;width:90%;">
              <p style="text-align:left;color:#6168ed;margin-top:-2.75rem;font-size:14px;">${rarity}</p>
              <p style="text-align:left;color:#6168ed;margin-left: 10%;font-size:14px;margin-top:1rem;">${description}</p>
              <p style="text-align:left;color:#6168ed;margin-left: 10%;margin-top:-.5rem;font-size:14px;"><b>EFFECT:</b> ${effect}</p>
              <p style="text-align:left;color:#6168ed;margin-left: 10%;width:30%;font-size:14px;"><b>BOOST:</b> ${boost}</p>
              <p style="text-align:left;color:#6168ed;margin-left: 50%;margin-top:-4.75rem;font-size:14px;"><b>KNOWLEDGE:</b> ${knowledge}</p>
            </div>
               `

    mint_area = `
               <h4 style="color:#6168ed;font-size: 12px;margin-top:2rem;text-align:center;"><b><a href="https://www.otnode.com/lookup?ual=${ual}" target=_blank>${ual}</a></b></h4>
                `
  } else {
    view_item_elements = `
            <h4 class="title" style="text-align:center;color:#6168ed;font-family: OCR A Std, monospace;">(${quantity})${item_name}</h4>
                <div style="height:8rem;width:90%;">
                  <p style="text-align:left;color:#6168ed;margin-top:-2.75rem;font-size:14px;">${rarity}</p>
                  <p style="text-align:left;color:#6168ed;margin-left: 10%;font-size:14px;margin-top:1rem;">${description}</p>
                  <p style="text-align:left;color:#6168ed;margin-left: 10%;margin-top:-.5rem;font-size:14px;"><b>EFFECT:</b> ${effect}</p>
                  <p style="text-align:left;color:#6168ed;margin-left: 10%;width:30%;font-size:14px;"><b>BOOST:</b> ${boost}</p>
                  <p style="text-align:left;color:#6168ed;margin-left: 50%;margin-top:-4.75rem;font-size:14px;"><b>KNOWLEDGE:</b> ${knowledge}</p>
                </div>

               `

    mint_area = `
               <input type="text" name="type" id="type" style="display:none;padding-top:1rem;" value="isok"></input>
                        <input type="text" name="item_data" id="item_data" style="display:none;" value=""></input>
                        <input type="text" name="keywords" id="item_data" style="display:none;" value="${item_name}"></input>
                        <span style="width:20%;margin-left:5%;color:#6168ed;">Trac Payment:</span>
                        <input name="trac_fee" id="trac_fee" rows="4" placeholder="Leave blank for cheapest" style="font-family: OCR A Std, monospace;float:right;width:50%;margin-right:20%;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" value="" ></input>
                        <br>
                        <br>
                        <span style="width:20%;margin-left:5%;color:#6168ed;" data-hover="The amount of time you want to pay to keep the asset hosted">Epochs:</span>
                        <input name="epochs" id="epochs" rows="4" placeholder="For this many Epochs..." style="font-family: OCR A Std, monospace;width:30%;float:right;margin-right:40%;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" value="20" required ></input>
                        <span style="font-weight: 400;margin-bottom:-1.4rem;margin-left:21.5%;font-size:22px;font-family: OCR A Std, monospace;display:none;font-size:12px;color:red;" id="invalid_json">Invalid JSON</span>
                        <span style="font-weight: 400;margin-bottom:-1.4rem;margin-left:21.5%;font-size:22px;font-family: OCR A Std, monospace;display:none;font-size:12px;color:red;" id="invalid_chain">Invalid Chain</span>
                        <div type="submit" class="mint_button" id="mintButton" style="margin-left:12.5%;margin-top:2.5%;font-family: OCR A Std, monospace;width:75%;height:4.5rem;" onclick="sendPublish()">
                            <p class="title" style="text-align:center;font-size:22px;font-family: OCR A Std, monospace;">Mint Item</p>
                        </div>`
  }

  $('#mint_area').empty()
  $('#mint_area').append(mint_area)

  $('#view_item_elements').empty()
  $('#view_item_elements').append(view_item_elements)

  document.getElementById('epochs').value = 20
  document.getElementById('_type').value = 'isok'
  document.getElementById('_action').value = 'item creation'
  $('#item_data').empty()
  $('#item_data').append(`<span style="word-wrap: break-word;">${item}</span>`)
  document.getElementById('item_data').value = JSON.stringify(item)
}
