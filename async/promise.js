const p = new Promise((resolve, reject) => {
    // Kick off some async work
    setTimeout(() => {
        // resolve(1);
        reject(new Error("message"));
    }, 2000);


});

p.then(result => console.log("Result is: " + result)).catch(error => console.log(error));
