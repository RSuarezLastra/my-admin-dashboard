# Development

Pasos para levantar la app en desarrollo

1. levantar la base de datos
```
docker compose up -d
```

2. Renombrar el .env.template por .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando ```npm install```
5. Ejecutar el comando ```npm reun dev```
6. Ejecutar estos comandos de prisma

```
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar seed para [crear base de datos local] ( http://localhost:3000/api/seed )

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Nota usuario por defecto:
__email:__ user@test.com 

__password:__ 123456 

