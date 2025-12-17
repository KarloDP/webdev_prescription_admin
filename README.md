*use sudo if running in ubuntu

add the following line to hosts file on client:
Windows: C:\Windows\System32\drivers\etc\hosts
Linux: /etc/hosts

<hostip> webdev-prescription.bytebusters


CREATING THE IMAGE:
In the root folder of this project run:
docker compose up -d
sudo docker compose up -d *if running on ubuntu server

admin end (when docker container is running) is accessible from:

if running locally:
localhost:8080

if hosts file is configured on both machines:
webdev-prescription.bytebusters/