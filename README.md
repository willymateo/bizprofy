# bizprofy

**Bizprofy** is an inventory management system designed to streamline and organize company inventory processes. It provides tools to manage users, warehouses, products, and stock levels efficiently, enabling businesses to track stock in and stock out operations with ease. With Bizprofy, companies can gain a clear, real-time view of their current inventory, ensuring accurate stock control and improved resource management across all locations.

## Environment variables

You must have a `.env` file in the `root` of the proyect. The `.env` file must have the content of [.env.template](https://github.com/willymateo/bizprofy/blob/main/.env.template)

**Note**: Ask to an admin for the value of environment variables.

## Setup

### Development

#### Create the image

```cmd
docker compose -f docker/development/compose.yml build
```

#### Create and start the container

```cmd
docker compose -f docker/development/compose.yml up
```

### Production

#### Create the image

```cmd
docker compose -f docker/production/compose.yml build
```

#### Create and start the container

```cmd
docker compose -f docker/production/compose.yml up
```
