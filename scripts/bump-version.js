const fs = require("fs");

// Get the version number from the command-line argument
const newVersion = process.argv[2];

if (!newVersion) {
	console.error("Usage: node bump-version.js <newVersion>");
	process.exit(1);
}

// Read the package.json file
const packageJsonPath = "./package.json";
const packageLockJsonPath = "./package-lock.json";

try {
	const packageJsonData = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
	const packageLockJsonData = JSON.parse(
		fs.readFileSync(packageLockJsonPath, "utf8"),
	);

	// Update the version in package.json
	packageJsonData.version = newVersion;

	// Update the version in package-lock.json
	packageLockJsonData.version = newVersion;

	// Write the updated data back to the files
	fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonData, null, 2));
	fs.writeFileSync(
		packageLockJsonPath,
		JSON.stringify(packageLockJsonData, null, 2),
	);

	console.log(
		`Version updated to ${newVersion} in package.json and package-lock.json.`,
	);
} catch (err) {
	console.error("Error updating version:", err);
}
