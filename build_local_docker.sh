rm -rf ./static
npm install
npm run build:back
npm run build:front
docker build -t qinglong:local -f ./docker/Dockerfile .