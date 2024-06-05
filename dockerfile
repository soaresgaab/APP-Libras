# pull base image

FROM node:lts-alpine


ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV


ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19001 19002


ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm --allow-root -g npm@latest expo-cli@latest

RUN mkdir /opt/dwl_frontend
WORKDIR /opt/dwl_frontend
ENV PATH /opt/dwl_frontend/.bin:$PATH
COPY package.json ./
RUN npm
RUN npm install

WORKDIR /opt/dwl_frontend

COPY ./ ./ 

ENTRYPOINT [ "npx", "serve", "dist" ]

#npx serve dist
#npx expo export -p web