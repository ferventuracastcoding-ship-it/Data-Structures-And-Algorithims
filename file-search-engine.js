// ==========================================
// NODE.JS FILE SEARCH ENGINE
// ==========================================

// Import the File System module.
const fs = require("fs");

// Import the Path module.
const path = require("path");

// Import the Readline module.
const readline = require("readline");

// Create the terminal interface.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Store search results.
let searchResults = [];

// ==========================================
// HEADER
// ==========================================

console.log(`
================================================
             NODE.JS FILE SEARCH ENGINE
================================================

Search for files by name across directories.

Commands:

  search <name>       Search for a file
  search <name> <dir> Search inside a directory
  results             Show last search results
  info <number>       Show file information
  clear               Clear search results
  help                Show commands
  exit                Exit program

Examples:

  search package.json
  search app.js
  search .html
  search README.md ./projects

================================================
`);

// ==========================================
// SEARCH FILES
// ==========================================

function searchFiles(directory, searchTerm) {

    // Create an empty array for matching files.
    const matches = [];

    // Read everything inside the directory.
    let items;

    try {
        items = fs.readdirSync(directory, {
            withFileTypes: true
        });
    } catch (error) {

        // Ignore folders that cannot be accessed.
        return matches;
    }

    // Loop through every item.
    for (const item of items) {

        // Create the complete path.
        const fullPath = path.join(
            directory,
            item.name
        );

        // Check if the item is a directory.
        if (item.isDirectory()) {

            // Search inside the directory recursively.
            const nestedResults = searchFiles(
                fullPath,
                searchTerm
            );

            // Add nested results.
            matches.push(...nestedResults);

        } else {

            // Convert filename to lowercase.
            const filename = item.name.toLowerCase();

            // Convert search term to lowercase.
            const query = searchTerm.toLowerCase();

            // Check whether the filename contains the search term.
            if (filename.includes(query)) {

                // Add the matching file.
                matches.push(fullPath);
            }
        }
    }

    // Return all matches.
    return matches;
}

// ==========================================
// SEARCH COMMAND
// ==========================================

function performSearch(searchTerm, directory = ".") {

    // Make sure a search term exists.
    if (!searchTerm) {

        console.log(
            "Error: Enter a filename to search for."
        );

        return;
    }

    // Check whether the starting directory exists.
    if (!fs.existsSync(directory)) {

        console.log(
            `Directory not found: ${directory}`
        );

        return;
    }

    // Display search information.
    console.log(`
Searching...

Name: ${searchTerm}
Directory: ${path.resolve(directory)}

`);

    // Clear previous results.
    searchResults = [];

    // Start the recursive search.
    searchResults = searchFiles(
        directory,
        searchTerm
    );

    // Display number of results.
    console.log(
        `Found ${searchResults.length} matching file(s).\n`
    );

    // Display results.
    displayResults();
}

// ==========================================
// DISPLAY RESULTS
// ==========================================

function displayResults() {

    // Check whether there are results.
    if (searchResults.length === 0) {

        console.log("No files found.\n");

        return;
    }

    // Display header.
    console.log(
        "============== SEARCH RESULTS =============="
    );

    // Loop through results.
    searchResults.forEach((file, index) => {

        // Get the file name.
        const filename = path.basename(file);

        // Display result.
        console.log(
            `${index + 1}. ${filename}`
        );

        // Display location.
        console.log(
            `   ${path.resolve(file)}`
        );
    });

    // Display footer.
    console.log(
        "============================================\n"
    );
}

// ==========================================
// SHOW RESULTS
// ==========================================

function showResults() {

    // Check if there are results.
    if (searchResults.length === 0) {

        console.log(
            "\nNo search results available.\n"
        );

        return;
    }

    // Display the stored results.
    displayResults();
}

// ==========================================
// FILE INFORMATION
// ==========================================

function showFileInfo(index) {

    // Convert input to a number.
    const number = Number(index);

    // Validate the number.
    if (
        isNaN(number) ||
        number < 1 ||
        number > searchResults.length
    ) {

        console.log(
            "Error: Invalid result number."
        );

        return;
    }

    // Get the selected file.
    const file = searchResults[number - 1];

    // Get file statistics.
    let stats;

    try {

        stats = fs.statSync(file);

    } catch (error) {

        console.log(
            "Unable to read file information."
        );

        return;
    }

    // Display file information.
    console.log(`
========================================
              FILE INFORMATION
========================================

Name:
${path.basename(file)}

Path:
${path.resolve(file)}

Extension:
${path.extname(file) || "None"}

Size:
${stats.size} bytes

Created:
${stats.birthtime}

Modified:
${stats.mtime}

Is File:
${stats.isFile()}

Is Directory:
${stats.isDirectory()}

========================================
`);
}

// ==========================================
// CLEAR RESULTS
// ==========================================

function clearResults() {

    // Empty the results array.
    searchResults = [];

    // Confirm operation.
    console.log(
        "\nSearch results cleared.\n"
    );
}

// ==========================================
// HELP
// ==========================================

function showHelp() {

    console.log(`
============== COMMANDS ==============

search <name>
Search the current directory.

search <name> <directory>
Search a specific directory.

results
Display the previous search results.

info <number>
Display information about a result.

clear
Clear the search results.

help
Display this help menu.

exit
Close the File Search Engine.

======================================

Examples:

search package.json

search app.js

search .html

search README.md ./projects

info 1

results

clear

======================================
`);
}

// ==========================================
// COMMAND HANDLER
// ==========================================

function handleCommand(input) {

    // Remove unnecessary whitespace.
    input = input.trim();

    // Ignore empty commands.
    if (!input) {

        askCommand();

        return;
    }

    // Split command into individual words.
    const parts = input.split(/\s+/);

    // Get the command.
    const command = parts[0].toLowerCase();

    // ======================================
    // SEARCH
    // ======================================

    if (command === "search") {

        // Get search term.
        const searchTerm = parts[1];

        // Get optional directory.
        const directory = parts[2] || ".";

        // Perform search.
        performSearch(
            searchTerm,
            directory
        );

        // Return to terminal.
        askCommand();

        return;
    }

    // ======================================
    // RESULTS
    // ======================================

    if (command === "results") {

        showResults();

        askCommand();

        return;
    }

    // ======================================
    // INFO
    // ======================================

    if (command === "info") {

        showFileInfo(parts[1]);

        askCommand();

        return;
    }

    // ======================================
    // CLEAR
    // ======================================

    if (command === "clear") {

        clearResults();

        askCommand();

        return;
    }

    // ======================================
    // HELP
    // ======================================

    if (command === "help") {

        showHelp();

        askCommand();

        return;
    }

    // ======================================
    // EXIT
    // ======================================

    if (command === "exit") {

        console.log(
            "\nFile Search Engine closed."
        );

        rl.close();

        return;
    }

    // ======================================
    // UNKNOWN COMMAND
    // ======================================

    console.log(
        `Unknown command: ${command}`
    );

    console.log(
        "Type 'help' for available commands."
    );

    // Ask for another command.
    askCommand();
}

// ==========================================
// TERMINAL PROMPT
// ==========================================

function askCommand() {

    // Display the command prompt.
    rl.question(
        "search-engine> ",
        handleCommand
    );
}

// ==========================================
// START PROGRAM
// ==========================================

askCommand();
