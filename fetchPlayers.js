let axios = require('axios'); // HTTP client
let fs = require('fs'); // is included in node.js - you don't need to install it

let totalPage;
let currentPage = 1;
let players = [];

function getPlayer() {
  axios.get('https://www.easports.com/fifa/ultimate-team/api/fut/item?page=' + currentPage)
    .then((response) => {
       totalPage = response.data.totalPages;

      if (currentPage < totalPage) {
        currentPage++;
        response.data.items.forEach(element => {
          players.push(element);
        });
        getPlayer();
      }
      else {
        console.log(players.length);
        fs.writeFile('data/players.json',
          JSON.stringify(players, null, 3), (err) => {
            console.log('File successfully written!');
          })
      }
      // console.log(response.data.currentPage);

    }, (error) => console.log(error));
}
getPlayer();

