UPDATE 
    job_listings
SET 
    title = $1,
    info = $2
WHERE 
    id = $3;