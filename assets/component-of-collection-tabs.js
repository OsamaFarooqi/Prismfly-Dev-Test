 
  // Event listener for DOMContentLoaded
 document.addEventListener('DOMContentLoaded', function() {
  
    addCollectionTabsEvent();

  });

/* ============== External funtions ============== */

  function addCollectionTabsEvent(){
    const tabs = document.querySelectorAll('.of-collection-tabs .tab');
    console.log(tabs.length);

    tabs.forEach(tab => {
    
        // Add click event listener
        tab.addEventListener('click', function(){
          
            //Set active class for current tab
           // tab.classList.add('active');
              // Remove active class from previously active tab
            // tabs.forEach(innerTab => {
            //     innerTab.classList.remove('active');
            //     });
    
            // tab.classList.add('active');
            console.log("hello g");
            console.log(tab.dataset.collectionHandle);
    
            renderCollection(tab.dataset.id, tab.dataset.collectionHandle, tab.dataset.buttonText);
        });
         
      });

     

        // set default button text
    const ofTabButton = document.getElementById('of-tab-button');
    // const tabs = document.querySelectorAll('.tab');
    // console.log(tabs);
    ofTabButton.innerHTML = tabs[0].innerHTML;

  }


      // Function to fetch and render collection data
 function renderCollection(selectedTabId, collectionId, buttonText) {
    const loader = document.querySelector('.loader');
   

    loader.classList.add('active');
    fetch('/collections/' + collectionId + '?view=section')
      .then(response => response.text())
      .then(html => {
        // Replace collection container content with fetched HTML
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = html; 

        let newContent = tempDiv.querySelector('#MainContent').innerHTML; 
        document.querySelector('#MainContent').innerHTML = newContent;

 
        // // Reinitialize Shopify section scripts
        // if (window.Shopify && window.Shopify.PaymentButton) {
        //   window.Shopify.PaymentButton.init();
        // }

        const tabs = document.querySelectorAll('.of-collection-tabs .tab');
        tabs.forEach(tab => {
            console.log(tab);
            if(tab.dataset.id == selectedTabId){
                tab.classList.add('active');
            }else{
                tab.classList.remove('active');
            }
            
        });

        // tab.classList.add('.active');
        // console.log(tab);

        //Set button text
        const ofTabButton = document.getElementById('of-tab-button');
        ofTabButton.innerHTML = buttonText;

        // history.replaceState(null,null, collectionId+'?of-collection-id='+collectionId);
        history.replaceState(null,null, collectionId);
        addCollectionTabsEvent();
      })
      .catch(error => {
        console.error('Error fetching collection:', error);
      })
      .finally(() => loader.classList.remove('active'));
  }
