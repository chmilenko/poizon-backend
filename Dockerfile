FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY entrypoint.sh wait-for-it.sh wait-for-postgres.sh /app/
RUN chmod +x /app/*.sh
COPY . .
ENTRYPOINT ["/app/entrypoint.sh"]
EXPOSE 5000
CMD ["npm", "start"]