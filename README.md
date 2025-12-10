for the docker, use these commands when building the image:
docker build -t [username]/[image name]:[version] .
docker run -d --name [image name] -p 8080:8080 [image name]/[image name]:[version]
ex.
CREATING THE IMAGE:
docker build -t karlo/webdev-admin:1.0 .
RUNNING THE IMAGE:
docker run -d --name webdev-admin -p 8080:8080 karlo/webdev-admin:1.0
