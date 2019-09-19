SELECT users.first_name, users.last_name, job_listings.title, job_listings.info
FROM users
INNER JOIN job_listings
ON users.id = job_listings.poster_id;