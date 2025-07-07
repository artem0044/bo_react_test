FROM node:20.9.0
WORKDIR "/application"

RUN npm install -g pm2
COPY . /application
RUN npm ci
RUN npm run build
CMD ["pm2-runtime", "pm2.config.json"]
