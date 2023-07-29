console.log("Before");
getUser(1, getRepository);
console.log("After");

function getRepository(user) {
    getRepositories(user.gitHubUsername, getCommit);
}

function getCommit(repos) {
    getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log("Reading a user from database....");
        callback({ id, gitHubUsername: 'mosh' })
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log("Reading from getRepos: " + username);
        callback(['repo1', 'repo2']);
    }, 2000);
}

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log("Reading repo for commits: " + repo);
        callback({ commit: 'g2342sgf' })
    }, 2000);
}