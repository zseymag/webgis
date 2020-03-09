var developmentDatabase = {
postgres: {
host: 'localhost',
port: 5432,
database: 'd285bghhsipbj1',
user: 'nrdwnkauabjwze',
password: 'e5a3188226dd8c00133f537bb4dd9defec230daae7d413779fe5a418c68152dc'
}
}

var connectionString = "postgressql://nrdwnkauabjwze:e5a3188226dd8c00133f537bb4dd9defec230daae7d413779fe5a418c68152dc@ec2-46-137-84-140.eu-west-1.compute.amazonaws.com:5432/d285bghhsipbj1?ssl=true";
if (process.env.NODE_ENV == 'production') {
//Production mode
if (process.env.DATABASE_URL) {
developmentDatabase =
parseConnectionString(process.env.DATABASE_URL);
} else {
console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
developmentDatabase = parseConnectionString(connectionString);
}
}else{
//Development mode
developmentDatabase = parseConnectionString(connectionString);
}
function parseConnectionString(connectionString) {
if (connectionString) {
var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
var match = myRegexp.exec(connectionString);
if (match.length == 6) {
developmentDatabase.postgres.user = match[1];
developmentDatabase.postgres.password = match[2];
developmentDatabase.postgres.host = match[3];
developmentDatabase.postgres.port = Number(match[4]);
developmentDatabase.postgres.database = match[5];
developmentDatabase.postgres.ssl = true;
return developmentDatabase;
}
}
console.log("connectionString cannot be parsed");
return null;
}
module.exports = {
hostname: "http://localhost",
port: 5656,
database: {
postgres: developmentDatabase.postgres
}
}
