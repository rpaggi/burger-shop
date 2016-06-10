#include <restclient-cpp/restclient.h>
#include <restclient-cpp/connection.h>
#include <iostream>
#include <string>

int main(int argc, char *argv[]){
	// initialize RestClient
	RestClient::init();

	// get a connection object
	RestClient::Connection* conn = new RestClient::Connection("http://localhost:3000");
	
	// set connection timeout to 5s
	conn->SetTimeout(10);
	
	// set headers
	RestClient::HeaderFields headers;
	headers["Accept"] = "application/json";
	headers["Content-Type"] = "application/x-www-form-urlencoded";
	headers["accept-encoding"] = "gzip, deflate";
	headers["accept-language"] = "en-US,en;q=0.8";
	conn->SetHeaders(headers);
	
	// append additional headers
	//conn->AppendHeader("token", argv[1]);
	
	RestClient::Response r = conn->post("/login", "user=admin&password=admin");

	std::cout << r.body << std::endl;
	
	// deinit RestClient. After calling this you have to call RestClient::init()
	// again before you can use it
	RestClient::disable();

	//Simply mode working fine
	//RestClient::Response r = RestClient::get("http://localhost:3000/profiles");
	//std::cout<< r.body <<std::endl;

	return 0;
}
