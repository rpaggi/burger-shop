#include <restclient-cpp/restclient.h>
#include <restclient-cpp/connection.h>
#include <iostream>
#include <string>

int main(){
	RestClient::init();

	//RestClient::Response r = RestClient::get("http://localhost:3000/profiles");
	
	std::cout<< r.body <<std::endl;

	return 0;
}
