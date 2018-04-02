
const loginContainer = document.getElementById('login-container');
const container = document.querySelector('.content');
const newGistCOntainer = document.querySelector('#new-gist-container');

class UI {
	constructor() {
		this.profile = document.getElementById('profile');
	}

	displayNewGist(gist) {
		console.log(gist.description);
		console.log(gist.files['file1.txt'].content);
	}

	showGists(gists) {
		let output = '';
		const sorted = gists.sort( (a,b) => {
			let nameA = a.description.toUpperCase(); // ignore upper and lowercase
			let nameB = b.description.toUpperCase(); // ignore upper and lowercase
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			// names must be equal
			return 0;
		});
		sorted.forEach(function(gist) {
			output += `
				<li  class="list-group-item"><a class="single-gist" data-id="${gist.id}" href="#">${gist.description}</a></li>
			`;
		});

		document.getElementById('gist-list').innerHTML = output;
	}

	showGist(gist) {
		this.showMainContent();
		hljs.configure({
		  tabReplace: '  ' // 4 spaces
		  // classPrefix: ''     // don't append class prefix
		                      // … other options aren't changed
		});

		// hljs.initHighlighting();
		let output = '';
			console.log(gist);
			Object.keys(gist).forEach(function (key) {
			  let obj = gist[key];
			  // console.log(obj.content);
			  output += `<pre><code>${obj.content}</code></pre>`;
			  
			});
			

		document.getElementById('gist').innerHTML = output;

		Array.from(document.querySelectorAll('pre code')).forEach( block => hljs.highlightBlock(block) );

	}

	showLogin()
	{
		container.style.display = 'none';

		const loginForm = `
		<form id="loginForm" class="bs-component">
			<div class="form-group">
                <label class="col-form-label" for="inputDefault">GitHub Username</label>
                <input type="text" class="form-control user" placeholder="" id="inputDefault">
            </div>
			<div class="form-group">
                <label class="col-form-label" for="inputDefault">GitHub Password</label>
                <input type="password" class="form-control pass" placeholder="" id="inputDefault">
          	</div>
          	<button type="button" id="save-login" class="btn btn-primary">Login</button>
      	</form>
		`;

		document.getElementById('login-container').innerHTML = loginForm;

		loginContainer.style.display = 'block';
		newGistCOntainer.style.display = 'none';
	}

	showMainContent()
	{
		container.style.display = 'block';
		loginContainer.style.display = 'none';	
		newGistCOntainer.style.display = 'none';
	}

	invalidInput(formId)
	{
		const inputs = Array.from(document.querySelectorAll(`${formId} input`));
		inputs.forEach( input => input.classList.add('is-invalid'));
	}

	showGistInput()
	{
		newGistCOntainer.style.display = 'block';
		container.style.display = 'none';
		loginContainer.style.display = 'none';
		const content = `
		<div id="new-gist-iput">
			<div class="form-group">
				<label class="col-form-label" for="inputDefault">Description</label>
				<input type="text" class="form-control user" placeholder="" id="description">
			</div>
			<div class="form-group">
				<label for="exampleTextarea"></label>
				<textarea class="form-control" id="content" rows="9"></textarea>
			</div>
			<button type="submit" id="submit-gist" class="btn btn-primary">Submit</button>
		</div>
		`;

		document.getElementById('new-gist-container').innerHTML = content;
	}

	// showAlert(message, className) {
	// 	this.clearAlert();
	// 	const div = document.createElement('div');
	// 	div.className = className;
	// 	div.appendChild(document.createTextNode(message));
	// 	const container = document.querySelector('.searchContainer');
	// 	const search = document.querySelector('.search');
	// 	container.insertBefore(div, search);

	// 	setTimeout(() => {
	// 		this.clearAlert();
	// 	}, 3000);
	// }

	// clearAlert() {
	// 	const currentAlert = document.querySelector('.alert');
	// 	if (currentAlert) {
	// 		currentAlert.remove();
	// 	}
	// }

	// clearProfile() {
	// 	this.profile.innerHTML = '';
	// }

}