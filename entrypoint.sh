#!/bin/sh

echo "📦 Gerando Prisma Client..."
yarn prisma generate

echo "🧱 Aplicando migrations no banco de dados..."
yarn prisma migrate deploy

echo "🚀 Iniciando servidor..."
yarn start
