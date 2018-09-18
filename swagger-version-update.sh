#!/bin/sh

rm -rf api/swagger/swagger.yaml
VERSION=$(node -p -e "require('./package.json').version")
sed 's@###APP_VERSION###@'"$VERSION"'@' api/swagger/swagger-base.yaml > api/swagger/swagger.yaml