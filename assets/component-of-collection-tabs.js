 
  // Event listener for DOMContentLoaded
 document.addEventListener('DOMContentLoaded', function() {
  
    addCollectionTabsEvent();
    // addDropdownSelecterEvent();

        // set default button text
        const ofTabButton = document.getElementById('of-tab-button');
        const activeCollectionTab = document.querySelector('.of-collection-tabs .tab.active');
        const tabs = document.querySelectorAll('.of-collection-tabs .tab');

        // const tabs = document.querySelectorAll('.tab');
        // console.log(tabs);
      
       
        
        // if(activeCollectionTab){
        //   ofTabButton.innerHTML = activeCollectionTab.dataset.buttonText;
        // }else{
        //   ofTabButton.innerHTML = tabs[0].innerHTML;
        // }

  });

  /* ============== Event listener on body for dropdown ============== */

  document.addEventListener('click', e => {
    
    const closestOfDropdown = e.target.closest("[data-of-dropdown]");
    const isOfDropdownButton = e.target.matches("[data-of-dropdown-button]");

    if( !isOfDropdownButton && closestOfDropdown != null ) return;

    if(isOfDropdownButton){
      closestOfDropdown.classList.toggle('active');
    }else{
      const activeDropdown = document.querySelector('[data-of-dropdown]');
      activeDropdown.classList.remove('active');
    }


  })

/* ============== External funtions ============== */

function addDropdownSelecterEvent(){
  const dropdownSelector = document.getElementById('dropdown-selector');
  const dropdownMenu = document.querySelector('.of-dropdown-menu');

  dropdownSelector.addEventListener('click', function(){
    dropdownMenu.classList.toggle('active');
  })
}

  function addCollectionTabsEvent(){
    const tabs = document.querySelectorAll('.of-collection-tabs .tab');

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
    
            renderCollection(tab.dataset.id, tab.dataset.collectionHandle, tab.dataset.buttonText);
        });
         
      });

     

    

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
        console.log(ofTabButton);
        ofTabButton.innerHTML = buttonText;

        // history.replaceState(null,null, collectionId+'?of-collection-id='+collectionId);
        history.replaceState(null,null, collectionId);
        addCollectionTabsEvent();
        addDropdownSelecterEvent();
      })
      .catch(error => {
        console.error('Error fetching collection:', error);
      })
      .finally(() => loader.classList.remove('active'));
  }
