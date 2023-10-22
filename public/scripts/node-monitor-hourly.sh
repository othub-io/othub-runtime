#!/bin/bash

source /etc/othub/config

messages=""
hourlypubs=""

check_status() {
  status=$(systemctl is-active otnode)
  if [[ "$status" != "active" ]]; then
    messages+=" $HOSTNAME: Otnode service is not active."
  fi
}

check_storage() {
  usage=$(df -h --output=pcent / | tail -n 1 | tr -d '[:space:]')
  percent="${usage%%%}"
  if [[ $percent -ge $MAX_STORAGE_PERCENT ]]; then
    messages+=" $HOSTNAME: Storage usage is $usage full."
  fi
}

check_wins() {
  ATTEMPTS=$(journalctl -u otnode --since "1 hour ago" | grep "Service agreement bid:" | wc -l)
  WIN=$(curl --header "Content-Type: application/json" -H "x-api-key: $API_KEY" --request POST --data "{\"nodeId\": $NODE_ID}" "https://api.othub.io/otp/v_nodes_stats_last" | jq -r '.data[0].pubsCommited1stEpochOnly')
  NETWORKPUBS=$(curl --header "Content-Type: application/json" -H "x-api-key: $API_KEY" --request POST "https://api.othub.io/otp/v_pubs_stats_last" | jq -r '.data[0].totalPubs')
  hourlypubs+=" $HOSTNAME won $WIN/$ATTEMPTS attempts with $NETWORKPUBS network pubs"
}


check_error() {
  logs=$(journalctl -u otnode --since '1 hour ago' | grep 'ERROR')
  if [[ -n "$logs" ]]; then
    messages+="ERROR has been detected on $HOSTNAME: $logs"
  fi
}

telegram_message() {
  curl -s -X POST "https://api.telegram.org/bot$BOT_ID/sendMessage" -d "chat_id=$CHAT_ID" -d "text=$1" >/dev/null
}

check_status
check_storage
check_error
check_wins

telegram_message "$messages"
telegram_message "$hourlypubs"
