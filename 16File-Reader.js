// ==========================================
// NODE.JS FILE READER
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

// Store the currently opened file.
let currentFile = null;

// Store the currently loaded content.
let currentContent = "";

// ==========================================
// HEADER
// ==========================================

console.log(`
================================================
                NODE.JS FILE READER
================================================

Commands:

  open <file>       Open and display a file
  lines <file>      Display file with line numbers
  line <number>     Display a specific line
  search <word>     Search inside the current file
  info              Show file information
  current           Show current file
  clear             Clear terminal
  help              Show commands
  exit              Exit program

Examples:

  open hello.txt
  lines hello.txt
  line 5
  search JavaScript
  info

================================================
`);

// ==========================================
// OPEN FILE
// ==========================================

function openFile(filename) {

    // Make sure a filename was supplied.
    if (!filename) {
        console.log("Error: Please provide a filename.");
        return;
    }

    // Check whether the file exists.
    if (!fs.existsSync(filename)) {
        console.log(`File not found: ${filename}`);
        return;
    }

    // Check whether the path is actually a file.
    const stats = fs.statSync(filename);

    if (!stats.isFile()) {
        console.log(`${filename} is not a file.`);
        return;
    }

    // Read the file as UTF-8 text.
    currentContent = fs.readFileSync(
        filename,
        "utf8"
    );

    // Store the current filename.
    currentFile = path.resolve(filename);

    // Display the file.
    console.log(`
========================================
FILE: ${path.basename(filename)}
========================================

${currentContent}

========================================
`);
}

// ==========================================
// DISPLAY FILE WITH LINE NUMBERS
// ==========================================

function displayLines(filename) {

    // Make sure a filename was supplied.
    if (!filename) {
        console.log("Error: Please provide a filename.");
        return;
    }

    // Check whether the file exists.
    if (!fs.existsSync(filename)) {
        console.log(`File not found: ${filename}`);
        return;
    }

    // Read the file.
    const content = fs.readFileSync(
        filename,
        "utf8"
    );

    // Split the content into lines.
    const lines = content.split(/\r?\n/);

    // Store this as the current file.
    currentFile = path.resolve(filename);

    // Store the content.
    currentContent = content;

    // Display header.
    console.log(`
========================================
${path.basename(filename)}
========================================
`);

    // Loop through every line.
    lines.forEach((line, index) => {

        // Calculate the line number.
        const lineNumber = index + 1;

        // Display line number and content.
        console.log(
            `${String(lineNumber).padStart(4, " ")} | ${line}`
        );
    });

    // Display footer.
    console.log(`
========================================
Total Lines: ${lines.length}
========================================
`);
}

// ==========================================
// DISPLAY SPECIFIC LINE
// ==========================================

function displayLine(lineNumber) {

    // Make sure a file is currently open.
    if (!currentFile) {
        console.log("No file is currently open.");
        return;
    }

    // Convert the input into a number.
    const number = Number(lineNumber);

    // Validate the number.
    if (!Number.isInteger(number) || number < 1) {
        console.log("Error: Enter a valid line number.");
        return;
    }

    // Split content into lines.
    const lines = currentContent.split(/\r?\n/);

    // Check whether the line exists.
    if (number > lines.length) {
        console.log(
            `Line ${number} does not exist.`
        );

        return;
    }

    // Display the requested line.
    console.log(`
Line ${number}:

${lines[number - 1]}
`);
}

// ==========================================
// SEARCH FILE CONTENT
// ==========================================

function searchContent(searchTerm) {

    // Make sure a file is open.
    if (!currentFile) {
        console.log("No file is currently open.");
        return;
    }

    // Make sure a search term exists.
    if (!searchTerm) {
        console.log("Error: Enter a word or phrase.");
        return;
    }

    // Split content into lines.
    const lines = currentContent.split(/\r?\n/);

    // Track how many matches were found.
    let matches = 0;

    // Display search header.
    console.log(`
========================================
SEARCH: "${searchTerm}"
========================================
`);

    // Search each line.
    lines.forEach((line, index) => {

        // Check whether the line contains the search term.
        if (
            line.toLowerCase().includes(
                searchTerm.toLowerCase()
            )
        ) {

            // Increase match count.
            matches++;

            // Display matching line.
            console.log(
                `Line ${index + 1}: ${line}`
            );
        }
    });

    // Display search results.
    console.log(`
========================================
Matches Found: ${matches}
========================================
`);
}

// ==========================================
// FILE INFORMATION
// ==========================================

function showFileInfo() {

    // Make sure a file is open.
    if (!currentFile) {
        console.log("No file is currently open.");
        return;
    }

    // Get file statistics.
    const stats = fs.statSync(currentFile);

    // Split file into lines.
    const lines = currentContent.split(/\r?\n/);

    // Count words.
    const words = currentContent
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    // Display information.
    console.log(`
========================================
             FILE INFORMATION
========================================

File:
${path.basename(currentFile)}

Location:
${currentFile}

Size:
${stats.size} bytes

Lines:
${lines.length}

Words:
${words.length}

Characters:
${currentContent.length}

Created:
${stats.birthtime}

Modified:
${stats.mtime}

========================================
`);
}

// ==========================================
// SHOW CURRENT FILE
// ==========================================

function showCurrentFile() {

    // Check whether a file is open.
    if (!currentFile) {
        console.log("No file is currently open.");
        return;
    }

    // Display current file.
    console.log(`
Current File:

${currentFile}
`);
}

// ==========================================
// SHOW HELP
// ==========================================

function showHelp() {

    console.log(`
============== FILE READER COMMANDS ==============

open <file>
Read and display a file.

lines <file>
Display the file with line numbers.

line <number>
Display a specific line from the
currently opened file.

search <word>
Search for a word or phrase inside
the currently opened file.

info
Display file statistics.

current
Show the currently opened file.

clear
Clear the terminal.

help
Display this help menu.

exit
Exit the program.

===================================================
`);
}

// ==========================================
// HANDLE COMMAND
// ==========================================

function handleCommand(input) {

    // Remove unnecessary whitespace.
    input = input.trim();

    // Ignore empty commands.
    if (input === "") {
        askCommand();
        return;
    }

    // Split command into pieces.
    const parts = input.split(/\s+/);

    // Get the command.
    const command = parts[0].toLowerCase();

    // Get the first argument.
    const argument = parts.slice(1).join(" ");

    // ======================================
    // OPEN
    // ======================================

    if (command === "open") {

        openFile(argument);

        askCommand();

        return;
    }

    // ======================================
    // LINES
    // ======================================

    if (command === "lines") {

        displayLines(argument);

        askCommand();

        return;
    }

    // ======================================
    // LINE
    // ======================================

    if (command === "line") {

        displayLine(argument);

        askCommand();

        return;
    }

    // ======================================
    // SEARCH
    // ======================================

    if (command === "search") {

        searchContent(argument);

        askCommand();

        return;
    }

    // ======================================
    // INFO
    // ======================================

    if (command === "info") {

        showFileInfo();

        askCommand();

        return;
    }

    // ======================================
    // CURRENT
    // ======================================

    if (command === "current") {

        showCurrentFile();

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
    // CLEAR
    // ======================================

    if (command === "clear") {

        console.clear();

        console.log(
            "NODE.JS FILE READER\n"
        );

        askCommand();

        return;
    }

    // ======================================
    // EXIT
    // ======================================

    if (command === "exit") {

        console.log(
            "\nFile Reader closed."
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

    askCommand();
}

// ==========================================
// TERMINAL PROMPT
// ==========================================

function askCommand() {

    // Display the terminal prompt.
    rl.question(
        "file-reader> ",
        handleCommand
    );
}

// ==========================================
// START PROGRAM
// ==========================================

askCommand();
