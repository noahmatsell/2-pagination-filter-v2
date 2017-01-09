var studentList = document.querySelector('ul.student-list');
var warningMessage = document.createElement('p');
warningMessage.classList.add("warning", "hide");
warningMessage.textContent = "Student not found. Try a new search."
document.querySelector('div.page').insertBefore(warningMessage, studentList);

//Function to render list of students
var renderStudentList = function(fullList, page){
	//Ensure page is an integer
	var pageNumber = parseInt(page);
	console.log("Paginate event: Page "+ pageNumber);
	//Hide students
	for(i=0; i < fullList.childElementCount; i++){
		fullList.children[i].classList.add('hide');
	}
	//Find index of first student in pagelist
	var indexStart = (pageNumber-1)*10;
	//Build student list
	for(var i = 0; i < 10; i++){
		if(fullList.children[indexStart+i]){
			fullList.children[indexStart+i].classList.remove("hide");
		}else{
			break;
		}
	}
};
//Function to dynamically create and insert pagination links
var createPaginationLinks = function(fullList){
	//Find out how many links we need
	var numberOfLinks = Math.ceil(fullList.childElementCount/10);
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
	//Append the pagination div we just created!
	document.querySelector('div.page').appendChild(newDiv) ;
};
//Function to dynamically create search field
var createSearchField= function(target){
	//Create container
	var searchContainer = document.createElement('div');
	searchContainer.className = "student-search";
	//Create search input
	var searchInput = document.createElement('input');
	searchInput.placeholder = "Search for student...";
	searchContainer.appendChild(searchInput);
	//Create button
	var searchButton = document.createElement('button');
	searchButton.textContent = "Search";
	searchContainer.appendChild(searchButton);
	//Append to target
	target.appendChild(searchContainer);
};
//Function for student query
var findStudent = function(fullList){
	//Get Search Input Value
	var searchInput = document.querySelector('div.student-search input').value;
	var foundStudents = false;
	var warningMessage = document.querySelector('p.warning');
	warningMessage.classList.add('hide');
	//If there's a match, show. Else hide
		if(searchInput === ""){
			warningMessage.classList.add('hide');
			renderStudentList(studentList, 1);
		}else{
			//Hide unmatched students
			for(i=0; i < fullList.childElementCount; i++){
				var studentText = fullList.children[i].textContent;
				if(studentText.match(searchInput)){
					warningMessage.classList.add('hide');
					fullList.children[i].classList.remove('hide');
					foundStudents = true;
				}else{
					fullList.children[i].classList.add('hide');
				}
			}
			if (!foundStudents){
				warningMessage.classList.remove('hide');
			}
		}
	
};
//Function for adding link behaviour
var bindLinkEvents = function(linkList){
	var paginationLinkList = linkList.querySelector('ul')
	//Loop through list, add click events for each link
	for(i=0; i < paginationLinkList.childElementCount; i++){
		var link = paginationLinkList.children[i].querySelector('a');
		link.addEventListener('click', function(){
			renderStudentList(studentList, this.textContent);
		});	
	}
};

//Creating pagination links
createPaginationLinks(studentList);
//Add paginated link behaviour
bindLinkEvents(document.querySelector('div.pagination'));
//Dynamically insert search
createSearchField(document.querySelector('div.page-header'));
//Bind search behaviour
var searchButton = document.querySelector('div.student-search button');
searchButton.addEventListener('click', function(){
	findStudent(studentList);
});
//Display first 10 students initially
renderStudentList(studentList, 1);
