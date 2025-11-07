# Run the full project with a single command 

# Clear the running ports 
pm2 stop all
pm2 delete all
fuser -k 8005/tcp 
fuser -k 8006/tcp
fuser -k 8080/tcp

# Start User Module
echo "Start the Users module."
cd users
rm -r node_modules
npm install
npm run build
npm run serve

# Start Products Module
echo "Start the Products module."
cd ../products
rm -r node_modules
npm install
npm run build
npm run serve

# Start My-Gateway
echo "Start the Gateway Module."
cd ../my-gateway
rm -r node_modules
npm install
npm run serve