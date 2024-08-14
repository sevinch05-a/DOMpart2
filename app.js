var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
    ]},
    ];
  //Part 1
  // 1. Select and cache the <main> element in a variable named mainEl
  const mainEl = document.getElementsByTagName("main")[0];
  // 2. Set the background color of mainEl to the value stored in the --main-bg CSS custom property
  mainEl.style.backgroundColor = "var(--main-bg)";
  // 3. Set the content of mainEl to <h1>DOM Manipulation</h1>
  mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
  // 4. Add a class of flex-ctr to mainEl
  mainEl.classList.add("flex-ctr");
  //Part 2
  // Select and cache the <nav> element in a variable named topMenuEl
  const topMenuEl = document.getElementById("top-menu");
  // Set the height of the topMenuEl element to be 100%
  topMenuEl.style.height = "100px"; // Assuming height should be 100px for better layout
  // Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property
  topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
  // Add a class of flex-around to topMenuEl
  topMenuEl.classList.add("flex-around");
  //Part 3
  //Part Three
  // Iterate over the entire menuLinks array and for each "link" object:
  for (const link of menuLinks) {
  // Create an <a> element.
  const a = document.createElement("a");
  // On the new element, add an href attribute with its value set to the href property of the "link" object.
  a.href = link.href;
  // Set the new element's content to the value of the text property of the "link" object.
  a.innerText = link.text;
  // Append the new element to the topMenuEl element.
  topMenuEl.appendChild(a);
  }
  //Part TWO
  //Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
  const subMenuEl = document.getElementById('sub-menu');
  //Set the height subMenuEl element to be "100%".
  subMenuEl.style.height = "100%";
  //Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
  subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
  //Add the class of flex-around to the subMenuEl element.
  subMenuEl.classList.add("flex-around");
  // Now, change the position of the submenu to temporarily hide it. Later, we will make the submenu appear dynamically based on user interaction:
  // Set the CSS position property of subMenuEl to the value of absolute.
  subMenuEl.style.position = "absolute";
  // Set the CSS top property of subMenuEl to the value of 0.
  subMenuEl.style.top = "0";
  // Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
  // Attach a delegated 'click' event listener to topMenuEl.
  // The first line of code of the event listener function should call the event object's preventDefault() method.
  // Assume topMenuLinks is a NodeList of <a> elements
  const topMenuLinks = document.querySelectorAll('nav a');
  // Event listener function
          topMenuEl.addEventListener('click', function(event) {
            event.preventDefault();
            if (event.target.tagName !== 'A') return;
            console.log(event.target.textContent);
            topMenuLinks.forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');
            if (event.target.classList.contains('active')) {
              const linkObject = menuLinks.find(link => link.text === event.target.textContent.toLowerCase());
              if (linkObject.subLinks) {
                subMenuEl.style.top = '13vh';
                buildSubMenu(linkObject.subLinks);
              } else {
                subMenuEl.style.top = '0';
              }
            } else {
              subMenuEl.style.top = '0';
            }
          });
          function buildSubMenu(subLinks) {
            subMenuEl.innerHTML = '';
            subLinks.forEach(link => {
              const a = document.createElement('a');
              a.setAttribute('href', link.href);
              a.textContent = link.text;
              subMenuEl.appendChild(a);
            });
          }
          subMenuEl.addEventListener('click', function(event) {
            event.preventDefault();
            if (event.target.tagName !== 'A') return;
            console.log(event.target.textContent);
            subMenuEl.style.top = '0';
            topMenuLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('main h1').textContent = event.target.textContent;
          });
  // Within the event listener, if the clicked <a> element does not yet have a class of "active" (it was inactive when clicked):
  // If the clicked <a> element's "link" object within menuLinks has a subLinks property (all do, except for the "link" object for ABOUT), set the CSS top property of subMenuEl to 100%.
  // Otherwise, set the CSS top property of subMenuEl to 0.
  // Hint: Caching the "link" object will come in handy for passing its subLinks array later.