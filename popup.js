// btnz.addEventListener('click', loadGists);
let filterInput = document.getElementById('search');
const copyBtn = document.getElementById('copy');
const loginBtn = document.getElementById('login');
const logoBtn = document.querySelector('.navbar-brand');
const newGistBtn = document.getElementById('new-gist');
// const submitGist = document.getElementById('submit-gist');

document.addEventListener('DOMContentLoaded', loadGists)
document.addEventListener('click', getGist);
copyBtn.addEventListener('click', copy);
loginBtn.addEventListener('click', login);
document.addEventListener('click', saveDetails);
logoBtn.addEventListener('click', goHome);
newGistBtn.addEventListener('click', newGist);
document.addEventListener('click', submitGist);

    // Add event listener
filterInput.addEventListener('keyup', search);

// loadGists();


function loadGists(e, newGistRes = null)
{
	const github = new Github;
	const ui = new UI;

	const user = localStorage.getItem('gs_1');

	if (user) {
		github.getUser(user)


		.then(data => {
			let allGists = data.gists;
			if (newGistRes === null) {
				const checkTemp = localStorage.getItem('gs_temp');
				newGistRes = JSON.parse(checkTemp);
			}
			console.log(newGistRes);
			if (newGistRes !== null) {
				const check = allGists.filter( gist => gist.id === newGistRes.id);
				if(check.length === 0) {
					console.log(check);
					allGists.push(newGistRes);
				}
				
			}

			ui.showGists(allGists);
			
			console.log(data);
			console.log(allGists);
		});
	}

	
}
function submitGist(e)
{
	const github = new Github;
	const ui = new UI;
	
	if (e.target.id === 'submit-gist') {
		const content = document.querySelector('#new-gist-iput #content').value;
	const description = document.querySelector('#new-gist-iput #description').value;
			github.createtGist(description, content)

		.then(data => {
			ui.displayNewGist(data.newGist);
			const save = JSON.stringify(data.newGist);
			localStorage.setItem("gs_temp", save);
			loadGists(e, data.newGist);
			ui.showMainContent();
			console.log(data);
		});
		// ui.showMainContent();
		// loadGists();
	}
}
function newGist()
{
	const ui = new UI;
	ui.showGistInput();

}
function goHome()
{
	loadGists();
	// const ui = new UI;
	// ui.showMainContent()
}
function login()
{
	const ui = new UI;
	
	
	ui.showLogin();
}

function saveDetails(e)
{
	if (e.target.id == 'save-login') {
		const userName = document.querySelector('#loginForm .user');
		const userPass = document.querySelector('#loginForm .pass');
		const ui = new UI;
		if (userName.value !== '' && userPass.value !== '') {
			const save = btoa(userName.value + ':' + userPass.value);
			localStorage.setItem("gs", save);
			localStorage.setItem("gs_1", userName.value);

			ui.showMainContent();
			loadGists();
		} else {
			ui.invalidInput('#loginForm')
		}

		
	}
	
}
function copy()
{
	const code = document.querySelector('pre code');
	console.dir(code.innerText);
	// code.innerText.select();
	var range = document.createRange();
	range.selectNodeContents( code );
            window.getSelection().removeAllRanges();
            window.getSelection().addRange( range );
        // range.moveToElementText(code);
        // console.dir(range);
        // range.select();
	document.execCommand("Copy");
}

function getGist(e)
{
	if (e.target.classList.contains('single-gist')) {
		const github = new Github;
	const ui = new UI;
		e.preventDefault();
		const id = e.target.getAttribute('data-id');
		console.log(id);

		github.getGist(id)

		.then(data => {
			ui.showGist(data.gist.files);
			console.log(data.gist);
		});
		
	}
}

function search(e)
{
	// Get input element
    
		e.preventDefault();
      // Get value of input
      let filterValue = document.getElementById('search').value.toUpperCase();

      // Get names ul
      let ul = document.getElementById('gist-list');
      // Get lis from ul
      let li = ul.querySelectorAll('li.list-group-item');

      // Loop through collection-item lis
      for(let i = 0;i < li.length;i++){
        let a = li[i].getElementsByTagName('a')[0];
        // If matched
        if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1){
          li[i].style.display = '';
        } else {
          li[i].style.display = 'none';
        }
      }
}

function test()
{
	const code = document.querySelector('pre code');
	hljs.highlightBlock(code);
}

