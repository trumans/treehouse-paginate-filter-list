# Primary Features #

* List displays 10 names at a time with page# buttons for
pagination.

* Search term input immediately filters the list.

* Displays a message when search filter displays no students.

* Pagination buttons are highlighted to indicate current page number and are dynamically updated as per search filter.

* HTML elements used by search, pagination and messaging are created by JavaScript and are not dependent on index.html (to support progressive enhancement)

# Coding Comments #

*  Student list is a hardcoded HTML ordered list

*  Individual students are shown if student matches current filter and appears on the currently selecte page, otherwise it is hidden.

* Pagination elements at button of page are regenerated (HTML is inserted) every time the page is filtered.
