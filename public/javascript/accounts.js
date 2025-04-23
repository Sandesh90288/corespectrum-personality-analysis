let directresult=document.getElementById('directresult');
let startnew=document.getElementById('startnew');
directresult.addEventListener('click',async ()=>{
    const id = document.getElementById("uniqueid").value;
     if (!id) {
        alert("Please enter the allocated previously id");
     }
     else
     {
        try {
            console.log("📡 Sending request to /result...");
            const response = await fetch("welcomepage/getresult", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uniqueid })
            });
            const data = await response.json();
            if (response.ok && data.url && !response.error) {
                window.location.href = data.url;
            }
            else{
                alert("id does not exist");
            }
        }
        catch (error) {
            console.error("❌ Error fetching the result:", error);
        }
     }
});
startnew.addEventListener('click', ()=>{
    window.location.href = "/perso_test/welcomepage/startnew";
});  