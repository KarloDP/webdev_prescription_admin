for the docker, use these commands when building the image:
docker build -t [username]/[image name]:[version] .
docker run -d --name [image name] -p 8080:8080 [image name]/[image name]:[version]
ex.
CREATING THE IMAGE:
docker compose up -d

*use sudo if running in ubuntu


admin end (when docker container is running) is accessible from:
ipaddress:8080