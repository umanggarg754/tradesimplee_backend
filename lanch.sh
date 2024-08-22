sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo apt-get install -y libpq5 libpq-dev build-essential 
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

NODE_MAJOR=18
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt-get update
sudo apt-get install -y nodejs
sudo apt-get install -y nginx 

sudo npm install pm2 -g
sudo npm install forever -g


cd /var/www/html/

sudo git clone https://github.com/umanggarg754/tradesimplee_frontend.git

# sudo git clone -b  Suryansh-3108 https://github.com/umanggarg754/tradesimplee_frontend.git

sudo git config --global --add safe.directory /var/www/html/tradesimplee_frontend

sudo git clone https://github.com/umanggarg754/tradesimplee_backend.git
sudo git config --global --add safe.directory /var/www/html/tradesimplee_backend





# backend 
forever start --minUptime 1000 --spinSleepTime 1000 index.js



# ssh -i "key_2.pem" ubuntu@ec2-13-127-56-105.ap-south-1.compute.amazonaws.com
