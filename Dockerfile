FROM node:18-alpine
WORKDIR /
COPY package*.json ./
RUN npm install --production
COPY entrypoint.sh wait-for-it.sh wait-for-postgres.sh /
RUN chmod +x /*.sh
COPY . .
ENTRYPOINT ["sh", "entrypoint.sh"]
EXPOSE 5000
CMD ["npm", "start"]