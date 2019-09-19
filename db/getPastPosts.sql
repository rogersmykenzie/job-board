SELECT users.first_name, users.last_name, job_listings.title, job_listings.info, job_listings.id
FROM users
INNER JOIN job_listings
ON users.id = job_listings.poster_id
WHERE username = $1;