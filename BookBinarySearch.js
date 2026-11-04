// ==========================================
// BINARY SEARCH BOOK RANKING SYSTEM
// ==========================================

// 1. BOOK DATABASE
const books = [
    { title: "The Hobbit", rating: 9.5 },
    { title: "Dune", rating: 9.8 },
    { title: "1984", rating: 9.2 },
    { title: "Foundation", rating: 9.4 },
    { title: "The Martian", rating: 9.1 },
    { title: "Dracula", rating: 8.7 },
    { title: "Frankenstein", rating: 8.9 },
    { title: "The Odyssey", rating: 9.6 },
    { title: "Neuromancer", rating: 8.8 },
    { title: "Fahrenheit 451", rating: 9.3 },
    { title: "The Lord of the Rings", rating: 9.9 },
    { title: "Brave New World", rating: 9.0 },
    { title: "Ender's Game", rating: 9.1 },
    { title: "The Time Machine", rating: 8.6 },
    { title: "Hyperion", rating: 9.4 },
    { title: "The Alchemist", rating: 8.5 },
    { title: "The Three-Body Problem", rating: 9.7 },
    { title: "Snow Crash", rating: 8.9 },
    { title: "The Giver", rating: 8.4 },
    { title: "Ready Player One", rating: 9.0 }
];

// 2. RANK BOOKS BY RATING
function rankBooks() {

    return [...books].sort((a, b) => {
        return b.rating - a.rating;
    });

}

// 3. DISPLAY BOOK RANKINGS
function displayRankings() {

    const rankedBooks = rankBooks();

    console.log("===== BOOK RANKINGS =====");

    rankedBooks.forEach((book, index) => {

        console.log(
            `Rank ${index + 1}: ${book.title} | Rating: ${book.rating}`
        );

    });

}

// 4. BINARY SEARCH BY BOOK TITLE
// First sort alphabetically because binary search
// requires the array to be sorted by the search key.

function binarySearchBook(title) {

    const sortedBooks = [...books].sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    let left = 0;
    let right = sortedBooks.length - 1;

    const target = title.toLowerCase();

    while (left <= right) {

        let middle = Math.floor((left + right) / 2);

        let current = sortedBooks[middle].title.toLowerCase();

        if (current === target) {

            return {
                found: true,
                book: sortedBooks[middle],
                alphabeticalPosition: middle + 1
            };

        }

        if (current < target) {

            left = middle + 1;

        } else {

            right = middle - 1;

        }

    }

    return { found: false };

}

// 5. BINARY SEARCH BY RATING
// Books must be sorted by rating in ascending order.

function binarySearchRating(targetRating) {

    const sortedBooks = [...books].sort(
        (a, b) => a.rating - b.rating
    );

    let left = 0;
    let right = sortedBooks.length - 1;

    while (left <= right) {

        let middle = Math.floor((left + right) / 2);

        if (sortedBooks[middle].rating === targetRating) {

            return sortedBooks[middle];

        }

        if (sortedBooks[middle].rating < targetRating) {

            left = middle + 1;

        } else {

            right = middle - 1;

        }

    }

    return null;

}

// 6. ADD A NEW BOOK
function addBook(title, rating) {

    if (
        typeof title !== "string" ||
        title.trim() === "" ||
        !Number.isFinite(rating) ||
        rating < 0 ||
        rating > 10
    ) {
        console.log("Invalid book title or rating.");
        return;
    }

    books.push({
        title: title.trim(),
        rating: rating
    });

    console.log(`${title} added to the library!`);

}

// 7. FIND THE TOP-RANKED BOOK
function findTopBook() {

    const rankedBooks = rankBooks();

    return rankedBooks[0];

}

// ==========================================
// RUN THE BOOK RANKING SYSTEM
// ==========================================

displayRankings();

console.log("\n===== SEARCH BOOK =====");

const result = binarySearchBook("Dune");

console.log(result);

console.log("\n===== SEARCH RATING =====");

console.log(binarySearchRating(9.8));

console.log("\n===== TOP BOOK =====");

console.log(findTopBook());

console.log("\n===== ADD BOOK =====");

addBook("Project Hail Mary", 9.9);

console.log("\n===== UPDATED RANKINGS =====");

displayRankings();
