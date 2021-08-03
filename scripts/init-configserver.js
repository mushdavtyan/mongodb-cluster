rs.initiate(
	{_id: "rs-config-server", configsvr: true, version: 1, members: [ 
	{ _id: 0, host : 'configserver-1:27017' }, 
	{ _id: 1, host : 'configserver-2:27017' }, 
	{ _id: 2, host : 'configserver-3:27017' } 
	] 
})