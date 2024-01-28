const fs = require("fs");

// Config
const config = {
	cmsUrl: "https://cms.pepijncolenbrander.com/api",
};

async function getAllBlogs() {
	const response = await fetch(`${config.cmsUrl}/blogs`);
	const blogs = await response.json();
	return blogs.data;
}

async function generateRoutesFile() {
	const blogs = await getAllBlogs();

	let blogIds = [];
	blogs.forEach((blog) => {
		blogIds.push(blog.id);
	});

	let content = "";
	blogIds.forEach((id) => {
		if (blogIds.indexOf(id) === 0) {
			content = `blog/${id}`;
		} else {
			content += `\nblog/${id}`;
		}
	});
	content += "\n";

	fs.writeFile("routes.txt", content, (err) => {
		if (err) throw err;
	});
	console.log("Finished creating routes.txt file.");
}

generateRoutesFile();
