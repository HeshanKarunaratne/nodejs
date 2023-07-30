console.log("Before");
displayCommits();
console.log("After");

async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepos(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } catch (err) {
        console.log("An Error occurred", err);
    }

}

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading a user from database....");
            resolve({ id, gitHubUsername: 'mosh' })
        }, 2000);
    });
}

function getRepos(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading from getRepos: " + username);
            resolve(['repo1', 'repo2']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading commits for: " + repo);
            resolve("commitId1");
            // reject(new Error("Error"));
        }, 2000);
    });
}