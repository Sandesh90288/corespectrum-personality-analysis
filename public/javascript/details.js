let id;
const generateid = document.getElementById('generateid');
const generateb = document.getElementById('generateb');
const start = document.getElementById('start');

function generateUUID() {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
   });
}

generateb.addEventListener('click', () => {
   console.log("button clicked");
   id = generateUUID(); // Replaced here
   generateid.innerText = id;
});

start.addEventListener('click', async () => {
   const username = document.getElementById('name').value;
   try {
      let response = await fetch("/perso_test/welcomepage/startnew/usercreated", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ username, id })
      });
      let data = await response.json();
      if (response.ok && data.url && !data.error) {
         window.location.href = data.url;
      } else {
         console.log("error in creating the account");
      }
   } catch (error) {
      console.error("error in fetching the data", error);
   }
});
