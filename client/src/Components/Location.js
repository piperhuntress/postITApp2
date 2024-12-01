import { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
  const [ip, setIp] = useState(null);
  const [geoData, setgeoData] = useState(null);
  const API_KEY = "at_BgPFMRAHR1bJ7CyE8VxyMOPIqDsNF";

  const fetchIpAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      setIp(response.data.ip); // Set the IP address in state
    } catch (error) {
      console.error("Error fetching IP address:", error.message);
    }
  };

  // Fetch geolocation data based on the IP

  const getGeoLocationData = async () => {
    if (!ip) return; // Ensure IP is available before making the request

    try {
      const response = await axios.get(
        `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}&ipAddress=${ip}`
      );

      setgeoData(response.data); // Set geolocation data in state
      console.log("GeoLocation Data:", response.data);
    } catch (error) {
      console.error("Error fetching geolocation data:", error.message);
    }
  };

  useEffect(() => {
    fetchIpAddress();
  }, []);

  // Fetch geolocation data when the IP is updated

  useEffect(() => {
    if (ip) {
      getGeoLocationData();
    }
  }, [ip]);

  return (
    <div>
      <p>Location Information</p>

      {ip ? <p>IP Address: {ip}</p> : <p>Loading IP address...</p>}

      {geoData ? (
        <div>
          Country: {geoData.location.country}
          <br />
          Region: {geoData.location.region}
        </div>
      ) : (
        <p>Loading Geolocation Data...</p>
      )}
    </div>
  );
};

export default Location;
