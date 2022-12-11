// Function to toggle Profile Menu
let settingsMenu = document.querySelector(".settings-dropdown-container");
function settingsDropdown() {
  settingsMenu.classList.toggle("settings-dropdown-container-height");
}

// Functions to Logout User
const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.replace("http://127.0.0.1:5500/index.html");
});

// Function to toggle Menu in Mobile View Menu
let menu = document.querySelector(".menu-dropdown-container");
function menuDropdown() {
  menu.classList.toggle("menu-dropdown-container-height");
}

// Functions to Dark/Light Mode
let darkButton = document.getElementById("dark-btn");
darkButton.onclick = function () {
  darkButton.classList.toggle("dark-btn-on");
  document.body.classList.toggle("dark-theme");
};
let menuDarkButton = document.getElementById("menu-dark-btn");
menuDarkButton.onclick = function () {
  menuDarkButton.classList.toggle("dark-btn-on");
  document.body.classList.toggle("dark-theme");
};

let dropMenuDarkButton = document.getElementById("drop-menu-dark-btn");
dropMenuDarkButton.onclick = function () {
  dropMenuDarkButton.classList.toggle("dark-btn-on");
  document.body.classList.toggle("dark-theme");
};

// Functions to Enable/Disable Comment Card
let commentSlider = document.querySelector(".commentSlider");
function commentDropdown() {
  commentSlider.classList.toggle("commentSlider-enable");
}

let userData = JSON.parse(localStorage.getItem("user"));

// Assigning user name to username fields
var userName = document.querySelectorAll('[id="profile-username"]');
for (var i = 0; i < userName.length; i++) {
  userName[i].innerHTML = `${userData.firstName}`;
}

// Assigning profilePhoto name to profilePhoto fields
const profilePhoto = document.querySelectorAll('[id="profilePhoto"]');
for (var i = 0; i < profilePhoto.length; i++) {
  profilePhoto[i].src = `${userData.image}`;

}

let presentPostsCount = 10;
let searchInput = document.getElementById("search").value;
let searchBtn = document.getElementById("search-btn");

// OnInitializeFunction
async function onInitialize(presentPostsCount, searchInput = "") {
  const tweets = document.getElementById("post-container");
  let postsContainer = [];
  // Call for fetching Searched Number api
  if (searchInput) {
    const response = await fetch(`https://dummyjson.com/posts/search?q=${searchInput}`);
    const data = await response.json();
    tweets.innerHTML = "";
    postsContainer = data.posts;
  }
  // Call for fetching Posts api
  else if (presentPostsCount > 9) {
    const response = await fetch(`https://dummyjson.com/posts?limit=${presentPostsCount}`);
    const data = await response.json();
    tweets.innerHTML = "";
    postsContainer = data.posts;
  }

  for (let i = 0; i < postsContainer.length; i++) {

    // Template Literal for Value replacement
    const tweet =
      `
              <div class="post-row">
              <div class="user-profile-data">
                <img src="${userData.image}" />
                <div>
                  <p id="profile-username">${userData.firstName}</p>
                  <small>J${userData.email}</small>
                </div>
              </div>
              <a href="#"><i class="fas fa-ellipsis-v"></i></a>
            </div>
        
            <p class="post-title">${postsContainer[i].title}</p>
            <p class="post-text">${postsContainer[i].body}</p>
            <p class="post-tags">${postsContainer[i].tags}</p>
            <div class="reaction-row">
              <div class="activity-icons">
                <div>
                  <i class="fas fa-thumbs-up"></i>${postsContainer[i].reactions}
                </div>
                <div onclick="commentDropdown()">
                  <i class="fas fa-comment-dots"></i> comment
                </div>
                <div><i class="fas fa-share"></i> share</div>
              </div>
            </div>
            <div class="end-post"></div>
            <div class="commentSlider">
              <div class="comment-input-container">
                <img src="${userData.image}" />
                <textarea rows="2" placeholder="Write a comment..."></textarea>
                <button class="post-comment-btn">Post</button>
              </div>
              <div class="comment">
                <p id="comment">I am a comment</p>
                <i class="fas fa-edit"></i>
                <i class="fas fa-trash"></i>
              </div>
            </div>
            <div class="end-post"></div>
        `;

    tweets.innerHTML += tweet;
  };
}

if (!searchInput) {
  onInitialize(presentPostsCount, null);
  const loadMore = document.getElementById("load-more")
  loadMore.addEventListener("click", () => {
    if (presentPostsCount <= 30) {
      presentPostsCount += 10;
      onInitialize(presentPostsCount);
    }
    if (presentPostsCount == 30) {
      loadMore.style.display = "none";
    }
  });
}
searchBtn.addEventListener("click", () => {
  const searchInput = document.getElementById("search").value;
  const loadMore = document.getElementById("load-more");

  console.log(searchInput);

  if (searchInput) {
    loadMore.style.display = "none";
  }
  onInitialize(3, searchInput);
})



