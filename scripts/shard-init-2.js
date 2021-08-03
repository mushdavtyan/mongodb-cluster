rs.initiate({
	_id: "shard-rs-2",version: 1,members: [
	{ _id: 0, host : "shard-2-a:27017" },
	{ _id: 1, host : "shard-2-b:27017" },
	{ _id: 2, host : "shard-2-c:27017" },
	]
})