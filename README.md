Sharded Mongo Cluster
=========================================

### Mongo Components

* Config Server (3 member replica set): `configserver-1`,`configserver-2`,`configserver-3`
* 3 Shards (each a 3 member replica set):
	* `shard-1-a`,`shard-1-b`, `shard-1-c`
	* `shard-2-a`,`shard-2-b`, `shard-2-c`
	* `shard-3-a`,`shard-3-b`, `shard-3-c`
* 2 Routers (mongos): `router-1`, `router-2`

<img src="https://raw.githubusercontent.com/mushdavtyan/mongodb-cluster/main/images/diagram.png" style="width: 100%;" />

### Setup
- **Step 1: Start all of the containers**

```bash
docker-compose up -d
```

- **Step 2: Initialize the replica sets (config servers and shards) and routers**


```bash
docker-compose exec configserver-1 sh -c "mongo < /scripts/init-configserver.js"
docker-compose exec shard-1-a sh -c "mongo < /scripts/shard-init-1.js"
docker-compose exec shard-2-a sh -c "mongo < /scripts/shard-init-2.js"
docker-compose exec shard-3-a sh -c "mongo < /scripts/shard-init-3.js"
```



- **Step 3: Initializing the router**

```bash
docker-compose exec router-1 sh -c "mongo < /scripts/router-init.js"
```

- **Step 4: Enable sharding and setup sharding-key**
```bash
docker-compose exec router-1 mongo --port 27017

// Enable sharding for database `DatabaseForTest`
sh.enableSharding("DatabaseForTest")

// Setup shardingKey for collection `CollectionForTest`**
db.adminCommand( { shardCollection: "DatabaseForTest.CollectionForTest", key: { supplierId: "hashed" } } )

```

<img src="https://raw.githubusercontent.com/mushdavtyan/mongodb-cluster/main/images/init.png" style="width: 100%;" />

### Verify

- **Verify the status of the sharded cluster**

```bash
docker-compose exec router-1 mongo --port 27017
sh.status()
```


<img src="https://raw.githubusercontent.com/mushdavtyan/mongodb-cluster/main/images/enable-db.png" style="width: 100%;" />


- **Verify status of replica set for each shard**

> You should see 1 PRIMARY, 2 SECONDARY

```bash
docker exec -it shard-1-node-a bash -c "echo 'rs.status()' | mongo --port 27017" 
docker exec -it shard-2-node-a bash -c "echo 'rs.status()' | mongo --port 27017" 
docker exec -it shard-3-node-a bash -c "echo 'rs.status()' | mongo --port 27017" 
```
<img src="https://raw.githubusercontent.com/mushdavtyan/mongodb-cluster/main/images/verify.png" style="width: 100%;" />

- **Check database status**
```bash
docker-compose exec router-1 mongo --port 27017
use DatabaseForTest
db.stats()
db.CollectionForTest.getShardDistribution()
```
### Check in the browser

> You can use the dabase web ui with connecting by the browser

```bash
http://localhost:1234
```
<img src="https://raw.githubusercontent.com/mushdavtyan/mongodb-cluster/main/images/screen1.png" style="width: 100%;" />
<img src="https://raw.githubusercontent.com/mushdavtyan/mongodb-cluster/main/images/screen2.png" style="width: 100%;" />
<img src="https://raw.githubusercontent.com/mushdavtyan/mongodb-cluster/main/images/screen3.png" style="width: 100%;" />

### Resetting the Cluster
To remove all data and re-initialize the cluster, make sure the containers are stopped and then:

```bash
docker-compose rm
```

### Clean up docker-compose
```bash
docker-compose down -v --rmi all --remove-orphans
```

