"use client";

import CustumTable from "@/components/ui/customTable";
import { keysEntityMap } from "@/lib/constants";
import { characterDataType } from "@/lib/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function EntityPage({}) {
  const pathname: string = usePathname();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const getUrlsOfEntityItems = (data: any) => {
    return data.map((item: { url: any }) => item.url);
  };

  const filterDataAsPerAsType = (data: any[], keys: { label: string; key: string }[]) => {
    const filteredData = data.map((item: any) => {
      const tableRow: any = {};
      keys.forEach((key: { label: string; key: string }) => {
        console.log(item.result.properties[key.key]); // Logging the label for clarity
        
        // Correctly access item[key.key] to get the value based on the provided key
        tableRow[key.label] = item.result.properties[key.key];
      });
      return tableRow;
    });
    return filteredData;
  };
  

  useEffect(() => {
    const fetchDataAndFetchAllData = async () => {
      try {
        // Fetch initial data
        setLoading(true);
        const res = await fetch(`https://www.swapi.tech/api${pathname}`);
        const result = await res.json();
        const urls = getUrlsOfEntityItems(result.results); // Assuming getUrlsOfEntityItems is defined elsewhere

        // Fetch additional data from extracted urls
        const fetchAllData = async (urls: any[]) => {
          try {
            const fetchPromises = urls.map((url) =>
              fetch(url).then((response) => {
                if (!response.ok) {
                  throw new Error(
                    `Failed to fetch data from ${url}: ${response.statusText}`
                  );
                }
                return response.json();
              })
            );

            const data = await Promise.all(fetchPromises);
            // console.log("All data fetched:", data);
           

            const filteredData = filterDataAsPerAsType(
              data,
              keysEntityMap[pathname.substring(1).toLocaleLowerCase()]
            );
            console.log(filteredData, "filtered deta");
            setData(filteredData);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };  

        // Call fetchAllData with the extracted urls
        await fetchAllData(urls);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchDataAndFetchAllData(); // Call the combined function to initiate data fetching
  }, [pathname]);
  console.log(data, "deta is ");

  if (loading) return <div>Loading..</div>;
  return (
    <div>
      <CustumTable
        data={data}
        tableType={pathname.substring(1).toLocaleLowerCase()}
      />
    </div>
  );
}

export default EntityPage;
