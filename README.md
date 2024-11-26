# Development

Pasos para levantar la app en desarrollo

1. levantar la base de datos
```
docker compose up -d
```

2. Renombrar el .env.template por .env
3. Reemplazar las variables de entorno

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

4. Ejecutar seed para base de datos http://localhost:3000/api/seed
