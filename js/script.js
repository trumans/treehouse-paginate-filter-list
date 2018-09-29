/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Store frequently referenced elements
const students = document.querySelectorAll('.student-item');
const paginationUL = createPaginationContainer(document.querySelector('div.page'));
const pageSize = 10;
// Create the initial pagination links
createPaginationLinks( paginationUL , students.length, pageSize );
// Initally, display page 1 without a search filter
var searchFilter = '';
selectPage( students, '1', searchFilter );

//  Change which students are displayed based on page# and search filter
//    Returns the number of students that contain the search filter
function filterList( listItems, pageNum, searchFilter ) {
  // set the range of matches to display based on page# and page size
  let firstMatchToDisplay = ((pageNum - 1) * pageSize) + 1;
  let lastMatchToDisplay = firstMatchToDisplay + pageSize - 1;

  let itemsMatched = 0;
  let student, name, email;

  for (let idx = 0; idx < listItems.length; idx++ ) {
    student = listItems[idx];
    name = student.querySelector('h3').textContent;
    email = student.querySelector('.email').textContent;
    // don't display students that don't contain search filter
    if ( name.indexOf(searchFilter) === -1 &&
         email.indexOf(searchFilter) === -1 ) {
       student.style.display = 'none'
    } else {  // display students if page has room
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
  return itemsMatched;
}

// Filter students based on selected page# and search term
//   Manage pagination links
//   Parameters:
//     pageNum: string. expected to be a value on a pagination link
//     searchFilter: string. must be in student name or email to display it
function selectPage( listItems, pageNum, searchFilter  ) {
  let itemsMatched = filterList( students, pageNum, searchFilter );
  createPaginationLinks( paginationUL, itemsMatched, pageSize );
  setActivePageNumber( paginationUL, pageNum );
}

paginationUL.addEventListener('click', function(event) {
  selectPage( students, event.target.textContent, searchFilter );
});

// Handle pagination links

// Create the element that will hold the page# links
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

  // append needed buttons
  if ( links.length < newPageCount ) {
    let newLI;
    let newLink;
    for ( let idx = links.length; idx < newPageCount; idx++ ) {
      newLI = document.createElement('li');
      newLink = document.createElement('a');
      newLink.href = '#';
      newLink.textContent = (idx + 1).toString();
      newLI.appendChild(newLink);
      paginationUL.appendChild(newLI);
    }
  }
  // remove unneeded button starting from the last
  else if ( newPageCount < links.length ) {
    for ( let idx = (links.length - 1); idx >= newPageCount; idx-- ) {
      paginationUL.removeChild(links[idx]);
    }
  }
}

// Highlight and un-highlight page numbers in pagination
//   Un-highlight the currently highlighted page link
//   Highlight the page link specified by parameter pageNum
function setActivePageNumber( paginationUL, pageNum ) {
  let link, newClass
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
