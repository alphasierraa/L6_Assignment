const postsContainer = document.getElementById('posts');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');
let page = 1;

// Function to fetch initial posts
async function getPosts() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        return data;
    } catch (error) {
        displayError("Failed to fetch posts. Please try again later.");
        console.error("Error fetching posts:", error);
    }
}

// Function to display posts
function displayPosts(posts) {
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Show loader
function showLoader() {
    loader.style.display = 'block';
}

// Hide loader
function hideLoader() {
    loader.style.display = 'none';
}

// Display error message
function displayError(message) {
    errorMessage.innerText = message;
    errorMessage.style.display = 'block';
}

// Load and display posts
async function loadMorePosts() {
    showLoader();
    const posts = await getPosts();
    hideLoader();

    if (posts && posts.length > 0) {
        displayPosts(posts);
        page++; // Increment page to get new posts on next fetch
    } else {
        displayError("No more posts to load.");
    }
}

// Infinite scroll implementation
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        loadMorePosts();
    }
});

// Initial posts load
loadMorePosts();
