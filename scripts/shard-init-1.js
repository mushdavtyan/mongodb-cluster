rs.initiate({
	_id: "shard-rs-1",version: 1,members: [
	{ _id: 0, host : "shard-1-a:27017" },
	{ _id: 1, host : "shard-1-b:27017" },
	{ _id: 2, host : "shard-1-c:27017" },
	]
})