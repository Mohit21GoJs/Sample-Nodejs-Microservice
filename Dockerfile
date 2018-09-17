FROM mhart/alpine-node:8
RUN mkdir -p /aob-payments-service
CMD mkdir /var/log/applogs
CMD chmod +777 /var/log/applogs
WORKDIR /aob-payments-service
ADD . /aob-payments-service
ENV PORT 3025
CMD npm run start
EXPOSE 3025