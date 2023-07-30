console.log("Before");
getUser(1, function (user) {
    getRepos(user.gitHubUsername, function (repos) {
        getCommits(repos[0], function (commits) {
            console.log(commits);
        });
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

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log("Reading commits for: " + repo);
        callback("commitId1");
    }, 2000);
}