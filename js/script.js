/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Store frequently referenced elements and create new elements
const students = document.querySelectorAll('.student-item');
const pageSize = 10;
const searchFilterForm = createSearchElements(
  document.querySelector('div.page-header'));
const searchInput = searchFilterForm.querySelector('input');
const searchButton = searchFilterForm.querySelector('button');
const paginationUL = createPaginationContainer(
  document.querySelector('div.page'));
const msgDisplay = createMessageDisplay(
  document.querySelector('div.page'));

// Display page 1 with no filter
displayPage( students, '1', '' );

// Filter students based on selected page# and search term
//   Manage pagination links
//   Parameters:
//     pageNum: string. expected to be a value on a pagination link
//     searchFilter: string. must be in student name or email to display it
function displayPage( listItems, pageNum, searchFilter  ) {
  let itemsMatched = filterList( students, pageNum, searchFilter );
  createPaginationLinks( paginationUL, itemsMatched, pageSize );
  setActivePageNumber( paginationUL, pageNum );
}

paginationUL.addEventListener('click', function(event) {
  displayPage( students, event.target.textContent, searchInput.value );
});

searchButton.addEventListener('click', function(event) {
  displayPage( students, '1', searchInput.value );
});

searchInput.addEventListener('keyup', function(event) {
  displayPage( students, '1', searchInput.value );
});

//  Change which students are displayed based on page# and search filter
//    Returns the number of students that contain the search filter
function filterList( listItems, pageNum, searchFilter ) {
  // set the range of matches to display based on page# and page size
  let firstMatchToDisplay = ((pageNum - 1) * pageSize) + 1;
  let lastMatchToDisplay = firstMatchToDisplay + pageSize - 1;

  let itemsMatched = 0;
  let student, name, email;

  // Returns true if student matches search filter
  function studentMatchesSearch( student, searchFilter ) {
    str = searchFilter.toLowerCase();
    name = student.querySelector('h3').textContent.toLowerCase();
    email = student.querySelector('.email').textContent.toLowerCase();
    return ( name.indexOf(str) !== -1 || email.indexOf(str) !== -1 );
  }

  for (let idx = 0; idx < listItems.length; idx++ ) {
    student = listItems[idx];
    // don't display students that fail search filter
    if ( searchFilter.length &&
         ! studentMatchesSearch( student, searchFilter ) ) {
       student.style.display = 'none'
    } else {  // otherwise display students if page has room
      itemsMatched++;
       // the page has room to display student
       if ( itemsMatched >= firstMatchToDisplay &&
            itemsMatched <= lastMatchToDisplay ) {
         student.style.display = '';
      } else { // page is full
        student.style.display = 'none';
      }
    }
  }
  displayMessage(msgDisplay, (itemsMatched ? '' : 'No students found'));
  return itemsMatched;
}

// Highlight and un-highlight page numbers in pagination
//   Un-highlight the currently highlighted page link
//   Highlight the page link specified by parameter pageNum
function setActivePageNumber( paginationUL, pageNum ) {
  let link, newClass;
  for ( let pageLI of paginationUL.children ) {
    link = pageLI.querySelector('a');
    newClass = '';
    // un-highlight currently highlighted page# (maybe)
    if ( link.className === 'active' ) newClass = '';
    // highlight the page# as per pageNum parameter
    if ( link.textContent === pageNum ) newClass = 'active';
    // update the class name if it changed
    if ( link.className !== newClass ) link.className = newClass;
  }
}

function displayMessage( msgElement, str ) {
  msgElement.textContent = str;
}

// Create the the search input and button
//   Return the parent to the input and button elements
function createSearchElements( parentElement ) {
    let div = document.createElement('div');
    div.className = 'student-search';

    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search for students...';
    div.appendChild(input);

    let button = document.createElement('button');
    button.textContent = 'Search';
    div.appendChild(button);

    parentElement.appendChild(div);
    return div;
}

// Create the list that will hold the page# links
//   Return the UL element that will contain the links
function createPaginationContainer( parentElement ) {
  let div = document.createElement('div');
  div.className = 'pagination';
  let linksUL = document.createElement('ul');
  div.appendChild(linksUL)
  parentElement.appendChild(div);
  return linksUL;
}

// Add or remove links based on the new calculated page count
function createPaginationLinks( paginationUL, listSize, pageSize ) {
  let newPageCount = Math.ceil( listSize / pageSize );
  let links = paginationUL.children

  function createLI( pageNum ) {
    let newLI = document.createElement('li');
    let newLink = document.createElement('a');
    newLink.href = '#';
    newLink.textContent = pageNum.toString();
    newLI.appendChild(newLink);
    return newLI;
  }

  // append needed buttons
  if ( links.length < newPageCount ) {
    for ( let idx = links.length; idx < newPageCount; idx++ ) {
      paginationUL.appendChild(createLI(idx + 1));
    }
  }
  // remove unneeded button starting from the last
  else if ( newPageCount < links.length ) {
    for ( let idx = (links.length - 1); idx >= newPageCount; idx-- ) {
      paginationUL.removeChild(links[idx]);
    }
  }
}

// Create the message field
//   Return the message display element
function createMessageDisplay( parentElement ) {
  let msg = document.createElement('h2');
  msg.style.color = 'red';
  msg.style.textAlign = 'center';
  parentElement.appendChild(msg);
  return msg
}
