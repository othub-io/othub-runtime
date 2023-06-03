require('dotenv').config()
var express = require('express')
var router = express.Router()

router.get('/', async function (req, res) {
  res.send(`#!/bin/bash

  source .env
  
  telegram_message() {
      curl -X POST https://api.telegram.org/bot$BOT_ID/sendMessage -d chat_id=$CHAT_ID -d text="$@"
  }
  
  #NODE SERVICE CHECK
  OUTPUT=$(systemctl status otnode 2>&1)
  if [[ $? -ne 0 ]]; then
      telegram_message "$NODE_ID is not running. Please fix immediately."
  fi
  
  #DISK CAPACITY CHECK (IN MB)
  THRESHOLD=250
  DISK_SPACE=$(df -BM / | awk 'NR==2{print $4}' | tr -d 'M')
  if [[ $DISK_SPACE -lt $THRESHOLD ]]; then
      telegram_message "$NODE_ID has Low storage space: $DISK_SPACE MB left."
  fi
  
  #NODEJOB
  
  nodejnl() {
      if [ $# -eq 1 ]; then
          journalctl -u otnode | grep "$1" | wc -l
      else
          journalctl -u otnode --since="$1" | grep "$2" | wc -l
      fi
  }
  
  nodejob() {
      WINS=$(nodejnl "Scheduling calculateProofsCommand")
      ATTEMPTS=$(nodejnl "Started epochCheckCommand")
      LASTHOUR_WINS=$(nodejnl "1 hour ago" "Scheduling calculateProofsCommand")
      LASTHOUR_ATTEMPTS=$(nodejnl "1 hour ago" "Started epochCheckCommand")
      if [ $ATTEMPTS -gt 0 ]; then
          WIN_RATIO=$(echo "scale=2; $WINS / $ATTEMPTS * 100" | bc)
      else
          WIN_RATIO=0
      fi
      echo "$NODE_ID: $WINS ($LASTHOUR_WINS) / $ATTEMPTS ($LASTHOUR_ATTEMPTS) ($WIN_RATIO%)"
  }
  
  telegram_message "$(nodejob)"`)
})

module.exports = router
