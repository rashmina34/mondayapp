WebHook Information

Installation

Prerequisites
Node.js: Ensure you have Node.js installed (preferably version 14 or later).
MongoDB: A MongoDB instance is required for the module to interact with.

Steps
1. Clone the repository or copy the script file:
    git clone https://github.com/rashmina34/mondayapp.git
    cd mondayapp

2. Install dependencies:
    npm install

3. RUN Project 
    node index.js

Environment Variables

MONDAY_API_TOKEN=PERSONAL_API_TOKEN
RESULT_COLUMN_ID=result_column_id_here
PORT=3000 --by default

for API token
- click profile icon in monday board and turn on developer mode click profile icon -> monday.labs -> search for developer mode and activate it
- click automation located at top right corner just below profile icon -> connections -> account connections -> API -> copy personal API token

for column id
- go to monday board -> click the three dot of Result column and copy id 

for webhook
- click automation or Integrate located at top right corner just below profile icon -> search for webhook -> select when column change sent webhook -> add tunnel link and end point followed by / -> select column -> create automation

for tunnel 
- install ngrok or any other tunnel
- run ngrok by ngrok http <PORT>



License
This project is licensed under the MIT License.

