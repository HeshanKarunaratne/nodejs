v2();

async function v2() {
  const customer = await getCustomer(1);
  console.log('Customer: ', customer);

  if (customer.isGold) {
    const topMovies = await getTopMovies();
    console.log('Top movies: ', topMovies);
    await sendEmail(customer.email, topMovies);
    console.log('Email sent...')
  }
}

function getCustomer(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Mosh Hamedani',
        isGold: true,
        email: 'email'
      });
    }, 2000);
  });
}

function getTopMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 2000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}