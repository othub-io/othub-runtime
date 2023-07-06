# OTHub Runtime

OTHub bot is a community managed NodeJS backend specifically built to work in tandem with the othub-react and otp-sync repos.

### OTHub Runtime will be designed with a few functionalities in mind:
- Facilitate all current and future data requests between OTHub's front end (othub-react) and the mysql database maintain about the OTP Sync (otp-sync);
- Generate API keys required for requrest from the OTHub API (othub-api);
- Faciliate all dkg get/publish/get requests via the dkg.js SDK to an OTHub hosted node for both Mainnet and Testnet;

### Timeline
- Timelines for the runtime will coincide tightly with timelines for features described on the othub-repo.

### Expected Impact
OTHub Runtime is critical infrastructure for OTHub.io and will continue to be priority in the future development of OTHub.

### Instructions
> **Warning**
> 
> Please be aware that the instructions below are for users with a full sync of the OriginTrail Parachain blockchain by using otp-sync or any other indexing method which is required to run this backend. 

Set up your working environment
```
git clone https://github.com/othub-io/othub-runtime
cd othub-runtime
cp .example-env .env
npm install
```
Below is the list of essential parameters:

| Params            | Description                                |
|-------------------|-------------------------------------------|
| PORT              | The port the runtime will be available on. |
| SSL_KEY_PATH             | The Private Key path for SSL.                            |
| SSL_CRT_PATH           | The certificate path for SSL.                              |
| OT_NODE_HOSTNAME       | The IP or DNS name for the otnode required for specific features.                 |
| OT_NODE_PORT            | The port the otnode will be available on.             |
| DBHOST            | The IP or DNS name of the mySQL DB instance sync'd with otp-sync             |
| USER              | Username for accessing the mySQL database         |
| PASSWORD          | Password for accessing the mySQL database         |
| OTHUB_DB          | OTHub database name (non-sync data)                          |
| SYNC_DB           | Sync database, refer to [otp-sync](https://github.com/othub-io/otp-sync) for details               |

Set up your MySQL database
```
apt-get install mysql-server -y
node ~/othub-runtime/create-db.js
```
Copy the service file and start the runtime
```
cp ~/othub-bot/othub-runtime.service /etc/systemd/system/
systemctl daemon-reload
systemctl start othub-runtime
systemctl enable othub-runtime
```