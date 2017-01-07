var studentList = document.querySelector('ul.student-list').children;


var renderStudentList = function(fullList, page){
	console.log("Paginate event: Page "+ page)
};

//Display on 10 students on load
renderStudentList(studentList, 1);
	//Display first 10
	//Hide the rest

//Dynamically create and insert pagination links
var createPaginationLinks = function(fullList){
	//Find out how many links we need
	var numberOfLinks = Math.floor(fullList.length/10);
	var newDiv = document.createElement('div');
	newDiv.className = 'pagination'
	var newLinkList = document.createElement('ul');
	//Create list items for links
	for(var i = 0; i < numberOfLinks; i++){
		var newListItem = document.createElement('li');
		var linkNum = i+1;
		newListItem.innerHTML = "<a href='#'>"+linkNum+"</a>";
		newLinkList.appendChild(newListItem);
	}
	newDiv.appendChild(newLinkList);
	//Return the pagination div we just created!
	return newDiv;
	}


var newPagination = createPaginationLinks(studentList);
document.querySelector('div.page').appendChild(newPagination) ;
	

//Add paginated list behaviour
	//When 1 is clicked
		//display 1-9
		//hide the rest
	//When 2 is clicked
		//display 10-19
		//hide the rest
	//When 3 is click
		//display 20-29
	//etc.

//Dynamically insert search
	//Example:
		// <!-- student search HTML to add dynamically -->
	 //        <div class="student-search">
	 //          <input placeholder="Search for students...">
	 //          <button>Search</button>
	 //        </div>
	 //        <!-- end search -->

//Add search behaviour
	//when button clicked
		//hide all results
		//return student(s) that matches search value
		//display results
		//if search is blank, reset view
