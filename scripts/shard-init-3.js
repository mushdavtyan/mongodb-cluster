rs.initiate({
	_id: "shard-rs-3",version: 1,members: [
	{ _id: 0, host : "shard-3-a:27017" },
	{ _id: 1, host : "shard-3-b:27017" },
	{ _id: 2, host : "shard-3-c:27017" },
	]
})