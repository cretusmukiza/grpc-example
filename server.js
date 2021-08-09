const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./news.proto";
const protoLoader = require("@grpc/proto-loader");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
const news = {
  news: [
    { id: "1", title: "Note 1", body: "Content 1", postImage: "Post image 1" },
    { id: "2", title: "Note 2", body: "Content 2", postImage: "Post image 2" },
  ],
};

server.addService(newsProto.NewsService.service, {
  getAllNews: (_, callback) => {
    console.log(news);
    callback(null, news);
  },
});

server.bindAsync(
  "127.0.0.1:9093",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server at port:", port);
    console.log("Server running at http://127.0.0.1:9093");
    server.start();
  }
);
