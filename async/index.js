console.log("Before");
getUser(1, function (user) {
    console.log(user);

    getRepos(user.gitHubUsername, function (repos) {
        console.log(repos);
    });

});
console.log("After");

function getUser(id, callback) {
    setTimeout(() => {
        console.log("Reading a user from database....");
        callback({ id, gitHubUsername: 'mosh' })
    }, 2000);
}

function getRepos(username, callback) {
    setTimeout(() => {
        console.log("Reading from getRepos: " + username);
        callback(['repo1', 'repo2']);
    }, 2000);
}