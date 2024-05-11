 // Function to fetch and render collection data
 function renderCollection(collectionId, buttonText) {
    const loader = document.querySelector('.loader');
    const tabs = document.querySelectorAll('.of-collection-tabs .tab');

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

        tabs.forEach(tab => {
            tab.classList.remove('active');
        })

        //this.classList.add('.active');
        console.log(this);

        //Set button text
        const ofTabButton = document.getElementById('of-tab-button');
        ofTabButton.innerHTML = buttonText;

      })
      .catch(error => {
        console.error('Error fetching collection:', error);
      })
      .finally(() => loader.classList.remove('active'));
  }

  // Event listener for DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {

    // Code inside here will execute after the DOM has fully loaded
    const ofTabButton = document.getElementById('of-tab-button');
    const tabs = document.querySelectorAll('.tab');
    // console.log(tabs);
    ofTabButton.innerHTML = tabs[0].innerHTML;

  });