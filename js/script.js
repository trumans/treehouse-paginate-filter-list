/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const pageDiv = document.querySelector('div.page');
var students = document.querySelectorAll('.student-item');

var paginationUL = createPaginationParent(pageDiv);
var pageSize = 10;  // after testing then update to const
createPagination( paginationUL , students.length, pageSize )


// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four




// Handle pagination links
// Create and apparent the element that holds the links
//   Return the UL element that will contain the links
function createPaginationParent( parentElement ) {
  let div = document.createElement('div');
  div.className = 'pagination';
  let linksUL = document.createElement('ul');
  div.appendChild(linksUL)
  parentElement.appendChild(div);
  return linksUL;
}

// Add or remove links based on the new calculated page count
function createPagination( paginationUL, listSize, pageSize ) {

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


// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
