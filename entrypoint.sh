#!/bin/sh

if [ ! -f .env ]; then
  echo "DATABASE_URL=\"postgresql://postgres:postgres@db:5432/fictitious_order_system\"" > .env
  echo "✅ Arquivo .env criado"
fi

echo "📦 Gerando Prisma Client..."
yarn prisma generate

echo "🧱 Aplicando migrations no banco de dados..."
yarn prisma migrate deploy

echo "🚀 Iniciando servidor..."
yarn start
