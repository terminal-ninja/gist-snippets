class Github {
	constructor() {
		this.client_id = 'b28a2132c366468fe4d2';
		this.client_secret = '5260fc49a2d68a37bef25f31ae318b7298f20e3b';
		this.repos_count = 5;
		this.repos_sort = 'created: asc';
	}

	userAuth() {
		const user = localStorage.getItem('gs');
		if (user) {
			return user;
		}
	}

	async getUser(user){
		// const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
		
		// const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
		
		const gistInit = { method: 'GET',
			headers: new Headers({
				// 'Cache-Control': 'no-cache',
			   'Authorization': 'Basic ' + this.userAuth()
			 })
           };

		const gistsResponse = await fetch(`https://api.github.com/users/${user}/gists?client_id=${this.client_id}&client_secret=${this.client_secret}`, gistInit);
		// const singleGist = await fetch(`https://api.github.com/gists/43dcb97087697a4122ef576b2c26c479`, gistInit);
		
		// const profile = await profileResponse.json();
		// const repos = await repoResponse.json();
		const gists = await gistsResponse.json();
		// const gist = await singleGist.json();
		

		// console.log(gist);

		return {
			// profile,
			// repos,
			gists
			// gist
		}
	}

	async getGist(id){
		const gistInit = { method: 'GET',
					 headers: new Headers({
					    'Authorization': 'Basic ' + this.userAuth()
					  })
           };

		const singleGist = await fetch(`https://api.github.com/gists/${id}?client_id=${this.client_id}&client_secret=${this.client_secret}`, gistInit);

		const gist = await singleGist.json();

		return {
			gist
		}
	}

	async createtGist(description, content){
		const data = {
					  "description": description,
					  "public": true,
					  "files": {
					    "file1.txt": {
					      "content": content
					    }
					  }
					};

		const gistInit = { 
				method: 'POST',
				body: JSON.stringify(data),
               headers: new Headers({
			    // 'Authorization': 'Basic ' + btoa('terminal-ninja' + ':' + 'lucyliu21')
			    'Authorization': 'Basic ' + this.userAuth()
			  })
           };

		const createGist = await fetch(`https://api.github.com/gists`, gistInit);

		const newGist = await createGist.json();

		console.log(newGist);

		return {
			newGist
		}
	}
}